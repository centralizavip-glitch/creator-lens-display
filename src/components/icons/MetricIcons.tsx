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

/* Feed/Posts icon — phone/device style matching the reference */
export function PostIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle} strokeWidth={1.8}>
      {/* Top bar */}
      <line x1="8" y1="3" x2="16" y2="3" />
      {/* Device body */}
      <rect x="6" y="5.5" width="12" height="13" rx="2.5" />
      {/* Bottom bar */}
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  );
}

/* Video/Media icon — clapperboard matching the reference for both top metrics and tabs */
export function VideoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle} strokeWidth={1.6}>
      {/* Board body */}
      <rect x="2" y="7" width="20" height="14" rx="2" />
      {/* Clapper top */}
      <path d="M2 7l3.5-4h13L22 7" />
      {/* Clapper lines */}
      <line x1="8" y1="3.5" x2="10.5" y2="7" />
      <line x1="14" y1="3.5" x2="16.5" y2="7" />
    </svg>
  );
}

/* Reuse the same icon for the Midias tab */
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
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle} strokeWidth={1.8}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="#717996" stroke="none" />
    </svg>
  );
}

export function GlobeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle} strokeWidth={1.6}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function LockSmallIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle} strokeWidth={2}>
      <rect x="5" y="11" width="14" height="10" rx="2.5" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
