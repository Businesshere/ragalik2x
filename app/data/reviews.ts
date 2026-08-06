export type Review = {
  id: string;
  source: "google" | "g2";
  quote: string;
  author: string;
  date: string;
  avatar: string;
  /** Card style variant — matches the three card sizes used in the design. */
  size: "sm" | "md" | "lg";
  /** Optional width override, in design pixels. */
  width?: number;
  /** Optional size multiplier — the design draws a couple of cards smaller. */
  scale?: number;
  /** How far the card drifts with the pointer, in design pixels. */
  depth?: number;
  italic?: boolean;
  /**
   * Desktop placement inside the 1672 x 941 design canvas:
   * `x`/`y` are the centre of the card, `rotate` its tilt in degrees.
   */
  x: number;
  y: number;
  rotate: number;
};

/** Left column, top to bottom, then right column, top to bottom. */
export const reviews: Review[] = [
  {
    id: "left-1",
    source: "google",
    quote: "Super easy tool to use. Very intuitive. The AI is the bomb!",
    author: "Craig Goodmanner",
    date: "Aug 7, 2025",
    avatar: "/images/avatar-craig.png",
    size: "md",
    italic: true,
    x: 189.8,
    y: 258.1,
    rotate: 2.4,
    depth: 14,
    scale: 0.975,
  },
  {
    id: "left-2",
    source: "g2",
    quote: "Game-Changer for Google Business Rankings",
    author: "Robert T.",
    date: "Aug 11, 2025",
    avatar: "/images/avatar-robert.png",
    size: "lg",
    width: 202,
    x: 242.4,
    y: 427.3,
    rotate: -5.9,
    depth: 21,
  },
  {
    id: "left-3",
    source: "google",
    quote:
      "Great company with great products to help you a d:dominate SEO & stay ahead where SEO is truly now:come a great leap to...",
    author: "Munowar Murtahin",
    date: "August 7, 2025",
    avatar: "/images/avatar-munowar.png",
    size: "sm",
    x: 174.0,
    y: 615.4,
    rotate: 11.6,
    depth: 9,
    scale: 0.98,
  },
  {
    id: "right-1",
    source: "google",
    quote: "Super easy tool to use. Very intuitive. The AI is the bomb!",
    author: "Craig Goodmanner",
    date: "Aug 7, 2025",
    avatar: "/images/avatar-craig.png",
    size: "md",
    italic: true,
    x: 1470.0,
    y: 248.0,
    rotate: 2.1,
    depth: 12,
  },
  {
    id: "right-2",
    source: "g2",
    quote: "Paige Helped Us Dominate Local Search and Scale Faster",
    author: "Michael",
    date: "July 3, 2025",
    avatar: "/images/avatar-michael.png",
    size: "lg",
    x: 1494.5,
    y: 437.6,
    rotate: -5.9,
    depth: 19,
  },
  {
    id: "right-3",
    source: "google",
    quote:
      "Great company with great products to help you a d:dominate SEO & stay ahead where SEO is truly now:come a great leap to...",
    author: "Munowar Murtahin",
    date: "August 7, 2025",
    avatar: "/images/avatar-munowar.png",
    size: "sm",
    x: 1417.0,
    y: 630.0,
    rotate: 12.4,
    depth: 8,
  },
];
