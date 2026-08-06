# BeFirst — website

Next.js (App Router) recreation of the `First_Main/FirstPage.png` design, plus a
minimal Video Editing page.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route            | What it is                                                   |
| ---------------- | ------------------------------------------------------------ |
| `/`              | Hero recreated 1:1 from the reference screenshot              |
| `/video-editing` | Simple service page — copy lives in arrays at the top of the file |

## How the desktop layout matches the reference

The reference is a 1672 × 941 screenshot. `app/globals.css` defines one design
pixel:

```css
--u: min(1px, calc(100vw / 1672));
```

It equals `1px` on screens wider than the design and shrinks proportionally
below it, so every measured value is written as `calc(<design px> * var(--u))`
and the whole composition stays in proportion. Element coordinates (card
centres, tilts, sparkles, the chat widget) are the values measured from the
screenshot — see `app/data/reviews.ts`.

Below `1099px` the layout switches to a regular stacked one with normal `rem`
/ `clamp()` sizing: the header wraps, the copy and photo centre, and the six
review cards flow into a grid.

## Structure

```
app/
  layout.tsx              fonts + metadata
  page.tsx                home page
  video-editing/          service page (edit the `services` / `steps` arrays)
  components/
    Stage.tsx             the 1672px design canvas
    Header.tsx            logo, nav, header buttons
    Hero.tsx              headline, sub-copy, photo, backdrop, cards
    ReviewCard.tsx        one floating review card (sm / md / lg variants)
    TextUsWidget.tsx      chat widget — opens a message form on click
    icons.tsx             Google, G2, star, sparkle and chat marks (inline SVG)
  data/reviews.ts         card content and desktop placement
public/images/            hero photo and avatars extracted from the reference
```

Styling is CSS Modules; the type family is Urbanist via `next/font/google`.

## Notes

- The hero photograph and the four avatars are cut out of the reference
  screenshot (background removed) so the page matches it exactly. Swap the
  files in `public/images/` to use real assets.
- The review copy reproduces the reference verbatim, including its typos
  (`d:dominate`, `now:come`).
- The Text-us button opens a working message panel (client-side only — wire the
  submit handler in `TextUsWidget.tsx` to your backend or SMS provider).
