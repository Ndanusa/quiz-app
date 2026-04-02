import { useState, useRef, useEffect } from "react";

const MIN_WIDTH = 56;
const MAX_WIDTH = 280;
const COLLAPSE_AT = 90;

export default function SideNav({ children }) {
  const [width, setWidth] = useState(220);
  const sidebarRef = useRef(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(0);

  const isCollapsed = width <= COLLAPSE_AT;

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      const dx = e.clientX - startX.current;
      const newW = Math.min(
        MAX_WIDTH,
        Math.max(MIN_WIDTH, startW.current + dx),
      );
      setWidth(newW);
    };
    const onMouseUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      setWidth((w) => (w <= COLLAPSE_AT && w > MIN_WIDTH ? MIN_WIDTH : w));
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const onMouseDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startW.current = sidebarRef.current?.offsetWidth ?? width;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    e.preventDefault();
  };

  return (
    <aside ref={sidebarRef} style={{ ...styles.sidebar, width }}>
      <nav style={styles.nav}>
        {typeof children === "function" ? children({ isCollapsed }) : children}
      </nav>
      <div onMouseDown={onMouseDown} style={styles.handle}>
        <span style={styles.bar} />
      </div>
    </aside>
  );
}

// ─── NavLink ──────────────────────────────────────────────────────────────────
export function NavLink({ icon, label, href, onClick, active, isCollapsed }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href ?? "#"}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.link,
        background: active
          ? "rgba(108,92,231,0.09)"
          : hovered
            ? "rgba(0,0,0,0.04)"
            : "transparent",
        position: "relative",
      }}
    >
      <span
        style={{
          ...styles.icon,
          color: active ? "#6C5CE7" : hovered ? "#333" : "#888",
        }}
      >
        {icon}
      </span>
      <span
        style={{
          ...styles.label,
          opacity: isCollapsed ? 0 : 1,
          color: active ? "#4834d4" : "#111",
          fontWeight: active ? 500 : 400,
        }}
      >
        {label}
      </span>
      {isCollapsed && (
        <span style={styles.tooltip}>
          {label}
          <span style={styles.tooltipArrow} />
        </span>
      )}
    </a>
  );
}

// ─── NavDivider ───────────────────────────────────────────────────────────────
export function NavDivider({ label, isCollapsed }) {
  if (isCollapsed) return <div style={{ height: 8 }} />;
  return (
    <div style={styles.divider}>
      {label && <span style={styles.dividerLabel}>{label}</span>}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  sidebar: {
    minWidth: MIN_WIDTH,
    maxWidth: MAX_WIDTH,
    height: "100vh",
    background: "#fff",
    borderRight: "0.5px solid #e8e8e8",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    flexShrink: 0,
    overflow: "hidden",
  },
  nav: {
    flex: 1,
    padding: "12px 8px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "9px 10px",
    borderRadius: 10,
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    transition: "background 0.12s",
    textDecoration: "none",
  },
  icon: {
    width: 34,
    height: 34,
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.12s",
  },
  label: {
    fontSize: 13.5,
    flex: 1,
    transition: "opacity 0.12s",
    overflow: "hidden",
  },
  tooltip: {
    position: "absolute",
    left: "calc(100% + 10px)",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#111",
    color: "#fff",
    fontSize: 12,
    padding: "5px 10px",
    borderRadius: 6,
    whiteSpace: "nowrap",
    pointerEvents: "none",
    zIndex: 100,
  },
  tooltipArrow: {
    position: "absolute",
    right: "100%",
    top: "50%",
    transform: "translateY(-50%)",
    border: "5px solid transparent",
    borderRightColor: "#111",
  },
  divider: {
    padding: "8px 8px 4px",
    borderTop: "0.5px solid #f0f0f0",
    marginTop: 4,
  },
  dividerLabel: {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#bbb",
  },
  handle: {
    position: "absolute",
    right: -4,
    top: 0,
    width: 8,
    height: "100%",
    cursor: "col-resize",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bar: {
    display: "block",
    width: 2,
    height: 40,
    borderRadius: 2,
    background: "#e0e0e0",
  },
};
