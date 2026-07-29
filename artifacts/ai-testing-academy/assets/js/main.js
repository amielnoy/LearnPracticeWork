/* Entry point. Apply locale (injects nav/hero/main/footer), wire agents,
   add the lecture series section, add the interview-questions section, then
   apply UX enhancements. */
import { $ } from './dom.js';
import { applyLocale } from './i18n.js';
import { initProviders, onProviderChange, testConnection, resetSettings } from './providers.js';
import { initResume, handleResumeFile, evaluateResume, showImprovedResume, downloadImprovedPdf } from './resume.js';
import { initInterview, startInterview, sendAnswer, requestVerdict } from './interview.js';
import { initLectures } from './lectures.js';
import { initQuestions } from './questions.js';
import { initUx } from './ux.js';

applyLocale();        // must be first — creates the DOM the rest queries
initProviders();
initResume();
initInterview();
initLectures();       // adds Lecture Series section + nav link (before #interview-talk)
initQuestions();      // adds Interview Questions section + nav link (after #interview-talk)
initUx();

// Inline handlers in the injected HTML resolve against the global scope.
Object.assign(window, {
  $,
  onProviderChange, testConnection, resetSettings,
  handleResumeFile, evaluateResume, showImprovedResume, downloadImprovedPdf,
  startInterview, sendAnswer, requestVerdict
});
