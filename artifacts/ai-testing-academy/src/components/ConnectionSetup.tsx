import { useRef, useEffect } from 'react';
import { useLocale } from '../context/LocaleContext';
import { useProviderContext } from '../context/ProviderContext';
import { PROVIDERS } from '../lib/providers';
import { useReveal } from '../hooks/useReveal';

export function ConnectionSetup() {
  const { locale, S } = useLocale();
  const t = locale.setup;
  const {
    provider,
    setProvider,
    model,
    setModel,
    apiKey,
    setApiKey,
    useOwnKey,
    setUseOwnKey,
    hasServerDefault,
    connStatus,
    connStatusColor,
    testConnection,
    resetSettings,
  } = useProviderContext();

  const sectionRef = useReveal();
  const prov = PROVIDERS[provider];
  const hasDefault = hasServerDefault(provider);

  // When useOwnKey is false and there's a default, set placeholder; when true, show real key label
  const keyLabel = useOwnKey
    ? (prov?.label(S) || S.keyLabelGemini)
    : (prov?.label(S) || S.keyLabelGemini).replace(S.labelSuffixLocal, S.labelSuffixEnv);
  const keyPlaceholder = useOwnKey ? (prov?.placeholder || '') : S.placeholderEnvKey;

  return (
    <section id="setup" ref={sectionRef}>
      <h2>
        <span className="num">{t.num}</span> {t.title}
      </h2>
      <p className="lead reveal">{t.lead}</p>
      <div className="agent-box reveal">
        <h3>{t.boxTitle}</h3>
        <div className="keybar">
          <div>
            <label htmlFor="providerSel">{t.providerLabel}</label>
            <select
              id="providerSel"
              value={provider}
              onChange={e => setProvider(e.target.value)}
            >
              {t.providers.map(p => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="modelSel">{t.modelLabel}</label>
            <select
              id="modelSel"
              value={model}
              onChange={e => setModel(e.target.value)}
            >
              {(prov?.models || []).map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div style={{ alignSelf: 'end' }}>
            <button
              type="button"
              className="primary"
              style={{ marginTop: 0 }}
              onClick={testConnection}
            >
              {t.testBtn}
            </button>
          </div>
        </div>
        <div id="ownKeyRow" style={{ marginTop: '14px', opacity: hasDefault ? 1 : 0.5 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: '0 0 10px' }}>
            <input
              type="checkbox"
              id="useOwnKey"
              style={{ width: 'auto', margin: 0 }}
              checked={useOwnKey}
              disabled={!hasDefault}
              onChange={e => setUseOwnKey(e.target.checked)}
            />
            {t.useOwnKeyLabel}
          </label>
          <label
            id="apiKeyLabel"
            htmlFor="apiKey"
            style={{ fontSize: '.85rem', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}
          >
            {keyLabel}
          </label>
          <input
            type="password"
            id="apiKey"
            autoComplete="off"
            style={{ fontFamily: 'monospace' }}
            placeholder={keyPlaceholder}
            value={apiKey}
            disabled={!useOwnKey}
            onChange={e => setApiKey(e.target.value)}
          />
        </div>
        <p
          id="connStatus"
          className="notice"
          aria-live="polite"
          style={{ minHeight: '1.4em', color: connStatusColor }}
        >
          {connStatus}
        </p>
        <button
          type="button"
          className="ghost"
          style={{ marginTop: '4px' }}
          onClick={resetSettings}
        >
          {t.resetBtn}
        </button>
        <p className="notice" style={{ marginTop: '8px' }}>
          {t.notice}
        </p>
      </div>
    </section>
  );
}
