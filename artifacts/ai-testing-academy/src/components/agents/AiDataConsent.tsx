import { useLocale } from '../../context/LocaleContext';

interface AiDataConsentProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function AiDataConsent({ id, checked, onChange }: AiDataConsentProps) {
  const { lang } = useLocale();
  const he = lang === 'he';

  return (
    <div className="data-consent">
      <p>
        {he
          ? 'קורות החיים, תיאור המשרה או תשובות הראיון יישלחו לספק ה‑AI שנבחר (Groq דרך שרת האקדמיה, או OpenAI/Anthropic ישירות בעת שימוש במפתח פרטי). אין להזין מספרי זהות, מידע רפואי או מידע סודי. הטיוטה נשמרת רק בסשן הדפדפן; זיהוי קולי מתבצע על ידי שירותי הדפדפן.'
          : 'Your resume, job description, or interview answers will be sent to the selected AI provider (Groq through the academy server, or OpenAI/Anthropic directly when you use your own key). Do not enter identity numbers, medical information, or confidential data. Drafts remain only for this browser session; voice recognition is handled by your browser services.'}{' '}
        <a href={`${import.meta.env.BASE_URL}privacy`}>
          {he ? 'מדיניות הפרטיות' : 'Privacy policy'}
        </a>
      </p>
      <label className="consent-check" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={event => onChange(event.target.checked)}
        />
        <span>
          {he
            ? 'קראתי ואני מסכים/ה לעיבוד ולהעברת המידע לצורך קבלת תוצאת ה‑AI. ניתן לבטל את ההסכמה לפני השליחה על ידי ביטול הסימון.'
            : 'I have read this notice and consent to processing and transfer for the AI result. I can withdraw before submission by clearing this box.'}
        </span>
      </label>
    </div>
  );
}
