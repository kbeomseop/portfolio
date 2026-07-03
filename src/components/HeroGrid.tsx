"use client";

import Link from "next/link";
import {
  Mountain, Camera, Code,
  Wrench, Keyboard, Zap, Settings, Volume2, MousePointer,
  type LucideIcon,
} from "lucide-react";

const CELL = 80;
const GAP = 60;
const STEP = CELL + GAP;       // 140
const GRID = 2 * STEP + CELL;  // 360
const R = 20;                  // pipe bend radius
const PIPE = 30;               // entry/exit pipe length
const CIRCLE = 70;             // icon circle diameter
const OFFSET = (CELL - CIRCLE) / 2; // 5px — centers circle in cell

// Cell center helpers
const cx = (col: number) => col * STEP + CELL / 2;
const cy = (row: number) => row * STEP + CELL / 2;

// Snake path: row0 L→R, row1 R→L, row2 L→R
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
  row: number;
  col: number;
  type: "project" | "toy";
  icon: LucideIcon;
  href?: string;
  dataToy?: string;
}

const cells: CellDef[] = [
  { row: 0, col: 0, type: "project", icon: Mountain,    href: "/projects/coaching" },
  { row: 0, col: 1, type: "toy",     icon: Wrench,      dataToy: "wrench" },
  { row: 0, col: 2, type: "project", icon: Camera,      href: "/projects/content" },
  { row: 1, col: 0, type: "toy",     icon: Keyboard,    dataToy: "keyboard" },
  { row: 1, col: 1, type: "toy",     icon: Zap,         dataToy: "zap" },
  { row: 1, col: 2, type: "toy",     icon: Settings,    dataToy: "settings" },
  { row: 2, col: 0, type: "project", icon: Code,        href: "/projects/vibe-coder" },
  { row: 2, col: 1, type: "toy",     icon: Volume2,     dataToy: "volume2" },
  { row: 2, col: 2, type: "toy",     icon: MousePointer, dataToy: "mousepointer" },
];

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
      <Icon size={26} color={isProject ? "#D85A30" : "#ccc"} strokeWidth={1.5} />
    </div>
  );
}

export default function HeroGrid() {
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

      {/* Icon cells */}
      {cells.map((cell) => {
        const left = cell.col * STEP + OFFSET;
        const top  = cell.row * STEP + OFFSET;
        const key  = `${cell.row}-${cell.col}`;

        if (cell.type === "project" && cell.href) {
          return (
            <Link
              key={key}
              href={cell.href}
              data-type="project"
              data-target={cell.href}
              className="absolute hover:opacity-75 transition-opacity"
              style={{ left, top }}
            >
              <IconCircle icon={cell.icon} isProject />
            </Link>
          );
        }

        return (
          <div
            key={key}
            data-type="toy"
            data-toy={cell.dataToy}
            className="absolute"
            style={{ left, top }}
          >
            <IconCircle icon={cell.icon} isProject={false} />
          </div>
        );
      })}
    </div>
  );
}
