import { readActions, type AdminFailure, type Customer } from '../../lib/adminApi';

export interface CustomerCopy {
  daysAgo: (days: number) => string;
  signedIn: string;
  neverSignedIn: string;
  recommend: string;
  asking: string;
  failed: Record<AdminFailure, string>;
  priority: Record<'high' | 'medium' | 'low', string>;
}

export interface CustomerCardProps {
  customer: Customer;
  copy: CustomerCopy;
  recommendation?: string;
  failure?: AdminFailure;
  asking: boolean;
  onRecommend: () => void;
}

function money(amount: number, currency: string): string {
  return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
}

/** One purchase, and the advice for it. Presentation only. */
export function CustomerCard({
  customer,
  copy,
  recommendation,
  failure,
  asking,
  onRecommend,
}: CustomerCardProps) {
  const actions = recommendation ? readActions(recommendation) : null;

  return (
    <div className="card admin-customer">
      <h4 className="admin-customer-email" title={customer.email}>
        {customer.email}
      </h4>
      <p className="admin-customer-facts">
        <span>{copy.daysAgo(customer.daysSincePurchase)}</span>
        <span aria-hidden="true"> · </span>
        <span>{money(customer.amountTotal, customer.currency)}</span>
      </p>
      <p>
        <span className={`badge ${customer.linkedAccount ? 'admin-linked' : 'admin-unlinked'}`}>
          {customer.linkedAccount ? copy.signedIn : copy.neverSignedIn}
        </span>
      </p>

      <button
        type="button"
        className="ghost admin-recommend"
        disabled={asking}
        onClick={onRecommend}
      >
        {asking ? copy.asking : copy.recommend}
      </button>

      {failure && (
        <p className="error" role="alert">
          {copy.failed[failure]}
        </p>
      )}

      {actions && (
        <ol className="admin-actions">
          {actions.map((action, index) => (
            <li key={index}>
              <span className={`badge admin-priority-${action.priority}`}>
                {copy.priority[action.priority] ?? action.priority}
              </span>{' '}
              <b>{action.action}</b>
              <span className="admin-why">{action.why}</span>
            </li>
          ))}
        </ol>
      )}

      {/* A model asked for JSON does not always return it. Rather than drop the
          answer or render half of it, show it as the text it turned out to be. */}
      {recommendation && !actions && <pre className="admin-raw">{recommendation}</pre>}
    </div>
  );
}
