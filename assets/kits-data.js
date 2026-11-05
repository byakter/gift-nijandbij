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
      id: 'aperol-spritz-diy',
      name: 'Aperol Spritz DIY',
      tagline: {
        en: 'Bubbly and bright',
        he: 'מבעבע ורענן'
      },
      description: {
        en: 'Everything you need to mix two Aperol Spritzes at home.',
        he: 'כל מה שצריך כדי להכין בבית שני אפרול שפריץ.'
      },
      contents: {
        en: ['Aperol (100ml)', 'Prosecco or cava (200ml)', 'S.Pellegrino and an orange', '2 stemless wine glasses'],
        he: ['אפרול (100 מ"ל)', 'פרוסקו או קאווה (200 מ"ל)', 'ס.פלגרינו ותפוז', '2 כוסות יין ללא רגל']
      },
      price: 180,
      image: 'kit-box-aperol-spritz-diy.jpg',
      available: true
    },
    {
      id: 'las-uvas-diy',
      name: 'Las Uvas DIY',
      tagline: {
        en: 'Fruity and tangy',
        he: 'פירותי וחמצמץ'
      },
      description: {
        en: 'A vodka and grape cocktail to shake up for two, bar tools included.',
        he: 'קוקטייל וודקה וענבים להכנה לשניים, כולל כלי בר.'
      },
      contents: {
        en: ['Grey Goose vodka (200ml)', 'Bitter lemon and sour mix (200ml)', 'A jar of grapes', 'Shaker and jigger', '2 highball glasses'],
        he: ['וודקה גריי גוס (200 מ"ל)', 'ביטר למון וסאוור מיקס (200 מ"ל)', 'צנצנת ענבים', "שייקר וג'יגר", '2 כוסות הייבול']
      },
      price: 350,
      image: 'kit-box-las-uvas-diy.jpg',
      available: true
    },
    {
      id: 'honey-bunny-diy',
      name: 'Honey Bunny DIY',
      tagline: {
        en: 'Warm and smooth',
        he: 'חמים ורך'
      },
      description: {
        en: 'Our Honey Bunny, ready to shake at home for two, bar tools included.',
        he: 'ה-Honey Bunny שלנו, להכנה בבית לשניים, כולל כלי בר.'
      },
      contents: {
        en: ["Jack Daniel's (200ml)", 'Honey syrup (100ml) and apple juice', 'Lemon, apple and a bunch of thyme', 'Shaker and jigger', '2 glasses'],
        he: ['ג\'ק דניאלס (200 מ"ל)', 'סירופ דבש (100 מ"ל) ומיץ תפוחים', 'לימון, תפוח וצרור טימין', "שייקר וג'יגר", '2 כוסות']
      },
      price: 350,
      image: 'kit-box-honey-bunny-diy.jpg',
      available: true
    },
    {
      id: 'sangria-diy',
      name: 'Sangria DIY',
      tagline: {
        en: 'Spiced and cosy',
        he: 'מתובל ומחמם'
      },
      description: {
        en: 'Everything you need to make sangria for two at home, plus a candle to set the mood.',
        he: 'כל מה שצריך כדי להכין בבית סנגריה לשניים, ונר שמשלים את האווירה.'
      },
      contents: {
        en: ['A bottle of red wine', 'Cointreau (100ml)', 'Apple, pear, orange and spices', '2 wine glasses', 'A candle'],
        he: ['בקבוק יין אדום', 'קוואנטרו (100 מ"ל)', 'תפוח, אגס, תפוז ותבלינים', '2 כוסות יין', 'נר לאווירה']
      },
      price: 250,
      image: 'kit-box-sangria-diy.jpg',
      available: true
    },
    {
      id: 'special-mix',
      name: 'Special Mix',
      tagline: {
        en: 'Three cocktails, ready to pour',
        he: 'שלושה קוקטיילים, מוכנים למזיגה'
      },
      description: {
        en: 'Three of our bottled cocktails, with snacks and glasses for two.',
        he: 'שלושה מהקוקטיילים שלנו בבקבוק, עם נשנושים וכוסות לשניים.'
      },
      contents: {
        en: ['3 cocktail bottles (200ml each): Basil Smash, Flora, Honey Bunny', 'A jar of mixed nuts', 'A jar of gummy candies', '2 glasses'],
        he: ['3 בקבוקי קוקטייל (200 מ"ל כל אחד): Basil Smash, Flora, Honey Bunny', 'צנצנת פיצוחים', 'צנצנת סוכריות גומי', '2 כוסות']
      },
      price: 250,
      image: 'kit-box-special-mix.jpg',
      available: true
    },
    {
      id: 'cocktail-succulent',
      name: 'Cocktail & Succulent',
      tagline: {
        en: 'A gift that lasts',
        he: 'מתנה שנשארת'
      },
      description: {
        en: 'A bottled cocktail for two, with a succulent that stays long after the last sip.',
        he: 'קוקטייל בבקבוק לשניים, עם סוקולנט שנשאר הרבה אחרי הלגימה האחרונה.'
      },
      contents: {
        en: ['Cocktail bottle (500ml), flavour of your choice', 'A jar of mixed nuts', 'A succulent', '2 cocktail glasses'],
        he: ['בקבוק קוקטייל (500 מ"ל) בטעם לבחירתך', 'צנצנת פיצוחים', 'סוקולנט', '2 כוסות קוקטייל']
      },
      price: 230,
      image: 'kit-box-cocktail-succulent.jpg',
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
