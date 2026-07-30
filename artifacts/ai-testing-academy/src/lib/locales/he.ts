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
      { href: '#setup', label: '⚙️ הגדרת חיבור' },
      { href: '#resume', label: '📄 קורות חיים' },
      { href: '#lecture-series', label: '🎓 סדרת הרצאות' },
      { href: '#interview-talk', label: '🎙️ ראיון סימולציה' },
      { href: '#interview-questions', label: '❓ שאלות ראיון' },
      { href: '#coding-challenges', label: '🐍 אתגרי קוד בפייתון' },
    ],
    communityGroup: 'קהילה',
    community: [
      { href: 'https://www.youtube.com/@amielnoy', label: '▶ יוטיוב', cls: 'github-btn', target: '_blank' },
      { href: 'https://www.linkedin.com/in/amiel-peled/', label: '💼 לינקדאין', cls: 'telegram-btn', target: '_blank' },
      { href: 'https://chat.whatsapp.com/Bwjb01CGfxqIE04lkz2us0?mode=gi_t', label: '💬 קהילת אוטומציה ו-DevOps מבוססת AI', cls: 'whatsapp-btn', target: '_blank' },
    ],
    themeToggle: { ariaLabel: 'החלף ערכת נושא' },
    langToggle: { ariaLabel: 'החלף שפה', label: 'English' },
  },
  hero: {
    h1Line1: 'AI Testing Academy',
    h1Line2: 'הפלטפורמה המקצועית לקריירת QA שלך',
    p: 'שליטה מלאה באוטומציית בדיקות, DevOps ובדיקות AI — עם סוכנים חכמים, הרצאות מובנות ותרגול ראיונות אמיתי. בנוי עבור מהנדסי QA שרוצים להישאר צעד אחד קדימה.',
    badges: ['🤖 סוכני AI', '🎙️ ראיונות סימולציה', '📄 ניתוח קורות חיים', '🎓 סדרת הרצאות', '🐳 DevOps & CI'],
    cta: [
      { href: '#setup', label: 'התחל עכשיו →', cls: 'primary' },
      { href: '#lecture-series', label: 'צפה בהרצאות', cls: 'ghost' },
    ],
    tldr: {
      heading: 'מה תקבל:',
      items: [
        { b: 'סוכן 1', text: ' — ניתוח וכתיבה מחדש של קורות חיים לתפקידי QA' },
        { b: 'סוכן 2', text: ' — ראיון סימולציה חי עם מצב קול, 5 שלבים' },
        { b: 'סדרת הרצאות', text: ' — 10 הרצאות מעמיקות על בדיקות AI' },
        { b: 'בנק שאלות', text: ' — 25+ שאלות ראיון אמיתיות + העשרה עם AI' },
      ],
    },
  },
  setup: {
    num: '01',
    title: 'הגדרת חיבור',
    lead: 'חברו את ספק ה-AI שלכם פעם אחת — שני הסוכנים משתמשים באותו מפתח. ל-Gemini יש tier חינמי; Claude נותן את שכתובי קורות החיים הטובים ביותר.',
    boxTitle: '🔌 בחרו ספק AI',
    providerLabel: 'ספק',
    modelLabel: 'מודל',
    testBtn: '🔗 בדוק חיבור',
    useOwnKeyLabel: 'השתמש במפתח API שלי',
    apiKeyLabel: 'מפתח API',
    resetBtn: '🔄 אפס את כל ההגדרות',
    notice: 'אם תזין מפתח משלך, הוא יישמר רק ב-localStorage של הדפדפן שלך וישלח ישירות ל-API של הספק. אם תשתמש במפתח ברירת המחדל, הבקשות עוברות דרך השרת שלנו — המפתח עצמו לעולם לא מגיע לדפדפן שלך.',
    providers: [
      { value: 'gemini', label: 'Gemini (Google)' },
      { value: 'anthropic', label: 'Claude (Anthropic)' },
      { value: 'openai', label: 'GPT (OpenAI)' },
    ],
  },
  resume: {
    num: '02',
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
    num: '05',
    title: 'סוכן 2 — ראיון סימולציה',
    lead: 'הריצו ראיון QA Automation ריאליסטי עם מראיין AI — חמישה שלבים, מ-HR ועד לבדיקות AI. מצב קול מאפשר תרגול ללא ידיים.',
    boxTitle: '🎙️ התחל ראיון סימולציה',
    notice: 'ודאו שהחיבור מוגדר למעלה. הסוכן משתמש באותו מפתח API.',
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
    errNoKey: 'לא הוגדר מפתח API. הוסף את המפתח שלך בהגדרת החיבור למעלה.',
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
    videoLoading: 'טוען וידאו…',
    videoMissingPrefix: 'קובץ וידאו לא נמצא: ',
    videoMissingSuffix: '',
    themeLabelLight: 'מצב יום',
    themeLabelDark: 'מצב לילה',
    copyBtn: 'העתק',
    copyBtnDone: '✅ הועתק!',
    copyBtnReset: 'העתק',
    copyBtnFail: '❌ ההעתקה נכשלה',
  },
  codingChallenges: {
    title: '🐍 אתגרי קוד בפייתון לאוטומציית בדיקות',
    lead: '10 בעיות קוד מעשיות שעולות בראיונות אמיתיים ל-QA Automation. לחיצה אחת חושפת רמז, לחיצה נוספת חושפת פתרון קצר ויעיל עם ניתוח סיבוכיות זמן ומקום.',
    hintLabel: '💡 רמז',
    complexityLabel: '⏱️ סיבוכיות',
    showHintBtn: 'הצג רמז',
    showSolutionBtn: 'הצג פתרון',
    hideBtn: 'הסתר',
    items: [
      {
        title: '1. דקורטור Retry לבדיקות מתנדנדות (flaky)',
        prompt: 'כתבו דקורטור `retry` שמנסה שוב פונקציית בדיקה מתנדנדת עד N פעמים עם backoff מעריכי, ורק בניסיון האחרון זורק את החריגה הלאה.',
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
        complexity: 'זמן: O(1) תקורת wrapper, עד `times` קריאות ל-fn במקרה הגרוע. מקום: O(1) נוסף.',
      },
      {
        title: '2. Poll עד שתנאי מתקיים',
        prompt: 'כתבו `wait_until(condition, timeout=10, interval=0.5)` שבודק שוב ושוב פונקציה עד שהיא מחזירה ערך אמיתי, או זורק `TimeoutError`.',
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
        complexity: 'זמן: O(timeout / interval) בדיקות (בתוספת עלות condition() בכל פעם). מקום: O(1).',
      },
      {
        title: '3. הסרת כפילויות ממזהי בדיקות תוך שמירת סדר',
        prompt: 'בהינתן רשימת מזהי מקרי בדיקה שעשויה להכיל כפילויות, החזירו רשימה חדשה ללא כפילויות, תוך שמירה על סדר ההופעה הראשון.',
        hint: 'השתמשו ב-set כדי לעקוב אחרי מה שכבר נראה תוך כדי מעבר יחיד, והוסיפו לרשימת התוצאה רק פריטים שלא נראו.',
        code: `def dedupe(ids):
    seen = set()
    result = []
    for i in ids:
        if i not in seen:
            seen.add(i)
            result.append(i)
    return result`,
        complexity: 'זמן: O(n) בממוצע (בדיקות ב-set הן O(1) בממוצע). מקום: O(n) עבור ה-set והתוצאה.',
      },
      {
        title: '4. מציאת מזהה הבדיקה הכפול הראשון',
        prompt: 'בהינתן רשימה גדולה של מזהי בדיקות, החזירו את המזהה הראשון שמופיע יותר מפעם אחת, או None אם אין כפילויות.',
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
        title: '5. מיזוג טווחי זמן חופפים של הרצות CI',
        prompt: 'יש לכם רשימת טווחי זמן (start, end) שבהם משימות בדיקה של CI מתוזמנות. מזגו את כל הטווחים החופפים לקבוצה מינימלית של טווחים שאינם חופפים.',
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
        title: '6. הגבלת קצב (rate limit) לפונקציית בדיקה שקוראת ל-API',
        prompt: 'כתבו דקורטור שמגביל פונקציית עזר שקוראת ל-API לכל היותר `max_calls` קריאות ב-`period` שניות, וישן כשצריך במקום להיכשל.',
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
        complexity: 'זמן: O(1) חסום-הפחתה לכל קריאה (פעולות deque). מקום: O(max_calls) עבור חלון חותמות הזמן.',
      },
      {
        title: '7. אימות מבנה תגובת API',
        prompt: 'כתבו פונקציה שבודקת שמילון תגובת API מנותח מכיל את כל `required_keys` עם ערכים שאינם None, ומחזירה את רשימת המפתחות החסרים או הפגומים.',
        hint: 'מעבר יחיד על `required_keys`, שבודק `key not in data or data[key] is None`, זה כל מה שצריך — אין צורך לעבור על `data` עצמו.',
        code: `def validate_response(data, required_keys):
    missing = []
    for key in required_keys:
        if key not in data or data[key] is None:
            missing.append(key)
    return missing`,
        complexity: 'זמן: O(k) כאשר k = מספר המפתחות הנדרשים (בדיקות במילון הן O(1) בממוצע). מקום: O(k) עבור הפלט.',
      },
      {
        title: '8. שמירה במטמון (LRU) של פיקסצ׳ר בדיקה יקר',
        prompt: 'הימנעו מחישוב חוזר של פיקסצ׳ר יקר (למשל זריעת מסד נתוני בדיקה) עבור אותו קלט, על ידי שמירה במטמון של N התוצאות האחרונות.',
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
        title: '9. השוואת שני יומני הרצת בדיקות',
        prompt: 'בהינתן שתי רשימות מסודרות של שמות שלבים משתי הרצות בדיקה, מצאו את אורך רצף השלבים הארוך ביותר המופיע באותו סדר יחסי בשתיהן (כדי להדגיש איפה ההרצות התפצלו).',
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
        title: '10. שיטוח מבנה סוויטת בדיקות מקונן',
        prompt: 'סוויטות בדיקה יכולות להיות מקוננות זו בזו לעומק שרירותי (עץ של רשימות). כתבו פונקציה ששוטחת את המבנה הזה לרשימה יחידה של שמות בדיקות עלים.',
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
        complexity: 'זמן: O(n) כאשר n = מספר הצמתים הכולל בעץ. מקום: O(d) מחסנית רקורסיה (d = עומק העץ) בתוספת O(n) עבור הפלט.',
      },
    ],
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
- כשמקבלים "___VERDICT___" — ספק פסיקה מובנית עם ציון לכל שלב, המלצה כוללת, 3 חוזקות, ו-3 תחומים לשיפור`,
  },
};
