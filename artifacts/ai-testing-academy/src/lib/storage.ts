/**
 * Reading and writing browser storage without trusting it.
 *
 * Two things are true of every key this site keeps. Storage can be unavailable
 * — Safari in private mode, a blocked-cookies setting, a full quota — and
 * `localStorage.getItem` throws outright when it is, which in a module-scope
 * initialiser takes the whole page down. And the contents are editable by
 * anyone with a devtools console, so a value read back is input, not state:
 * `data-theme` set from an arbitrary stored string is a stored string on the
 * document, and clearing storage is the only way back out of it.
 *
 * So every read here goes through a check and every failure is the same answer:
 * the value is absent. `ProgressContext.loadProgress` was already written this
 * way; this is that pattern with the boilerplate removed so the other keys can
 * be written the same way.
 */

/** A raw read that never throws. Absent and unreadable are the same answer. */
export function readRaw(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

/** A write that never throws. Nothing here is important enough to fail a render. */
export function writeRaw(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value);
  } catch {
    // Quota exceeded or storage denied: this visit still works, it just will
    // not be remembered.
  }
}

export function removeRaw(storage: Storage, key: string): void {
  try {
    storage.removeItem(key);
  } catch {
    // Already effectively absent as far as every reader is concerned.
  }
}

/**
 * A stored value constrained to a known set.
 *
 * For the keys whose whole domain is a handful of strings — a theme, a
 * language, a provider name. Anything else stored under the key reads as
 * absent, so the caller's default applies.
 */
export function readOneOf<T extends string>(
  storage: Storage,
  key: string,
  allowed: readonly T[],
): T | null {
  const raw = readRaw(storage, key);
  return raw !== null && (allowed as readonly string[]).includes(raw) ? (raw as T) : null;
}

/**
 * A stored string, length-capped.
 *
 * The cap is not about correctness so much as about not reinstating a megabyte
 * of someone's pasted text into a controlled input on every mount.
 */
export function readText(storage: Storage, key: string, maxLength: number): string {
  const raw = readRaw(storage, key);
  return typeof raw === 'string' ? raw.slice(0, maxLength) : '';
}

/**
 * A stored JSON document, run through a validator before it is believed.
 *
 * The validator returns the value it accepts, or null. Parse failures, storage
 * failures, and rejections all come back as null, because the caller does the
 * same thing for each: start from its own defaults.
 */
export function readValidated<T>(
  storage: Storage,
  key: string,
  validate: (parsed: unknown) => T | null,
): T | null {
  const raw = readRaw(storage, key);
  if (raw === null) return null;
  try {
    return validate(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

/** Writes a JSON document. Silent on failure, like every other write here. */
export function writeValidated(storage: Storage, key: string, value: unknown): void {
  try {
    writeRaw(storage, key, JSON.stringify(value));
  } catch {
    // A value that cannot be serialised is a programming error, not a runtime
    // one worth taking the page down for.
  }
}
