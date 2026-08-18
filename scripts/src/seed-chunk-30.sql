insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (74, 6, 3, '4. זיהוי מעגל בתלויות בין פיקסצ׳רים', 'פיקסצ׳רים תלויים זה בזה, בייצוג של מילון משם הפיקסצ׳ר לרשימת שמות התלויות שלו. דווחו האם קיים מעגל תלויות כלשהו.', 'DFS בשלושה צבעים. אפור פירושו "נמצא במסלול הנוכחי", ולכן פגישה חוזרת בצומת אפור היא המעגל. צמתים שחורים כבר הוכחו כנקיים וניתן לדלג עליהם.', 'WHITE, GREY, BLACK = 0, 1, 2

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

    return any(visit(node) for node in deps)', 'זמן: O(V + E) על פני הפיקסצ׳רים וקשתות התלות. מקום: O(V) לצבעים ולמחסנית הרקורסיה.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (75, 6, 4, '5. הרצת בדיקות אסינכרוניות עם הגבלת מקביליות', 'הריצו רשימת קורוטינות בדיקה אסינכרוניות במקביל, אך אף פעם לא יותר מ-`limit` בו-זמנית, ואספו כל תוצאה גם אם חלקן נכשלות.', 'asyncio.gather מפעיל את הכל בבת אחת, ולכן עטפו כל קורוטינה ב-Semaphore כדי להגביל את מספר הרצות בו-זמנית. return_exceptions מונע ממקרה כישלון אחד לבטל את כל האצווה.', 'import asyncio

async def run_all(tests, limit=5):
    semaphore = asyncio.Semaphore(limit)

    async def run_one(test):
        async with semaphore:
            return await test()

    return await asyncio.gather(
        *(run_one(test) for test in tests),
        return_exceptions=True,
    )', 'זמן: O(m) משימות כשלכל היותר `limit` רצות במקביל, כך שזמן הקיר הוא בקירוב total_work / limit. מקום: O(m) לתוצאות.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (76, 6, 5, '6. סידור הקמת פיקסצ׳רים לפי תלויות', 'בהינתן פיקסצ׳רים כמילון של שם לרשימת שמות התלויות שלו, הפיקו סדר הקמה שבו כל פיקסצ׳ר מופיע אחרי כל מה שהוא תלוי בו. זרקו חריגה אם זה בלתי אפשרי.', 'מיון טופולוגי בשיטת Kahn: ספרו קשתות נכנסות, התחילו מהפיקסצ׳רים ללא תלויות, והפחיתו תוך כדי פליטה. אם נפלטו פחות צמתים מכפי שקיימים — הנותרים יוצרים מעגל.', 'from collections import deque

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
    return order', 'זמן: O(V + E) על הפיקסצ׳רים וקשתות התלות. מקום: O(V + E) למפות הדרגות והתלויים.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (77, 6, 6, '7. הרצת בדיקות תקינות חוסמות ב-thread pool', 'הריצו פונקציית `check(url)` חוסמת מול הרבה כתובות במקביל, שייכו כל תוצאה ל-URL שלה, ורשמו כישלון במקום להפיל את כל האצווה כאשר בדיקה אחת זורקת חריגה.', 'ThreadPoolExecutor מתאים ל-I/O חוסם. הגישו למילון future-ל-url כדי ש-as_completed יוכל לומר לאיזו כתובת שייך כל future שהסתיים, וקראו ל-result() בתוך try.', 'from concurrent.futures import ThreadPoolExecutor, as_completed

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
    return results', 'זמן: בקירוב total_io / workers בזמן קיר עבור n כתובות. מקום: O(n) ל-futures ולתוצאות.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (78, 6, 7, '8. מנהל הקשר (context manager) עם ניקוי מובטח', 'כתבו context manager שמקים משאב בדיקה, מוסר אותו לגוף הבלוק, ותמיד מפרק אותו — גם כשהגוף זורק חריגה — ובכל זאת מאפשר לחריגה להמשיך להתפשט.', 'עם ‎@contextmanager, שימו את הפירוק ב-finally סביב ה-yield. החזרת ערך שקרי (או כלום) מ-__exit__ היא מה שמאפשר לחריגה המקורית להמשיך.', 'from contextlib import contextmanager

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
        return False  # never swallow the test failure', 'זמן: O(1) בתוספת עלות ההקמה והפירוק. מקום: O(1).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (79, 6, 8, '9. איתור ה-build ששבר את הבדיקה בחיפוש בינארי', 'יש לכם רשימה מסודרת של builds שבה הבדיקה עברה בהתחלה ונכשלת בסוף. מצאו את ה-build הראשון שנכשל במספר הרצות מזערי.', 'רצף ה-pass/fail מונוטוני, ולכן חיפוש בינארי מתאים: שמרו על האינוריאנטה ש-lo הוא אזור תקין ידוע ו-hi הוא כושל ידוע, וחצו את החלון בכל הרצה.', 'def first_bad_build(builds, is_bad):
    lo, hi = 0, len(builds) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if is_bad(builds[mid]):
            hi = mid
        else:
            lo = mid + 1
    return builds[lo]', 'זמן: O(log n) הרצות בדיקה עבור n builds. מקום: O(1).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (80, 6, 9, '10. K הודעות השגיאה הנפוצות ביותר בלוג ענק', 'לוג CI גדול בהרבה מהזיכרון. דווחו את k הודעות השגיאה השכיחות ביותר, בקריאה אחת בלבד של הקובץ.', 'קראו את הקובץ שורה-שורה במקום read().splitlines(), ספרו לתוך Counter, והשתמשו ב-heapq.nlargest כדי שהדירוג לעולם לא ימיין את כל אוצר המילים.', 'import heapq
from collections import Counter

def top_errors(path, k=10, prefix="ERROR"):
    counts = Counter()
    with open(path, encoding="utf-8", errors="replace") as fh:
        for line in fh:                     # streams, never loads the file
            if line.startswith(prefix):
                counts[line.strip()] += 1
    return heapq.nlargest(k, counts.items(), key=lambda kv: kv[1])', 'זמן: O(n + u log k) עבור n שורות ו-u הודעות שונות. מקום: O(u) — חסום במספר ההודעות השונות, לא בגודל הקובץ.');
insert into lecture_tracks (id, lang, position, title, lead) values (1, 'en', 0, 'AI Testing', 'From AI testing fundamentals to advanced evaluation techniques.');