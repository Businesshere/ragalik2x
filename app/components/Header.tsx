import Link from "next/link";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Reviews", href: "/" },
  { label: "Video Editing", href: "/video-editing" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/">
        BeFirst
      </Link>

      <nav className={styles.nav} aria-label="Main">
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link className={styles.navLink} href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        <a className={styles.ghostButton} href="#free-reviews">
          2 Reviews Free
        </a>
        <a className={styles.primaryButton} href="#more-info">
          More Info
        </a>
      </div>
    </header>
  );
}
