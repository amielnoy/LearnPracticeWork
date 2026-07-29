import { $ } from './dom.js';
import { S } from './i18n.js';
export const PROVIDERS = {
    gemini: {
        label: S.keyLabelGemini,
        placeholder: 'AIza...',
        models: ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-pro'],
        build(key, model, system, messages, maxTokens) {
            const generationConfig = { maxOutputTokens: maxTokens };
            if (model.includes('flash'))
                generationConfig.thinkingConfig = { thinkingBudget: 0 };
            return {
                url: 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent',
                headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
                body: {
                    system_instruction: { parts: [{ text: system }] },
                    contents: messages.map(m => ({
                        role: m.role === 'assistant' ? 'model' : 'user',
                        parts: [{ text: m.content }]
                    })),
                    generationConfig
                }
            };
        },
        parse: d => (d.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('\n'),
        keyHint: (key, status) => [400, 401, 403].includes(status) && !key.startsWith('AIza') ? S.errGeminiKeyHint : ''
    },
    anthropic: {
        label: S.keyLabelAnthropic,
        placeholder: 'sk-ant-...',
        models: ['claude-sonnet-5', 'claude-haiku-4-5-20251001'],
        validateKey(key) { if (!key.startsWith('sk-ant-'))
            throw new Error(S.errKeyNotAnthropic); },
        build(key, model, system, messages, maxTokens) {
            return {
                url: 'https://api.anthropic.com/v1/messages',
                headers: {
                    'content-type': 'application/json',
                    'x-api-key': key,
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true'
                },
                body: { model, max_tokens: maxTokens, system, messages }
            };
        },
        parse: d => d.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n')
    },
    openai: {
        label: S.keyLabelOpenai,
        placeholder: 'sk-...',
        models: ['gpt-5-mini', 'gpt-5.4-mini', 'gpt-5.4'],
        validateKey(key) { if (key.startsWith('sk-ant-'))
            throw new Error(S.errKeyNotOpenai); },
        build(key, model, system, messages, maxTokens) {
            return {
                url: 'https://api.openai.com/v1/chat/completions',
                headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + key },
                body: { model, max_completion_tokens: maxTokens, messages: [{ role: 'system', content: system }, ...messages] }
            };
        },
        parse: d => d.choices?.[0]?.message?.content || ''
    }
};
function currentProvider() { return $('providerSel').value; }
/* localStorage slot holding the user's own key for the active provider. */
function providerKeyStore() { return 'ata_key_' + currentProvider(); }
/* Server-side default availability, fetched from the backend (artifacts/api-server).
   The key itself never reaches the browser — only whether one is configured. */
const serverDefaults = {}; // e.g. { gemini: { available: true, defaultModel: 'gemini-2.5-flash' } }
let ownKeyTouched = false; // becomes true once the user ticks the checkbox themselves
async function loadServerConfig() {
    try {
        const res = await fetch('/api/ai/config', { cache: 'no-store' });
        if (!res.ok)
            return;
        Object.assign(serverDefaults, await res.json());
        if (!ownKeyTouched)
            applyKeyMode(); // re-evaluate defaults; UI-saved keys still win
    }
    catch { /* backend unreachable — manual key entry still works */ }
}
function hasServerDefault(provider) { return !!serverDefaults[provider]?.available; }
/* Gate the key input behind the checkbox: the server default is the locked-in
   default, and a custom key can only be entered after ticking "Use my own API key". */
function applyKeyMode() {
    const p = PROVIDERS[currentProvider()];
    const hasDefault = hasServerDefault(currentProvider());
    // default state (until the user touches the box): UI-saved key wins first,
    // then the server default; own-key mode when there's no server default at all.
    if (!ownKeyTouched)
        $('useOwnKey').checked = !!localStorage.getItem(providerKeyStore()) || !hasDefault;
    const own = $('useOwnKey').checked;
    $('useOwnKey').disabled = !hasDefault; // can't turn off what doesn't exist
    $('ownKeyRow').style.opacity = hasDefault ? '1' : '.5';
    $('apiKey').disabled = !own;
    $('apiKey').placeholder = own ? p.placeholder : S.placeholderEnvKey;
    if (own) {
        $('apiKey').value = localStorage.getItem(providerKeyStore()) || '';
        $('apiKeyLabel').textContent = p.label;
    }
    else {
        $('apiKey').value = ''; // the server holds the key; nothing to show client-side
        $('apiKeyLabel').textContent = p.label.replace(S.labelSuffixLocal, S.labelSuffixEnv);
    }
}
export function onProviderChange() {
    const p = PROVIDERS[currentProvider()];
    $('modelSel').innerHTML = p.models.map(m => `<option value="${m}">${m}</option>`).join('');
    ownKeyTouched = false; // each provider re-evaluates its own default
    applyKeyMode();
    const def = serverDefaults[currentProvider()]?.defaultModel;
    if (def && !$('useOwnKey').checked)
        $('modelSel').value = def;
}
/* Calls the server-side proxy (no key leaves the backend) for providers with a
   configured default — currently only Gemini. */
async function callServerProxy(system, messages, maxTokens, grounded = false) {
    const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ model: $('modelSel').value, system, messages, maxTokens, grounded }),
    });
    const data = await res.json();
    if (!res.ok)
        throw new Error(S.errApiPrefix + res.status + '): ' + (data.error || '').slice(0, 300));
    return data.text || '';
}
export async function callClaude(system, messages, maxTokens = 2500) {
    const own = $('useOwnKey').checked;
    if (!own && currentProvider() === 'gemini' && hasServerDefault('gemini')) {
        return callServerProxy(system, messages, maxTokens);
    }
    const key = $('apiKey').value.trim();
    if (!key)
        throw new Error(S.errNoKey);
    const provider = PROVIDERS[currentProvider()];
    provider.validateKey?.(key);
    const { url, headers, body } = provider.build(key, $('modelSel').value, system, messages, maxTokens);
    let res;
    try {
        res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
    }
    catch {
        throw new Error(S.errBlockedPrefix + new URL(url).host + S.errBlockedMid +
            S.errBlockedCauses +
            S.errBlockedTry +
            S.errBlockedOpenUrl);
    }
    if (!res.ok) {
        const errBody = await res.text();
        const hint = provider.keyHint ? provider.keyHint(key, res.status) : '';
        throw new Error(S.errApiPrefix + res.status + '): ' + errBody.slice(0, 300) + hint);
    }
    return provider.parse(await res.json());
}
export function resetSettings() {
    Object.keys(localStorage).filter(k => k.startsWith('ata_')).forEach(k => localStorage.removeItem(k));
    location.reload();
}
export async function testConnection() {
    const el = $('connStatus');
    el.style.color = 'var(--muted)';
    el.textContent = S.statusTesting;
    try {
        const reply = await callClaude(S.pingSystem, [{ role: 'user', content: S.pingUser }], 20);
        el.style.color = 'var(--green)';
        el.textContent = S.statusOkPrefix + $('modelSel').value + '): ' + reply.slice(0, 40);
    }
    catch (e) {
        el.style.color = 'var(--red)';
        el.textContent = '❌ ' + e.message;
    }
}
export function extractJSON(text) {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    const raw = fenced ? fenced[1] : text;
    const start = raw.indexOf('{'), end = raw.lastIndexOf('}');
    if (start === -1 || end === -1)
        throw new Error(S.errNoJson);
    return JSON.parse(raw.slice(start, end + 1));
}
/* The user's own Gemini key, if they've entered one — regardless of the
   currently-selected provider (used by the grounded enrichment, which is
   always Gemini). Empty when relying on the server-side default key. */
function ownGeminiKey() {
    return localStorage.getItem('ata_key_gemini') ||
        (currentProvider() === 'gemini' && $('useOwnKey').checked ? $('apiKey').value.trim() : '');
}
/* Gemini call with Google Search grounding — answers are grounded in current
   search results, so recency-sensitive prompts ("last 3 months") work.
   Uses the visitor's own key directly if they've supplied one, otherwise
   routes through the server-side proxy so the default key stays server-only. */
export async function callGeminiGrounded(system, user, maxTokens = 3000) {
    const key = ownGeminiKey();
    if (!key) {
        if (!hasServerDefault('gemini'))
            throw new Error(S.errNoKey);
        return callServerProxy(system, [{ role: 'user', content: user }], maxTokens, true);
    }
    const model = 'gemini-2.5-flash';
    const body = {
        system_instruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: user }] }],
        tools: [{ google_search: {} }],
        generationConfig: { maxOutputTokens: maxTokens }
    };
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent', { method: 'POST', headers: { 'content-type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify(body) });
    if (!res.ok)
        throw new Error(S.errApiPrefix + res.status + '): ' + (await res.text()).slice(0, 300));
    const d = await res.json();
    return (d.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('\n');
}
/* Wire the provider select + key-gating controls and load the server-side defaults. */
export function initProviders() {
    $('useOwnKey').addEventListener('change', () => { ownKeyTouched = true; applyKeyMode(); });
    loadServerConfig();
    $('providerSel').value = localStorage.getItem('ata_provider') || 'gemini';
    onProviderChange();
    $('providerSel').addEventListener('change', () => localStorage.setItem('ata_provider', currentProvider()));
    $('apiKey').addEventListener('change', () => localStorage.setItem(providerKeyStore(), $('apiKey').value.trim()));
}
