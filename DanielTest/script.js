/* ============================================
   NorthAxis.Digital — Interactions & Animations
   Kinetic Noir Framework
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (revealElements.length > 0 && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal--visible'));
  }

  // --- Nav Background on Scroll ---
  const nav = document.querySelector('.nav-main');
  if (nav) {
    const handleNavScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('border-b', 'border-white/5');
        nav.style.backgroundColor = 'rgba(14, 14, 14, 0.85)';
      } else {
        nav.classList.remove('border-b', 'border-white/5');
        nav.style.backgroundColor = 'rgba(14, 14, 14, 0.6)';
      }
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('mobile-menu--open');
      hamburger.classList.toggle('hamburger--open');
      mobileMenu.classList.toggle('mobile-menu--open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('hamburger--open');
        mobileMenu.classList.remove('mobile-menu--open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Contact Form Handling ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (!submitBtn) return;

      // Store original text
      const originalText = submitBtn.textContent.trim();

      // Update button to success state using safe DOM methods
      submitBtn.textContent = '';
      const checkIcon = document.createElement('span');
      checkIcon.className = 'material-symbols-outlined';
      checkIcon.textContent = 'check_circle';
      submitBtn.appendChild(checkIcon);
      submitBtn.appendChild(document.createTextNode(' Inquiry Sent!'));
      submitBtn.style.pointerEvents = 'none';
      submitBtn.classList.add('btn-glow-pulse');

      setTimeout(() => {
        // Restore original state
        submitBtn.textContent = '';
        const arrowIcon = document.createElement('span');
        arrowIcon.className = 'material-symbols-outlined group-hover:translate-x-1 transition-transform';
        arrowIcon.textContent = 'arrow_forward';
        submitBtn.appendChild(document.createTextNode('Send Inquiry '));
        submitBtn.appendChild(arrowIcon);
        submitBtn.style.pointerEvents = '';
        submitBtn.classList.remove('btn-glow-pulse');
        contactForm.reset();
      }, 3500);
    });
  }

  // --- Back to Top Button ---
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const handleBackToTopVisibility = () => {
      backToTop.classList.toggle('back-to-top--visible', window.scrollY > 600);
    };
    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    handleBackToTopVisibility();

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Counter Animation for Stats ---
  const statElements = document.querySelectorAll('[data-count]');
  if (statElements.length > 0 && !prefersReducedMotion) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            let current = 0;
            const step = Math.ceil(target / 40);
            const interval = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(interval);
              }
              el.textContent = current + suffix;
            }, 30);
            countObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    statElements.forEach(el => countObserver.observe(el));
  }

});
