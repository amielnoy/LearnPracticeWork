import { useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from '../lib/locales';
import type { Message } from '../lib/providers';
import {
  clearInterview,
  loadInterview,
  saveInterview,
  type TranscriptRole,
} from '../lib/interviewSession';

/** A line in the visible transcript. `sys` lines are status notes, never saved. */
export interface ChatMsg {
  cls: TranscriptRole | 'sys';
  text: string;
  id: number;
}

let msgIdCounter = 0;

const AGENT_MAX_TOKENS = 1500;
const VERDICT_TRIGGER = '___VERDICT___';

export interface InterviewSessionOptions {
  lang: string;
  S: Locale['s'];
  prompt: string;
  initialMessage: string;
  /** The start button's label before an interview has ever been started. */
  defaultStartLabel: string;
  hasConsent: boolean;
  consentRequiredMessage: string;
  /** Whether a usable key is in place; the reason is reported by the caller's message. */
  hasKey: boolean;
  callClaude: (system: string, messages: Message[], maxTokens?: number) => Promise<string>;
  onStart: () => void;
  onAnswer: () => void;
  onComplete: () => void;
  /** Each finished agent reply, so the caller can speak it aloud. */
  onAgentReply: (text: string) => void;
}

export interface InterviewSession {
  messages: ChatMsg[];
  error: string;
  interviewOn: boolean;
  sendDisabled: boolean;
  verdictDisabled: boolean;
  startLabel: string;
  start: () => Promise<void>;
  send: (text: string) => Promise<void>;
  requestVerdict: () => Promise<void>;
  /** Consent can be withdrawn mid-interview, which must stop the next send. */
  applyConsent: (granted: boolean) => void;
}

/**
 * The interview itself: whose turn it is, what has been said, and what is
 * persisted. It knows nothing about voice, layout or the surrounding page.
 */
export function useInterviewSession({
  lang,
  S,
  prompt,
  initialMessage,
  defaultStartLabel,
  hasConsent,
  consentRequiredMessage,
  hasKey,
  callClaude,
  onStart,
  onAnswer,
  onComplete,
  onAgentReply,
}: InterviewSessionOptions): InterviewSession {
  const [saved] = useState(() => loadInterview(lang));
  const resumed = saved?.interviewOn ?? false;

  const [messages, setMessages] = useState<ChatMsg[]>(() =>
    saved?.messages.length
      ? saved.messages.map(message => ({ ...message, id: msgIdCounter++ }))
      : [{ cls: 'sys', text: initialMessage, id: msgIdCounter++ }],
  );
  const [error, setError] = useState('');
  const [interviewOn, setInterviewOn] = useState(resumed);
  const [sendDisabled, setSendDisabled] = useState(!resumed);
  const [verdictDisabled, setVerdictDisabled] = useState(!resumed);
  const [startLabel, setStartLabel] = useState(resumed ? S.btnRestartInterview : defaultStartLabel);

  /** The model's own view of the conversation, which is not what is rendered. */
  const chatRef = useRef<Message[]>(saved?.chat ?? []);
  // Refs mirror the state an async turn reads after awaiting, where the closure
  // it captured is already out of date.
  const interviewOnRef = useRef(interviewOn);
  const consentRef = useRef(hasConsent);
  const replyRef = useRef(onAgentReply);
  useEffect(() => {
    interviewOnRef.current = interviewOn;
  }, [interviewOn]);
  useEffect(() => {
    consentRef.current = hasConsent;
  }, [hasConsent]);
  useEffect(() => {
    replyRef.current = onAgentReply;
  }, [onAgentReply]);

  useEffect(() => {
    if (!interviewOn) return;
    saveInterview({
      lang,
      messages: messages
        .filter((message): message is ChatMsg & { cls: TranscriptRole } => message.cls !== 'sys')
        .map(({ cls, text }) => ({ cls, text })),
      chat: chatRef.current,
      interviewOn,
    });
  }, [interviewOn, lang, messages]);

  const agentTurn = useCallback(async (): Promise<boolean> => {
    const statusId = msgIdCounter++;
    setMessages(prev => [...prev, { cls: 'sys', text: S.statusInterviewerThinking, id: statusId }]);
    try {
      const reply = await callClaude(prompt, chatRef.current, AGENT_MAX_TOKENS);
      chatRef.current.push({ role: 'assistant', content: reply });
      setMessages(prev => [
        ...prev.filter(m => m.id !== statusId),
        { cls: 'ai', text: reply, id: msgIdCounter++ },
      ]);
      replyRef.current(reply);
      return true;
    } catch (e) {
      setMessages(prev => prev.filter(m => m.id !== statusId));
      setError((e as Error).message);
      return false;
    }
  }, [callClaude, prompt, S.statusInterviewerThinking]);

  const agentTurnRef = useRef(agentTurn);
  useEffect(() => {
    agentTurnRef.current = agentTurn;
  }, [agentTurn]);

  const send = useCallback(
    async (text: string) => {
      if (!interviewOnRef.current || !consentRef.current || !text.trim()) return;
      setError('');
      chatRef.current.push({ role: 'user', content: text });
      setMessages(prev => [...prev, { cls: 'user', text, id: msgIdCounter++ }]);
      setSendDisabled(true);
      onAnswer();
      await agentTurnRef.current();
      setSendDisabled(false);
    },
    [onAnswer],
  );

  const start = useCallback(async () => {
    setError('');
    if (!hasConsent) return setError(consentRequiredMessage);
    if (!hasKey) return setError(S.errNoKeyInterview);

    clearInterview();
    onStart();
    chatRef.current = [{ role: 'user', content: S.interviewOpener }];
    setInterviewOn(true);
    interviewOnRef.current = true;
    setSendDisabled(false);
    setVerdictDisabled(false);
    setStartLabel(S.btnRestartInterview);
    setMessages([{ cls: 'user', text: S.interviewOpenerMsg, id: msgIdCounter++ }]);
    await agentTurnRef.current();
  }, [hasConsent, consentRequiredMessage, hasKey, S, onStart]);

  const requestVerdict = useCallback(async () => {
    if (!interviewOnRef.current) return;
    setError('');
    chatRef.current.push({ role: 'user', content: VERDICT_TRIGGER });
    setMessages(prev => [
      ...prev,
      { cls: 'sys', text: S.statusGeneratingVerdict, id: msgIdCounter++ },
    ]);
    setSendDisabled(true);
    setVerdictDisabled(true);
    if (await agentTurnRef.current()) onComplete();
    setVerdictDisabled(false);
    setSendDisabled(false);
  }, [S.statusGeneratingVerdict, onComplete]);

  const applyConsent = useCallback((granted: boolean) => {
    if (interviewOnRef.current) setSendDisabled(!granted);
  }, []);

  return {
    messages,
    error,
    interviewOn,
    sendDisabled,
    verdictDisabled,
    startLabel,
    start,
    send,
    requestVerdict,
    applyConsent,
  };
}
