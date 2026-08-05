/**
 * A hand-rolled stand-in for the handful of browser globals the academy's
 * pure modules touch: `window.location`, `localStorage`, `navigator.language`
 * and `document.documentElement`.
 *
 * Small enough to be obvious and to avoid pulling jsdom into the workspace for
 * four properties. Anything that needs a *real* DOM belongs in the component
 * suite, which mounts in Chromium.
 */

const PATCHED_GLOBALS = ['window', 'localStorage', 'navigator', 'document'] as const;

export interface FakeBrowserOptions {
  /** Full page URL; query string is what `resolveLang` reads. */
  url?: string;
  /** Value for `navigator.language`. */
  language?: string;
  /** Seed contents of localStorage. */
  storage?: Record<string, string>;
}

export interface FakeBrowser {
  /** Mutable location; `switchLang` navigates by assigning `href`. */
  location: { href: string; readonly search: string };
  /** Live view of localStorage, for asserting on what was persisted. */
  storage: Map<string, string>;
  /** The stubbed `document.documentElement`. */
  documentElement: { lang: string; dir: string };
  /** Puts the real globals back. Always call this in an `afterEach`. */
  restore(): void;
}

export function installFakeBrowser(options: FakeBrowserOptions = {}): FakeBrowser {
  const saved = PATCHED_GLOBALS.map(
    key => [key, Object.getOwnPropertyDescriptor(globalThis, key)] as const,
  );

  const storage = new Map<string, string>(Object.entries(options.storage ?? {}));

  const localStorage = {
    getItem: (key: string) => (storage.has(key) ? storage.get(key)! : null),
    setItem: (key: string, value: string) => void storage.set(key, String(value)),
    removeItem: (key: string) => void storage.delete(key),
    clear: () => storage.clear(),
    key: (index: number) => [...storage.keys()][index] ?? null,
    get length() {
      return storage.size;
    },
  };

  const location = {
    href: options.url ?? 'https://academy.test/',
    get search() {
      return new URL(this.href).search;
    },
    get pathname() {
      return new URL(this.href).pathname;
    },
  };

  const documentElement = { lang: '', dir: '' };
  const document = { documentElement };
  const navigator = { language: options.language ?? 'en-US' };
  const window = { location, localStorage, navigator, document };

  const define = (key: string, value: unknown) =>
    Object.defineProperty(globalThis, key, {
      value,
      configurable: true,
      writable: true,
      enumerable: false,
    });

  define('window', window);
  define('localStorage', localStorage);
  define('navigator', navigator);
  define('document', document);

  return {
    location,
    storage,
    documentElement,
    restore() {
      for (const [key, descriptor] of saved) {
        if (descriptor) Object.defineProperty(globalThis, key, descriptor);
        else delete (globalThis as Record<string, unknown>)[key];
      }
    },
  };
}
