"use client";

import ProjectLayout, { ProjectSection } from "@/components/ProjectLayout";

function ScreenshotPlaceholder() {
  return (
    <div
      className="w-full max-w-[720px] h-[180px] rounded-[8px] flex items-center justify-center mb-5"
      style={{ background: "#f7f7f5", border: "0.5px solid #eee" }}
    >
      <span className="text-[13px] text-[#bbb]">[ screenshot placeholder ]</span>
    </div>
  );
}

function ProjectLinks() {
  // TODO: URL 확정 시 span을 <a href>로 교체
  const pill = {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 13,
    fontWeight: 500,
    color: "#5D4EBF",
    border: "1px solid #CFC9EE",
    borderRadius: 9999,
    padding: "7px 16px",
    opacity: 0.5,
    cursor: "default",
  } as const;
  return (
    <div className="flex gap-3 mt-4">
      <span style={pill}>Try it live</span>
      <span style={pill}>GitHub</span>
    </div>
  );
}

const sections: ProjectSection[] = [
  {
    id: "introduction",
    label: "Introduction",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Introduction</h2>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          Work gave me problems worth solving, training gave me a reason to build
          something just for myself, and curiosity did the rest. I didn&apos;t know how
          to code — so I taught myself with AI, mostly Claude Code, one small
          project at a time.
        </p>
      </div>
    ),
  },
  {
    id: "classnote",
    label: "classnote",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">classnote</h2>
        <ScreenshotPlaceholder />
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          A PWA for managing climbing students — lesson notes, bouldering and endurance
          progress, all in one place. Still in daily use at the gym, where it tracks
          19 regular students.
        </p>
        <ProjectLinks />
      </div>
    ),
  },
  {
    id: "climbing-game",
    label: "climbing-game",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">climbing-game</h2>
        <ScreenshotPlaceholder />
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          A browser game that reads your hand position through your webcam and turns it
          into a bouldering puzzle — built to make the sport feel more like play, less
          like a wall to be afraid of.
        </p>
        <ProjectLinks />
      </div>
    ),
  },
  {
    id: "timerforme",
    label: "timerforme",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">timerforme</h2>
        <ScreenshotPlaceholder />
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          An interval timer built for climbing training, because a phone stopwatch was
          never going to cut it.
        </p>
        <ProjectLinks />
      </div>
    ),
  },
];

export default function VibeCoderPage() {
  return (
    <ProjectLayout
      categoryLabel="Vibe coder"
      title={
        <>
          Small apps, /<br />
          built with AI
        </>
      }
      sections={sections}
      heroTheme={{
        gradient: "linear-gradient(160deg, #F4F3FB 0%, #E2DFF5 40%, #CFC9EE 100%)",
        blob: "radial-gradient(ellipse 45% 55% at 20% 10%, rgba(93,78,191,0.30) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 85% 25%, rgba(185,175,230,0.55) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 55% 95%, rgba(207,201,238,0.68) 0%, transparent 65%)",
        labelColor: "#5D4EBF",
      }}
    />
  );
}
