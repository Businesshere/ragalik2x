# "Grow faster" card photos

Photos behind the benefit cards in `app/components/GrowFaster.tsx`. Filenames
are referenced from the `cards` array there, so keep these names:

| File                 | Card          | Subject                                                   |
| -------------------- | ------------- | --------------------------------------------------------- |
| `get-found.png`      | Get Found     | People on the street checking a 5-star listing on a phone  |
| `get-chosen.png`     | Get Chosen    | Phone showing Google Maps pins and a 5-star business card  |
| `stop-guessing.png`  | Stop Guessing | Local-ranking dashboard: map grid, keywords, competitors   |

Tiles crop to fill (`object-fit: cover`) at roughly 4:3 on desktop, so landscape
shots around 1120 × 810 or larger work best. The caption sits over a dark wash
along the bottom edge — keep the lower-left of the image free of detail.

A card with no file falls back to its gradient; remove the `image` line in
`GrowFaster.tsx` if you drop one.
