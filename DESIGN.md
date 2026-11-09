# NIJ & BIJ — Design Language

Read this file before making any visual or UI change. All colors, fonts, radii and spacing must come from the tokens below. Never hard-code a value that is not defined here; if something is missing, ask before adding it.

The look is based on the original NIJ & BIJ site: warm cream, soft sage, pastel cocktail colors, clean Roboto typography, square shapes and real photography.

## Brand feeling
Premium, warm, relaxed, with a playful wink. Calm pastel colors, generous white space, real photography as the hero. Nothing loud, neon, or glossy.

## Color tokens
Define these once as CSS variables and use only the variables.

Base:
- `--color-bg`: #FFFCF1 — warm cream. Default page background.
- `--color-text`: #000000 — general page text and headings outside cards.
- `--color-frame`: #FFECC1 — warm yellow, for a thin page border and subtle dividers.
- `--color-accent`: #589F7E — brand green. Announcement bar and small highlights. Use sparingly.

Cocktail palette (the heart of the brand, taken from the original cocktail cards):
- `--color-margarita`: #CFD9C1 — light sage. The primary section color (also the footer).
- `--color-mojito`: #9CA789 — muted olive.
- `--color-bloody-mary`: #E4C4B6 — dusty pink.
- `--color-aperol`: #EACFB2 — soft peach.

Small accents (tiny details only, such as a badge or a price tag — never large backgrounds):
- `--color-tomato`: #B85C50
- `--color-orange`: #F8A870

Card text greens (used for all text inside cards, instead of black):
- `--color-card-heading`: #1E3F2B — card titles.
- `--color-card-text`: #5A7A65 — card body text and small labels.
- `--color-card-link`: #2D5C3F — links and arrows inside cards.

Color rules:
- Alternate section backgrounds between cream and a cocktail color to create rhythm.
- One cocktail color per section or card. Do not mix two cocktail colors in the same element.
- Text inside cards never uses black; it uses the card text greens above.

## Photography
- Real photos are the main visual element. Natural light, vivid but not over-saturated colors, fresh ingredients and flowers.
- Do not darken photos with overlays unless text sits on top and would otherwise be unreadable.
- Where possible, place a photo on the cocktail color that matches its dominant tone (green drinks on sage or olive, red drinks on dusty pink, orange drinks on peach).

## Typography
- English: Roboto. Headings weight 500, body weight 400.
- Hebrew: Heebo (the Hebrew companion of Roboto), same weights.
- Small labels above headings ("overlines", e.g. "YES!"): uppercase, small size, wide letter spacing.
- Main headings are large and in sentence case, not uppercase.

## Components
- Shapes are square: no rounded corners on buttons or cards, no pill shapes.
- Primary button: square, `--color-card-link` green background, cream text.
- Secondary button: square, transparent background, 1px border, text in the same color as the border.
- Cards: flat, square corners, no shadows. Card background is cream or a cocktail color.
- Spacing: generous. Sections need plenty of vertical breathing room.

## Bilingual
- The site supports English (LTR) and Hebrew (RTL). Every layout must work correctly in both directions.
- Use logical CSS properties (start/end) rather than left/right. Arrows must flip in RTL.

## Voice and copy tone
Playful, warm and confident, like a friend who happens to be a great bartender. Short sentences, a little humor, no corporate language.
Examples from the brand: "and sooooo much more.", "We'll only send fun stuff, we promise.", "100% premium alcohol, 0% plastic."
