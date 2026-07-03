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
    <>
      {/* Panel */}
      <aside
        className="fixed top-0 left-0 h-full w-[460px] z-20 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          transform: open ? "translateX(0)" : "translateX(-100%)",
          backgroundColor: "#FDFAF7",
          boxShadow: open ? "4px 0 40px rgba(0,0,0,0.10)" : "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-[#EEEEEE]">
          <span className="text-[13px] font-semibold tracking-widest uppercase text-[#999]">
            About
          </span>
          <button
            onClick={onClose}
            className="text-[#999] hover:text-[#444] transition-colors text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10">
          {/* Mission */}
          <section>
            <p className="text-[20px] font-semibold leading-[1.4] text-[#444]">
              Things that make people&apos;s days a little better.
            </p>
            <p className="mt-4 text-[16px] leading-[1.65] text-[#555]">
              I care about the small details — the ones that make a first climb
              less white-knuckle, a caption stop the scroll, a tool just work —
              no duct tape required.
            </p>
            <p className="mt-4 text-[16px] leading-[1.65] text-[#555]">
              I want a beginner hooked after one session, a follower reeled in
              instead of scrolling past, and a teammate with one less thing on
              their plate.
            </p>
            <p className="mt-4 text-[13px] text-[#888] italic">
              Simple things, made a little better.
            </p>
          </section>

          <div className="border-t border-[#EEEEEE]" />

          {/* Story ① */}
          <section>
            <h3 className="text-[13px] font-semibold tracking-widest uppercase text-[#999] mb-3">
              Trained to adapt
            </h3>
            <p className="text-[16px] leading-[1.65] text-[#555]">
              Seven years as an intelligence operator taught me one thing above
              all: figure it out, fast, with whatever you&apos;ve got. No one
              hands you a manual. When I left, that habit didn&apos;t — I just
              started pointing it at climbing walls, Instagram feeds, and code
              editors instead.
            </p>
          </section>

          {/* Story ② */}
          <section>
            <h3 className="text-[13px] font-semibold tracking-widest uppercase text-[#999] mb-3">
              Coffee, the slow way
            </h3>
            <p className="text-[16px] leading-[1.65] text-[#555]">
              Five-plus years into home brewing, one pour-over at a time. I hold
              SCA certifications in Barista Skills and Brewing — not because I
              needed the paper, but because I wanted to know I wasn&apos;t just
              guessing anymore.
            </p>
          </section>

          <div className="border-t border-[#EEEEEE]" />

          {/* Experience */}
          <section>
            <h3 className="text-[13px] font-semibold tracking-widest uppercase text-[#999] mb-6">
              Experience
            </h3>
            <ol className="space-y-8">
              {experience.map((item) => (
                <li key={item.period} className="flex gap-6">
                  <span className="text-[13px] text-[#999] leading-[1.5] whitespace-nowrap pt-[2px] w-28 shrink-0">
                    {item.period}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-[#444]">
                      {item.org}
                    </p>
                    <p className="text-[13px] text-[#888] mt-0.5">{item.role}</p>
                    <p className="text-[14px] leading-[1.6] text-[#666] mt-2">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </aside>
    </>
  );
}
