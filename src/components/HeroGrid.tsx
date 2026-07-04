"use client";

import { useState, useEffect } from "react";
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

const ENTRY_STAGGER = 150; // ms between each icon appearing
const ENTRY_DURATION = 400; // ms for the fade+slide animation

interface IconState {
  posIdx: number;
  instant: boolean; // suppress transition on wrap-around
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
  const [states, setStates] = useState<IconState[]>(
    () => cells.map((_, i) => ({ posIdx: i, instant: false }))
  );

  // Entry animation: reveal icons one by one, then switch to circulation
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < cells.length; i++) {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * ENTRY_STAGGER));
    }

    // Start circulation after the last icon's animation completes
    const total = (cells.length - 1) * ENTRY_STAGGER + ENTRY_DURATION;
    timers.push(setTimeout(() => setPhase("circulating"), total));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Circulation loop — only active after entry is done
  useEffect(() => {
    if (phase !== "circulating") return;
    const id = setInterval(() => {
      setStates((prev) =>
        prev.map(({ posIdx }) => ({
          posIdx: (posIdx + 1) % 9,
          instant: posIdx === 8,
        }))
      );
    }, 1500);
    return () => clearInterval(id);
  }, [phase]);

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

      {/* Icons */}
      {cells.map((cell, i) => {
        const { posIdx, instant } = states[i];
        const { row, col } = SNAKE[posIdx];

        let opacity: number;
        let ty: number;
        let transition: string;

        if (phase === "entering") {
          const shown = i < visibleCount;
          opacity = shown ? 1 : 0;
          ty = row * STEP + (shown ? 0 : -20);
          transition = "opacity 0.4s ease, transform 0.4s ease";
        } else {
          opacity = 1;
          ty = row * STEP;
          transition = instant ? "none" : "transform 1.5s ease-in-out";
        }

        const baseStyle: React.CSSProperties = {
          position: "absolute",
          left: OFFSET,
          top: OFFSET,
          opacity,
          transform: `translate(${col * STEP}px, ${ty}px)`,
          transition,
          willChange: "transform",
        };

        if (cell.type === "project" && cell.href) {
          return (
            <Link key={i} href={cell.href} className="hover:opacity-75" style={baseStyle}>
              <IconCircle icon={cell.icon} isProject />
            </Link>
          );
        }

        return (
          <div key={i} data-toy={cell.dataToy} style={baseStyle}>
            <IconCircle icon={cell.icon} isProject={false} />
          </div>
        );
      })}
    </div>
  );
}
