"use client";

import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "./icons";
import styles from "./GrowFaster.module.css";

/**
 * The three benefit cards. `image` points at a file in `public/images/grow`;
 * a card without one falls back to its `from`/`to` gradient.
 */
const cards = [
  {
    id: "get-found",
    title: ["Get", "Found"],
    text: "Reviews are what Google ranks on. More of them, more often, and you climb the map pack in your area.",
    panel: "local" as const,
    from: "#6b5b4b",
    to: "#2a2320",
    image: "/images/grow/get-found.png" as string | undefined,
    alt: "Two travellers on a street checking a restaurant's 5-star Google listing on a phone",
  },
  {
    id: "get-chosen",
    title: ["Get", "Chosen"],
    text: "People compare star ratings before they call. A steady stream of recent 5-star reviews makes you the obvious pick.",
    panel: "leads" as const,
    from: "#5c6b58",
    to: "#232a22",
    image: "/images/grow/get-chosen.png" as string | undefined,
    alt: "A phone showing Google Maps with local business pins and a 5-star listing",
  },
  {
    id: "stop-guessing",
    title: ["Stop", "Guessing"],
    text: "See which locations, services and staff earn 5 stars — and which ones are dragging your Google rating down.",
    panel: "ratings" as const,
    from: "#7c6a63",
    to: "#2b2422",
    image: "/images/grow/stop-guessing.png" as string | undefined,
    alt: "A local-ranking dashboard showing map grid positions, tracked keywords and competitor ratings",
  },
];

/** "Get found" — where you land in the local pack. */
const localResults = [
  { rank: "1", name: "Your business", rating: "4.9", count: "146", you: true },
  { rank: "2", name: "Riverside Services", rating: "4.3", count: "58" },
  { rank: "3", name: "Kent & Co.", rating: "4.1", count: "32" },
];

/** "Get chosen" — review requests going out and coming back. */
const requests = [
  { name: "Donna Crutchfield", status: "reviewed" as const },
  { name: "Jerry Too", status: "reviewed" as const },
  { name: "Jane Smith", status: "opened" as const },
  { name: "+12036841001", status: "reviewed" as const },
  { name: "Albert Johnson", status: "sent" as const },
  { name: "+12036844647", status: "sent" as const },
];

const statusLabel = { reviewed: "Reviewed", opened: "Opened", sent: "Sent" };

/** "Stop guessing" — what the ratings are actually made of. */
const breakdown = [
  { stars: "5", share: 82 },
  { stars: "4", share: 12 },
  { stars: "3", share: 4 },
  { stars: "2", share: 1 },
  { stars: "1", share: 1 },
];

function Panel({ kind }: { kind: (typeof cards)[number]["panel"] }) {
  if (kind === "local") {
    return (
      <>
        <span className={styles.panelTitle}>Local results</span>
        <span className={styles.panelHead}>
          <span>Business</span>
          <span>Rating</span>
        </span>
        <span className={styles.rows}>
          {localResults.map((result) => (
            <span
              className={styles.row}
              key={result.name}
              data-you={result.you ?? false}
            >
              <span className={styles.rank}>{result.rank}</span>
              <span className={styles.rowName}>{result.name}</span>
              <span className={styles.ratingCell}>
                <StarIcon className={styles.ratingStar} />
                {result.rating}
                <span className={styles.count}>({result.count})</span>
              </span>
            </span>
          ))}
        </span>
      </>
    );
  }

  if (kind === "ratings") {
    return (
      <>
        <span className={styles.panelTitle}>Rating breakdown</span>
        <span className={styles.panelHead}>
          <span>Last 90 days</span>
          <span className={styles.average}>4.9 ★</span>
        </span>
        <span className={styles.rows}>
          {breakdown.map((row) => (
            <span className={styles.barRow} key={row.stars}>
              <span className={styles.barLabel}>{row.stars}★</span>
              <span className={styles.barTrack}>
                <span
                  className={styles.barFill}
                  style={{ width: `${row.share}%` }}
                />
              </span>
              <span className={styles.barValue}>{row.share}%</span>
            </span>
          ))}
        </span>
      </>
    );
  }

  return (
    <>
      <span className={styles.panelTitle}>Review requests</span>
      <span className={styles.panelHead}>
        <span>Customer</span>
        <span>Status</span>
      </span>
      <span className={styles.rows}>
        {requests.map((request) => (
          <span className={styles.row} key={request.name}>
            <span className={styles.rowName}>{request.name}</span>
            {request.status === "reviewed" ? (
              <span className={styles.reviewed}>
                {[1, 2, 3, 4, 5].map((step) => (
                  <StarIcon key={step} />
                ))}
              </span>
            ) : (
              <span className={styles.status} data-status={request.status}>
                {statusLabel[request.status]}
              </span>
            )}
          </span>
        ))}
      </span>
    </>
  );
}

export default function GrowFaster() {
  /* One card is open at a time; opening another closes the current one. */
  const [openId, setOpenId] = useState("get-chosen");

  return (
    <section className={styles.section} aria-labelledby="grow-title">
      <p className={styles.eyebrow}>Grow faster</p>
      <h2 className={styles.title} id="grow-title">
        More Reviews. More Revenue.
      </h2>
      <p className={styles.lede}>
        Every new 5-star review pushes your business higher in Google Maps —
        so more local customers find you, trust you, and call you.
      </p>

      <div className={styles.grid}>
        {cards.map((card) => {
          const open = card.id === openId;

          return (
            <button
              type="button"
              key={card.id}
              className={styles.card}
              data-open={open}
              aria-expanded={open}
              onClick={() => setOpenId(card.id)}
              style={
                { "--from": card.from, "--to": card.to } as React.CSSProperties
              }
            >
              {card.image && (
                <Image
                  className={styles.photo}
                  src={card.image}
                  alt={card.alt}
                  width={1120}
                  height={810}
                />
              )}

              <span className={styles.panel} aria-hidden="true">
                <Panel kind={card.panel} />
              </span>

              {/* The wash spans the full card; only the text column narrows
                  when the card opens, so it never runs under the panel. */}
              <span className={styles.caption}>
                <span className={styles.captionInner}>
                  {/* Stacks on the narrow closed card, one line once open. */}
                  <span className={styles.cardTitle}>
                    {card.title[0]}{" "}
                    <br className={styles.titleBreak} />
                    {card.title[1]}
                  </span>
                  <span className={styles.cardText}>{card.text}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
