(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile nav toggle
  navToggle.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  function closeNav() {
    mainNav.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Smooth scroll + close mobile nav on link click
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      closeNav();

      const headerHeight = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // Close nav on outside click
  document.addEventListener('click', function (e) {
    if (mainNav.classList.contains('open') &&
        !mainNav.contains(e.target) &&
        !navToggle.contains(e.target)) {
      closeNav();
    }
  });

  // Header shadow on scroll
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // Scroll-spy: highlight active nav link
  function updateActiveNav() {
    const scrollPos = window.scrollY + header.offsetHeight + 100;

    let current = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Generate QR code pattern (simple visual placeholder)
  function generateQRCode() {
    const container = document.getElementById('qr-code');
    if (!container) return;

    const size = 21;
    const pattern = [
      '111111100010001001111',
      '100000100110101001000',
      '101110100001101101110',
      '101110100110001101110',
      '101110100101100101110',
      '100000100010001001000',
      '111111101010101011111',
      '000000001101100100000',
      '110011010010110011001',
      '001100101101001100110',
      '100101100011001011010',
      '010010110100101100101',
      '110100011001100110010',
      '000000001011010100000',
      '111111101100100011111',
      '100000100011100001000',
      '101110100101001101110',
      '101110100110100101110',
      '101110100001011101110',
      '100000100110110001000',
      '111111100101001001111'
    ];

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = document.createElement('div');
        cell.className = 'qr-cell';
        if (pattern[row] && pattern[row][col] === '1') {
          cell.classList.add('filled');
        }
        container.appendChild(cell);
      }
    }
  }

  generateQRCode();
})();
