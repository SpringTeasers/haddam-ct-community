/* ==========================================================================
   Haddam, Connecticut — Community Site · site.js
   Progressive enhancement only: mobile menu disclosure + business directory
   filter. Every page is complete and navigable with JavaScript disabled.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- nav - */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function closeNav(returnFocus) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.hidden = true;
    document.body.classList.remove('nav-open');
    if (returnFocus) toggle.focus();
  }

  function openNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'true');
    nav.hidden = false;
    document.body.classList.add('nav-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') {
        closeNav(false);
      } else {
        openNav();
      }
    });

    /* Escape closes the menu and returns focus to the toggle. */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeNav(true);
      }
    });

    /* Clicking outside the header closes the menu. */
    document.addEventListener('click', function (e) {
      if (
        toggle.getAttribute('aria-expanded') === 'true' &&
        !e.target.closest('.site-header')
      ) {
        closeNav(false);
      }
    });

    /* Reset state when we grow past the mobile breakpoint. */
    var mq = window.matchMedia('(min-width: 768px)');
    var onBreakpoint = function (e) {
      if (e.matches) {
        nav.hidden = false;
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      } else {
        nav.hidden = true;
      }
    };
    if (mq.addEventListener) mq.addEventListener('change', onBreakpoint);
    else if (mq.addListener) mq.addListener(onBreakpoint);
  }

  /* -------------------------------------------------- business filter --- */
  var filterForm = document.getElementById('directory-filter');
  if (filterForm) {
    var searchInput = document.getElementById('business-search');
    var categorySelect = document.getElementById('business-category');
    var clearButton = filterForm.querySelector('[data-clear]');
    var status = document.getElementById('filter-status');
    var cards = Array.prototype.slice.call(
      document.querySelectorAll('[data-business]')
    );
    var sections = Array.prototype.slice.call(
      document.querySelectorAll('[data-category-section]')
    );

    var apply = function () {
      var term = (searchInput && searchInput.value ? searchInput.value : '')
        .trim()
        .toLowerCase();
      var category = categorySelect ? categorySelect.value : '';
      var shown = 0;

      cards.forEach(function (card) {
        var haystack = (card.getAttribute('data-search') || '').toLowerCase();
        var cardCategory = card.getAttribute('data-category') || '';
        var matchesTerm = term === '' || haystack.indexOf(term) !== -1;
        var matchesCategory = category === '' || cardCategory === category;
        var visible = matchesTerm && matchesCategory;
        card.hidden = !visible;
        if (visible) shown += 1;
      });

      /* Hide a category section entirely when none of its cards match. */
      sections.forEach(function (section) {
        var visibleCards = section.querySelectorAll('[data-business]:not([hidden])');
        section.hidden = visibleCards.length === 0;
      });

      if (status) {
        status.textContent =
          shown === 1
            ? 'Showing 1 business.'
            : 'Showing ' + shown + ' businesses.';
      }
    };

    filterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      apply();
    });
    if (searchInput) searchInput.addEventListener('input', apply);
    if (categorySelect) categorySelect.addEventListener('change', apply);
    if (clearButton) {
      clearButton.addEventListener('click', function () {
        if (searchInput) searchInput.value = '';
        if (categorySelect) categorySelect.value = '';
        apply();
        if (searchInput) searchInput.focus();
      });
    }

    /* Initialise the announced count on load. */
    apply();
  }
})();
