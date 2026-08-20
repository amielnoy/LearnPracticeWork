import { test, expect } from './fixtures';
import { Footer } from '@academy/components/chrome/Footer';
import { en } from '@academy/lib/locales';

/**
 * The footer is the smallest thing that goes through the whole locale stack —
 * resolve the language, read the catalog, render it — so it is a cheap guard
 * against the provider chain breaking.
 */

test('renders the footer text from the active locale', async ({ mountLocalized }) => {
  const component = await mountLocalized(<Footer />);

  await expect(component).toContainText(en.footer.text);
  await expect(component).toContainText(en.footer.suffix);
  await expect(component).toContainText(String(en.footer.year));
});

test('links to the author with an external link that cannot reach back', async ({
  mountLocalized,
}) => {
  const component = await mountLocalized(<Footer />);

  const link = component.getByRole('link', { name: en.footer.authorName });

  await expect(link).toHaveAttribute('href', en.footer.authorHref);
  await expect(link).toHaveAttribute('target', '_blank');
  // Without noopener the opened tab can navigate this one via window.opener.
  await expect(link).toHaveAttribute('rel', /noopener/);
});

test('sets the document language and direction while rendering', async ({
  mountLocalized,
  page,
}) => {
  await mountLocalized(<Footer />);

  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
});

test('exposes privacy, terms, cancellation, accessibility, and contact links', async ({
  mountLocalized,
}) => {
  const component = await mountLocalized(<Footer />);

  await expect(component.getByRole('link', { name: 'Privacy' })).toHaveAttribute(
    'href',
    /privacy$/,
  );
  await expect(component.getByRole('link', { name: 'Terms' })).toBeVisible();
  await expect(component.getByRole('link', { name: 'Cancellation & refunds' })).toBeVisible();
  await expect(component.getByRole('link', { name: 'Accessibility' })).toBeVisible();
  await expect(component.getByRole('link', { name: 'Contact' })).toHaveAttribute(
    'href',
    'mailto:amielnoy@gmail.com',
  );
});
