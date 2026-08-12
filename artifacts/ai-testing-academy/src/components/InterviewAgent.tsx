import { useState, useRef, useCallback, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useProviderContext } from '../context/ProviderContext';
import { useReveal } from '../hooks/useReveal';
import type { Message } from '../lib/providers';
import { useProgress } from '../context/ProgressContext';

interface ChatMsg {
  cls: 'ai' | 'user' | 'sys';
  text: string;
  id: number;
}

let msgIdCounter = 0;
const INTERVIEW_STORAGE_KEY = 'ata_interview_session_v1';

interface SavedInterview {
  lang: string;
  messages: Array<{ cls: 'ai' | 'user'; text: string }>;
  chat: Message[];
  interviewOn: boolean;
}

function loadInterview(lang: string): SavedInterview | null {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(INTERVIEW_STORAGE_KEY) || 'null',
    ) as SavedInterview | null;
    if (
      !parsed ||
      parsed.lang !== lang ||
      !Array.isArray(parsed.messages) ||
      !Array.isArray(parsed.chat)
    )
      return null;
    return parsed;
  } catch {
    return null;
  }
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

  useEffect(() => {
    if (!interviewOn) return;
    const resumableMessages = messages
      .filter((message): message is ChatMsg & { cls: 'ai' | 'user' } => message.cls !== 'sys')
      .map(({ cls, text }) => ({ cls, text }));
    localStorage.setItem(
      INTERVIEW_STORAGE_KEY,
      JSON.stringify({
        lang: locale.lang,
        messages: resumableMessages,
        chat: chatRef.current,
        interviewOn,
      } satisfies SavedInterview),
    );
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
    localStorage.removeItem(INTERVIEW_STORAGE_KEY);
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
