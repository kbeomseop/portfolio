"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Mountain, Camera, Code,
  Wrench, Keyboard, Zap, Settings, Volume2, MousePointer,
  type LucideIcon,
} from "lucide-react";

const CELL = 104;
const GAP = 78;
const STEP = CELL + GAP;       // 182
const GRID = 2 * STEP + CELL;  // 468
const R = 26;
const PIPE = 36;
const CIRCLE = 92;
const OFFSET = (CELL - CIRCLE) / 2; // 6

const cx = (col: number) => col * STEP + CELL / 2;
const cy = (row: number) => row * STEP + CELL / 2;

// Snake traversal order: row0 L→R, col2 down, row1 R→L, col0 down, row2 L→R
const SNAKE = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  { row: 1, col: 2 },
  { row: 1, col: 1 },
  { row: 1, col: 0 },
  { row: 2, col: 0 },
  { row: 2, col: 1 },
  { row: 2, col: 2 },
] as const;

const trackPath = [
  `M ${cx(0)} ${cy(0) - CELL / 2 - PIPE}`,
  `L ${cx(0)} ${cy(0) - R}`,
  `Q ${cx(0)} ${cy(0)} ${cx(0) + R} ${cy(0)}`,
  `L ${cx(2) - R} ${cy(0)}`,
  `Q ${cx(2)} ${cy(0)} ${cx(2)} ${cy(0) + R}`,
  `L ${cx(2)} ${cy(1) - R}`,
  `Q ${cx(2)} ${cy(1)} ${cx(2) - R} ${cy(1)}`,
  `L ${cx(0) + R} ${cy(1)}`,
  `Q ${cx(0)} ${cy(1)} ${cx(0)} ${cy(1) + R}`,
  `L ${cx(0)} ${cy(2) - R}`,
  `Q ${cx(0)} ${cy(2)} ${cx(0) + R} ${cy(2)}`,
  `L ${cx(2) - R} ${cy(2)}`,
  `Q ${cx(2)} ${cy(2)} ${cx(2)} ${cy(2) + R}`,
  `L ${cx(2)} ${cy(2) + CELL / 2 + PIPE}`,
].join(" ");

interface CellDef {
  type: "project" | "toy";
  icon: LucideIcon;
  href?: string;
  dataToy?: string;
}

// Ordered by SNAKE path so cells[i] starts at SNAKE[i]
const cells: CellDef[] = [
  { type: "project", icon: Mountain,     href: "/projects/coaching" },    // SNAKE[0] (0,0)
  { type: "toy",     icon: Wrench,       dataToy: "wrench" },             // SNAKE[1] (0,1)
  { type: "project", icon: Camera,       href: "/projects/content" },     // SNAKE[2] (0,2)
  { type: "toy",     icon: Settings,     dataToy: "settings" },           // SNAKE[3] (1,2)
  { type: "toy",     icon: Zap,          dataToy: "zap" },                // SNAKE[4] (1,1)
  { type: "toy",     icon: Keyboard,     dataToy: "keyboard" },           // SNAKE[5] (1,0)
  { type: "project", icon: Code,         href: "/projects/vibe-coder" },  // SNAKE[6] (2,0)
  { type: "toy",     icon: Volume2,      dataToy: "volume2" },            // SNAKE[7] (2,1)
  { type: "toy",     icon: MousePointer, dataToy: "mousepointer" },       // SNAKE[8] (2,2)
];

const ENTRY_STAGGER = 150;
const ENTRY_DURATION = 400;
const EXIT_DURATION = 500;   // must match icon-exit-fall duration in globals.css
const REENTRY_DURATION = 400; // must match icon-reenter duration in globals.css

type ExitState = "idle" | "exiting" | "reentering";

interface IconState {
  posIdx: number;
  prevPosIdx: number; // previous tick's posIdx — detects 8→0 wrap-around
}

function IconCircle({ icon: Icon, isProject }: { icon: LucideIcon; isProject: boolean }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: CIRCLE,
        height: CIRCLE,
        borderRadius: "50%",
        background: "#ffffff",
        border: "1px solid #eee",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      <Icon size={34} color={isProject ? "#D85A30" : "#ccc"} strokeWidth={1.5} />
    </div>
  );
}

export default function HeroGrid() {
  const [phase, setPhase] = useState<"entering" | "circulating">("entering");
  const [visibleCount, setVisibleCount] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [states, setStates] = useState<IconState[]>(
    () => cells.map((_, i) => ({ posIdx: i, prevPosIdx: i }))
  );
  const [exitStates, setExitStates] = useState<ExitState[]>(() => cells.map(() => "idle"));
  const exitTimersRef = useRef<(ReturnType<typeof setTimeout> | null)[]>(cells.map(() => null));

  // Hover freeze: capture mid-transition computed transforms so icons stop in place
  const outerRefs = useRef<(HTMLElement | null)[]>(cells.map(() => null));
  const frozenTransforms = useRef<(string | null)[]>(cells.map(() => null));

  // Entry animation: reveal icons one by one, then switch to circulation
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < cells.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * ENTRY_STAGGER));
    }
    const total = (cells.length - 1) * ENTRY_STAGGER + ENTRY_DURATION;
    timers.push(setTimeout(() => setPhase("circulating"), total));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Circulation: every icon advances one slot per tick; pauses while hovering
  useEffect(() => {
    if (phase !== "circulating" || hoveredIndex !== null) return;
    const id = setInterval(() => {
      setStates((prev) =>
        prev.map(({ posIdx }) => ({
          prevPosIdx: posIdx,
          posIdx: (posIdx + 1) % 9,
        }))
      );
    }, 1500);
    return () => clearInterval(id);
  }, [phase, hoveredIndex]);

  // Detect 8→0 wrap-around and play exit → re-entry animation on the inner element
  useEffect(() => {
    if (phase !== "circulating") return;
    states.forEach(({ posIdx, prevPosIdx }, i) => {
      if (posIdx === 0 && prevPosIdx === 8 && exitTimersRef.current[i] === null) {
        setExitStates((prev) => { const n = [...prev]; n[i] = "exiting"; return n; });
        exitTimersRef.current[i] = setTimeout(() => {
          setExitStates((prev) => { const n = [...prev]; n[i] = "reentering"; return n; });
          exitTimersRef.current[i] = setTimeout(() => {
            setExitStates((prev) => { const n = [...prev]; n[i] = "idle"; return n; });
            exitTimersRef.current[i] = null;
          }, REENTRY_DURATION);
        }, EXIT_DURATION);
      }
    });
  }, [states, phase]);

  // Cleanup timers on unmount
  useEffect(() => {
    const timers = exitTimersRef.current;
    return () => timers.forEach((t) => t && clearTimeout(t));
  }, []);

  return (
    <div className="relative" style={{ width: GRID, height: GRID }}>
      {/* Pipe track */}
      <svg
        width={GRID}
        height={GRID + PIPE * 2}
        viewBox={`0 ${-PIPE} ${GRID} ${GRID + PIPE * 2}`}
        className="absolute left-0 pointer-events-none"
        style={{ top: -PIPE }}
      >
        <path
          d={trackPath}
          fill="none"
          stroke="#ddd"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>

      {/* Icons — outer div: grid position, inner div: visual effects */}
      {cells.map((cell, i) => {
        const { posIdx } = states[i];
        const isHoverActive = hoveredIndex !== null;
        const isHovered = hoveredIndex === i;
        const exitState = exitStates[i];
        const frozen = frozenTransforms.current[i];

        // Outer transform + transition — four cases:
        // 1. hover freeze: use captured mid-transition value, no transform transition
        // 2. exiting: keep at SNAKE[8] (fall plays at slot 9, not slot 1)
        // 3. reentering: jump instantly to SNAKE[posIdx] (posIdx===0) without transition
        // 4. normal: smooth 1.5s transition to SNAKE[posIdx]
        let outerTransform: string;
        let outerTransition: string;
        if (frozen) {
          outerTransform = frozen;
          outerTransition = "filter 0.2s, opacity 0.2s";
        } else if (exitState === "exiting") {
          const { row: r8, col: c8 } = SNAKE[8];
          outerTransform = `translate(${c8 * STEP}px, ${r8 * STEP}px)`;
          outerTransition = "transform 1.5s ease-in-out, filter 0.2s, opacity 0.2s";
        } else if (exitState === "reentering") {
          const { row, col } = SNAKE[posIdx];
          outerTransform = `translate(${col * STEP}px, ${row * STEP}px)`;
          outerTransition = "filter 0.2s, opacity 0.2s"; // no transform transition → instant jump to slot 1
        } else {
          const { row, col } = SNAKE[posIdx];
          outerTransform = `translate(${col * STEP}px, ${row * STEP}px)`;
          outerTransition = phase === "entering"
            ? "filter 0.2s, opacity 0.2s"
            : "transform 1.5s ease-in-out, filter 0.2s, opacity 0.2s";
        }

        const outerStyle: React.CSSProperties = {
          position: "absolute",
          left: OFFSET,
          top: OFFSET,
          transform: outerTransform,
          transition: outerTransition,
          willChange: "transform",
          // Dim non-hovered idle icons while any icon is hovered
          ...(isHoverActive && !isHovered && exitState === "idle" && {
            filter: "blur(3px)",
            opacity: 0.5,
          }),
          cursor: cell.type === "project" ? "pointer" : "default",
        };

        // Inner: entry fade-in / exit fall-out / re-entry / hover scale
        let innerStyle: React.CSSProperties = {};
        let innerClass = "";

        if (phase === "entering") {
          const shown = i < visibleCount;
          innerStyle = {
            opacity: shown ? 1 : 0,
            transform: `translateY(${shown ? 0 : -60}px)`,
            transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
          };
        } else {
          if (exitState === "exiting") {
            innerClass = "icon-exit";
            innerStyle = { animationPlayState: isHoverActive ? "paused" : "running" };
          } else if (exitState === "reentering") {
            innerClass = "icon-reenter";
            innerStyle = { animationPlayState: isHoverActive ? "paused" : "running" };
          } else {
            innerStyle = {
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.2s ease-out",
            };
          }
        }

        const hoverHandlers =
          phase === "circulating"
            ? {
                onMouseEnter: () => {
                  outerRefs.current.forEach((el, idx) => {
                    if (el) frozenTransforms.current[idx] = getComputedStyle(el).transform;
                  });
                  setHoveredIndex(i);
                },
                onMouseLeave: () => {
                  frozenTransforms.current = cells.map(() => null);
                  setHoveredIndex(null);
                },
              }
            : {};

        const inner = (
          // key forces remount on exitState change so CSS animation restarts cleanly
          <div key={`${i}-${exitStates[i]}`} style={innerStyle} className={innerClass || undefined}>
            <IconCircle icon={cell.icon} isProject={cell.type === "project"} />
          </div>
        );

        if (cell.type === "project" && cell.href) {
          return (
            <Link key={i} href={cell.href} style={outerStyle} {...hoverHandlers}
              ref={(el) => { outerRefs.current[i] = el; }}>
              {inner}
            </Link>
          );
        }

        return (
          <div key={i} data-toy={cell.dataToy} style={outerStyle} {...hoverHandlers}
            ref={(el) => { outerRefs.current[i] = el; }}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
