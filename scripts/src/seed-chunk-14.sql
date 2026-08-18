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
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (52, 4, 11, '12. משך הרצה כולל וממוצע של הסוויטה', 'בהינתן רשימת מילוני בדיקה עם שדה `duration`, החזירו את זמן ההרצה הכולל ואת הזמן הממוצע של הסוויטה.', 'שימוש ב-sum() על גנרטור חוסך בניית רשימת ביניים. המלכודת היחידה היא חלוקה באפס כשהסוויטה ריקה — החליטו מה סוויטה ריקה מחזירה לפני שאתם מחלקים.', 'def suite_timing(tests):
    total = sum(t["duration"] for t in tests)
    average = total / len(tests) if tests else 0.0
    return total, average', 'זמן: O(n). מקום: O(1) — הגנרטור מחזיק ערך אחד בכל רגע.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (53, 4, 12, '13. חישוב אחוז ההצלחה', 'בהינתן רשימת מילוני תוצאה עם שדה `status`, החזירו את אחוז הבדיקות שעברו, מעוגל לספרה אחת אחרי הנקודה.', 'בפייתון בוליאני הוא int, ולכן sum(r["status"] == "passed" for r in results) סופר התאמות ישירות. הגנו על המקרה הריק לפני החלוקה.', 'def pass_rate(results):
    if not results:
        return 0.0
    passed = sum(r["status"] == "passed" for r in results)
    return round(passed / len(results) * 100, 1)', 'זמן: O(n). מקום: O(1).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (54, 4, 13, '14. הפיכת כותרת בדיקה למזהה תקין', 'המירו כותרת אנושית כמו `"Login  with VALID user!"` לשם פונקציית בדיקה ב-snake_case: `login_with_valid_user`.', 'הורידו לאותיות קטנות, החליפו כל רצף של תווים שאינם אלפאנומריים בקו תחתון יחיד, ואז קצצו קווים תחתונים מהקצוות. החלפה רגולרית אחת מטפלת ברצפים.', 'import re

def slugify(title):
    slug = re.sub(r"[^a-z0-9]+", "_", title.lower())
    return slug.strip("_")', 'זמן: O(n) באורך הכותרת. מקום: O(n) למחרוזת החדשה.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (55, 4, 14, '15. איחוד שמות וסטטוסים למילון', 'דוח ישן מספק לכם את שמות הבדיקות ואת הסטטוסים שלהן כשתי רשימות מקבילות. בנו מילון יחיד הממפה כל שם לסטטוס שלו.', 'dict(zip(names, statuses)) היא שורת הקוד האידיומטית. שימו לב ש-zip עוצר ברשימה הקצרה, ולכן בדקו אורכים תחילה אם אי-התאמה היא שגיאה אמיתית.', 'def to_report(names, statuses):
    if len(names) != len(statuses):
        raise ValueError("Mismatched report columns")
    return dict(zip(names, statuses))', 'זמן: O(n). מקום: O(n) למילון התוצאה.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (56, 4, 15, '16. בדיקות שנכשלו בכל ההרצות', 'בהינתן כמה הרצות, כל אחת רשימת שמות הבדיקות שנכשלו בה, החזירו את השמות שנכשלו בכל הרצה ללא יוצא מן הכלל — השבורות באופן עקבי.', 'זהו חיתוך קבוצות. set.intersection(*rest) מקפל את כולן יחד, ולקלט ריק דרושה תשובה משלו.', 'def always_failing(runs):
    if not runs:
        return set()
    first, *rest = (set(run) for run in runs)
    return first.intersection(*rest)', 'זמן: O(סך השמות בכל ההרצות). מקום: O(גודל ההרצה הקטנה ביותר).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (57, 4, 16, '17. מיון בדיקות לפי סטטוס ואז לפי משך', 'סדרו רשימת מילוני בדיקה כך שהכישלונות יופיעו ראשונים, ובתוך כל סטטוס הבדיקות האיטיות ביותר יופיעו ראשונות.', 'החזירו tuple מפונקציית ה-key: פייתון משווה tuples איבר-איבר. שלילת המשך הופכת רק את השדה הזה לסדר יורד, בלי מיון שני.', 'def triage_order(tests):
    return sorted(
        tests,
        key=lambda t: (t["status"] != "failed", -t["duration"]),
    )', 'זמן: O(n log n). מקום: O(n) לעותק הממוין.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (58, 4, 17, '18. סינון פרמטרי שאילתה ריקים', 'לפני שליחת בקשה, הסירו ממילון הפרמטרים כל מפתח שערכו None או מחרוזת ריקה, כדי שה-URL יישאר נקי.', 'הבנת מילון בונה את המילון מחדש במעבר אחד. השוו ל-None במפורש — `if value` היה משליך גם 0 ו-False, שהם ערכים לגיטימיים.', 'def clean_params(params):
    return {
        k: v for k, v in params.items()
        if v is not None and v != ""
    }', 'זמן: O(n). מקום: O(n) למילון המסונן.');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (59, 4, 18, '19. איתור חורים ברצף מספור הבדיקות', 'מקרי הבדיקה ממוספרים 1..n. בהינתן המספרים שאכן רצו, החזירו את החסרים בסדר עולה.', 'בנו את הטווח המלא הצפוי כ-set והחסירו את מה שרץ. מיון ההפרש בסוף זול יותר מסריקת הרשימה מחדש עבור כל מועמד.', 'def missing_ids(ran, n):
    return sorted(set(range(1, n + 1)) - set(ran))', 'זמן: O(n + m) ועוד O(k log k) למיון k המזהים החסרים. מקום: O(n).');
insert into coding_challenges (id, level_id, position, title, prompt, hint, code, complexity) values (60, 4, 19, '20. חיפוש בשמות בדיקות ללא תלות ברישיות', 'החזירו כל שם בדיקה שמכיל מונח חיפוש נתון, בהתעלם מהבדלי אותיות גדולות וקטנות.', 'הורידו את מונח החיפוש לאותיות קטנות פעם אחת מחוץ ללולאה במקום בכל השוואה, ואז בדקו `term in name.lower()`.', 'def search(names, term):
    needle = term.lower()
    return [name for name in names if needle in name.lower()]', 'זמן: O(n*L) עבור n שמות באורך ממוצע L. מקום: O(n) במקרה הגרוע להתאמות.');