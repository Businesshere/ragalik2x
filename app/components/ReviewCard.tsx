import Image from "next/image";
import type { Review } from "../data/reviews";
import { G2Icon, GoogleIcon, StarRating } from "./icons";
import styles from "./ReviewCard.module.css";

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const {
    source,
    quote,
    author,
    date,
    avatar,
    size,
    width,
    scale,
    depth,
    italic,
    x,
    y,
    rotate,
  } = review;

  return (
    <article
      className={`${styles.card} ${styles[size]} ${italic ? styles.italic : ""}`}
      style={
        {
          "--x": x,
          "--y": y,
          "--rotate": `${rotate}deg`,
          ...(width ? { "--width": width } : {}),
          ...(scale ? { "--scale": scale } : {}),
          ...(depth ? { "--depth": depth } : {}),
        } as React.CSSProperties
      }
    >
      <header className={styles.head}>
        {source === "google" ? (
          <GoogleIcon className={styles.logo} />
        ) : (
          <G2Icon className={styles.logo} />
        )}
        <StarRating className={styles.stars} />
      </header>

      <p className={styles.quote}>{quote}</p>

      <footer className={styles.author}>
        <Image
          className={styles.avatar}
          src={avatar}
          alt=""
          width={96}
          height={96}
        />
        <span className={styles.identity}>
          <span className={styles.name}>{author}</span>
          <span className={styles.date}>{date}</span>
        </span>
      </footer>
    </article>
  );
}
