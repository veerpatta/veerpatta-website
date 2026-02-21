// Main JavaScript file - Veer Patta Public School
// Handles animations, counters, scroll observers, and interactivity

/* ============================================
   INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
   Consolidated into initModernScrollAnimations (below)
   ============================================ */

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
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!heroBtn || prefersReducedMotion) return;

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
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!whatsappBtn || prefersReducedMotion) return;

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
  const principalHeading = document.querySelector('.principal-heading');
  if (!principalHeading) return;

  if (!('IntersectionObserver' in window)) {
    principalHeading.classList.add('typewriter', 'finished');
    return;
  }

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

  observer.observe(principalHeading);
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
   GALLERY FILTER FUNCTIONALITY
   Moved to gallery-loader.js to run AFTER dynamic items load
   ============================================ */

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
    input.addEventListener('focus', function () {
      this.classList.add('hover-glow');
    });

    input.addEventListener('blur', function () {
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
   TESTIMONIALS CAROUSEL
   Main implementation has been moved to testimonial-carousel.js
   to prevent code duplication and improve maintainability.
   ============================================ */

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
   PERFORMANCE OPTIMIZATIONS
   ============================================ */

// 1. Debounce function for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 2. Detect device capability and add class for conditional animations
(function detectDeviceCapability() {
  const isLowEndDevice =
    navigator.hardwareConcurrency <= 4 ||
    navigator.deviceMemory <= 4 ||
    /Android [1-7]/.test(navigator.userAgent);

  if (isLowEndDevice) {
    document.body.classList.add('low-end-device');
  }
})();

// 3. Progressive image loading with better placeholder
(function initProgressiveImageLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  images.forEach(img => {
    // Low quality placeholder
    const placeholder = img.getAttribute('data-placeholder');
    if (placeholder) {
      img.style.backgroundImage = `url(${placeholder})`;
      img.style.backgroundSize = 'cover';
      img.style.filter = 'blur(10px)';
    }

    img.addEventListener('load', () => {
      img.style.filter = 'none';
      img.classList.add('loaded');
    });
  });
})();

/* ============================================
   PROGRESSIVE IMAGE LOADING - ENHANCED
   Adds 'loaded' class when images complete loading
   Works with all images and videos, not just lazy
   ============================================ */
(function initProgressiveImages() {
  const images = document.querySelectorAll('img[src], video[src]');

  images.forEach(media => {
    const handleLoad = () => {
      media.classList.add('loaded');
    };

    if (media.complete && media.naturalHeight !== 0) {
      // Already loaded (cached)
      handleLoad();
    } else {
      // Wait for load
      media.addEventListener('load', handleLoad, { once: true });
      media.addEventListener('loadeddata', handleLoad, { once: true });
    }
  });
})();

/* ============================================
   RIPPLE EFFECT FOR BUTTONS
   ============================================ */
(function initRippleEffect() {
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const buttons = document.querySelectorAll('.btn, .cta-btn, .mobile-nav-link');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
})();

/* ============================================
   MAGNETIC EFFECT FOR CTA BUTTONS (DESKTOP ONLY)
   ============================================ */
(function initMagneticButtons() {
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return; // Mobile skip

  const magneticButtons = document.querySelectorAll('.btn, .desktop-whatsapp-btn');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
})();

/* ============================================
   SCROLL PROGRESS INDICATOR
   ============================================ */
(function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  const updateProgress = debounce(() => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height <= 0) {
      progressBar.style.width = '100%';
      return;
    }
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  }, 10);

  window.addEventListener('scroll', updateProgress, { passive: true });
})();

/* ============================================
   ENHANCED NUMBER COUNTER WITH EASING
   ============================================ */
(function initEnhancedCounters() {
  const counters = document.querySelectorAll('.why-choose-number');

  if (counters.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach(counter => {
      const text = counter.textContent;
      const match = text.match(/(\d+)([+%]*)/);
      if (match) {
        counter.textContent = match[1] + (match[2] || '');
      }
    });
    return;
  }

  const easeOutQuart = t => 1 - (--t) * t * t * t;

  const animateCounter = (element) => {
    const text = element.textContent;
    const match = text.match(/(\d+)([+%]*)/);

    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = match[2] || '';
    const duration = 2000;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(easedProgress * target);

      element.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
})();

/* ============================================
   STAGGER ANIMATION FOR CARDS GRID
   ============================================ */
(function initCardStagger() {
  // Collect all card groups that need stagger animation
  const cardGroups = [
    document.querySelectorAll('.why-choose-card'),
    document.querySelectorAll('.stat-card-modern'),
    document.querySelectorAll('.program-card'),
    document.querySelectorAll('.program-card-modern'),
    document.querySelectorAll('.trust-badge')
  ];

  if (!('IntersectionObserver' in window)) {
    cardGroups.forEach(group => {
      group.forEach(card => {
        card.classList.remove('card-stagger-hidden');
        card.classList.add('card-stagger-visible');
      });
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('[class$="-card"], [class$="-badge"]');

        if (cards.length === 0) {
          // No cards found, show the parent itself if it's a card
          if (entry.target.classList.contains('why-choose-card') ||
            entry.target.classList.contains('stat-card-modern') ||
            entry.target.classList.contains('program-card') ||
            entry.target.classList.contains('program-card-modern') ||
            entry.target.classList.contains('trust-badge')) {
            entry.target.classList.remove('card-stagger-hidden');
            entry.target.classList.add('card-stagger-visible');
          }
        } else {
          cards.forEach((card, index) => {
            // Add stagger delay class based on index (1-6)
            const delayClass = `card-stagger-delay-${Math.min(index + 1, 6)}`;
            card.classList.add(delayClass);

            // Remove hidden state and add visible state to trigger animation
            card.classList.remove('card-stagger-hidden');
            card.classList.add('card-stagger-visible');
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '100px' // Trigger earlier for better UX
  });

  const observedParents = new Set();

  cardGroups.forEach(group => {
    if (!group.length) return;

    // Get the parent element
    const firstCard = group[0];
    const parent = firstCard.parentElement;

    if (!parent || observedParents.has(parent)) return;

    // Set initial hidden state using CSS class
    const cards = parent.querySelectorAll('[class$="-card"], [class$="-badge"]');
    cards.forEach(card => {
      card.classList.add('card-stagger-hidden');
    });

    observer.observe(parent);
    observedParents.add(parent);

    // Failsafe: reveal after 3 seconds if still hidden
    setTimeout(() => {
      cards.forEach(card => {
        if (card.classList.contains('card-stagger-hidden')) {
          console.warn('Card still hidden after 3s, forcing visibility:', card.className);
          card.classList.remove('card-stagger-hidden');
          card.classList.add('card-stagger-visible');
        }
      });
    }, 3000);
  });
})();

/* ============================================
   KEYBOARD NAVIGATION IMPROVEMENTS
   ============================================ */
(function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Skip if user is typing
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case '/':
        e.preventDefault();
        document.querySelector('.mobile-menu-btn')?.focus();
        break;
      case 'w':
        e.preventDefault();
        document.querySelector('.whatsapp-float, .sticky-whatsapp-mobile')?.click();
        break;
      case 'Escape':
        // Close any open modals/menus
        document.querySelector('.mobile-nav.active')?.classList.remove('active');
        document.querySelector('.mobile-overlay.active')?.classList.remove('active');
        break;
    }
  });
})();

/* ============================================
   SKIP LINK FOR ACCESSIBILITY
   ============================================ */
(function initAccessibility() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add ID to main content if not present
  const mainContent = document.querySelector('main, .container, .hero');
  if (mainContent && !mainContent.id) {
    mainContent.id = 'main-content';
  }
})();

/* ============================================
   FOCUS TRAP FOR MOBILE MENU
   ============================================ */
(function enhanceMobileMenuAccessibility() {
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileNav) return;

  const focusableElements = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  mobileNav.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;

    const focusables = Array.from(mobileNav.querySelectorAll(focusableElements));
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (e.shiftKey && document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    } else if (!e.shiftKey && document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  });
})();

/* ============================================
   LAZY LOAD BELOW-THE-FOLD SECTIONS
   ============================================ */
(function initLazyLoadSections() {
  const lazySections = document.querySelectorAll('[data-lazy-section]');

  if (!('IntersectionObserver' in window)) {
    lazySections.forEach(section => section.classList.add('loaded'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px' });

  lazySections.forEach(section => observer.observe(section));
})();

/* ============================================
   TOAST NOTIFICATION SYSTEM
   ============================================ */
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Make showToast available globally
window.showToast = showToast;

/* ============================================
   PERFORMANCE MONITORING
   ============================================ */
(function checkPerformance() {
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

      console.log('📊 Page Load Time:', pageLoadTime + 'ms');

      if (pageLoadTime > 3000) {
        console.warn('⚠️ Page load exceeds 3s budget!');
      } else {
        console.log('✅ Page load within budget');
      }
    });
  }
})();

/* ============================================
   INITIALIZE ALL ANIMATIONS ON DOM READY
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  // All functions are already initialized via IIFEs
  // This is just for any additional setup
  console.log('Veer Patta Public School - Animations loaded successfully');
});

/* ============================================
   TESTIMONIALS SWIPE GESTURE SUPPORT (MOBILE)
   ============================================ */
(function initTestimonialSwipe() {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;

  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < minSwipeDistance) return;

    const nextBtn = carousel.querySelector('.testimonial-nav.next');
    const prevBtn = carousel.querySelector('.testimonial-nav.prev');

    if (swipeDistance < 0 && nextBtn) {
      // Swiped left - go next
      nextBtn.click();
    } else if (swipeDistance > 0 && prevBtn) {
      // Swiped right - go previous
      prevBtn.click();
    }
  }
})();

/* ============================================
   STAGGER CHILDREN VISIBILITY FIX
   Ensures animated elements become visible after animation
   ============================================ */
(function initStaggerChildrenFix() {
  const staggerContainers = document.querySelectorAll('.stagger-children');

  staggerContainers.forEach(container => {
    const children = container.children;

    // Set a failsafe to ensure visibility after animations should have completed
    setTimeout(() => {
      Array.from(children).forEach(child => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      });
    }, 1000); // After animation duration
  });
})();

/* ============================================
   ENHANCED SCROLL REVEAL WITH STAGGER TIMING
   ============================================ */
(function initEnhancedScrollReveal() {
  const revealElements = document.querySelectorAll('.slide-up-reveal:not(.animated), .zoom-in:not(.animated)');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '20px' });

  revealElements.forEach(el => observer.observe(el));
})();

/* ============================================
   MODERN SCROLL ANIMATIONS SYSTEM (MOBILE-FIRST)
   Optimized for mobile devices and 3G networks
   ============================================ */
(function initModernScrollAnimations() {
  // Legacy classes to support
  const legacySelector = '.animate-on-scroll, .animate-fadeUp, .animate-slideIn, .animate-scaleIn';
  const modernSelector = '.scroll-reveal, .scroll-fade-up, .scroll-fade-left, .scroll-fade-right, .scroll-scale-up, .scroll-blur-fade, .scroll-bounce-up, .scroll-rotate-in, .scroll-stagger, .scroll-stagger-fast, .section-reveal, .section-clip-reveal, .section-line-reveal, .scroll-counter, .scroll-line, .scroll-dot';

  // Combine selectors
  const allSelector = `${legacySelector}, ${modernSelector}`;

  // Skip if IntersectionObserver not supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: make everything visible immediately
    document.querySelectorAll(allSelector).forEach(el => {
      el.classList.add('revealed'); // Modern flag
      el.classList.add('animated'); // Legacy flag
    });
    return;
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Reveal everything immediately for users who prefer reduced motion
    document.querySelectorAll(allSelector).forEach(el => {
      el.classList.add('revealed');
      el.classList.add('animated');
    });
    return;
  }

  // Observer options - trigger slightly before element enters viewport
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px', // Trigger before element is fully visible
    threshold: 0.1
  };

  // Main scroll reveal observer
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Add revealed class (Modern system)
        el.classList.add('revealed');

        // Add animated class (Legacy system) if it has legacy classes
        if (el.matches(legacySelector) || el.classList.contains('animate-on-scroll')) {
          el.classList.add('animated');
        }

        // Clean up will-change after transition completes
        el.addEventListener('transitionend', function handler() {
          el.classList.add('transition-done');
          el.removeEventListener('transitionend', handler);
        }, { once: true });

        // Stop observing this element
        scrollObserver.unobserve(el);
      }
    });
  }, observerOptions);

  // Observe all scroll-reveal elements
  const scrollElements = document.querySelectorAll(allSelector);

  scrollElements.forEach(el => scrollObserver.observe(el));

  // Failsafe: reveal all elements after 2 seconds if still hidden
  setTimeout(() => {
    scrollElements.forEach(el => {
      // Check legacy or modern revealed state
      const isRevealed = el.classList.contains('revealed') || el.classList.contains('animated');

      if (!isRevealed) {
        el.classList.add('revealed', 'animated', 'transition-done');
      }
    });
  }, 2000);
})();

/* ============================================
   AUTOMATIC SCROLL ANIMATION CLASS APPLICATION
   Applies animation classes to key page elements
   ============================================ */
(function initAutoScrollAnimationClasses() {
  // Skip on low-end devices for better performance
  const isLowEnd = document.body.classList.contains('low-end-device');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return;

  // Apply scroll-fade-up to section headings
  document.querySelectorAll('.section-header-modern, .section h2:not(.hero h2), .container > h2').forEach(el => {
    if (!el.classList.contains('scroll-fade-up') && !el.classList.contains('revealed')) {
      el.classList.add('scroll-fade-up');
    }
  });

  // Apply scroll-stagger-fast to card grids on mobile, scroll-stagger on desktop
  const animClass = isLowEnd || window.innerWidth <= 768 ? 'scroll-stagger-fast' : 'scroll-stagger';

  document.querySelectorAll('.stats-grid, .programs-grid, .trust-badges-wrapper').forEach(el => {
    if (!el.classList.contains('scroll-stagger') && !el.classList.contains('scroll-stagger-fast') && !el.classList.contains('revealed')) {
      el.classList.add(animClass);
    }
  });

  // Apply scroll-scale-up to individual cards
  document.querySelectorAll('.stat-card-modern, .program-card-modern, .why-parents-card, .achievements-card, .about-teaser-card').forEach(el => {
    if (!el.classList.contains('scroll-scale-up') && !el.closest('.scroll-stagger') && !el.closest('.scroll-stagger-fast')) {
      el.classList.add('scroll-fade-up');
    }
  });

  // Note: Do NOT add section-reveal to parent section containers.
  // Hiding entire sections with opacity:0 causes invisible content if
  // IntersectionObserver fails. Child elements already animate individually.

  // Apply scroll-rotate-in to trust badge icons
  document.querySelectorAll('.trust-badge .badge-icon, .stat-icon-emoji').forEach(el => {
    if (!el.classList.contains('scroll-rotate-in') && !el.classList.contains('revealed')) {
      el.classList.add('scroll-rotate-in');
    }
  });

  // Re-observe newly added elements
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    };

    const autoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          autoObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-fade-up:not(.revealed), .scroll-scale-up:not(.revealed), .scroll-rotate-in:not(.revealed), .section-reveal:not(.revealed), .scroll-stagger:not(.revealed), .scroll-stagger-fast:not(.revealed)').forEach(el => {
      autoObserver.observe(el);
    });
  }

  // Failsafe: reveal all auto-animated elements after 2 seconds
  setTimeout(() => {
    document.querySelectorAll('.scroll-fade-up:not(.revealed), .scroll-scale-up:not(.revealed), .scroll-rotate-in:not(.revealed), .section-reveal:not(.revealed), .scroll-stagger:not(.revealed), .scroll-stagger-fast:not(.revealed)').forEach(el => {
      el.classList.add('revealed', 'transition-done');
    });
  }, 2000);
})();

/* ============================================
   SMART HEADER SCROLL BEHAVIOR
   Hide on scroll down, show on scroll up
   ============================================ */
(function initSmartHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScrollY = 0;
  let ticking = false;
  const scrollThreshold = 100; // Minimum scroll before header behavior kicks in
  const hideThreshold = 10; // Minimum scroll delta to trigger hide

  function updateHeader() {
    const currentScrollY = window.pageYOffset;
    const scrollDelta = currentScrollY - lastScrollY;

    // Add scrolled class when past threshold
    if (currentScrollY > scrollThreshold) {
      header.classList.add('header-scrolled');

      // Only hide/show after passing threshold
      if (scrollDelta > hideThreshold) {
        // Scrolling down - hide header
        header.classList.add('header-hidden');
        header.classList.remove('header-visible');
      } else if (scrollDelta < -hideThreshold) {
        // Scrolling up - show header
        header.classList.remove('header-hidden');
        header.classList.add('header-visible');
      }
    } else {
      // Near top - reset header
      header.classList.remove('header-scrolled', 'header-hidden', 'header-visible');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeader();
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================
   SCROLL-DRIVEN IMAGE LAZY LOADING WITH REVEAL
   ============================================ */
(function initScrollDrivenLazyImages() {
  if (!('IntersectionObserver' in window)) return;

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Add reveal animation class when image enters viewport
        img.classList.add('lazy-image');

        // When image loads, add loaded class for reveal
        if (img.complete) {
          img.classList.add('loaded');
        } else {
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          }, { once: true });
        }

        // Also update parent container if it has image-container class
        const container = img.closest('.image-container');
        if (container) {
          if (img.complete) {
            container.classList.add('loaded');
          } else {
            img.addEventListener('load', () => {
              container.classList.add('loaded');
            }, { once: true });
          }
        }

        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '100px' }); // Load images slightly before they enter viewport

  lazyImages.forEach(img => imageObserver.observe(img));
})();

/* ============================================
   PARALLAX SCROLL EFFECT (DESKTOP ONLY)
   Subtle parallax for hero elements
   ============================================ */
(function initParallaxScroll() {
  // Only on desktop with sufficient power
  if (window.innerWidth <= 768) return;
  if (document.body.classList.contains('low-end-device')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const parallaxElements = document.querySelectorAll('.hero-visual img, .hero-floating-badge');
  if (parallaxElements.length === 0) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.pageYOffset;

        // Only apply parallax in the first viewport height
        if (scrollY < window.innerHeight * 1.2) {
          parallaxElements.forEach((el, index) => {
            const speed = 0.15 + (index * 0.05); // Different speeds for layered effect
            const yPos = scrollY * speed;
            el.style.transform = `translateY(${yPos}px)`;
          });
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ============================================
   SCROLL MOMENTUM TRACKING FOR ANIMATIONS
   Adjusts animation speed based on scroll velocity
   ============================================ */
(function initScrollMomentum() {
  let lastScrollY = window.pageYOffset;
  let scrollVelocity = 0;
  let lastTime = Date.now();

  window.addEventListener('scroll', () => {
    const currentTime = Date.now();
    const currentScrollY = window.pageYOffset;
    const timeDelta = currentTime - lastTime;

    if (timeDelta > 0) {
      scrollVelocity = Math.abs(currentScrollY - lastScrollY) / timeDelta;
    }

    // Update CSS custom property for velocity-based animations
    document.documentElement.style.setProperty('--scroll-velocity', scrollVelocity.toFixed(3));

    lastScrollY = currentScrollY;
    lastTime = currentTime;
  }, { passive: true });
})();

console.log('🎨 Modern Scroll Animations initialized');
