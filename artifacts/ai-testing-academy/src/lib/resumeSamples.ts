/** The worked example the "try it" link loads, so a reader can see a result without a file. */
export interface SampleResume {
  role: string;
  text: string;
}

const SAMPLES: Record<'en' | 'he', SampleResume> = {
  en: {
    role: 'QA Automation Engineer',
    text: `Alex Morgan\nQA Engineer\nalex@example.com\n\nSUMMARY\nQA engineer with three years of experience testing web applications.\n\nEXPERIENCE\nQA Engineer — Example Software\n- Executed regression and smoke testing for weekly releases.\n- Wrote Selenium tests in Python and maintained CI jobs.\n- Reported defects and worked with developers to verify fixes.\n\nSKILLS\nPython, Selenium, REST APIs, Git, Jenkins, SQL`,
  },
  he: {
    role: 'מהנדס/ת אוטומציה QA',
    text: `אלכס מורגן\nמהנדס/ת QA\nalex@example.com\n\nתקציר\nמהנדס/ת בדיקות עם שלוש שנות ניסיון בבדיקת יישומי Web.\n\nניסיון\nמהנדס/ת QA — Example Software\n- ביצוע בדיקות רגרסיה ו-Smoke לגרסאות שבועיות.\n- כתיבת בדיקות Selenium ב-Python ותחזוקת תהליכי CI.\n- דיווח תקלות ועבודה עם מפתחים לאימות תיקונים.\n\nמיומנויות\nPython, Selenium, REST APIs, Git, Jenkins, SQL`,
  },
};

export function sampleResumeFor(lang: string): SampleResume {
  return SAMPLES[lang === 'he' ? 'he' : 'en'];
}
