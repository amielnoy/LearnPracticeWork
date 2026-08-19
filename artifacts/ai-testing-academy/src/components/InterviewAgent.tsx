import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useProviderContext } from '../context/ProviderContext';
import { useReveal } from '../hooks/useReveal';
import { useVoice } from '../hooks/useVoice';
import type { Message } from '../lib/providers';
import { useProgress } from '../context/ProgressContext';
import { readValidated, removeRaw, writeValidated } from '../lib/storage';

interface ChatMsg {
  cls: 'ai' | 'user' | 'sys';
  text: string;
  id: number;
}

let msgIdCounter = 0;

/**
 * Where a partly-finished interview lives.
 *
 * `sessionStorage`, not `localStorage`, and that is the point. A transcript is
 * every answer someone gave about their own career on a machine that may not be
 * theirs; the résumé tool next door already treats its input that way, and
 * there was never a reason for these two to disagree. Resuming after a reload
 * is what the feature needs, and a session is exactly that long.
 */
const INTERVIEW_STORAGE_KEY = 'ata_interview_session_v1';

/** Bounds on what will be reinstated, so a tampered entry cannot be unbounded. */
const MAX_SAVED_MESSAGES = 200;
const MAX_SAVED_TEXT = 20_000;

interface SavedInterview {
  lang: string;
  messages: Array<{ cls: 'ai' | 'user'; text: string }>;
  chat: Message[];
  interviewOn: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Rebuilds a transcript from storage, or gives up.
 *
 * Checking that the two arrays *are* arrays is not enough: what goes into them
 * is rendered, and `cls` becomes a class name while `text` becomes a child. A
 * stored entry whose `text` is an object is a render crash on mount, and one
 * whose `cls` is arbitrary is a stored string in the markup. So every element
 * is checked, not just the shape around them.
 */
function validateInterview(parsed: unknown, lang: string): SavedInterview | null {
  if (!isRecord(parsed) || parsed.lang !== lang) return null;
  if (!Array.isArray(parsed.messages) || !Array.isArray(parsed.chat)) return null;

  const messages = parsed.messages
    .filter(
      (entry): entry is { cls: 'ai' | 'user'; text: string } =>
        isRecord(entry) &&
        (entry.cls === 'ai' || entry.cls === 'user') &&
        typeof entry.text === 'string',
    )
    .slice(0, MAX_SAVED_MESSAGES)
    .map(entry => ({ cls: entry.cls, text: entry.text.slice(0, MAX_SAVED_TEXT) }));

  const chat = parsed.chat
    .filter(
      (entry): entry is Message =>
        isRecord(entry) &&
        (entry.role === 'user' || entry.role === 'assistant') &&
        typeof entry.content === 'string',
    )
    .slice(0, MAX_SAVED_MESSAGES)
    .map(entry => ({ role: entry.role, content: entry.content.slice(0, MAX_SAVED_TEXT) }));

  return { lang, messages, chat, interviewOn: parsed.interviewOn === true };
}

function loadInterview(lang: string): SavedInterview | null {
  // Earlier versions wrote this same key into `localStorage`, where it stayed
  // forever. Those are cleared rather than migrated: moving a transcript into
  // the session would carry the problem forward one visit, deleting it ends it.
  removeRaw(localStorage, INTERVIEW_STORAGE_KEY);
  return readValidated(sessionStorage, INTERVIEW_STORAGE_KEY, parsed =>
    validateInterview(parsed, lang),
  );
}

export function InterviewAgent() {
  const { locale, S } = useLocale();
  const t = locale.interview;
  const { callClaude, apiKey, useOwnKey } = useProviderContext();
  const { startTool, recordInterviewAnswer, completeInterview } = useProgress();
  const sectionRef = useReveal();
  const [savedInterview] = useState(() => loadInterview(locale.lang));

  const [messages, setMessages] = useState<ChatMsg[]>(() =>
    savedInterview?.messages.length
      ? savedInterview.messages.map(message => ({ ...message, id: msgIdCounter++ }))
      : [{ cls: 'sys', text: t.initialMsg, id: msgIdCounter++ }],
  );
  const [chatInput, setChatInput] = useState('');
  const [chatErr, setChatErr] = useState('');
  const [interviewOn, setInterviewOn] = useState(savedInterview?.interviewOn ?? false);
  const [sendDisabled, setSendDisabled] = useState(!(savedInterview?.interviewOn ?? false));
  const [verdictDisabled, setVerdictDisabled] = useState(!(savedInterview?.interviewOn ?? false));
  const [startLabel, setStartLabel] = useState(
    savedInterview?.interviewOn ? S.btnRestartInterview : t.startBtn,
  );

  // Use refs for values needed in async callbacks to avoid stale closures
  const chatRef = useRef<Message[]>(savedInterview?.chat ?? []);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const interviewOnRef = useRef(interviewOn);

  useEffect(() => {
    interviewOnRef.current = interviewOn;
  }, [interviewOn]);

  // Voice mode
  const voiceLang = S.voiceLang;
  const handleTranscript = useCallback((text: string) => {
    setChatInput(text);
  }, []);
  const {
    isSupported: voiceSupported,
    voiceOn,
    toggleVoice,
    isListening,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  } = useVoice({ lang: voiceLang, onFinalTranscript: handleTranscript });

  // Keep voiceOn in a ref so agentTurn (async) can read it without re-creating
  const voiceOnRef = useRef(voiceOn);
  useEffect(() => {
    voiceOnRef.current = voiceOn;
  }, [voiceOn]);
  const speakRef = useRef(speak);
  useEffect(() => {
    speakRef.current = speak;
  }, [speak]);

  // Cancel speech when voice mode is toggled off
  useEffect(() => {
    if (!voiceOn) cancelSpeech();
  }, [voiceOn, cancelSpeech]);

  useEffect(() => {
    if (!interviewOn) return;
    const resumableMessages = messages
      .filter((message): message is ChatMsg & { cls: 'ai' | 'user' } => message.cls !== 'sys')
      .map(({ cls, text }) => ({ cls, text }));
    writeValidated(sessionStorage, INTERVIEW_STORAGE_KEY, {
      lang: locale.lang,
      messages: resumableMessages,
      chat: chatRef.current,
      interviewOn,
    } satisfies SavedInterview);
  }, [interviewOn, locale.lang, messages]);

  // Scroll chat to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const addMsg = useCallback((cls: 'ai' | 'user' | 'sys', text: string) => {
    const msg: ChatMsg = { cls, text, id: msgIdCounter++ };
    setMessages(prev => [...prev, msg]);
    return msg;
  }, []);

  const agentTurn = useCallback(async (): Promise<boolean> => {
    const sysId = msgIdCounter++;
    setMessages(prev => [...prev, { cls: 'sys', text: S.statusInterviewerThinking, id: sysId }]);
    try {
      const reply = await callClaude(locale.prompts.interview, chatRef.current, 1500);
      setMessages(prev => prev.filter(m => m.id !== sysId));
      chatRef.current.push({ role: 'assistant', content: reply });
      addMsg('ai', reply);
      // Speak the AI reply if voice mode is on
      if (voiceOnRef.current) speakRef.current(reply);
      return true;
    } catch (e) {
      setMessages(prev => prev.filter(m => m.id !== sysId));
      setChatErr((e as Error).message);
      return false;
    }
  }, [callClaude, S, locale.prompts.interview, addMsg]);

  // sendText — core send logic that takes a text string directly
  const agentTurnRef = useRef(agentTurn);
  useEffect(() => {
    agentTurnRef.current = agentTurn;
  }, [agentTurn]);

  const sendText = useCallback(
    async (val: string) => {
      if (!interviewOnRef.current) return;
      if (!val.trim()) return;
      setChatInput('');
      setChatErr('');
      chatRef.current.push({ role: 'user', content: val });
      setMessages(prev => [...prev, { cls: 'user', text: val, id: msgIdCounter++ }]);
      setSendDisabled(true);
      recordInterviewAnswer();
      await agentTurnRef.current();
      setSendDisabled(false);
    },
    [recordInterviewAnswer],
  );

  const startInterview = useCallback(async () => {
    setChatErr('');
    // Check if key is available
    const hasKey = useOwnKey ? !!apiKey.trim() : true;
    if (!hasKey) {
      setChatErr(S.errNoKeyInterview);
      return;
    }
    setMessages([]);
    removeRaw(sessionStorage, INTERVIEW_STORAGE_KEY);
    startTool('interview');
    chatRef.current = [{ role: 'user', content: S.interviewOpener }];
    setInterviewOn(true);
    interviewOnRef.current = true;
    setSendDisabled(false);
    setVerdictDisabled(false);
    setStartLabel(S.btnRestartInterview);
    setMessages([{ cls: 'user', text: S.interviewOpenerMsg, id: msgIdCounter++ }]);
    await agentTurnRef.current();
  }, [useOwnKey, apiKey, S, startTool]);

  useEffect(() => {
    const startSample = () => {
      void startInterview();
    };
    window.addEventListener('ata:start-sample-interview', startSample);
    return () => window.removeEventListener('ata:start-sample-interview', startSample);
  }, [startInterview]);

  const sendAnswer = useCallback(async () => {
    await sendText(chatInput);
  }, [chatInput, sendText]);

  const requestVerdict = useCallback(async () => {
    if (!interviewOn) return;
    setChatErr('');
    chatRef.current.push({ role: 'user', content: '___VERDICT___' });
    setMessages(prev => [
      ...prev,
      { cls: 'sys', text: S.statusGeneratingVerdict, id: msgIdCounter++ },
    ]);
    setSendDisabled(true);
    setVerdictDisabled(true);
    const completed = await agentTurnRef.current();
    if (completed) completeInterview();
    setVerdictDisabled(false);
    setSendDisabled(false);
  }, [interviewOn, S, completeInterview]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendAnswer();
      }
    },
    [sendAnswer],
  );

  const handleMicClick = useCallback(() => {
    if (isListening) stopListening();
    else startListening();
  }, [isListening, startListening, stopListening]);

  return (
    <section id="interview-talk" ref={sectionRef}>
      <h2>
        <span className="num">{t.num}</span> {t.title}
      </h2>
      <p className="lead reveal">{t.lead}</p>
      <div className="agent-box reveal">
        <h3>{t.boxTitle}</h3>
        <p className="notice" style={{ marginBottom: '12px' }}>
          {t.notice}
        </p>
        <div
          className="chat"
          id="chatBox"
          ref={chatBoxRef}
          role="log"
          aria-live="polite"
          aria-label={t.chatAriaLabel}
        >
          {messages.map(msg => (
            <div key={msg.id} className={`msg ${msg.cls}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input" style={{ marginTop: '10px' }}>
          <textarea
            id="chatInput"
            rows={2}
            placeholder={t.chatPlaceholder}
            value={chatInput}
            disabled={!interviewOn}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="primary"
            id="sendBtn"
            disabled={sendDisabled || !interviewOn}
            onClick={sendAnswer}
          >
            {t.sendBtn}
          </button>
        </div>
        {/* Voice mode controls */}
        {voiceSupported && interviewOn && (
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
              className={voiceOn ? 'primary' : 'ghost'}
              id="voiceToggleBtn"
              aria-pressed={voiceOn}
              onClick={toggleVoice}
              style={{ fontSize: '.85rem', padding: '6px 14px' }}
            >
              {voiceOn ? S.btnVoiceOff : S.btnVoiceOn}
            </button>
            {voiceOn && (
              <button
                type="button"
                className={isListening ? 'primary' : 'ghost'}
                id="micBtn"
                disabled={sendDisabled}
                onClick={handleMicClick}
                aria-label={isListening ? S.btnMicListening : S.btnMic}
                style={{ fontSize: '.85rem', padding: '6px 14px' }}
              >
                {isListening ? S.btnMicListening : S.btnMic}
              </button>
            )}
          </div>
        )}
        {voiceSupported === false && interviewOn && (
          <p className="notice" style={{ marginTop: '8px', color: 'var(--muted)' }}>
            {S.errVoiceNotSupported}
          </p>
        )}
        <div id="chatErr" className="error" role="alert">
          {chatErr}
        </div>
        <div style={{ marginTop: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button type="button" className="primary" id="startBtn" onClick={startInterview}>
            {startLabel}
          </button>
          <button
            type="button"
            className="ghost"
            id="verdictBtn"
            disabled={verdictDisabled || !interviewOn}
            onClick={requestVerdict}
          >
            {t.verdictBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
