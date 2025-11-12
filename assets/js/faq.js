/**
 * FAQ Accordion Functionality
 * Handles expanding/collapsing FAQ items with smooth animations
 */

(function() {
  'use strict';

  // Initialize FAQ accordion
  function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function(question) {
      question.addEventListener('click', function() {
        toggleFAQItem(this);
      });
    });

    // Handle hash navigation (e.g., #admissions)
    if (window.location.hash) {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        setTimeout(function() {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }

    // Handle category link clicks
    const categoryLinks = document.querySelectorAll('.faq-category-link');
    categoryLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Update URL hash without jumping
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // Toggle individual FAQ item
  function toggleFAQItem(questionButton) {
    const faqItem = questionButton.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';

    // Close all other FAQ items in the same section (optional - for accordion behavior)
    // Comment out the next 3 lines if you want multiple FAQs to be open at once
    const section = questionButton.closest('.faq-section');
    const allQuestions = section.querySelectorAll('.faq-question');
    allQuestions.forEach(q => {
      if (q !== questionButton && q.getAttribute('aria-expanded') === 'true') {
        toggleFAQItem(q);
      }
    });

    // Toggle current item
    if (isExpanded) {
      // Close
      questionButton.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = null;
      faqItem.classList.remove('active');
    } else {
      // Open
      questionButton.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      faqItem.classList.add('active');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
  } else {
    initFAQ();
  }
})();
