import { useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';

export type LegalKind = 'privacy' | 'terms' | 'accessibility' | 'cancellation';

const CONTACT = 'amielnoy@gmail.com';

const EN = {
  privacy: {
    title: 'Privacy notice',
    intro: 'Effective 20 August 2026. AI Testing Academy is operated by Amiel Peled from Israel.',
    sections: [
      [
        'What we process',
        'Resume text, job descriptions, interview answers, account name and email when you sign in, purchase identifiers when sales are enabled, and basic security logs. Do not submit identity numbers, health information, financial account data, or third-party confidential information.',
      ],
      [
        'Purpose and legal basis',
        'Tool inputs are processed only to provide the result you request, based on your affirmative consent. Authentication maintains your session. Purchase records, if sales are enabled, are used to perform the contract, prevent fraud, and meet accounting duties.',
      ],
      [
        'AI providers and international transfers',
        'Default requests are proxied to Groq. When you use your own key, requests go directly from your browser to OpenAI or Anthropic. Search-grounded practice may use Google Gemini. These providers may process information outside Israel or India under applicable vendor safeguards.',
      ],
      [
        'Storage and retention',
        'Resume and interview drafts use sessionStorage and are removed when the browser session ends. We do not log prompts or model answers. Account cookies expire with the Google credential. Purchase records are retained only for entitlement, fraud prevention, and legally required accounting periods.',
      ],
      [
        'Your choices and rights',
        'Before an AI submission you can withhold or withdraw consent by leaving the consent box clear. You may request access, correction, deletion where legally available, restriction, or complain about our handling of your information.',
      ],
      [
        'Children',
        'The service is intended for adults aged 18 or older. We do not knowingly process children’s information or accept purchases from children.',
      ],
      [
        'Contact and complaints',
        `For privacy requests or grievances email ${CONTACT}. We acknowledge requests promptly and aim to resolve Indian consumer grievances within one month. You may also contact the competent Israeli Privacy Protection Authority or Indian Data Protection Board when applicable.`,
      ],
    ],
  },
  terms: {
    title: 'Terms of service',
    intro: 'Effective 20 August 2026. By using the free tools you agree to these terms.',
    sections: [
      [
        'Service',
        'The academy provides educational material and AI-assisted practice. AI output can be inaccurate and is not professional, employment, legal, tax, or financial advice. Review every output before relying on it.',
      ],
      [
        'Acceptable use',
        'Use only information you are entitled to submit. Do not abuse the service, bypass quotas, probe other users’ data, upload malicious files, or use generated material unlawfully.',
      ],
      [
        'Purchases',
        'Paid course sales are currently disabled. They can be enabled only after checkout displays the seller identity and address, exact course, access date, total tax-inclusive price and currency, refund rules, and an affirmative terms control. A redirect is never proof of payment; access follows a verified Stripe event.',
      ],
      [
        'Intellectual property',
        'Academy material remains the operator’s property unless identified otherwise. You may use downloaded personal results for your own career development.',
      ],
      [
        'Availability and responsibility',
        'Integrations may be suspended for security, maintenance, provider outages, or misuse. Nothing here excludes rights or remedies that cannot lawfully be excluded in Israel, India, or your place of residence.',
      ],
      [
        'Operator and contact',
        `Operator: Amiel Peled, Israel. Email: ${CONTACT}. A postal business address and applicable tax registration must be displayed in checkout before paid sales can be enabled.`,
      ],
    ],
  },
  accessibility: {
    title: 'Accessibility statement',
    intro: 'We aim for WCAG 2.2 Level AA and Israeli Standard 5568 conformance.',
    sections: [
      [
        'Measures taken',
        'The site supports keyboard navigation, visible focus, skip navigation, semantic landmarks, reduced motion, responsive zoom, Hebrew RTL, text alternatives, labelled fields, status announcements, and large touch targets.',
      ],
      [
        'Known limitations',
        'Third-party Google sign-in, embedded video, provider responses, and generated PDFs may have limitations outside our direct control. We test the core experience in desktop and mobile Chromium and maintain automated component and journey coverage.',
      ],
      [
        'Help and feedback',
        `If a feature is difficult to use, email ${CONTACT} with the page, device, browser, and assistance needed. We will provide an accessible alternative and investigate.`,
      ],
    ],
  },
  cancellation: {
    title: 'Cancellation and refund policy',
    intro: 'Paid course sales are currently disabled.',
    sections: [
      [
        'Before sales open',
        'Checkout must show the complete offer, total price and currency, tax treatment, service start, seller details, and locally applicable cancellation rights before payment. Consent must be explicit and must not use preselected boxes.',
      ],
      [
        'Cancellation channel',
        `When sales are enabled, customers will be able to cancel online and by email to ${CONTACT}. Requests will receive a durable acknowledgement. No cancellation fee will be charged unless applicable law expressly permits it.`,
      ],
      [
        'Refund timing',
        'Approved refunds will be returned through the original payment method without unreasonable delay. Mandatory Israeli and Indian consumer rights override any less favourable term.',
      ],
    ],
  },
  back: 'Back to the academy',
};

const HE: typeof EN = {
  privacy: {
    title: 'מדיניות פרטיות',
    intro: 'בתוקף מ־20 באוגוסט 2026. AI Testing Academy מופעלת על ידי עמיאל פלד מישראל.',
    sections: [
      [
        'איזה מידע מעובד',
        'טקסט קורות חיים, תיאורי משרה, תשובות לראיון, שם ודוא״ל בעת התחברות, מזהי רכישה אם המכירה תופעל, ויומני אבטחה בסיסיים. אין למסור מספרי זהות, מידע רפואי, פרטי חשבון פיננסי או מידע סודי של צד שלישי.',
      ],
      [
        'מטרה ובסיס',
        'קלט לכלי AI מעובד רק כדי לספק את התוצאה שביקשת, על בסיס הסכמה מפורשת. ההתחברות משמשת לניהול הסשן. רישומי רכישה, אם המכירה תופעל, ישמשו לקיום העסקה, מניעת הונאה וחובות חשבונאיות.',
      ],
      [
        'ספקי AI והעברה לחו״ל',
        'בקשות ברירת המחדל מועברות ל‑Groq דרך שרת האקדמיה. בשימוש במפתח פרטי, הבקשה נשלחת ישירות מהדפדפן ל‑OpenAI או Anthropic. חיפוש מועשר עשוי להשתמש ב‑Google Gemini. ספקים אלה עשויים לעבד מידע מחוץ לישראל או להודו בכפוף להגנות המתאימות.',
      ],
      [
        'שמירה',
        'טיוטות קורות חיים וראיונות נשמרות ב‑sessionStorage ונמחקות בסיום סשן הדפדפן. איננו רושמים prompts או תשובות מודל. עוגיית החשבון פגה יחד עם הרשאת Google. רישומי רכישה נשמרים רק לזכאות, מניעת הונאה והתקופות החשבונאיות הנדרשות.',
      ],
      [
        'הבחירות והזכויות שלך',
        'לפני שליחה ל‑AI אפשר לא להסכים או לבטל הסכמה באמצעות ביטול הסימון. ניתן לבקש עיון, תיקון, מחיקה כאשר הדין מאפשר, הגבלה או להגיש תלונה.',
      ],
      [
        'קטינים',
        'השירות מיועד לבני ובנות 18 ומעלה. איננו אוספים ביודעין מידע של ילדים ואיננו מקבלים רכישות מקטינים.',
      ],
      [
        'יצירת קשר ותלונות',
        `לבקשות פרטיות או תלונות: ${CONTACT}. נאשר קבלת פנייה במהירות ונטפל בה בהתאם לדין. ניתן גם לפנות לרשות להגנת הפרטיות בישראל או לגורם המוסמך בהודו.`,
      ],
    ],
  },
  terms: {
    title: 'תנאי שימוש',
    intro: 'בתוקף מ־20 באוגוסט 2026. השימוש בכלים החינמיים כפוף לתנאים אלה.',
    sections: [
      [
        'השירות',
        'האקדמיה מספקת חומרי לימוד ותרגול בסיוע AI. תוצרי AI עלולים להיות שגויים ואינם ייעוץ מקצועי, תעסוקתי, משפטי, מיסויי או פיננסי. יש לבדוק כל תוצר לפני שימוש.',
      ],
      [
        'שימוש מותר',
        'יש למסור רק מידע שמותר לך להעביר. אין לעקוף מכסות, לנסות לגשת למידע של אחרים, להעלות קבצים זדוניים או להשתמש בתוצרים בניגוד לדין.',
      ],
      [
        'רכישות',
        'מכירת קורסים בתשלום מושבתת כעת. ניתן להפעילה רק לאחר שהקופה תציג את זהות וכתובת העוסק, פרטי הקורס, מועד הגישה, המחיר הכולל כולל מס ובמטבע הנכון, תנאי ביטול ובקרת הסכמה מפורשת. זכאות ניתנת רק לאחר אירוע Stripe מאומת.',
      ],
      [
        'קניין רוחני',
        'חומרי האקדמיה נשארים בבעלות המפעיל אלא אם צוין אחרת. ניתן להשתמש בתוצאות האישיות לצורך פיתוח הקריירה האישית.',
      ],
      [
        'זמינות ואחריות',
        'ניתן להשעות אינטגרציות לצורכי אבטחה, תחזוקה, תקלה אצל ספק או שימוש לרעה. אין בתנאים כדי לגרוע מזכויות שלא ניתן לוותר עליהן לפי דין.',
      ],
      [
        'מפעיל ויצירת קשר',
        `מפעיל: עמיאל פלד, ישראל. דוא״ל: ${CONTACT}. כתובת עסק ומספרי מס רלוונטיים חייבים להופיע בקופה לפני הפעלת מכירה.`,
      ],
    ],
  },
  accessibility: {
    title: 'הצהרת נגישות',
    intro: 'מטרתנו לעמוד ב‑WCAG 2.2 ברמה AA ובתקן הישראלי 5568.',
    sections: [
      [
        'התאמות שבוצעו',
        'האתר תומך בניווט מקלדת, חיווי מיקוד, קישור דילוג, מבנה סמנטי, הפחתת תנועה, הגדלה רספונסיבית, עברית RTL, חלופות טקסט, שדות מסומנים, הודעות מצב ויעדי מגע גדולים.',
      ],
      [
        'מגבלות ידועות',
        'תוכן צד שלישי כגון התחברות Google, וידאו מוטמע, תשובות ספקים וקובצי PDF שנוצרו עשוי לכלול מגבלות שאינן בשליטתנו הישירה. חוויית הליבה נבדקת ב‑Chromium במחשב ובמובייל ובבדיקות אוטומטיות.',
      ],
      [
        'עזרה ומשוב',
        `אם קשה להשתמש בתכונה כלשהי, כתבו ל־${CONTACT} וציינו עמוד, מכשיר, דפדפן והסיוע הנדרש. נספק חלופה נגישה ונבדוק את התקלה.`,
      ],
    ],
  },
  cancellation: {
    title: 'מדיניות ביטול והחזר',
    intro: 'מכירת קורסים בתשלום מושבתת כעת.',
    sections: [
      [
        'לפני פתיחת המכירה',
        'הקופה חייבת להציג את פרטי ההצעה, המחיר הכולל והמטבע, הטיפול במס, מועד תחילת השירות, פרטי המוכר וזכויות הביטול החלות לפני התשלום. ההסכמה תהיה מפורשת וללא תיבות מסומנות מראש.',
      ],
      [
        'ערוץ ביטול',
        `לאחר הפעלת מכירה ניתן יהיה לבטל אונליין ובדוא״ל ${CONTACT}, ויישלח אישור קבלה שניתן לשמור. לא ייגבו דמי ביטול אלא אם הדין מאפשר זאת במפורש.`,
      ],
      [
        'מועד החזר',
        'החזר מאושר יועבר לאמצעי התשלום המקורי ללא עיכוב בלתי סביר. זכויות צרכן מחייבות בישראל ובהודו גוברות על כל תנאי פחות מיטיב.',
      ],
    ],
  },
  back: 'חזרה לאקדמיה',
};

export function LegalPage({ kind }: { kind: LegalKind }) {
  const { lang } = useLocale();
  const copy = lang === 'he' ? HE : EN;
  const page = copy[kind];

  useEffect(() => {
    document.body.classList.add('legal-route');
    return () => document.body.classList.remove('legal-route');
  }, []);

  return (
    <main className="legal-page" id="main-content">
      <a className="legal-back" href={import.meta.env.BASE_URL}>
        ← {copy.back}
      </a>
      <article>
        <h1>{page.title}</h1>
        <p className="lead">{page.intro}</p>
        {page.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{body}</p>
          </section>
        ))}
        <p>
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
        </p>
      </article>
    </main>
  );
}
