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
          A gym is just walls and mats until people show up. So part of my job
          became giving them reasons to — nights that feel different, events worth
          staying late for. Turns out cheering someone through a hard move is a
          pretty good way to make a gym feel like a community.
        </p>
      </div>
    ),
  },
  {
    id: "sinchon-lent-out",
    label: "Sinchon, lent out",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Sinchon, lent out</h2>
        <div className="space-y-4">
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            We lent out the entire gym. 신촌 빌려드림 — roughly &quot;Sinchon, all
            yours&quot; — ran as an Instagram entry event: crews applied in the
            comments, and the winning crew got the gym to themselves for a night.
          </p>
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            Running the whole thing on Instagram meant every entry was also
            reach — the application thread pulled in new followers and pushed the
            account&apos;s engagement up while it ran.
          </p>
        </div>
        <div className="mt-6 flex gap-12">
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">300+</p>
            <p className="text-[13px] text-[#999] mt-2">entries on the application post</p>
          </div>
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">150+</p>
            <p className="text-[13px] text-[#999] mt-2">unique crews after filtering duplicates</p>
          </div>
        </div>
        <div className="mt-6">
          <video
            src="/content/reel-loop-muted.mp4"
            poster="/content/reel-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            className="w-[240px] md:w-[280px] rounded-[12px]"
            style={{ border: "0.5px solid #eee" }}
            aria-label="신촌 빌려드림 — the night the gym was lent out"
          />
        </div>
        <a
          href="https://www.instagram.com/reel/DZ4fUsaBK_g/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-5 text-[13px] font-medium text-[#5D4EBF] hover:opacity-70 transition-opacity"
        >
          Watch the reel →
        </a>
      </div>
    ),
  },
  {
    id: "peakers-night",
    label: "PEAKERS Night",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">PEAKERS Night</h2>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          Lights down, music up, same walls — completely different gym. PEAKERS
          Night turned regular session hours into something people planned their
          week around.
        </p>
      </div>
    ),
  },
];

export default function CommunityPage() {
  return (
    <ProjectLayout
      categoryLabel="Community"
      title={
        <>
          Full gym, /<br />
          good noise
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
