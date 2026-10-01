/**
 * initScrollAnimations — attaches an IntersectionObserver to all
 * [data-animate] elements so they fade/slide in when scrolled into view.
 *
 * Elements already in the viewport when observed are immediately marked
 * as in-view. Safe to call multiple times — skips already-observed elements.
 */
export function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]:not(.observed)');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  elements.forEach((el) => {
    el.classList.add('observed');
    observer.observe(el);
    // If element is already in viewport (e.g. above the fold), show it immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('in-view');
    }
  });

  return observer;
}
