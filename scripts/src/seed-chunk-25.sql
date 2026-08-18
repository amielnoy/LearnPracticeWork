insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (37, 3, 6, '7. Run blocking health checks in a thread pool', 'Call a blocking `check(url)` against many URLs concurrently, pair every result with its URL, and record a failure instead of aborting the batch when one check raises.', 'ThreadPoolExecutor suits blocking I/O. Submit into a future-to-url dict so as_completed can tell you which URL each finished future belongs to, and call result() inside a try.', 'from concurrent.futures import ThreadPoolExecutor, as_completed

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
    return results', 'Time: roughly total_io / workers wall clock for n URLs. Space: O(n) for the futures and results.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (38, 3, 7, '8. A context manager with guaranteed cleanup', 'Write a context manager that provisions a test resource, hands it to the body, and always tears it down — even when the body raises — while letting that exception propagate.', 'With @contextmanager, put the teardown in a finally around the yield. Returning nothing (falsy) from __exit__ is what lets the original exception keep travelling.', 'from contextlib import contextmanager

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
        return False  # never swallow the test failure', 'Time: O(1) plus the provision and destroy costs. Space: O(1).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (39, 3, 8, '9. Bisect the build that broke a test', 'You have an ordered list of builds where the test passed at the start and fails at the end. Find the first failing build using as few test runs as possible.', 'The pass/fail sequence is monotonic, so binary search applies: keep the invariant that lo is known-good territory and hi is known-bad, and halve the window each run.', 'def first_bad_build(builds, is_bad):
    lo, hi = 0, len(builds) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if is_bad(builds[mid]):
            hi = mid
        else:
            lo = mid + 1
    return builds[lo]', 'Time: O(log n) test runs for n builds. Space: O(1).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (40, 3, 9, '10. Top-K error messages in a huge log', 'A CI log is far larger than memory. Report the k most frequent error messages, reading the file only once.', 'Stream the file line by line instead of read().splitlines(), count into a Counter, and use heapq.nlargest so the ranking never sorts the whole vocabulary.', 'import heapq
from collections import Counter

def top_errors(path, k=10, prefix="ERROR"):
    counts = Counter()
    with open(path, encoding="utf-8", errors="replace") as fh:
        for line in fh:                     # streams, never loads the file
            if line.startswith(prefix):
                counts[line.strip()] += 1
    return heapq.nlargest(k, counts.items(), key=lambda kv: kv[1])', 'Time: O(n + u log k) for n lines and u distinct messages. Space: O(u) — bounded by distinct messages, not file size.');
insert into coding_challenge_levels (id, lang, position, label, blurb) values (4, 'he', 0, 'רמה 1 — יסודות', 'רשימות, מילונים וקצת רקורסיה. אף שאלה כאן לא דורשת טריק, רק מעבר אחד נקי.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (41, 4, 0, '1. הסרת כפילויות ממזהי בדיקות תוך שמירת סדר', 'בהינתן רשימת מזהי מקרי בדיקה שעשויה להכיל כפילויות, החזירו רשימה חדשה ללא כפילויות, תוך שמירה על סדר ההופעה הראשון.', 'השתמשו ב-set כדי לעקוב אחרי מה שכבר נראה תוך כדי מעבר יחיד, והוסיפו לרשימת התוצאה רק פריטים שלא נראו.', 'def dedupe(ids):
    seen = set()
    result = []
    for i in ids:
        if i not in seen:
            seen.add(i)
            result.append(i)
    return result', 'זמן: O(n) בממוצע (בדיקות ב-set הן O(1) בממוצע). מקום: O(n) עבור ה-set והתוצאה.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (42, 4, 1, '2. מציאת מזהה הבדיקה הכפול הראשון', 'בהינתן רשימה גדולה של מזהי בדיקות, החזירו את המזהה הראשון שמופיע יותר מפעם אחת, או None אם אין כפילויות.', 'הימנעו מהגישה הנאיבית של לולאה מקוננת O(n^2) — מעבר יחיד עם set פותר את זה במעבר אחד.', 'def first_duplicate(ids):
    seen = set()
    for i in ids:
        if i in seen:
            return i
        seen.add(i)
    return None', 'זמן: O(n). מקום: O(n) עבור ה-set.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (43, 4, 2, '3. שיטוח מבנה סוויטת בדיקות מקונן', 'סוויטות בדיקה יכולות להיות מקוננות זו בזו לעומק שרירותי (עץ של רשימות). כתבו פונקציה ששוטחת את המבנה הזה לרשימה יחידה של שמות בדיקות עלים.', 'רקורסיה עובדת באופן טבעי על עץ: אם צומת הוא רשימה, בצעו רקורסיה על כל ילד; אם הוא ערך פשוט (שם בדיקת עלה), הוסיפו אותו לתוצאה.', 'def flatten_suite(node):
    result = []
    def walk(n):
        if isinstance(n, (list, tuple)):
            for child in n:
                walk(child)
        else:
            result.append(n)
    walk(node)
    return result', 'זמן: O(n) כאשר n = מספר הצמתים הכולל בעץ. מקום: O(d) מחסנית רקורסיה (d = עומק העץ) בתוספת O(n) עבור הפלט.');