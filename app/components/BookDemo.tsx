"use client";

import { useEffect, useState } from "react";
import styles from "./BookDemo.module.css";

/** Edit these to change the three steps on the left. */
const steps = [
  {
    label: "Step 1",
    title: "Book your personalized walkthrough",
    text: "Pick a time that works for you. We'll tailor the demo to your locations, industry, and goals.",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18" />
        <path d="m9 15 2 2 4-4" />
      </>
    ),
  },
  {
    label: "Step 2",
    title: "See your Google profile in action",
    text: "Watch how review requests go out on autopilot, how replies land in one inbox, and how your map ranking moves.",
    icon: (
      <>
        <circle cx="7" cy="7" r="2.4" />
        <circle cx="17" cy="12" r="2.4" />
        <circle cx="7" cy="17" r="2.4" />
        <path d="M9.4 8.2 14.8 10.9M9.4 15.8 14.8 13.1" />
      </>
    ),
  },
  {
    label: "Step 3",
    title: "Leave with a clear plan",
    text: "Get practical next steps to lift your Google rating, win more calls from the map pack, and keep customers coming back.",
    icon: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2.5" />
        <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
        <path d="m9 13 2 2 4-4" />
      </>
    ),
  },
];

const slots = [
  "9:00 am",
  "9:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "1:00 pm",
  "1:30 pm",
  "2:00 pm",
  "2:30 pm",
  "3:00 pm",
];

type Stage = "time" | "details" | "done";

export default function BookDemo() {
  const [stage, setStage] = useState<Stage>("time");
  const [slot, setSlot] = useState<string | null>(null);
  const [day, setDay] = useState("");
  const [zone, setZone] = useState("");

  /* Dates are resolved on the client so the copy always reads "next weekday". */
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    while (date.getDay() === 0 || date.getDay() === 6) {
      date.setDate(date.getDate() + 1);
    }

    setDay(
      date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );
    setZone(Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " "));
  }, []);

  return (
    <section className={styles.section} aria-labelledby="book-title">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <h2 className={styles.title} id="book-title">
            See BeFirst in action
            <br />
            <span className={styles.accent}>in 15 minutes</span>
          </h2>

          <ol className={styles.steps}>
            {steps.map((step) => (
              <li className={styles.step} key={step.label}>
                <span className={styles.chip} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {step.icon}
                  </svg>
                </span>
                <span className={styles.stepLabel}>{step.label}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.widget}>
          {stage === "time" && (
            <div className={styles.pane}>
              <p className={styles.fieldLabel}>Meeting duration</p>
              <p className={styles.duration}>15 mins</p>

              <p className={styles.paneTitle}>What time works best?</p>
              <p className={styles.paneNote}>
                Showing times for <strong>{day || "the next working day"}</strong>
              </p>
              {zone && <p className={styles.zone}>{zone}</p>}

              <ul className={styles.slots}>
                {slots.map((time) => (
                  <li key={time}>
                    <button
                      className={styles.slot}
                      type="button"
                      onClick={() => {
                        setSlot(time);
                        setStage("details");
                      }}
                    >
                      {time}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {stage === "details" && (
            <form
              className={styles.pane}
              onSubmit={(event) => {
                event.preventDefault();
                setStage("done");
              }}
            >
              <p className={styles.paneTitle}>Your information</p>
              <p className={styles.summary}>
                {day} {slot}
                <button
                  className={styles.edit}
                  type="button"
                  onClick={() => setStage("time")}
                >
                  Edit
                </button>
              </p>
              <p className={styles.place}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                  />
                </svg>
                Google Meet
              </p>

              <label className={styles.field}>
                <span className={styles.fieldLabel}>First name *</span>
                <input name="first" type="text" autoComplete="given-name" required />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Last name *</span>
                <input name="last" type="text" autoComplete="family-name" required />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Your email address *</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>

              <div className={styles.actions}>
                <button
                  className={styles.back}
                  type="button"
                  onClick={() => setStage("time")}
                >
                  Back
                </button>
                <button className={styles.confirm} type="submit">
                  Confirm
                </button>
              </div>
            </form>
          )}

          {stage === "done" && (
            <div className={`${styles.pane} ${styles.done}`}>
              <svg
                className={styles.celebrate}
                viewBox="0 0 120 120"
                aria-hidden="true"
              >
                <circle cx="26" cy="30" r="11" fill="#c7d2fe" />
                <circle cx="46" cy="18" r="8" fill="#fecdd3" />
                <circle cx="92" cy="26" r="6" fill="#fde68a" />
                <path
                  d="M18 62h84"
                  stroke="#dbe3f7"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0"
                />
                <path
                  d="m38 62 16 17 32-38"
                  fill="none"
                  stroke="#0247fe"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M96 74v10M91 79h10"
                  stroke="#a5b4fc"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              <p className={styles.doneTitle}>Booking confirmed</p>
              <p className={styles.doneText}>
                You&apos;re booked with the BeFirst team.
                <br />
                An invitation has been emailed to you.
              </p>
              <p className={styles.doneWhen}>
                {day}
                <br />
                {slot}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
