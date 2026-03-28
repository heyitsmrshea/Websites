
const body = document.body;
const template = body.dataset.template;

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const href = anchor.getAttribute('href');
    const target = href ? document.querySelector(href) : null;
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


const slides = Array.from(document.querySelectorAll('[data-review-section^="slide-"]'));
let activeIndex = 0;

function focusSlide(index) {
  activeIndex = Math.max(0, Math.min(slides.length - 1, index));
  slides[activeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault();
    focusSlide(activeIndex + 1);
  }
  if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
    event.preventDefault();
    focusSlide(activeIndex - 1);
  }
});

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const found = slides.indexOf(entry.target);
      if (found >= 0) activeIndex = found;
    }
  }
}, { threshold: 0.55 });

slides.forEach((slide) => observer.observe(slide));


