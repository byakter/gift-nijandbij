/* gate.js — Age-gate overlay shared across all pages.
   Include via <script src="gate.js"></script> before </body> on every page.
   Shows a full-screen overlay if sessionStorage "ageVerified" is not set.
   On success sets "ageVerified" and removes the overlay. */

(function () {
  'use strict';
  if (sessionStorage.getItem('ageVerified')) return;

  /* ── CSS ──────────────────────────────────────────────────────── */
  var s = document.createElement('style');
  s.textContent = [
    '#age-gate-overlay{position:fixed;inset:0;z-index:99999;background:#FAF7F2;display:flex;align-items:center;justify-content:center;padding:24px;font-family:\'Inter\',system-ui,sans-serif}',
    '.age-gate-wrap{background:#FAF7F2;border-radius:20px;padding:56px 48px 48px;max-width:440px;width:100%;text-align:center}',
    '@media(max-width:480px){.age-gate-wrap{padding:40px 28px 36px}}',
    '.age-gate-brand{font-size:.72rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#2D5C3F;margin-bottom:24px}',
    '.age-gate-title{font-size:clamp(1.5rem,3vw,1.85rem);font-weight:800;color:#1C2B1E;line-height:1.15;margin-bottom:12px}',
    '.age-gate-sub{font-size:.94rem;color:#6B7C72;line-height:1.65;margin:0 auto 32px;max-width:320px}',
    '.age-gate-input{width:100%;padding:14px 16px;font-size:1.05rem;font-family:\'Inter\',system-ui,sans-serif;border:1.5px solid #D5CDBE;border-radius:10px;background:#fff;color:#1E3F2B;text-align:center;letter-spacing:.06em;outline:none;transition:border-color .2s;-moz-appearance:textfield;box-sizing:border-box}',
    '.age-gate-input::-webkit-outer-spin-button,.age-gate-input::-webkit-inner-spin-button{-webkit-appearance:none}',
    '.age-gate-input:focus{border-color:#2D5C3F}',
    '.age-gate-input.error{border-color:#b83232}',
    '.age-gate-error{font-size:.8rem;color:#b83232;margin-top:8px;min-height:1.2em;text-align:center}',
    '.age-gate-btn{width:100%;padding:16px;margin-top:16px;font-size:1rem;font-weight:600;font-family:\'Inter\',system-ui,sans-serif;background:#2D5C3F;color:#F2EDE3;border:none;border-radius:10px;cursor:pointer;transition:background .2s,transform .2s;box-sizing:border-box}',
    '.age-gate-btn:hover{background:#4A8060;transform:translateY(-1px)}',
    '.age-gate-btn:active{transform:translateY(0)}',
    '.age-gate-legal{font-size:.7rem;color:#AABAA8;line-height:1.55;margin-top:24px}',
    '.age-gate-denied-title{font-size:1.4rem;font-weight:700;color:#1C2B1E;margin-bottom:14px}',
    '.age-gate-denied-msg{font-size:.95rem;color:#6B7C72;line-height:1.7}'
  ].join('');
  document.head.appendChild(s);

  /* ── HTML ─────────────────────────────────────────────────────── */
  var el = document.createElement('div');
  el.id = 'age-gate-overlay';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Age verification');
  el.innerHTML =
    '<div class="age-gate-wrap" id="age-gate-check">' +
      '<p class="age-gate-brand">NIJ &amp; BIJ</p>' +
      '<h2 class="age-gate-title">Welcome to NIJ &amp; BIJ</h2>' +
      '<p class="age-gate-sub">Our products contain alcohol. Please enter your year of birth to continue.</p>' +
      '<input type="number" id="age-gate-year" class="age-gate-input" placeholder="Year of birth (YYYY)" min="1900" max="2010" inputmode="numeric" autocomplete="bday-year" aria-label="Year of birth">' +
      '<p class="age-gate-error" id="age-gate-err" aria-live="polite"></p>' +
      '<button class="age-gate-btn" id="age-gate-submit">Enter Site</button>' +
      '<p class="age-gate-legal">By entering, you confirm you are of legal drinking age in your country.</p>' +
    '</div>' +
    '<div class="age-gate-wrap" id="age-gate-denied" style="display:none" role="alert">' +
      '<p class="age-gate-brand">NIJ &amp; BIJ</p>' +
      '<p class="age-gate-denied-title">Access Restricted</p>' +
      '<p class="age-gate-denied-msg">Sorry, this site is intended for adults only. You must be 18 or older to enter.</p>' +
    '</div>';

  document.body.appendChild(el);
  document.body.style.overflow = 'hidden';

  /* ── Logic ────────────────────────────────────────────────────── */
  var input   = document.getElementById('age-gate-year');
  var errorEl = document.getElementById('age-gate-err');

  document.getElementById('age-gate-submit').addEventListener('click', verify);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') verify(); });

  function verify() {
    var val  = input.value.trim();
    var year = parseInt(val, 10);
    var now  = new Date().getFullYear();
    errorEl.textContent = '';
    input.classList.remove('error');

    if (!val || isNaN(year) || val.length !== 4 || year < 1900 || year > now) {
      errorEl.textContent = 'Please enter a valid year of birth.';
      input.classList.add('error');
      return;
    }

    if (now - year >= 18) {
      sessionStorage.setItem('ageVerified', '1');
      el.remove();
      document.body.style.overflow = '';
    } else {
      document.getElementById('age-gate-check').style.display = 'none';
      document.getElementById('age-gate-denied').removeAttribute('style');
    }
  }
})();
