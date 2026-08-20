import { useEffect, useRef } from 'react';
import type { ChatMsg } from '../../../hooks/useInterviewSession';

export interface ChatTranscriptProps {
  messages: readonly ChatMsg[];
  ariaLabel: string;
}

/** The conversation log, kept scrolled to the newest line. */
export function ChatTranscript({ messages, ariaLabel }: ChatTranscriptProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div
      className="chat"
      id="chatBox"
      ref={boxRef}
      role="log"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      {messages.map(msg => (
        <div key={msg.id} className={`msg ${msg.cls}`}>
          {msg.text}
        </div>
      ))}
    </div>
  );
}
