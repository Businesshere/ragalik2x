export type Industry = {
  label: string;
  /** Tile gradient, used until a photo is dropped in. */
  from: string;
  to: string;
  /** Optional photo in /public/images — replaces the gradient tile. */
  image?: string;
};

/**
 * Business categories shown in the carousel — the Google Maps verticals we
 * collect reviews for. Add, remove or reorder freely; the marquee adapts.
 */
export const industries: Industry[] = [
  { label: "Restaurants & cafés", from: "#ff9a56", to: "#ff5f6d" },
  { label: "Trades & contractors", from: "#f7b733", to: "#fc4a1a" },
  { label: "Automotive", from: "#4b6cb7", to: "#182848" },
  { label: "Beauty & salon", from: "#f78ca0", to: "#c471ed" },
  { label: "Health & wellness", from: "#43cea2", to: "#185a9d" },
  { label: "Home services", from: "#56ab2f", to: "#a8e063" },
  { label: "HVAC", from: "#2193b0", to: "#6dd5ed" },
  { label: "Law & legal services", from: "#485563", to: "#29323c" },
  { label: "Jewelers", from: "#c79081", to: "#dfa579" },
  { label: "Dental & orthodontics", from: "#00c6ff", to: "#0072ff" },
  { label: "Real estate", from: "#3a7bd5", to: "#00d2ff" },
  { label: "Fitness & gyms", from: "#ee0979", to: "#ff6a00" },
  { label: "Plumbing & electrical", from: "#136a8a", to: "#267871" },
  { label: "Roofing", from: "#8e9eab", to: "#eef2f3" },
  { label: "Landscaping", from: "#11998e", to: "#38ef7d" },
  { label: "Pet care & grooming", from: "#f857a6", to: "#ff5858" },
  { label: "Cleaning services", from: "#5f2c82", to: "#49a09d" },
  { label: "Photography & events", from: "#654ea3", to: "#eaafc8" },
];
