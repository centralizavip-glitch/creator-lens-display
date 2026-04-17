const iconStyle = {
  stroke: "#717996",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export function ImageIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="1.8" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

export function PostIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 300 512"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M62.8 96.3c-12.6 0-22.7 10.1-22.7 22.7v272.3c0 12.6 10.1 22.7 22.7 22.7h181.5c12.6 0 22.7-10.1 22.7-22.7V119c0-12.6-10.1-22.7-22.7-22.7H62.8zM17.4 119c0-25 20.4-45.4 45.4-45.4h181.5c25 0 45.4 20.4 45.4 45.4v272.3c0 25-20.4 45.4-45.4 45.4H62.8c-25 0-45.4-20.4-45.4-45.4V119zM258.3 10.6c0-5.9-4.7-10.6-10.5-10.6H59.3c-5.7 0-10.4 4.8-10.4 10.6s4.7 10.6 10.5 10.6h188.5c5.8 0 10.4-4.8 10.4-10.6zm0 490.7c0-5.8-4.7-10.6-10.5-10.6H59.3c-5.8 0-10.5 4.8-10.5 10.6S53.6 512 59.3 512h188.5c5.8 0 10.5-4.8 10.5-10.7z" />
    </svg>
  );
}

export function VideoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 640 512"
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <path d="M576 182.9v256c0 20.2-16.3 36.6-36.6 36.6H100.5c-20.2 0-36.6-16.3-36.6-36.6v-256H576zm0-36.6H464.7l99.8-99.8c7.1 6.6 11.5 16.1 11.5 26.6v73.2zm-285 0L400.7 36.6h122.1L413.1 146.3H291zM239.2 146.3H117.3L227 36.6h122.1L239.4 146.3h-.2zM100.5 36.6h74.7L65.5 146.3h-1.6V73.2c0-20.3 16.4-36.6 36.6-36.6zm512 109.7V73.2C612.6 32.8 579.8 0 539.4 0H100.5C60.2 0 27.4 32.8 27.4 73.2v73.1 18.3 18.3v256c0 40.3 32.8 73.1 73.1 73.1h438.9c40.3 0 73.1-32.8 73.1-73.1v-256-18.3-18.3zM274.4 221.9c-5.6-3.3-12.7-3.3-18.4-.1s-9.3 9.3-9.3 15.9v182.9c0 6.5 3.5 12.6 9.3 15.9s12.7 3.2 18.4-.1l155.4-91.4c5.6-3.3 9-9.3 9-15.8s-3.4-12.5-9-15.8L274.4 221.9zM384.4 329.1l-101 59.4V269.6l101 59.5z" />
    </svg>
  );
}

export function ClapperboardIcon({ size = 16 }: { size?: number }) {
  return <VideoIcon size={size} />;
}

export function HeartIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function CommentIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function CoinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle}>
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5a2.5 2.5 0 0 0-5 0c0 2 5 2.5 5 5a2.5 2.5 0 0 1-5 0" />
      <line x1="12" y1="6" x2="12" y2="7" />
      <line x1="12" y1="17" x2="12" y2="18" />
    </svg>
  );
}

export function BookmarkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function MoreVerticalIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#717996" stroke="none">
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

export function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.46494 1.066C8.63828 1.01222 9.01228 1 12 1C14.9883 1 15.3617 1.01283 16.5344 1.066C17.7059 1.11917 18.5059 1.30556 19.2056 1.5775C19.9395 1.85381 20.6043 2.28674 21.1538 2.84617C21.7133 3.3956 22.1463 4.06046 22.4225 4.79439C22.6944 5.49411 22.8802 6.29406 22.934 7.46494C22.9878 8.63828 23 9.01228 23 12C23 14.9877 22.9872 15.3617 22.934 16.5351C22.8808 17.7059 22.6944 18.5059 22.4225 19.2056C22.1414 19.9286 21.7649 20.5427 21.1538 21.1538C20.6044 21.7133 19.9395 22.1463 19.2056 22.4225C18.5059 22.6944 17.7059 22.8802 16.5351 22.934C15.3617 22.9878 14.9877 23 12 23C9.01228 23 8.63828 22.9872 7.46494 22.934C6.29406 22.8808 5.49411 22.6944 4.79439 22.4225C4.07144 22.1414 3.45728 21.7649 2.84617 21.1538C2.28664 20.6044 1.85368 19.9395 1.5775 19.2056C1.30556 18.5059 1.11978 17.7059 1.066 16.5351C1.01222 15.3617 1 14.9883 1 12C1 9.01167 1.01283 8.63828 1.066 7.46556C1.11917 6.29406 1.30556 5.49411 1.5775 4.79439C1.85381 4.06051 2.28674 3.39568 2.84617 2.84617C3.39559 2.28664 4.06045 1.85368 4.79439 1.5775C5.49411 1.30556 6.29406 1.11978 7.46494 1.066Z" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

export function GlobeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}