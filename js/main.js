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

  // --- Mega-menu (abas da estrutura) ---
  const menuBtn = document.getElementById('menuBtn');
  const menuDrawer = document.getElementById('menuDrawer');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuLinks = menuDrawer ? menuDrawer.querySelectorAll('a') : [];

  const isMenuOpen = () => menuDrawer?.classList.contains('open');
  const openMenu = () => {
    if (!menuDrawer) return;
    menuDrawer.classList.add('open');
    menuOverlay?.removeAttribute('hidden');
    menuOverlay?.classList.add('open');
    menuBtn?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    if (!menuDrawer) return;
    menuDrawer.classList.remove('open');
    menuOverlay?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // esconde o overlay depois da transição
    setTimeout(() => { if (!isMenuOpen()) menuOverlay?.setAttribute('hidden', ''); }, 300);
  };
  const toggleMenu = () => (isMenuOpen() ? closeMenu() : openMenu());

  menuBtn?.addEventListener('click', toggleMenu);
  menuOverlay?.addEventListener('click', closeMenu);
  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

  // Fecha com Escape
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

  // --- Pop-up Lista VIP (captura de lead) ---
  initVipModal();
});

function initVipModal() {
  const modal = document.getElementById('vipModal');
  if (!modal) return;

  const card = modal.querySelector('.vip-modal-card');
  const form = document.getElementById('vipForm');
  const bodyEl = modal.querySelector('.vip-modal-body');
  const successEl = modal.querySelector('.vip-modal-success');
  const errorEl = document.getElementById('vipFormError');
  const submitBtn = form ? form.querySelector('.vip-form-submit') : null;
  const labelEl = submitBtn ? submitBtn.querySelector('.vip-submit-label') : null;
  const loadingEl = submitBtn ? submitBtn.querySelector('.vip-submit-loading') : null;

  const STORAGE_KEY = 'nutrire_vip_lead';
  let lastFocused = null;

  const openModal = () => {
    lastFocused = document.activeElement;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    // força reflow para animar
    void modal.offsetWidth;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const firstInput = form ? form.querySelector('input') : null;
    if (firstInput) setTimeout(() => firstInput.focus(), 120);
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.hidden = true;
      modal.setAttribute('aria-hidden', 'true');
    }, 320);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  // Abrir: qualquer elemento com [data-vip-open]
  document.querySelectorAll('[data-vip-open]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Fechar: overlay, X, botões [data-vip-close]
  modal.querySelectorAll('[data-vip-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // Auto-abrir uma vez por visitante (se ainda não cadastrou), após 12s
  const alreadyLead = () => {
    try { return localStorage.getItem(STORAGE_KEY) === 'done'; } catch (_) { return false; }
  };
  const autoShownKey = 'nutrire_vip_autoshown';
  const wasAutoShown = () => {
    try { return sessionStorage.getItem(autoShownKey) === '1'; } catch (_) { return false; }
  };
  if (!alreadyLead() && !wasAutoShown()) {
    setTimeout(() => {
      if (modal.hidden && !alreadyLead()) {
        openModal();
        try { sessionStorage.setItem(autoShownKey, '1'); } catch (_) {}
      }
    }, 3000);
  }

  if (!form) return;

  const showError = (msg) => {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.hidden = false;
  };
  const clearError = () => { if (errorEl) errorEl.hidden = true; };

  const isValidEmail = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
  const digits = (v) => (v || '').replace(/\D/g, '');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();
    const email = form.email.value.trim();

    [form.nome, form.telefone, form.email].forEach((i) => i.classList.remove('is-invalid'));

    if (!nome) { form.nome.classList.add('is-invalid'); showError('Por favor, informe seu nome.'); form.nome.focus(); return; }
    if (digits(telefone).length < 10) { form.telefone.classList.add('is-invalid'); showError('Informe um telefone válido com DDD.'); form.telefone.focus(); return; }
    if (!isValidEmail(email)) { form.email.classList.add('is-invalid'); showError('Informe um e-mail válido.'); form.email.focus(); return; }

    // estado de carregando
    if (submitBtn) submitBtn.disabled = true;
    if (labelEl) labelEl.hidden = true;
    if (loadingEl) loadingEl.hidden = false;

    try {
      const resp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone, email, origem: 'popup-site' }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) throw new Error(data.error || 'Não foi possível enviar. Tente novamente.');

      try { localStorage.setItem(STORAGE_KEY, 'done'); } catch (_) {}

      // mostra estado de sucesso
      if (bodyEl) bodyEl.hidden = true;
      if (successEl) successEl.hidden = false;
      if (window.lucide) window.lucide.createIcons();
    } catch (err) {
      showError(err.message || 'Erro ao enviar. Tente novamente.');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (labelEl) labelEl.hidden = false;
      if (loadingEl) loadingEl.hidden = true;
    }
  });
}

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
