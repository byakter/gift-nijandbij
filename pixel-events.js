(function () {
  'use strict';

  // Guard: prevent double-init if script is somehow included twice
  if (window.__nibPixelLoaded) return;
  window.__nibPixelLoaded = true;

  function safe(fn) {
    if (typeof fbq === 'function') fn();
  }

  /* ── 1. ViewContent — fires once on service/product pages ─────────── */
  var SERVICE_SLUGS = ['gifts', 'bar', 'rosh-hashanah'];
  var currentPath = window.location.pathname;
  if (SERVICE_SLUGS.some(function (s) { return currentPath.indexOf(s) !== -1; })) {
    safe(function () {
      fbq('track', 'ViewContent', {
        content_name: document.title,
        content_category: 'Service Page'
      });
    });
  }

  /* ── 2. WhatsApp click tracking (event delegation, capture phase) ───
     Catches <a href="wa.me/…"> anchors AND <button class="btn-wa"> buttons.
     Capture phase ensures the event fires even if a child stops bubbling. */
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el.tagName) {
      var href    = (el.tagName === 'A') ? (el.getAttribute('href') || '') : '';
      var isWaHref = href.indexOf('wa.me') !== -1 ||
                     href.indexOf('api.whatsapp.com') !== -1 ||
                     href.indexOf('whatsapp://') !== -1;
      var isWaBtn  = el.classList && el.classList.contains('btn-wa');
      if (isWaHref || isWaBtn) {
        safe(function () {
          fbq('track', 'Contact', {
            content_name: 'WhatsApp Click',
            content_category: 'Contact'
          });
        });
        return;
      }
      el = el.parentElement;
    }
  }, true);

  /* ── 3. CTA click tracking ──────────────────────────────────────────
     Matches button/link text for the listed CTA phrases (EN + HE).
     Fires CTA_Click with the actual rendered text and current path. */
  var CTA_RE = /get\s+a?\s*quote|request\s+a?\s*quote|contact\s+us|book\s+workshop|דברו\s+איתנו|קבלו\s+הצעה|הזמינו\s+עכשיו/i;

  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el.tagName) {
      if (el.tagName === 'A' || el.tagName === 'BUTTON') {
        var text = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
        if (CTA_RE.test(text)) {
          safe(function () {
            fbq('trackCustom', 'CTA_Click', {
              button_text: text,
              page_path: window.location.pathname
            });
          });
          return;
        }
      }
      el = el.parentElement;
    }
  });

})();
