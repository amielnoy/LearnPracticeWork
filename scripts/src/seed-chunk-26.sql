insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (44, 4, 3, '4. ספירת תוצאות בדיקה לפי סטטוס', 'בהינתן רשימת מילוני תוצאה בסגנון `{"name": ..., "status": "passed"}`, החזירו כמה תוצאות יש לכל סטטוס.', 'מספיק מעבר אחד ומילון מונים. collections.Counter עושה את ניהול הספירה במקומכם.', 'from collections import Counter

def count_by_status(results):
    return Counter(r["status"] for r in results)', 'זמן: O(n). מקום: O(k), כאשר k = מספר הסטטוסים השונים.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (45, 4, 4, '5. מציאת N הבדיקות האיטיות ביותר', 'בהינתן רשימת מילוני בדיקה עם שדה `duration`, החזירו את n האיטיות ביותר, מהאיטית ביותר ומטה.', 'מיון הרשימה כולה הוא O(m log m) כשצריך רק n פריטים. heapq.nlargest מחזיק ערימה בגודל n בלבד.', 'import heapq

def slowest(tests, n):
    return heapq.nlargest(n, tests, key=lambda t: t["duration"])', 'זמן: O(m log n) עבור m בדיקות. מקום: O(n) לערימה ולתוצאה.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (46, 4, 5, '6. קיבוץ בדיקות לפי תגית', 'בהינתן רשימת מילוני בדיקה בסגנון `{"name": ..., "tags": ["smoke", "api"]}`, החזירו מילון הממפה כל תגית לרשימת שמות הבדיקות שנושאות אותה.', 'מילון רגיל מחייב בדיקה של "האם המפתח כבר קיים?" בכל הוספה. collections.defaultdict(list) יוצר עבורכם את הרשימה הריקה בגישה הראשונה.', 'from collections import defaultdict

def group_by_tag(tests):
    groups = defaultdict(list)
    for test in tests:
        for tag in test.get("tags", ()):
            groups[tag].append(test["name"])
    return dict(groups)', 'זמן: O(n*t) עבור n בדיקות עם t תגיות כל אחת. מקום: O(n*t) לפלט המקובץ.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (47, 4, 6, '7. חלוקת מזהי בדיקות לאצוות', 'חלקו רשימה שטוחה של מזהי בדיקות לאצוות רצופות בגודל `size` לכל היותר, כך שכל אצווה תוכל להימסר ל-runner נפרד ב-CI.', 'חיתוך בקפיצות: range(0, len(ids), size) נותן את נקודת ההתחלה של כל אצווה, וחיתוך שחורג מסוף הרשימה פשוט מחזיר רשימה קצרה יותר — אין צורך בטיפול מיוחד בשארית.', 'def chunk(ids, size):
    if size <= 0:
        raise ValueError("size must be positive")
    return [ids[i:i + size] for i in range(0, len(ids), size)]', 'זמן: O(n). מקום: O(n) לאצוות.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (48, 4, 7, '8. פענוח מחרוזת משך זמן לשניות', 'דוחות בדיקה מדפיסים משכי זמן כמחרוזות בסגנון `"1h 2m 30s"`, `"90s"` או `"2m"`. המירו מחרוזת כזו למספר השניות הכולל.', 'פצלו לפי רווחים וקראו כל אסימון כמספר בתוספת אות יחידה. מילון יחידות לפי אות הסיומת הופך את כל הפתרון לכפל וחיבור אחד.', 'UNITS = {"h": 3600, "m": 60, "s": 1}

def parse_duration(text):
    total = 0
    for token in text.split():
        unit = token[-1]
        if unit not in UNITS:
            raise ValueError(f"Unknown unit in {token!r}")
        total += float(token[:-1]) * UNITS[unit]
    return total', 'זמן: O(n) באורך המחרוזת. מקום: O(n) לאסימונים שנוצרו בפיצול.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (49, 4, 8, '9. השוואת שני מילוני קונפיגורציה', 'השוו קונפיגורציית בסיס מול חדשה, ודווחו אילו מפתחות נוספו, אילו הוסרו ואילו שינו ערך.', 'התייחסו לשתי קבוצות המפתחות כאל sets: new - old הם שנוספו, old - new הם שהוסרו, ולחיתוך נותרה רק השוואת ערכים.', 'def diff_config(old, new):
    old_keys, new_keys = set(old), set(new)
    return {
        "added": sorted(new_keys - old_keys),
        "removed": sorted(old_keys - new_keys),
        "changed": sorted(
            k for k in old_keys & new_keys if old[k] != new[k]
        ),
    }', 'זמן: O(n + m) לשתי הקונפיגורציות. מקום: O(n + m) לקבוצות המפתחות.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (50, 4, 9, '10. אילו בדיקות רצו אתמול אך לא היום?', 'בהינתן רשימת שמות הבדיקות המסודרת מהרצה A ומהרצה B, החזירו את השמות שקיימים ב-A וחסרים ב-B, תוך שמירה על הסדר שלהם ב-A.', 'בנו set מ-B תחילה כדי שכל בדיקת הכלה תהיה O(1), ואז סננו את A לפי הסדר. שימוש ברשימה רגילה לחיפוש הופך את הפתרון בשקט ל-O(n*m).', 'def missing_from(run_a, run_b):
    present = set(run_b)
    return [name for name in run_a if name not in present]', 'זמן: O(n + m). מקום: O(m) לקבוצת החיפוש, ובמקרה הגרוע עוד O(n) לפלט.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (51, 4, 10, '11. מציאת שם הבדיקה הארוך ביותר', 'בהינתן רשימת שמות בדיקות, החזירו את הארוך ביותר. אם כמה שווים באורכם, החזירו את הראשון שמופיע.', 'ל-max() אפשר להעביר פונקציית key, ולכן max(names, key=len) עושה את כל הסריקה עבורכם — והיא ממילא מחזירה את הראשון מבין השווים. טפלו ברשימה ריקה במפורש.', 'def longest_name(names):
    if not names:
        return None
    return max(names, key=len)', 'זמן: O(n) על השמות. מקום: O(1).');