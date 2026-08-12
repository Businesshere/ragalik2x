export type Industry = {
  label: string;
  /** Tile gradient, used until a photo is dropped in. */
  from: string;
  to: string;
  /** Optional photo in /public/images — replaces the gradient tile. */
  image?: string;
};

/** Where the carousel photos live. */
const photos = "/images/localbusinesess";

/**
 * Business categories shown in the carousel — the Google Maps verticals we
 * collect reviews for. Add, remove or reorder freely; the marquee adapts.
 *
 * To give a category a photo, drop the file in `public/images/localbusinesess`
 * and point `image` at it (see HVAC below). Tiles crop to fill, so any size
 * works; portrait shots sit best. Categories without a photo keep the gradient
 * tile, so the carousel never breaks while the set is incomplete.
 */
export const industries: Industry[] = [
  {
    label: "Restaurants & cafés",
    from: "#ff9a56",
    to: "#ff5f6d",
    image: `${photos}/restaurants.jpg`,
  },
  {
    label: "Trades & contractors",
    from: "#f7b733",
    to: "#fc4a1a",
    image: `${photos}/tradescontractors.jpg`,
  },
  {
    label: "Automotive",
    from: "#4b6cb7",
    to: "#182848",
    image: `${photos}/automative.jpg`,
  },
  {
    label: "Beauty & salon",
    from: "#f78ca0",
    to: "#c471ed",
    image: `${photos}/beautysalon.jpg`,
  },
  {
    label: "Health & wellness",
    from: "#43cea2",
    to: "#185a9d",
    image: `${photos}/healthwellness.jpg`,
  },
  {
    label: "Home services",
    from: "#56ab2f",
    to: "#a8e063",
    image: `${photos}/homeservices.jpg`,
  },
  {
    label: "HVAC",
    from: "#2193b0",
    to: "#6dd5ed",
    image: `${photos}/HVAC.jpg`,
  },
  {
    label: "Law & legal services",
    from: "#485563",
    to: "#29323c",
    image: `${photos}/lawlegalservices.jpg`,
  },
  {
    label: "Jewelers",
    from: "#c79081",
    to: "#dfa579",
    image: `${photos}/jewelers.jpg`,
  },
  {
    label: "Dental & orthodontics",
    from: "#00c6ff",
    to: "#0072ff",
    image: `${photos}/dentalortodonthics.jpg`,
  },
  {
    label: "Real estate",
    from: "#3a7bd5",
    to: "#00d2ff",
    image: `${photos}/real-estate.jpg`,
  },
  {
    label: "Fitness & gyms",
    from: "#ee0979",
    to: "#ff6a00",
    image: `${photos}/fitnessgym.jpg`,
  },
  {
    label: "Plumbing & electrical",
    from: "#136a8a",
    to: "#267871",
    image: `${photos}/plumbingelectrical.jpg`,
  },
  {
    label: "Roofing",
    from: "#8e9eab",
    to: "#eef2f3",
    image: `${photos}/roofing.jpg`,
  },
  {
    label: "Landscaping",
    from: "#11998e",
    to: "#38ef7d",
    image: `${photos}/landscaping.jpg`,
  },
  {
    label: "Pet care & grooming",
    from: "#f857a6",
    to: "#ff5858",
    image: `${photos}/petcaregrooming.jpg`,
  },
  {
    label: "Cleaning services",
    from: "#5f2c82",
    to: "#49a09d",
    image: `${photos}/cleaning.jpg`,
  },
  {
    label: "Photography & events",
    from: "#654ea3",
    to: "#eaafc8",
    image: `${photos}/photographyandevents.jpg`,
  },
];
