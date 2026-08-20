import { useCallback, useEffect, useState } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { useProviderContext } from '../../context/ProviderContext';
import { useProgress } from '../../context/ProgressContext';
import { useReveal } from '../../hooks/useReveal';
import { useVoice } from '../../hooks/useVoice';
import { useInterviewSession } from '../../hooks/useInterviewSession';
import { sectionNum } from '../../lib/sections';
import { AiDataConsent } from './AiDataConsent';
import { ChatTranscript } from './interview/ChatTranscript';
import { VoiceControls } from './interview/VoiceControls';

/**
 * The mock-interview tool.
 *
 * The conversation, its persistence and its turn-taking live in
 * `useInterviewSession`; speech lives in `useVoice`. What is left here is the
 * form around them and the one thing that genuinely joins the two: an agent
 * reply is spoken only while voice mode is on.
 */
export function InterviewAgent() {
  const { locale, S } = useLocale();
  const t = locale.interview;
  const { callClaude, apiKey, useOwnKey } = useProviderContext();
  const { startTool, recordInterviewAnswer, completeInterview } = useProgress();
  const sectionRef = useReveal();

  const [chatInput, setChatInput] = useState('');
  const [dataConsent, setDataConsent] = useState(false);

  const handleTranscript = useCallback((text: string) => setChatInput(text), []);
  const {
    isSupported: voiceSupported,
    voiceOn,
    toggleVoice,
    isListening,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  } = useVoice({ lang: S.voiceLang, onFinalTranscript: handleTranscript });

  useEffect(() => {
    if (!voiceOn) cancelSpeech();
  }, [voiceOn, cancelSpeech]);

  const speakReply = useCallback(
    (text: string) => {
      if (voiceOn) speak(text);
    },
    [voiceOn, speak],
  );

  const interview = useInterviewSession({
    lang: locale.lang,
    S,
    prompt: locale.prompts.interview,
    initialMessage: t.initialMsg,
    defaultStartLabel: t.startBtn,
    hasConsent: dataConsent,
    consentRequiredMessage:
      locale.lang === 'he'
        ? 'יש לקרוא ולאשר את הודעת הפרטיות לפני תחילת הראיון.'
        : 'Read and accept the privacy notice before starting the interview.',
    hasKey: useOwnKey ? !!apiKey.trim() : true,
    callClaude,
    onStart: useCallback(() => startTool('interview'), [startTool]),
    onAnswer: recordInterviewAnswer,
    onComplete: completeInterview,
    onAgentReply: speakReply,
  });

  const { start, send, applyConsent } = interview;
  const sendAnswer = useCallback(() => {
    const text = chatInput;
    setChatInput('');
    void send(text);
  }, [chatInput, send]);

  useEffect(() => {
    const startSample = () => void start();
    window.addEventListener('ata:start-sample-interview', startSample);
    return () => window.removeEventListener('ata:start-sample-interview', startSample);
  }, [start]);

  return (
    <section id="interview-talk" ref={sectionRef}>
      <h2>
        <span className="num">{sectionNum('interview-talk')}</span> {t.title}
      </h2>
      <p className="lead reveal">{t.lead}</p>
      <div className="agent-box reveal">
        <h3>{t.boxTitle}</h3>
        <p className="notice" style={{ marginBottom: '12px' }}>
          {t.notice}
        </p>
        <AiDataConsent
          id="interviewDataConsent"
          checked={dataConsent}
          onChange={checked => {
            setDataConsent(checked);
            applyConsent(checked);
          }}
        />
        <ChatTranscript messages={interview.messages} ariaLabel={t.chatAriaLabel} />
        <div className="chat-input" style={{ marginTop: '10px' }}>
          <textarea
            id="chatInput"
            rows={2}
            placeholder={t.chatPlaceholder}
            value={chatInput}
            disabled={!interview.interviewOn}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendAnswer();
              }
            }}
          />
          <button
            type="button"
            className="primary"
            id="sendBtn"
            disabled={interview.sendDisabled || !interview.interviewOn}
            onClick={sendAnswer}
          >
            {t.sendBtn}
          </button>
        </div>
        {interview.interviewOn && (
          <VoiceControls
            S={S}
            isSupported={voiceSupported}
            voiceOn={voiceOn}
            isListening={isListening}
            micDisabled={interview.sendDisabled}
            onToggleVoice={toggleVoice}
            onMicClick={() => (isListening ? stopListening() : startListening())}
          />
        )}
        <div id="chatErr" className="error" role="alert">
          {interview.error}
        </div>
        <div style={{ marginTop: '14px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="primary"
            id="startBtn"
            disabled={!dataConsent}
            onClick={() => void start()}
          >
            {interview.startLabel}
          </button>
          <button
            type="button"
            className="ghost"
            id="verdictBtn"
            disabled={interview.verdictDisabled || !interview.interviewOn}
            onClick={() => void interview.requestVerdict()}
          >
            {t.verdictBtn}
          </button>
        </div>
      </div>
    </section>
  );
}
