"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./AiSearch.module.css";

type StatementProps = {
  /** Cycled through in order; the first is already typed when this mounts. */
  words: string[];
  /** The fixed remainder of the line. */
  tail: string;
  /** Plays the dissolve-out animation instead of the entrance. */
  out: boolean;
};

const speed = { type: 62, erase: 28, hold: 800, gap: 240 };

/**
 * The closing line: one word erases itself and the next types in its place,
 * so the same sentence lands four different ways. The slot is sized to the
 * longest word, which keeps `tail` from shuffling as the word changes.
 */
export default function Statement({ words, tail, out }: StatementProps) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(words[0].length);

  const longest = useMemo(
    () => words.reduce((a, b) => (b.length > a.length ? b : a), ""),
    [words],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timers: number[] = [];
    let alive = true;
    let word = 0;
    let count = words[0].length;

    const at = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const erase = () => {
      if (!alive) return;
      if (count === 0) {
        word = (word + 1) % words.length;
        setIndex(word);
        at(speed.gap, type);
        return;
      }
      count -= 1;
      setShown(count);
      at(speed.erase, erase);
    };

    const type = () => {
      if (!alive) return;
      if (count >= words[word].length) {
        at(speed.hold, erase);
        return;
      }
      count += 1;
      setShown(count);
      at(speed.type, type);
    };

    at(speed.hold, erase);

    return () => {
      alive = false;
      timers.forEach(window.clearTimeout);
    };
  }, [words]);

  return (
    <div className={styles.statement} data-out={out}>
      <p className={styles.statementLine}>
        <span className={styles.rotator}>
          {/* invisible, but holds the column open at its widest */}
          <span className={styles.rotatorSizer}>{longest}</span>
          <span className={styles.rotatorWord}>
            {words[index].slice(0, shown)}
            <span className={styles.rotatorCaret} />
          </span>
        </span>{" "}
        {tail}
      </p>

      <p className={styles.statementSub}>
        Assistants read what your customers wrote. Fresh, specific reviews are
        the difference between being cited and being skipped.
      </p>
    </div>
  );
}
