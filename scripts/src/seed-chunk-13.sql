insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (32, 3, 1, '2. Rate-limit an API test helper', 'Write a decorator that limits an API-calling test helper to at most `max_calls` per `period` seconds, sleeping as needed instead of failing.', 'Keep a deque of recent call timestamps; before each call, drop timestamps older than `period`, then sleep if the deque is already full.', 'import time
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
    return decorator', 'Time: O(1) amortized per call (deque push/pop). Space: O(max_calls) for the timestamp window.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (33, 3, 2, '3. Cache an expensive test fixture (LRU)', 'Avoid re-computing an expensive fixture (e.g. seeding a test database) for the same input by caching the last N results.', '`functools.lru_cache` gives you this for free; to implement it by hand, use an OrderedDict and move a key to the end on every access, evicting from the front when over capacity.', 'from functools import lru_cache

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
            self.cache.popitem(last=False)', 'Time: O(1) per get/put (OrderedDict operations). Space: O(capacity).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (34, 3, 3, '4. Detect a cycle in fixture dependencies', 'Fixtures depend on other fixtures, given as a dict of name to list of dependency names. Report whether any dependency cycle exists.', 'Three-colour DFS. Grey means "on the current path", so meeting a grey node again is the cycle. Black nodes are already proven clean and can be skipped.', 'WHITE, GREY, BLACK = 0, 1, 2

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

    return any(visit(node) for node in deps)', 'Time: O(V + E) over fixtures and dependency edges. Space: O(V) for the colours and the recursion stack.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (35, 3, 4, '5. Run async tests with a concurrency limit', 'Run a list of async test coroutines concurrently, but never more than `limit` at a time, and collect every result even if some fail.', 'asyncio.gather starts everything at once, so wrap each coroutine in a Semaphore to cap what runs. return_exceptions keeps one failure from cancelling the batch.', 'import asyncio

async def run_all(tests, limit=5):
    semaphore = asyncio.Semaphore(limit)

    async def run_one(test):
        async with semaphore:
            return await test()

    return await asyncio.gather(
        *(run_one(test) for test in tests),
        return_exceptions=True,
    )', 'Time: O(m) tasks with at most `limit` in flight, so wall clock is roughly total_work / limit. Space: O(m) for the results.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (36, 3, 5, '6. Order fixture setup by dependency', 'Given fixtures as a dict of name to its dependency names, produce a setup order in which every fixture appears after everything it depends on. Raise if that is impossible.', 'Kahn topological sort: count incoming edges, start from the fixtures with none, and decrement as you emit. If you emit fewer nodes than exist, the leftovers form a cycle.', 'from collections import deque

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
    return order', 'Time: O(V + E) over fixtures and dependency edges. Space: O(V + E) for the indegree and dependents maps.');
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
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (44, 4, 3, '4. ספירת תוצאות בדיקה לפי סטטוס', 'בהינתן רשימת מילוני תוצאה בסגנון `{"name": ..., "status": "passed"}`, החזירו כמה תוצאות יש לכל סטטוס.', 'מספיק מעבר אחד ומילון מונים. collections.Counter עושה את ניהול הספירה במקומכם.', 'from collections import Counter

def count_by_status(results):
    return Counter(r["status"] for r in results)', 'זמן: O(n). מקום: O(k), כאשר k = מספר הסטטוסים השונים.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (45, 4, 4, '5. מציאת N הבדיקות האיטיות ביותר', 'בהינתן רשימת מילוני בדיקה עם שדה `duration`, החזירו את n האיטיות ביותר, מהאיטית ביותר ומטה.', 'מיון הרשימה כולה הוא O(m log m) כשצריך רק n פריטים. heapq.nlargest מחזיק ערימה בגודל n בלבד.', 'import heapq

def slowest(tests, n):
    return heapq.nlargest(n, tests, key=lambda t: t["duration"])', 'זמן: O(m log n) עבור m בדיקות. מקום: O(n) לערימה ולתוצאה.');