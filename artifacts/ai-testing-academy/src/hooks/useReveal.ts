import { useEffect, useRef } from 'react';

/**
 * Attaches scroll-reveal: the returned ref should be applied to a section element.
 * All direct children matching the reveal selector inside that section will
 * animate in with the .reveal class.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const targets = section.querySelectorAll('h2, .lead, .card, .agent-box, pre, table, h3, ul, p, img');
    const io = new IntersectionObserver(
      es =>
        es.forEach(en => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return ref;
}
