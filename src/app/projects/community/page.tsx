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
  {
    id: "guiding-blind-climbers",
    label: "Guiding blind climbers",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Guiding blind climbers</h2>
        <div className="space-y-4">
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            Twice a month for about six months, I volunteered at Boramae Climbing
            Center — a city-run outdoor lead wall in Seoul — with a group of blind
            and low-vision climbers. I wanted to do something for the climbing
            community beyond the gym I coach at.
          </p>
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            Sessions ran anywhere from five climbers to twenty. I fitted harnesses
            and shoes, spotted the opening moves, and belayed — which on a lead wall
            is the whole safety system, not a formality.
          </p>
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            Most of the job, though, was my voice. Fifteen metres up a lead route,
            nobody can reach a climber — I&apos;m on the ground with the other end
            of the rope. So we built the vocabulary before anyone tied in: jug,
            pinch, crimp, and a clock face for direction. After that, &ldquo;right
            hand, one o&apos;clock, jug&rdquo; was enough to keep someone moving.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[720px]">
          <div className="flex flex-col gap-2">
            <img
              src="/content/boramae-belay.webp"
              alt="Belaying at the foot of the Boramae lead wall, rope running through the belay device"
              className="w-full rounded-[10px]"
              style={{ border: "0.5px solid #eee" }}
            />
            <span className="text-[12px] text-[#999]">On belay at the base of the wall</span>
          </div>
          <div className="flex flex-col gap-2">
            <img
              src="/content/boramae-lead.webp"
              alt="A climber partway up the lead wall while two volunteers belay and watch from the ground"
              className="w-full rounded-[10px]"
              style={{ border: "0.5px solid #eee" }}
            />
            <span className="text-[12px] text-[#999]">Calling a route from the ground</span>
          </div>
        </div>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px] mt-6">
          One climber was fighting through 5.9 when I started. By the end, I was
          belaying him up a clean 5.10c. Best thing I took home from any of it.
        </p>
        <div className="mt-6 flex flex-col gap-2 max-w-[720px]">
          <img
            src="/content/boramae-group.webp"
            alt="Climbers and volunteers together in front of the Boramae wall at the end of a session"
            className="w-full rounded-[10px]"
            style={{ border: "0.5px solid #eee" }}
          />
          <span className="text-[12px] text-[#999]">End of a session at Boramae</span>
        </div>
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
