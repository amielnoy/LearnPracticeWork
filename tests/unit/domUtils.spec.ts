import { test, expect } from '@playwright/test';
import {
  esc,
  isRtlText,
  findLinks,
  linkifyHtml,
  markdownLineToPlain,
} from '@academy/lib/domUtils';

/**
 * `linkifyHtml` output is fed to `dangerouslySetInnerHTML`, so the escaping
 * assertions here are the security boundary, not a formatting nicety.
 */

test.describe('esc', () => {
  test('escapes every character that could break out of markup', () => {
    expect(esc('<>&"\'')).toBe('&lt;&gt;&amp;&quot;&#39;');
  });

  test('escapes the ampersand without double-escaping the entities it produces', () => {
    expect(esc('Tom & Jerry <tag>')).toBe('Tom &amp; Jerry &lt;tag&gt;');
  });

  test('neutralises a script tag', () => {
    expect(esc('<script>alert(1)</script>')).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    );
  });

  test('treats null and undefined as the empty string', () => {
    expect(esc(null)).toBe('');
    expect(esc(undefined)).toBe('');
  });

  test('stringifies non-strings', () => {
    expect(esc(42)).toBe('42');
    expect(esc(false)).toBe('false');
  });
});

test.describe('isRtlText', () => {
  test('detects Hebrew', () => {
    expect(isRtlText('שלום')).toBe(true);
  });

  test('detects Hebrew mixed into Latin text', () => {
    expect(isRtlText('QA בעברית')).toBe(true);
  });

  test('rejects Latin-only text', () => {
    expect(isRtlText('hello world')).toBe(false);
  });

  test('rejects the empty string', () => {
    expect(isRtlText('')).toBe(false);
  });
});

test.describe('findLinks', () => {
  test('finds an http URL and reports its offsets', () => {
    const text = 'see https://example.com/x for more';
    const [link] = findLinks(text);

    expect(link).toBeDefined();
    expect(link!.text).toBe('https://example.com/x');
    expect(link!.href).toBe('https://example.com/x');
    expect(text.slice(link!.start, link!.end)).toBe('https://example.com/x');
  });

  test('strips trailing sentence punctuation from the match', () => {
    const [link] = findLinks('read https://example.com/docs.');
    expect(link!.text).toBe('https://example.com/docs');
    expect(link!.href).toBe('https://example.com/docs');
  });

  test('gives a bare www. host an https scheme', () => {
    const [link] = findLinks('visit www.example.com today');
    expect(link!.text).toBe('www.example.com');
    expect(link!.href).toBe('https://www.example.com');
  });

  test('turns an email address into a mailto link', () => {
    const [link] = findLinks('write to amiel@example.com');
    expect(link!.text).toBe('amiel@example.com');
    expect(link!.href).toBe('mailto:amiel@example.com');
  });

  test('finds every link in one line', () => {
    const links = findLinks('https://a.com and www.b.com and c@d.com');
    expect(links.map(l => l.href)).toEqual([
      'https://a.com',
      'https://www.b.com',
      'mailto:c@d.com',
    ]);
  });

  test('returns nothing for text without links', () => {
    expect(findLinks('nothing to see here')).toEqual([]);
  });

  test('is not left stateful by a previous call', () => {
    const text = 'https://a.com';
    expect(findLinks(text)).toHaveLength(1);
    expect(findLinks(text)).toHaveLength(1);
  });
});

test.describe('linkifyHtml', () => {
  test('renders markdown bold as a strong tag', () => {
    expect(linkifyHtml('a **bold** word')).toBe('a <strong>bold</strong> word');
  });

  test('renders a markdown link as an anchor that opens safely', () => {
    expect(linkifyHtml('[docs](https://example.com)')).toBe(
      '<a href="https://example.com" target="_blank" rel="noopener">docs</a>',
    );
  });

  test('renders a bold markdown link as a strong-wrapped anchor', () => {
    expect(linkifyHtml('**[docs](https://example.com)**')).toBe(
      '<strong><a href="https://example.com" target="_blank" rel="noopener">docs</a></strong>',
    );
  });

  test('linkifies a bare URL sitting outside markdown syntax', () => {
    expect(linkifyHtml('go to https://example.com now')).toBe(
      'go to <a href="https://example.com" target="_blank" rel="noopener">https://example.com</a> now',
    );
  });

  test('escapes markup in the surrounding text', () => {
    expect(linkifyHtml('<img src=x onerror=alert(1)>')).toBe(
      '&lt;img src=x onerror=alert(1)&gt;',
    );
  });

  test('escapes markup inside a link label', () => {
    const html = linkifyHtml('[<b>x</b>](https://example.com)');
    expect(html).toContain('&lt;b&gt;x&lt;/b&gt;');
    expect(html).not.toContain('<b>');
  });

  test('escapes markup inside bold text', () => {
    const html = linkifyHtml('**<script>alert(1)</script>**');
    expect(html).toBe('<strong>&lt;script&gt;alert(1)&lt;/script&gt;</strong>');
  });

  test('only treats http and mailto targets as markdown links', () => {
    const html = linkifyHtml('[click](javascript:alert(1))');
    expect(html).not.toContain('<a');
    expect(html).toContain('[click]');
  });

  test('returns the empty string for null input', () => {
    expect(linkifyHtml(null as unknown as string)).toBe('');
  });
});

test.describe('markdownLineToPlain', () => {
  test('strips markdown and reports the links it removed', () => {
    const { plain, links } = markdownLineToPlain(
      'Contact **[Amiel](mailto:a@example.com)** for details',
    );

    expect(plain).toBe('Contact Amiel for details');
    expect(links).toEqual([{ label: 'Amiel', href: 'mailto:a@example.com' }]);
  });

  test('unwraps bold without recording a link', () => {
    const { plain, links } = markdownLineToPlain('this is **important**');
    expect(plain).toBe('this is important');
    expect(links).toEqual([]);
  });

  test('records a bare URL exactly once', () => {
    const { plain, links } = markdownLineToPlain('see https://example.com');
    expect(plain).toBe('see https://example.com');
    expect(links).toEqual([
      { label: 'https://example.com', href: 'https://example.com' },
    ]);
  });

  test('leaves a plain line untouched', () => {
    expect(markdownLineToPlain('just words')).toEqual({
      plain: 'just words',
      links: [],
    });
  });
});
