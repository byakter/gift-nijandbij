/* kits.js — Renders the Kits page from window.KITS_DATA (assets/kits-data.js).
   Shared by kits.html and he/kits.html: include after kits-data.js and before the page script
   (which starts the .fade-up observer), e.g. <script src="kits.js?v=1"></script>.
   UI text follows the page's language (<html lang>); product text comes from the data file. */

(function () {
  'use strict';

  var data = window.KITS_DATA;
  if (!data) return;

  /* ── Text ─────────────────────────────────────────────────────── */
  var lang = /^he\b/i.test(document.documentElement.lang || '') ? 'he' : 'en';
  var TEXT = {
    en: {
      includes:   'Box includes:',
      vat:        'incl. VAT',
      addToOrder: 'Add to order',
      outOfStock: 'Out of stock'
    }
  };
  var t = TEXT[lang] || TEXT.en;

  /* Picks the page language from an { en, he } field, falling back to English */
  function local(field) {
    return field ? (field[lang] || field.en) : '';
  }

  /* ── Helpers ──────────────────────────────────────────────────── */
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  var PLACEHOLDER_ICON =
    '<svg viewBox="0 0 24 24" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/>' +
      '<line x1="12" y1="22" x2="12" y2="7"/>' +
      '<path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>' +
    '</svg>';

  function placeholder() {
    var ph = el('div', 'shop-card-placeholder');
    ph.innerHTML = PLACEHOLDER_ICON;
    return ph;
  }

  /* Photo from assets/, or the placeholder when the file is not set or fails to load */
  function cardImage(product) {
    var wrap = el('div', 'shop-card-img');
    if (product.image) {
      var img = el('img');
      img.src = '/assets/' + product.image;
      img.alt = product.name;
      img.width = 600;
      img.height = 480;
      img.loading = 'lazy';
      img.addEventListener('error', function () { wrap.replaceChild(placeholder(), img); });
      wrap.appendChild(img);
    } else {
      wrap.appendChild(placeholder());
    }
    if (product.available === false) wrap.appendChild(el('span', 'shop-card-badge', t.outOfStock));
    return wrap;
  }

  function priceLine(amount) {
    var row = el('div', 'shop-card-price');
    row.appendChild(el('span', 'shop-card-price-amount', String(amount)));
    row.appendChild(el('span', 'shop-card-price-currency', '₪'));
    row.appendChild(el('span', 'shop-card-price-vat', t.vat));
    return row;
  }

  function addButton(kind, product) {
    var btn = el('button', 'btn btn-primary btn-full', t.addToOrder);
    btn.type = 'button';
    btn.setAttribute('data-kind', kind);
    btn.setAttribute('data-id', product.id);
    if (product.available === false) btn.disabled = true;
    return btn;
  }

  /* Card shell shared by boxes and bottles; staggered fade-in per column */
  function card(product, index) {
    var art = el('article', 'shop-card fade-up' + (index % 3 ? ' fade-up-d' + (index % 3) : ''));
    if (product.available === false) art.classList.add('is-unavailable');
    art.setAttribute('aria-label', product.name);
    art.appendChild(cardImage(product));
    var body = el('div', 'shop-card-body');
    body.appendChild(el('h3', 'shop-card-name', product.name));
    body.appendChild(el('p', 'shop-card-desc', local(product.description)));
    art.appendChild(body);
    return { node: art, body: body };
  }

  /* ── Gift boxes ───────────────────────────────────────────────── */
  function boxCard(box, index) {
    var c = card(box, index);
    var items = local(box.contents) || [];
    if (items.length) {
      c.body.appendChild(el('p', 'shop-card-includes-label', t.includes));
      var list = el('ul', 'shop-card-includes');
      items.forEach(function (item) { list.appendChild(el('li', null, item)); });
      c.body.appendChild(list);
    }
    c.body.appendChild(priceLine(box.price));
    c.body.appendChild(addButton('box', box));
    return c.node;
  }

  var boxesGrid = document.getElementById('kits-boxes');
  if (boxesGrid) {
    (data.boxes || []).forEach(function (box, i) { boxesGrid.appendChild(boxCard(box, i)); });
  }
})();
