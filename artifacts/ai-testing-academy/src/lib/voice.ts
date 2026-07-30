/* Web Speech API wrappers for the interview: TTS and STT */

/* eslint-disable @typescript-eslint/no-explicit-any */

let lang = 'en-US';

export function setVoiceLang(l: string) {
  lang = l === 'he' ? 'he-IL' : 'en-US';
}

const synth = (typeof window !== 'undefined') ? window.speechSynthesis : null;
const RecognitionClass: (new () => any) | undefined =
  typeof window !== 'undefined'
    ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
    : undefined;

export const ttsSupported = !!synth;
export const sttSupported = !!RecognitionClass;

const MIN_MS = 20000;
const MAX_PAUSE_MS = 10000;
const MAX_MS = 180000;

export function speak(text: string, onEnd?: () => void) {
  if (!synth) { onEnd?.(); return; }
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  if (onEnd) u.onend = () => onEnd();
  synth.speak(u);
}

export function stopSpeaking() { synth?.cancel(); }

let rec: any = null;
let timer: ReturnType<typeof setInterval> | null = null;
let transcript = '';
let startedAt = 0;
let lastSpeech = 0;
let finalizing = false;
let onFinalCb: ((text: string) => void) | null = null;
let onStateCb: ((listening: boolean) => void) | null = null;

function clearTimer() { if (timer !== null) { clearInterval(timer); timer = null; } }

function deliver() {
  clearTimer();
  const text = transcript.trim();
  const cb = onFinalCb, state = onStateCb;
  rec = null;
  finalizing = false;
  onFinalCb = null;
  onStateCb = null;
  state?.(false);
  if (text) cb?.(text);
}

function finish() {
  if (!rec) return;
  finalizing = true;
  clearTimer();
  try { rec.stop(); } catch { deliver(); }
}

function tick() {
  const now = Date.now();
  const elapsed = now - startedAt;
  const silence = now - lastSpeech;
  if (elapsed >= MAX_MS) { finish(); return; }
  if (elapsed >= MIN_MS && silence >= MAX_PAUSE_MS) finish();
}

export function toggleRecognition(
  onFinal: (text: string) => void,
  onState: (listening: boolean) => void
) {
  if (!RecognitionClass) return;
  if (rec) { finish(); return; }
  stopSpeaking();
  transcript = '';
  finalizing = false;
  onFinalCb = onFinal;
  onStateCb = onState;
  rec = new RecognitionClass();
  rec.lang = lang;
  rec.continuous = true;
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  rec.onresult = (e: any) => {
    lastSpeech = Date.now();
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) transcript += e.results[i][0].transcript + ' ';
    }
  };
  rec.onerror = (ev: any) => {
    if (ev.error === 'not-allowed' || ev.error === 'service-not-allowed') finalizing = true;
  };
  rec.onend = () => {
    if (finalizing || Date.now() - startedAt >= MAX_MS) { deliver(); return; }
    try { rec.start(); } catch {
      setTimeout(() => {
        if (rec && !finalizing) {
          try { rec.start(); } catch { /* give up */ }
        }
      }, 120);
    }
  };
  startedAt = lastSpeech = Date.now();
  onState(true);
  try { rec.start(); } catch { deliver(); }
  timer = setInterval(tick, 500);
}

export function isListening() { return !!rec; }
