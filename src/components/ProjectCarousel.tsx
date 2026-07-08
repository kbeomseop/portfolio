"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const projects = [
  {
    title: "Climbing coach",
    href: "/projects/coaching",
    gradient: "linear-gradient(135deg, #F9E0D0 0%, #F0B393 100%)",
    label: "Coaching",
  },
  {
    title: "Content creator",
    href: "/projects/content",
    gradient: "linear-gradient(135deg, #FAEFC9 0%, #EFD98A 100%)",
    label: "Content",
  },
  {
    title: "Vibe coder",
    href: "/projects/vibe-coder",
    gradient: "linear-gradient(135deg, #E2DFF5 0%, #B9AFE6 100%)",
    label: "Vibe coding",
  },
];

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(id);
  }, [resetKey]);

  const prev = () => {
    setCurrent((c) => (c - 1 + projects.length) % projects.length);
    setResetKey((k) => k + 1);
  };

  const next = () => {
    setCurrent((c) => (c + 1) % projects.length);
    setResetKey((k) => k + 1);
  };

  return (
    <div style={{ position: "relative", width: 760, height: 460 }}>
      {projects.map((project, i) => (
        <Link
          key={i}
          href={project.href}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 24,
            overflow: "hidden",
            background: project.gradient,
            boxShadow: "0 24px 60px rgba(0,0,0,0.16)",
            opacity: current === i ? 1 : 0,
            transition: "opacity 0.6s ease-in-out",
            pointerEvents: current === i ? "auto" : "none",
            textDecoration: "none",
            display: "block",
          }}
        >
          <div style={{ padding: 32 }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "rgba(0,0,0,0.45)",
              }}
            >
              {project.label}
            </p>
            <h3
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: "#1a1a1a",
                marginTop: 8,
              }}
            >
              {project.title}
            </h3>
          </div>

          {/* Thumbnail placeholder */}
          <div
            style={{
              width: "82%",
              height: 300,
              margin: "36px auto 0",
              borderRadius: "16px 16px 0 0",
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: 13, color: "#999" }}>[ project thumbnail ]</span>
          </div>
        </Link>
      ))}

      {/* Left arrow */}
      <button
        onClick={prev}
        style={{
          position: "absolute",
          left: -56,
          top: "50%",
          transform: "translateY(-50%)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid #eee",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: "#555",
        }}
      >
        ←
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        style={{
          position: "absolute",
          right: -56,
          top: "50%",
          transform: "translateY(-50%)",
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid #eee",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: "#555",
        }}
      >
        →
      </button>
    </div>
  );
}
