"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const CELL = 104;
const GAP = 78;
const STEP = CELL + GAP;       // 182
const GRID = 2 * STEP + CELL;  // 468
const R = 26;
const PIPE = 86;    // entry/exit pipe length (extended 50px so pipe runs deeper off-screen)
const CIRCLE = 92;
const OFFSET = (CELL - CIRCLE) / 2; // 6
const ICON_IMG_SIZE = 64;
const PIPE_W = 104; // tube body stroke-width > CIRCLE (92) — icons appear inside the tube

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

// Path extends 300px beyond the SVG viewport at both ends so the tube
// is clipped cleanly by the SVG boundary (no visible end cap).
const trackPath = [
  `M ${cx(0)} ${cy(0) - CELL / 2 - PIPE - 300}`,
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
  `L ${cx(2)} ${cy(2) + CELL / 2 + PIPE + 300}`,
].join(" ");

interface CellDef {
  type: "project" | "toy";
  iconSrc: string;
  iconSize?: number;
  href?: string;
  dataToy?: string;
}

// Grid layout (SNAKE order): project icons (P) are non-adjacent
//   hold(P)  bike     sns(P)
//   crunchyball  coffee  chalkbag
//   laptop(P)  driver  keycap
const cells: CellDef[] = [
  { type: "project", iconSrc: "/icons/icon-hold.png",        href: "/projects/coaching" },   // SNAKE[0] (0,0)
  { type: "toy",     iconSrc: "/icons/icon-bike.png",        dataToy: "bike" },               // SNAKE[1] (0,1)
  { type: "project", iconSrc: "/icons/icon-sns.png",         iconSize: 52, href: "/projects/content" },  // SNAKE[2] (0,2)
  { type: "toy",     iconSrc: "/icons/icon-chalkbag.png",    iconSize: 70, dataToy: "chalkbag" },      // SNAKE[3] (1,2)
  { type: "toy",     iconSrc: "/icons/icon-coffee.png",      dataToy: "coffee" },             // SNAKE[4] (1,1)
  { type: "toy",     iconSrc: "/icons/icon-crunchyball.png", dataToy: "crunchyball" },        // SNAKE[5] (1,0)
  { type: "project", iconSrc: "/icons/icon-laptop.png",      href: "/projects/vibe-coder" },  // SNAKE[6] (2,0)
  { type: "toy",     iconSrc: "/icons/icon-driver.png",      dataToy: "driver" },             // SNAKE[7] (2,1)
  { type: "toy",     iconSrc: "/icons/icon-keycap.png",      dataToy: "keycap" },             // SNAKE[8] (2,2)
];

// Pulse animation-delay per cell: project icons staggered 0.8s apart, toys unused
const PULSE_DELAY: string[] = (() => {
  let pIdx = 0;
  return cells.map((cell) =>
    cell.type === "project" ? `${(pIdx++ * 0.8).toFixed(1)}s` : "0s"
  );
})();

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

const SHADOW_BASE = "0 4px 12px rgba(0,0,0,0.06)";
const SHADOW_HOVER = "0 12px 28px rgba(0,0,0,0.16)";
const SHADOW_CORAL = "0 0 0 3px rgba(216,90,48,0.10)";

// Keycap overlay positions (px, relative to the 64×64 icon image).
// Adjust top/left/width/height per key to match the actual icon.png layout.
const KEYCAP_KEYS = [
  { top: 13, left: 3,  width: 16, height: 26, radius: 3 },
  { top: 13, left: 24, width: 16, height: 26, radius: 3 },
  { top: 13, left: 45, width: 16, height: 26, radius: 3 },
];
const KEYCAP_CYCLE   = 1.5; // s — full 3-key animation cycle duration
const KEYCAP_STAGGER = 0.3; // s — delay between each key press

function IconCircle({
  iconSrc,
  iconSize = ICON_IMG_SIZE,
  isProject = false,
  isHovered = false,
  isPulsing = false,
  pulseDelay = "0s",
  isKeycap = false,
}: {
  iconSrc: string;
  iconSize?: number;
  isProject?: boolean;
  isHovered?: boolean;
  isPulsing?: boolean;
  pulseDelay?: string;
  isKeycap?: boolean;
}) {
  const depthShadow = isHovered ? SHADOW_HOVER : SHADOW_BASE;
  // Inline boxShadow is always set; CSS animation overrides it while pulsing,
  // then inline value + transition take over the moment the class is removed (hover/exit).
  const boxShadow = isProject ? `${SHADOW_CORAL}, ${depthShadow}` : depthShadow;

  return (
    <div
      className={`flex items-center justify-center${isPulsing ? " project-pulse" : ""}`}
      style={{
        width: CIRCLE,
        height: CIRCLE,
        borderRadius: "50%",
        background: "#ffffff",
        border: "1px solid #eee",
        boxShadow,
        transition: "box-shadow 0.2s ease-out",
        ...(isPulsing && { animationDelay: pulseDelay }),
      }}
    >
      {isKeycap ? (
        <div style={{ position: "relative", width: iconSize, height: iconSize }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={iconSize} height={iconSize} alt="" style={{ objectFit: "contain" }} />
          {KEYCAP_KEYS.map((k, ki) => (
            <div
              key={ki}
              style={{
                position: "absolute",
                top: k.top,
                left: k.left,
                width: k.width,
                height: k.height,
                borderRadius: k.radius,
                background: "rgba(0,0,0,0.20)",
                opacity: 0,
                pointerEvents: "none",
                ...(isHovered && {
                  animation: `keycap-key-press ${KEYCAP_CYCLE}s ease-in-out infinite`,
                  animationDelay: `${(ki * KEYCAP_STAGGER).toFixed(2)}s`,
                }),
              }}
            />
          ))}
        </div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={iconSrc} width={iconSize} height={iconSize} alt="" style={{ objectFit: "contain" }} />
      )}
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
      {/* Pipe track — glass tube: body → top wall → bottom wall */}
      <svg
        width={GRID}
        height={GRID + PIPE * 2 + PIPE_W + 20}
        viewBox={`0 ${-(PIPE + PIPE_W / 2 + 10)} ${GRID} ${GRID + PIPE * 2 + PIPE_W + 20}`}
        className="absolute left-0 pointer-events-none"
        overflow="hidden"
        style={{ top: -(PIPE + PIPE_W / 2 + 10) }}
      >
        {/* Body — more transparent so background shows through */}
        <path
          d={trackPath}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={PIPE_W}
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
        {/* Top wall edge — glowing glass rim at upper boundary */}
        <path
          d={trackPath}
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth={2.5}
          strokeLinecap="butt"
          strokeLinejoin="round"
          transform="translate(0, -48)"
        />
        {/* Bottom wall edge — glowing glass rim at lower boundary */}
        <path
          d={trackPath}
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth={2.5}
          strokeLinecap="butt"
          strokeLinejoin="round"
          transform="translate(0, 48)"
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
            // Opaque until 70% then fades out
            const opacity = anim.progress < 0.7 ? 1 : 1 - (anim.progress - 0.7) / 0.3;
            innerStyle = { transform: `translateY(${ty}px)`, opacity };
          } else {
            // rise: slide up from -60px, fade in
            const ty = (1 - anim.progress) * -60;
            innerStyle = { transform: `translateY(${ty}px)`, opacity: anim.progress };
          }
        } else {
          innerStyle = {
            transform: isHovered ? "scale(1.2)" : "scale(1)",
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

        // Pulse: project icons only, idle state (not hovered, not animating)
        const isPulsing = cell.type === "project" && phase === "circulating" && !isHovered && !anim.active;

        const inner = (
          <div style={innerStyle}>
            <IconCircle
              iconSrc={cell.iconSrc}
              iconSize={cell.iconSize}
              isProject={cell.type === "project"}
              isHovered={isHovered}
              isPulsing={isPulsing}
              pulseDelay={PULSE_DELAY[i]}
              isKeycap={cell.dataToy === "keycap"}
            />
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
