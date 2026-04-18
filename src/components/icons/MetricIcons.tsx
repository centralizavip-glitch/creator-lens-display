const iconStyle = {
  stroke: "#717996",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export function ImageIcon({ size = 18 }: { size?: number }) {
  const iconStyle = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
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

export function VideoIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M576 182.9l0 256c0 20.2-16.3 36.6-36.6 36.6l-438.9 0c-20.2 0-36.6-16.3-36.6-36.6l0-256 512 0zm0-36.6l-111.3 0 99.8-99.8c7.1 6.6 11.5 16.1 11.5 26.6l0 73.1zm-285 0l109.7-109.7 122.1 0-109.7 109.7-122.1 0zm-51.8 0l-121.9 0 109.7-109.7 122.1 0-109.7 109.7-.1 0zM100.5 36.6l74.7 0-109.7 109.7-1.6 0 0-73.1c0-20.2 16.3-36.6 36.6-36.6zm512 109.7l0-73.1C612.6 32.8 579.8 0 539.4 0L100.5 0C60.2 0 27.4 32.8 27.4 73.1l0 73.1 0 18.3 0 18.3 0 256c0 40.3 32.8 73.1 73.1 73.1l438.9 0c40.3 0 73.1-32.8 73.1-73.1l0-256 0-18.3 0-18.3zM274.4 221.9c-5.6-3.3-12.7-3.3-18.4-.1s-9.3 9.3-9.3 15.9l0 182.9c0 6.5 3.5 12.6 9.3 15.9s12.7 3.2 18.4-.1l155.4-91.4c5.6-3.3 9-9.3 9-15.8s-3.4-12.5-9-15.8L274.4 221.9zM384.4 329.1l-101 59.4 0-118.9 101 59.4z" />
    </svg>
  );
}

export function ClapperboardIcon({ size = 16 }: { size?: number }) {
  return <VideoIcon size={size} />;
}

export function HeartIcon({ size = 18 }: { size?: number }) {
  const iconStyle = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
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
  const iconStyle = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...iconStyle}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zM18.097 20.644h2.039L6.486 3.24H4.298L18.097 20.644z" />
    </svg>
  );
}

export function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <g>
        <path d="M5.299,144.645l69.126,25.8l26.756,86.047c1.712,5.511,8.451,7.548,12.924,3.891l38.532-31.412c4.039-3.291,9.792-3.455,14.013-0.391l69.498,50.457c4.785,3.478,11.564,0.856,12.764-4.926L299.823,29.22c1.31-6.316-4.896-11.585-10.91-9.259L5.218,129.402C-1.783,132.102-1.722,142.014,5.299,144.645z M96.869,156.711l135.098-83.207c2.428-1.491,4.926,1.792,2.841,3.726L123.313,180.87c-3.919,3.648-6.447,8.53-7.163,13.829l-3.798,28.146c-0.503,3.758-5.782,4.131-6.819,0.494l-14.607-51.325C89.253,166.16,91.691,159.907,96.869,156.711z" />
      </g>
    </svg>
  );
}

export function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z" />
    </svg>
  );
}

export function GlobeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.645,2.428a8.1,8.1,0,0,0-1.61-.3,9.332,9.332,0,0,0-3.6.28l-.07.02a9.928,9.928,0,0,0,.01,19.15,9.091,9.091,0,0,0,2.36.34,1.274,1.274,0,0,0,.27.02,9.65,9.65,0,0,0,2.63-.36,9.931,9.931,0,0,0,.01-19.15Zm-.27.96a8.943,8.943,0,0,1,5.84,5.11h-4.26a13.778,13.778,0,0,0-2.74-5.35A8.254,8.254,0,0,1,14.375,3.388Zm-2.37-.09a12.78,12.78,0,0,1,2.91,5.2H9.075A12.545,12.545,0,0,1,12.005,3.3Zm3.16,6.2a13.193,13.193,0,0,1,0,5.01H8.845a12.185,12.185,0,0,1-.25-2.5,12.353,12.353,0,0,1,.25-2.51Zm-5.6-6.09.07-.02a9.152,9.152,0,0,1,1.16-.23A13.618,13.618,0,0,0,8.045,8.5H3.8A9,9,0,0,1,9.565,3.408Zm-6.5,8.6a8.71,8.71,0,0,1,.37-2.51h4.39a13.95,13.95,0,0,0-.23,2.51,13.757,13.757,0,0,0,.23,2.5H3.435A8.591,8.591,0,0,1,3.065,12.008Zm6.57,8.61a8.9,8.9,0,0,1-5.84-5.11h4.24a13.632,13.632,0,0,0,2.77,5.35A8.1,8.1,0,0,1,9.635,20.618Zm-.56-5.11h5.84a12.638,12.638,0,0,1-2.91,5.21A12.872,12.872,0,0,1,9.075,15.508Zm5.3,5.11a11.551,11.551,0,0,1-1.17.24,13.8,13.8,0,0,0,2.75-5.35h4.26A8.924,8.924,0,0,1,14.375,20.618Zm1.8-6.11a13.611,13.611,0,0,0,0-5.01h4.39a8.379,8.379,0,0,1,.37,2.51,8.687,8.687,0,0,1-.36,2.5Z" />
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
    <svg viewBox="0 0 448 512" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M224 32c53 0 96 43 96 96v64H128V128c0-53 43-96 96-96zM96 128v64H80c-44.2 0-80 35.8-80 80V432c0 44.2 35.8 80 80 80H368c44.2 0 80-35.8 80-80V272c0-44.2-35.8-80-80-80H352V128C352 57.3 294.7 0 224 0S96 57.3 96 128zM80 224H368c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm160 88c0-8.8-7.2-16-16-16s-16 7.2-16 16v80c0 8.8 7.2 16 16 16s16-7.2 16-16V312z" />
    </svg>
  );
}