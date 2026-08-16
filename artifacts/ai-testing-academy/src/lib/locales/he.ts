import type { Locale } from './en';

export const he: Locale = {
  dir: 'rtl' as 'ltr' | 'rtl',
  lang: 'he' as string,
  ui: {
    skip: 'דלג לתוכן הראשי',
    navOpen: 'פתח תפריט ניווט',
    toTop: 'חזור למעלה',
  },
  nav: {
    logo: 'AI Testing Academy',
    agentsGroup: 'סוכנים',
    links: [
      { href: '#setup', label: '⚙️ הגדרות' },
      { href: '#resume', label: '📄 קורות חיים' },
      { href: '#lecture-series', label: '🎓 סדרת הרצאות' },
      { href: '#interview-talk', label: '🎙️ ראיון סימולציה' },
      { href: '#interview-questions', label: '❓ שאלות ראיון' },
      { href: '#coding-challenges', label: '🐍 אתגרי קוד בפייתון' },
    ],
    communityGroup: 'קהילה',
    community: [
      {
        href: 'https://www.youtube.com/@amielnoy',
        label: '▶ יוטיוב',
        cls: 'github-btn',
        target: '_blank',
      },
      {
        href: 'https://www.linkedin.com/in/amiel-peled/',
        label: '💼 לינקדאין',
        cls: 'telegram-btn',
        target: '_blank',
      },
      {
        href: 'https://chat.whatsapp.com/Bwjb01CGfxqIE04lkz2us0?mode=gi_t',
        label: '💬 קהילת אוטומציה ו-DevOps מבוססת AI',
        cls: 'whatsapp-btn',
        target: '_blank',
      },
    ],
    themeToggle: { ariaLabel: 'החלף ערכת נושא' },
    langToggle: { ariaLabel: 'החלף שפה', label: 'English' },
  },
  hero: {
    h1Line1: 'AI Testing Academy',
    h1Line2: 'הפלטפורמה המקצועית לקריירת QA שלך',
    p: 'שליטה מלאה באוטומציית בדיקות, DevOps ובדיקות AI — עם סוכנים חכמים, הרצאות מובנות ותרגול ראיונות אמיתי. בנוי עבור מהנדסי QA שרוצים להישאר צעד אחד קדימה.',
    badges: [
      '🤖 סוכני AI',
      '🎙️ ראיונות סימולציה',
      '📄 ניתוח קורות חיים',
      '🎓 סדרת הרצאות',
      '🐳 DevOps & CI',
    ],
    cta: [
      {
        href: '#interview-talk',
        label: 'נסו ראיון לדוגמה ←',
        cls: 'primary',
        sampleResume: false,
        sampleInterview: true,
      },
      {
        href: '#resume',
        label: 'נתחו קורות חיים לדוגמה',
        cls: 'ghost',
        sampleResume: true,
        sampleInterview: false,
      },
      {
        href: '#lecture-series',
        label: 'צפה בהרצאות',
        cls: 'ghost',
        sampleResume: false,
        sampleInterview: false,
      },
    ],
    tldr: {
      heading: 'מה תקבל:',
      items: [
        { b: 'סוכן 1', text: ' — ניתוח וכתיבה מחדש של קורות חיים לתפקידי QA' },
        { b: 'סוכן 2', text: ' — ראיון סימולציה חי, 5 שלבים' },
        { b: 'סדרת הרצאות', text: ' — 10 הרצאות מעמיקות על בדיקות AI' },
        { b: 'בנק שאלות', text: ' — 25+ שאלות ראיון אמיתיות + העשרה עם AI' },
      ],
    },
  },
  setup: {
    num: '01',
    title: 'הגדרת חיבור',
    settingsTitle: 'הגדרות ספק AI',
    settingsHint: 'אופציונלי כל עוד המכסה החינמית זמינה',
    settingsQuotaHint: 'המכסה היומית החינמית הסתיימה — חברו ספק משלכם כדי להמשיך',
    lead: 'חברו את ספק ה-AI שלכם פעם אחת — שני הסוכנים משתמשים באותו מפתח. ל-Gemini יש tier חינמי; Claude נותן את שכתובי קורות החיים הטובים ביותר.',
    boxTitle: '🔌 בחרו ספק AI',
    providerLabel: 'ספק',
    modelLabel: 'מודל',
    testBtn: '🔗 בדוק חיבור',
    useOwnKeyLabel: 'השתמש במפתח API שלי',
    rememberKeyLabel: 'זכור את המפתח במכשיר הזה',
    rememberKeyWarning:
      'יש להפעיל אפשרות זו רק במכשיר פרטי. המפתח יישאר באחסון הדפדפן לאחר סגירת הלשונית.',
    apiKeyLabel: 'מפתח API',
    resetBtn: '🔄 אפס הגדרות ספק',
    notice:
      'המפתח שלך נשמר רק למשך סשן הדפדפן, אלא אם תבחר במפורש לזכור אותו, ונשלח ישירות ל-API של הספק. בשימוש במפתח ברירת המחדל, הבקשות עוברות דרך השרת — המפתח עצמו לעולם לא מגיע לדפדפן.',
    providers: [
      { value: 'gemini', label: 'Gemini (Google)' },
      { value: 'anthropic', label: 'Claude (Anthropic)' },
      { value: 'openai', label: 'GPT (OpenAI)' },
    ],
  },
  tools: {
    eyebrow: 'בחרו מסלול',
    title: 'על מה תרצו לעבוד היום?',
    lead: 'התחילו מיד עם מכסת ה-AI היומית החינמית של האקדמיה. הגדרת ספק היא אופציונלית עד לניצול המכסה.',
    resume: {
      title: 'מאמן קורות חיים',
      desc: 'קבלו ציון לקורות חיים לתפקידי QA או SDET, זהו פערים ובנו גרסה ממוקדת וחזקה יותר.',
      cta: 'נתחו קורות חיים לדוגמה ←',
    },
    interview: {
      title: 'ראיון סימולציה',
      desc: 'תרגלו ראיון מציאותי במספר שלבים וקבלו משוב ממוקד.',
      cta: 'נסו ראיון לדוגמה ←',
    },
    practice: {
      title: 'ספריית תרגול',
      desc: 'התקדמו בשאלות ראיון ובאתגרי Python לאוטומציה בקצב שלכם.',
      cta: 'התחילו לתרגל ←',
    },
    continueLabel: 'המשיכו מהמקום שבו עצרתם',
    progressLabel: 'התקדמות',
    completedLabel: 'הושלמו',
    freshLabel: 'טרם התחיל',
    quotaAvailableLabel: 'עד {limit} בקשות AI חינמיות זמינות בכל יום',
    quotaLabel: 'נותרו {remaining} מתוך {limit} בקשות AI חינמיות במכסה הנוכחית',
  },
  resume: {
    num: '01',
    title: 'סוכן 1 — קורות חיים ומכתב מקדים',
    lead: 'העלו את ה-CV שלכם וקבלו ניתוח מדורג עם חוזקות, פערים, ואת הגרסה המשופרת המותאמת לכל תפקיד QA או SDET.',
    boxTitle: '📄 נתחו ושפרו את קורות החיים שלכם',
    targetRoleLabel: 'תפקיד יעד',
    targetRoleOptional: '(אופציונלי)',
    targetRolePlaceholder: 'לדוגמה: SDET, QA Automation Lead, DevOps Engineer',
    uploadZoneAriaLabel: 'העלה קורות חיים — לחץ או גרור קובץ',
    uploadPrompt: '📁 לחץ או גרור את קורות החיים שלך לכאן — PDF, DOCX, או TXT',
    pasteLabel: 'או הדבק את טקסט קורות החיים:',
    pastePlaceholder: 'הדבק את טקסט קורות החיים שלך כאן…',
    jobDescLabel: 'תיאור משרה',
    jobDescOptional: '(אופציונלי — לשכתוב ממוקד)',
    jobDescPlaceholder: 'הדבק את תיאור המשרה כאן לקבלת שכתוב ממוקד…',
    evaluateBtn: '📊 נתח קורות חיים',
    scoreAriaLabel: 'ציון כולל',
    strengthsTitle: '✅ חוזקות',
    gapsTitle: '⚠️ פערים',
    recsTitle: '💡 המלצות לשיפור',
    buildResumeBtn: '✨ בנה קורות חיים משופרים',
    improvedTitle: '✨ קורות חיים משופרים',
    downloadPdfBtn: '⬇️ הורד כ-PDF',
  },
  interview: {
    num: '02',
    title: 'סוכן 2 — ראיון סימולציה',
    lead: 'הריצו ראיון QA Automation ריאליסטי עם מראיין AI — חמישה שלבים, מ-HR ועד לבדיקות AI.',
    imageAlt: 'מועמדת חייכנית מחקה בהומור את תנוחת הגוף הנוקשה והחשובה של המראיין שמולה.',
    boxTitle: '🎙️ התחל ראיון סימולציה',
    notice:
      'השימוש החינמי ב-AI מתחיל אוטומטית. אם הוא לא זמין או שהמכסה אזלה, פתחו את ההגדרות כדי לחבר ספק משלכם.',
    chatAriaLabel: 'שיחת ראיון',
    initialMsg: 'לחץ על "התחל ראיון" כדי להתחיל. המראיין ה-AI ינחה אותך דרך כל חמשת השלבים.',
    chatPlaceholder: 'הקלד את תשובתך… (Enter לשליחה, Shift+Enter לשורה חדשה)',
    sendBtn: 'שלח',
    startBtn: '▶️ התחל ראיון',
    verdictBtn: '🏁 קבל פסיקה',
  },
  footer: {
    year: new Date().getFullYear(),
    text: 'AI Testing Academy · נבנה על ידי',
    authorHref: 'https://www.linkedin.com/in/amiel-peled/',
    authorName: 'אמיאל פלד',
    suffix: '· למהנדסי QA שרוצים להישאר קדימה',
  },
  s: {
    keyLabelGemini: 'מפתח API של Gemini',
    keyLabelAnthropic: 'מפתח API של Claude',
    keyLabelOpenai: 'מפתח API של OpenAI',
    errGeminiKeyHint: ' (מפתחות Gemini מתחילים ב-AIza — קבל בחינם ב-aistudio.google.com)',
    errKeyNotAnthropic: 'זה נראה כמו מפתח OpenAI. שנה את ספק ה-provider ל-OpenAI.',
    errKeyNotOpenai: 'זה נראה כמו מפתח Anthropic. שנה את ספק ה-provider ל-Claude.',
    placeholderEnvKey: '(משתמש במפתח ברירת המחדל של השרת)',
    labelSuffixLocal: ' Key',
    labelSuffixEnv: ' Key (ברירת מחדל של השרת)',
    statusTesting: '⏳ בודק חיבור…',
    statusOkPrefix: '✅ מחובר (',
    pingSystem: 'You are a helpful assistant. Reply with exactly the word: OK',
    pingUser: 'Ping',
    errNoKey: 'אין ספק AI זמין. הוסיפו מפתח API בהגדרות.',
    errBlockedPrefix: 'שגיאת רשת בגישה ל-',
    errBlockedMid: '. סיבות אפשריות:\n',
    errBlockedCauses: '• מדיניות CORS חוסמת את הבקשה הישירה מהדפדפן\n• חסימת רשת או firewall\n',
    errBlockedTry: 'נסה לעבור לספק אחר.\n',
    errBlockedOpenUrl: '',
    errApiPrefix: 'שגיאת API (',
    errNoJson: 'לא ניתן לנתח JSON מתגובת המודל. נסה שוב.',
    uploadReading: '⏳ קורא ',
    uploadPrompt: '📁 לחץ או גרור את קורות החיים לכאן — PDF, DOCX, או TXT',
    uploadLoadedMid: ' · ',
    uploadLoadedSuffix: ' תווים נטענו',
    uploadPreparing: '⏳ מתכונן לקרוא את ',
    uploadPageMid: ' — עמוד ',
    uploadPageOf: ' מתוך ',
    errCdnFail: 'לא ניתן לטעון את ספריית הניתוח:\n',
    errFormatPrefix: 'סוג קובץ לא נתמך: ',
    errFormatSuffix: '. אנא השתמש ב-PDF, DOCX, או TXT.',
    errExtractFail: 'לא ניתן לחלץ טקסט. נסה להעתיק ולהדביק את הטקסט ידנית.',
    errScannedPdf:
      'ל-PDF הזה אין שכבת טקסט — זו סריקה או ייצוא כתמונה בלבד, שגם מערכת ATS לא תוכל לקרוא. ייצא אותו מחדש כ-PDF טקסטואלי, או הדבק את הטקסט למטה.',
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
    statusInterviewerThinking: '⏳ המראיין חושב…',
    statusGeneratingVerdict: '⏳ מייצר פסיקה…',
    errNoKeyInterview:
      'הגישה החינמית ל-AI אינה זמינה. הוסיפו מפתח API בהגדרות ואז התחילו את הראיון.',
    interviewOpener: 'אנא התחל את הראיון. אני מוכן.',
    interviewOpenerMsg: 'מוכן — בואו נתחיל!',
    btnRestartInterview: '🔄 הפעל ראיון מחדש',
    videoLoading: 'טוען וידאו…',
    videoMissingPrefix: 'קובץ וידאו לא נמצא: ',
    videoMissingSuffix: '',
    themeLabelLight: 'מצב יום',
    themeLabelDark: 'מצב לילה',
    copyBtn: 'העתק',
    copyBtnDone: '✅ הועתק!',
    copyBtnReset: 'העתק',
    copyBtnFail: '❌ ההעתקה נכשלה',
    signInAria: 'התחברות עם Google',
    signOutBtn: 'התנתקות',
  },
  codingChallenges: {
    title: '🐍 אתגרי קוד בפייתון לאוטומציית בדיקות',
    lead: '40 בעיות קוד מעשיות שעולות בראיונות אמיתיים ל-QA Automation, מחולקות לשלוש רמות. לחיצה אחת חושפת רמז, לחיצה נוספת חושפת פתרון קצר ויעיל עם ניתוח סיבוכיות זמן ומקום.',
    hintLabel: '💡 רמז',
    complexityLabel: '⏱️ סיבוכיות',
    showHintBtn: 'הצג רמז',
    showSolutionBtn: 'הצג פתרון',
    hideBtn: 'הסתר',
    levels: [
      {
        label: 'רמה 1 — יסודות',
        blurb: 'רשימות, מילונים וקצת רקורסיה. אף שאלה כאן לא דורשת טריק, רק מעבר אחד נקי.',
        items: [
          {
            title: '1. הסרת כפילויות ממזהי בדיקות תוך שמירת סדר',
            prompt:
              'בהינתן רשימת מזהי מקרי בדיקה שעשויה להכיל כפילויות, החזירו רשימה חדשה ללא כפילויות, תוך שמירה על סדר ההופעה הראשון.',
            hint: 'השתמשו ב-set כדי לעקוב אחרי מה שכבר נראה תוך כדי מעבר יחיד, והוסיפו לרשימת התוצאה רק פריטים שלא נראו.',
            code: `def dedupe(ids):
    seen = set()
    result = []
    for i in ids:
        if i not in seen:
            seen.add(i)
            result.append(i)
    return result`,
            complexity:
              'זמן: O(n) בממוצע (בדיקות ב-set הן O(1) בממוצע). מקום: O(n) עבור ה-set והתוצאה.',
          },
          {
            title: '2. מציאת מזהה הבדיקה הכפול הראשון',
            prompt:
              'בהינתן רשימה גדולה של מזהי בדיקות, החזירו את המזהה הראשון שמופיע יותר מפעם אחת, או None אם אין כפילויות.',
            hint: 'הימנעו מהגישה הנאיבית של לולאה מקוננת O(n^2) — מעבר יחיד עם set פותר את זה במעבר אחד.',
            code: `def first_duplicate(ids):
    seen = set()
    for i in ids:
        if i in seen:
            return i
        seen.add(i)
    return None`,
            complexity: 'זמן: O(n). מקום: O(n) עבור ה-set.',
          },
          {
            title: '3. שיטוח מבנה סוויטת בדיקות מקונן',
            prompt:
              'סוויטות בדיקה יכולות להיות מקוננות זו בזו לעומק שרירותי (עץ של רשימות). כתבו פונקציה ששוטחת את המבנה הזה לרשימה יחידה של שמות בדיקות עלים.',
            hint: 'רקורסיה עובדת באופן טבעי על עץ: אם צומת הוא רשימה, בצעו רקורסיה על כל ילד; אם הוא ערך פשוט (שם בדיקת עלה), הוסיפו אותו לתוצאה.',
            code: `def flatten_suite(node):
    result = []
    def walk(n):
        if isinstance(n, (list, tuple)):
            for child in n:
                walk(child)
        else:
            result.append(n)
    walk(node)
    return result`,
            complexity:
              'זמן: O(n) כאשר n = מספר הצמתים הכולל בעץ. מקום: O(d) מחסנית רקורסיה (d = עומק העץ) בתוספת O(n) עבור הפלט.',
          },
          {
            title: '4. ספירת תוצאות בדיקה לפי סטטוס',
            prompt:
              'בהינתן רשימת מילוני תוצאה בסגנון `{"name": ..., "status": "passed"}`, החזירו כמה תוצאות יש לכל סטטוס.',
            hint: 'מספיק מעבר אחד ומילון מונים. collections.Counter עושה את ניהול הספירה במקומכם.',
            code: `from collections import Counter

def count_by_status(results):
    return Counter(r["status"] for r in results)`,
            complexity: 'זמן: O(n). מקום: O(k), כאשר k = מספר הסטטוסים השונים.',
          },
          {
            title: '5. מציאת N הבדיקות האיטיות ביותר',
            prompt:
              'בהינתן רשימת מילוני בדיקה עם שדה `duration`, החזירו את n האיטיות ביותר, מהאיטית ביותר ומטה.',
            hint: 'מיון הרשימה כולה הוא O(m log m) כשצריך רק n פריטים. heapq.nlargest מחזיק ערימה בגודל n בלבד.',
            code: `import heapq

def slowest(tests, n):
    return heapq.nlargest(n, tests, key=lambda t: t["duration"])`,
            complexity: 'זמן: O(m log n) עבור m בדיקות. מקום: O(n) לערימה ולתוצאה.',
          },
          {
            title: '6. קיבוץ בדיקות לפי תגית',
            prompt:
              'בהינתן רשימת מילוני בדיקה בסגנון `{"name": ..., "tags": ["smoke", "api"]}`, החזירו מילון הממפה כל תגית לרשימת שמות הבדיקות שנושאות אותה.',
            hint: 'מילון רגיל מחייב בדיקה של "האם המפתח כבר קיים?" בכל הוספה. collections.defaultdict(list) יוצר עבורכם את הרשימה הריקה בגישה הראשונה.',
            code: `from collections import defaultdict

def group_by_tag(tests):
    groups = defaultdict(list)
    for test in tests:
        for tag in test.get("tags", ()):
            groups[tag].append(test["name"])
    return dict(groups)`,
            complexity: 'זמן: O(n*t) עבור n בדיקות עם t תגיות כל אחת. מקום: O(n*t) לפלט המקובץ.',
          },
          {
            title: '7. חלוקת מזהי בדיקות לאצוות',
            prompt:
              'חלקו רשימה שטוחה של מזהי בדיקות לאצוות רצופות בגודל `size` לכל היותר, כך שכל אצווה תוכל להימסר ל-runner נפרד ב-CI.',
            hint: 'חיתוך בקפיצות: range(0, len(ids), size) נותן את נקודת ההתחלה של כל אצווה, וחיתוך שחורג מסוף הרשימה פשוט מחזיר רשימה קצרה יותר — אין צורך בטיפול מיוחד בשארית.',
            code: `def chunk(ids, size):
    if size <= 0:
        raise ValueError("size must be positive")
    return [ids[i:i + size] for i in range(0, len(ids), size)]`,
            complexity: 'זמן: O(n). מקום: O(n) לאצוות.',
          },
          {
            title: '8. פענוח מחרוזת משך זמן לשניות',
            prompt:
              'דוחות בדיקה מדפיסים משכי זמן כמחרוזות בסגנון `"1h 2m 30s"`, `"90s"` או `"2m"`. המירו מחרוזת כזו למספר השניות הכולל.',
            hint: 'פצלו לפי רווחים וקראו כל אסימון כמספר בתוספת אות יחידה. מילון יחידות לפי אות הסיומת הופך את כל הפתרון לכפל וחיבור אחד.',
            code: `UNITS = {"h": 3600, "m": 60, "s": 1}

def parse_duration(text):
    total = 0
    for token in text.split():
        unit = token[-1]
        if unit not in UNITS:
            raise ValueError(f"Unknown unit in {token!r}")
        total += float(token[:-1]) * UNITS[unit]
    return total`,
            complexity: 'זמן: O(n) באורך המחרוזת. מקום: O(n) לאסימונים שנוצרו בפיצול.',
          },
          {
            title: '9. השוואת שני מילוני קונפיגורציה',
            prompt:
              'השוו קונפיגורציית בסיס מול חדשה, ודווחו אילו מפתחות נוספו, אילו הוסרו ואילו שינו ערך.',
            hint: 'התייחסו לשתי קבוצות המפתחות כאל sets: new - old הם שנוספו, old - new הם שהוסרו, ולחיתוך נותרה רק השוואת ערכים.',
            code: `def diff_config(old, new):
    old_keys, new_keys = set(old), set(new)
    return {
        "added": sorted(new_keys - old_keys),
        "removed": sorted(old_keys - new_keys),
        "changed": sorted(
            k for k in old_keys & new_keys if old[k] != new[k]
        ),
    }`,
            complexity: 'זמן: O(n + m) לשתי הקונפיגורציות. מקום: O(n + m) לקבוצות המפתחות.',
          },
          {
            title: '10. אילו בדיקות רצו אתמול אך לא היום?',
            prompt:
              'בהינתן רשימת שמות הבדיקות המסודרת מהרצה A ומהרצה B, החזירו את השמות שקיימים ב-A וחסרים ב-B, תוך שמירה על הסדר שלהם ב-A.',
            hint: 'בנו set מ-B תחילה כדי שכל בדיקת הכלה תהיה O(1), ואז סננו את A לפי הסדר. שימוש ברשימה רגילה לחיפוש הופך את הפתרון בשקט ל-O(n*m).',
            code: `def missing_from(run_a, run_b):
    present = set(run_b)
    return [name for name in run_a if name not in present]`,
            complexity: 'זמן: O(n + m). מקום: O(m) לקבוצת החיפוש, ובמקרה הגרוע עוד O(n) לפלט.',
          },
          {
            title: '11. מציאת שם הבדיקה הארוך ביותר',
            prompt:
              'בהינתן רשימת שמות בדיקות, החזירו את הארוך ביותר. אם כמה שווים באורכם, החזירו את הראשון שמופיע.',
            hint: 'ל-max() אפשר להעביר פונקציית key, ולכן max(names, key=len) עושה את כל הסריקה עבורכם — והיא ממילא מחזירה את הראשון מבין השווים. טפלו ברשימה ריקה במפורש.',
            code: `def longest_name(names):
    if not names:
        return None
    return max(names, key=len)`,
            complexity: 'זמן: O(n) על השמות. מקום: O(1).',
          },
          {
            title: '12. משך הרצה כולל וממוצע של הסוויטה',
            prompt:
              'בהינתן רשימת מילוני בדיקה עם שדה `duration`, החזירו את זמן ההרצה הכולל ואת הזמן הממוצע של הסוויטה.',
            hint: 'שימוש ב-sum() על גנרטור חוסך בניית רשימת ביניים. המלכודת היחידה היא חלוקה באפס כשהסוויטה ריקה — החליטו מה סוויטה ריקה מחזירה לפני שאתם מחלקים.',
            code: `def suite_timing(tests):
    total = sum(t["duration"] for t in tests)
    average = total / len(tests) if tests else 0.0
    return total, average`,
            complexity: 'זמן: O(n). מקום: O(1) — הגנרטור מחזיק ערך אחד בכל רגע.',
          },
          {
            title: '13. חישוב אחוז ההצלחה',
            prompt:
              'בהינתן רשימת מילוני תוצאה עם שדה `status`, החזירו את אחוז הבדיקות שעברו, מעוגל לספרה אחת אחרי הנקודה.',
            hint: 'בפייתון בוליאני הוא int, ולכן sum(r["status"] == "passed" for r in results) סופר התאמות ישירות. הגנו על המקרה הריק לפני החלוקה.',
            code: `def pass_rate(results):
    if not results:
        return 0.0
    passed = sum(r["status"] == "passed" for r in results)
    return round(passed / len(results) * 100, 1)`,
            complexity: 'זמן: O(n). מקום: O(1).',
          },
          {
            title: '14. הפיכת כותרת בדיקה למזהה תקין',
            prompt:
              'המירו כותרת אנושית כמו `"Login  with VALID user!"` לשם פונקציית בדיקה ב-snake_case: `login_with_valid_user`.',
            hint: 'הורידו לאותיות קטנות, החליפו כל רצף של תווים שאינם אלפאנומריים בקו תחתון יחיד, ואז קצצו קווים תחתונים מהקצוות. החלפה רגולרית אחת מטפלת ברצפים.',
            code: `import re

def slugify(title):
    slug = re.sub(r"[^a-z0-9]+", "_", title.lower())
    return slug.strip("_")`,
            complexity: 'זמן: O(n) באורך הכותרת. מקום: O(n) למחרוזת החדשה.',
          },
          {
            title: '15. איחוד שמות וסטטוסים למילון',
            prompt:
              'דוח ישן מספק לכם את שמות הבדיקות ואת הסטטוסים שלהן כשתי רשימות מקבילות. בנו מילון יחיד הממפה כל שם לסטטוס שלו.',
            hint: 'dict(zip(names, statuses)) היא שורת הקוד האידיומטית. שימו לב ש-zip עוצר ברשימה הקצרה, ולכן בדקו אורכים תחילה אם אי-התאמה היא שגיאה אמיתית.',
            code: `def to_report(names, statuses):
    if len(names) != len(statuses):
        raise ValueError("Mismatched report columns")
    return dict(zip(names, statuses))`,
            complexity: 'זמן: O(n). מקום: O(n) למילון התוצאה.',
          },
          {
            title: '16. בדיקות שנכשלו בכל ההרצות',
            prompt:
              'בהינתן כמה הרצות, כל אחת רשימת שמות הבדיקות שנכשלו בה, החזירו את השמות שנכשלו בכל הרצה ללא יוצא מן הכלל — השבורות באופן עקבי.',
            hint: 'זהו חיתוך קבוצות. set.intersection(*rest) מקפל את כולן יחד, ולקלט ריק דרושה תשובה משלו.',
            code: `def always_failing(runs):
    if not runs:
        return set()
    first, *rest = (set(run) for run in runs)
    return first.intersection(*rest)`,
            complexity: 'זמן: O(סך השמות בכל ההרצות). מקום: O(גודל ההרצה הקטנה ביותר).',
          },
          {
            title: '17. מיון בדיקות לפי סטטוס ואז לפי משך',
            prompt:
              'סדרו רשימת מילוני בדיקה כך שהכישלונות יופיעו ראשונים, ובתוך כל סטטוס הבדיקות האיטיות ביותר יופיעו ראשונות.',
            hint: 'החזירו tuple מפונקציית ה-key: פייתון משווה tuples איבר-איבר. שלילת המשך הופכת רק את השדה הזה לסדר יורד, בלי מיון שני.',
            code: `def triage_order(tests):
    return sorted(
        tests,
        key=lambda t: (t["status"] != "failed", -t["duration"]),
    )`,
            complexity: 'זמן: O(n log n). מקום: O(n) לעותק הממוין.',
          },
          {
            title: '18. סינון פרמטרי שאילתה ריקים',
            prompt:
              'לפני שליחת בקשה, הסירו ממילון הפרמטרים כל מפתח שערכו None או מחרוזת ריקה, כדי שה-URL יישאר נקי.',
            hint: 'הבנת מילון בונה את המילון מחדש במעבר אחד. השוו ל-None במפורש — `if value` היה משליך גם 0 ו-False, שהם ערכים לגיטימיים.',
            code: `def clean_params(params):
    return {
        k: v for k, v in params.items()
        if v is not None and v != ""
    }`,
            complexity: 'זמן: O(n). מקום: O(n) למילון המסונן.',
          },
          {
            title: '19. איתור חורים ברצף מספור הבדיקות',
            prompt:
              'מקרי הבדיקה ממוספרים 1..n. בהינתן המספרים שאכן רצו, החזירו את החסרים בסדר עולה.',
            hint: 'בנו את הטווח המלא הצפוי כ-set והחסירו את מה שרץ. מיון ההפרש בסוף זול יותר מסריקת הרשימה מחדש עבור כל מועמד.',
            code: `def missing_ids(ran, n):
    return sorted(set(range(1, n + 1)) - set(ran))`,
            complexity: 'זמן: O(n + m) ועוד O(k log k) למיון k המזהים החסרים. מקום: O(n).',
          },
          {
            title: '20. חיפוש בשמות בדיקות ללא תלות ברישיות',
            prompt: 'החזירו כל שם בדיקה שמכיל מונח חיפוש נתון, בהתעלם מהבדלי אותיות גדולות וקטנות.',
            hint: 'הורידו את מונח החיפוש לאותיות קטנות פעם אחת מחוץ ללולאה במקום בכל השוואה, ואז בדקו `term in name.lower()`.',
            code: `def search(names, term):
    needle = term.lower()
    return [name for name in names if needle in name.lower()]`,
            complexity: 'זמן: O(n*L) עבור n שמות באורך ממוצע L. מקום: O(n) במקרה הגרוע להתאמות.',
          },
        ],
      },
      {
        label: 'רמה 2 — רמת ראיון',
        blurb:
          'הפורמט שבו רוב ראיונות ה-QA Automation באמת נראים: דקורטורים, polling, אימות סכימה והשוואת לוגים.',
        items: [
          {
            title: '1. Poll עד שתנאי מתקיים',
            prompt:
              'כתבו `wait_until(condition, timeout=10, interval=0.5)` שבודק שוב ושוב פונקציה עד שהיא מחזירה ערך אמיתי, או זורק `TimeoutError`.',
            hint: 'שמרו את זמן ההתחלה עם time.monotonic(), רוצו כל עוד הזמן שחלף קטן מ-timeout, ישנו `interval` בין בדיקות, וזרקו חריגה אם הלולאה מסתיימת בלי הצלחה.',
            code: `import time

def wait_until(condition, timeout=10, interval=0.5):
    start = time.monotonic()
    while time.monotonic() - start < timeout:
        result = condition()
        if result:
            return result
        time.sleep(interval)
    raise TimeoutError(f"Condition not met within {timeout}s")`,
            complexity:
              'זמן: O(timeout / interval) בדיקות (בתוספת עלות condition() בכל פעם). מקום: O(1).',
          },
          {
            title: '2. דקורטור Retry לבדיקות מתנדנדות (flaky)',
            prompt:
              'כתבו דקורטור `retry` שמנסה שוב פונקציית בדיקה מתנדנדת עד N פעמים עם backoff מעריכי, ורק בניסיון האחרון זורק את החריגה הלאה.',
            hint: 'עטפו את הפונקציה עם *args/**kwargs, תפסו את החריגה בתוך לולאה, ישנו עם base_delay * 2**attempt, וזרקו שוב רק בניסיון האחרון.',
            code: `import time
from functools import wraps

def retry(times=3, base_delay=0.5, exceptions=(Exception,)):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return fn(*args, **kwargs)
                except exceptions:
                    if attempt == times - 1:
                        raise
                    time.sleep(base_delay * (2 ** attempt))
        return wrapper
    return decorator`,
            complexity:
              'זמן: O(1) תקורת wrapper, עד `times` קריאות ל-fn במקרה הגרוע. מקום: O(1) נוסף.',
          },
          {
            title: '3. אימות מבנה תגובת API',
            prompt:
              'כתבו פונקציה שבודקת שמילון תגובת API מנותח מכיל את כל `required_keys` עם ערכים שאינם None, ומחזירה את רשימת המפתחות החסרים או הפגומים.',
            hint: 'מעבר יחיד על `required_keys`, שבודק `key not in data or data[key] is None`, זה כל מה שצריך — אין צורך לעבור על `data` עצמו.',
            code: `def validate_response(data, required_keys):
    missing = []
    for key in required_keys:
        if key not in data or data[key] is None:
            missing.append(key)
    return missing`,
            complexity:
              'זמן: O(k) כאשר k = מספר המפתחות הנדרשים (בדיקות במילון הן O(1) בממוצע). מקום: O(k) עבור הפלט.',
          },
          {
            title: '4. השוואת שני יומני הרצת בדיקות',
            prompt:
              'בהינתן שתי רשימות מסודרות של שמות שלבים משתי הרצות בדיקה, מצאו את אורך רצף השלבים הארוך ביותר המופיע באותו סדר יחסי בשתיהן (כדי להדגיש איפה ההרצות התפצלו).',
            hint: 'זו בעיית Longest Common Subsequence הקלאסית: בנו טבלת DP דו-ממדית שבה dp[i][j] הוא אורך ה-LCS של i השלבים הראשונים בהרצה A ו-j השלבים הראשונים בהרצה B.',
            code: `def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]`,
            complexity: 'זמן: O(n*m). מקום: O(n*m), ניתן לצמצם ל-O(min(n,m)) עם מערך מתגלגל.',
          },
          {
            title: '5. חלוקת בדיקות ל-shards מאוזנים ב-CI',
            prompt:
              'חלקו רשימת בדיקות עם משכי ריצה ידועים ל-n shards מקביליים ב-CI, כך שה-shard האיטי ביותר יסתיים מוקדם ככל האפשר.',
            hint: 'אלגוריתם longest-processing-time-first: מיינו בסדר יורד, ותמיד שימו את הבדיקה הבאה ב-shard עם הסכום המצטבר הקטן ביותר. ערימת מינימום הופכת את החיפוש הזה לזול.',
            code: `import heapq

def shard_tests(tests, n):
    shards = [[] for _ in range(n)]
    totals = [(0, i) for i in range(n)]
    heapq.heapify(totals)
    for test in sorted(tests, key=lambda t: t["duration"], reverse=True):
        total, i = heapq.heappop(totals)
        shards[i].append(test)
        heapq.heappush(totals, (total + test["duration"], i))
    return shards`,
            complexity: 'זמן: O(m log m) למיון ועוד O(m log n) לערימה. מקום: O(m) ל-shards.',
          },
          {
            title: '6. זיהוי בדיקות flaky לאורך מספר הרצות',
            prompt:
              'בהינתן כמה הרצות בדיקה, כל אחת מילון של שם בדיקה ל-"passed" או "failed", החזירו את שמות הבדיקות שלא תמיד החזירו את אותה תוצאה.',
            hint: 'בדיקה היא flaky כאשר קבוצת הסטטוסים שהיא הפיקה מכילה יותר מאיבר אחד. אספו סטטוסים לפי שם במעבר אחד, ואז סננו.',
            code: `from collections import defaultdict

def find_flaky(runs):
    statuses = defaultdict(set)
    for run in runs:
        for name, status in run.items():
            statuses[name].add(status)
    return sorted(n for n, s in statuses.items() if len(s) > 1)`,
            complexity:
              'זמן: O(r*n) עבור r הרצות של n בדיקות. מקום: O(n) — כל בדיקה מחזיקה מספר זעום של סטטוסים שונים.',
          },
          {
            title: '7. מיזוג עמוק של קונפיגורציה עם דריסות סביבה',
            prompt:
              'מזגו מילון קונפיגורציית בסיס עם מילון דריסות של סביבה. מילונים מקוננים חייבים להתמזג מפתח-מפתח, ולא שהדריסה תחליף את כל הענף.',
            hint: 'רדו ברקורסיה רק כששני הצדדים הם מילון; בכל מקרה אחר הדריסה מנצחת. העתיקו תוך כדי כדי שקונפיגורציית הבסיס לעולם לא תשתנה.',
            code: `def deep_merge(base, override):
    result = dict(base)
    for key, value in override.items():
        if isinstance(result.get(key), dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result`,
            complexity:
              'זמן: O(n) על סך המפתחות בשני העצים. מקום: O(n) לעותק הממוזג ועוד O(d) לעומק הרקורסיה.',
          },
          {
            title: '8. הסתרת סודות משורות לוג',
            prompt:
              'לפני צירוף לוגים של בדיקות לדוח, החליפו את הערך של כל השמה של `token`, `password` או `api_key` ב-`***`, תוך שמירה על שאר השורה.',
            hint: 'ביטוי רגולרי אחד עם אלטרנציה על שמות המפתחות, קבוצת לכידה למפתח ולמפריד, והפניה לאחור בהחלפה — כך שרק הערך מוחלף.',
            code: `import re

SECRET = re.compile(
    r"(?i)\\b(token|password|api_key|secret)(\\s*[=:]\\s*)(\\S+)"
)

def redact(line):
    return SECRET.sub(r"\\1\\2***", line)`,
            complexity: 'זמן: O(n) באורך השורה. מקום: O(n) לעותק המצונזר.',
          },
          {
            title: '9. אימות שתגובת API מכילה תת-מבנה צפוי',
            prompt:
              'כתבו `matches_subset(actual, expected)` שמחזירה True כאשר כל מפתח ב-`expected` קיים ב-`actual` עם ערך זהה, ברקורסיה, בעוד שמפתחות נוספים ב-`actual` מותרים.',
            hint: 'רדו ברקורסיה כששני הצדדים מילונים, והשוו ישירות אחרת. כך בדיוק עובדת אסרציית התאמה חלקית בפריימוורק בדיקות API.',
            code: `def matches_subset(actual, expected):
    if isinstance(expected, dict):
        if not isinstance(actual, dict):
            return False
        return all(
            key in actual and matches_subset(actual[key], value)
            for key, value in expected.items()
        )
    return actual == expected`,
            complexity: 'זמן: O(e) בגודל תת-המבנה הצפוי. מקום: O(d) לעומק הרקורסיה.',
          },
          {
            title: '10. מעבר על endpoint מחולק לעמודים',
            prompt:
              'נקודת קצה מחזירה `{"items": [...], "next": <cursor או None>}`. החזירו כל פריט מכל העמודים מבלי לטעון את כל התוצאות לזיכרון.',
            hint: 'גנרטור מאפשר לקורא להתחיל לעבד את עמוד ראשון בזמן שהעמודים הבאים עדיין נשלפים. רוצו בלולאה על הסמן ובצעו yield from לפריטי כל עמוד.',
            code: `def iter_all(fetch_page):
    cursor = None
    while True:
        page = fetch_page(cursor)
        yield from page["items"]
        cursor = page.get("next")
        if not cursor:
            return`,
            complexity:
              'זמן: O(סך הפריטים) עם בקשה אחת לעמוד. מקום: O(גודל עמוד) — רק עמוד אחד מוחזק בכל רגע.',
          },
        ],
      },
      {
        label: 'רמה 3 — מתקדם',
        blurb: 'כאן נפרדים המועמדים: אינטרוולים, קאשינג, גרפים ומקביליות.',
        items: [
          {
            title: '1. מיזוג טווחי זמן חופפים של הרצות CI',
            prompt:
              'יש לכם רשימת טווחי זמן (start, end) שבהם משימות בדיקה של CI מתוזמנות. מזגו את כל הטווחים החופפים לקבוצה מינימלית של טווחים שאינם חופפים.',
            hint: 'מיינו את הטווחים לפי זמן ההתחלה, ולאחר מכן עברו עליהם ומזגו את הטווח הנוכחי לתוך האחרון בכל פעם שיש חפיפה.',
            code: `def merge_ranges(ranges):
    if not ranges:
        return []
    ranges = sorted(ranges, key=lambda r: r[0])
    merged = [ranges[0]]
    for start, end in ranges[1:]:
        last_start, last_end = merged[-1]
        if start <= last_end:
            merged[-1] = (last_start, max(last_end, end))
        else:
            merged.append((start, end))
    return merged`,
            complexity: 'זמן: O(n log n), נשלט על ידי המיון. מקום: O(n) עבור הפלט.',
          },
          {
            title: '2. הגבלת קצב (rate limit) לפונקציית בדיקה שקוראת ל-API',
            prompt:
              'כתבו דקורטור שמגביל פונקציית עזר שקוראת ל-API לכל היותר `max_calls` קריאות ב-`period` שניות, וישן כשצריך במקום להיכשל.',
            hint: 'שמרו deque עם חותמות זמן של קריאות אחרונות; לפני כל קריאה, הסירו חותמות ישנות מ-`period`, וישנו אם ה-deque כבר מלא.',
            code: `import time
from collections import deque
from functools import wraps

def rate_limited(max_calls, period):
    def decorator(fn):
        calls = deque()
        @wraps(fn)
        def wrapper(*args, **kwargs):
            now = time.monotonic()
            while calls and now - calls[0] > period:
                calls.popleft()
            if len(calls) >= max_calls:
                time.sleep(period - (now - calls[0]))
            calls.append(time.monotonic())
            return fn(*args, **kwargs)
        return wrapper
    return decorator`,
            complexity:
              'זמן: O(1) חסום-הפחתה לכל קריאה (פעולות deque). מקום: O(max_calls) עבור חלון חותמות הזמן.',
          },
          {
            title: '3. שמירה במטמון (LRU) של פיקסצ׳ר בדיקה יקר',
            prompt:
              'הימנעו מחישוב חוזר של פיקסצ׳ר יקר (למשל זריעת מסד נתוני בדיקה) עבור אותו קלט, על ידי שמירה במטמון של N התוצאות האחרונות.',
            hint: '`functools.lru_cache` נותן לכם את זה בחינם; למימוש ידני, השתמשו ב-OrderedDict והזיזו מפתח לסוף בכל גישה, תוך פינוי מההתחלה כשחורגים מהקיבולת.',
            code: `from functools import lru_cache

@lru_cache(maxsize=32)
def build_fixture(seed):
    return heavy_setup(seed)  # expensive setup, e.g. seeding a test DB

# Manual version:
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return None
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`,
            complexity: 'זמן: O(1) לכל get/put (פעולות OrderedDict). מקום: O(capacity).',
          },
          {
            title: '4. זיהוי מעגל בתלויות בין פיקסצ׳רים',
            prompt:
              'פיקסצ׳רים תלויים זה בזה, בייצוג של מילון משם הפיקסצ׳ר לרשימת שמות התלויות שלו. דווחו האם קיים מעגל תלויות כלשהו.',
            hint: 'DFS בשלושה צבעים. אפור פירושו "נמצא במסלול הנוכחי", ולכן פגישה חוזרת בצומת אפור היא המעגל. צמתים שחורים כבר הוכחו כנקיים וניתן לדלג עליהם.',
            code: `WHITE, GREY, BLACK = 0, 1, 2

def has_cycle(deps):
    colour = {}

    def visit(node):
        state = colour.get(node, WHITE)
        if state == GREY:
            return True
        if state == BLACK:
            return False
        colour[node] = GREY
        for dep in deps.get(node, ()):
            if visit(dep):
                return True
        colour[node] = BLACK
        return False

    return any(visit(node) for node in deps)`,
            complexity:
              'זמן: O(V + E) על פני הפיקסצ׳רים וקשתות התלות. מקום: O(V) לצבעים ולמחסנית הרקורסיה.',
          },
          {
            title: '5. הרצת בדיקות אסינכרוניות עם הגבלת מקביליות',
            prompt:
              'הריצו רשימת קורוטינות בדיקה אסינכרוניות במקביל, אך אף פעם לא יותר מ-`limit` בו-זמנית, ואספו כל תוצאה גם אם חלקן נכשלות.',
            hint: 'asyncio.gather מפעיל את הכל בבת אחת, ולכן עטפו כל קורוטינה ב-Semaphore כדי להגביל את מספר הרצות בו-זמנית. return_exceptions מונע ממקרה כישלון אחד לבטל את כל האצווה.',
            code: `import asyncio

async def run_all(tests, limit=5):
    semaphore = asyncio.Semaphore(limit)

    async def run_one(test):
        async with semaphore:
            return await test()

    return await asyncio.gather(
        *(run_one(test) for test in tests),
        return_exceptions=True,
    )`,
            complexity:
              'זמן: O(m) משימות כשלכל היותר `limit` רצות במקביל, כך שזמן הקיר הוא בקירוב total_work / limit. מקום: O(m) לתוצאות.',
          },
          {
            title: '6. סידור הקמת פיקסצ׳רים לפי תלויות',
            prompt:
              'בהינתן פיקסצ׳רים כמילון של שם לרשימת שמות התלויות שלו, הפיקו סדר הקמה שבו כל פיקסצ׳ר מופיע אחרי כל מה שהוא תלוי בו. זרקו חריגה אם זה בלתי אפשרי.',
            hint: 'מיון טופולוגי בשיטת Kahn: ספרו קשתות נכנסות, התחילו מהפיקסצ׳רים ללא תלויות, והפחיתו תוך כדי פליטה. אם נפלטו פחות צמתים מכפי שקיימים — הנותרים יוצרים מעגל.',
            code: `from collections import deque

def setup_order(deps):
    nodes = set(deps) | {d for ds in deps.values() for d in ds}
    indegree = {n: 0 for n in nodes}
    dependents = {n: [] for n in nodes}
    for node, requires in deps.items():
        for dep in requires:
            dependents[dep].append(node)
            indegree[node] += 1

    queue = deque(sorted(n for n in nodes if indegree[n] == 0))
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for dependent in dependents[node]:
            indegree[dependent] -= 1
            if indegree[dependent] == 0:
                queue.append(dependent)

    if len(order) != len(nodes):
        raise ValueError("Cyclic fixture dependencies")
    return order`,
            complexity:
              'זמן: O(V + E) על הפיקסצ׳רים וקשתות התלות. מקום: O(V + E) למפות הדרגות והתלויים.',
          },
          {
            title: '7. הרצת בדיקות תקינות חוסמות ב-thread pool',
            prompt:
              'הריצו פונקציית `check(url)` חוסמת מול הרבה כתובות במקביל, שייכו כל תוצאה ל-URL שלה, ורשמו כישלון במקום להפיל את כל האצווה כאשר בדיקה אחת זורקת חריגה.',
            hint: 'ThreadPoolExecutor מתאים ל-I/O חוסם. הגישו למילון future-ל-url כדי ש-as_completed יוכל לומר לאיזו כתובת שייך כל future שהסתיים, וקראו ל-result() בתוך try.',
            code: `from concurrent.futures import ThreadPoolExecutor, as_completed

def check_all(urls, check, workers=10, timeout=30):
    results = {}
    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(check, url): url for url in urls}
        for future in as_completed(futures, timeout=timeout):
            url = futures[future]
            try:
                results[url] = ("ok", future.result())
            except Exception as exc:
                results[url] = ("error", repr(exc))
    return results`,
            complexity:
              'זמן: בקירוב total_io / workers בזמן קיר עבור n כתובות. מקום: O(n) ל-futures ולתוצאות.',
          },
          {
            title: '8. מנהל הקשר (context manager) עם ניקוי מובטח',
            prompt:
              'כתבו context manager שמקים משאב בדיקה, מוסר אותו לגוף הבלוק, ותמיד מפרק אותו — גם כשהגוף זורק חריגה — ובכל זאת מאפשר לחריגה להמשיך להתפשט.',
            hint: 'עם ‎@contextmanager, שימו את הפירוק ב-finally סביב ה-yield. החזרת ערך שקרי (או כלום) מ-__exit__ היא מה שמאפשר לחריגה המקורית להמשיך.',
            code: `from contextlib import contextmanager

@contextmanager
def temp_environment(provision, destroy):
    env = provision()
    try:
        yield env
    finally:
        destroy(env)

# Equivalent class form:
class TempEnvironment:
    def __init__(self, provision, destroy):
        self._provision, self._destroy = provision, destroy

    def __enter__(self):
        self.env = self._provision()
        return self.env

    def __exit__(self, exc_type, exc, tb):
        self._destroy(self.env)
        return False  # never swallow the test failure`,
            complexity: 'זמן: O(1) בתוספת עלות ההקמה והפירוק. מקום: O(1).',
          },
          {
            title: '9. איתור ה-build ששבר את הבדיקה בחיפוש בינארי',
            prompt:
              'יש לכם רשימה מסודרת של builds שבה הבדיקה עברה בהתחלה ונכשלת בסוף. מצאו את ה-build הראשון שנכשל במספר הרצות מזערי.',
            hint: 'רצף ה-pass/fail מונוטוני, ולכן חיפוש בינארי מתאים: שמרו על האינוריאנטה ש-lo הוא אזור תקין ידוע ו-hi הוא כושל ידוע, וחצו את החלון בכל הרצה.',
            code: `def first_bad_build(builds, is_bad):
    lo, hi = 0, len(builds) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if is_bad(builds[mid]):
            hi = mid
        else:
            lo = mid + 1
    return builds[lo]`,
            complexity: 'זמן: O(log n) הרצות בדיקה עבור n builds. מקום: O(1).',
          },
          {
            title: '10. K הודעות השגיאה הנפוצות ביותר בלוג ענק',
            prompt:
              'לוג CI גדול בהרבה מהזיכרון. דווחו את k הודעות השגיאה השכיחות ביותר, בקריאה אחת בלבד של הקובץ.',
            hint: 'קראו את הקובץ שורה-שורה במקום read().splitlines(), ספרו לתוך Counter, והשתמשו ב-heapq.nlargest כדי שהדירוג לעולם לא ימיין את כל אוצר המילים.',
            code: `import heapq
from collections import Counter

def top_errors(path, k=10, prefix="ERROR"):
    counts = Counter()
    with open(path, encoding="utf-8", errors="replace") as fh:
        for line in fh:                     # streams, never loads the file
            if line.startswith(prefix):
                counts[line.strip()] += 1
    return heapq.nlargest(k, counts.items(), key=lambda kv: kv[1])`,
            complexity:
              'זמן: O(n + u log k) עבור n שורות ו-u הודעות שונות. מקום: O(u) — חסום במספר ההודעות השונות, לא בגודל הקובץ.',
          },
        ],
      },
    ],
  },
  prompts: {
    resume: `You are an expert QA/SDET career coach reviewing a resume for QA Automation roles. The candidate communicates in Hebrew, so write your summary and all text fields in Hebrew.
Evaluate the resume thoroughly and return ONLY valid JSON — no prose, no markdown outside the JSON:
{"overall":75,"summary":"משפט תמציתי אחד על איכות קורות החיים והתאמתם לתפקידי QA.","categories":[{"name":"מיומנויות טכניות","score":80},{"name":"מסגרות בדיקות","score":75},{"name":"CI/CD ו-DevOps","score":65},{"name":"בדיקות AI ו-LLM","score":50},{"name":"בהירות והשפעה","score":80}],"strengths":["חוזקה ברורה 1","חוזקה ברורה 2","חוזקה ברורה 3"],"gaps":["פער 1","פער 2","פער 3"],"recommendations":["המלצה ספציפית 1","המלצה ספציפית 2","המלצה ספציפית 3"]}`,
    improve: `You are an expert QA/SDET career coach and professional resume writer. The candidate communicates in Hebrew — write the improved resume in the same language as the original (Hebrew if Hebrew, English if English). Rewrite the resume to be compelling, ATS-friendly, and targeted for QA Automation and SDET roles. Use strong action verbs, quantify impact, and highlight test automation, CI/CD, and AI/LLM testing experience. Keep every contact detail of the original — name, phone, email and every URL — and never invent or alter one; write each URL as a [Label](https://full-url) link, e.g. [לינקדאין](https://www.linkedin.com/in/name), and leave a bare email address as plain text. Return ONLY the rewritten resume text — no JSON, no commentary.`,
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
- כשמקבלים "___VERDICT___" — ספק פסיקה מובנית עם ציון לכל שלב, המלצה כוללת, 3 חוזקות, ו-3 תחומים לשיפור`,
  },
};
