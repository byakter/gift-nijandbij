/* kits-data.js — Product data for the Kits page (kits.html and he/kits.html read this one file).

   HOW TO EDIT
   - Every value marked PLACEHOLDER is a stand-in. Replace it with the real text, price or file name.
   - Prices are whole shekels (ILS) and include VAT. Write numbers only, no ₪ sign: 149, not "149₪".
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
      id: 'bottle-1',
      name: 'PLACEHOLDER Flavor 1',
      description: {
        en: 'PLACEHOLDER: short description of the flavor.',
        he: 'PLACEHOLDER: תיאור קצר של הטעם.'
      },
      prices: { '200ml': 40, '500ml': 80, '1000ml': 140 },
      image: 'kit-bottle-1.jpg',
      available: true
    },
    {
      id: 'bottle-2',
      name: 'PLACEHOLDER Flavor 2',
      description: {
        en: 'PLACEHOLDER: short description of the flavor.',
        he: 'PLACEHOLDER: תיאור קצר של הטעם.'
      },
      prices: { '200ml': 42, '500ml': 82, '1000ml': 142 },
      image: 'kit-bottle-2.jpg',
      available: true
    },
    {
      id: 'bottle-3',
      name: 'PLACEHOLDER Flavor 3',
      description: {
        en: 'PLACEHOLDER: short description of the flavor.',
        he: 'PLACEHOLDER: תיאור קצר של הטעם.'
      },
      prices: { '200ml': 44, '500ml': 84, '1000ml': 144 },
      image: 'kit-bottle-3.jpg',
      available: true
    },
    {
      id: 'bottle-4',
      name: 'PLACEHOLDER Flavor 4',
      description: {
        en: 'PLACEHOLDER: short description of the flavor.',
        he: 'PLACEHOLDER: תיאור קצר של הטעם.'
      },
      prices: { '200ml': 46, '500ml': 86, '1000ml': 146 },
      image: 'kit-bottle-4.jpg',
      available: true
    },
    {
      id: 'bottle-5',
      name: 'PLACEHOLDER Flavor 5',
      description: {
        en: 'PLACEHOLDER: short description of the flavor.',
        he: 'PLACEHOLDER: תיאור קצר של הטעם.'
      },
      prices: { '200ml': 48, '500ml': 88, '1000ml': 148 },
      image: 'kit-bottle-5.jpg',
      available: true
    },
    {
      id: 'bottle-6',
      name: 'PLACEHOLDER Flavor 6',
      description: {
        en: 'PLACEHOLDER: short description of the flavor.',
        he: 'PLACEHOLDER: תיאור קצר של הטעם.'
      },
      prices: { '200ml': 50, '500ml': 90, '1000ml': 150 },
      image: 'kit-bottle-6.jpg',
      available: true
    },
    {
      id: 'bottle-7',
      name: 'PLACEHOLDER Flavor 7',
      description: {
        en: 'PLACEHOLDER: short description of the flavor.',
        he: 'PLACEHOLDER: תיאור קצר של הטעם.'
      },
      prices: { '200ml': 52, '500ml': 92, '1000ml': 152 },
      image: 'kit-bottle-7.jpg',
      available: true
    }
  ]
};
