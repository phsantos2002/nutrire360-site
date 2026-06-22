/* ============================================
   NUTRIRE 360 — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- Navbar scroll behavior ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Menu drawer ---
  const menuBtn = document.getElementById('menuBtn');
  const menuDrawer = document.getElementById('menuDrawer');
  const menuClose = document.getElementById('menuClose');
  const menuLinks = document.querySelectorAll('.menu-links a');

  const openMenu = () => {
    menuDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    menuDrawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuBtn?.addEventListener('click', openMenu);
  menuClose?.addEventListener('click', closeMenu);
  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

  // Close on backdrop click (Escape key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // --- Hero dots (simple visual rotation - decorative) ---
  const dots = document.querySelectorAll('.hero-dots .dot');
  if (dots.length > 1) {
    let activeIndex = 0;
    setInterval(() => {
      dots[activeIndex].classList.remove('active');
      activeIndex = (activeIndex + 1) % dots.length;
      dots[activeIndex].classList.add('active');
    }, 3500);
  }

  // --- Reveal on scroll (elegância na entrada das seções) ---
  const revealTargets = document.querySelectorAll(
    '.section-heading, .service-card, .blog-card, .about-text, .about-video, ' +
    '.plans-card, .location-grid, .hero-text'
  );

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    revealTargets.forEach((el, i) => {
      el.classList.add('reveal');
      // leve escalonamento entre cards irmãos
      el.style.transitionDelay = `${Math.min(i % 4, 3) * 90}ms`;
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Reveal das seções de pré-lançamento (reusa .reveal/.in-view) ---
  const phReveal = document.querySelectorAll(
    '.manifesto-item, .pillar-card, .vip-card, .team-card, ' +
    '.coming-text, .coming-visual, .final-cta-inner'
  );
  if (
    phReveal.length &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    'IntersectionObserver' in window
  ) {
    phReveal.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i % 3, 2) * 90}ms`;
    });
    const phObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            phObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    phReveal.forEach((el) => phObserver.observe(el));
  }
});

// === Countdown (pré-lançamento) ===
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const launchAttr = el.getAttribute('data-launch');
  const target = launchAttr ? new Date(launchAttr).getTime() : NaN;
  if (isNaN(target)) {
    // fallback: mostrar "Em breve" se a data for inválida ou nula
    el.innerHTML = '<span class="countdown-soon">Em breve</span>';
    return;
  }
  const tick = () => {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      el.innerHTML = '<span class="countdown-soon">Estamos abertos!</span>';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
  };
  tick();
  setInterval(tick, 1000);
}
initCountdown();
