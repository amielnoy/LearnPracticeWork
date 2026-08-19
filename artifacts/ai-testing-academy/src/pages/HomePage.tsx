import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocale } from '../context/LocaleContext';
import { ScrollProgress } from '../components/ScrollProgress';
import { BackToTop } from '../components/BackToTop';
import { Nav, NavToggle, NavScrim } from '../components/Nav';
import { Hero } from '../components/Hero';
import { Footer } from '../components/Footer';
import { ConnectionSetup } from '../components/ConnectionSetup';
import { ResumeAgent } from '../components/ResumeAgent';
import { LectureSeries } from '../components/LectureSeries';
import { InterviewAgent } from '../components/InterviewAgent';
import { QuestionBank } from '../components/QuestionBank';
import { CodingChallenges } from '../components/CodingChallenges';
import { ToolLauncher } from '../components/ToolLauncher';
import { useProviderContext } from '../context/ProviderContext';
import { readOneOf, writeRaw } from '../lib/storage';

const THEME_KEY = 'ata_theme';

/**
 * The only two values that may reach `data-theme`.
 *
 * Whatever is in storage ends up as an attribute on the document element, and
 * storage is editable, so an unchecked read means any string at all can be
 * written there — with no way back short of clearing site data, since the
 * toggle below only ever flips between these two.
 */
const THEMES = ['light', 'dark'] as const;
type Theme = (typeof THEMES)[number];

export function HomePage() {
  const { locale } = useLocale();
  const { quotaExhausted, serverConfigLoaded, hasServerDefault } = useProviderContext();

  // Theme
  //
  // The head script in index.html has already resolved this and stamped it on
  // <html> before first paint — it has to, because the page ships a static
  // prerender and would otherwise paint finished content in the wrong palette.
  // So the attribute is the answer; re-deriving it here would just be a second
  // copy of the same priority rules, free to disagree with the first.
  const [theme, setTheme] = useState<Theme>(() => {
    const stamped = document.documentElement.getAttribute('data-theme');
    if (stamped === 'light' || stamped === 'dark') return stamped;
    // Only reachable if the head script did not run.
    const saved = readOneOf(localStorage, THEME_KEY, THEMES);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Nav drawer. The toggle's ref is held here rather than inside NavToggle
  // because Nav needs it too: closing the drawer has to put focus back on the
  // button that opened it, and the two are siblings.
  const [navOpen, setNavOpen] = useState(false);
  const navToggleRef = useRef<HTMLButtonElement>(null);

  // Apply theme to <html>, and keep the browser chrome in step with it.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#17151c' : '#fbf7f2');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      writeRaw(localStorage, THEME_KEY, next);
      return next;
    });
  }, []);

  // nav-ready class: delay transition so drawer doesn't flash on initial load
  useEffect(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => document.body.classList.add('nav-ready')),
    );
    return () => document.body.classList.remove('nav-ready');
  }, []);

  // Apply nav-open to body
  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen);
  }, [navOpen]);

  // Cleanup body classes on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('nav-open', 'nav-ready');
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {locale.ui.skip}
      </a>
      <ScrollProgress />
      <NavToggle navOpen={navOpen} onToggle={() => setNavOpen(v => !v)} buttonRef={navToggleRef} />
      <NavScrim onClose={() => setNavOpen(false)} />
      <BackToTop />

      <Nav
        navOpen={navOpen}
        setNavOpen={setNavOpen}
        theme={theme}
        onToggleTheme={toggleTheme}
        toggleRef={navToggleRef}
      />

      <Hero />

      {/* Section order is `lib/sections.ts` and nothing else — the nav renders
          from the same list, so the two cannot drift apart again. Keep this
          block in step with it when the order changes. ToolLauncher is the hub
          rather than a numbered section, so it is not in that list and stays
          at the top. */}
      <main id="main-content">
        <ToolLauncher />
        <ResumeAgent />
        <LectureSeries />
        <InterviewAgent />
        <QuestionBank />
        <CodingChallenges />
        <ConnectionSetup
          collapsed
          forceOpen={quotaExhausted || (serverConfigLoaded && !hasServerDefault('groq'))}
        />
      </main>

      <Footer />
    </>
  );
}
