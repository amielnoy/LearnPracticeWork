import { useEffect, useState, useCallback, useRef, type RefObject } from 'react';
import { useLocale } from '../../context/LocaleContext';
import { GoogleSignIn } from '../account/GoogleSignIn';
import { SECTIONS } from '../../lib/sections';

/**
 * The width at which the sidebar becomes a drawer.
 *
 * It has to be this number and not the 768 in `use-mobile`: below 900px the
 * stylesheet slides the nav off-screen (`app.css`, the `max-width:900px`
 * block), and the two behaviours that depend on it here — trapping focus out of
 * a hidden drawer, and returning it afterwards — are wrong by exactly the
 * 768–900 band if they disagree with the CSS.
 */
const DRAWER_MEDIA = '(max-width: 900px)';

function useDrawerMode(): boolean {
  const [drawer, setDrawer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DRAWER_MEDIA).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(DRAWER_MEDIA);
    const onChange = (event: MediaQueryListEvent) => setDrawer(event.matches);
    setDrawer(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return drawer;
}

interface NavProps {
  navOpen: boolean;
  setNavOpen: (open: boolean) => void;
  theme: string;
  onToggleTheme: () => void;
  toggleRef: RefObject<HTMLButtonElement | null>;
}

export function Nav({ navOpen, setNavOpen, theme, onToggleTheme, toggleRef }: NavProps) {
  const { locale, switchLang: doSwitchLang, S } = useLocale();
  const [activeSection, setActiveSection] = useState<string>('');
  const drawerMode = useDrawerMode();
  const navRef = useRef<HTMLElement>(null);

  // Closed at drawer widths, the nav is only moved off-screen by a transform:
  // it stays visible and focusable, so a keyboard user used to travel through
  // twelve controls they could not see before reaching the page. `inert` takes
  // the whole subtree out of focus and out of the accessibility tree, and it
  // inherits, so nothing inside needs its own attribute.
  const hidden = drawerMode && !navOpen;

  // Scroll-spy: highlight active section
  useEffect(() => {
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

    SECTIONS.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  // Escape closes the drawer. It behaves as a modal at these widths — it locks
  // body scroll and lays a scrim over the page — so the key that dismisses
  // every other modal has to dismiss this one.
  useEffect(() => {
    if (!navOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setNavOpen(false);
        return;
      }
      if (event.key === 'Tab' && drawerMode && navRef.current) {
        const focusable = [
          ...navRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navOpen, drawerMode, setNavOpen]);

  // Focus follows the drawer: into it on open, back to the button that opened
  // it on close. Without the second half, dismissing the drawer drops focus on
  // <body> and the next Tab restarts from the top of the document.
  //
  // The return is keyed off the open -> closed transition rather than off where
  // focus currently is. By the time this effect runs React has already applied
  // `inert`, and the browser blurs whatever was inside the subtree when it
  // does, so there is nothing left to recognise as "focus was in the drawer" —
  // testing for it is why the return silently did nothing. Tracking the
  // transition also keeps a drawer that was never open from stealing focus on
  // mount, and from stealing it again on every unrelated re-render.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (!drawerMode) {
      wasOpen.current = navOpen;
      return;
    }
    if (navOpen) {
      document.querySelector<HTMLAnchorElement>('#nav a.link')?.focus();
    } else if (wasOpen.current) {
      toggleRef.current?.focus();
    }
    wasOpen.current = navOpen;
  }, [navOpen, drawerMode, toggleRef]);

  const handleNavLinkClick = useCallback(() => {
    setNavOpen(false);
  }, [setNavOpen]);

  const dark = theme === 'dark';
  const themeIcon = dark ? '☀️' : '🌙';
  const themeLabel = dark ? S.themeLabelLight : S.themeLabelDark;

  return (
    <nav
      ref={navRef}
      id="nav"
      role={drawerMode && navOpen ? 'dialog' : undefined}
      aria-label="Primary"
      aria-modal={drawerMode && navOpen ? true : undefined}
      inert={hidden}
    >
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

      {/* Order, labels and numbering all come from SECTIONS, which is also what
          HomePage renders from — so the list cannot fall out of step with the
          page the way it used to. The number is the section's own, not this
          list's position, which is why it is read rather than counted. */}
      {SECTIONS.map(section => (
        <a
          key={section.id}
          className={`link${activeSection === section.id ? ' active' : ''}`}
          href={`#${section.id}`}
          onClick={handleNavLinkClick}
        >
          <span className="nav-num" aria-hidden="true">
            {section.num}
          </span>
          {locale.nav.labels[section.id]}
        </a>
      ))}

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

export function NavToggle({
  navOpen,
  onToggle,
  buttonRef,
}: {
  navOpen: boolean;
  onToggle: () => void;
  buttonRef: RefObject<HTMLButtonElement | null>;
}) {
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
      ref={buttonRef}
      type="button"
      className={`fab nav-toggle${tucked && !navOpen ? ' tucked' : ''}`}
      id="navToggle"
      // The label has to follow the state it is paired with: announced together
      // with aria-expanded, a fixed "Open navigation menu" reads as "Open
      // navigation menu, expanded" once the drawer is open.
      aria-label={navOpen ? locale.ui.navClose : locale.ui.navOpen}
      aria-expanded={navOpen}
      aria-controls="nav"
      onClick={onToggle}
    >
      {navOpen ? '✕' : '☰'}
    </button>
  );
}

export function NavScrim({ onClose }: { onClose: () => void }) {
  return <div className="nav-scrim" id="navScrim" onClick={onClose} aria-hidden="true" />;
}
