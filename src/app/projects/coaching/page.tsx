"use client";

import ProjectLayout, { ProjectSection } from "@/components/ProjectLayout";

const sections: ProjectSection[] = [
  {
    id: "introduction",
    label: "Introduction",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Introduction</h2>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          I coach, run events, and manage social for a bouldering gym in Seoul —
          basically anything that gets people on the wall and keeps them coming back.
        </p>
      </div>
    ),
  },
  {
    id: "coaching",
    label: "Coaching",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Coaching</h2>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          Of the 19 students in their first month, most stayed on for a second.
        </p>
        <div className="mt-6">
          <p className="text-[40px] font-bold text-[#D85A30] leading-none">Over 80%</p>
          <p className="text-[13px] text-[#999] mt-2">stayed on (16/19)</p>
        </div>
      </div>
    ),
  },
  {
    id: "curriculum-design",
    label: "Curriculum design",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Curriculum design</h2>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          Wrote two curricula — a 2–3 month program for beginners and a 3-month program
          for intermediate climbers — each built around adapting to where a student
          actually was, not a one-size-fits-all class. Also built an English version and
          taught sessions in English, since foreign visitors came through the gym daily.
        </p>
      </div>
    ),
  },
  {
    id: "event-design",
    label: "Event design",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Event design</h2>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          Ran a bouldering party where members squared off on the same problems, half
          competition, half excuse to hang out longer than usual. Turns out cheering
          someone through a hard move is a pretty good way to make a gym feel like a
          community.
        </p>
      </div>
    ),
  },
];

export default function CoachingPage() {
  return (
    <ProjectLayout
      categoryLabel="Coaching"
      title={
        <>
          Growing /<br />
          PEAKERS Sinchon
        </>
      }
      sections={sections}
    />
  );
}
