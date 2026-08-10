import { useState, useEffect, useCallback } from 'react';
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

const THEME_KEY = 'ata_theme';

export function HomePage() {
  const { locale } = useLocale();
  const { quotaExhausted, serverConfigLoaded, hasServerDefault } = useProviderContext();

  // Theme
  const [theme, setTheme] = useState<string>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Nav drawer
  const [navOpen, setNavOpen] = useState(false);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
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
      <NavToggle navOpen={navOpen} onToggle={() => setNavOpen(v => !v)} />
      <NavScrim navOpen={navOpen} onClose={() => setNavOpen(false)} />
      <BackToTop />

      <Nav navOpen={navOpen} setNavOpen={setNavOpen} theme={theme} onToggleTheme={toggleTheme} />

      <Hero />

      <main id="main-content">
        <ToolLauncher />
        <ResumeAgent />
        <InterviewAgent />
        <QuestionBank />
        <CodingChallenges />
        <LectureSeries />
        <ConnectionSetup
          collapsed
          forceOpen={quotaExhausted || (serverConfigLoaded && !hasServerDefault('gemini'))}
        />
      </main>

      <Footer />
    </>
  );
}
