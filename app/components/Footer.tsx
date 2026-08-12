import Link from "next/link";
import { GoogleIcon, StarIcon } from "./icons";
import styles from "./Footer.module.css";

/**
 * Placeholder award badges — replace with the ones you have actually been
 * given (the issuer owns the artwork and the wording).
 */
const awards = [
  { season: "Winter 2026", label: "Leader", accent: "#ff6b2c" },
  { season: "Winter 2026", label: "Best Est. ROI", accent: "#6b4ce6" },
  { season: "Winter 2026", label: "High Performer", accent: "#ff9a1f" },
  { season: "Winter 2026", label: "Most Implementable", accent: "#2f6fe4" },
];

const menus = [
  {
    title: "Product",
    links: [
      { label: "Google reviews", href: "/" },
      { label: "Video editing", href: "/video-editing" },
      { label: "Review widgets", href: "#widgets" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Restaurants & cafés", href: "#restaurants" },
      { label: "Home services", href: "#home-services" },
      { label: "Automotive", href: "#automotive" },
      { label: "Beauty & salon", href: "#beauty" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "#about" },
      { label: "Book a demo", href: "#book-title" },
      { label: "Contact", href: "#contact" },
      { label: "Support", href: "#support" },
    ],
  },
];

const socials = [
  {
    label: "Facebook",
    href: "#facebook",
    path: "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5H16.6V4.4A20 20 0 0 0 14.5 4.3c-2.2 0-3.7 1.3-3.7 3.8v2.4H8.2v3h2.6V21z",
  },
  {
    label: "X",
    href: "#x",
    path: "M4 4h3.6l4.2 5.7L16.7 4H20l-6.3 7.4L20.4 20h-3.6l-4.5-6-5.2 6H4l6.6-7.7z",
  },
  {
    label: "Instagram",
    href: "#instagram",
    path: "M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm4 2.8A4.2 4.2 0 1 1 7.8 12 4.2 4.2 0 0 1 12 7.8m0 2A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8M17 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1",
  },
  {
    label: "LinkedIn",
    href: "#linkedin",
    path: "M4.8 3a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8M3.2 8.5h3.2V21H3.2zM9.4 8.5h3v1.7a3.4 3.4 0 0 1 3-1.9c3 0 3.6 1.9 3.6 4.5V21h-3.1v-5.6c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V21h-3.1z",
  },
  {
    label: "YouTube",
    href: "#youtube",
    path: "M21.6 8a2.6 2.6 0 0 0-1.8-1.8C18.2 5.8 12 5.8 12 5.8s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 8a26 26 0 0 0-.4 4.6 26 26 0 0 0 .4 4.6 2.6 2.6 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8 26 26 0 0 0 .4-4.6 26 26 0 0 0-.4-4.6M10 15.5v-6l5.2 3z",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link className={styles.logo} href="/">
              BeVisible
            </Link>
            <p className={styles.pitch}>
              More 5-star Google reviews, collected on autopilot — so local
              customers find you first and choose you.
            </p>
            <a className={styles.cta} href="#book-title">
              Book a 15-min demo
            </a>
          </div>

          <div className={styles.menus}>
            {menus.map((menu) => (
              <nav className={styles.menu} key={menu.title}>
                <h2 className={styles.menuTitle}>{menu.title}</h2>
                <ul>
                  {menu.links.map((link) => (
                    <li key={link.label}>
                      <Link className={styles.menuLink} href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className={styles.trust}>
          <ul className={styles.awards}>
            {awards.map((award) => (
              <li
                className={styles.award}
                key={award.label}
                style={{ "--accent": award.accent } as React.CSSProperties}
              >
                <span className={styles.season}>{award.season}</span>
                <span className={styles.awardLabel}>{award.label}</span>
                <span className={styles.ribbon} aria-hidden="true" />
              </li>
            ))}
          </ul>

          <div className={styles.ratings}>
            <p className={styles.rating}>
              <span className={styles.stars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} />
                ))}
              </span>
              <span>
                4.9 out of 5 rating on
                <GoogleIcon className={styles.platform} />
              </span>
            </p>

          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} BeVisible. All rights reserved.
          </p>

          <ul className={styles.legal}>
            <li>
              <a href="#privacy">Privacy</a>
            </li>
            <li>
              <a href="#terms">Terms</a>
            </li>
          </ul>

          <ul className={styles.social}>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  className={styles.socialLink}
                  href={social.href}
                  aria-label={social.label}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
