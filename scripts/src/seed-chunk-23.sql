insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (22, 2, 1, '2. Retry decorator for flaky tests', 'Write a `retry` decorator that retries a flaky test function up to N times with exponential backoff before finally letting the exception propagate.', 'Wrap the function with *args/**kwargs, catch the exception inside a loop, sleep with base_delay * 2**attempt, and only re-raise on the last attempt.', 'import time
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
    return decorator', 'Time: O(1) wrapper overhead, up to `times` calls to fn in the worst case. Space: O(1) extra.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (23, 2, 2, '3. Validate an API response shape', 'Write a function that checks a parsed API response dict contains all `required_keys` with non-None values, returning the list of missing or invalid keys.', 'A single pass over `required_keys`, checking `key not in data or data[key] is None`, is all you need — no need to loop over `data` itself.', 'def validate_response(data, required_keys):
    missing = []
    for key in required_keys:
        if key not in data or data[key] is None:
            missing.append(key)
    return missing', 'Time: O(k) where k = number of required keys (dict lookups are O(1) average). Space: O(k) for the output.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (24, 2, 3, '4. Diff two test-run logs', 'Given two ordered lists of step names from two test runs, find the length of the longest sequence of steps that appears in the same relative order in both (to highlight where the runs diverged).', 'This is the classic Longest Common Subsequence problem: build a 2D DP table where dp[i][j] is the LCS length of the first i steps of run A and the first j steps of run B.', 'def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]', 'Time: O(n*m). Space: O(n*m), can be reduced to O(min(n,m)) with a rolling array.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (25, 2, 4, '5. Split tests into balanced CI shards', 'Split a list of tests with known durations across n parallel CI shards, so the slowest shard finishes as early as possible.', 'Longest-processing-time-first: sort descending, then always drop the next test into the shard with the smallest running total. A min-heap keeps that lookup cheap.', 'import heapq

def shard_tests(tests, n):
    shards = [[] for _ in range(n)]
    totals = [(0, i) for i in range(n)]
    heapq.heapify(totals)
    for test in sorted(tests, key=lambda t: t["duration"], reverse=True):
        total, i = heapq.heappop(totals)
        shards[i].append(test)
        heapq.heappush(totals, (total + test["duration"], i))
    return shards', 'Time: O(m log m) for the sort plus O(m log n) for the heap. Space: O(m) for the shards.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (26, 2, 5, '6. Detect flaky tests across runs', 'Given several test runs, each a dict of test name to "passed" or "failed", return the names of tests that did not always produce the same result.', 'A test is flaky when the set of statuses it produced has more than one member. Collect statuses per name in one pass, then filter.', 'from collections import defaultdict

def find_flaky(runs):
    statuses = defaultdict(set)
    for run in runs:
        for name, status in run.items():
            statuses[name].add(status)
    return sorted(n for n, s in statuses.items() if len(s) > 1)', 'Time: O(r*n) for r runs of n tests. Space: O(n) — each test holds at most a couple of distinct statuses.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (27, 2, 6, '7. Deep-merge config with environment overrides', 'Merge a base config dict with an environment override dict. Nested dicts must merge key by key rather than the override replacing the whole branch.', 'Recurse only when both sides hold a dict; in every other case the override wins. Copy as you go so the base config is never mutated.', 'def deep_merge(base, override):
    result = dict(base)
    for key, value in override.items():
        if isinstance(result.get(key), dict) and isinstance(value, dict):
            result[key] = deep_merge(result[key], value)
        else:
            result[key] = value
    return result', 'Time: O(n) over the total number of keys in both trees. Space: O(n) for the merged copy plus O(d) recursion depth.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (28, 2, 7, '8. Redact secrets from log lines', 'Before attaching test logs to a report, replace the value of any `token`, `password` or `api_key` assignment with `***`, keeping the rest of the line intact.', 'One regex with an alternation over the key names, a capture group for the key-and-separator, and a backreference in the replacement so only the value is swapped.', 'import re

SECRET = re.compile(
    r"(?i)\b(token|password|api_key|secret)(\s*[=:]\s*)(\S+)"
)

def redact(line):
    return SECRET.sub(r"\1\2***", line)', 'Time: O(n) in the length of the line. Space: O(n) for the redacted copy.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (29, 2, 8, '9. Assert an API response contains an expected subset', 'Write `matches_subset(actual, expected)` that returns True when every key in `expected` is present in `actual` with an equal value, recursively, while extra keys in `actual` are allowed.', 'Recurse when both sides are dicts, compare directly otherwise. This is exactly how a partial-match assertion in an API test framework works.', 'def matches_subset(actual, expected):
    if isinstance(expected, dict):
        if not isinstance(actual, dict):
            return False
        return all(
            key in actual and matches_subset(actual[key], value)
            for key, value in expected.items()
        )
    return actual == expected', 'Time: O(e) in the size of the expected subset. Space: O(d) recursion depth.');