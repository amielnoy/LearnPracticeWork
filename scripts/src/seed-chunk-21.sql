insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (7, 1, 6, '7. Chunk test IDs into batches', 'Split a flat list of test IDs into consecutive batches of at most `size` items, so each batch can be handed to a separate CI runner.', 'Slice with a stride: range(0, len(ids), size) gives you every batch start, and a slice past the end simply returns a shorter list — no special case for the remainder.', 'def chunk(ids, size):
    if size <= 0:
        raise ValueError("size must be positive")
    return [ids[i:i + size] for i in range(0, len(ids), size)]', 'Time: O(n). Space: O(n) for the batches.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (8, 1, 7, '8. Parse a duration string into seconds', 'Test reports print durations as strings like `"1h 2m 30s"`, `"90s"` or `"2m"`. Convert one into a total number of seconds.', 'Split on whitespace and read each token as a number plus a unit suffix. A units dict keyed by the suffix letter turns the whole thing into one multiply-and-add.', 'UNITS = {"h": 3600, "m": 60, "s": 1}

def parse_duration(text):
    total = 0
    for token in text.split():
        unit = token[-1]
        if unit not in UNITS:
            raise ValueError(f"Unknown unit in {token!r}")
        total += float(token[:-1]) * UNITS[unit]
    return total', 'Time: O(n) in the length of the string. Space: O(n) for the split tokens.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (9, 1, 8, '9. Diff two config dicts', 'Compare a baseline config against a new one and report which keys were added, which were removed, and which changed value.', 'Treat the two key sets as sets: new - old is added, old - new is removed, and the intersection only needs a value comparison.', 'def diff_config(old, new):
    old_keys, new_keys = set(old), set(new)
    return {
        "added": sorted(new_keys - old_keys),
        "removed": sorted(old_keys - new_keys),
        "changed": sorted(
            k for k in old_keys & new_keys if old[k] != new[k]
        ),
    }', 'Time: O(n + m) for the two configs. Space: O(n + m) for the key sets.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (10, 1, 9, '10. Which tests ran yesterday but not today?', 'Given the ordered list of test names from run A and from run B, return the names present in A but missing from B, keeping the order they had in A.', 'Build a set from B first so each membership check is O(1), then filter A in order. Using a plain list for the lookup silently makes this O(n*m).', 'def missing_from(run_a, run_b):
    present = set(run_b)
    return [name for name in run_a if name not in present]', 'Time: O(n + m). Space: O(m) for the lookup set, plus O(n) worst case for the output.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (11, 1, 10, '11. Find the longest test name', 'Given a list of test names, return the longest one. If several tie, return the one that appears first.', 'max() takes a key function, so max(names, key=len) does the whole scan for you — and it already returns the first of any tie. Handle the empty list explicitly.', 'def longest_name(names):
    if not names:
        return None
    return max(names, key=len)', 'Time: O(n) over the names. Space: O(1).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (12, 1, 11, '12. Total and average suite duration', 'Given a list of test dicts with a `duration` field, return the total runtime and the average runtime of the suite.', 'sum() over a generator avoids building an intermediate list. The only trap is dividing by zero when the suite is empty — decide what an empty suite should report before you divide.', 'def suite_timing(tests):
    total = sum(t["duration"] for t in tests)
    average = total / len(tests) if tests else 0.0
    return total, average', 'Time: O(n). Space: O(1) — the generator holds one value at a time.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (13, 1, 12, '13. Compute the pass rate', 'Given a list of result dicts with a `status` field, return the percentage that passed, rounded to one decimal place.', 'A boolean is an int in Python, so sum(r["status"] == "passed" for r in results) counts matches directly. Guard the empty case before dividing.', 'def pass_rate(results):
    if not results:
        return 0.0
    passed = sum(r["status"] == "passed" for r in results)
    return round(passed / len(results) * 100, 1)', 'Time: O(n). Space: O(1).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (14, 1, 13, '14. Turn a test title into a valid identifier', 'Convert a human title like `"Login  with VALID user!"` into a snake_case test function name: `login_with_valid_user`.', 'Lowercase, then replace every run of non-alphanumeric characters with a single underscore, then trim the underscores off the ends. One regex substitution handles the runs.', 'import re

def slugify(title):
    slug = re.sub(r"[^a-z0-9]+", "_", title.lower())
    return slug.strip("_")', 'Time: O(n) in the length of the title. Space: O(n) for the new string.');