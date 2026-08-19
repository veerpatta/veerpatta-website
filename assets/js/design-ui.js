/* ============================================
   DESIGN UI
   Interactions the ported design needs that the repo did not
   already provide. Everything else reuses what was here:
   admission-wizard.js, fee-calculator.js, gallery-loader.js and
   marketing-enhancements.js (FAQ accordion).
   ============================================ */

/* --------------------------------------------
   Enquiry buttons
   The drawer already exposes window.openEnquiryDrawer(); the design's
   hero and CTA bands just need to be wired to it.
   -------------------------------------------- */
(function initEnquiryTriggers() {
  'use strict';

  var triggers = document.querySelectorAll('[data-enquiry-open]');
  if (!triggers.length) return;

  Array.prototype.forEach.call(triggers, function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (typeof window.openEnquiryDrawer === 'function') {
        window.openEnquiryDrawer();
      } else {
        // Drawer include missing on this page — fall back to contact.
        var base = window.SITE_BASEURL || '';
        var lang = document.documentElement.lang === 'hi' ? 'hi' : 'en';
        window.location.href = base + '/' + lang + '/contact/';
      }
    });
  });
})();

/* --------------------------------------------
   Notice filters
   Chips carry data-notice-filter; rows carry data-notice-kind.
   The first chip is "all" and matches everything.
   -------------------------------------------- */
(function initNoticeFilter() {
  'use strict';

  var chips = document.querySelectorAll('[data-notice-filter]');
  if (!chips.length) return;

  var rows = document.querySelectorAll('[data-notice-kind]');
  if (!rows.length) return;

  function apply(filter, isFirst) {
    Array.prototype.forEach.call(rows, function (row) {
      var kind = row.getAttribute('data-notice-kind') || '';
      var show = isFirst || kind === filter;
      if (show) {
        row.removeAttribute('hidden');
      } else {
        row.setAttribute('hidden', '');
      }
    });
  }

  Array.prototype.forEach.call(chips, function (chip, i) {
    chip.addEventListener('click', function () {
      Array.prototype.forEach.call(chips, function (c) {
        c.classList.remove('is-active');
        c.setAttribute('aria-pressed', 'false');
      });
      chip.classList.add('is-active');
      chip.setAttribute('aria-pressed', 'true');
      apply(chip.getAttribute('data-notice-filter'), i === 0);
    });
    chip.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
  });
})();
