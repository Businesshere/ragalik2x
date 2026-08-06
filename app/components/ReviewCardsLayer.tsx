"use client";

import { useEffect, useRef } from "react";
import { reviews } from "../data/reviews";
import ReviewCard from "./ReviewCard";
import styles from "./Hero.module.css";

/**
 * The six floating review cards. Pointer position is published as `--mx` /
 * `--my` (each -1…1) and every card drifts by its own `--depth`, so they
 * move as a loose, layered group rather than one flat plane.
 */
export default function ReviewCardsLayer() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = layer.current;
    if (!element) return;

    const wantsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)")
      .matches;
    if (!wantsMotion || !hasPointer) return;

    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.setProperty("--mx", (x * 2).toFixed(3));
        element.style.setProperty("--my", (y * 2).toFixed(3));
      });
    };

    const onLeave = () => {
      element.style.setProperty("--mx", "0");
      element.style.setProperty("--my", "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.cards} ref={layer}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
