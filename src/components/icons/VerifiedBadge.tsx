interface VerifiedBadgeProps {
  className?: string;
  size?: number;
}

export default function VerifiedBadge({ className = "", size = 20 }: VerifiedBadgeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="badge-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e39a55" />
          <stop offset="50%" stopColor="#ef9f84" />
          <stop offset="100%" stopColor="#f1ada1" />
        </linearGradient>
      </defs>
      {/* Scalloped/wavy outline */}
      <path
        d="M12 1.5c.55 0 1.05.28 1.35.7l.7 1.05c.3.45.8.7 1.35.7h1.25c.7 0 1.3.4 1.55 1.05l.4 1.1c.15.5.55.85 1.05 1l1.1.4c.65.25 1.05.85 1.05 1.55v1.25c0 .55.25 1.05.7 1.35l1.05.7c.42.3.7.8.7 1.35s-.28 1.05-.7 1.35l-1.05.7c-.45.3-.7.8-.7 1.35v1.25c0 .7-.4 1.3-1.05 1.55l-1.1.4c-.5.15-.9.55-1.05 1.05l-.4 1.1c-.25.65-.85 1.05-1.55 1.05h-1.25c-.55 0-1.05.25-1.35.7l-.7 1.05c-.3.42-.8.7-1.35.7s-1.05-.28-1.35-.7l-.7-1.05c-.3-.45-.8-.7-1.35-.7H7.35c-.7 0-1.3-.4-1.55-1.05l-.4-1.1c-.15-.5-.55-.9-1.05-1.05l-1.1-.4C2.6 18.55 2.2 17.95 2.2 17.25V16c0-.55-.25-1.05-.7-1.35L.45 13.95c-.42-.3-.7-.8-.7-1.35s.28-1.05.7-1.35l1.05-.7c.45-.3.7-.8.7-1.35V7.95c0-.7.4-1.3 1.05-1.55l1.1-.4c.5-.15.9-.55 1.05-1.05l.4-1.1C6.05 3.2 6.65 2.8 7.35 2.8h1.25c.55 0 1.05-.25 1.35-.7l.7-1.05c.3-.42.8-.65 1.35-.55z"
        fill="white"
        stroke="url(#badge-grad)"
        strokeWidth="1.5"
      />
      {/* Check mark */}
      <path
        d="M8.5 12.5l2.5 2.5 5-5"
        stroke="url(#badge-grad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
