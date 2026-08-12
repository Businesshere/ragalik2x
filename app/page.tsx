import AiSearch from "./components/AiSearch";
import BookDemo from "./components/BookDemo";
import Footer from "./components/Footer";
import GrowFaster from "./components/GrowFaster";
import Header from "./components/Header";
import Hero from "./components/Hero";
import IndustryCarousel from "./components/IndustryCarousel";
import ReviewPopup from "./components/ReviewPopup";
import Stage from "./components/Stage";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page} id="top">
      <Stage fullHeight>
        <Header />
        <Hero />
      </Stage>

      <AiSearch />
      <GrowFaster />
      <BookDemo />
      <IndustryCarousel />
      <Footer />
      <ReviewPopup />
    </main>
  );
}
