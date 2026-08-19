import { useEffect, useState, useCallback } from 'react';
import { useLocale } from '../context/LocaleContext';
import { GoogleSignIn } from './GoogleSignIn';

interface NavProps {
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  theme: string;
  onToggleTheme: () => void;
}

export function Nav({ setNavOpen, theme, onToggleTheme }: NavProps) {
  const { locale, lang: _lang, switchLang: doSwitchLang, S } = useLocale();
  const [activeSection, setActiveSection] = useState<string>('');
  const [sectionNums, setSectionNums] = useState<Record<string, string>>({});

  // Scroll-spy: highlight active section
  useEffect(() => {
    const sectionIds = locale.nav.links.map(l => l.href.slice(1));

    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            setActiveSection(en.target.id);
          }
        });
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [locale.nav.links]);

  // Read section number chips from DOM (after sections have mounted)
  useEffect(() => {
    const nums: Record<string, string> = {};
    locale.nav.links.forEach(link => {
      const id = link.href.slice(1);
      const el = document.getElementById(id);
      const num = el?.querySelector('.num')?.textContent?.trim() || '';
      if (num) nums[id] = num;
    });
    setSectionNums(nums);
  }, [locale.nav.links]);

  const handleNavLinkClick = useCallback(() => {
    setNavOpen(false);
  }, [setNavOpen]);

  const dark = theme === 'dark';
  const themeIcon = dark ? '☀️' : '🌙';
  const themeLabel = dark ? S.themeLabelLight : S.themeLabelDark;

  return (
    <nav id="nav" aria-label="Primary">
      <a
        className="logo"
        href="#"
        style={{ textDecoration: 'none', display: 'block', marginBottom: '8px' }}
      >
        {locale.nav.logo}
      </a>

      <span className="nav-group" style={{ paddingTop: '2px' }}>
        {locale.nav.agentsGroup}
      </span>

      {locale.nav.links.map(link => {
        const id = link.href.slice(1);
        const num = sectionNums[id];
        return (
          <a
            key={link.href}
            className={`link${activeSection === id ? ' active' : ''}`}
            href={link.href}
            onClick={handleNavLinkClick}
          >
            {num && (
              <span className="nav-num" aria-hidden="true">
                {num}
              </span>
            )}
            {link.label}
          </a>
        );
      })}

      <span className="nav-group">{locale.nav.communityGroup}</span>

      {locale.nav.community.map(link => (
        <a
          key={link.href}
          className={`link ${link.cls}`}
          href={link.href}
          target={link.target}
          rel="noopener noreferrer"
        >
          {link.label}
        </a>
      ))}

      <button
        type="button"
        id="themeToggle"
        className="theme-toggle"
        aria-label={locale.nav.themeToggle.ariaLabel}
        onClick={onToggleTheme}
      >
        <span id="themeIcon">{themeIcon}</span>
        <span id="themeLabel">{themeLabel}</span>
      </button>

      <button
        type="button"
        id="langToggle"
        className="theme-toggle"
        aria-label={locale.nav.langToggle.ariaLabel}
        onClick={doSwitchLang}
      >
        <span id="langIcon">🌐</span>
        <span id="langLabel">{locale.nav.langToggle.label}</span>
      </button>

      <GoogleSignIn />
    </nav>
  );
}

export function NavToggle({ navOpen, onToggle }: { navOpen: boolean; onToggle: () => void }) {
  const { locale } = useLocale();
  // The toggle floats over the content on phones, so it retracts while the
  // reader scrolls down into a section and comes back on any upward scroll —
  // the same reflex as a mobile app bar. It always stays put near the top of
  // the page and whenever the drawer is open.
  const [tucked, setTucked] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (Math.abs(delta) > 6) {
        setTucked(y > 160 && delta > 0);
        last = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`fab nav-toggle${tucked && !navOpen ? ' tucked' : ''}`}
      id="navToggle"
      aria-label={locale.ui.navOpen}
      aria-expanded={navOpen}
      onClick={onToggle}
    >
      {navOpen ? '✕' : '☰'}
    </button>
  );
}

export function NavScrim({
  navOpen: _navOpen,
  onClose,
}: {
  navOpen: boolean;
  onClose: () => void;
}) {
  return <div className="nav-scrim" id="navScrim" onClick={onClose} aria-hidden="true" />;
}
