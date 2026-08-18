/* ============================================
   NUTRIRE 360 — Institucional
   Complementa js/main.js: só aplica o reveal on
   scroll nas seções novas (serviços, programas,
   profissionais e localização).
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll(
    '.block-head, .svc-card, .proc-card, .prog-card, .pro-card, .loc-grid, .programs-note'
  );

  if (
    !targets.length ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    return;
  }

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i % 3, 2) * 80}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
});
