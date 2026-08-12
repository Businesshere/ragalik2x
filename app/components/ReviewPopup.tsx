"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "./icons";
import styles from "./ReviewPopup.module.css";

/** Placeholder feed — swap for real review data when the API is wired up. */
const notifications = [
  { name: "Larry", date: "Jul 10" },
  { name: "Denise", date: "Jul 12" },
  { name: "Marco", date: "Jul 15" },
  { name: "Priya", date: "Jul 18" },
  { name: "Tom", date: "Jul 22" },
  { name: "Alicia", date: "Jul 26" },
];

const SHOW_MS = 6000;
const HIDE_MS = 2500;

/** The AI section runs its own review cards — this one steps aside for it. */
const QUIET_SECTION = "ai-search";

export default function ReviewPopup() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [quiet, setQuiet] = useState(false);

  useEffect(() => {
    const target = document.getElementById(QUIET_SECTION);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setQuiet(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    /* Paused rather than merely hidden, so it does not cycle out of sight. */
    if (quiet) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(
      () => {
        if (visible) {
          setVisible(false);
        } else {
          setIndex((current) => (current + 1) % notifications.length);
          setVisible(true);
        }
      },
      visible ? SHOW_MS : HIDE_MS,
    );

    return () => window.clearTimeout(timer);
  }, [visible, quiet]);

  const review = notifications[index];

  return (
    <aside
      className={`${styles.popup} ${visible ? styles.visible : ""}`}
      aria-label="Recent review"
    >
      <StarIcon className={styles.badge} />

      <div className={styles.body}>
        <p className={styles.headline}>
          <span className={styles.name}>{review.name}</span> just left you a 5
          star review
        </p>

        <p className={styles.rating}>
          <span className={styles.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon key={i} />
            ))}
          </span>
          on Google
        </p>

        <p className={styles.meta}>
          {review.date}
          <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4 12.5 5.2 5.2L20 7"
            />
          </svg>
          by BeVisible
        </p>
      </div>
    </aside>
  );
}
