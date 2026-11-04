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
      outOfStock: 'Out of stock',
      size:       'Size',
      sizes:      { '200ml': '200ml', '500ml': '500ml', '1000ml': '1000ml' },

      /* Order form */
      itemsTitle:     'Your items',
      product:        'Product',
      chooseProduct:  'Choose a product',
      groupBoxes:     'Gift Boxes',
      groupBottles:   'Bottles',
      quantity:       'Quantity',
      removeItem:     'Remove item',
      addItem:        'Add another item',
      detailsTitle:   'Your details',
      fullName:       'Full name',
      phone:          'Phone',
      email:          'Email',
      emailHint:      '(required to send by email)',
      company:        'Company',
      notes:          'Notes',
      optional:       '(optional)',
      notesHint:      'Anything else we should know…',
      deliveryTitle:  'Delivery',
      shipping:       'Shipping anywhere in Israel - {price} ILS',
      pickup:         'Self pickup from Tel Giborim 5, Tel Aviv, by prior arrangement',
      address:        'Delivery address',
      addressHint:    'Street, number, city',
      summaryTitle:   'Order summary',
      summaryVat:     'All prices incl. VAT',
      noItems:        'No items yet',
      subtotal:       'Items subtotal',
      shippingLine:   'Shipping',
      notSelected:    'Not selected yet',
      total:          'Estimated total',
      summaryNote:    'This is an estimate. After we receive your order we\'ll send an invoice with a secure payment link.',
      sendEmail:      'Send by email',
      sendWhatsApp:   'Send via WhatsApp',
      announceAdded:  '{item} added to your order.',
      announceQty:    '{item}: quantity is now {qty}.'
    }
  };

  /* Bottle sizes in display order; the first one is selected by default */
  var SIZES = ['200ml', '500ml', '1000ml'];
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
      img.addEventListener('load', function () { img.classList.add('is-loaded'); });
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
  function card(product, index, columns) {
    var col = index % columns;
    var art = el('article', 'shop-card fade-up' + (col ? ' fade-up-d' + col : ''));
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
    var c = card(box, index, 3);
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

  /* ── Bottles ──────────────────────────────────────────────────── */
  /* Size selector: a radio group; changing the size updates the price and the button's data-size */
  function sizeSelector(bottle, sizes, onChange) {
    var group = el('div', 'shop-sizes');
    group.setAttribute('role', 'radiogroup');
    group.setAttribute('aria-label', t.size + ', ' + bottle.name);
    sizes.forEach(function (size, i) {
      var label = el('label', 'shop-size');
      var input = el('input');
      input.type = 'radio';
      input.name = 'size-' + bottle.id;
      input.value = size;
      input.checked = i === 0;
      input.disabled = bottle.available === false;
      input.addEventListener('change', function () { if (input.checked) onChange(size); });
      label.appendChild(input);
      label.appendChild(el('span', null, t.sizes[size] || size));
      group.appendChild(label);
    });
    return group;
  }

  function bottleCard(bottle, index) {
    var c = card(bottle, index, 4);
    var prices = bottle.prices || {};
    var sizes = SIZES.filter(function (s) { return prices[s] != null; });
    var price = priceLine(prices[sizes[0]]);
    price.setAttribute('aria-live', 'polite');
    var btn = addButton('bottle', bottle);
    btn.setAttribute('data-size', sizes[0]);
    c.body.appendChild(sizeSelector(bottle, sizes, function (size) {
      price.querySelector('.shop-card-price-amount').textContent = String(prices[size]);
      btn.setAttribute('data-size', size);
    }));
    c.body.appendChild(price);
    c.body.appendChild(btn);
    return c.node;
  }

  var bottlesGrid = document.getElementById('kits-bottles');
  if (bottlesGrid) {
    (data.bottles || []).forEach(function (bottle, i) { bottlesGrid.appendChild(bottleCard(bottle, i)); });
  }

  /* ── Order form ───────────────────────────────────────────────── */
  var orderRoot = document.getElementById('kits-order');
  if (!orderRoot) return;

  /* Products by key ("box:<id>" or "bottle:<id>"). Prices are always read from here, never from the form. */
  var catalog = {};
  (data.boxes || []).forEach(function (p) { catalog['box:' + p.id] = { kind: 'box', product: p }; });
  (data.bottles || []).forEach(function (p) { catalog['bottle:' + p.id] = { kind: 'bottle', product: p }; });

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fill(str, values) {
    return str.replace(/\{(\w+)\}/g, function (m, k) { return values[k] != null ? values[k] : m; });
  }
  function money(n) { return n + ' ₪'; }
  function unitPrice(key, size) {
    var c = catalog[key];
    if (!c) return 0;
    return c.kind === 'bottle' ? (c.product.prices[size] || 0) : c.product.price;
  }
  function itemLabel(key, size) {
    var c = catalog[key];
    return c.product.name + (c.kind === 'bottle' ? ' · ' + (t.sizes[size] || size) : '');
  }

  var REQUIRED = ' <span aria-hidden="true">*</span>';
  function hint(text) { return ' <span class="form-hint">' + esc(text) + '</span>'; }
  function field(id, name, type, label, marker, autocomplete, required) {
    return '<div class="form-group">' +
      '<label for="' + id + '">' + esc(label) + marker + '</label>' +
      '<input type="' + type + '" id="' + id + '" name="' + name + '" autocomplete="' + autocomplete + '"' + (required ? ' required' : '') + '>' +
    '</div>';
  }
  function choice(value, label) {
    return '<label class="order-choice">' +
      '<input type="radio" name="delivery" value="' + value + '" required>' +
      '<span>' + esc(label) + '</span>' +
    '</label>';
  }

  var ICON_PLUS = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
  var ICON_REMOVE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var ICON_WHATSAPP = '<svg class="no-flip" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  orderRoot.innerHTML =
    '<form id="kits-order-form" class="order-layout" novalidate>' +
      '<div class="contact-card">' +
        '<fieldset class="order-block">' +
          '<legend class="order-block-title">' + esc(t.itemsTitle) + '</legend>' +
          '<div class="order-items" id="ko-items"></div>' +
          '<button type="button" class="btn btn-ghost order-add-item" id="ko-add-item">' + ICON_PLUS + esc(t.addItem) + '</button>' +
        '</fieldset>' +
        '<fieldset class="order-block">' +
          '<legend class="order-block-title">' + esc(t.detailsTitle) + '</legend>' +
          '<div class="form-row">' +
            field('ko-name', 'name', 'text', t.fullName, REQUIRED, 'name', true) +
            field('ko-phone', 'phone', 'tel', t.phone, REQUIRED, 'tel', true) +
          '</div>' +
          '<div class="form-row">' +
            field('ko-email', 'email', 'email', t.email, hint(t.emailHint), 'email', false) +
            field('ko-company', 'company', 'text', t.company, hint(t.optional), 'organization', false) +
          '</div>' +
          '<div class="form-group">' +
            '<label for="ko-notes">' + esc(t.notes) + hint(t.optional) + '</label>' +
            '<textarea id="ko-notes" name="notes" placeholder="' + esc(t.notesHint) + '"></textarea>' +
          '</div>' +
        '</fieldset>' +
        '<fieldset class="order-block">' +
          '<legend class="order-block-title">' + esc(t.deliveryTitle) + REQUIRED + '</legend>' +
          '<div class="order-choices">' +
            choice('shipping', fill(t.shipping, { price: data.shipping })) +
            choice('pickup', t.pickup) +
          '</div>' +
          '<div class="form-group order-address" id="ko-address-group" hidden>' +
            '<label for="ko-address">' + esc(t.address) + REQUIRED + '</label>' +
            '<input type="text" id="ko-address" name="address" autocomplete="street-address" placeholder="' + esc(t.addressHint) + '">' +
          '</div>' +
        '</fieldset>' +
      '</div>' +
      '<div class="contact-card order-side" role="region" aria-labelledby="ko-summary-title">' +
        '<h3 class="order-summary-title" id="ko-summary-title">' + esc(t.summaryTitle) + '</h3>' +
        '<p class="order-summary-vat">' + esc(t.summaryVat) + '</p>' +
        '<div id="ko-summary"></div>' +
        '<p class="order-note">' + esc(t.summaryNote) + '</p>' +
        '<div class="order-actions">' +
          '<p class="form-error-msg" id="ko-error" role="alert" aria-live="polite"></p>' +
          '<button type="button" class="btn btn-primary btn-full btn-lg" id="ko-send-email">' + esc(t.sendEmail) + '</button>' +
          '<button type="button" class="btn btn-ghost btn-full btn-lg" id="ko-send-whatsapp">' + ICON_WHATSAPP + esc(t.sendWhatsApp) + '</button>' +
        '</div>' +
      '</div>' +
      '<p class="visually-hidden" id="ko-status" aria-live="polite"></p>' +
    '</form>';

  var form         = document.getElementById('kits-order-form');
  var itemsEl      = document.getElementById('ko-items');
  var summaryEl    = document.getElementById('ko-summary');
  var statusEl     = document.getElementById('ko-status');
  var addressGroup = document.getElementById('ko-address-group');
  var addressInput = document.getElementById('ko-address');

  /* Sending is added in Phase 5; until then the form never submits */
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  /* ── Item rows ── */
  /* Product list: in-stock products only, grouped, names in English */
  function optionGroup(label, kind, products) {
    var opts = products.filter(function (p) { return p.available !== false; }).map(function (p) {
      return '<option value="' + kind + ':' + esc(p.id) + '">' + esc(p.name) + '</option>';
    }).join('');
    return opts ? '<optgroup label="' + esc(label) + '">' + opts + '</optgroup>' : '';
  }
  var PRODUCT_OPTIONS = '<option value="">' + esc(t.chooseProduct) + '</option>' +
    optionGroup(t.groupBoxes, 'box', data.boxes || []) +
    optionGroup(t.groupBottles, 'bottle', data.bottles || []);
  var SIZE_OPTIONS = SIZES.map(function (s) {
    return '<option value="' + s + '">' + esc(t.sizes[s] || s) + '</option>';
  }).join('');

  var rowCount = 0;
  function addRow() {
    var n = ++rowCount;
    var row = el('div', 'order-item');
    row.innerHTML =
      '<div class="form-group order-item-product">' +
        '<label for="ko-product-' + n + '">' + esc(t.product) + '</label>' +
        '<select id="ko-product-' + n + '">' + PRODUCT_OPTIONS + '</select>' +
      '</div>' +
      '<div class="form-group order-item-size" hidden>' +
        '<label for="ko-size-' + n + '">' + esc(t.size) + '</label>' +
        '<select id="ko-size-' + n + '">' + SIZE_OPTIONS + '</select>' +
      '</div>' +
      '<div class="form-group order-item-qty">' +
        '<label for="ko-qty-' + n + '">' + esc(t.quantity) + '</label>' +
        '<input type="text" id="ko-qty-' + n + '" inputmode="numeric" pattern="[0-9]*" autocomplete="off" value="1">' +
      '</div>' +
      '<button type="button" class="order-item-remove" aria-label="' + esc(t.removeItem) + '">' + ICON_REMOVE + '</button>';
    itemsEl.appendChild(row);
    return row;
  }

  function parts(row) {
    var selects = row.querySelectorAll('select');
    return { product: selects[0], size: selects[1], qty: row.querySelector('input'), sizeGroup: row.querySelector('.order-item-size') };
  }
  function rows() { return [].slice.call(itemsEl.children); }
  function rowKey(row) { return parts(row).product.value; }
  function isBottle(key) { return !!catalog[key] && catalog[key].kind === 'bottle'; }
  function rowSize(row) { return isBottle(rowKey(row)) ? parts(row).size.value : ''; }
  /* Whole number, minimum 1 (an empty or 0 field counts as 1) */
  function rowQty(row) {
    var q = parseInt(parts(row).qty.value, 10);
    return q >= 1 ? q : 1;
  }
  /* Size field only for bottles; it keeps its value (200ml by default) while hidden */
  function syncSize(row) {
    var bottle = isBottle(rowKey(row));
    parts(row).sizeGroup.hidden = !bottle;
    row.classList.toggle('has-size', bottle);
  }
  function setRow(row, key, size, qty) {
    var p = parts(row);
    p.product.value = key;
    p.size.value = size || SIZES[0];
    p.qty.value = qty;
    syncSize(row);
  }

  itemsEl.addEventListener('change', function (e) {
    var row = e.target.closest('.order-item');
    if (e.target === parts(row).product) syncSize(row);
    if (e.target === parts(row).qty) parts(row).qty.value = rowQty(row);
    updateSummary();
  });
  itemsEl.addEventListener('input', function (e) {
    if (e.target.tagName !== 'INPUT') return;
    var clean = e.target.value.replace(/\D/g, '');
    if (clean !== e.target.value) e.target.value = clean;
    updateSummary();
  });
  /* Remove: the last remaining row is cleared instead, so one empty row always stays */
  itemsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.order-item-remove');
    if (!btn) return;
    var row = btn.closest('.order-item');
    if (rows().length > 1) {
      var next = row.nextElementSibling || row.previousElementSibling;
      row.remove();
      parts(next).product.focus();
    } else {
      setRow(row, '', '', 1);
      parts(row).product.focus();
    }
    updateSummary();
  });
  document.getElementById('ko-add-item').addEventListener('click', function () {
    parts(addRow()).product.focus();
    updateSummary();
  });

  /* ── "Add to order" on the cards ── */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function announce(msg) {
    statusEl.textContent = '';
    setTimeout(function () { statusEl.textContent = msg; }, 60);
  }
  /* Highlight starts once the scroll has mostly finished */
  function flash(row) {
    row.classList.remove('is-flash');
    clearTimeout(row.flashTimer);
    row.flashTimer = setTimeout(function () {
      void row.offsetWidth;
      row.classList.add('is-flash');
      row.flashTimer = setTimeout(function () { row.classList.remove('is-flash'); }, 1900);
    }, reduceMotion ? 0 : 450);
  }
  /* Scroll to the top of the form (its scroll-margin keeps it clear of the fixed header),
     or to the row itself when it sits too far down the form to be seen */
  function reveal(row) {
    var behavior = reduceMotion ? 'auto' : 'smooth';
    var depth = row.getBoundingClientRect().top - form.getBoundingClientRect().top;
    if (depth > window.innerHeight * 0.6) row.scrollIntoView({ behavior: behavior, block: 'center' });
    else form.scrollIntoView({ behavior: behavior, block: 'start' });
  }

  /* Same product and size: quantity + 1. Otherwise fill the first empty row, or add a row. */
  function addToOrder(key, size) {
    var list = rows();
    var row = list.filter(function (r) { return rowKey(r) === key && rowSize(r) === size; })[0];
    var msg;
    if (row) {
      var qty = rowQty(row) + 1;
      parts(row).qty.value = qty;
      msg = fill(t.announceQty, { item: itemLabel(key, size), qty: qty });
    } else {
      row = list.filter(function (r) { return !rowKey(r); })[0] || addRow();
      setRow(row, key, size, 1);
      msg = fill(t.announceAdded, { item: itemLabel(key, size) });
    }
    updateSummary();
    reveal(row);
    flash(row);
    announce(msg);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.shop-card button[data-id]');
    if (!btn || btn.disabled) return;
    var key = btn.getAttribute('data-kind') + ':' + btn.getAttribute('data-id');
    if (!catalog[key]) return;
    addToOrder(key, isBottle(key) ? btn.getAttribute('data-size') : '');
  });

  /* ── Delivery ── */
  function deliveryValue() {
    var checked = form.querySelector('input[name="delivery"]:checked');
    return checked ? checked.value : '';
  }
  /* Address only for shipping, and required then */
  form.addEventListener('change', function (e) {
    if (e.target.name !== 'delivery') return;
    var shipping = deliveryValue() === 'shipping';
    addressGroup.hidden = !shipping;
    addressInput.required = shipping;
    updateSummary();
  });

  /* ── Summary ── */
  function totalRow(label, value, modifier) {
    return '<div class="order-total-row' + (modifier ? ' ' + modifier : '') + '"><dt>' + label + '</dt><dd>' + value + '</dd></div>';
  }
  function updateSummary() {
    var lines = '', subtotal = 0;
    rows().forEach(function (row) {
      var key = rowKey(row);
      if (!catalog[key]) return;
      var size = rowSize(row), qty = rowQty(row);
      var amount = unitPrice(key, size) * qty;
      subtotal += amount;
      lines += '<li><span>' + esc(itemLabel(key, size)) + ' × ' + qty + '</span><span class="order-line-amount">' + money(amount) + '</span></li>';
    });
    if (!lines) {
      summaryEl.innerHTML = '<p class="order-empty">' + esc(t.noItems) + '</p>';
      return;
    }
    var delivery = deliveryValue();
    var shipping = delivery === 'shipping' ? data.shipping : 0;
    summaryEl.innerHTML =
      '<ul class="order-lines">' + lines + '</ul>' +
      '<dl class="order-totals">' +
        totalRow(esc(t.subtotal), money(subtotal)) +
        totalRow(esc(t.shippingLine), delivery ? money(shipping) : '<span class="order-muted">' + esc(t.notSelected) + '</span>') +
        totalRow(esc(t.total) + ' <span class="order-muted">' + esc(t.vat) + '</span>', money(subtotal + shipping), 'order-total-row--grand') +
      '</dl>';
  }

  addRow();
  updateSummary();
})();
