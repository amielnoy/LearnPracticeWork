insert into coding_challenge_levels (id, lang, position, label, blurb) values (5, 'he', 1, 'רמה 2 — רמת ראיון', 'הפורמט שבו רוב ראיונות ה-QA Automation באמת נראים: דקורטורים, polling, אימות סכימה והשוואת לוגים.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (61, 5, 0, '1. Poll עד שתנאי מתקיים', 'כתבו `wait_until(condition, timeout=10, interval=0.5)` שבודק שוב ושוב פונקציה עד שהיא מחזירה ערך אמיתי, או זורק `TimeoutError`.', 'שמרו את זמן ההתחלה עם time.monotonic(), רוצו כל עוד הזמן שחלף קטן מ-timeout, ישנו `interval` בין בדיקות, וזרקו חריגה אם הלולאה מסתיימת בלי הצלחה.', 'import time

def wait_until(condition, timeout=10, interval=0.5):
    start = time.monotonic()
    while time.monotonic() - start < timeout:
        result = condition()
        if result:
            return result
        time.sleep(interval)
    raise TimeoutError(f"Condition not met within {timeout}s")', 'זמן: O(timeout / interval) בדיקות (בתוספת עלות condition() בכל פעם). מקום: O(1).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (62, 5, 1, '2. דקורטור Retry לבדיקות מתנדנדות (flaky)', 'כתבו דקורטור `retry` שמנסה שוב פונקציית בדיקה מתנדנדת עד N פעמים עם backoff מעריכי, ורק בניסיון האחרון זורק את החריגה הלאה.', 'עטפו את הפונקציה עם *args/**kwargs, תפסו את החריגה בתוך לולאה, ישנו עם base_delay * 2**attempt, וזרקו שוב רק בניסיון האחרון.', 'import time
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
    return decorator', 'זמן: O(1) תקורת wrapper, עד `times` קריאות ל-fn במקרה הגרוע. מקום: O(1) נוסף.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (63, 5, 2, '3. אימות מבנה תגובת API', 'כתבו פונקציה שבודקת שמילון תגובת API מנותח מכיל את כל `required_keys` עם ערכים שאינם None, ומחזירה את רשימת המפתחות החסרים או הפגומים.', 'מעבר יחיד על `required_keys`, שבודק `key not in data or data[key] is None`, זה כל מה שצריך — אין צורך לעבור על `data` עצמו.', 'def validate_response(data, required_keys):
    missing = []
    for key in required_keys:
        if key not in data or data[key] is None:
            missing.append(key)
    return missing', 'זמן: O(k) כאשר k = מספר המפתחות הנדרשים (בדיקות במילון הן O(1) בממוצע). מקום: O(k) עבור הפלט.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (64, 5, 3, '4. השוואת שני יומני הרצת בדיקות', 'בהינתן שתי רשימות מסודרות של שמות שלבים משתי הרצות בדיקה, מצאו את אורך רצף השלבים הארוך ביותר המופיע באותו סדר יחסי בשתיהן (כדי להדגיש איפה ההרצות התפצלו).', 'זו בעיית Longest Common Subsequence הקלאסית: בנו טבלת DP דו-ממדית שבה dp[i][j] הוא אורך ה-LCS של i השלבים הראשונים בהרצה A ו-j השלבים הראשונים בהרצה B.', 'def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]', 'זמן: O(n*m). מקום: O(n*m), ניתן לצמצם ל-O(min(n,m)) עם מערך מתגלגל.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (65, 5, 4, '5. חלוקת בדיקות ל-shards מאוזנים ב-CI', 'חלקו רשימת בדיקות עם משכי ריצה ידועים ל-n shards מקביליים ב-CI, כך שה-shard האיטי ביותר יסתיים מוקדם ככל האפשר.', 'אלגוריתם longest-processing-time-first: מיינו בסדר יורד, ותמיד שימו את הבדיקה הבאה ב-shard עם הסכום המצטבר הקטן ביותר. ערימת מינימום הופכת את החיפוש הזה לזול.', 'import heapq

def shard_tests(tests, n):
    shards = [[] for _ in range(n)]
    totals = [(0, i) for i in range(n)]
    heapq.heapify(totals)
    for test in sorted(tests, key=lambda t: t["duration"], reverse=True):
        total, i = heapq.heappop(totals)
        shards[i].append(test)
        heapq.heappush(totals, (total + test["duration"], i))
    return shards', 'זמן: O(m log m) למיון ועוד O(m log n) לערימה. מקום: O(m) ל-shards.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (66, 5, 5, '6. זיהוי בדיקות flaky לאורך מספר הרצות', 'בהינתן כמה הרצות בדיקה, כל אחת מילון של שם בדיקה ל-"passed" או "failed", החזירו את שמות הבדיקות שלא תמיד החזירו את אותה תוצאה.', 'בדיקה היא flaky כאשר קבוצת הסטטוסים שהיא הפיקה מכילה יותר מאיבר אחד. אספו סטטוסים לפי שם במעבר אחד, ואז סננו.', 'from collections import defaultdict

def find_flaky(runs):
    statuses = defaultdict(set)
    for run in runs:
        for name, status in run.items():
            statuses[name].add(status)
    return sorted(n for n, s in statuses.items() if len(s) > 1)', 'זמן: O(r*n) עבור r הרצות של n בדיקות. מקום: O(n) — כל בדיקה מחזיקה מספר זעום של סטטוסים שונים.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (67, 5, 6, '7. מיזוג עמוק של קונפיגורציה עם דריסות סביבה', 'מזגו מילון קונפיגורציית בסיס עם מילון דריסות של סביבה. מילונים מקוננים חייבים להתמזג מפתח-מפתח, ולא שהדריסה תחליף את כל הענף.', 'רדו ברקורסיה רק כששני הצדדים הם מילון; בכל מקרה אחר הדריסה מנצחת. העתיקו תוך כדי כדי שקונפיגורציית הבסיס לעולם לא תשתנה.', 'def deep_merge(base, override):
    result = dict(base)
    for key, value in override.items():
        if isinstance(result.get(key), dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result', 'זמן: O(n) על סך המפתחות בשני העצים. מקום: O(n) לעותק הממוזג ועוד O(d) לעומק הרקורסיה.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (68, 5, 7, '8. הסתרת סודות משורות לוג', 'לפני צירוף לוגים של בדיקות לדוח, החליפו את הערך של כל השמה של `token`, `password` או `api_key` ב-`***`, תוך שמירה על שאר השורה.', 'ביטוי רגולרי אחד עם אלטרנציה על שמות המפתחות, קבוצת לכידה למפתח ולמפריד, והפניה לאחור בהחלפה — כך שרק הערך מוחלף.', 'import re

SECRET = re.compile(
    r"(?i)\b(token|password|api_key|secret)(\s*[=:]\s*)(\S+)"
)

def redact(line):
    return SECRET.sub(r"\1\2***", line)', 'זמן: O(n) באורך השורה. מקום: O(n) לעותק המצונזר.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (69, 5, 8, '9. אימות שתגובת API מכילה תת-מבנה צפוי', 'כתבו `matches_subset(actual, expected)` שמחזירה True כאשר כל מפתח ב-`expected` קיים ב-`actual` עם ערך זהה, ברקורסיה, בעוד שמפתחות נוספים ב-`actual` מותרים.', 'רדו ברקורסיה כששני הצדדים מילונים, והשוו ישירות אחרת. כך בדיוק עובדת אסרציית התאמה חלקית בפריימוורק בדיקות API.', 'def matches_subset(actual, expected):
    if isinstance(expected, dict):
        if not isinstance(actual, dict):
            return False
        return all(
            key in actual and matches_subset(actual[key], value)
            for key, value in expected.items()
        )
    return actual == expected', 'זמן: O(e) בגודל תת-המבנה הצפוי. מקום: O(d) לעומק הרקורסיה.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (70, 5, 9, '10. מעבר על endpoint מחולק לעמודים', 'נקודת קצה מחזירה `{"items": [...], "next": <cursor או None>}`. החזירו כל פריט מכל העמודים מבלי לטעון את כל התוצאות לזיכרון.', 'גנרטור מאפשר לקורא להתחיל לעבד את עמוד ראשון בזמן שהעמודים הבאים עדיין נשלפים. רוצו בלולאה על הסמן ובצעו yield from לפריטי כל עמוד.', 'def iter_all(fetch_page):
    cursor = None
    while True:
        page = fetch_page(cursor)
        yield from page["items"]
        cursor = page.get("next")
        if not cursor:
            return', 'זמן: O(סך הפריטים) עם בקשה אחת לעמוד. מקום: O(גודל עמוד) — רק עמוד אחד מוחזק בכל רגע.');
insert into coding_challenge_levels (id, lang, position, label, blurb) values (6, 'he', 2, 'רמה 3 — מתקדם', 'כאן נפרדים המועמדים: אינטרוולים, קאשינג, גרפים ומקביליות.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (71, 6, 0, '1. מיזוג טווחי זמן חופפים של הרצות CI', 'יש לכם רשימת טווחי זמן (start, end) שבהם משימות בדיקה של CI מתוזמנות. מזגו את כל הטווחים החופפים לקבוצה מינימלית של טווחים שאינם חופפים.', 'מיינו את הטווחים לפי זמן ההתחלה, ולאחר מכן עברו עליהם ומזגו את הטווח הנוכחי לתוך האחרון בכל פעם שיש חפיפה.', 'def merge_ranges(ranges):
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
    return merged', 'זמן: O(n log n), נשלט על ידי המיון. מקום: O(n) עבור הפלט.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (72, 6, 1, '2. הגבלת קצב (rate limit) לפונקציית בדיקה שקוראת ל-API', 'כתבו דקורטור שמגביל פונקציית עזר שקוראת ל-API לכל היותר `max_calls` קריאות ב-`period` שניות, וישן כשצריך במקום להיכשל.', 'שמרו deque עם חותמות זמן של קריאות אחרונות; לפני כל קריאה, הסירו חותמות ישנות מ-`period`, וישנו אם ה-deque כבר מלא.', 'import time
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
    return decorator', 'זמן: O(1) חסום-הפחתה לכל קריאה (פעולות deque). מקום: O(max_calls) עבור חלון חותמות הזמן.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (73, 6, 2, '3. שמירה במטמון (LRU) של פיקסצ׳ר בדיקה יקר', 'הימנעו מחישוב חוזר של פיקסצ׳ר יקר (למשל זריעת מסד נתוני בדיקה) עבור אותו קלט, על ידי שמירה במטמון של N התוצאות האחרונות.', '`functools.lru_cache` נותן לכם את זה בחינם; למימוש ידני, השתמשו ב-OrderedDict והזיזו מפתח לסוף בכל גישה, תוך פינוי מההתחלה כשחורגים מהקיבולת.', 'from functools import lru_cache

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
            self.cache.popitem(last=False)', 'זמן: O(1) לכל get/put (פעולות OrderedDict). מקום: O(capacity).');