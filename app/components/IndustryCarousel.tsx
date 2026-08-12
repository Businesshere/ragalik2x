import Image from "next/image";
import { industries, type Industry } from "../data/industries";
import styles from "./IndustryCarousel.module.css";

function Tile({ item }: { item: Industry }) {
  if (item.image) {
    return (
      <Image
        className={styles.photo}
        src={item.image}
        alt=""
        width={430}
        height={460}
      />
    );
  }

  return (
    <span
      className={styles.placeholder}
      style={{ "--from": item.from, "--to": item.to } as React.CSSProperties}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
        />
      </svg>
    </span>
  );
}

export default function IndustryCarousel() {
  /* The list is rendered twice so the track can loop without a seam. */
  const loop = [...industries, ...industries];

  return (
    <section className={styles.section} aria-labelledby="industries-title">
      <h2 className={styles.title} id="industries-title">
        We&apos;ve helped local service businesses
        <br />
        for over 5 years
      </h2>

      <div className={styles.viewport}>
        <ul className={styles.track}>
          {loop.map((item, index) => (
            <li
              className={styles.item}
              key={`${item.label}-${index}`}
              aria-hidden={index >= industries.length}
            >
              <span className={styles.tile}>
                <Tile item={item} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
