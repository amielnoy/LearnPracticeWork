import { useEffect, useState } from 'react';
import { useLocale } from '../context/LocaleContext';

export function BackToTop() {
  const { locale } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(document.documentElement.scrollTop > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`fab to-top${show ? ' show' : ''}`}
      aria-label={locale.ui.toTop}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ↑
    </button>
  );
}
