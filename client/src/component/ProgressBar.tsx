import { useState, useEffect } from "react";
export default function CircularProgress({
  value,
  color,
  rounded,
  size = 120,
  stroke = 10,
  backgroundColor = "#d5d5d5",
}: {
  value: number;
  color: string;
  rounded?: boolean;
  size?: number;
  stroke?: number;
  backgroundColor?: string;
}) {
  const [animated, setAnimated] = useState(0);
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (animated / 100) * circ;

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setTimeout(() => setAnimated(value), 50);
    });
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={stroke}
            strokeLinecap={rounded ? "round" : "butt"}
          />
          {/* Fill */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap={rounded ? "round" : "butt"}
            style={{
              transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 500,
          }}
        ></div>
      </div>
    </div>
  );
}
