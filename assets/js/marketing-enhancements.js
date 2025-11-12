// Marketing Enhancements JavaScript - Veer Patta Public School
// Handles testimonials carousel, FAQ accordion, and related animations

/* ============================================
   TESTIMONIALS CAROUSEL WITH AUTO-ROTATION
   Auto-advances every 5 seconds with manual controls
   ============================================ */
(function initTestimonialsCarousel() {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.testimonial-slide');
  const prevBtn = carousel.querySelector('.testimonial-nav.prev');
  const nextBtn = carousel.querySelector('.testimonial-nav.next');
  const dotsContainer = carousel.querySelector('.testimonial-dots');

  if (!slides.length) return;

  let currentSlide = 0;
  let autoRotateTimer;
  const autoRotateInterval = 5000; // 5 seconds

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (index + 1));
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');

  function goToSlide(index) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    // Update current slide index
    currentSlide = index;

    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    // Reset auto-rotation timer
    resetAutoRotate();
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  function startAutoRotate() {
    autoRotateTimer = setInterval(nextSlide, autoRotateInterval);
  }

  function stopAutoRotate() {
    clearInterval(autoRotateTimer);
  }

  function resetAutoRotate() {
    stopAutoRotate();
    startAutoRotate();
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // Pause auto-rotation on hover
  carousel.addEventListener('mouseenter', stopAutoRotate);
  carousel.addEventListener('mouseleave', startAutoRotate);

  // Pause auto-rotation when page is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoRotate();
    } else {
      startAutoRotate();
    }
  });

  // Start auto-rotation
  startAutoRotate();
})();

/* ============================================
   FAQ ACCORDION FUNCTIONALITY
   Smooth expand/collapse with animations
   ============================================ */
(function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';

      // Close all other FAQs (accordion behavior)
      faqItems.forEach(otherItem => {
        const otherQuestion = otherItem.querySelector('.faq-question');
        const otherAnswer = otherItem.querySelector('.faq-answer');

        if (otherItem !== item) {
          otherQuestion.setAttribute('aria-expanded', 'false');
          otherAnswer.classList.remove('open');
        }
      });

      // Toggle current FAQ
      if (isExpanded) {
        question.setAttribute('aria-expanded', 'false');
        answer.classList.remove('open');
      } else {
        question.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');

        // Smooth scroll to question if it's out of view
        setTimeout(() => {
          const rect = question.getBoundingClientRect();
          const headerHeight = 80; // Adjust based on your header height

          if (rect.top < headerHeight) {
            window.scrollTo({
              top: window.scrollY + rect.top - headerHeight - 20,
              behavior: 'smooth'
            });
          }
        }, 300);
      }
    });

    // Keyboard accessibility
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
})();

/* ============================================
   TRUST BADGES HORIZONTAL SCROLL ENHANCEMENT
   Smooth scrolling and touch support
   ============================================ */
(function initTrustBadgesScroll() {
  const badgesWrapper = document.querySelector('.trust-badges-wrapper');
  if (!badgesWrapper) return;

  // Only apply on mobile/tablet where scrolling is needed
  if (window.innerWidth >= 900) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  badgesWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    badgesWrapper.style.cursor = 'grabbing';
    startX = e.pageX - badgesWrapper.offsetLeft;
    scrollLeft = badgesWrapper.scrollLeft;
  });

  badgesWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    badgesWrapper.style.cursor = 'grab';
  });

  badgesWrapper.addEventListener('mouseup', () => {
    isDown = false;
    badgesWrapper.style.cursor = 'grab';
  });

  badgesWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - badgesWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    badgesWrapper.scrollLeft = scrollLeft - walk;
  });

  // Touch support
  badgesWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - badgesWrapper.offsetLeft;
    scrollLeft = badgesWrapper.scrollLeft;
  }, { passive: true });

  badgesWrapper.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - badgesWrapper.offsetLeft;
    const walk = (x - startX) * 2;
    badgesWrapper.scrollLeft = scrollLeft - walk;
  }, { passive: true });
})();

/* ============================================
   ANIMATE WHY CHOOSE US CARDS ON SCROLL
   ============================================ */
(function initWhyChooseUsAnimation() {
  const whyChooseCards = document.querySelectorAll('.why-choose-card');
  if (!whyChooseCards.length) return;

  if (!('IntersectionObserver' in window)) {
    whyChooseCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation
        setTimeout(() => {
          entry.target.classList.add('animate-fadeUp', 'animated');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  whyChooseCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    observer.observe(card);
  });
})();

/* ============================================
   ANIMATE TRUST BADGES ON SCROLL
   ============================================ */
(function initTrustBadgesAnimation() {
  const badges = document.querySelectorAll('.trust-badge');
  if (!badges.length) return;

  if (!('IntersectionObserver' in window)) {
    badges.forEach(badge => {
      badge.style.opacity = '1';
      badge.style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation
        setTimeout(() => {
          entry.target.classList.add('animate-slideIn', 'animated');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  badges.forEach(badge => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateX(-20px)';
    observer.observe(badge);
  });
})();

console.log('Marketing enhancements loaded - Testimonials carousel, FAQ accordion, and animations ready');
