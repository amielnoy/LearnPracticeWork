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