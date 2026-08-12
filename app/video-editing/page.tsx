import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Stage from "../components/Stage";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Video Editing — BeVisible",
  description:
    "Simple video editing services for businesses: short-form edits, long-form cuts, captions and thumbnails.",
};

/** Edit this list to change the services shown on the page. */
const services = [
  {
    title: "Short-form edits",
    text: "Reels, TikToks and Shorts cut from your raw footage, ready to post.",
  },
  {
    title: "Long-form videos",
    text: "YouTube and website videos with clean pacing, music and colour.",
  },
  {
    title: "Captions & subtitles",
    text: "Burned-in captions that keep viewers watching with the sound off.",
  },
  {
    title: "Thumbnails & covers",
    text: "Matching cover images so every video looks like part of one brand.",
  },
];

/** Edit this list to change the steps shown on the page. */
const steps = [
  { number: "01", text: "Send us your raw footage." },
  { number: "02", text: "We edit and send a first cut." },
  { number: "03", text: "One round of changes, then delivery." },
];

export default function VideoEditingPage() {
  return (
    <main className={styles.page} id="video-editing">
      <Stage>
        <Header />

        <section className={styles.intro}>
          <p className={styles.eyebrow}>Video Editing</p>
          <h1 className={styles.title}>Video, edited for your business</h1>
          <p className={styles.lede}>
            A simple editing service for the videos you already film. Send the
            footage, get back something you can publish.
          </p>
          <a className={styles.cta} href="#contact">
            Get a quote
          </a>
        </section>

        <section className={styles.services} aria-label="Services">
          {services.map((service) => (
            <article key={service.title} className={styles.card}>
              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardText}>{service.text}</p>
            </article>
          ))}
        </section>

        <section className={styles.steps} aria-label="How it works">
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.stepNumber}>{step.number}</span>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </section>
      </Stage>

      <Footer />
    </main>
  );
}
