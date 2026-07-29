export const en = {
  dir: 'ltr',
  ui: {
    skip: 'Skip to main content',
    navOpen: 'Open navigation menu',
    toTop: 'Back to top'
  },
  nav: `
    <a class="logo" href="#" style="text-decoration:none;display:block;margin-bottom:8px;">AI Testing Academy</a>
    <span class="nav-group">Agents</span>
    <a class="link" href="#setup">⚙️ Connection Setup</a>
    <a class="link" href="#resume">📄 Resume &amp; CV</a>
    <a class="link" href="#interview-talk">🎙️ Mock Interview</a>
    <span class="nav-group">Community</span>
    <a class="link github-btn" href="https://www.youtube.com/@amielnoy" target="_blank" rel="noopener">▶ YouTube</a>
    <a class="link telegram-btn" href="https://www.linkedin.com/in/amiel-peled/" target="_blank" rel="noopener">💼 LinkedIn</a>
    <a class="link whatsapp-btn" href="https://chat.whatsapp.com/Bwjb01CGfxqIE04lkz2us0?mode=gi_t" target="_blank" rel="noopener">💬 AI Automation & DevOps Community</a>
    <button type="button" id="themeToggle" class="theme-toggle" aria-label="Toggle theme">
      <span id="themeIcon">🌙</span>
      <span id="themeLabel">Dark mode</span>
    </button>
    <button type="button" id="langToggle" class="theme-toggle" aria-label="Switch language">
      <span id="langIcon">🌐</span>
      <span id="langLabel">עברית</span>
    </button>
  `,
  hero: `
    <h1><span>AI Testing Academy</span><br>Your AI-Powered QA Career Launchpad</h1>
    <p>Master test automation, DevOps, and AI testing with hands-on agents, structured lectures, and real interview practice. Built for QA engineers who want to stay ahead of the curve.</p>
    <div class="badges">
      <span class="badge">🤖 AI Agents</span>
      <span class="badge">🎙️ Mock Interviews</span>
      <span class="badge">📄 Resume Review</span>
      <span class="badge">🎓 Lecture Series</span>
      <span class="badge">🐳 DevOps &amp; CI</span>
    </div>
    <div class="hero-cta">
      <a class="primary" href="#setup">Get Started →</a>
      <a class="ghost" href="#lecture-series">Watch Lectures</a>
    </div>
    <div class="tldr">
      <b>What you get:</b>
      <ul>
        <li><b>Agent 1</b> — AI resume scorer and rewriter for QA roles</li>
        <li><b>Agent 2</b> — Live mock interview with voice mode, 5 stages</li>
        <li><b>Lecture Series</b> — 10 in-depth lectures on AI Testing</li>
        <li><b>Question Bank</b> — 25+ real interview questions + AI enrichment</li>
      </ul>
    </div>
  `,
  main: `
    <!-- ── Connection Setup ── -->
    <section id="setup">
      <h2><span class="num">01</span> Connection Setup</h2>
      <p class="lead">Connect your AI provider once — both agents share the same key. Gemini has a free tier; Claude gives the best resume rewrites.</p>
      <div class="agent-box">
        <h3>🔌 Choose your AI provider</h3>
        <div class="keybar">
          <div>
            <label for="providerSel">Provider</label>
            <select id="providerSel" onchange="onProviderChange()">
              <option value="gemini">Gemini (Google)</option>
              <option value="anthropic">Claude (Anthropic)</option>
              <option value="openai">GPT (OpenAI)</option>
            </select>
          </div>
          <div>
            <label for="modelSel">Model</label>
            <select id="modelSel"></select>
          </div>
          <div style="align-self:end;">
            <button type="button" class="primary" onclick="testConnection()" style="margin-top:0;">🔗 Test connection</button>
          </div>
        </div>
        <div id="ownKeyRow" style="margin-top:14px;">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin:0 0 10px;">
            <input type="checkbox" id="useOwnKey" style="width:auto;margin:0;"> Use my own API key
          </label>
          <label id="apiKeyLabel" for="apiKey" style="font-size:.85rem;color:var(--muted);display:block;margin-bottom:6px;">API Key</label>
          <input type="password" id="apiKey" autocomplete="off" style="font-family:monospace;" placeholder="Paste your key here…">
        </div>
        <p id="connStatus" class="notice" aria-live="polite" style="min-height:1.4em;"></p>
        <button type="button" class="ghost" onclick="resetSettings()" style="margin-top:4px;">🔄 Reset all settings</button>
        <p class="notice" style="margin-top:8px;">If you enter your own key, it's stored only in your browser's localStorage and sent directly to the provider's API. If you use the default key, requests are proxied through our server — the key itself never reaches your browser.</p>
      </div>
    </section>

    <!-- ── Agent 1: Resume & CV ── -->
    <section id="resume">
      <h2><span class="num">02</span> Agent 1 — Resume &amp; Cover Letter</h2>
      <p class="lead">Upload your CV and get a scored evaluation with strengths, gaps, and an AI-rewritten version tailored to any QA or SDET role.</p>
      <div class="agent-box">
        <h3>📄 Evaluate &amp; improve your resume</h3>
        <label for="targetRole">Target role <span style="color:var(--muted);font-weight:400;">(optional)</span></label>
        <input type="text" id="targetRole" placeholder="e.g. SDET, QA Automation Lead, DevOps Engineer">
        <label class="upload-zone" id="uploadZone" tabindex="0" role="button" aria-label="Upload resume — click or drag a file">
          <input type="file" id="resumeFile" accept=".pdf,.docx,.txt" style="display:none" onchange="handleResumeFile(this.files[0])">
          <span id="uploadLabel">📁 Click or drag your resume here — PDF, DOCX, or TXT</span>
        </label>
        <label for="resumeText" style="margin-top:14px;display:block;">Or paste your resume text:</label>
        <textarea id="resumeText" rows="7" placeholder="Paste your resume text here…"></textarea>
        <label for="jobDesc">Job description <span style="color:var(--muted);font-weight:400;">(optional — for targeted rewrite)</span></label>
        <textarea id="jobDesc" rows="4" placeholder="Paste the job description here to get a targeted rewrite…"></textarea>
        <div id="resumeErr" class="error" role="alert"></div>
        <button type="button" class="primary" id="resumeBtn" onclick="evaluateResume()">📊 Evaluate resume</button>
      </div>

      <div id="resumeResult" style="display:none;margin-top:22px;">
        <div class="score-wrap">
          <div class="score-circle" id="resumeScore" aria-label="Overall score">–</div>
          <p id="resumeSummary" style="flex:1;color:var(--muted);font-size:.95rem;"></p>
        </div>
        <div id="resumeBars"></div>
        <div class="result-cols">
          <div class="card">
            <h4>✅ Strengths</h4>
            <ul id="resumeStrengths"></ul>
          </div>
          <div class="card">
            <h4>⚠️ Gaps</h4>
            <ul id="resumeGaps"></ul>
          </div>
        </div>
        <div class="card" style="margin-top:14px;">
          <h4>💡 Recommendations</h4>
          <ul id="resumeRecs"></ul>
        </div>
        <div style="margin-top:22px;">
          <button type="button" class="primary" id="improveBtn" onclick="showImprovedResume()">✨ Build improved resume</button>
        </div>
        <div id="improvedErr" class="error" role="alert"></div>
        <div id="improvedWrap" style="display:none;margin-top:22px;">
          <div class="card">
            <h4>✨ Improved resume</h4>
            <pre id="improvedText" style="background:transparent;border:none;box-shadow:none;padding:0;white-space:pre-wrap;font-family:inherit;font-size:.9rem;"></pre>
          </div>
          <button type="button" class="ghost" id="pdfBtn" onclick="downloadImprovedPdf()">⬇️ Download as PDF</button>
        </div>
      </div>
    </section>

    <!-- ── Agent 2: Mock Interview ── -->
    <section id="interview-talk">
      <h2><span class="num">05</span> Agent 2 — Mock Interview</h2>
      <p class="lead">Run a realistic QA-Automation interview with an AI interviewer — five stages, from HR to AI testing. Voice mode lets you practice completely hands-free.</p>
      <div class="agent-box">
        <h3>🎙️ Start your mock interview</h3>
        <p class="notice" style="margin-bottom:12px;">Make sure the connection is configured above. The agent uses the same API key.</p>
        <div class="chat" id="chatBox" role="log" aria-live="polite" aria-label="Interview chat">
          <div class="msg sys">Press "Start interview" to begin. The AI interviewer will guide you through all five stages.</div>
        </div>
        <div class="chat-input" style="margin-top:10px;">
          <textarea id="chatInput" rows="2" placeholder="Type your answer… (Enter to send, Shift+Enter for new line)" disabled></textarea>
          <button type="button" class="primary" id="sendBtn" onclick="sendAnswer()" disabled>Send</button>
        </div>
        <div id="chatErr" class="error" role="alert"></div>
        <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="primary" id="startBtn" onclick="startInterview()">▶️ Start interview</button>
          <button type="button" class="ghost" id="verdictBtn" onclick="requestVerdict()" disabled>🏁 Get verdict</button>
        </div>
      </div>
    </section>
  `,
  footer: `<p>© ${new Date().getFullYear()} AI Testing Academy · Built by <a href="https://www.linkedin.com/in/amiel-peled/" target="_blank" rel="noopener" style="color:var(--accent);">Amiel Peled</a> · For QA engineers who want to stay ahead</p>`,
  s: {
    // Provider UI
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
    // Resume
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
    // Interview
    statusInterviewerThinking: '⏳ Interviewer is thinking…',
    statusGeneratingVerdict: '⏳ Generating your verdict…',
    errNoKeyInterview: 'Set your API key in Connection Setup first, then start the interview.',
    interviewOpener: 'Please start the interview. I am ready.',
    interviewOpenerMsg: 'Ready — let\'s go!',
    btnRestartInterview: '🔄 Restart interview',
    voiceModeOn: '🔊 Voice ON',
    voiceModeOff: '🔇 Voice OFF',
    micTitle: 'Click to speak your answer',
    micListening: 'Listening… click to stop',
    // UX
    videoLoading: 'Loading video…',
    videoMissingPrefix: 'Video file not found: ',
    videoMissingSuffix: '',
    themeLabelLight: 'Light mode',
    themeLabelDark: 'Dark mode',
    copyBtn: 'Copy',
    copyBtnDone: '✅ Copied!',
    copyBtnReset: 'Copy',
    copyBtnFail: '❌ Failed to copy'
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
  * Encouragement and next steps`
  }
};
