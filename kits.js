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
      announceQty:    '{item}: quantity is now {qty}.',

      /* Validation and sending */
      errMissing:     'Please complete: {fields}.',
      fieldNames:     { items: 'at least one item', name: 'full name', phone: 'phone', email: 'email',
                        delivery: 'delivery method', address: 'delivery address' },
      errPhone:       'Please enter a valid Israeli phone number, e.g. 050-123-4567.',
      errEmail:       'Please enter a valid email address.',
      errSend:        'Something went wrong. Please try again, or send your order via WhatsApp instead.',
      sending:        'Sending…',
      successTitle:   'Order received!',
      successText:    'Thanks! We\'ve received your order and will send you an invoice with a secure payment link.',

      /* WhatsApp message */
      waGreeting:     'Hi NIJ & BIJ! I\'d like to place an order:',
      waItems:        'Items',
      waDelivery:     'Delivery',
      waDetails:      'My details',
      waShipping:     'Shipping anywhere in Israel',
      waPickup:       'Self pickup from Tel Giborim 5, Tel Aviv'
    },
    he: {
      includes:   'המארז כולל:',
      vat:        'כולל מע״מ',
      addToOrder: 'הוסיפו להזמנה',
      outOfStock: 'אזל מהמלאי',
      size:       'גודל',
      sizes:      { '200ml': '200\u00A0מ״ל', '500ml': '500\u00A0מ״ל', '1000ml': '1000\u00A0מ״ל' },  /* no-break space */

      /* Order form */
      itemsTitle:     'הפריטים שלכם',
      product:        'מוצר',
      chooseProduct:  'בחרו מוצר',
      groupBoxes:     'מארזים',
      groupBottles:   'בקבוקים',
      quantity:       'כמות',
      removeItem:     'הסירו את הפריט',
      addItem:        'הוסיפו פריט נוסף',
      detailsTitle:   'הפרטים שלכם',
      fullName:       'שם מלא',
      phone:          'טלפון',
      email:          'אימייל',
      emailHint:      '(חובה לשליחה במייל)',
      company:        'חברה',
      notes:          'הערות',
      optional:       '(לא חובה)',
      notesHint:      'משהו נוסף שכדאי שנדע…',
      deliveryTitle:  'משלוח או איסוף',
      shipping:       'משלוח לכל מקום בארץ - {price} ₪',
      pickup:         'איסוף עצמי מתל גיבורים 5, תל אביב, בתיאום מראש',
      address:        'כתובת למשלוח',
      addressHint:    'רחוב, מספר, עיר',
      summaryTitle:   'סיכום ההזמנה',
      summaryVat:     'כל המחירים כוללים מע״מ',
      noItems:        'עדיין לא נבחרו פריטים',
      subtotal:       'סכום הפריטים',
      shippingLine:   'משלוח',
      notSelected:    'עדיין לא נבחר',
      total:          'סה״כ משוער',
      summaryNote:    'זו הערכה בלבד. אחרי שנקבל את ההזמנה נשלח לכם חשבונית עם קישור לתשלום מאובטח.',
      sendEmail:      'שלחו במייל',
      sendWhatsApp:   'שלחו בוואטסאפ',
      announceAdded:  '{item} נוסף להזמנה.',
      announceQty:    '{item}: הכמות עודכנה ל-{qty}.',

      /* Validation and sending */
      errMissing:     'אנא השלימו: {fields}.',
      fieldNames:     { items: 'לפחות פריט אחד', name: 'שם מלא', phone: 'טלפון', email: 'אימייל',
                        delivery: 'משלוח או איסוף', address: 'כתובת למשלוח' },
      errPhone:       'אנא הזינו מספר טלפון ישראלי תקין, למשל 050-123-4567.',
      errEmail:       'אנא הזינו כתובת אימייל תקינה.',
      errSend:        'משהו השתבש. נסו שוב, או שלחו את ההזמנה בוואטסאפ.',
      sending:        'שולח…',
      successTitle:   'ההזמנה התקבלה!',
      successText:    'תודה! קיבלנו את ההזמנה שלכם, ונשלח לכם חשבונית עם קישור לתשלום מאובטח.',

      /* WhatsApp message */
      waGreeting:     'היי NIJ & BIJ! אשמח להזמין:',
      waItems:        'פריטים',
      waDelivery:     'משלוח או איסוף',
      waDetails:      'הפרטים שלי',
      waShipping:     'משלוח לכל מקום בארץ',
      waPickup:       'איסוף עצמי מתל גיבורים 5, תל אביב'
    }
  };

  /* Bottle sizes in display order; the first one is selected by default */
  var SIZES = ['200ml', '500ml', '1000ml'];
  var t = TEXT[lang] || TEXT.en;

  /* Picks the page language from an { en, he } field, falling back to English */
  function local(field) {
    return field ? (field[lang] || field.en) : '';
  }

  /* Product names are English: on the RTL page they are isolated so that trailing punctuation,
     numbers, ₪ and × around them keep the right order. <bdi> in HTML; direction marks in plain
     text (dropdown options, announcements, the WhatsApp message). */
  var rtl = lang === 'he';
  var LRM = '‎', RLM = '‏';
  function nameText(name) { return rtl ? LRM + name + LRM : name; }
  function nameNode(name) {
    var bdi = document.createElement('bdi');
    bdi.dir = 'ltr';
    bdi.textContent = name;
    return bdi;
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
    body.appendChild(el('h3', 'shop-card-name')).appendChild(nameNode(product.name));
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
  /* "Name · size" as plain text, or as HTML (escaped, name in <bdi>) */
  function itemLabel(key, size, html) {
    var c = catalog[key];
    var sizeText = c.kind === 'bottle' ? ' · ' + (t.sizes[size] || size) : '';
    return html ? '<bdi dir="ltr">' + esc(c.product.name) + '</bdi>' + esc(sizeText)
                : nameText(c.product.name) + sizeText;
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
      /* Formspree honeypot: bots fill it, people never see it */
      '<div class="visually-hidden" aria-hidden="true">' +
        '<input type="text" id="ko-gotcha" name="_gotcha" tabindex="-1" autocomplete="off">' +
      '</div>' +
    '</form>' +
    '<div class="contact-card form-success order-success" id="ko-success" style="display: none" role="status" aria-live="polite">' +
      '<div class="form-success-icon" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' +
      '</div>' +
      '<h3 id="ko-success-title" tabindex="-1">' + esc(t.successTitle) + '</h3>' +
      '<p>' + esc(t.successText) + '</p>' +
    '</div>';

  var form         = document.getElementById('kits-order-form');
  var itemsEl      = document.getElementById('ko-items');
  var summaryEl    = document.getElementById('ko-summary');
  var statusEl     = document.getElementById('ko-status');
  var errorEl      = document.getElementById('ko-error');
  var successEl    = document.getElementById('ko-success');
  var addressGroup = document.getElementById('ko-address-group');
  var addressInput = document.getElementById('ko-address');
  var emailBtn     = document.getElementById('ko-send-email');
  var whatsAppBtn  = document.getElementById('ko-send-whatsapp');

  /* Sending happens through the two buttons; Enter in a field never submits the form */
  form.addEventListener('submit', function (e) { e.preventDefault(); });

  /* ── Item rows ── */
  /* Product list: in-stock products only, grouped, names in English */
  function optionGroup(label, kind, products) {
    var opts = products.filter(function (p) { return p.available !== false; }).map(function (p) {
      return '<option value="' + kind + ':' + esc(p.id) + '">' + esc(nameText(p.name)) + '</option>';
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
    if (sent) {
      successEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      return;
    }
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
  /* The order as it stands: rows with a product (empty rows are ignored) and the totals */
  function orderData() {
    var items = [], subtotal = 0;
    rows().forEach(function (row) {
      var key = rowKey(row);
      if (!catalog[key]) return;
      var size = rowSize(row), qty = rowQty(row);
      var amount = unitPrice(key, size) * qty;
      subtotal += amount;
      items.push({ key: key, name: catalog[key].product.name, size: size, qty: qty, amount: amount });
    });
    var delivery = deliveryValue();
    var shipping = delivery === 'shipping' ? data.shipping : 0;
    return { items: items, subtotal: subtotal, delivery: delivery, shipping: shipping, total: subtotal + shipping };
  }

  function updateSummary() {
    var o = orderData();
    if (!o.items.length) {
      summaryEl.innerHTML = '<p class="order-empty">' + esc(t.noItems) + '</p>';
    } else {
      summaryEl.innerHTML =
        '<ul class="order-lines">' + o.items.map(function (i) {
          return '<li><span>' + itemLabel(i.key, i.size, true) + ' ×&nbsp;' + i.qty + '</span><span class="order-line-amount">' + money(i.amount) + '</span></li>';
        }).join('') + '</ul>' +
        '<dl class="order-totals">' +
          totalRow(esc(t.subtotal), money(o.subtotal)) +
          totalRow(esc(t.shippingLine), o.delivery ? money(o.shipping) : '<span class="order-muted">' + esc(t.notSelected) + '</span>') +
          totalRow(esc(t.total) + ' <span class="order-muted">' + esc(t.vat) + '</span>', money(o.total), 'order-total-row--grand') +
        '</dl>';
    }
    recheck();
  }

  /* ── Validation ── */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  /* Israeli numbers with or without spaces, dashes, dots, brackets or +972/00972:
     mobile and 07x (0 + 9 digits) and landlines 02/03/04/08/09 (0 + 8 digits) */
  function validPhone(value) {
    var s = value.replace(/[\s\-().]/g, '');
    var intl = /^(?:\+|00)?972/;
    if (intl.test(s)) s = '0' + s.replace(intl, '').replace(/^0/, '');
    return /^0(?:[23489]\d{7}|[57]\d{8})$/.test(s);
  }
  function val(id) { return document.getElementById(id).value.trim(); }

  /* In form order. state: '' (fine), 'missing' or 'invalid'. Email is required only for sending by
     email; if it is filled in, it must look valid for both methods. */
  function checks(mode) {
    var productSelects = rows().map(function (r) { return parts(r).product; });
    var choices = [].slice.call(form.querySelectorAll('input[name="delivery"]'));
    var phone = val('ko-phone'), email = val('ko-email'), delivery = deliveryValue();
    function one(id, state) { var f = document.getElementById(id); return { marks: [f], focus: f, state: state }; }
    var list = [
      { marks: productSelects, focus: productSelects[0], state: orderData().items.length ? '' : 'missing' },
      one('ko-name', val('ko-name') ? '' : 'missing'),
      one('ko-phone', !phone ? 'missing' : validPhone(phone) ? '' : 'invalid'),
      one('ko-email', email ? (EMAIL_RE.test(email) ? '' : 'invalid') : (mode === 'email' ? 'missing' : '')),
      { marks: choices.map(function (c) { return c.closest('.order-choice'); }), focus: choices[0], state: delivery ? '' : 'missing' },
      one('ko-address', delivery === 'shipping' && !val('ko-address') ? 'missing' : '')
    ];
    ['items', 'name', 'phone', 'email', 'delivery', 'address'].forEach(function (key, i) { list[i].key = key; });
    return list;
  }

  function showErrors(bad) {
    var missing = bad.filter(function (c) { return c.state === 'missing'; })
                     .map(function (c) { return t.fieldNames[c.key]; });
    var msgs = missing.length ? [fill(t.errMissing, { fields: missing.join(', ') })] : [];
    bad.forEach(function (c) { if (c.state === 'invalid') msgs.push(c.key === 'phone' ? t.errPhone : t.errEmail); });
    errorEl.textContent = msgs.join(' ');
    errorEl.style.display = msgs.length ? 'block' : 'none';
  }

  /* Marks every problem, shows what's missing, then scrolls to and focuses the first one */
  var lastMode = '';
  function validate(mode) {
    lastMode = mode;
    var list = checks(mode);
    var bad = list.filter(function (c) { return c.state; });
    list.forEach(function (c) {
      c.marks.forEach(function (m) { m.classList.toggle('field-error', !!c.state); });
    });
    showErrors(bad);
    if (bad.length) {
      bad[0].focus.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      bad[0].focus.focus({ preventScroll: true });
    }
    return !bad.length;
  }

  /* After a failed attempt, each error clears as soon as it's fixed (no new errors while typing) */
  function recheck() {
    if (!lastMode) return;
    var still = checks(lastMode).filter(function (c) {
      var marked = c.marks.some(function (m) { return m.classList.contains('field-error'); });
      if (!c.state) c.marks.forEach(function (m) { m.classList.remove('field-error'); });
      return c.state && marked;
    });
    showErrors(still);
  }
  form.addEventListener('input', recheck);
  form.addEventListener('change', recheck);

  /* ── Tracking (does nothing when gtag or fbq is blocked or missing) ── */
  function track(method, total) {
    var params = { value: total, currency: 'ILS', method: method };
    try { if (typeof gtag === 'function') gtag('event', 'kits_order_request', params); } catch (_) {}
    try { if (typeof fbq === 'function') fbq('trackCustom', 'KitsOrderRequest', params); } catch (_) {}
  }

  /* ── Send by email (Formspree) ── */
  var FORMSPREE_URL = 'https://formspree.io/f/mqevnedo';

  /* Field names and values in English on both language versions, so every order reads the same */
  function emailPayload(o) {
    var p = {
      _subject: 'KITS order – ' + val('ko-name'),
      name:     val('ko-name'),
      phone:    val('ko-phone'),
      email:    val('ko-email'),
      company:  val('ko-company'),
      delivery: o.delivery === 'shipping' ? 'Shipping anywhere in Israel' : 'Self pickup (Tel Giborim 5, Tel Aviv)'
    };
    if (o.delivery === 'shipping') p.address = val('ko-address');
    p.items = o.items.map(function (i) {
      return i.name + (i.size ? ', ' + i.size : '') + ' × ' + i.qty + ' = ' + i.amount + ' ILS';
    }).join('\n');
    p.subtotal        = o.subtotal + ' ILS';
    p.shipping        = o.shipping + ' ILS';
    p.estimated_total = o.total + ' ILS (incl. VAT)';
    p.notes           = val('ko-notes');
    p.language        = lang;
    /* Hidden visit-source fields (from visit-source.js) */
    [].forEach.call(form.querySelectorAll('input[type="hidden"]'), function (h) {
      if (!(h.name in p)) p[h.name] = h.value;
    });
    p._gotcha = document.getElementById('ko-gotcha').value;
    return p;
  }

  var sending = false, sent = false;
  function setBusy(busy) {
    sending = busy;
    emailBtn.disabled = whatsAppBtn.disabled = busy;
    emailBtn.textContent = busy ? t.sending : t.sendEmail;
  }

  emailBtn.addEventListener('click', function () {
    if (sending || !validate('email')) return;
    var o = orderData();
    setBusy(true);
    fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(emailPayload(o))
    })
      .then(function (res) {
        return res.json().then(function (d) { return { ok: res.ok, data: d }; });
      })
      .then(function (r) {
        if (!r.ok) throw new Error('submission_failed');
        sent = true;
        form.style.display = 'none';
        successEl.style.display = '';
        successEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        document.getElementById('ko-success-title').focus({ preventScroll: true });
        track('email', o.total);
      })
      .catch(function () {
        if (sent) return;
        errorEl.textContent = t.errSend;
        errorEl.style.display = 'block';
        setBusy(false);
      });
  });

  /* ── Send via WhatsApp ── */
  var WHATSAPP_NUMBER = '972508989990';

  /* Page language, one detail per line, *bold* headings (WhatsApp formatting). In Hebrew, item
     lines start with an English name, so they get an RLM to read right to left, and the name is
     closed with an RLM so the size, quantity and price after it stay in Hebrew order. */
  function whatsAppMessage(o) {
    var lines = [t.waGreeting, '', '*' + t.waItems + '*'];
    o.items.forEach(function (i) {
      lines.push((rtl ? RLM : '') + '• ' + nameText(i.name) + (rtl ? RLM : '') +
        (i.size ? ' (' + (t.sizes[i.size] || i.size) + ')' : '') + ' × ' + i.qty + ' – ' + money(i.amount));
    });
    lines.push('',
      t.subtotal + ': ' + money(o.subtotal),
      t.shippingLine + ': ' + money(o.shipping),
      '*' + t.total + ': ' + money(o.total) + '* (' + t.vat + ')',
      '', '*' + t.waDelivery + '*',
      o.delivery === 'shipping' ? t.waShipping : t.waPickup);
    if (o.delivery === 'shipping') lines.push(t.address + ': ' + val('ko-address'));
    lines.push('', '*' + t.waDetails + '*',
      t.fullName + ': ' + val('ko-name'),
      t.phone + ': ' + val('ko-phone'));
    if (val('ko-email'))   lines.push(t.email + ': ' + val('ko-email'));
    if (val('ko-company')) lines.push(t.company + ': ' + val('ko-company'));
    if (val('ko-notes'))   lines.push(t.notes + ': ' + val('ko-notes'));
    return lines.join('\n');
  }

  /* Opens WhatsApp in a new tab; the form stays as it is, since the message may not be sent */
  whatsAppBtn.addEventListener('click', function () {
    if (sending || !validate('whatsapp')) return;
    var o = orderData();
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(whatsAppMessage(o)), '_blank', 'noopener');
    track('whatsapp', o.total);
  });

  addRow();
  updateSummary();
})();
