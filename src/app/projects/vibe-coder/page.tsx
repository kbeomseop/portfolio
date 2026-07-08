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
          to code — so I taught myself with AI, one small project at a time.
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
          progress, all in one place. Still in daily use at the gym.
        </p>
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
        gradient: "linear-gradient(160deg, #F4F3FB 0%, #E2DFF5 55%, #CFC9EE 100%)",
        blob: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(93,78,191,0.16) 0%, transparent 100%)",
        labelColor: "#5D4EBF",
      }}
    />
  );
}
