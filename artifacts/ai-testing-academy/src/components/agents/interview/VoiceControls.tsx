import type { Locale } from '../../../lib/locales';

export interface VoiceControlsProps {
  S: Locale['s'];
  /** `undefined` while support is still being determined. */
  isSupported: boolean | undefined;
  voiceOn: boolean;
  isListening: boolean;
  micDisabled: boolean;
  onToggleVoice: () => void;
  onMicClick: () => void;
}

const BUTTON_STYLE = { fontSize: '.85rem', padding: '6px 14px' } as const;

/** Speech controls, shown only once an interview is running and the browser can. */
export function VoiceControls({
  S,
  isSupported,
  voiceOn,
  isListening,
  micDisabled,
  onToggleVoice,
  onMicClick,
}: VoiceControlsProps) {
  if (isSupported === false) {
    return (
      <p className="notice" style={{ marginTop: '8px', color: 'var(--muted)' }}>
        {S.errVoiceNotSupported}
      </p>
    );
  }
  if (!isSupported) return null;

  return (
    <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button
        type="button"
        className={voiceOn ? 'primary' : 'ghost'}
        id="voiceToggleBtn"
        aria-pressed={voiceOn}
        onClick={onToggleVoice}
        style={BUTTON_STYLE}
      >
        {voiceOn ? S.btnVoiceOff : S.btnVoiceOn}
      </button>
      {voiceOn && (
        <button
          type="button"
          className={isListening ? 'primary' : 'ghost'}
          id="micBtn"
          disabled={micDisabled}
          onClick={onMicClick}
          aria-label={isListening ? S.btnMicListening : S.btnMic}
          style={BUTTON_STYLE}
        >
          {isListening ? S.btnMicListening : S.btnMic}
        </button>
      )}
    </div>
  );
}
