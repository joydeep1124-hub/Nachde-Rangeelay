// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== HERO VIDEO SCROLL FADE =====
const heroVideo = document.getElementById('hero-video');
const heroContent = document.getElementById('heroContent');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroH = heroSection.offsetHeight;

  // fade video out over first 60% of hero height
  const videoFade = Math.max(0, 1 - scrollY / (heroH * 0.6));
  heroVideo.style.opacity = videoFade;

  // subtle parallax on hero content (drift upward slower than scroll)
  const parallax = scrollY * 0.35;
  heroContent.style.transform = `translateY(${parallax}px)`;
}, { passive: true });

// ===== PHOTO BURST =====
const burstPhotos = document.querySelectorAll('.burst-photo');

const burstObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const idx = parseInt(entry.target.dataset.idx, 10);
      setTimeout(() => entry.target.classList.add('popped'), idx * 110);
      burstObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

burstPhotos.forEach(el => burstObserver.observe(el));

// ===== GENERIC SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.class-card, .review-card, .gallery-item, .info-item, .about-text, .about-visual, .contact-form-wrap'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== SUPABASE =====
const SUPABASE_URL = 'https://ehncoktssmxbtlmtcwyb.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_jK219GKnvBcmGo3zUqkh4A_3gA1K6bT';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const [nameEl, emailEl] = form.querySelectorAll('input[type="text"], input[type="email"]');
  const phoneEl = form.querySelector('input[type="tel"]');
  const interestEl = form.querySelector('select');
  const messageEl = form.querySelector('textarea');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const { error } = await supabase.from('contact_submissions').insert({
    name: nameEl.value.trim(),
    email: emailEl.value.trim(),
    phone: phoneEl.value.trim(),
    interest: interestEl.value || null,
    message: messageEl.value.trim() || null,
  });

  if (error) {
    console.error('Submission error:', error);
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
    alert('Something went wrong. Please try again or call us directly.');
    return;
  }

  form.style.display = 'none';
  formSuccess.classList.remove('hidden');
});
