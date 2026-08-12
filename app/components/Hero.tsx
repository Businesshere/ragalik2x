import Image from "next/image";
import ReviewCardsLayer from "./ReviewCardsLayer";
import TextUsWidget from "./TextUsWidget";
import { SparkleIcon } from "./icons";
import styles from "./Hero.module.css";

/*
 * Background decoration, placed on the 1672 x 941 design canvas.
 * Glows are anchored to the bottom of the canvas, sparkles to the top.
 */
const glows = [
  { x: 240, y: -219, w: 760, h: 600, a: 0.16 },
  { x: 850, y: -139, w: 600, h: 500, a: 0.1 },
];

const rings = [485, 435, 385];

const sparkles = [
  { x: 463, y: 357, size: 24 },
  { x: 1231, y: 463, size: 28 },
  { x: 493, y: 534, size: 28 },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true">
        {glows.map((glow) => (
          <span
            key={`${glow.x}-${glow.y}`}
            className={styles.glow}
            style={
              {
                "--gx": glow.x,
                "--gy": glow.y,
                "--gw": glow.w,
                "--gh": glow.h,
                "--ga": glow.a,
              } as React.CSSProperties
            }
          />
        ))}

        {rings.map((radius) => (
          <span
            key={radius}
            className={styles.ring}
            style={{ "--r": radius } as React.CSSProperties}
          />
        ))}

        {sparkles.map((sparkle) => (
          <SparkleIcon
            key={`${sparkle.x}-${sparkle.y}`}
            className={styles.sparkle}
            style={
              {
                "--x": sparkle.x,
                "--y": sparkle.y,
                "--size": sparkle.size,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className={styles.copy}>
        <h1 className={styles.title}>Google Reviews for your business</h1>
        <p className={styles.subtitle}>
          Get more 5-star reviews, build trust, and rank higher on Google with
          real customer feedback.
        </p>
      </div>

      <div className={styles.figure}>
        <Image
          className={styles.photo}
          src="/images/hero-woman-phone.png"
          alt="Woman holding a phone showing BeVisible's 5-star Google reviews"
          width={589}
          height={664}
          sizes="(max-width: 1099px) 90vw, 36vw"
          quality={95}
          priority
        />
      </div>

      <ReviewCardsLayer />

      <TextUsWidget />
    </section>
  );
}
