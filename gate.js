/* gate.js — Age-gate overlay shared across all pages.
   Include via <script src="gate.js"></script> before </body> on every page.
   Shows a full-screen overlay if sessionStorage "ageVerified" is not set.
   Asks "18 or older?" in the page's language (<html lang>; Hebrew is RTL).
   "Yes" sets "ageVerified" and removes the overlay; "No" shows the restricted message. */

(function () {
  'use strict';
  if (sessionStorage.getItem('ageVerified')) return;

  /* ── Text ─────────────────────────────────────────────────────── */
  var isHe = /^he\b/i.test(document.documentElement.lang || '');
  var t = isHe ? {
    title:       'אימות גיל',
    question:    'האם מלאו לך 18?',
    yes:         'כן',
    no:          'לא',
    deniedTitle: 'הגישה מוגבלת',
    deniedMsg:   'מצטערים, האתר מיועד למי שמלאו לו 18 בלבד.'
  } : {
    title:       'Age verification',
    question:    'Are you 18 or older?',
    yes:         'Yes',
    no:          'No',
    deniedTitle: 'Access Restricted',
    deniedMsg:   'Sorry, this site is intended for adults only. You must be 18 or older to enter.'
  };

  /* ── CSS ──────────────────────────────────────────────────────── */
  var s = document.createElement('style');
  s.textContent = [
    '#age-gate-overlay{position:fixed;inset:0;z-index:99999;background:#FAF7F2;display:flex;align-items:center;justify-content:center;padding:24px;font-family:\'Inter\',system-ui,sans-serif}',
    '.age-gate-wrap{background:#FAF7F2;border-radius:20px;padding:56px 48px 48px;max-width:440px;width:100%;text-align:center}',
    '@media(max-width:480px){.age-gate-wrap{padding:40px 28px 36px}}',
    '.age-gate-brand{font-size:.72rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#2D5C3F;margin-bottom:24px}',
    '.age-gate-title{font-size:clamp(1.5rem,3vw,1.85rem);font-weight:800;color:#1C2B1E;line-height:1.15;margin-bottom:12px}',
    '.age-gate-sub{font-size:.94rem;color:#6B7C72;line-height:1.65;margin:0 auto 32px;max-width:320px}',
    '.age-gate-btns{display:flex;gap:12px}',
    '.age-gate-btn{flex:1;padding:16px;font-size:1rem;font-weight:600;font-family:\'Inter\',system-ui,sans-serif;background:#2D5C3F;color:#F2EDE3;border:1.5px solid #2D5C3F;border-radius:10px;cursor:pointer;transition:background .2s,border-color .2s,transform .2s;box-sizing:border-box}',
    '.age-gate-btn:hover{background:#4A8060;border-color:#4A8060;transform:translateY(-1px)}',
    '.age-gate-btn:active{transform:translateY(0)}',
    '.age-gate-btn-no{background:transparent;color:#2D5C3F;border-color:#D5CDBE}',
    '.age-gate-btn-no:hover{background:#fff;border-color:#2D5C3F}',
    '.age-gate-denied-title{font-size:1.4rem;font-weight:700;color:#1C2B1E;margin-bottom:14px}',
    '.age-gate-denied-msg{font-size:.95rem;color:#6B7C72;line-height:1.7}'
  ].join('');
  document.head.appendChild(s);

  /* ── HTML ─────────────────────────────────────────────────────── */
  var el = document.createElement('div');
  el.id = 'age-gate-overlay';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', t.title);
  el.setAttribute('lang', isHe ? 'he' : 'en');
  el.setAttribute('dir', isHe ? 'rtl' : 'ltr');
  el.innerHTML =
    '<div class="age-gate-wrap" id="age-gate-check">' +
      '<p class="age-gate-brand">NIJ &amp; BIJ</p>' +
      '<h2 class="age-gate-title">' + t.title + '</h2>' +
      '<p class="age-gate-sub">' + t.question + '</p>' +
      '<div class="age-gate-btns">' +
        '<button type="button" class="age-gate-btn" id="age-gate-yes">' + t.yes + '</button>' +
        '<button type="button" class="age-gate-btn age-gate-btn-no" id="age-gate-no">' + t.no + '</button>' +
      '</div>' +
    '</div>' +
    '<div class="age-gate-wrap" id="age-gate-denied" style="display:none" role="alert">' +
      '<p class="age-gate-brand">NIJ &amp; BIJ</p>' +
      '<p class="age-gate-denied-title">' + t.deniedTitle + '</p>' +
      '<p class="age-gate-denied-msg">' + t.deniedMsg + '</p>' +
    '</div>';

  document.body.appendChild(el);
  document.body.style.overflow = 'hidden';

  /* ── Logic ────────────────────────────────────────────────────── */
  document.getElementById('age-gate-yes').addEventListener('click', function () {
    sessionStorage.setItem('ageVerified', '1');
    el.remove();
    document.body.style.overflow = '';
  });

  document.getElementById('age-gate-no').addEventListener('click', function () {
    document.getElementById('age-gate-check').style.display = 'none';
    document.getElementById('age-gate-denied').removeAttribute('style');
  });
})();
