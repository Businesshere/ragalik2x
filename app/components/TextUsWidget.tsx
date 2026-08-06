"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChatIcon, StarIcon } from "./icons";
import styles from "./TextUsWidget.module.css";

export default function TextUsWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    firstFieldRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className={styles.widget} ref={panelRef}>
      {open && (
        <div
          className={styles.panel}
          id={panelId}
          role="dialog"
          aria-label="Text us"
        >
          <div className={styles.panelHead}>
            <p className={styles.panelTitle}>Text us</p>
            <button
              className={styles.close}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {sent ? (
            <p className={styles.sent}>
              Thanks! We&apos;ll text you right back.
            </p>
          ) : (
            <form
              className={styles.form}
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <label className={styles.field}>
                <span className={styles.labelText}>Name</span>
                <input
                  ref={firstFieldRef}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                />
              </label>
              <label className={styles.field}>
                <span className={styles.labelText}>Mobile number</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </label>
              <label className={styles.field}>
                <span className={styles.labelText}>Message</span>
                <textarea
                  name="message"
                  rows={3}
                  defaultValue="Hi! I'd like to know more about getting more Google reviews."
                  required
                />
              </label>
              <button className={styles.send} type="submit">
                Send
              </button>
            </form>
          )}
        </div>
      )}

      <p className={styles.badge}>
        <StarIcon className={styles.badgeStar} />
        4.9 Stars - 146 Reviews
      </p>

      <button
        className={styles.pill}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className={styles.label}>Text us</span>
        <span className={styles.circle}>
          <ChatIcon className={styles.chat} />
        </span>
      </button>
    </div>
  );
}
