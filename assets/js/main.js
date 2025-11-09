// Main JavaScript file - Veer Patta Public School
// Handles animations, counters, scroll observers, and interactivity

/* ============================================
   INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
   ============================================ */
(function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately for older browsers
    document.querySelectorAll('.animate-on-scroll, .animate-fadeUp, .animate-slideIn, .animate-scaleIn').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-fadeUp, .animate-slideIn, .animate-scaleIn, .section, .stat, .stat-card, .program, .program-card'
  );

  animatedElements.forEach(el => {
    // Add base animation class if not present
    if (!el.classList.contains('animate-on-scroll') &&
        !el.classList.contains('animate-fadeUp') &&
        !el.classList.contains('animate-slideIn') &&
        !el.classList.contains('animate-scaleIn')) {
      el.classList.add('animate-fadeUp');
    }
    observer.observe(el);
  });
})();

/* ============================================
   COUNTER ANIMATION FOR STATISTICS
   ============================================ */
(function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat h3, .stat-card h3, .stat div[style*="font-size:2rem"]');

  const animateCounter = (element) => {
    const text = element.textContent;
    const numberMatch = text.match(/(\d+)([+%]*)/);

    if (!numberMatch) return;

    const targetNumber = parseInt(numberMatch[1]);
    const suffix = numberMatch[2] || '';
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    const stepDuration = duration / steps;

    let currentNumber = 0;
    element.classList.add('counter');

    const counter = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber;
        clearInterval(counter);
      }
      element.textContent = Math.floor(currentNumber) + suffix;
    }, stepDuration);
  };

  // Use IntersectionObserver to trigger counters when visible
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }
})();

/* ============================================
   HERO BUTTON PULSE ANIMATION (PERIODIC)
   ============================================ */
(function initHeroButtonPulse() {
  const heroBtn = document.querySelector('.hero .btn');
  if (!heroBtn) return;

  // Pulse every 5 seconds
  setInterval(() => {
    heroBtn.classList.add('pulse-active');
    setTimeout(() => {
      heroBtn.classList.remove('pulse-active');
    }, 1000);
  }, 5000);
})();

/* ============================================
   WHATSAPP BUTTON ATTENTION PULSE
   Mobile-first: only pulse the sticky mobile button
   ============================================ */
(function initWhatsAppPulse() {
  const whatsappBtn = document.querySelector('.sticky-whatsapp-mobile');
  if (!whatsappBtn) return;

  // Pulse every 10 seconds to draw attention on mobile
  setInterval(() => {
    whatsappBtn.classList.add('attention-pulse');
    setTimeout(() => {
      whatsappBtn.classList.remove('attention-pulse');
    }, 2000);
  }, 10000);
})();

/* ============================================
   IMAGE LAZY LOAD FADE-IN
   ============================================ */
(function initLazyImageFadeIn() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  lazyImages.forEach(img => {
    img.addEventListener('load', () => {
      img.classList.add('loaded');
    });

    // If image is already loaded (cached)
    if (img.complete) {
      img.classList.add('loaded');
    }
  });
})();

/* ============================================
   TYPEWRITER EFFECT FOR PRINCIPAL'S MESSAGE
   ============================================ */
(function initTypewriterEffect() {
  const principalHeading = document.querySelector('.container h2');
  if (!principalHeading || !principalHeading.textContent.includes('Principal')) return;

  // Only apply to "Message from the Principal" heading
  const headings = Array.from(document.querySelectorAll('.container h2'));
  const principalH2 = headings.find(h => h.textContent.includes('Principal'));

  if (!principalH2) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('typewriter')) {
        entry.target.classList.add('typewriter');

        // Remove cursor after animation completes
        setTimeout(() => {
          entry.target.classList.add('finished');
        }, 3000);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(principalH2);
})();

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();

/* ============================================
   SUBTLE PARALLAX EFFECT FOR HERO IMAGE
   ============================================ */
(function initParallax() {
  const heroImage = document.querySelector('.hero img, .hero video');
  if (!heroImage) return;

  // Check if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  heroImage.classList.add('parallax-element');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;

        // Only apply parallax in the first viewport
        if (scrolled < window.innerHeight) {
          heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ============================================
   GALLERY FILTER FUNCTIONALITY (ENHANCED)
   ============================================ */
(function initGalleryFilter() {
  const pills = document.querySelectorAll('.pill');
  const items = document.querySelectorAll('.gallery-item');

  if (!pills.length || !items.length) return;

  pills.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      pills.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Animate items out then in
      items.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        const shouldShow = (filter === 'all' || filter === category);

        if (shouldShow) {
          // Fade in with stagger
          setTimeout(() => {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';

            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          }, index * 50);
        } else {
          // Fade out
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
})();

/* ============================================
   FORM VALIDATION AND SUBMISSION ANIMATION
   ============================================ */
(function initFormAnimations() {
  const forms = document.querySelectorAll('.admissions-form, form');

  forms.forEach(form => {
    const submitBtn = form.querySelector('button[type="submit"], .btn');
    if (!submitBtn) return;

    form.addEventListener('submit', (e) => {
      // Only add animation, don't prevent default unless doing AJAX
      const btnText = submitBtn.textContent;

      // Add loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `${btnText}<span class="spinner"></span>`;

      // If you're using AJAX, you can remove the default behavior
      // For now, let it submit normally
      // The spinner will show briefly before page reload
    });
  });

  // Add focus animations to all inputs
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.classList.add('hover-glow');
    });

    input.addEventListener('blur', function() {
      this.classList.remove('hover-glow');
    });
  });
})();

/* ============================================
   ADD STAGGER CLASSES TO SIMILAR ELEMENTS
   ============================================ */
(function initStaggerClasses() {
  // Add stagger to stat cards
  const stats = document.querySelectorAll('.stat, .stat-card');
  stats.forEach((stat, index) => {
    if (index < 6) {
      stat.classList.add(`stagger-${index + 1}`);
    }
  });

  // Add stagger to program cards
  const programs = document.querySelectorAll('.program, .program-card');
  programs.forEach((program, index) => {
    if (index < 6) {
      program.classList.add(`stagger-${index + 1}`);
    }
  });

  // Add stagger to list items in achievements
  const achievementLists = document.querySelectorAll('.achievements ul li, .card ul li');
  achievementLists.forEach((item, index) => {
    if (index < 6) {
      item.classList.add('animate-fadeUp', `stagger-${index + 1}`);
    }
  });
})();

/* ============================================
   MOBILE MENU TOGGLE - MOBILE-FIRST OPTIMIZED
   Enhanced for budget Android on 3G networks
   ============================================ */
(function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const header = document.getElementById('siteHeader');

  if (!menuBtn || !mobileNav || !overlay) return;

  // Open mobile menu - optimized for performance
  function openMenu() {
    // Add body class to prevent scroll
    document.body.classList.add('menu-open');

    // Show overlay first
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');

    // Then slide in menu (slight delay for smoother animation)
    requestAnimationFrame(() => {
      mobileNav.classList.add('active');
      menuBtn.setAttribute('aria-expanded', 'true');
    });

    // Focus on close button for accessibility
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 350);
    }

    // Remove will-change after animation
    setTimeout(() => {
      mobileNav.classList.add('animation-complete');
      overlay.classList.add('animation-complete');
    }, 300);
  }

  // Close mobile menu - optimized for performance
  function closeMenu() {
    // Remove active states
    mobileNav.classList.remove('active');
    overlay.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');

    // Restore body scroll after animation completes
    setTimeout(() => {
      document.body.classList.remove('menu-open');
      mobileNav.classList.remove('animation-complete');
      overlay.classList.remove('animation-complete');
    }, 300);

    // Return focus to menu button
    menuBtn.focus();
  }

  // Toggle menu on button click
  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (mobileNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when close button is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  // Close menu when overlay is clicked
  overlay.addEventListener('click', closeMenu);

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
      closeMenu();
    }
  });

  // Close menu when window is resized to tablet/desktop
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth >= 768 && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    }, 250);
  });

  // Trap focus inside mobile menu when open
  mobileNav.addEventListener('keydown', (e) => {
    if (!mobileNav.classList.contains('active')) return;
    if (e.key !== 'Tab') return;

    const focusableElements = mobileNav.querySelectorAll(
      'a[href], button:not([disabled])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  });
})();

/* ============================================
   NAVIGATION SCROLL BEHAVIOR
   ============================================ */
(function initNavScroll() {
  let lastScroll = 0;
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class and enhanced shadow when scrolled
    if (currentScroll > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
})();

/* ============================================
   PERFORMANCE: REMOVE WILL-CHANGE AFTER ANIMATIONS
   ============================================ */
(function cleanupWillChange() {
  const hoverElements = document.querySelectorAll('.btn, .stat-card, .program-card, .whatsapp-float');

  hoverElements.forEach(el => {
    el.addEventListener('transitionend', () => {
      el.style.willChange = 'auto';
    });
  });
})();

/* ============================================
   INITIALIZE ALL ANIMATIONS ON DOM READY
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // All functions are already initialized via IIFEs
  // This is just for any additional setup
  console.log('Veer Patta Public School - Animations loaded successfully');
});
