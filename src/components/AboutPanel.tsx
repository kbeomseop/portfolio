"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

const experience = [
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
    desc: "Building web apps, games, and internal tools with Claude Code.",
  },
  {
    period: "2018 – 2025",
    org: "ROK Army",
    role: "Intelligence Operator",
    desc: "Planned and coordinated intelligence operations, developing discipline, adaptability, and problem-solving under pressure.",
  },
];

export default function AboutPanel({ open, onClose }: Props) {
  return (
    <aside
      className="fixed top-24 left-6 z-20 w-[440px] max-h-[calc(100vh-120px)] flex flex-col transition-transform duration-300 ease-in-out"
      style={{
        transform: open ? "translateX(0)" : "translateX(calc(-100% - 24px))",
        backgroundColor: "#E8623A",
        borderRadius: "20px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-7 pb-5 shrink-0">
        <span className="text-[12px] font-semibold tracking-widest uppercase text-white">
          About
        </span>
        <button
          onClick={onClose}
          className="text-white opacity-70 hover:opacity-100 transition-opacity text-base leading-none"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="mx-8 shrink-0" style={{ borderTop: "0.5px solid rgba(255,255,255,0.25)" }} />

      {/* Scrollable content */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-8 py-6 space-y-8">
        {/* Mission */}
        <section>
          <p className="text-[19px] font-semibold leading-[1.4] text-white">
            Things that make people&apos;s days a little better.
          </p>
          <p className="mt-4 text-[15px] leading-[1.65] text-white">
            I care about the small details — the ones that make a first climb
            less white-knuckle, a caption stop the scroll, a tool just work —
            no duct tape required.
          </p>
          <p className="mt-3 text-[15px] leading-[1.65] text-white">
            I want a beginner hooked after one session, a follower reeled in
            instead of scrolling past, and a teammate with one less thing on
            their plate.
          </p>
          <p className="mt-4 text-[13px] italic" style={{ color: "rgba(255,255,255,0.7)" }}>
            Simple things, made a little better.
          </p>
        </section>

        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.25)" }} />

        {/* Story ① */}
        <section>
          <h3
            className="text-[11px] font-semibold tracking-widest uppercase mb-3"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Trained to adapt
          </h3>
          <p className="text-[15px] leading-[1.65] text-white">
            Seven years as an intelligence operator taught me one thing above
            all: figure it out, fast, with whatever you&apos;ve got. No one
            hands you a manual. When I left, that habit didn&apos;t — I just
            started pointing it at climbing walls, Instagram feeds, and code
            editors instead.
          </p>
        </section>

        {/* Story ② */}
        <section>
          <h3
            className="text-[11px] font-semibold tracking-widest uppercase mb-3"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Coffee, the slow way
          </h3>
          <p className="text-[15px] leading-[1.65] text-white">
            Five-plus years into home brewing, one pour-over at a time. I hold
            SCA certifications in Barista Skills and Brewing — not because I
            needed the paper, but because I wanted to know I wasn&apos;t just
            guessing anymore.
          </p>
        </section>

        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.25)" }} />

        {/* Experience */}
        <section>
          <h3
            className="text-[11px] font-semibold tracking-widest uppercase mb-6"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Experience
          </h3>
          <ol className="space-y-7">
            {experience.map((item) => (
              <li key={item.period} className="flex gap-5">
                <span
                  className="text-[12px] leading-[1.5] whitespace-nowrap pt-[2px] w-24 shrink-0"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {item.period}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-white">{item.org}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {item.role}
                  </p>
                  <p className="text-[13px] leading-[1.6] mt-2" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="h-2" />
      </div>
    </aside>
  );
}
