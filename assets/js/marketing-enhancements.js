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
   Logic consolidated in animations.css and common observers
   ============================================ */
// Logic removed to prevent duplicates with main.js handlers

/* ============================================
   ANIMATE TRUST BADGES ON SCROLL
   Logic consolidated in animations.css and common observers
   ============================================ */
// Logic removed to prevent duplicates with main.js handlers

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
