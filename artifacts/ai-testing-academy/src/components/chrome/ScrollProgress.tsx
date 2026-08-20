import { useEffect, useRef } from 'react';

/**
 * The reading-progress bar across the top of the page.
 *
 * The width is written straight to the element rather than held in state. It
 * used to be a `useState` string set from the scroll handler, which re-rendered
 * this component on every scroll event of a very long page for a value that
 * only ever reaches one CSS property. Writing it in the handler and reading the
 * scroll position inside a rAF also means at most one measurement per frame,
 * which keeps the layout read off the scroll callback's critical path.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;
      const root = document.documentElement;
      const max = root.scrollHeight - root.clientHeight;
      bar.style.width = `${max > 0 ? (root.scrollTop / max) * 100 : 0}%`;
    };

    const onScroll = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" style={{ width: 0 }} aria-hidden="true" />;
}
