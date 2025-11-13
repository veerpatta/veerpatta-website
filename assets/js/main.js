// Main JavaScript file - Veer Patta Public School
// Handles animations, counters, scroll observers, and interactivity

/* ============================================
   INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
   Uses CSS classes instead of inline styles for better maintainability
   ============================================ */
(function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately for older browsers using CSS classes
    document.querySelectorAll('.animate-on-scroll, .animate-fadeUp, .animate-slideIn, .animate-scaleIn').forEach(el => {
      el.classList.add('animated');
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
   TESTIMONIALS CAROUSEL
   Auto-rotating carousel with manual controls
   Fixed: Multiple slides overlap, navigation bugs, dot sync,
   timer race conditions, touch issues, accessibility
   ============================================ */
(function initTestimonialsCarousel() {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.testimonial-track');
  const slides = Array.from(carousel.querySelectorAll('.testimonial-slide'));
  const prevBtn = carousel.querySelector('.testimonial-nav.prev');
  const nextBtn = carousel.querySelector('.testimonial-nav.next');
  const dotsContainer = carousel.querySelector('.testimonial-dots');

  if (!track || slides.length === 0) return;

  // State management
  let currentIndex = 0;
  let autoRotateInterval = null;
  let isTransitioning = false; // Prevent rapid navigation
  let isSwiping = false; // Prevent multi-trigger swipe
  const ROTATION_DELAY = 5000; // 5 seconds
  const TRANSITION_DURATION = 600; // Match CSS transition duration
  let touchStartX = 0;
  let touchEndX = 0;

  // Debounce function to prevent rapid-fire clicks
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

  // Initialize slides - ensure only first is active
  function initSlides() {
    slides.forEach((slide, index) => {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
      slide.style.opacity = '0';
      slide.style.visibility = 'hidden';
      slide.style.position = 'absolute';
      slide.style.top = '0';
      slide.style.left = '0';
      slide.style.width = '100%';

      if (index === 0) {
        slide.classList.add('active');
        slide.setAttribute('aria-hidden', 'false');
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
        slide.style.position = 'relative';
      }
    });
  }

  // Generate pagination dots with full accessibility
  function generateDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    dotsContainer.setAttribute('role', 'tablist');
    dotsContainer.setAttribute('aria-label', 'Testimonial navigation');

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      dot.setAttribute('type', 'button');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Go to testimonial ${index + 1} of ${slides.length}`);
      dot.setAttribute('aria-controls', `testimonial-${index}`);
      dot.setAttribute('tabindex', index === 0 ? '0' : '-1');

      if (index === 0) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.setAttribute('aria-selected', 'false');
        dot.setAttribute('aria-current', 'false');
      }

      // Click handler with debouncing
      dot.addEventListener('click', () => {
        if (!isTransitioning) {
          goToSlide(index, true);
        }
      });

      // Keyboard navigation for dots
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!isTransitioning) {
            goToSlide(index, true);
          }
        }
      });

      dotsContainer.appendChild(dot);
    });
  }

  // Update dots with proper ARIA attributes
  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.testimonial-dot');

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;

      // Remove all active states first
      dot.classList.remove('active');
      dot.setAttribute('aria-selected', 'false');
      dot.setAttribute('aria-current', 'false');
      dot.setAttribute('tabindex', '-1');

      // Set active state for current dot only
      if (isActive) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
        dot.setAttribute('aria-current', 'true');
        dot.setAttribute('tabindex', '0');
      }
    });
  }

  // Update slides with proper ARIA and visibility
  function updateSlides(oldIndex, newIndex) {
    const isNext = newIndex > oldIndex || (oldIndex === slides.length - 1 && newIndex === 0);
    const oldSlide = slides[oldIndex];
    const newSlide = slides[newIndex];
    
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Remove all transition classes first
    slides.forEach((slide) => {
      slide.classList.remove('active', 'slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
      slide.setAttribute('aria-hidden', 'true');
    });

    if (prefersReducedMotion) {
      // Simple fade for reduced motion
      oldSlide.style.opacity = '0';
      oldSlide.style.visibility = 'hidden';
      oldSlide.style.position = 'absolute';
      
      newSlide.classList.add('active');
      newSlide.setAttribute('aria-hidden', 'false');
      newSlide.style.position = 'relative';
      newSlide.style.visibility = 'visible';
      newSlide.style.opacity = '1';
    } else {
      // Smooth slide transition for regular users
      
      // Set old slide exit direction
      if (isNext) {
        oldSlide.classList.add('slide-out-left');
      } else {
        oldSlide.classList.add('slide-out-right');
      }
      
      // Set new slide enter direction
      if (isNext) {
        newSlide.classList.add('slide-in-right');
      } else {
        newSlide.classList.add('slide-in-left');
      }
      
      // Position new slide and prepare for entrance
      newSlide.style.position = 'relative';
      newSlide.style.visibility = 'visible';
      newSlide.setAttribute('aria-hidden', 'false');
      
      // Force reflow
      newSlide.offsetHeight;
      
      // Trigger entrance animation
      requestAnimationFrame(() => {
        newSlide.classList.add('active');
        newSlide.classList.remove('slide-in-right', 'slide-in-left');
        
        // Clean up old slide after transition
        setTimeout(() => {
          oldSlide.style.position = 'absolute';
          oldSlide.style.visibility = 'hidden';
          oldSlide.classList.remove('slide-out-left', 'slide-out-right');
        }, TRANSITION_DURATION);
      });
    }
  }

  // Go to specific slide with transition lock
  function goToSlide(index, userInitiated = false) {
    // Validate index
    if (index < 0 || index >= slides.length || index === currentIndex || isTransitioning) {
      return;
    }

    // Lock transitions
    isTransitioning = true;

    const oldIndex = currentIndex;
    currentIndex = index;

    // Update UI
    updateSlides(oldIndex, currentIndex);
    updateDots();

    // Reset auto-rotation if user initiated
    if (userInitiated) {
      resetAutoRotation();
    }

    // Unlock after transition completes
    setTimeout(() => {
      isTransitioning = false;
    }, TRANSITION_DURATION);
  }

  // Next slide with debouncing
  const nextSlide = () => {
    if (isTransitioning) return;
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex, true);
  };

  // Previous slide with debouncing
  const prevSlide = () => {
    if (isTransitioning) return;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, true);
  };

  // Auto rotation with proper cleanup
  function startAutoRotation() {
    stopAutoRotation();
    autoRotateInterval = setInterval(() => {
      if (!isTransitioning) {
        const nextIndex = (currentIndex + 1) % slides.length;
        goToSlide(nextIndex, false);
      }
    }, ROTATION_DELAY);
  }

  function stopAutoRotation() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  function resetAutoRotation() {
    stopAutoRotation();

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      startAutoRotation();
    }
  }

  // Touch/Swipe support with debouncing
  function handleTouchStart(e) {
    if (isTransitioning || isSwiping) return;
    touchStartX = e.changedTouches[0].screenX;
    isSwiping = false;
  }

  function handleTouchMove(e) {
    if (isTransitioning) return;
    // Detect intentional swipe by checking movement
    const currentX = e.changedTouches[0].screenX;
    const diff = Math.abs(touchStartX - currentX);

    if (diff > 10) {
      isSwiping = true;
    }
  }

  function handleTouchEnd(e) {
    if (isTransitioning || !isSwiping) {
      isSwiping = false;
      return;
    }

    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();

    // Reset swipe flag after a delay
    setTimeout(() => {
      isSwiping = false;
    }, 100);
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }
  }

  // Event listeners with error handling
  try {
    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
      });
      prevBtn.setAttribute('aria-controls', 'testimonial-track');
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
      });
      nextBtn.setAttribute('aria-controls', 'testimonial-track');
    }

    // Pause auto-rotation on hover/focus
    carousel.addEventListener('mouseenter', stopAutoRotation);
    carousel.addEventListener('mouseleave', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        startAutoRotation();
      }
    });

    carousel.addEventListener('focusin', stopAutoRotation);
    carousel.addEventListener('focusout', () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        startAutoRotation();
      }
    });

    // Touch events with proper flags
    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchmove', handleTouchMove, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Keyboard navigation for carousel
    carousel.setAttribute('tabindex', '0');
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'Testimonials carousel');
    carousel.setAttribute('aria-live', 'polite');

    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0, true);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(slides.length - 1, true);
      }
    });

    // Add IDs to slides for ARIA references
    slides.forEach((slide, index) => {
      slide.setAttribute('id', `testimonial-${index}`);
      slide.setAttribute('role', 'tabpanel');
      slide.setAttribute('aria-label', `Testimonial ${index + 1} of ${slides.length}`);
    });

    // Initialize everything
    initSlides();
    generateDots();
    updateDots();

    // Start auto-rotation if motion is allowed
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      startAutoRotation();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      stopAutoRotation();
    });

    // Handle visibility change (pause when tab is hidden)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoRotation();
      } else {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
          startAutoRotation();
        }
      }
    });

  } catch (error) {
    console.error('Error initializing testimonials carousel:', error);
    // Fallback: show all testimonials if carousel fails
    slides.forEach(slide => {
      slide.style.position = 'relative';
      slide.style.opacity = '1';
      slide.style.visibility = 'visible';
    });
  }
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
  const buttons = document.querySelectorAll('.btn, .cta-btn, .mobile-nav-link');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
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
   Uses CSS classes instead of inline styles for better maintainability
   ============================================ */
(function initStaggeredCards() {
  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: Remove hidden class from all cards for older browsers
    console.log('IntersectionObserver not supported, showing all cards immediately');
    document.querySelectorAll('.why-choose-card, .stat-card-modern, .program-card, .program-card-modern, .trust-badge').forEach(card => {
      card.classList.remove('card-stagger-hidden');
      card.classList.add('card-stagger-visible');
    });
    return;
  }

  const cardGroups = [
    document.querySelectorAll('.why-choose-card'),
    document.querySelectorAll('.stat-card-modern'),
    document.querySelectorAll('.program-card'),
    document.querySelectorAll('.program-card-modern'),
    document.querySelectorAll('.trust-badge')
  ];
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('[class$="-card"], [class$="-badge"]');
        
        if (cards.length === 0) {
          // No cards found, show the parent itself if it's a card
          console.log('No child cards found, checking if parent is a card');
          if (entry.target.classList.contains('why-choose-card') || 
              entry.target.classList.contains('stat-card-modern') ||
              entry.target.classList.contains('program-card') || 
              entry.target.classList.contains('program-card-modern') ||
              entry.target.classList.contains('trust-badge')) {
            entry.target.classList.remove('card-stagger-hidden');
            entry.target.classList.add('card-stagger-visible');
          }
        } else {
          console.log(`Revealing ${cards.length} cards with stagger animation`);
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
    
    switch(e.key) {
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
