type IconProps = {
  className?: string;
  style?: React.CSSProperties;
};

/** Multi-colour Google "G" used on the review cards. */
export function GoogleIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#ea4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285f4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#fbbc05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34a853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/** G2 review-platform mark. */
export function G2Icon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M23.5 33A12 12 0 1 1 19.1 13.2"
        fill="none"
        stroke="#ff492c"
        strokeWidth="7"
      />
      <path d="M16.5 24.5 28 20 33 31.5 21.5 36z" fill="#ff492c" />
      <text
        x="31.5"
        y="16.4"
        fill="#ff492c"
        fontFamily="inherit"
        fontSize="18"
        fontWeight="700"
        textAnchor="middle"
      >
        2
      </text>
    </svg>
  );
}

/** Solid five-point star. */
export function StarIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .9l3.1 7.1 7.7.7-5.8 5.1 1.7 7.5-6.7-4-6.7 4 1.7-7.5L1.2 8.7l7.7-.7z"
      />
    </svg>
  );
}

/** Row of five gold stars. */
export function StarRating({ className }: IconProps) {
  return (
    <span className={className} role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} />
      ))}
    </span>
  );
}

/** Four-point sparkle scattered across the hero background. */
export function SparkleIcon({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0c.5 6.2 5.8 11.5 12 12-6.2.5-11.5 5.8-12 12-.5-6.2-5.8-11.5-12-12C6.2 11.5 11.5 6.2 12 0z"
      />
    </svg>
  );
}

/** Two overlapping chat bubbles for the "Text us" button. */
export function ChatIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M13.5 3.5h13a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5H24v4l-4.5-4h-6A2.5 2.5 0 0 1 11 14V6a2.5 2.5 0 0 1 2.5-2.5z" />
        <path
          fill="#0a0a0a"
          d="M5.5 11.5h11A2.5 2.5 0 0 1 19 14v7.5a2.5 2.5 0 0 1-2.5 2.5H11l-5.5 4.5V24h-.5a2.5 2.5 0 0 1-2.5-2.5V14a2.5 2.5 0 0 1 2.5-2.5z"
        />
      </g>
    </svg>
  );
}
