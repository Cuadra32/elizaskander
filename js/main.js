// Mobile nav toggle
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// Scroll reveal via IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => obs.observe(el));
}

// Register service worker (PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// PWA install prompt — shows after 30 seconds
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(() => {
    if (deferredPrompt && !localStorage.getItem('pwa-dismissed')) {
      const banner = document.createElement('div');
      banner.id = 'pwa-banner';
      banner.innerHTML = `<div style="position:fixed;bottom:60px;left:16px;right:16px;z-index:9998;background:#242422;border:0.5px solid rgba(200,169,110,0.3);border-radius:14px;padding:16px 18px;display:flex;align-items:center;gap:14px;box-shadow:0 8px 32px rgba(0,0,0,0.4);">
        <img src="/icons/icon-192.png" style="width:44px;height:44px;border-radius:10px;flex-shrink:0;" />
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:500;color:#fff;margin-bottom:2px;">Add to your home screen</div>
          <div style="font-size:11px;color:#8a8880;">Recipes, workouts & more — works like an app</div>
        </div>
        <button onclick="deferredPrompt.prompt();document.getElementById('pwa-banner').remove();localStorage.setItem('pwa-dismissed','true')" style="background:#C8A96E;color:#161614;border:none;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;">Add</button>
        <button onclick="document.getElementById('pwa-banner').remove();localStorage.setItem('pwa-dismissed','true')" style="background:none;border:none;color:#8a8880;font-size:20px;cursor:pointer;padding:0 6px;line-height:1;">×</button>
      </div>`;
      document.body.appendChild(banner);
    }
  }, 30000);
});

// Cookie consent banner (Swiss nLPD compliance)
(function() {
  if (localStorage.getItem('cookie-consent')) return;
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <div style="position:fixed;bottom:0;left:0;right:0;z-index:9999;background:rgba(22,22,20,0.97);border-top:0.5px solid rgba(200,169,110,0.2);padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;backdrop-filter:blur(12px);">
      <p style="font-size:13px;color:#8a8880;margin:0;line-height:1.5;max-width:680px;">This website uses no tracking cookies. We only collect data you submit via the contact form. <a href="/pages/privacy.html" style="color:#C8A96E;">Privacy Policy</a></p>
      <button onclick="document.getElementById('cookie-banner').remove();localStorage.setItem('cookie-consent','true')" style="background:#C8A96E;color:#161614;font-family:inherit;font-size:12px;font-weight:500;padding:10px 22px;border:none;border-radius:50px;cursor:pointer;white-space:nowrap;flex-shrink:0;">Got it</button>
    </div>
  `;
  document.body.appendChild(banner);
})();

