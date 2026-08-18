insert into lecture_items (id, track_id, position, num, ready, title, description, url) values (38, 4, 7, 8, false, 'אבטחת מערכות ה-AI עצמן', 'הצד השני של המטבע — הגנה על מערכות ה-AI שלכם מפני prompt injection, גניבת מודלים, הרעלת נתונים וסיכוני שרשרת אספקה.', null);
insert into lecture_items (id, track_id, position, num, ready, title, description, url) values (39, 4, 8, 9, false, 'תגובה לאירועי אבטחה בסיוע AI', 'שימוש בעוזרי AI כדי להאיץ טריאז'', ניתוח שורש הבעיה ודיווח במהלך אירוע אבטחה חי.', null);
insert into lecture_items (id, track_id, position, num, ready, title, description, url) values (40, 4, 9, 10, false, 'בניית אסטרטגיית AI לאבטחת מידע', 'הכל ביחד — מפת דרכים מעשית לאימוץ AI על פני זיהוי, תגובה ומניעה בתוכנית האבטחה שלכם.', null);
select setval('question_bank_stages_id_seq', 10);
select setval('question_bank_items_id_seq', 150);
select setval('coding_challenge_levels_id_seq', 6);
select setval('coding_challenges_id_seq', 80);
select setval('lecture_tracks_id_seq', 4);