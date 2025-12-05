// Marketing Enhancements JavaScript - Veer Patta Public School
// Handles testimonials carousel, FAQ accordion, and related animations

/* ============================================
   TESTIMONIALS CAROUSEL
   NOTE: Carousel initialization is handled in main.js
   to avoid duplicate event listeners and race conditions.
   See main.js initTestimonialsCarousel() for implementation.
   ============================================ */

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
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const whyChooseCards = document.querySelectorAll('.why-choose-card, .stat-card-modern');
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
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

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

/* ============================================
   SHRINKING HEADER ON SCROLL
   Compact header with icon-only navigation
   ============================================ */
(function initShrinkingHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const shrinkOffset = 50; // px scroll threshold

  function onScroll() {
    if (window.scrollY > shrinkOffset) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }
  }

  // Initial check in case page loads scrolled
  onScroll();

  // Listen for scroll events
  window.addEventListener('scroll', onScroll, { passive: true });
})();

console.log('Marketing enhancements loaded - Testimonials carousel, FAQ accordion, animations, and shrinking header ready');
