import { useEffect, useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useAdminCustomers } from '../hooks/useAdminCustomers';
import { CustomerCard, type CustomerCopy } from '../components/admin/CustomerCard';
import type { AdminFailure } from '../lib/adminApi';

/**
 * The operator's view of who bought the course, and what to do next about each.
 *
 * Its own copy rather than the shared locale table, which is what LegalPage
 * does too: these strings are read by one person and have no business widening
 * the contract every visitor-facing component is typed against.
 *
 * The token is a server secret. It is typed in, kept in `sessionStorage`, and
 * never written to `localStorage` — the same rule the site applies to a
 * visitor's own provider key.
 */
interface AdminCopy {
  title: string;
  lead: string;
  back: string;
  tokenLabel: string;
  tokenHint: string;
  connect: string;
  disconnect: string;
  loading: string;
  empty: string;
  privacy: string;
  errors: Record<AdminFailure, string>;
  customer: CustomerCopy;
}

const EN: AdminCopy = {
  title: 'Customers',
  lead: 'Recorded course purchases, newest first, with a suggested next action for each.',
  back: 'Back to the academy',
  tokenLabel: 'Admin token',
  tokenHint: 'Kept for this tab only, never saved to the device.',
  connect: 'Connect',
  disconnect: 'Forget token',
  loading: 'Loading customers…',
  empty: 'No purchases recorded yet.',
  privacy:
    'Recommendations are generated from elapsed time and account state only. No email or other identifier is sent to the AI provider.',
  errors: {
    unauthorised: 'That token was refused, or this server has no admin token configured.',
    unavailable: 'The server is busy or unavailable. Try again in a moment.',
    failed: 'Could not load customers.',
  },
  customer: {
    daysAgo: days => (days === 0 ? 'Bought today' : `Bought ${days} days ago`),
    signedIn: 'Signed in',
    neverSignedIn: 'Never signed in',
    recommend: '✨ Suggest actions',
    asking: 'Thinking…',
    failed: {
      unauthorised: 'The token was refused.',
      unavailable: 'The AI service is busy. Try again in a moment.',
      failed: 'Could not generate recommendations.',
    },
    priority: { high: 'High', medium: 'Medium', low: 'Low' },
  },
};

const HE: AdminCopy = {
  title: 'לקוחות',
  lead: 'רכישות קורס שנרשמו, מהחדשה לישנה, עם פעולה מומלצת לכל אחת.',
  back: 'חזרה לאקדמיה',
  tokenLabel: 'טוקן ניהול',
  tokenHint: 'נשמר לכרטיסייה הזו בלבד, לעולם לא למכשיר.',
  connect: 'התחברות',
  disconnect: 'שכח טוקן',
  loading: 'טוען לקוחות…',
  empty: 'עדיין לא נרשמו רכישות.',
  privacy: 'ההמלצות נוצרות מזמן שחלף וממצב החשבון בלבד. שום אימייל או מזהה אחר לא נשלח לספק ה-AI.',
  errors: {
    unauthorised: 'הטוקן נדחה, או שלא הוגדר טוקן ניהול בשרת הזה.',
    unavailable: 'השרת עמוס או לא זמין. נסו שוב בעוד רגע.',
    failed: 'לא ניתן לטעון לקוחות.',
  },
  customer: {
    daysAgo: days => (days === 0 ? 'נרכש היום' : `נרכש לפני ${days} ימים`),
    signedIn: 'התחבר',
    neverSignedIn: 'מעולם לא התחבר',
    recommend: '✨ הצע פעולות',
    asking: 'חושב…',
    failed: {
      unauthorised: 'הטוקן נדחה.',
      unavailable: 'שירות ה-AI עמוס. נסו שוב בעוד רגע.',
      failed: 'לא ניתן ליצור המלצות.',
    },
    priority: { high: 'גבוהה', medium: 'בינונית', low: 'נמוכה' },
  },
};

export function AdminPage() {
  const { locale } = useLocale();
  const copy = locale.lang === 'he' ? HE : EN;
  const admin = useAdminCustomers(locale.lang);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    document.body.classList.add('legal-route');
    return () => document.body.classList.remove('legal-route');
  }, []);

  return (
    <main className="legal-page admin-page" id="main-content">
      <a className="legal-back" href={import.meta.env.BASE_URL}>
        ← {copy.back}
      </a>
      <h1>{copy.title}</h1>
      <p className="lead">{copy.lead}</p>

      {!admin.token ? (
        <div className="agent-box">
          <label htmlFor="adminToken">{copy.tokenLabel}</label>
          <input
            type="password"
            id="adminToken"
            autoComplete="off"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') admin.connect(draft);
            }}
          />
          <p className="notice">{copy.tokenHint}</p>
          <button type="button" className="primary" onClick={() => admin.connect(draft)}>
            {copy.connect}
          </button>
        </div>
      ) : (
        <>
          <p className="notice admin-privacy">{copy.privacy}</p>

          {admin.error && (
            <p className="error" role="alert">
              {copy.errors[admin.error]}
            </p>
          )}
          {admin.loading && <p className="lead">{copy.loading}</p>}
          {!admin.loading && !admin.error && admin.customers.length === 0 && (
            <p className="lead">{copy.empty}</p>
          )}

          <div className="admin-grid">
            {admin.customers.map(customer => (
              <CustomerCard
                key={customer.id}
                customer={customer}
                copy={copy.customer}
                recommendation={admin.recommendations[customer.id]}
                failure={admin.askedFailed[customer.id]}
                asking={admin.asking === customer.id}
                onRecommend={() => void admin.recommend(customer.id)}
              />
            ))}
          </div>

          <button type="button" className="ghost admin-disconnect" onClick={admin.disconnect}>
            {copy.disconnect}
          </button>
        </>
      )}
    </main>
  );
}
