"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

type SlideBase = { key: string; label: string; title: string; gradient: string };
type SlideInfo    = SlideBase & { kind: "info" };
type SlideProject = SlideBase & { kind: "project"; href: string };
type Slide = SlideInfo | SlideProject;

const slides: Slide[] = [
  { key: "about",   label: "About",       title: "A bit about me",
    gradient: "linear-gradient(160deg, #F7ECE6 0%, #EBCFC0 100%)", kind: "info" },
  { key: "coach",   label: "Coaching",    title: "Climbing coach",
    gradient: "linear-gradient(160deg, #F9E0D0 0%, #F0B393 100%)", kind: "project", href: "/projects/coaching" },
  { key: "sns",     label: "Content",     title: "Content creator",
    gradient: "linear-gradient(160deg, #FAEFC9 0%, #EFD98A 100%)", kind: "project", href: "/projects/content" },
  { key: "coding",  label: "Vibe coding", title: "Vibe coder",
    gradient: "linear-gradient(160deg, #E2DFF5 0%, #B9AFE6 100%)", kind: "project", href: "/projects/vibe-coder" },
  { key: "contact", label: "Contact",     title: "Get in touch",
    gradient: "linear-gradient(160deg, #EDEAE6 0%, #C9C4BE 100%)", kind: "info" },
];

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const lockRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((dir: 1 | -1) => {
    if (lockRef.current) return;
    setCurrent((c) => Math.max(0, Math.min(slides.length - 1, c + dir)));
    lockRef.current = true;
    setTimeout(() => { lockRef.current = false; }, 700);
  }, []);

  // Wheel — attached with passive:false so e.preventDefault() works
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta > 0) navigate(1);
      else if (delta < 0) navigate(-1);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [navigate]);

  // Keyboard arrow keys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigate(1);
      else if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigate]);

  return (
    <div
      ref={containerRef}
      style={{ position: "fixed", inset: 0, top: 88, overflow: "hidden", zIndex: 20 }}
    >
      {/* Horizontal track */}
      <div
        style={{
          display: "flex",
          height: "100%",
          width: `${slides.length * 100}vw`,
          transform: `translateX(-${current * 100}vw)`,
          transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.key}
            style={{
              flexShrink: 0,
              width: "100vw",
              height: "100%",
              background: slide.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "100%", maxWidth: 1100, padding: "64px 80px" }}>
              {/* Label */}
              <p style={{
                fontSize: 14, fontWeight: 600, letterSpacing: "1.5px",
                textTransform: "uppercase", color: "rgba(0,0,0,0.45)",
              }}>
                {slide.label}
              </p>

              {/* Title */}
              <h2 style={{
                fontSize: 64, fontWeight: 700, color: "#1a1a1a",
                marginTop: 12, lineHeight: 1.15,
              }}>
                {slide.title}
              </h2>

              {/* Project slide */}
              {slide.kind === "project" && (
                <>
                  <div style={{
                    marginTop: 40, width: "100%", maxWidth: 860, height: 420,
                    borderRadius: 20, background: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: 13, color: "#888" }}>[ {slide.label} preview ]</span>
                  </div>
                  <Link
                    href={slide.href}
                    className="hover:opacity-60 transition-opacity"
                    style={{
                      display: "inline-block", marginTop: 28,
                      fontSize: 15, fontWeight: 600, color: "#1a1a1a", textDecoration: "none",
                    }}
                  >
                    View project →
                  </Link>
                </>
              )}

              {/* About slide */}
              {slide.kind === "info" && slide.key === "about" && (
                <div style={{ marginTop: 32, maxWidth: 640 }}>
                  <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(0,0,0,0.7)" }}>
                    I care about small details — a first climb that&apos;s less white-knuckle,
                    a caption that stops the scroll, a tool that just works.
                  </p>
                  <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(0,0,0,0.7)", marginTop: 16 }}>
                    Seven years as an intelligence operator taught me to figure it out fast
                    with whatever I&apos;ve got. Now I point that at climbing walls, feeds, and code.
                  </p>
                </div>
              )}

              {/* Contact slide */}
              {slide.kind === "info" && slide.key === "contact" && (
                <div style={{ marginTop: 32, maxWidth: 420 }}>
                  {[
                    { label: "Email",     value: "kbeomseop@gmail.com" },
                    { label: "Instagram", value: "@malcolm_beo" },
                    { label: "Mobile",    value: "—" },
                  ].map((item) => (
                    <div key={item.label} style={{ marginTop: 20 }}>
                      <p style={{
                        fontSize: 11, textTransform: "uppercase",
                        letterSpacing: "1.5px", color: "rgba(0,0,0,0.5)",
                      }}>
                        {item.label}
                      </p>
                      <p style={{ fontSize: 16, color: "#1a1a1a", marginTop: 4 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Label indicators */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%",
        transform: "translateX(-50%)", display: "flex", gap: 24, zIndex: 1,
      }}>
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            onClick={() => setCurrent(i)}
            style={{
              fontSize: 13,
              fontWeight: current === i ? 600 : 400,
              color: current === i ? "#1a1a1a" : "rgba(0,0,0,0.35)",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              transition: "color 0.2s",
            }}
          >
            {slide.label}
          </button>
        ))}
      </div>
    </div>
  );
}
