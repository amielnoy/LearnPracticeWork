import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [width, setWidth] = useState('0%');

  useEffect(() => {
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      setWidth((max > 0 ? (root.scrollTop / max) * 100 : 0) + '%');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress" style={{ width }} aria-hidden="true" />;
}
