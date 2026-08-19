/**
 * Web Speech API wrapper for voice mode in the mock interview.
 *
 * Provides speech recognition (mic input → text) and speech synthesis
 * (text → spoken audio). Both are browser-native APIs; no extra packages
 * are needed. Chrome and Edge have the best support.
 */

import { useState, useRef, useCallback, useEffect } from 'react';

// ---------------------------------------------------------------------------
// Local Web Speech API type declarations.
// The standard DOM lib does not always include these, and they are
// vendor-prefixed in some browsers, so we define minimal interfaces here
// rather than depending on a particular tsconfig lib or @types package.
// ---------------------------------------------------------------------------

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface ISpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((this: ISpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onerror: ((this: ISpeechRecognition, ev: Event) => void) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

type RecognitionCtor = new () => ISpeechRecognition;

export interface UseVoiceOptions {
  /** BCP-47 language tag passed to SpeechRecognition and SpeechSynthesisUtterance (e.g. 'en-US', 'he-IL'). */
  lang?: string;
  /** Called with the final recognised transcript when recognition ends. */
  onFinalTranscript?: (text: string) => void;
}

export interface UseVoiceReturn {
  /** True when both SpeechRecognition and speechSynthesis are available. */
  isSupported: boolean;
  /** Whether voice mode (auto-TTS + mic) is currently enabled. */
  voiceOn: boolean;
  toggleVoice: () => void;
  /** True while the microphone is actively recording. */
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  /** Speak `text` via the system TTS (cancels any ongoing utterance first). */
  speak: (text: string) => void;
  cancelSpeech: () => void;
}

function getRecognitionClass(): RecognitionCtor | null {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition ?? null;
}

function synthAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** Strip common Markdown punctuation before speaking, so the TTS reads prose. */
function toSpeakable(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/#+\s/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[-_*]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function useVoice({
  lang = 'en-US',
  onFinalTranscript,
}: UseVoiceOptions = {}): UseVoiceReturn {
  const RecognitionClass = getRecognitionClass();
  const isSupported = !!(RecognitionClass && synthAvailable());

  const [voiceOn, setVoiceOn] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const recRef = useRef<ISpeechRecognition | null>(null);
  // Keep callback in a ref so startListening closure stays stable.
  const onTranscriptRef = useRef(onFinalTranscript);
  useEffect(() => {
    onTranscriptRef.current = onFinalTranscript;
  }, [onFinalTranscript]);

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      recRef.current?.abort();
      if (synthAvailable()) speechSynthesis.cancel();
    };
  }, []);

  const toggleVoice = useCallback(() => {
    setVoiceOn(prev => {
      if (prev) {
        // Turning off → stop any ongoing activity.
        recRef.current?.abort();
        if (synthAvailable()) speechSynthesis.cancel();
        setIsListening(false);
      }
      return !prev;
    });
  }, []);

  const startListening = useCallback(() => {
    if (!RecognitionClass) return;
    recRef.current?.abort();
    const rec = new RecognitionClass();
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = Array.from(e.results)
        .map(r => r[0].transcript)
        .join('')
        .trim();
      if (transcript) onTranscriptRef.current?.(transcript);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    recRef.current = rec;
    rec.start();
    setIsListening(true);
  }, [RecognitionClass, lang]);

  const stopListening = useCallback(() => {
    recRef.current?.stop();
    setIsListening(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!synthAvailable()) return;
      speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(toSpeakable(text));
      utter.lang = lang;
      speechSynthesis.speak(utter);
    },
    [lang],
  );

  const cancelSpeech = useCallback(() => {
    if (synthAvailable()) speechSynthesis.cancel();
  }, []);

  return {
    isSupported,
    voiceOn,
    toggleVoice,
    isListening,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  };
}
