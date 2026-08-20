import { useRef } from 'react';

export interface ResumeUploadZoneProps {
  label: string;
  ariaLabel: string;
  isDragging: boolean;
  onDraggingChange: (dragging: boolean) => void;
  onFile: (file: File | undefined | null) => void;
}

/**
 * The drop target and hidden file input. It holds no knowledge of formats or
 * limits — it hands a `File` over and shows whatever label it is given.
 */
export function ResumeUploadZone({
  label,
  ariaLabel,
  isDragging,
  onDraggingChange,
  onFile,
}: ResumeUploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <label
      className={`upload-zone${isDragging ? ' drag' : ''}`}
      id="uploadZone"
      tabIndex={0}
      role="button"
      aria-label={ariaLabel}
      onDragOver={e => {
        e.preventDefault();
        onDraggingChange(true);
      }}
      onDragEnter={e => {
        e.preventDefault();
        onDraggingChange(true);
      }}
      onDragLeave={e => {
        e.preventDefault();
        onDraggingChange(false);
      }}
      onDrop={e => {
        e.preventDefault();
        onDraggingChange(false);
        onFile(e.dataTransfer?.files[0]);
      }}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
    >
      <input
        type="file"
        id="resumeFile"
        ref={fileInputRef}
        accept=".pdf,.docx,.txt"
        style={{ display: 'none' }}
        // Cleared after each pick: the input only fires `change` when the
        // selection differs from what it already holds, so re-choosing the
        // same file after a failed read was silently doing nothing.
        onChange={e => {
          const file = e.target.files?.[0];
          e.target.value = '';
          onFile(file);
        }}
      />
      <span id="uploadLabel">{label}</span>
    </label>
  );
}
