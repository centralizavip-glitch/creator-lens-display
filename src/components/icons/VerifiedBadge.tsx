interface VerifiedBadgeProps {
  className?: string;
  size?: number;
  offsetX?: number;
  offsetY?: number;
}

export default function VerifiedBadge({
  className = "",
  size = 10,
  offsetX = -12,
  offsetY = +0,
}: VerifiedBadgeProps) {
  return (
    <img
      src="/assets/g1r7w5.png"
      alt="g1r7w5"
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: "contain",
        marginLeft: "6px",
        position: "relative",
        top: `${offsetY}px`,
        left: `${offsetX}px`,
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
      }}
    />
  );
}