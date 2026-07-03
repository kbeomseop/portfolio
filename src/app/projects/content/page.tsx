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
          I handle content for @peakers_sinchon — planning, shooting, and posting the
          kind of content that gets people talking, and sometimes gets them onto the wall.
        </p>
      </div>
    ),
  },
  {
    id: "growth",
    label: "Growth",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Growth</h2>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          Reach had been declining before I took over. Within three weeks, weekly reach
          hit an all-time high — and one reel outperformed everything posted before or since.
        </p>
        <div className="mt-8 flex gap-12">
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">+50%</p>
            <p className="text-[13px] text-[#999] mt-2">Instagram growth</p>
          </div>
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">50K</p>
            <p className="text-[13px] text-[#999] mt-2">best-performing reel</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "from-shoot-to-post",
    label: "From shoot to post",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">From shoot to post</h2>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          Every reel starts as a phone clip and ends up cut, captioned, and color-graded
          in CapCut or Canva — usually the same day it&apos;s filmed. No outsourcing, no
          waiting on a designer.
        </p>
      </div>
    ),
  },
  {
    id: "going-local",
    label: "Going local",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Going local</h2>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          Figured out who was actually around — turns out that&apos;s a lot of university
          students. So instead of casting a wide net, I built a student discount and pushed
          it through Reels aimed squarely at people walking past the gym every day.
        </p>
      </div>
    ),
  },
];

export default function ContentPage() {
  return (
    <ProjectLayout
      categoryLabel="Content"
      title={
        <>
          Made for /<br />
          @peakers_sinchon
        </>
      }
      sections={sections}
    />
  );
}
