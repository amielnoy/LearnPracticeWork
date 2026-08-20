import { useEffect, useState } from 'react';
import { readText, writeRaw } from '../lib/storage';
import { MAX_RESUME_LENGTH, MAX_ROLE_LENGTH } from '../lib/documentText';

/**
 * The three fields a visitor types into, kept across a reload.
 *
 * The drafts are the visitor's own text and stay in `sessionStorage`, which is
 * the right lifetime for a résumé. The bounds are about what comes back out: a
 * stored value is editable, and these land directly in controlled inputs.
 */
export interface ResumeDrafts {
  resumeText: string;
  setResumeText: (value: string) => void;
  targetRole: string;
  setTargetRole: (value: string) => void;
  jobDesc: string;
  setJobDesc: (value: string) => void;
}

const WRITE_DELAY_MS = 500;

export function useResumeDrafts(lang: string): ResumeDrafts {
  const prefix = `ata_resume_draft_${lang}_`;
  const [resumeText, setResumeText] = useState(() =>
    readText(sessionStorage, prefix + 'resume', MAX_RESUME_LENGTH),
  );
  const [targetRole, setTargetRole] = useState(() =>
    readText(sessionStorage, prefix + 'role', MAX_ROLE_LENGTH),
  );
  const [jobDesc, setJobDesc] = useState(() =>
    readText(sessionStorage, prefix + 'job', MAX_RESUME_LENGTH),
  );

  // Drafts exist so a reload does not lose a pasted résumé, and that is all
  // they are for — so they do not need per-character fidelity. Three effects
  // each firing a synchronous sessionStorage write on every keystroke meant
  // serialising a résumé (commonly 5–10 KB) three times per typed character.
  // One debounced write covers the same ground.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      writeRaw(sessionStorage, prefix + 'resume', resumeText);
      writeRaw(sessionStorage, prefix + 'role', targetRole);
      writeRaw(sessionStorage, prefix + 'job', jobDesc);
    }, WRITE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [prefix, resumeText, targetRole, jobDesc]);

  return { resumeText, setResumeText, targetRole, setTargetRole, jobDesc, setJobDesc };
}
