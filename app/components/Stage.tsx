import styles from "./Stage.module.css";

type StageProps = {
  children: React.ReactNode;
  /** Home page hero: the stage fills at least the viewport height. */
  fullHeight?: boolean;
};

/**
 * The 1672px design canvas. It is capped at the design width on very large
 * screens and scales down with `--u` below it; under the desktop breakpoint
 * it becomes a plain full-width container.
 */
export default function Stage({ children, fullHeight = false }: StageProps) {
  return (
    <div className={`${styles.stage} ${fullHeight ? styles.fullHeight : ""}`}>
      {children}
    </div>
  );
}
