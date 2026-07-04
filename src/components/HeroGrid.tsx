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
const EXIT_DURATION = 500;
const REENTRY_DURATION = 400;

interface ExitAnim {
  active: boolean;
  phase: "fall" | "rise";
  progress: number; // 0..1
  startTime: number; // performance.now()
}

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
  // Triggers re-render each rAF frame while animations are active
  const [, setAnimTick] = useState(0);

  const exitAnimRef = useRef<ExitAnim[]>(
    cells.map(() => ({ active: false, phase: "fall", progress: 0, startTime: 0 }))
  );
  const rafRef = useRef<number | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);
  const startLoopRef = useRef<() => void>(() => {});

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

  // rAF loop: advances progress each frame while any exit animation is active
  useEffect(() => {
    const tick = (now: number) => {
      exitAnimRef.current.forEach((anim) => {
        if (!anim.active || hoveredIndexRef.current !== null) return;

        const duration = anim.phase === "fall" ? EXIT_DURATION : REENTRY_DURATION;
        anim.progress = Math.min((now - anim.startTime) / duration, 1);

        if (anim.progress >= 1) {
          if (anim.phase === "fall") {
            anim.phase = "rise";
            anim.progress = 0;
            anim.startTime = now;
          } else {
            anim.active = false;
          }
        }
      });

      setAnimTick((t) => t + 1);

      if (exitAnimRef.current.some((a) => a.active)) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };

    startLoopRef.current = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Detect 8→0 wrap-around and start exit/reentry animation
  useEffect(() => {
    if (phase !== "circulating") return;
    states.forEach(({ posIdx, prevPosIdx }, i) => {
      if (posIdx === 0 && prevPosIdx === 8 && !exitAnimRef.current[i].active) {
        exitAnimRef.current[i] = {
          active: true,
          phase: "fall",
          progress: 0,
          startTime: performance.now(),
        };
        startLoopRef.current();
      }
    });
  }, [states, phase]);

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
        const anim = exitAnimRef.current[i];
        const frozen = frozenTransforms.current[i];

        // Outer transform + transition — four cases:
        // 1. hover freeze: use captured mid-transition value, no transform transition
        // 2. fall phase: keep at SNAKE[8] (fall plays at slot 9, not slot 1)
        // 3. rise phase: jump instantly to SNAKE[posIdx] (posIdx===0) without transition
        // 4. normal: smooth 1.5s transition to SNAKE[posIdx]
        let outerTransform: string;
        let outerTransition: string;
        if (frozen) {
          outerTransform = frozen;
          outerTransition = "filter 0.2s, opacity 0.2s";
        } else if (anim.active && anim.phase === "fall") {
          const { row, col } = SNAKE[8];
          outerTransform = `translate(${col * STEP}px, ${row * STEP}px)`;
          outerTransition = "transform 1.5s ease-in-out, filter 0.2s, opacity 0.2s";
        } else if (anim.active && anim.phase === "rise") {
          const { row, col } = SNAKE[posIdx];
          outerTransform = `translate(${col * STEP}px, ${row * STEP}px)`;
          outerTransition = "filter 0.2s, opacity 0.2s"; // instant jump to slot 1
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
          // Dim non-hovered non-animating icons while any icon is hovered
          ...(isHoverActive && !isHovered && {
            filter: "blur(3px)",
            opacity: 0.5,
          }),
          cursor: cell.type === "project" ? "pointer" : "default",
        };

        // Inner: progress-based translateY/opacity for exit/reentry; else entry fade or hover scale
        let innerStyle: React.CSSProperties = {};

        if (phase === "entering") {
          const shown = i < visibleCount;
          innerStyle = {
            opacity: shown ? 1 : 0,
            transform: `translateY(${shown ? 0 : -60}px)`,
            transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
          };
        } else if (anim.active) {
          if (anim.phase === "fall") {
            const ty = anim.progress * 120;
            // Opaque until 70% then fades out — matches original keyframe
            const opacity = anim.progress < 0.7 ? 1 : 1 - (anim.progress - 0.7) / 0.3;
            innerStyle = { transform: `translateY(${ty}px)`, opacity };
          } else {
            // rise: slide up from -60px, fade in
            const ty = (1 - anim.progress) * -60;
            innerStyle = { transform: `translateY(${ty}px)`, opacity: anim.progress };
          }
        } else {
          innerStyle = {
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.2s ease-out",
          };
        }

        const hoverHandlers =
          phase === "circulating"
            ? {
                onMouseEnter: () => {
                  outerRefs.current.forEach((el, idx) => {
                    if (el) frozenTransforms.current[idx] = getComputedStyle(el).transform;
                  });
                  hoveredIndexRef.current = i;
                  setHoveredIndex(i);
                },
                onMouseLeave: () => {
                  frozenTransforms.current = cells.map(() => null);
                  // Resume each active animation from where it paused
                  const now = performance.now();
                  exitAnimRef.current.forEach((a) => {
                    if (a.active) {
                      const dur = a.phase === "fall" ? EXIT_DURATION : REENTRY_DURATION;
                      a.startTime = now - a.progress * dur;
                    }
                  });
                  hoveredIndexRef.current = null;
                  setHoveredIndex(null);
                },
              }
            : {};

        const inner = (
          <div style={innerStyle}>
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
