import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
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

function loadStoredKey(provider: string): { key: string; remember: boolean } {
  const remember = localStorage.getItem(PROVIDER_REMEMBER_PREFIX + provider) === 'true';
  let persistentKey = localStorage.getItem(PROVIDER_KEY_PREFIX + provider) || '';

  // One-time migration: keys saved by older versions become session-only and
  // are removed from persistent storage unless the user explicitly opts in.
  if (persistentKey && !remember) {
    sessionStorage.setItem(PROVIDER_SESSION_KEY_PREFIX + provider, persistentKey);
    localStorage.removeItem(PROVIDER_KEY_PREFIX + provider);
    persistentKey = '';
  }

  return {
    remember,
    key: remember
      ? persistentKey
      : sessionStorage.getItem(PROVIDER_SESSION_KEY_PREFIX + provider) || '',
  };
}

export function ProviderContextProvider({ children }: { children: React.ReactNode }) {
  const { S } = useLocale();

  const [provider, setProviderState] = useState<string>(
    () => localStorage.getItem(PROVIDER_STORE_KEY) || 'gemini'
  );
  const [model, setModelState] = useState<string>(() => PROVIDERS['gemini'].models[0]);
  const [apiKey, setApiKeyState] = useState<string>('');
  const [rememberKey, setRememberKeyState] = useState<boolean>(false);
  const [useOwnKey, setUseOwnKeyState] = useState<boolean>(false);
  const [ownKeyTouched, setOwnKeyTouchedState] = useState<boolean>(false);
  const [serverDefaults, setServerDefaults] = useState<ServerDefaults>({});
  const [serverConfigLoaded, setServerConfigLoaded] = useState(false);
  const [anonymousQuota, setAnonymousQuota] = useState<{ limit: number; remaining: number | null } | null>(null);
  const [connStatus, setConnStatusText] = useState<string>('');
  const [connStatusColor, setConnStatusColor] = useState<string>('var(--muted)');

  const setConnStatus = useCallback((s: string, color?: string) => {
    setConnStatusText(s);
    setConnStatusColor(color ?? 'var(--muted)');
  }, []);

  const hasServerDefault = useCallback(
    (p: string) => !!serverDefaults[p]?.available,
    [serverDefaults]
  );

  // Compute effective key mode based on state and server defaults
  const applyKeyMode = useCallback(
    (
      currentProvider: string,
      currentServerDefaults: ServerDefaults,
      touchedByUser: boolean,
      currentApiKey: string,
      currentUseOwnKey: boolean
    ) => {
      const prov = PROVIDERS[currentProvider];
      const hasDefault = !!currentServerDefaults[currentProvider]?.available;
      const storedKey = loadStoredKey(currentProvider).key;

      let shouldUseOwn = currentUseOwnKey;
      if (!touchedByUser) {
        shouldUseOwn = !!storedKey || !hasDefault;
      }

      const newApiKey = shouldUseOwn ? (storedKey || currentApiKey) : '';
      const newPlaceholder = shouldUseOwn ? prov.placeholder : S.placeholderEnvKey;
      void newPlaceholder; // used by the component UI

      return { shouldUseOwn, newApiKey, hasDefault };
    },
    [S]
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
    localStorage.setItem(PROVIDER_STORE_KEY, p);
    setOwnKeyTouchedState(false);
    const prov = PROVIDERS[p];
    setModelState(prov.models[0]);
  }, []);

  // After server defaults load or provider changes, re-evaluate key mode
  useEffect(() => {
    const prov = PROVIDERS[provider];
    if (!prov) return;
    const hasDefault = !!serverDefaults[provider]?.available;
    const stored = loadStoredKey(provider);
    const storedKey = stored.key;
    setRememberKeyState(stored.remember);

    // Use function-form to get current ownKeyTouched without depending on it
    setUseOwnKeyState(currentUseOwn => {
      if (!ownKeyTouched) {
        const shouldUseOwn = !!storedKey || !hasDefault;
        setApiKeyState(shouldUseOwn ? storedKey : '');
        return shouldUseOwn;
      }
      return currentUseOwn;
    });

    // Apply server default model
    const defModel = serverDefaults[provider]?.defaultModel;
    if (defModel && !ownKeyTouched) {
      setModelState(defModel);
    } else {
      setModelState(prov.models[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, serverDefaults]);

  const setUseOwnKey = useCallback(
    (v: boolean) => {
      setOwnKeyTouchedState(true);
      setUseOwnKeyState(v);
      const prov = PROVIDERS[provider];
      if (v) {
        setApiKeyState(loadStoredKey(provider).key);
      } else {
        setApiKeyState('');
      }
      void prov;
    },
    [provider]
  );

  const setApiKey = useCallback(
    (k: string) => {
      setApiKeyState(k);
      if (useOwnKey) {
        const key = k.trim();
        const destination = rememberKey ? localStorage : sessionStorage;
        const destinationPrefix = rememberKey ? PROVIDER_KEY_PREFIX : PROVIDER_SESSION_KEY_PREFIX;
        destination.setItem(destinationPrefix + provider, key);
      }
    },
    [provider, rememberKey, useOwnKey]
  );

  const setRememberKey = useCallback((remember: boolean) => {
    setRememberKeyState(remember);
    const key = apiKey.trim();
    if (remember) {
      localStorage.setItem(PROVIDER_REMEMBER_PREFIX + provider, 'true');
      if (key) localStorage.setItem(PROVIDER_KEY_PREFIX + provider, key);
      sessionStorage.removeItem(PROVIDER_SESSION_KEY_PREFIX + provider);
    } else {
      localStorage.removeItem(PROVIDER_REMEMBER_PREFIX + provider);
      localStorage.removeItem(PROVIDER_KEY_PREFIX + provider);
      if (key) sessionStorage.setItem(PROVIDER_SESSION_KEY_PREFIX + provider, key);
    }
  }, [apiKey, provider]);

  const setModel = useCallback((m: string) => setModelState(m), []);

  const ownGeminiKey = useMemo(() => {
    return (
      loadStoredKey('gemini').key ||
      (provider === 'gemini' && useOwnKey ? apiKey.trim() : '')
    );
  }, [provider, useOwnKey, apiKey]);

  const callClaude = useCallback(
    (system: string, messages: Message[], maxTokens = 2500) =>
      callAI(provider, model, apiKey, useOwnKey, serverDefaults, S, system, messages, maxTokens),
    [provider, model, apiKey, useOwnKey, serverDefaults, S]
  );

  const callGrounded = useCallback(
    (system: string, user: string, maxTokens = 3000) =>
      callGeminiGrounded(ownGeminiKey, serverDefaults, S, system, user, maxTokens),
    [ownGeminiKey, serverDefaults, S]
  );

  const extractJSONCb = useCallback(
    (text: string) => extractJSON(text, S),
    [S]
  );

  const testConnection = useCallback(async () => {
    setConnStatus(S.statusTesting, 'var(--muted)');
    try {
      const reply = await callClaude(S.pingSystem, [{ role: 'user', content: S.pingUser }], 20);
      setConnStatus(S.statusOkPrefix + model + '): ' + reply.slice(0, 40), 'var(--green)');
    } catch (e) {
      setConnStatus('❌ ' + (e as Error).message, 'var(--red)');
    }
  }, [callClaude, model, S, setConnStatus]);

  const resetSettings = useCallback(() => {
    // Resetting provider preferences must not erase progress, interview
    // history, or resume drafts.
    Object.keys(localStorage)
      .filter(k => k === PROVIDER_STORE_KEY
        || k.startsWith(PROVIDER_KEY_PREFIX)
        || k.startsWith(PROVIDER_REMEMBER_PREFIX))
      .forEach(k => localStorage.removeItem(k));
    Object.keys(sessionStorage)
      .filter(k => k.startsWith(PROVIDER_SESSION_KEY_PREFIX))
      .forEach(k => sessionStorage.removeItem(k));
    window.location.reload();
  }, []);

  void applyKeyMode; // suppress unused warning

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
      provider, setProvider, model, setModel, apiKey, setApiKey, rememberKey, setRememberKey,
      useOwnKey, setUseOwnKey, ownKeyTouched, serverDefaults, serverConfigLoaded, anonymousQuota, hasServerDefault,
      connStatus, connStatusColor, setConnStatus, testConnection, resetSettings,
      callClaude, callGrounded, extractJSONCb, ownGeminiKey,
    ]
  );

  return (
    <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>
  );
}

export function useProviderContext(): ProviderContextValue {
  const ctx = useContext(ProviderContext);
  if (!ctx) throw new Error('useProviderContext must be used within ProviderContextProvider');
  return ctx;
}
