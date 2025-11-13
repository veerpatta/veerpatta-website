(() => {
  'use strict';

  function debounce(func, wait = 100) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '50px 0px'
  };

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.animate-on-scroll, .animate-fadeUp, .animate-slideIn, .animate-scaleIn, .section, .stat, .stat-card, .program, .program-card'
    );

    if (!('IntersectionObserver' in window)) {
      animatedElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => {
      if (
        !el.classList.contains('animate-on-scroll') &&
        !el.classList.contains('animate-fadeUp') &&
        !el.classList.contains('animate-slideIn') &&
        !el.classList.contains('animate-scaleIn')
      ) {
        el.classList.add('animate-fadeUp');
      }
      observer.observe(el);
    });
  }

  function initEnhancedCounters() {
    const counters = document.querySelectorAll(
      '.why-choose-number, .stat h3, .stat-card h3, .stat div[style*="font-size:2rem"]'
    );
    if (!counters.length) return;

    const easeOutQuart = (t) => 1 - Math.pow(--t, 4);

    const animateCounter = (element) => {
      const text = element.textContent;
      const match = text.match(/(\d+)([+%]*)/);
      if (!match) return;

      const target = parseInt(match[1], 10);
      const suffix = match[2] || '';
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.floor(easedProgress * target);

        element.textContent = `${currentValue}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = `${target}${suffix}`;
        }
      };

      requestAnimationFrame(updateCounter);
    };

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      counters.forEach((counter) => counterObserver.observe(counter));
    } else {
      counters.forEach((counter) => animateCounter(counter));
    }
  }

  function initHeroButtonPulse() {
    if (document.body.classList.contains('low-end-device')) return;
    const heroBtn = document.querySelector('.hero .btn');
    if (!heroBtn) return;

    setInterval(() => {
      heroBtn.classList.add('pulse-active');
      setTimeout(() => {
        heroBtn.classList.remove('pulse-active');
      }, 1000);
    }, 5000);
  }

  function initWhatsAppPulse() {
    if (document.body.classList.contains('low-end-device')) return;
    const whatsappBtn = document.querySelector('.sticky-whatsapp-mobile');
    if (!whatsappBtn) return;

    setInterval(() => {
      whatsappBtn.classList.add('attention-pulse');
      setTimeout(() => {
        whatsappBtn.classList.remove('attention-pulse');
      }, 2000);
    }, 10000);
  }

  function initProgressiveImageLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach((img) => {
      const placeholder = img.getAttribute('data-placeholder');

      if (placeholder) {
        img.style.backgroundImage = `url(${placeholder})`;
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
        img.style.filter = 'blur(10px)';
      }

      const handleLoad = () => {
        img.classList.add('loaded');
        img.style.filter = 'none';
        img.style.backgroundImage = 'none';
      };

      img.addEventListener('load', handleLoad, { once: true });

      if (img.complete) {
        handleLoad();
      }
    });
  }

  function initTypewriterEffect() {
    const headings = Array.from(document.querySelectorAll('.container h2'));
    const principalHeading = headings.find((h) => h.textContent.includes('Principal'));

    if (!principalHeading) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains('typewriter')) {
            entry.target.classList.add('typewriter');
            setTimeout(() => {
              entry.target.classList.add('finished');
            }, 3000);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(principalHeading);
    } else {
      principalHeading.classList.add('typewriter', 'finished');
    }
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initAdvancedParallax() {
    if (document.body.classList.contains('low-end-device')) return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const hero = document.querySelector('.hero');
    const heroMedia = document.querySelector('.hero img, .hero video');

    if (!hero || !heroMedia) return;

    const handleScroll = debounce(() => {
      const scrolled = window.pageYOffset;
      const heroHeight = hero.offsetHeight;

      if (scrolled < heroHeight) {
        const parallaxSpeed = 0.5;
        heroMedia.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.1)`;
        hero.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
      }
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  function initGalleryFilter() {
    const pills = document.querySelectorAll('.pill');
    const items = document.querySelectorAll('.gallery-item');

    if (!pills.length || !items.length) return;

    pills.forEach((btn) => {
      btn.addEventListener('click', () => {
        pills.forEach((pill) => pill.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        items.forEach((item, index) => {
          const category = item.getAttribute('data-category');
          const shouldShow = filter === 'all' || filter === category;

          if (shouldShow) {
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
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  function initFormAnimations() {
    const forms = document.querySelectorAll('.admissions-form, form');

    forms.forEach((form) => {
      const submitBtn = form.querySelector('button[type="submit"], .btn');
      if (!submitBtn) return;

      form.addEventListener('submit', () => {
        const btnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `${btnText}<span class="spinner"></span>`;
      });
    });

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach((input) => {
      input.addEventListener('focus', function onFocus() {
        this.classList.add('hover-glow');
      });

      input.addEventListener('blur', function onBlur() {
        this.classList.remove('hover-glow');
      });
    });
  }

  function initStaggeredCards() {
    if (!('IntersectionObserver' in window)) return;

    const groups = [
      document.querySelectorAll('.why-choose-card'),
      document.querySelectorAll('.program-card'),
      document.querySelectorAll('.trust-badge')
    ];

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('[class$="-card"], [class$="-badge"]');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 100);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const observedParents = new Set();

    groups.forEach((group) => {
      if (!group.length) return;
      const parent = group[0].parentElement;
      if (!parent || observedParents.has(parent)) return;

      const cards = parent.querySelectorAll('[class$="-card"], [class$="-badge"]');
      cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      });

      observer.observe(parent);
      observedParents.add(parent);
    });
  }

  function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('mobileCloseBtn');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuBtn || !mobileNav || !overlay) return;

    const openMenu = () => {
      document.body.classList.add('menu-open');
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');

      requestAnimationFrame(() => {
        mobileNav.classList.add('active');
        menuBtn.setAttribute('aria-expanded', 'true');
      });

      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 350);
      }

      setTimeout(() => {
        mobileNav.classList.add('animation-complete');
        overlay.classList.add('animation-complete');
      }, 300);
    };

    const closeMenu = () => {
      mobileNav.classList.remove('active');
      overlay.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      overlay.setAttribute('aria-hidden', 'true');

      setTimeout(() => {
        document.body.classList.remove('menu-open');
        mobileNav.classList.remove('animation-complete');
        overlay.classList.remove('animation-complete');
      }, 300);

      menuBtn.focus();
    };

    menuBtn.addEventListener('click', (event) => {
      event.preventDefault();
      if (mobileNav.classList.contains('active')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        closeMenu();
      });
    }

    overlay.addEventListener('click', closeMenu);

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    });

    window.addEventListener('resize', debounce(() => {
      if (window.innerWidth >= 768 && mobileNav.classList.contains('active')) {
        closeMenu();
      }
    }, 250));
  }

  function enhanceMobileMenuAccessibility() {
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) return;

    mobileNav.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab' || !mobileNav.classList.contains('active')) return;

      const focusableSelectors = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusables = Array.from(mobileNav.querySelectorAll(focusableSelectors));
      if (!focusables.length) return;

      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    });
  }

  function initNavScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  function initTestimonialsCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.testimonial-track');
    const slides = Array.from(carousel.querySelectorAll('.testimonial-slide'));
    const prevBtn = carousel.querySelector('.testimonial-nav.prev');
    const nextBtn = carousel.querySelector('.testimonial-nav.next');
    const dotsContainer = carousel.querySelector('.testimonial-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoRotateInterval = null;
    let isTransitioning = false;
    let isSwiping = false;
    const ROTATION_DELAY = 5000;
    const TRANSITION_DURATION = 600;
    let touchStartX = 0;
    let touchEndX = 0;

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

        dot.addEventListener('click', () => {
          if (!isTransitioning) {
            goToSlide(index, true);
          }
        });

        dot.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (!isTransitioning) {
              goToSlide(index, true);
            }
          }
        });

        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.testimonial-dot');

      dots.forEach((dot, index) => {
        const isActive = index === currentIndex;
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
        dot.setAttribute('aria-current', 'false');
        dot.setAttribute('tabindex', '-1');

        if (isActive) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
          dot.setAttribute('aria-current', 'true');
          dot.setAttribute('tabindex', '0');
        }
      });
    }

    function updateSlides(oldIndex, newIndex) {
      slides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true');

        if (index !== newIndex) {
          setTimeout(() => {
            if (index !== currentIndex) {
              slide.style.opacity = '0';
              slide.style.visibility = 'hidden';
              slide.style.position = 'absolute';
            }
          }, TRANSITION_DURATION);
        }
      });

      const newSlide = slides[newIndex];
      newSlide.classList.add('active');
      newSlide.setAttribute('aria-hidden', 'false');
      newSlide.style.opacity = '1';
      newSlide.style.visibility = 'visible';
      newSlide.style.position = 'relative';

      const oldSlide = slides[oldIndex];
      if (oldSlide) {
        oldSlide.style.opacity = '0';
      }
    }

    function goToSlide(index, userInitiated = false) {
      if (index === currentIndex || isTransitioning) return;

      const oldIndex = currentIndex;
      currentIndex = (index + slides.length) % slides.length;

      isTransitioning = true;
      updateSlides(oldIndex, currentIndex);
      updateDots();

      if (userInitiated) {
        resetAutoRotation();
      }

      setTimeout(() => {
        isTransitioning = false;
      }, TRANSITION_DURATION);
    }

    function nextSlide() {
      if (isTransitioning) return;
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex, true);
    }

    function prevSlide() {
      if (isTransitioning) return;
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(prevIndex, true);
    }

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
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        startAutoRotation();
      }
    }

    function handleTouchStart(event) {
      if (isTransitioning || isSwiping) return;
      touchStartX = event.changedTouches[0].screenX;
      isSwiping = false;
    }

    function handleTouchMove(event) {
      if (isTransitioning) return;
      const currentX = event.changedTouches[0].screenX;
      const diff = Math.abs(touchStartX - currentX);

      if (diff > 10) {
        isSwiping = true;
      }
    }

    function handleTouchEnd(event) {
      if (isTransitioning || !isSwiping) {
        isSwiping = false;
        return;
      }

      touchEndX = event.changedTouches[0].screenX;
      handleSwipe();

      setTimeout(() => {
        isSwiping = false;
      }, 100);
    }

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    try {
      if (prevBtn) {
        prevBtn.addEventListener('click', (event) => {
          event.preventDefault();
          prevSlide();
        });
        prevBtn.setAttribute('aria-controls', 'testimonial-track');
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (event) => {
          event.preventDefault();
          nextSlide();
        });
        nextBtn.setAttribute('aria-controls', 'testimonial-track');
      }

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

      track.addEventListener('touchstart', handleTouchStart, { passive: true });
      track.addEventListener('touchmove', handleTouchMove, { passive: true });
      track.addEventListener('touchend', handleTouchEnd, { passive: true });

      carousel.setAttribute('tabindex', '0');
      carousel.setAttribute('role', 'region');
      carousel.setAttribute('aria-label', 'Testimonials carousel');
      carousel.setAttribute('aria-live', 'polite');

      carousel.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          prevSlide();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          nextSlide();
        } else if (event.key === 'Home') {
          event.preventDefault();
          goToSlide(0, true);
        } else if (event.key === 'End') {
          event.preventDefault();
          goToSlide(slides.length - 1, true);
        }
      });

      slides.forEach((slide, index) => {
        slide.setAttribute('id', `testimonial-${index}`);
        slide.setAttribute('role', 'tabpanel');
        slide.setAttribute('aria-label', `Testimonial ${index + 1} of ${slides.length}`);
      });

      initSlides();
      generateDots();
      updateDots();

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        startAutoRotation();
      }

      window.addEventListener('beforeunload', () => {
        stopAutoRotation();
      });

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          stopAutoRotation();
        } else {
          const prefersMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (!prefersMotion) {
            startAutoRotation();
          }
        }
      });
    } catch (error) {
      console.error('Error initializing testimonials carousel:', error);
      slides.forEach((slide) => {
        slide.style.position = 'relative';
        slide.style.opacity = '1';
        slide.style.visibility = 'visible';
      });
    }
  }

  function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .cta-btn, .mobile-nav-link');

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  function initMagneticButtons() {
    if (document.body.classList.contains('low-end-device')) return;
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const magneticButtons = document.querySelectorAll('.btn, .desktop-whatsapp-btn');

    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (event) => {
        const rect = btn.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    let ticking = false;

    const updateProgress = () => {
      const doc = document.documentElement;
      const winScroll = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = `${scrolled}%`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });

    updateProgress();
  }

  function initLazyLoadSections() {
    const lazySections = document.querySelectorAll('[data-lazy-section]');
    if (!lazySections.length) return;

    if (!('IntersectionObserver' in window)) {
      lazySections.forEach((section) => section.classList.add('loaded'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' });

    lazySections.forEach((section) => observer.observe(section));
  }

  function initFABMenu() {
    const fabContainer = document.querySelector('.fab-container');
    if (!fabContainer) return;

    const mainButton = fabContainer.querySelector('.fab-main');
    const actions = fabContainer.querySelector('.fab-actions');
    if (!mainButton) return;

    const setExpanded = (expanded) => {
      mainButton.setAttribute('aria-expanded', String(expanded));
      if (actions) {
        actions.setAttribute('aria-hidden', String(!expanded));
      }
    };

    mainButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = fabContainer.classList.toggle('fab-open');
      setExpanded(isOpen);
    });

    document.addEventListener('click', (event) => {
      if (!fabContainer.contains(event.target)) {
        if (fabContainer.classList.contains('fab-open')) {
          fabContainer.classList.remove('fab-open');
          setExpanded(false);
        }
      }
    });
  }

  function detectDeviceCapability() {
    const hardwareConcurrency = 'hardwareConcurrency' in navigator ? navigator.hardwareConcurrency : 4;
    const deviceMemory = 'deviceMemory' in navigator ? navigator.deviceMemory : 4;
    const userAgent = typeof navigator.userAgent === 'string' ? navigator.userAgent : '';
    const isLowEndDevice = hardwareConcurrency <= 4 || deviceMemory <= 4 || /Android [1-7]/.test(userAgent);

    if (isLowEndDevice) {
      document.body.classList.add('low-end-device');
    }
  }

  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      switch (event.key) {
        case '/': {
          event.preventDefault();
          document.querySelector('.mobile-menu-btn')?.focus();
          break;
        }
        case 'w': {
          event.preventDefault();
          document.querySelector('.fab-main')?.click();
          break;
        }
        case 'Escape': {
          const mobileNav = document.getElementById('mobileNav');
          const overlay = document.getElementById('mobileOverlay');
          const menuBtn = document.getElementById('mobileMenuBtn');
          if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileNav.classList.remove('animation-complete');
            overlay?.classList.remove('active');
            overlay?.classList.remove('animation-complete');
            overlay?.setAttribute('aria-hidden', 'true');
            menuBtn?.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            menuBtn?.focus();
          }
          break;
        }
        default:
          break;
      }
    });
  }

  function initAccessibility() {
    if (!document.body) return;

    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    if (!document.getElementById('main-content')) {
      const mainTarget = document.querySelector('main, [role="main"], .hero, .container');
      if (mainTarget) {
        mainTarget.setAttribute('id', 'main-content');
      }
    }
  }

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

  function checkPerformance() {
    if (window.performance && window.performance.timing) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log('Page Load Time:', `${pageLoadTime}ms`);

      if (pageLoadTime > 3000) {
        console.warn('⚠️ Page load exceeds 3s budget!');
      }
    }
  }

  function initApp() {
    initAccessibility();
    detectDeviceCapability();
    initKeyboardShortcuts();
    initScrollAnimations();
    initEnhancedCounters();
    initHeroButtonPulse();
    initWhatsAppPulse();
    initProgressiveImageLoading();
    initTypewriterEffect();
    initSmoothScroll();
    initAdvancedParallax();
    initGalleryFilter();
    initFormAnimations();
    initStaggeredCards();
    initMobileMenu();
    enhanceMobileMenuAccessibility();
    initNavScroll();
    initTestimonialsCarousel();
    initRippleEffect();
    initMagneticButtons();
    initScrollProgress();
    initLazyLoadSections();
    initFABMenu();

    window.showToast = showToast;
  }

  document.addEventListener('DOMContentLoaded', initApp);
  window.addEventListener('load', checkPerformance);
})();
