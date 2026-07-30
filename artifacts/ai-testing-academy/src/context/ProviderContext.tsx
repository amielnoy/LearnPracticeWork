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
  useOwnKey: boolean;
  setUseOwnKey: (v: boolean) => void;
  ownKeyTouched: boolean;
  setOwnKeyTouched: (v: boolean) => void;
  serverDefaults: ServerDefaults;
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
const PROVIDER_STORE_KEY = 'ata_provider';

export function ProviderContextProvider({ children }: { children: React.ReactNode }) {
  const { S } = useLocale();

  const [provider, setProviderState] = useState<string>(
    () => localStorage.getItem(PROVIDER_STORE_KEY) || 'gemini'
  );
  const [model, setModelState] = useState<string>(() => PROVIDERS['gemini'].models[0]);
  const [apiKey, setApiKeyState] = useState<string>('');
  const [useOwnKey, setUseOwnKeyState] = useState<boolean>(false);
  const [ownKeyTouched, setOwnKeyTouchedState] = useState<boolean>(false);
  const [serverDefaults, setServerDefaults] = useState<ServerDefaults>({});
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
      const storedKey = localStorage.getItem(PROVIDER_KEY_PREFIX + currentProvider) || '';

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
    loadServerConfig().then(defaults => {
      setServerDefaults(defaults);
    });
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
    const storedKey = localStorage.getItem(PROVIDER_KEY_PREFIX + provider) || '';

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
        const storedKey = localStorage.getItem(PROVIDER_KEY_PREFIX + provider) || '';
        setApiKeyState(storedKey);
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
        localStorage.setItem(PROVIDER_KEY_PREFIX + provider, k.trim());
      }
    },
    [provider, useOwnKey]
  );

  const setModel = useCallback((m: string) => setModelState(m), []);

  const ownGeminiKey = useMemo(() => {
    return (
      localStorage.getItem(PROVIDER_KEY_PREFIX + 'gemini') ||
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
    Object.keys(localStorage)
      .filter(k => k.startsWith('ata_'))
      .forEach(k => localStorage.removeItem(k));
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
      useOwnKey,
      setUseOwnKey,
      ownKeyTouched,
      setOwnKeyTouched: setOwnKeyTouchedState,
      serverDefaults,
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
      provider, setProvider, model, setModel, apiKey, setApiKey,
      useOwnKey, setUseOwnKey, ownKeyTouched, serverDefaults, hasServerDefault,
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
