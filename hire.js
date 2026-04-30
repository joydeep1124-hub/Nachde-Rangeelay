// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===== MOBILE DRAWER =====
const drawer = document.getElementById('mobileDrawer');
const overlay = document.getElementById('menuOverlay');
const hamburger = document.getElementById('hamburger');

drawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.innerHTML = '&#9776;';
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));
