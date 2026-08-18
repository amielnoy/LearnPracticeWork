insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (15, 1, 14, '15. Zip names and statuses into a dict', 'A legacy report gives you test names and their statuses as two parallel lists. Build a single dict mapping each name to its status.', 'dict(zip(names, statuses)) is the idiomatic one-liner. Note that zip stops at the shorter list, so check the lengths first if a mismatch is a real error.', 'def to_report(names, statuses):
    if len(names) != len(statuses):
        raise ValueError("Mismatched report columns")
    return dict(zip(names, statuses))', 'Time: O(n). Space: O(n) for the resulting dict.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (16, 1, 15, '16. Tests that failed in every run', 'Given several runs, each a list of the test names that failed in it, return the names that failed in every single run — the consistently broken ones.', 'That is a set intersection. set.intersection(*rest) folds them all together, and an empty input needs its own answer.', 'def always_failing(runs):
    if not runs:
        return set()
    first, *rest = (set(run) for run in runs)
    return first.intersection(*rest)', 'Time: O(total names across runs). Space: O(size of the smallest run).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (17, 1, 16, '17. Sort tests by status, then by duration', 'Order a list of test dicts so failures come first, and within each status the slowest tests come first.', 'Return a tuple from the sort key: Python compares tuples element by element. Negating the duration flips just that field to descending without a second sort.', 'def triage_order(tests):
    return sorted(
        tests,
        key=lambda t: (t["status"] != "failed", -t["duration"]),
    )', 'Time: O(n log n). Space: O(n) for the sorted copy.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (18, 1, 17, '18. Drop empty query parameters', 'Before sending a request, remove every key from a params dict whose value is None or an empty string, so the URL stays clean.', 'A dict comprehension rebuilds the dict in one pass. Test against None explicitly — `if value` would also throw away 0 and False, which are legitimate values.', 'def clean_params(params):
    return {
        k: v for k, v in params.items()
        if v is not None and v != ""
    }', 'Time: O(n). Space: O(n) for the filtered dict.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (19, 1, 18, '19. Find gaps in a numbered test sequence', 'Test cases are numbered 1..n. Given the numbers that actually ran, return the missing ones in ascending order.', 'Build the full expected range as a set and subtract what ran. Sorting the difference at the end is cheaper than scanning the list once per candidate.', 'def missing_ids(ran, n):
    return sorted(set(range(1, n + 1)) - set(ran))', 'Time: O(n + m) plus O(k log k) to sort k missing IDs. Space: O(n).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (20, 1, 19, '20. Case-insensitive search over test names', 'Return every test name that contains a given search term, ignoring differences in case.', 'Lowercase the term once outside the loop rather than on every comparison, then check `term in name.lower()`.', 'def search(names, term):
    needle = term.lower()
    return [name for name in names if needle in name.lower()]', 'Time: O(n*L) for n names of average length L. Space: O(n) worst case for the matches.');
insert into coding_challenge_levels (id, lang, position, label, blurb) values (2, 'en', 1, 'Level 2 — Interview standard', 'The shape most QA-Automation interviews actually take: decorators, polling, schema validation and log diffing.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (21, 2, 0, '1. Poll until a condition is true', 'Write `wait_until(condition, timeout=10, interval=0.5)` that polls a callable until it returns a truthy value, or raises `TimeoutError`.', 'Record the start time with time.monotonic(), loop while elapsed time < timeout, sleep `interval` between checks, and raise if the loop exits without success.', 'import time

def wait_until(condition, timeout=10, interval=0.5):
    start = time.monotonic()
    while time.monotonic() - start < timeout:
        result = condition()
        if result:
            return result
        time.sleep(interval)
    raise TimeoutError(f"Condition not met within {timeout}s")', 'Time: O(timeout / interval) polls (plus the cost of condition() each time). Space: O(1).');