insert into question_bank_items (id, stage_id, position, question, hint, answer) values (150, 10, 14, 'איך אתה מנטר פיצ׳ר AI בפרודקשן לסחיפה ולדעיכת איכות?', 'הערכה אופליין היא תמונת-רגע; בפרודקשן האיכות באמת נשחקת.', ARRAY['תעדו קלטים, פלטים ואותות, ושימו לב לסחיפת קלט (משתמשים שואלים דברים חדשים) ולסחיפת פלט (המודל או עדכון-ספק שקט משנים התנהגות).', 'עקבו אחר מדדי-איכות ברציפות: אגודל למטה, שיעורי הסלמה וניסיונות חוזרים, שיעור סירוב, latency ועלות — והתריעו על שינויי מגמה, לא על אירועים בודדים.', 'הריצו הערכה מתוזמנת מול ה-golden set לתפוס רגרסיות שעדכון-ספק הכניס, דגמו תעבורה אמיתית לסקירה אנושית, והזינו כל כשל שהתגלה בחזרה לערכת ההערכה.']::text[]);
insert into coding_challenge_levels (id, lang, position, label, blurb) values (1, 'en', 0, 'Level 1 — Fundamentals', 'Lists, dicts and a little recursion. Nothing here needs a clever trick, only a clean single pass.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (1, 1, 0, '1. Deduplicate test IDs, preserving order', 'Given a list of test case IDs that may contain duplicates, return a new list with duplicates removed, preserving first-seen order.', 'Use a set to track what has been seen while iterating once and appending only unseen items to the result list.', 'def dedupe(ids):
    seen = set()
    result = []
    for i in ids:
        if i not in seen:
            seen.add(i)
            result.append(i)
    return result', 'Time: O(n) average (set lookups are O(1) amortized). Space: O(n) for the seen set and result.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (2, 1, 1, '2. Find the first duplicate test ID', 'Given a large list of test IDs, return the first ID that appears more than once, or None if there are no duplicates.', 'Avoid the naive O(n^2) nested-loop check — a single pass with a set gets it done in one sweep.', 'def first_duplicate(ids):
    seen = set()
    for i in ids:
        if i in seen:
            return i
        seen.add(i)
    return None', 'Time: O(n). Space: O(n) for the seen set.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (3, 1, 2, '3. Flatten a nested test suite', 'Test suites can nest suites inside suites arbitrarily deep (a tree of lists). Write a function that flattens this structure into a single list of leaf test names.', 'Recursion works naturally on a tree: if a node is a list, recurse into each child; if it is a plain value (a leaf test name), add it to the result.', 'def flatten_suite(node):
    result = []
    def walk(n):
        if isinstance(n, (list, tuple)):
            for child in n:
                walk(child)
        else:
            result.append(n)
    walk(node)
    return result', 'Time: O(n) where n = total number of nodes in the tree. Space: O(d) recursion stack (d = tree depth) plus O(n) for the output.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (4, 1, 3, '4. Count test results by status', 'Given a list of result dicts like `{"name": ..., "status": "passed"}`, return how many results there are per status.', 'One pass and a dict of counters is enough. collections.Counter does the bookkeeping for you.', 'from collections import Counter

def count_by_status(results):
    return Counter(r["status"] for r in results)', 'Time: O(n). Space: O(k), where k is the number of distinct statuses.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (5, 1, 4, '5. Find the N slowest tests', 'Given a list of test dicts with a `duration` field, return the n slowest of them, slowest first.', 'Sorting the whole list is O(m log m) when you only need n items. heapq.nlargest keeps a heap of size n instead.', 'import heapq

def slowest(tests, n):
    return heapq.nlargest(n, tests, key=lambda t: t["duration"])', 'Time: O(m log n) for m tests. Space: O(n) for the heap and the result.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (6, 1, 5, '6. Group tests by tag', 'Given a list of test dicts like `{"name": ..., "tags": ["smoke", "api"]}`, return a dict mapping each tag to the list of test names carrying it.', 'A plain dict forces you to check "is this key here yet?" on every insert. collections.defaultdict(list) creates the empty list for you on first touch.', 'from collections import defaultdict

def group_by_tag(tests):
    groups = defaultdict(list)
    for test in tests:
        for tag in test.get("tags", ()):
            groups[tag].append(test["name"])
    return dict(groups)', 'Time: O(n*t) for n tests with t tags each. Space: O(n*t) for the grouped output.');