/* ============================================================
   ROMÁN LUNA SOTO — PORTFOLIO JAVASCRIPT
   ============================================================ */

'use strict';

/* ============================================================
   CANVAS PARTICLE NETWORK
   ============================================================ */
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, mouse = { x: null, y: null };
  const PARTICLE_COUNT = 80;
  const CONNECT_DIST = 160;
  const MOUSE_REPEL = 120;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = Math.random() * 1.8 + 0.6;
    this.pulse = Math.random() * Math.PI * 2;
  }

  Particle.prototype.update = function() {
    this.pulse += 0.02;

    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_REPEL) {
        const force = (MOUSE_REPEL - dist) / MOUSE_REPEL * 0.8;
        this.vx += (dx / dist) * force * 0.3;
        this.vy += (dy / dist) * force * 0.3;
      }
    }

    this.vx *= 0.98;
    this.vy *= 0.98;

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) { this.x = 0; this.vx *= -1; }
    if (this.x > W) { this.x = W; this.vx *= -1; }
    if (this.y < 0) { this.y = 0; this.vy *= -1; }
    if (this.y > H) { this.y = H; this.vy *= -1; }
  };

  Particle.prototype.draw = function() {
    const alpha = 0.4 + Math.sin(this.pulse) * 0.2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
    ctx.fill();
  };

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
    animate();
  }

  window.addEventListener('resize', () => {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  });

  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  init();
})();

/* ============================================================
   TYPED TEXT EFFECT
   ============================================================ */
(function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const strings = [
    'Software Engineer',
    'Smart City Solutions',
    'IoT & Monitoring Systems',
    'Full Stack Developer',
    'Instructor de Informática',
    'Líder Técnico'
  ];

  let sIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = strings[sIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
    } else {
      el.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        sIdx = (sIdx + 1) % strings.length;
      }
    }
    setTimeout(type, deleting ? 45 : 80);
  }

  setTimeout(type, 600);
})();

/* ============================================================
   NAVIGATION SCROLL BEHAVIOR
   ============================================================ */
(function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ============================================================
   MOBILE MENU
   ============================================================ */
(function initMobileMenu() {
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ============================================================
   INTERSECTION OBSERVER — FADE UP ANIMATIONS
   ============================================================ */
(function initObserver() {
  const items = document.querySelectorAll('.fade-up');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  items.forEach((el, i) => {
    const parent = el.parentElement;
    const siblings = parent ? [...parent.querySelectorAll('.fade-up')] : [];
    const sibIdx = siblings.indexOf(el);
    if (sibIdx > 0) el.dataset.delay = sibIdx * 80;
    observer.observe(el);
  });
})();

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const dur   = 1800;
        const step  = dur / target;
        let current = 0;

        const update = () => {
          current += Math.ceil(target / 60);
          if (current >= target) { el.textContent = target; return; }
          el.textContent = current;
          setTimeout(update, step);
        };
        setTimeout(update, 200);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ============================================================
   SKILL BARS
   ============================================================ */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const w  = el.dataset.w;
        setTimeout(() => { el.style.width = w + '%'; }, 200);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   CONTACT FORM
   ============================================================ */
(function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;

    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    /* Formspree integration — replace YOUR_FORM_ID with your actual Formspree endpoint
       or handle via your own backend */
    const formspreeId = 'YOUR_FORM_ID';

    try {
      if (formspreeId !== 'YOUR_FORM_ID') {
        const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error('Error al enviar');
      }

      // Show success (works even without Formspree for demo)
      form.style.display = 'none';
      success.classList.add('visible');
    } catch (err) {
      btn.innerHTML = originalText;
      btn.disabled = false;
      alert('Hubo un error al enviar el mensaje. Por favor inténtalo de nuevo o escríbeme directamente.');
    }
  });
})();

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__link');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => {
          l.style.color = '';
          if (l.getAttribute('href') === `#${id}`) {
            l.style.color = 'var(--white)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ============================================================
   HERO INITIAL ANIMATIONS — stagger on load
   ============================================================ */
window.addEventListener('load', () => {
  const items = document.querySelectorAll('.hero .fade-up');
  items.forEach((el, i) => {
    setTimeout(() => {
      el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms,
                             transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 100}ms`;
      el.classList.add('visible');
    }, 200 + i * 100);
  });
});

/* ============================================================
   FOOTER YEAR
   ============================================================ */
document.getElementById('footerYear').textContent = new Date().getFullYear();
