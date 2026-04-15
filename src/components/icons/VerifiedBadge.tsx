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
      {/* Scalloped/flower outline */}
      <path
        d="M12 1c.6 0 1.1.3 1.4.7l.8 1.2c.3.4.8.7 1.3.7h1.4c.8 0 1.5.5 1.7 1.3l.3 1.4c.1.5.5.9 1 1.1l1.3.5c.7.3 1.1 1 1 1.8l-.2 1.4c-.1.5.1 1 .4 1.4l.9 1.1c.5.6.5 1.4 0 2l-.9 1.1c-.3.4-.5.9-.4 1.4l.2 1.4c.1.8-.3 1.5-1 1.8l-1.3.5c-.5.2-.9.6-1 1.1l-.3 1.4c-.2.8-.9 1.3-1.7 1.3h-1.4c-.5 0-1 .3-1.3.7l-.8 1.2c-.3.4-.8.7-1.4.7s-1.1-.3-1.4-.7l-.8-1.2c-.3-.4-.8-.7-1.3-.7H7.1c-.8 0-1.5-.5-1.7-1.3l-.3-1.4c-.1-.5-.5-.9-1-1.1l-1.3-.5c-.7-.3-1.1-1-1-1.8l.2-1.4c.1-.5-.1-1-.4-1.4L.7 14c-.5-.6-.5-1.4 0-2l.9-1.1c.3-.4.5-.9.4-1.4l-.2-1.4c-.1-.8.3-1.5 1-1.8l1.3-.5c.5-.2.9-.6 1-1.1l.3-1.4c.2-.8.9-1.3 1.7-1.3h1.4c.5 0 1-.3 1.3-.7l.8-1.2C10.9 1.3 11.4 1 12 1z"
        fill="white"
        stroke="#ef9f84"
        strokeWidth="1.2"
      />
      {/* Check mark */}
      <path
        d="M8.5 12.5l2.5 2.5 5-5"
        stroke="#ef9f84"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
