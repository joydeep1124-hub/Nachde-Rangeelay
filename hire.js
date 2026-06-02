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

// ===== VIDEO REEL =====
function initReel(id) {
  const reel = document.getElementById(id);
  if (!reel) return;
  const videos = Array.from(reel.querySelectorAll('video'));
  const dotsEl = reel.querySelector('.reel-dots');
  let current = 0;

  videos.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'reel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    videos[current].classList.remove('active');
    videos[current].pause();
    dotsEl.children[current].classList.remove('active');
    current = (index + videos.length) % videos.length;
    videos[current].classList.add('active');
    dotsEl.children[current].classList.add('active');
  }

  reel.querySelector('.reel-prev').addEventListener('click', () => goTo(current - 1));
  reel.querySelector('.reel-next').addEventListener('click', () => goTo(current + 1));
}

initReel('reel-5');
