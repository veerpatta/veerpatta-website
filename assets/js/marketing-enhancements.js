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

  // Ensure first slide is active on initialization
  // This handles cases where HTML might not have 'active' class
  slides.forEach((slide, index) => {
    if (index === 0) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

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

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: cards are already visible by default CSS
    whyChooseCards.forEach((card) => {
      card.classList.add('animated');
    });
    return;
  }

  // Helper function to check if element is at least partially in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // Check if element is at least partially visible
    return (
      rect.top < windowHeight &&
      rect.bottom > 0 &&
      rect.left < windowWidth &&
      rect.right > 0
    );
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Get the index from the card's data attribute
        const index = parseInt(entry.target.dataset.cardIndex || '0', 10);
        // Stagger animation
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  // Check each card and handle accordingly
  whyChooseCards.forEach((card, index) => {
    // Store index for stagger animation
    card.dataset.cardIndex = index;

    // Add the animate-fadeUp class to set initial hidden state
    card.classList.add('animate-fadeUp');

    // Check if card is already in viewport
    if (isInViewport(card)) {
      // Card is above fold - trigger animation immediately with stagger delay
      setTimeout(() => {
        card.classList.add('animated');
      }, index * 100);
    } else {
      // Card is below fold, observe for intersection
      observer.observe(card);
    }
  });
})();

/* ============================================
   ANIMATE TRUST BADGES ON SCROLL
   ============================================ */
(function initTrustBadgesAnimation() {
  const badges = document.querySelectorAll('.trust-badge');
  if (!badges.length) return;

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: badges are already visible by default CSS
    badges.forEach((badge) => {
      badge.classList.add('animated');
    });
    return;
  }

  // Helper function to check if element is at least partially in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    // Check if element is at least partially visible
    return (
      rect.top < windowHeight &&
      rect.bottom > 0 &&
      rect.left < windowWidth &&
      rect.right > 0
    );
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Get the index from the badge's data attribute
        const index = parseInt(entry.target.dataset.badgeIndex || '0', 10);
        // Stagger animation
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  // Check each badge and handle accordingly
  badges.forEach((badge, index) => {
    // Store index for stagger animation
    badge.dataset.badgeIndex = index;

    // Add the animate-slideIn class to set initial hidden state
    badge.classList.add('animate-slideIn');

    // Check if badge is already in viewport
    if (isInViewport(badge)) {
      // Badge is above fold - trigger animation immediately with stagger delay
      setTimeout(() => {
        badge.classList.add('animated');
      }, index * 80);
    } else {
      // Badge is below fold, observe for intersection
      observer.observe(badge);
    }
  });
})();

console.log('Marketing enhancements loaded - Testimonials carousel, FAQ accordion, and animations ready');
