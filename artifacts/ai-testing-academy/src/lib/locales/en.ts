export const en = {
  dir: 'ltr' as 'ltr' | 'rtl',
  lang: 'en' as string,
  ui: {
    skip: 'Skip to main content',
    navOpen: 'Open navigation menu',
    toTop: 'Back to top',
  },
  nav: {
    logo: 'AI Testing Academy',
    agentsGroup: 'Agents',
    links: [
      { href: '#setup', label: '⚙️ Connection Setup' },
      { href: '#resume', label: '📄 Resume & CV' },
      { href: '#lecture-series', label: '🎓 Lecture Series' },
      { href: '#interview-talk', label: '🎙️ Mock Interview' },
      { href: '#interview-questions', label: '❓ Interview Questions' },
    ],
    communityGroup: 'Community',
    community: [
      { href: 'https://www.youtube.com/@amielnoy', label: '▶ YouTube', cls: 'github-btn', target: '_blank' },
      { href: 'https://www.linkedin.com/in/amiel-peled/', label: '💼 LinkedIn', cls: 'telegram-btn', target: '_blank' },
      { href: 'https://chat.whatsapp.com/Bwjb01CGfxqIE04lkz2us0?mode=gi_t', label: '💬 AI Automation & DevOps Community', cls: 'whatsapp-btn', target: '_blank' },
    ],
    themeToggle: { ariaLabel: 'Toggle theme' },
    langToggle: { ariaLabel: 'Switch language', label: 'עברית' },
  },
  hero: {
    h1Line1: 'AI Testing Academy',
    h1Line2: 'Your AI-Powered QA Career Launchpad',
    p: 'Master test automation, DevOps, and AI testing with hands-on agents, structured lectures, and real interview practice. Built for QA engineers who want to stay ahead of the curve.',
    badges: ['🤖 AI Agents', '🎙️ Mock Interviews', '📄 Resume Review', '🎓 Lecture Series', '🐳 DevOps & CI'],
    cta: [
      { href: '#setup', label: 'Get Started →', cls: 'primary' },
      { href: '#lecture-series', label: 'Watch Lectures', cls: 'ghost' },
    ],
    tldr: {
      heading: 'What you get:',
      items: [
        { b: 'Agent 1', text: ' — AI resume scorer and rewriter for QA roles' },
        { b: 'Agent 2', text: ' — Live mock interview with voice mode, 5 stages' },
        { b: 'Lecture Series', text: ' — 10 in-depth lectures on AI Testing' },
        { b: 'Question Bank', text: ' — 25+ real interview questions + AI enrichment' },
      ],
    },
  },
  setup: {
    num: '01',
    title: 'Connection Setup',
    lead: 'Connect your AI provider once — both agents share the same key. Gemini has a free tier; Claude gives the best resume rewrites.',
    boxTitle: '🔌 Choose your AI provider',
    providerLabel: 'Provider',
    modelLabel: 'Model',
    testBtn: '🔗 Test connection',
    useOwnKeyLabel: 'Use my own API key',
    apiKeyLabel: 'API Key',
    resetBtn: '🔄 Reset all settings',
    notice: "If you enter your own key, it's stored only in your browser's localStorage and sent directly to the provider's API. If you use the default key, requests are proxied through our server — the key itself never reaches your browser.",
    providers: [
      { value: 'gemini', label: 'Gemini (Google)' },
      { value: 'anthropic', label: 'Claude (Anthropic)' },
      { value: 'openai', label: 'GPT (OpenAI)' },
    ],
  },
  resume: {
    num: '02',
    title: 'Agent 1 — Resume & Cover Letter',
    lead: 'Upload your CV and get a scored evaluation with strengths, gaps, and an AI-rewritten version tailored to any QA or SDET role.',
    boxTitle: '📄 Evaluate & improve your resume',
    targetRoleLabel: 'Target role',
    targetRoleOptional: '(optional)',
    targetRolePlaceholder: 'e.g. SDET, QA Automation Lead, DevOps Engineer',
    uploadZoneAriaLabel: 'Upload resume — click or drag a file',
    uploadPrompt: '📁 Click or drag your resume here — PDF, DOCX, or TXT',
    pasteLabel: 'Or paste your resume text:',
    pastePlaceholder: 'Paste your resume text here…',
    jobDescLabel: 'Job description',
    jobDescOptional: '(optional — for targeted rewrite)',
    jobDescPlaceholder: 'Paste the job description here to get a targeted rewrite…',
    evaluateBtn: '📊 Evaluate resume',
    scoreAriaLabel: 'Overall score',
    strengthsTitle: '✅ Strengths',
    gapsTitle: '⚠️ Gaps',
    recsTitle: '💡 Recommendations',
    buildResumeBtn: '✨ Build improved resume',
    improvedTitle: '✨ Improved resume',
    downloadPdfBtn: '⬇️ Download as PDF',
  },
  interview: {
    num: '05',
    title: 'Agent 2 — Mock Interview',
    lead: 'Run a realistic QA-Automation interview with an AI interviewer — five stages, from HR to AI testing. Voice mode lets you practice completely hands-free.',
    boxTitle: '🎙️ Start your mock interview',
    notice: 'Make sure the connection is configured above. The agent uses the same API key.',
    chatAriaLabel: 'Interview chat',
    initialMsg: 'Press "Start interview" to begin. The AI interviewer will guide you through all five stages.',
    chatPlaceholder: 'Type your answer… (Enter to send, Shift+Enter for new line)',
    sendBtn: 'Send',
    startBtn: '▶️ Start interview',
    verdictBtn: '🏁 Get verdict',
  },
  footer: {
    year: new Date().getFullYear(),
    text: 'AI Testing Academy · Built by',
    authorHref: 'https://www.linkedin.com/in/amiel-peled/',
    authorName: 'Amiel Peled',
    suffix: '· For QA engineers who want to stay ahead',
  },
  s: {
    keyLabelGemini: 'Gemini API Key',
    keyLabelAnthropic: 'Claude API Key',
    keyLabelOpenai: 'OpenAI API Key',
    errGeminiKeyHint: ' (Gemini keys start with AIza — get one free at aistudio.google.com)',
    errKeyNotAnthropic: 'This looks like an OpenAI key. Switch the provider dropdown to OpenAI.',
    errKeyNotOpenai: 'This looks like an Anthropic key. Switch the provider dropdown to Claude.',
    placeholderEnvKey: '(using server-configured default key)',
    labelSuffixLocal: ' Key',
    labelSuffixEnv: ' Key (server default)',
    statusTesting: '⏳ Testing connection…',
    statusOkPrefix: '✅ Connected (',
    pingSystem: 'You are a helpful assistant. Reply with exactly the word: OK',
    pingUser: 'Ping',
    errNoKey: 'No API key set. Add your key in Connection Setup above.',
    errBlockedPrefix: 'Network error reaching ',
    errBlockedMid: '. Possible causes:\n',
    errBlockedCauses: '• CORS policy blocking the browser-direct request\n• Firewall or network issue\n',
    errBlockedTry: 'Try switching to a different provider.\n',
    errBlockedOpenUrl: '',
    errApiPrefix: 'API error (',
    errNoJson: 'Could not parse JSON from the model response. Please try again.',
    uploadReading: '⏳ Reading ',
    uploadPrompt: '📁 Click or drag your resume here — PDF, DOCX, or TXT',
    uploadLoadedMid: ' · ',
    uploadLoadedSuffix: ' chars loaded',
    errCdnFail: 'Could not load the parser library:\n',
    errFormatPrefix: 'Unsupported file type: ',
    errFormatSuffix: '. Please use PDF, DOCX, or TXT.',
    errExtractFail: 'Could not extract text. Try copying and pasting the text manually.',
    errResumeEmpty: 'Please paste or upload your resume first.',
    errNoEval: 'Please evaluate the resume first before building the improved version.',
    btnEvaluating: '⏳ Evaluating…',
    btnEvaluate: '📊 Evaluate resume',
    btnImproving: '⏳ Building improved resume…',
    btnBuildResume: '✨ Build improved resume',
    btnPreparingPdf: '⏳ Preparing PDF…',
    btnDownloadPdf: '⬇️ Download as PDF',
    promptRolePrefix: 'Target role: ',
    promptResumeLabel: '\n\nResume text:\n',
    promptRolePrefixImprove: 'Rewrite the following resume for the target role: ',
    promptJobDescLabel: '\n\nJob description to tailor for:\n',
    promptEvalResultsLabel: '\n\nPrevious evaluation results (gaps and recommendations to address):\n',
    promptOriginalResumeLabel: '\n\nOriginal resume:\n',
    statusInterviewerThinking: '⏳ Interviewer is thinking…',
    statusGeneratingVerdict: '⏳ Generating your verdict…',
    errNoKeyInterview: 'Set your API key in Connection Setup first, then start the interview.',
    interviewOpener: 'Please start the interview. I am ready.',
    interviewOpenerMsg: "Ready — let's go!",
    btnRestartInterview: '🔄 Restart interview',
    voiceModeOn: '🔊 Voice ON',
    voiceModeOff: '🔇 Voice OFF',
    micTitle: 'Click to speak your answer',
    micListening: 'Listening… click to stop',
    videoLoading: 'Loading video…',
    videoMissingPrefix: 'Video file not found: ',
    videoMissingSuffix: '',
    themeLabelLight: 'Light mode',
    themeLabelDark: 'Dark mode',
    copyBtn: 'Copy',
    copyBtnDone: '✅ Copied!',
    copyBtnReset: 'Copy',
    copyBtnFail: '❌ Failed to copy',
  },
  prompts: {
    resume: `You are an expert QA/SDET career coach reviewing a resume for QA Automation roles.
Evaluate the resume thoroughly and return ONLY valid JSON — no prose, no markdown outside the JSON block:
{"overall":75,"summary":"One concise sentence summarizing overall resume quality and fit for QA roles.","categories":[{"name":"Technical Skills","score":80},{"name":"Testing Frameworks","score":75},{"name":"CI/CD & DevOps","score":65},{"name":"AI & LLM Testing","score":50},{"name":"Clarity & Impact","score":80}],"strengths":["Clear strength 1","Clear strength 2","Clear strength 3"],"gaps":["Gap 1","Gap 2","Gap 3"],"recommendations":["Specific actionable recommendation 1","Specific actionable recommendation 2","Specific actionable recommendation 3"]}`,
    improve: `You are an expert QA/SDET career coach and professional resume writer. Rewrite the provided resume to be compelling, ATS-friendly, and perfectly targeted for QA Automation and SDET roles. Guidelines:
- Use strong action verbs (Built, Designed, Automated, Reduced, Improved, Led)
- Quantify impact wherever possible (reduced test runtime by 40%, 95% coverage)
- Highlight test automation, CI/CD, and AI/LLM testing experience prominently
- Tailor wording to the provided job description if given
- Keep the same factual information — do not invent experience
Return ONLY the rewritten resume text — no JSON, no markdown headers, no commentary before or after.`,
    interview: `You are a senior QA Automation interviewer conducting a structured technical interview for a QA/SDET/DevOps role. 
Progress through these 5 stages in order, spending 2-3 questions on each before moving to the next:

Stage 1 — HR & Motivation: background, why QA automation, career goals, culture fit
Stage 2 — Test Automation Knowledge: frameworks (Playwright, Selenium, pytest), strategies, Page Object Model, flakiness
Stage 3 — Code & API Testing: practical Python/JS concepts, REST API testing, mocking, debugging flaky tests
Stage 4 — DevOps & CI/CD: GitHub Actions, Docker, parallel test execution, pipeline design
Stage 5 — AI Testing: testing LLM features, prompt injection, non-determinism, LLM-as-judge evaluation

Rules:
- Ask exactly ONE question at a time
- Be professional but conversational and encouraging
- After each answer, give ONE sentence of brief constructive feedback before asking the next question
- Track which stage you are in and announce stage transitions naturally
- When you receive "___VERDICT___", stop the interview and provide a structured verdict:
  * Score each stage 1-10 with a one-sentence rationale
  * Overall hiring recommendation (Strong Hire / Hire / Borderline / No Hire)
  * Top 3 strengths observed
  * Top 3 specific areas to improve before the next interview
  * Encouragement and next steps`,
  },
};

export type Locale = typeof en;
