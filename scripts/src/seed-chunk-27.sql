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