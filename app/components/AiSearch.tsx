"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { GoogleIcon, SparkleIcon, StarIcon } from "./icons";
import Statement from "./Statement";
import styles from "./AiSearch.module.css";

/**
 * The prompt, split so the parts an answer engine actually matches on can be
 * lit up once it finishes typing. Order is the reading order.
 */
const prompt = [
  { text: "Best", key: true },
  { text: " " },
  { text: "jeweler", key: true },
  { text: " " },
  { text: "near me", key: true },
  { text: " in " },
  { text: "Brooklyn", key: true },
  { text: "?" },
];

/** What the assistant "returns", ranked the way it would rank them. */
const results = [
  {
    name: "Alfase Jewelry",
    area: "Sheepshead Bay, Brooklyn",
    rating: "4.9",
    count: "1,240",
    note: "Reviewers mention same-day resizing and custom engagement rings.",
  },
  {
    name: "Kings Row Goldsmiths",
    area: "Park Slope, Brooklyn",
    rating: "4.5",
    count: "620",
    note: "Family-run bench jeweler; reviews centre on repairs and restoration.",
  },
  {
    name: "Bridge Street Diamonds",
    area: "Downtown Brooklyn",
    rating: "4.2",
    count: "310",
    note: "Large diamond selection, by appointment only.",
  },
];

/**
 * Reviews and owner replies, written the way real ones read. `key` marks the
 * phrases an answer engine matches on — they occur naturally in the sentence
 * rather than being bolted on, which is the whole point of the section.
 */
type Segment = { text: string; key?: boolean };

const reviews: {
  id: string;
  author: string;
  avatar: string;
  when: string;
  quote: Segment[];
  reply: Segment[];
}[] = [
  {
    id: "miguel",
    author: "Miguel R.",
    avatar: "/images/avatar-michael.png",
    when: "2 minutes ago",
    quote: [
      { text: "Took my grandmother's ring in on a Saturday expecting to wait a week. Ana had the " },
      { text: "resizing done the same afternoon", key: true },
      { text: " and you honestly can't tell it was ever touched. Will be back." },
    ],
    reply: [
      { text: "Thank you, Miguel! " },
      { text: "Same-day ring resizing", key: true },
      { text: " is something we've worked hard to offer here in Sheepshead Bay — glad your grandmother's ring is back where it belongs." },
    ],
  },
  {
    id: "robert",
    author: "Robert T.",
    avatar: "/images/avatar-robert.png",
    when: "18 minutes ago",
    quote: [
      { text: "We'd been describing the same ring to every shop in Brooklyn for months. Drove out to " },
      { text: "Sheepshead Bay", key: true },
      { text: " on a friend's recommendation and walked out with the " },
      { text: "engagement ring", key: true },
      { text: " we actually wanted." },
    ],
    reply: [
      { text: "Congratulations, Robert! Helping couples design a " },
      { text: "custom engagement ring", key: true },
      { text: " is our favourite part of the job — thank you for making the trip out to us." },
    ],
  },
];

/** Renders a segment list, lighting up the phrases flagged as keywords. */
function Marked({ parts }: { parts: Segment[] }) {
  let hits = 0;

  return (
    <>
      {parts.map((part, index) => {
        if (!part.key) return <span key={index}>{part.text}</span>;
        const order = hits;
        hits += 1;
        return (
          <mark
            className={styles.good}
            key={index}
            style={{ "--k": order } as React.CSSProperties}
          >
            {part.text}
          </mark>
        );
      })}
    </>
  );
}

/** Words the closing statement cycles through. The first one is on screen
 *  when the line appears; the rest are typed in after it. */
const statementWords = ["Reviews", "Keywords", "Ratings", "Replies"];

/**
 * The scripted sequence in milliseconds. `char` is the per-character typing
 * speed; every other value is an offset from the moment typing finishes.
 */
const timing = {
  char: 44,
  highlight: 320,
  thinking: 1750,
  answering: 2650,
  reviews: 3900,
  dissolve: 7200,
  statement: 8300,
  statementOut: 16100,
  restart: 17000,
};

/** Ordered, so "have we reached X yet" is a single index comparison. */
const phases = [
  "typing",
  "highlight",
  "thinking",
  "answering",
  "reviews",
  "dissolve",
  "statement",
  "statementOut",
] as const;

type Phase = (typeof phases)[number];

export default function AiSearch() {
  const root = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState(0);

  /* Character offsets let each segment slice itself out of one counter. */
  const segments = useMemo(() => {
    let start = 0;
    return prompt.map((part) => {
      const at = start;
      start += part.text.length;
      return { ...part, start: at };
    });
  }, []);

  const promptText = useMemo(
    () => prompt.map((part) => part.text).join(""),
    [],
  );

  const step = phases.indexOf(phase);
  const reached = (target: Phase) => step >= phases.indexOf(target);
  const showStage = step < phases.indexOf("dissolve");
  const showStatement = phase === "statement" || phase === "statementOut";

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    /* Without motion the demo is shown finished, and never replays. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(promptText.length);
      setPhase("reviews");
      return;
    }

    let timers: number[] = [];
    let typer = 0;
    /* The loop only runs while the section is on screen. */
    let onScreen = false;
    let queued = true;

    const at = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const run = () => {
      timers = [];
      setPhase("typing");
      setTyped(0);

      let index = 0;
      typer = window.setInterval(() => {
        index += 1;
        setTyped(index);
        if (index < promptText.length) return;

        window.clearInterval(typer);
        at(timing.highlight, () => setPhase("highlight"));
        at(timing.thinking, () => setPhase("thinking"));
        at(timing.answering, () => setPhase("answering"));
        at(timing.reviews, () => setPhase("reviews"));
        at(timing.dissolve, () => setPhase("dissolve"));
        at(timing.statement, () => setPhase("statement"));
        at(timing.statementOut, () => setPhase("statementOut"));
        at(timing.restart, () => {
          if (onScreen) run();
          else queued = true;
        });
      }, timing.char);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && queued) {
          queued = false;
          run();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      window.clearInterval(typer);
    };
  }, [promptText]);

  return (
    /* The id is how ReviewPopup knows to stay out of this section's way. */
    <section className={styles.section} id="ai-search" aria-labelledby="ai-title">
      <p className={styles.eyebrow}>Answer engine optimisation</p>
      <h2 className={styles.title} id="ai-title">
        Your customers ask AI first
      </h2>
      <p className={styles.lede}>
        Assistants answer &ldquo;near me&rdquo; questions from the same reviews
        Google ranks on. Keep them fresh and you are the business they name.
      </p>

      {/* The animation is decoration; this is what assistive tech reads. */}
      <p className={styles.srOnly}>
        An AI assistant is asked &ldquo;{promptText}&rdquo; and answers with
        three Brooklyn jewellers ranked by rating, led by {results[0].name} in{" "}
        {results[0].area} at {results[0].rating} stars from {results[0].count}{" "}
        reviews. Alongside it, new Google reviews arrive and are answered.
        Reviews, keywords, ratings and replies are what AI search runs on.
      </p>

      <div className={styles.frame} ref={root} aria-hidden="true">
        {/* Both layers share the grid cell, so one dissolves into the other. */}
        <div className={styles.stage} data-out={!showStage}>
          <div className={styles.chat}>
            <div className={styles.chatBar}>
              <span className={styles.chrome}>
                <i />
                <i />
                <i />
              </span>
              <span className={styles.chatTitle}>AI assistant</span>
            </div>

            <div className={styles.thread}>
              {/* Lands as soon as typing ends; the keywords light up in it. */}
              {reached("highlight") && (
                <p className={styles.ask}>
                  {segments.map((part, index) =>
                    part.key ? (
                      <mark
                        className={styles.keyword}
                        key={index}
                        style={{ "--i": index } as React.CSSProperties}
                      >
                        {part.text}
                      </mark>
                    ) : (
                      <span key={index}>{part.text}</span>
                    ),
                  )}
                </p>
              )}

              {reached("thinking") && (
                <div className={styles.answer}>
                  <span className={styles.mark}>
                    <SparkleIcon />
                  </span>

                  {phase === "thinking" ? (
                    <span className={styles.thinking}>
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    <div className={styles.reply}>
                      <p className={styles.replyLead}>
                        Three well-reviewed jewellers in Brooklyn:
                      </p>

                      <ol className={styles.results}>
                        {results.map((item, index) => (
                          <li
                            className={styles.result}
                            key={item.name}
                            style={{ "--i": index } as React.CSSProperties}
                          >
                            <span className={styles.rank}>{index + 1}</span>
                            <span className={styles.resultBody}>
                              <span className={styles.resultHead}>
                                <span className={styles.resultName}>
                                  {item.name}
                                </span>
                              </span>
                              <span className={styles.score}>
                                <StarIcon className={styles.scoreStar} />
                                {item.rating}
                                <span className={styles.count}>
                                  ({item.count} reviews)
                                </span>
                                <span className={styles.dot} />
                                {item.area}
                              </span>
                              <span className={styles.note}>{item.note}</span>
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.composer}>
              <span className={styles.field}>
                {phase === "typing" ? (
                  <>
                    {segments.map((part, index) => (
                      <span key={index}>
                        {part.text.slice(0, Math.max(0, typed - part.start))}
                      </span>
                    ))}
                    <span className={styles.caret} />
                  </>
                ) : (
                  <span className={styles.placeholder}>Ask anything</span>
                )}
              </span>
              <span className={styles.send} data-armed={phase === "typing"}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 4.5 19 12h-4.4v7.5h-5.2V12H5z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className={styles.side}>
            {reached("reviews") &&
              reviews.map((review, index) => (
                <article
                  className={styles.reviewCard}
                  key={review.id}
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <header className={styles.reviewTop}>
                    <Image
                      className={styles.avatar}
                      src={review.avatar}
                      alt=""
                      width={44}
                      height={44}
                    />
                    <span className={styles.who}>
                      <span className={styles.author}>{review.author}</span>
                      <span className={styles.when}>{review.when}</span>
                    </span>
                    <GoogleIcon className={styles.google} />
                  </header>

                  <span className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon key={star} />
                    ))}
                  </span>

                  <p className={styles.quote}>
                    <Marked parts={review.quote} />
                  </p>

                  <div className={styles.replyBox}>
                    <p className={styles.replyTag}>
                      <SparkleIcon />
                      Drafted by BeVisible
                    </p>
                    <p className={styles.replyText}>
                      <Marked parts={review.reply} />
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </div>

        {showStatement && (
          <Statement
            words={statementWords}
            out={phase === "statementOut"}
            tail="matter for AI search"
          />
        )}
      </div>
    </section>
  );
}
