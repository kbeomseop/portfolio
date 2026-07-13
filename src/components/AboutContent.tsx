"use client";

import type { CSSProperties } from "react";

export const experience = [
  {
    period: "2025 – 2026",
    org: "PEAKERS Climbing Sinchon",
    role: "Climbing coach",
    desc: "Coaching, event planning, and social media for a bouldering gym.",
  },
  {
    period: "2026 – Now",
    org: "Independent practice",
    role: "Vibe coder",
    desc: "Building web apps, games, and internal tools with AI.",
  },
  {
    period: "2018 – 2025",
    org: "ROK Army",
    role: "Intelligence Operator",
    desc: "Planned and coordinated intelligence operations, developing discipline, adaptability, and problem-solving under pressure.",
  },
];

export const subheading: CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  color: "#FFFFFF",
  marginBottom: "8px",
  display: "block",
};

export const body: CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.4,
  color: "rgba(255,255,255,0.75)",
};

export default function AboutContent() {
  return (
    <div className="space-y-6">
      {/* Mission */}
      <section>
        <p className="text-[17px] font-semibold leading-[1.4] text-white">
          Things that make people&apos;s days a little better.
        </p>
        <p className="mt-3" style={body}>
          I care about the small details — the ones that make a first climb
          less white-knuckle, a caption stop the scroll, a tool just work —
          no duct tape required.
        </p>
        <p className="mt-2" style={body}>
          I want a beginner hooked after one session, a follower reeled in
          instead of scrolling past, and a teammate with one less thing on
          their plate.
        </p>
      </section>

      {/* Trained to adapt */}
      <section>
        <h3 style={subheading}>Trained to adapt</h3>
        <p style={body}>
          Seven years as an intelligence operator taught me one thing above
          all: figure it out, fast, with whatever you&apos;ve got. No one
          hands you a manual. When I left, that habit didn&apos;t — I just
          started pointing it at climbing walls, Instagram feeds, and code
          editors instead.
        </p>
      </section>

      {/* Coffee */}
      <section>
        <h3 style={subheading}>Coffee, the slow way</h3>
        <p style={body}>
          Five-plus years into home brewing, one pour-over at a time. I hold
          SCA certifications in Barista Skills and Brewing — not because I
          needed the paper, but because I wanted to know I wasn&apos;t just
          guessing anymore.
        </p>
      </section>

      <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.25)" }} />

      {/* Experience */}
      <section>
        <h3 style={{ ...subheading, marginBottom: "16px" }}>Experience</h3>
        <ol className="space-y-6">
          {experience.map((item) => (
            <li key={item.period} className="flex gap-5">
              <span
                className="text-[12px] whitespace-nowrap pt-[2px] w-24 shrink-0"
                style={{ lineHeight: 1.4, color: "rgba(255,255,255,0.55)" }}
              >
                {item.period}
              </span>
              <div>
                <p className="text-[14px] font-semibold text-white">{item.org}</p>
                <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
                  {item.role}
                </p>
                <p className="text-[13px] mt-1.5" style={{ lineHeight: 1.4, color: "rgba(255,255,255,0.75)" }}>
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="h-2" />
    </div>
  );
}
