export const he = {
  dir: 'rtl',
  ui: {
    skip: 'דלג לתוכן הראשי',
    navOpen: 'פתח תפריט ניווט',
    toTop: 'חזור למעלה'
  },
  nav: `
    <a class="logo" href="#" style="text-decoration:none;display:block;margin-bottom:8px;">AI Testing Academy</a>
    <span class="nav-group">סוכנים</span>
    <a class="link" href="#setup">⚙️ הגדרת חיבור</a>
    <a class="link" href="#resume">📄 קורות חיים</a>
    <a class="link" href="#interview-talk">🎙️ ראיון סימולציה</a>
    <span class="nav-group">קהילה</span>
    <a class="link github-btn" href="https://www.youtube.com/@amielnoy" target="_blank" rel="noopener">▶ יוטיוב</a>
    <a class="link telegram-btn" href="https://www.linkedin.com/in/amiel-peled/" target="_blank" rel="noopener">💼 לינקדאין</a>
    <button type="button" id="themeToggle" class="theme-toggle" aria-label="החלף ערכת נושא">
      <span id="themeIcon">🌙</span>
      <span id="themeLabel">מצב לילה</span>
    </button>
    <button type="button" id="langToggle" class="theme-toggle" aria-label="החלף שפה">
      <span id="langIcon">🌐</span>
      <span id="langLabel">English</span>
    </button>
  `,
  hero: `
    <h1><span>AI Testing Academy</span><br>הפלטפורמה המקצועית לקריירת QA שלך</h1>
    <p>שליטה מלאה באוטומציית בדיקות, DevOps ובדיקות AI — עם סוכנים חכמים, הרצאות מובנות ותרגול ראיונות אמיתי. בנוי עבור מהנדסי QA שרוצים להישאר צעד אחד קדימה.</p>
    <div class="badges">
      <span class="badge">🤖 סוכני AI</span>
      <span class="badge">🎙️ ראיונות סימולציה</span>
      <span class="badge">📄 ניתוח קורות חיים</span>
      <span class="badge">🎓 סדרת הרצאות</span>
      <span class="badge">🐳 DevOps &amp; CI</span>
    </div>
    <div class="hero-cta">
      <a class="primary" href="#setup">התחל עכשיו →</a>
      <a class="ghost" href="#lecture-series">צפה בהרצאות</a>
    </div>
    <div class="tldr">
      <b>מה תקבל:</b>
      <ul>
        <li><b>סוכן 1</b> — ניתוח וכתיבה מחדש של קורות חיים לתפקידי QA</li>
        <li><b>סוכן 2</b> — ראיון סימולציה חי עם מצב קול, 5 שלבים</li>
        <li><b>סדרת הרצאות</b> — 10 הרצאות מעמיקות על בדיקות AI</li>
        <li><b>בנק שאלות</b> — 25+ שאלות ראיון אמיתיות + העשרה עם AI</li>
      </ul>
    </div>
  `,
  main: `
    <!-- ── הגדרת חיבור ── -->
    <section id="setup">
      <h2><span class="num">01</span> הגדרת חיבור</h2>
      <p class="lead">חברו את ספק ה-AI שלכם פעם אחת — שני הסוכנים משתמשים באותו מפתח. ל-Gemini יש tier חינמי; Claude נותן את שכתובי קורות החיים הטובים ביותר.</p>
      <div class="agent-box">
        <h3>🔌 בחרו ספק AI</h3>
        <div class="keybar">
          <div>
            <label for="providerSel">ספק</label>
            <select id="providerSel" onchange="onProviderChange()">
              <option value="gemini">Gemini (Google)</option>
              <option value="anthropic">Claude (Anthropic)</option>
              <option value="openai">GPT (OpenAI)</option>
            </select>
          </div>
          <div>
            <label for="modelSel">מודל</label>
            <select id="modelSel"></select>
          </div>
          <div style="align-self:end;">
            <button type="button" class="primary" onclick="testConnection()" style="margin-top:0;">🔗 בדוק חיבור</button>
          </div>
        </div>
        <div id="ownKeyRow" style="margin-top:14px;">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;margin:0 0 10px;">
            <input type="checkbox" id="useOwnKey" style="width:auto;margin:0;"> השתמש במפתח API שלי
          </label>
          <label id="apiKeyLabel" for="apiKey" style="font-size:.85rem;color:var(--muted);display:block;margin-bottom:6px;">מפתח API</label>
          <input type="password" id="apiKey" autocomplete="off" style="font-family:monospace;" placeholder="הדבק את המפתח שלך כאן…">
        </div>
        <p id="connStatus" class="notice" aria-live="polite" style="min-height:1.4em;"></p>
        <button type="button" class="ghost" onclick="resetSettings()" style="margin-top:4px;">🔄 אפס את כל ההגדרות</button>
        <p class="notice" style="margin-top:8px;">המפתח שלך מאוחסן רק ב-localStorage של הדפדפן שלך — לא נשלח לשום שרת מלבד ה-API של הספק.</p>
      </div>
    </section>

    <!-- ── סוכן 1: קורות חיים ── -->
    <section id="resume">
      <h2><span class="num">02</span> סוכן 1 — קורות חיים ומכתב מקדים</h2>
      <p class="lead">העלו את ה-CV שלכם וקבלו ניתוח מדורג עם חוזקות, פערים, ואת הגרסה המשופרת המותאמת לכל תפקיד QA או SDET.</p>
      <div class="agent-box">
        <h3>📄 נתחו ושפרו את קורות החיים שלכם</h3>
        <label for="targetRole">תפקיד יעד <span style="color:var(--muted);font-weight:400;">(אופציונלי)</span></label>
        <input type="text" id="targetRole" placeholder="לדוגמה: SDET, QA Automation Lead, DevOps Engineer">
        <label class="upload-zone" id="uploadZone" tabindex="0" role="button" aria-label="העלה קורות חיים — לחץ או גרור קובץ">
          <input type="file" id="resumeFile" accept=".pdf,.docx,.txt" style="display:none" onchange="handleResumeFile(this.files[0])">
          <span id="uploadLabel">📁 לחץ או גרור את קורות החיים שלך לכאן — PDF, DOCX, או TXT</span>
        </label>
        <label for="resumeText" style="margin-top:14px;display:block;">או הדבק את טקסט קורות החיים:</label>
        <textarea id="resumeText" rows="7" placeholder="הדבק את טקסט קורות החיים שלך כאן…"></textarea>
        <label for="jobDesc">תיאור משרה <span style="color:var(--muted);font-weight:400;">(אופציונלי — לשכתוב ממוקד)</span></label>
        <textarea id="jobDesc" rows="4" placeholder="הדבק את תיאור המשרה כאן לקבלת שכתוב ממוקד…"></textarea>
        <div id="resumeErr" class="error" role="alert"></div>
        <button type="button" class="primary" id="resumeBtn" onclick="evaluateResume()">📊 נתח קורות חיים</button>
      </div>

      <div id="resumeResult" style="display:none;margin-top:22px;">
        <div class="score-wrap">
          <div class="score-circle" id="resumeScore" aria-label="ציון כולל">–</div>
          <p id="resumeSummary" style="flex:1;color:var(--muted);font-size:.95rem;"></p>
        </div>
        <div id="resumeBars"></div>
        <div class="result-cols">
          <div class="card">
            <h4>✅ חוזקות</h4>
            <ul id="resumeStrengths"></ul>
          </div>
          <div class="card">
            <h4>⚠️ פערים</h4>
            <ul id="resumeGaps"></ul>
          </div>
        </div>
        <div class="card" style="margin-top:14px;">
          <h4>💡 המלצות לשיפור</h4>
          <ul id="resumeRecs"></ul>
        </div>
        <div style="margin-top:22px;">
          <button type="button" class="primary" id="improveBtn" onclick="showImprovedResume()">✨ בנה קורות חיים משופרים</button>
        </div>
        <div id="improvedErr" class="error" role="alert"></div>
        <div id="improvedWrap" style="display:none;margin-top:22px;">
          <div class="card">
            <h4>✨ קורות חיים משופרים</h4>
            <pre id="improvedText" style="background:transparent;border:none;box-shadow:none;padding:0;white-space:pre-wrap;font-family:inherit;font-size:.9rem;"></pre>
          </div>
          <button type="button" class="ghost" id="pdfBtn" onclick="downloadImprovedPdf()">⬇️ הורד כ-PDF</button>
        </div>
      </div>
    </section>

    <!-- ── סוכן 2: ראיון סימולציה ── -->
    <section id="interview-talk">
      <h2><span class="num">05</span> סוכן 2 — ראיון סימולציה</h2>
      <p class="lead">הריצו ראיון QA Automation ריאליסטי עם מראיין AI — חמישה שלבים, מ-HR ועד לבדיקות AI. מצב קול מאפשר תרגול ללא ידיים.</p>
      <div class="agent-box">
        <h3>🎙️ התחל ראיון סימולציה</h3>
        <p class="notice" style="margin-bottom:12px;">ודאו שהחיבור מוגדר למעלה. הסוכן משתמש באותו מפתח API.</p>
        <div class="chat" id="chatBox" role="log" aria-live="polite" aria-label="שיחת ראיון">
          <div class="msg sys">לחץ על "התחל ראיון" כדי להתחיל. המראיין ה-AI ינחה אותך דרך כל חמשת השלבים.</div>
        </div>
        <div class="chat-input" style="margin-top:10px;">
          <textarea id="chatInput" rows="2" placeholder="הקלד את תשובתך… (Enter לשליחה, Shift+Enter לשורה חדשה)" disabled></textarea>
          <button type="button" class="primary" id="sendBtn" onclick="sendAnswer()" disabled>שלח</button>
        </div>
        <div id="chatErr" class="error" role="alert"></div>
        <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
          <button type="button" class="primary" id="startBtn" onclick="startInterview()">▶️ התחל ראיון</button>
          <button type="button" class="ghost" id="verdictBtn" onclick="requestVerdict()" disabled>🏁 קבל פסיקה</button>
        </div>
      </div>
    </section>
  `,
  footer: `<p>© ${new Date().getFullYear()} AI Testing Academy · נבנה על ידי <a href="https://www.linkedin.com/in/amiel-peled/" target="_blank" rel="noopener" style="color:var(--accent);">אמיאל פלד</a> · למהנדסי QA שרוצים להישאר קדימה</p>`,
  s: {
    // Provider UI
    keyLabelGemini: 'מפתח API של Gemini',
    keyLabelAnthropic: 'מפתח API של Claude',
    keyLabelOpenai: 'מפתח API של OpenAI',
    errGeminiKeyHint: ' (מפתחות Gemini מתחילים ב-AIza — קבל בחינם ב-aistudio.google.com)',
    errKeyNotAnthropic: 'זה נראה כמו מפתח OpenAI. שנה את ספק ה-provider ל-OpenAI.',
    errKeyNotOpenai: 'זה נראה כמו מפתח Anthropic. שנה את ספק ה-provider ל-Claude.',
    placeholderEnvKey: '(משתמש במפתח מקובץ .env)',
    labelSuffixLocal: ' Key',
    labelSuffixEnv: ' Key (מ-.env)',
    statusTesting: '⏳ בודק חיבור…',
    statusOkPrefix: '✅ מחובר (',
    pingSystem: 'You are a helpful assistant. Reply with exactly the word: OK',
    pingUser: 'Ping',
    errNoKey: 'לא הוגדר מפתח API. הוסף את המפתח שלך בהגדרת החיבור למעלה.',
    errBlockedPrefix: 'שגיאת רשת בגישה ל-',
    errBlockedMid: '. סיבות אפשריות:\n',
    errBlockedCauses: '• מדיניות CORS חוסמת את הבקשה הישירה מהדפדפן\n• חסימת רשת או firewall\n',
    errBlockedTry: 'נסה לעבור לספק אחר.\n',
    errBlockedOpenUrl: '',
    errApiPrefix: 'שגיאת API (',
    errNoJson: 'לא ניתן לנתח JSON מתגובת המודל. נסה שוב.',
    // Resume
    uploadReading: '⏳ קורא ',
    uploadPrompt: '📁 לחץ או גרור את קורות החיים לכאן — PDF, DOCX, או TXT',
    uploadLoadedMid: ' · ',
    uploadLoadedSuffix: ' תווים נטענו',
    errCdnFail: 'לא ניתן לטעון את ספריית הניתוח:\n',
    errFormatPrefix: 'סוג קובץ לא נתמך: ',
    errFormatSuffix: '. אנא השתמש ב-PDF, DOCX, או TXT.',
    errExtractFail: 'לא ניתן לחלץ טקסט. נסה להעתיק ולהדביק את הטקסט ידנית.',
    errResumeEmpty: 'אנא הדבק או העלה את קורות החיים שלך קודם.',
    errNoEval: 'אנא נתח את קורות החיים קודם לפני בניית הגרסה המשופרת.',
    btnEvaluating: '⏳ מנתח…',
    btnEvaluate: '📊 נתח קורות חיים',
    btnImproving: '⏳ בונה קורות חיים משופרים…',
    btnBuildResume: '✨ בנה קורות חיים משופרים',
    btnPreparingPdf: '⏳ מכין PDF…',
    btnDownloadPdf: '⬇️ הורד כ-PDF',
    promptRolePrefix: 'תפקיד יעד: ',
    promptResumeLabel: '\n\nטקסט קורות החיים:\n',
    promptRolePrefixImprove: 'כתוב מחדש את קורות החיים הבאים לתפקיד היעד: ',
    promptJobDescLabel: '\n\nתיאור המשרה להתאמה:\n',
    promptEvalResultsLabel: '\n\nתוצאות ניתוח קודם (פערים והמלצות לטיפול):\n',
    promptOriginalResumeLabel: '\n\nקורות החיים המקוריים:\n',
    // Interview
    statusInterviewerThinking: '⏳ המראיין חושב…',
    statusGeneratingVerdict: '⏳ מייצר פסיקה…',
    errNoKeyInterview: 'הגדר את מפתח ה-API בהגדרת החיבור קודם, ואז התחל את הראיון.',
    interviewOpener: 'אנא התחל את הראיון. אני מוכן.',
    interviewOpenerMsg: 'מוכן — בואו נתחיל!',
    btnRestartInterview: '🔄 הפעל ראיון מחדש',
    voiceModeOn: '🔊 קול פעיל',
    voiceModeOff: '🔇 קול כבוי',
    micTitle: 'לחץ כדי לדבר את תשובתך',
    micListening: 'מאזין… לחץ לעצירה',
    // UX
    videoLoading: 'טוען וידאו…',
    videoMissingPrefix: 'קובץ וידאו לא נמצא: ',
    videoMissingSuffix: '',
    themeLabelLight: 'מצב יום',
    themeLabelDark: 'מצב לילה',
    copyBtn: 'העתק',
    copyBtnDone: '✅ הועתק!',
    copyBtnReset: 'העתק',
    copyBtnFail: '❌ ההעתקה נכשלה'
  },
  prompts: {
    resume: `You are an expert QA/SDET career coach reviewing a resume for QA Automation roles. The candidate communicates in Hebrew, so write your summary and all text fields in Hebrew.
Evaluate the resume thoroughly and return ONLY valid JSON — no prose, no markdown outside the JSON:
{"overall":75,"summary":"משפט תמציתי אחד על איכות קורות החיים והתאמתם לתפקידי QA.","categories":[{"name":"מיומנויות טכניות","score":80},{"name":"מסגרות בדיקות","score":75},{"name":"CI/CD ו-DevOps","score":65},{"name":"בדיקות AI ו-LLM","score":50},{"name":"בהירות והשפעה","score":80}],"strengths":["חוזקה ברורה 1","חוזקה ברורה 2","חוזקה ברורה 3"],"gaps":["פער 1","פער 2","פער 3"],"recommendations":["המלצה ספציפית 1","המלצה ספציפית 2","המלצה ספציפית 3"]}`,

    improve: `You are an expert QA/SDET career coach and professional resume writer. The candidate communicates in Hebrew — write the improved resume in the same language as the original (Hebrew if Hebrew, English if English). Rewrite the resume to be compelling, ATS-friendly, and targeted for QA Automation and SDET roles. Use strong action verbs, quantify impact, and highlight test automation, CI/CD, and AI/LLM testing experience. Return ONLY the rewritten resume text — no JSON, no commentary.`,

    interview: `אתה מראיין בכיר לתפקידי QA Automation ומנהל ראיון טכני מובנה. ענה תמיד בעברית.
עבור דרך 5 שלבים אלה לפי הסדר, עם 2-3 שאלות לכל שלב לפני המעבר לבא:

שלב 1 — משאבי אנוש ומוטיבציה: רקע, למה אוטומציית QA, מטרות קריירה
שלב 2 — ידע באוטומציית בדיקות: Playwright/Selenium/pytest, Page Object Model, בדיקות flaky
שלב 3 — קוד ו-API: מושגי Python/JS מעשיים, בדיקות REST API, mocking, דיבאגינג
שלב 4 — DevOps ו-CI/CD: GitHub Actions, Docker, הרצה מקבילית, עיצוב pipeline
שלב 5 — בדיקות AI: בדיקת פיצ'רים מבוססי LLM, prompt injection, אי-דטרמיניזם

חוקים:
- שאל שאלה אחת בלבד בכל פעם
- היה מקצועי אך ידידותי ומעודד
- אחרי כל תשובה, תן משפט קצר של משוב בנאי לפני השאלה הבאה
- כשמקבלים "___VERDICT___" — ספק פסיקה מובנית עם ציון לכל שלב, המלצה כוללת, 3 חוזקות, ו-3 תחומים לשיפור`
  }
};
