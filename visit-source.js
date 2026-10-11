/* visit-source.js — Remembers where a visitor came from and adds it to lead forms.
   Include via <script defer src="visit-source.js"></script> on every page.
   Saves UTM params, landing page and external referrer in localStorage for 30 days.
   A visit with new UTMs or from another site replaces the saved record;
   a direct visit keeps it. Values are added as hidden fields to the lead forms. */

(function () {
  'use strict';

  var KEY      = 'nib_visit_source';
  var MAX_AGE  = 30 * 24 * 60 * 60 * 1000;
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  var FIELDS   = UTM_KEYS.concat(['landing_page', 'referrer']);
  var FORM_IDS = ['lead-form', 'bar-quote-form', 'workshop-quote-form'];

  /* ── Current visit ────────────────────────────────────────────── */
  var params = new URLSearchParams(window.location.search);
  var hasUtm = UTM_KEYS.some(function (k) { return params.get(k); });

  function bareHost(h) { return h.replace(/^www\./, ''); }
  var referrer = '';
  try {
    if (document.referrer &&
        bareHost(new URL(document.referrer).hostname) !== bareHost(window.location.hostname)) {
      referrer = document.referrer;
    }
  } catch (_) {}

  /* ── Saved record: keep, expire or replace ────────────────────── */
  var rec = null;
  try {
    rec = JSON.parse(localStorage.getItem(KEY));
    if (!rec || !(Date.now() - rec.saved_at < MAX_AGE)) rec = null;
  } catch (_) { rec = null; }

  if (!rec || hasUtm || referrer) {
    rec = { saved_at: Date.now() };
    UTM_KEYS.forEach(function (k) { rec[k] = params.get(k) || ''; });
    rec.landing_page = window.location.pathname + window.location.search;
    rec.referrer = referrer;
    try { localStorage.setItem(KEY, JSON.stringify(rec)); } catch (_) {}
  }

  /* ── Hidden fields on lead forms (only fields with a value) ───── */
  FORM_IDS.forEach(function (id) {
    var form = document.getElementById(id);
    if (!form) return;
    FIELDS.forEach(function (name) {
      if (!rec[name] || form.querySelector('input[name="' + name + '"]')) return;
      var input = document.createElement('input');
      input.type  = 'hidden';
      input.name  = name;
      input.value = rec[name];
      form.appendChild(input);
    });
  });
})();
