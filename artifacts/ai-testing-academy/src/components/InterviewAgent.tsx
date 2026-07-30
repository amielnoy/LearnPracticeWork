import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useProviderContext } from '../context/ProviderContext';
import { speak, stopSpeaking, toggleRecognition, ttsSupported, sttSupported, setVoiceLang } from '../lib/voice';
import { useReveal } from '../hooks/useReveal';
import type { Message } from '../lib/providers';

interface ChatMsg {
  cls: 'ai' | 'user' | 'sys';
  text: string;
  id: number;
}

let msgIdCounter = 0;

export function InterviewAgent() {
  const { locale, S, lang } = useLocale();
  const t = locale.interview;
  const { callClaude, apiKey, useOwnKey } = useProviderContext();
  const sectionRef = useReveal();

  const [messages, setMessages] = useState<ChatMsg[]>([
    { cls: 'sys', text: t.initialMsg, id: msgIdCounter++ },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatErr, setChatErr] = useState('');
  const [interviewOn, setInterviewOn] = useState(false);
  const [sendDisabled, setSendDisabled] = useState(true);
  const [verdictDisabled, setVerdictDisabled] = useState(true);
  const [startLabel, setStartLabel] = useState(t.startBtn);
  const [voiceOn, setVoiceOn] = useState(() => !!localStorage.getItem('ata_voice'));
  const [micListening, setMicListening] = useState(false);

  // Use refs for values needed in async callbacks to avoid stale closures
  const chatRef = useRef<Message[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const voiceOnRef = useRef(voiceOn);
  const interviewOnRef = useRef(interviewOn);

  useEffect(() => { voiceOnRef.current = voiceOn; }, [voiceOn]);
  useEffect(() => { interviewOnRef.current = interviewOn; }, [interviewOn]);

  // Keep voice lang in sync
  useEffect(() => {
    setVoiceLang(lang);
  }, [lang]);

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

  // agentTurn uses a ref to beginListening to avoid circular deps
  const beginListeningRef = useRef<() => void>(() => {});

  const agentTurn = useCallback(async (autoListen = true) => {
    const sysId = msgIdCounter++;
    setMessages(prev => [...prev, { cls: 'sys', text: S.statusInterviewerThinking, id: sysId }]);
    try {
      const reply = await callClaude(locale.prompts.interview, chatRef.current, 1500);
      setMessages(prev => prev.filter(m => m.id !== sysId));
      chatRef.current.push({ role: 'assistant', content: reply });
      addMsg('ai', reply);
      if (voiceOnRef.current) {
        speak(reply, autoListen && sttSupported ? () => beginListeningRef.current() : undefined);
      }
    } catch (e) {
      setMessages(prev => prev.filter(m => m.id !== sysId));
      setChatErr((e as Error).message);
    }
  }, [callClaude, S, locale.prompts.interview, addMsg]);

  // sendText — core send logic that takes a text string directly
  const agentTurnRef = useRef(agentTurn);
  useEffect(() => { agentTurnRef.current = agentTurn; }, [agentTurn]);

  const sendText = useCallback(async (val: string) => {
    if (!interviewOnRef.current) return;
    if (!val.trim()) return;
    setChatInput('');
    setChatErr('');
    chatRef.current.push({ role: 'user', content: val });
    setMessages(prev => [...prev, { cls: 'user', text: val, id: msgIdCounter++ }]);
    setSendDisabled(true);
    await agentTurnRef.current();
    setSendDisabled(false);
  }, []);

  const beginListening = useCallback(() => {
    if (!interviewOnRef.current) return;
    toggleRecognition(
      (text) => {
        if (text.trim()) {
          sendText(text);
        }
      },
      setMicListening
    );
  }, [sendText]);

  // Keep the ref in sync
  useEffect(() => { beginListeningRef.current = beginListening; }, [beginListening]);

  const startInterview = useCallback(async () => {
    setChatErr('');
    // Check if key is available
    const hasKey = useOwnKey ? !!apiKey.trim() : true;
    if (!hasKey) {
      setChatErr(S.errNoKeyInterview);
      return;
    }
    setMessages([]);
    chatRef.current = [{ role: 'user', content: S.interviewOpener }];
    setInterviewOn(true);
    interviewOnRef.current = true;
    setSendDisabled(false);
    setVerdictDisabled(false);
    setStartLabel(S.btnRestartInterview);
    setMessages([{ cls: 'user', text: S.interviewOpenerMsg, id: msgIdCounter++ }]);
    await agentTurnRef.current();
  }, [useOwnKey, apiKey, S]);

  const sendAnswer = useCallback(async () => {
    await sendText(chatInput);
  }, [chatInput, sendText]);

  const requestVerdict = useCallback(async () => {
    if (!interviewOn) return;
    setChatErr('');
    chatRef.current.push({ role: 'user', content: '___VERDICT___' });
    setMessages(prev => [...prev, { cls: 'sys', text: S.statusGeneratingVerdict, id: msgIdCounter++ }]);
    setSendDisabled(true);
    setVerdictDisabled(true);
    await agentTurnRef.current(false);
    setVerdictDisabled(false);
    setSendDisabled(false);
  }, [interviewOn, S]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendAnswer();
    }
  }, [sendAnswer]);

  const toggleVoice = useCallback(() => {
    const next = !voiceOn;
    setVoiceOn(next);
    voiceOnRef.current = next;
    localStorage.setItem('ata_voice', next ? '1' : '');
    if (!next) stopSpeaking();
  }, [voiceOn]);

  return (
    <section id="interview-talk" ref={sectionRef}>
      <h2>
        <span className="num">{t.num}</span> {t.title}
      </h2>
      <p className="lead reveal">{t.lead}</p>
      <div className="agent-box reveal">
        <h3>{t.boxTitle}</h3>
        <p className="notice" style={{ marginBottom: '12px' }}>{t.notice}</p>
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
          {sttSupported && (
            <button
              type="button"
              className={`primary mic-btn${micListening ? ' listening' : ''}`}
              id="micBtn"
              title={micListening ? S.micListening : S.micTitle}
              aria-label={micListening ? S.micListening : S.micTitle}
              disabled={!interviewOn}
              onClick={beginListening}
            >
              {micListening ? '⏹️' : '🎙️'}
            </button>
          )}
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
        <div id="chatErr" className="error" role="alert">{chatErr}</div>
        <div style={{ marginTop: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="primary"
            id="startBtn"
            onClick={startInterview}
          >
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
          {ttsSupported && (
            <button
              type="button"
              className="ghost"
              id="voiceBtn"
              aria-pressed={voiceOn}
              onClick={toggleVoice}
              style={{ marginInlineStart: '8px' }}
            >
              {voiceOn ? S.voiceModeOn : S.voiceModeOff}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
