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
// Exit/re-entry timing:
//   ARRIVAL_WAIT = 1500ms (CSS arrival transition) + 100ms buffer
//   EXIT_DURATION must match icon-exit-fall keyframe duration in globals.css
const ARRIVAL_WAIT = 1600;
const EXIT_DURATION = 500;
const REENTRY_DURATION = 400;

type ExitState = "idle" | "exiting" | "reentering";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  // Exit / re-entry state
  const [exitStates, setExitStates] = useState<ExitState[]>(() => cells.map(() => "idle"));
  const exitStartedRef = useRef<boolean[]>(cells.map(() => false));
  const inSpecialModeRef = useRef<boolean[]>(cells.map(() => false));
  const exitTimersRef = useRef<(ReturnType<typeof setTimeout> | null)[]>(cells.map(() => null));

  // Bug 1 fix: DOM refs + frozen computed transforms for hover freeze-in-place
  const outerRefs = useRef<(HTMLElement | null)[]>(cells.map(() => null));
  const frozenTransforms = useRef<(string | null)[]>(cells.map(() => null));

  // Bug 2 fix: pause flag checked in exit timer callbacks
  const isPausedRef = useRef(false);
  // Tracks which exit chain stage was interrupted by hover, so it can resume on mouse-leave
  const pendingResumeRef = useRef<("reentering" | "done" | null)[]>(cells.map(() => null));

  // Circulation loop — pauses during hover, skips icons in exit/re-entry mode
  useEffect(() => {
    if (phase !== "circulating" || hoveredIndex !== null) return;
    const id = setInterval(() => {
      setStates((prev) => {
        // If anyone is at slot 8, freeze the entire belt — prevents pile-up at slot 7
        if (prev.some((s) => s.posIdx === 8)) return prev;
        return prev.map(({ posIdx }, i) => {
          if (inSpecialModeRef.current[i]) return { posIdx, instant: false };
          return { posIdx: (posIdx + 1) % 9, instant: posIdx === 8 };
        });
      });
    }, 1500);
    return () => clearInterval(id);
  }, [phase, hoveredIndex]);

  // Exit → re-entry timer chain (starts after arrival transition completes)
  useEffect(() => {
    if (phase !== "circulating") return;
    states.forEach(({ posIdx }, i) => {
      // Also guard against hover: don't start chain while paused
      if (posIdx === 8 && !exitStartedRef.current[i] && !isPausedRef.current) {
        exitStartedRef.current[i] = true;
        inSpecialModeRef.current[i] = true;

        // Wait for 8→9 CSS transition (1500ms) + 100ms buffer, then exit
        exitTimersRef.current[i] = setTimeout(() => {
          // If hover started while waiting, cancel chain and reset so it restarts after hover ends
          if (isPausedRef.current) {
            inSpecialModeRef.current[i] = false;
            exitStartedRef.current[i] = false;
            exitTimersRef.current[i] = null;
            return;
          }
          setExitStates((prev) => { const n = [...prev]; n[i] = "exiting"; return n; });

          // After exit animation completes, teleport outer → SNAKE[0], start re-entry
          exitTimersRef.current[i] = setTimeout(() => {
            // If hovered while exit animation was playing, defer the re-entry transition
            if (isPausedRef.current) {
              pendingResumeRef.current[i] = "reentering";
              exitTimersRef.current[i] = null;
              return;
            }
            setStates((prev) => { const n = [...prev]; n[i] = { posIdx: 0, instant: true }; return n; });
            setExitStates((prev) => { const n = [...prev]; n[i] = "reentering"; return n; });

            // After re-entry animation completes, resume normal circulation
            exitTimersRef.current[i] = setTimeout(() => {
              // If still hovered when re-entry finishes, defer the idle reset
              if (isPausedRef.current) {
                pendingResumeRef.current[i] = "done";
                exitTimersRef.current[i] = null;
                return;
              }
              setExitStates((prev) => { const n = [...prev]; n[i] = "idle"; return n; });
              inSpecialModeRef.current[i] = false;
              exitStartedRef.current[i] = false;
              exitTimersRef.current[i] = null;
            }, REENTRY_DURATION);
          }, EXIT_DURATION);
        }, ARRIVAL_WAIT);
      }
    });
  }, [states, phase]);

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

      {/* Icons — outer div: positioning + hover dim, inner div: visual effects */}
      {cells.map((cell, i) => {
        const { posIdx, instant } = states[i];
        const { row, col } = SNAKE[posIdx];
        const isHoverActive = hoveredIndex !== null;
        const isHovered = hoveredIndex === i;
        const frozen = frozenTransforms.current[i];

        // Outer: circulation positioning + hover blur/opacity
        // When frozen, omit transform transition so icon stays at the captured mid-animation position
        const outerTransition =
          phase === "entering" ? "none"
          : frozen ? "filter 0.2s, opacity 0.2s"
          : instant ? "filter 0.2s, opacity 0.2s"
          : "transform 1.5s ease-in-out, filter 0.2s, opacity 0.2s";

        const outerStyle: React.CSSProperties = {
          position: "absolute",
          left: OFFSET,
          top: OFFSET,
          // Use frozen computed transform while hovered; fall back to target grid position
          transform: frozen ?? `translate(${col * STEP}px, ${row * STEP}px)`,
          transition: outerTransition,
          willChange: "transform",
          // Icons in exit/re-entry are exempt from hover dim so animation remains visible
          ...(isHoverActive && !isHovered && exitStates[i] === "idle" && {
            filter: "blur(3px)",
            opacity: 0.5,
          }),
          cursor: cell.type === "project" ? "pointer" : "default",
        };

        // Inner: entry fade-in / exit fall-out / hover scale
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
          const exitState = exitStates[i];
          if (exitState === "exiting") {
            innerClass = "icon-exit";
            // Pause CSS keyframe mid-frame on hover; resume from same frame on leave
            innerStyle = { animationPlayState: isHoverActive ? "paused" : "running" };
          } else if (exitState === "reentering") {
            innerClass = "icon-reenter";
            innerStyle = { animationPlayState: isHoverActive ? "paused" : "running" };
          } else {
            // idle: apply hover scale
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
                  isPausedRef.current = true;
                  // Capture each icon's actual rendered transform (mid-transition position)
                  outerRefs.current.forEach((el, idx) => {
                    if (el) frozenTransforms.current[idx] = getComputedStyle(el).transform;
                  });
                  setHoveredIndex(i);
                },
                onMouseLeave: () => {
                  isPausedRef.current = false;
                  // Clear frozen positions — next render uses target grid position with transition
                  frozenTransforms.current = cells.map(() => null);
                  setHoveredIndex(null);
                  // Resume any exit chain stages that were interrupted by hover
                  cells.forEach((_, idx) => {
                    const pending = pendingResumeRef.current[idx];
                    if (!pending) return;
                    pendingResumeRef.current[idx] = null;
                    if (pending === "reentering") {
                      setStates((prev) => { const n = [...prev]; n[idx] = { posIdx: 0, instant: true }; return n; });
                      setExitStates((prev) => { const n = [...prev]; n[idx] = "reentering"; return n; });
                      exitTimersRef.current[idx] = setTimeout(() => {
                        setExitStates((prev) => { const n = [...prev]; n[idx] = "idle"; return n; });
                        inSpecialModeRef.current[idx] = false;
                        exitStartedRef.current[idx] = false;
                        exitTimersRef.current[idx] = null;
                      }, REENTRY_DURATION);
                    } else if (pending === "done") {
                      setExitStates((prev) => { const n = [...prev]; n[idx] = "idle"; return n; });
                      inSpecialModeRef.current[idx] = false;
                      exitStartedRef.current[idx] = false;
                      exitTimersRef.current[idx] = null;
                    }
                  });
                  // Shallow-copy states to re-trigger exit chain effect for any paused icons at pos 8
                  setStates((prev) => [...prev]);
                },
              }
            : {};

        const inner = (
          // key changes on exitState transition to force remount, ensuring CSS animation restarts cleanly
          <div key={`${i}-${exitStates[i]}`} style={innerStyle} className={innerClass || undefined}>
            <IconCircle icon={cell.icon} isProject={cell.type === "project"} />
          </div>
        );

        if (cell.type === "project" && cell.href) {
          return (
            <Link
              key={i}
              href={cell.href}
              style={outerStyle}
              {...hoverHandlers}
              ref={(el) => { outerRefs.current[i] = el; }}
            >
              {inner}
            </Link>
          );
        }

        return (
          <div
            key={i}
            data-toy={cell.dataToy}
            style={outerStyle}
            {...hoverHandlers}
            ref={(el) => { outerRefs.current[i] = el; }}
          >
            {inner}
          </div>
        );
      })}
    </div>
  );
}
