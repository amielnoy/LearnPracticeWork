import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  PROVIDERS,
  loadServerConfig,
  callAI,
  callGeminiGrounded,
  extractJSON,
  type Message,
  type ServerDefaults,
} from '../lib/providers';
import { useLocale } from './LocaleContext';
import { readOneOf, readRaw, removeRaw, writeRaw } from '../lib/storage';

interface ProviderContextValue {
  provider: string;
  setProvider: (p: string) => void;
  model: string;
  setModel: (m: string) => void;
  apiKey: string;
  setApiKey: (k: string) => void;
  rememberKey: boolean;
  setRememberKey: (v: boolean) => void;
  useOwnKey: boolean;
  setUseOwnKey: (v: boolean) => void;
  ownKeyTouched: boolean;
  setOwnKeyTouched: (v: boolean) => void;
  serverDefaults: ServerDefaults;
  serverConfigLoaded: boolean;
  anonymousQuota: { limit: number; remaining: number | null } | null;
  quotaExhausted: boolean;
  hasServerDefault: (p: string) => boolean;
  connStatus: string;
  connStatusColor: string;
  setConnStatus: (s: string, color?: string) => void;
  testConnection: () => Promise<void>;
  resetSettings: () => void;
  callClaude: (system: string, messages: Message[], maxTokens?: number) => Promise<string>;
  callGrounded: (system: string, user: string, maxTokens?: number) => Promise<string>;
  extractJSON: (text: string) => unknown;
  ownGeminiKey: string;
}

const ProviderContext = createContext<ProviderContextValue | null>(null);

const PROVIDER_KEY_PREFIX = 'ata_key_';
const PROVIDER_SESSION_KEY_PREFIX = 'ata_session_key_';
const PROVIDER_REMEMBER_PREFIX = 'ata_remember_key_';
const PROVIDER_STORE_KEY = 'ata_provider';

/** The providers a stored preference is allowed to name. */
const PROVIDER_IDS = Object.keys(PROVIDERS);

/** An API key is a bounded string; anything longer did not come from a provider. */
const MAX_KEY_LENGTH = 512;

function loadStoredKey(provider: string): { key: string; remember: boolean } {
  const remember = readRaw(localStorage, PROVIDER_REMEMBER_PREFIX + provider) === 'true';
  let persistentKey = (readRaw(localStorage, PROVIDER_KEY_PREFIX + provider) ?? '').slice(
    0,
    MAX_KEY_LENGTH,
  );

  // One-time migration: keys saved by older versions become session-only and
  // are removed from persistent storage unless the user explicitly opts in.
  if (persistentKey && !remember) {
    writeRaw(sessionStorage, PROVIDER_SESSION_KEY_PREFIX + provider, persistentKey);
    removeRaw(localStorage, PROVIDER_KEY_PREFIX + provider);
    persistentKey = '';
  }

  return {
    remember,
    key: remember
      ? persistentKey
      : (readRaw(sessionStorage, PROVIDER_SESSION_KEY_PREFIX + provider) ?? '').slice(
          0,
          MAX_KEY_LENGTH,
        ),
  };
}

export function ProviderContextProvider({ children }: { children: React.ReactNode }) {
  const { S } = useLocale();

  // Checked against the providers that exist, which is also what retires an old
  // stored preference: Gemini is search-only now and not a selectable chat
  // provider, so a visitor holding one falls back to the current default.
  // `readOneOf` is the same guard the rest of the stored keys use.
  const [provider, setProviderState] = useState<string>(
    () => readOneOf(localStorage, PROVIDER_STORE_KEY, PROVIDER_IDS) ?? 'groq',
  );
  const [model, setModelState] = useState<string>(() => PROVIDERS['groq'].models[0]);
  const [apiKey, setApiKeyState] = useState<string>('');
  const [rememberKey, setRememberKeyState] = useState<boolean>(false);
  const [useOwnKey, setUseOwnKeyState] = useState<boolean>(false);
  const [ownKeyTouched, setOwnKeyTouchedState] = useState<boolean>(false);
  const [serverDefaults, setServerDefaults] = useState<ServerDefaults>({});
  const [serverConfigLoaded, setServerConfigLoaded] = useState(false);
  const [anonymousQuota, setAnonymousQuota] = useState<{
    limit: number;
    remaining: number | null;
  } | null>(null);
  const [connStatus, setConnStatusText] = useState<string>('');
  const [connStatusColor, setConnStatusColor] = useState<string>('var(--muted)');

  const setConnStatus = useCallback((s: string, color?: string) => {
    setConnStatusText(s);
    setConnStatusColor(color ?? 'var(--muted)');
  }, []);

  const hasServerDefault = useCallback(
    (p: string) => !!serverDefaults[p]?.available,
    [serverDefaults],
  );

  // Load server config on mount
  useEffect(() => {
    loadServerConfig()
      .then(defaults => {
        setServerDefaults(defaults);
        const limit = defaults.gemini?.anonymousDailyQuota;
        if (defaults.gemini?.available && limit) {
          // Config exposes the allowance, not this IP's current usage. Keep the
          // remainder unknown until a proxied response supplies its headers.
          setAnonymousQuota({ limit, remaining: null });
        }
      })
      .finally(() => setServerConfigLoaded(true));
  }, []);

  useEffect(() => {
    const updateQuota = (event: Event) => {
      const detail = (event as CustomEvent<{ limit: number; remaining: number }>).detail;
      if (detail && Number.isFinite(detail.limit) && Number.isFinite(detail.remaining)) {
        setAnonymousQuota(detail);
      }
    };
    window.addEventListener('ata:quota', updateQuota);
    return () => window.removeEventListener('ata:quota', updateQuota);
  }, []);

  // When provider changes, update model and key state
  const setProvider = useCallback((p: string) => {
    setProviderState(p);
    writeRaw(localStorage, PROVIDER_STORE_KEY, p);
    setOwnKeyTouchedState(false);
    const prov = PROVIDERS[p];
    setModelState(prov.models[0]);
  }, []);

  /**
   * Whether the visitor has taken the key mode into their own hands.
   *
   * Held in a ref as well as in state because the effect below has to *read* it
   * without *re-running* on it: it exists to re-evaluate the default when the
   * provider changes or the server config lands, and firing it because someone
   * just flipped the toggle would undo the flip. The `// eslint-disable-next-line
   * react-hooks/exhaustive-deps` that used to stand in for this suppressed
   * nothing — at the time there was no ESLint in the workspace for it to talk
   * to, and the dependencies below are honest now rather than silenced.
   */
  const ownKeyTouchedRef = useRef(ownKeyTouched);
  useEffect(() => {
    ownKeyTouchedRef.current = ownKeyTouched;
  }, [ownKeyTouched]);

  // After server defaults load or the provider changes, re-evaluate key mode.
  useEffect(() => {
    const prov = PROVIDERS[provider];
    if (!prov) return;

    const stored = loadStoredKey(provider);
    setRememberKeyState(stored.remember);

    if (ownKeyTouchedRef.current) {
      setModelState(prov.models[0]);
      return;
    }

    // Own key when there is one saved, or when the server has no default to
    // fall back on. Set flat rather than from inside another setter's updater:
    // an updater must be a pure function of its argument, and queueing a second
    // state change from inside one runs it again under StrictMode.
    const hasDefault = !!serverDefaults[provider]?.available;
    const shouldUseOwn = !!stored.key || !hasDefault;
    setUseOwnKeyState(shouldUseOwn);
    setApiKeyState(shouldUseOwn ? stored.key : '');
    setModelState(serverDefaults[provider]?.defaultModel ?? prov.models[0]);
  }, [provider, serverDefaults]);

  const setUseOwnKey = useCallback(
    (v: boolean) => {
      setOwnKeyTouchedState(true);
      setUseOwnKeyState(v);
      setApiKeyState(v ? loadStoredKey(provider).key : '');
    },
    [provider],
  );

  const setApiKey = useCallback(
    (k: string) => {
      setApiKeyState(k);
      if (useOwnKey) {
        const key = k.trim();
        const destination = rememberKey ? localStorage : sessionStorage;
        const destinationPrefix = rememberKey ? PROVIDER_KEY_PREFIX : PROVIDER_SESSION_KEY_PREFIX;
        writeRaw(destination, destinationPrefix + provider, key);
      }
    },
    [provider, rememberKey, useOwnKey],
  );

  const setRememberKey = useCallback(
    (remember: boolean) => {
      setRememberKeyState(remember);
      const key = apiKey.trim();
      if (remember) {
        writeRaw(localStorage, PROVIDER_REMEMBER_PREFIX + provider, 'true');
        if (key) writeRaw(localStorage, PROVIDER_KEY_PREFIX + provider, key);
        removeRaw(sessionStorage, PROVIDER_SESSION_KEY_PREFIX + provider);
      } else {
        removeRaw(localStorage, PROVIDER_REMEMBER_PREFIX + provider);
        removeRaw(localStorage, PROVIDER_KEY_PREFIX + provider);
        if (key) writeRaw(sessionStorage, PROVIDER_SESSION_KEY_PREFIX + provider, key);
      }
    },
    [apiKey, provider],
  );

  const setModel = useCallback((m: string) => setModelState(m), []);

  // Gemini is no longer a selectable chat provider, so the only source for a
  // visitor-supplied Gemini key is one saved by an older version of the site.
  const ownGeminiKey = useMemo(() => loadStoredKey('gemini').key, []);

  const callClaude = useCallback(
    (system: string, messages: Message[], maxTokens = 2500) =>
      callAI(provider, model, apiKey, useOwnKey, serverDefaults, S, system, messages, maxTokens),
    [provider, model, apiKey, useOwnKey, serverDefaults, S],
  );

  const callGrounded = useCallback(
    (system: string, user: string, maxTokens = 3000) =>
      callGeminiGrounded(ownGeminiKey, serverDefaults, S, system, user, maxTokens),
    [ownGeminiKey, serverDefaults, S],
  );

  const extractJSONCb = useCallback((text: string) => extractJSON(text, S), [S]);

  const testConnection = useCallback(async () => {
    setConnStatus(S.statusTesting, 'var(--muted)');
    try {
      // Reasoning-capable Groq models spend part of the token budget on hidden
      // chain-of-thought before the visible reply; a very small cap can leave
      // zero tokens for the actual answer even though the request succeeded.
      const reply = await callClaude(S.pingSystem, [{ role: 'user', content: S.pingUser }], 80);
      setConnStatus(S.statusOkPrefix + model + '): ' + reply.slice(0, 40), 'var(--green)');
    } catch (e) {
      setConnStatus('❌ ' + (e as Error).message, 'var(--red)');
    }
  }, [callClaude, model, S, setConnStatus]);

  const resetSettings = useCallback(() => {
    // Resetting provider preferences must not erase progress, interview
    // history, or resume drafts. Enumerating can itself throw when storage is
    // denied, in which case there is nothing stored to clear.
    const keysOf = (storage: Storage): string[] => {
      try {
        return Object.keys(storage);
      } catch {
        return [];
      }
    };

    keysOf(localStorage)
      .filter(
        k =>
          k === PROVIDER_STORE_KEY ||
          k.startsWith(PROVIDER_KEY_PREFIX) ||
          k.startsWith(PROVIDER_REMEMBER_PREFIX),
      )
      .forEach(k => removeRaw(localStorage, k));
    keysOf(sessionStorage)
      .filter(k => k.startsWith(PROVIDER_SESSION_KEY_PREFIX))
      .forEach(k => removeRaw(sessionStorage, k));
    window.location.reload();
  }, []);

  const value = useMemo<ProviderContextValue>(
    () => ({
      provider,
      setProvider,
      model,
      setModel,
      apiKey,
      setApiKey,
      rememberKey,
      setRememberKey,
      useOwnKey,
      setUseOwnKey,
      ownKeyTouched,
      setOwnKeyTouched: setOwnKeyTouchedState,
      serverDefaults,
      serverConfigLoaded,
      anonymousQuota,
      quotaExhausted: anonymousQuota?.remaining === 0,
      hasServerDefault,
      connStatus,
      connStatusColor,
      setConnStatus,
      testConnection,
      resetSettings,
      callClaude,
      callGrounded,
      extractJSON: extractJSONCb,
      ownGeminiKey,
    }),
    [
      provider,
      setProvider,
      model,
      setModel,
      apiKey,
      setApiKey,
      rememberKey,
      setRememberKey,
      useOwnKey,
      setUseOwnKey,
      ownKeyTouched,
      serverDefaults,
      serverConfigLoaded,
      anonymousQuota,
      hasServerDefault,
      connStatus,
      connStatusColor,
      setConnStatus,
      testConnection,
      resetSettings,
      callClaude,
      callGrounded,
      extractJSONCb,
      ownGeminiKey,
    ],
  );

  return <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>;
}

export function useProviderContext(): ProviderContextValue {
  const ctx = useContext(ProviderContext);
  if (!ctx) throw new Error('useProviderContext must be used within ProviderContextProvider');
  return ctx;
}
