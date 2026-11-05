/* kits-data.js — Product data for the Kits page (kits.html and he/kits.html read this one file).

   HOW TO EDIT
   - Every value marked PLACEHOLDER is a stand-in. Replace it with the real text, price or file name.
   - Prices are whole shekels (ILS) and include VAT. Write numbers only, no ₪ sign: 149, not "149₪".
   - tagline (optional, bottles) is a short line shown under the name, with "en" and "he"
     versions; description then holds the ingredients. Leave tagline out to show no line.
   - name stays in English on both language versions. description and contents have an
     "en" and a "he" version: fill in both.
   - contents is a list: one item per line, in quotes, separated by commas.
   - image is a file name in the assets/ folder, e.g. "kit-box-honey.jpg". If the file is
     missing, the page shows a neutral placeholder instead of a broken image.
   - Set available: false to show "Out of stock" and disable the "Add to order" button.
     Set it back to true when the product is in stock again.
   - id must be unique, lowercase, with no spaces (e.g. "honey-bunny-box"). It is used
     internally and in order messages, so avoid changing it after launch.
   - To add or remove a product, copy or delete a whole { ... } block, including its comma.

   AFTER EDITING
   Bump the version number in the script tag on BOTH pages, so visitors get the new data
   instead of an old cached copy:
     kits.html     <script src="assets/kits-data.js?v=1"></script>     -> ?v=2, ?v=3, ...
     he/kits.html  <script src="../assets/kits-data.js?v=1"></script>  -> same number */

window.KITS_DATA = {

  /* Shipping anywhere in Israel, in ILS (self pickup is free) */
  shipping: 40,

  /* ── Gift boxes (6) ──────────────────────────────────────────── */
  boxes: [
    {
      id: 'box-1',
      name: 'PLACEHOLDER Box 1',
      description: {
        en: 'PLACEHOLDER: short description of the box.',
        he: 'PLACEHOLDER: תיאור קצר של המארז.'
      },
      contents: {
        en: ['PLACEHOLDER item 1', 'PLACEHOLDER item 2'],
        he: ['PLACEHOLDER פריט 1', 'PLACEHOLDER פריט 2']
      },
      price: 100,
      image: 'kit-box-1.jpg',
      available: true
    },
    {
      id: 'box-2',
      name: 'PLACEHOLDER Box 2',
      description: {
        en: 'PLACEHOLDER: short description of the box.',
        he: 'PLACEHOLDER: תיאור קצר של המארז.'
      },
      contents: {
        en: ['PLACEHOLDER item 1', 'PLACEHOLDER item 2'],
        he: ['PLACEHOLDER פריט 1', 'PLACEHOLDER פריט 2']
      },
      price: 150,
      image: 'kit-box-2.jpg',
      available: true
    },
    {
      id: 'box-3',
      name: 'PLACEHOLDER Box 3',
      description: {
        en: 'PLACEHOLDER: short description of the box.',
        he: 'PLACEHOLDER: תיאור קצר של המארז.'
      },
      contents: {
        en: ['PLACEHOLDER item 1', 'PLACEHOLDER item 2', 'PLACEHOLDER item 3'],
        he: ['PLACEHOLDER פריט 1', 'PLACEHOLDER פריט 2', 'PLACEHOLDER פריט 3']
      },
      price: 200,
      image: 'kit-box-3.jpg',
      available: true
    },
    {
      id: 'box-4',
      name: 'PLACEHOLDER Box 4',
      description: {
        en: 'PLACEHOLDER: short description of the box.',
        he: 'PLACEHOLDER: תיאור קצר של המארז.'
      },
      contents: {
        en: ['PLACEHOLDER item 1', 'PLACEHOLDER item 2', 'PLACEHOLDER item 3'],
        he: ['PLACEHOLDER פריט 1', 'PLACEHOLDER פריט 2', 'PLACEHOLDER פריט 3']
      },
      price: 250,
      image: 'kit-box-4.jpg',
      available: true
    },
    {
      id: 'box-5',
      name: 'PLACEHOLDER Box 5',
      description: {
        en: 'PLACEHOLDER: short description of the box.',
        he: 'PLACEHOLDER: תיאור קצר של המארז.'
      },
      contents: {
        en: ['PLACEHOLDER item 1', 'PLACEHOLDER item 2', 'PLACEHOLDER item 3', 'PLACEHOLDER item 4'],
        he: ['PLACEHOLDER פריט 1', 'PLACEHOLDER פריט 2', 'PLACEHOLDER פריט 3', 'PLACEHOLDER פריט 4']
      },
      price: 300,
      image: 'kit-box-5.jpg',
      available: true
    },
    {
      id: 'box-6',
      name: 'PLACEHOLDER Box 6',
      description: {
        en: 'PLACEHOLDER: short description of the box.',
        he: 'PLACEHOLDER: תיאור קצר של המארז.'
      },
      contents: {
        en: ['PLACEHOLDER item 1', 'PLACEHOLDER item 2', 'PLACEHOLDER item 3', 'PLACEHOLDER item 4'],
        he: ['PLACEHOLDER פריט 1', 'PLACEHOLDER פריט 2', 'PLACEHOLDER פריט 3', 'PLACEHOLDER פריט 4']
      },
      price: 350,
      image: 'kit-box-6.jpg',
      available: true
    }
  ],

  /* ── Bottles (7 flavors, each in 200ml / 500ml / 1000ml) ─────── */
  bottles: [
    {
      id: 'flora',
      name: 'Flora',
      tagline: {
        en: 'Tropical and bright',
        he: 'טרופי ורענן'
      },
      description: {
        en: 'Bacardi, Cointreau, pineapple, passion fruit syrup and lemon',
        he: 'בקרדי, קוואנטרו, אננס, סירופ פסיפלורה ולימון'
      },
      prices: { '200ml': 65, '500ml': 150, '1000ml': 240 },
      image: 'kit-bottle-flora.jpg',
      available: true
    },
    {
      id: 'basil-smash',
      name: 'Basil Smash',
      tagline: {
        en: 'Fresh and herbal',
        he: 'רענן ועשבוני'
      },
      description: {
        en: 'Gin, basil, lemon and simple syrup',
        he: "ג'ין, בזיליקום, לימון ומי סוכר"
      },
      prices: { '200ml': 65, '500ml': 150, '1000ml': 240 },
      image: 'kit-bottle-basil-smash.jpg',
      available: true
    },
    {
      id: 'margarita',
      name: 'Margarita',
      tagline: {
        en: 'Classic and zesty',
        he: 'קלאסי וחמצמץ'
      },
      description: {
        en: 'Patrón tequila, Cointreau and lemon',
        he: 'טקילה פטרון, קוואנטרו ולימון'
      },
      prices: { '200ml': 70, '500ml': 160, '1000ml': 250 },
      image: 'kit-bottle-margarita.jpg',
      available: true
    },
    {
      id: 'negroninio',
      name: 'Negroninio',
      tagline: {
        en: 'Light and bittersweet',
        he: 'קליל ומריר-מתוק'
      },
      description: {
        en: 'Gin, Aperol and Lillet',
        he: "ג'ין, אפרול ולילט"
      },
      prices: { '200ml': 70, '500ml': 160, '1000ml': 250 },
      image: 'kit-bottle-negroninio.jpg',
      available: true
    },
    {
      id: 'jasmine',
      name: 'Jasmine',
      tagline: {
        en: 'Citrusy and elegant',
        he: 'הדרי ואלגנטי'
      },
      description: {
        en: 'Gin, Campari, Cointreau, lemon and simple syrup',
        he: "ג'ין, קמפרי, קוואנטרו, לימון ומי סוכר"
      },
      prices: { '200ml': 65, '500ml': 150, '1000ml': 240 },
      image: 'kit-bottle-jasmine.jpg',
      available: true
    },
    {
      id: 'negroni',
      name: 'Negroni',
      tagline: {
        en: 'Bold and bitter',
        he: 'עוצמתי ומריר'
      },
      description: {
        en: 'Gin, Campari and Martini Rosso',
        he: "ג'ין, קמפרי ומרטיני רוסו"
      },
      prices: { '200ml': 65, '500ml': 150, '1000ml': 240 },
      image: 'kit-bottle-negroni.jpg',
      available: true
    },
    {
      id: 'honey-bunny',
      name: 'Honey Bunny',
      tagline: {
        en: 'Warm and smooth',
        he: 'חמים ורך'
      },
      description: {
        en: "Jack Daniel's, apple juice, honey syrup, lemon and Angostura",
        he: "ג'ק דניאלס, מיץ תפוחים, סירופ דבש, לימון ואנגוסטורה"
      },
      prices: { '200ml': 65, '500ml': 150, '1000ml': 240 },
      image: 'kit-bottle-honey-bunny.jpg',
      available: true
    }
  ]
};
