insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (60, 4, 19, '20. חיפוש בשמות בדיקות ללא תלות ברישיות', 'החזירו כל שם בדיקה שמכיל מונח חיפוש נתון, בהתעלם מהבדלי אותיות גדולות וקטנות.', 'הורידו את מונח החיפוש לאותיות קטנות פעם אחת מחוץ ללולאה במקום בכל השוואה, ואז בדקו `term in name.lower()`.', 'def search(names, term):
    needle = term.lower()
    return [name for name in names if needle in name.lower()]', 'זמן: O(n*L) עבור n שמות באורך ממוצע L. מקום: O(n) במקרה הגרוע להתאמות.');
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