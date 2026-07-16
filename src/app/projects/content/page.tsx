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
            <p className="text-[13px] text-[#999] mt-2">Instagram growth since taking over in March 2026</p>
          </div>
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">50K</p>
            <p className="text-[13px] text-[#999] mt-2">best-performing reel</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="group flex gap-4 max-w-[720px]">
            {[
              {
                src: "/content/reel-pov-instructor.webp",
                views: "50K views",
                alt: "Reel: a day in the life of a climbing instructor",
                href: "https://www.instagram.com/reel/DVsREVlAap0/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==",
              },
              {
                src: "/content/reel-jonber.webp",
                views: "25K views",
                alt: "Reel: coming back to a project after a week off",
                href: "https://www.instagram.com/reel/DWvTRL4kYRG/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
              },
              {
                src: "/content/reel-tomoa-step.webp",
                views: "22K views",
                alt: "Reel: Tomoa skip technique breakdown",
                href: "https://www.instagram.com/reel/DY7LAsthp5G/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
              },
            ].map(({ src, views, alt, href }) => (
              <a
                key={src}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-1 flex-col gap-2 no-underline
                           transition-all duration-300 ease-out
                           group-hover:opacity-40 group-hover:blur-[2px]
                           hover:opacity-100! hover:blur-none! hover:scale-[1.2] hover:z-10"
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full rounded-[10px]"
                  style={{ border: "0.5px solid #eee" }}
                />
                <span className="text-[12px] text-[#999]">{views}</span>
              </a>
            ))}
          </div>
          <a
            href="https://www.instagram.com/peakers_sinchon/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-[13px] font-medium text-[#A8860B] hover:opacity-70 transition-opacity"
          >
            More on Instagram →
          </a>
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
          waiting on a designer. Same goes for graphics — event posters and promo
          visuals are mine too, start to finish.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[720px]">
          <div className="flex flex-col gap-2">
            <img
              src="/content/poster-hotdog-set.webp"
              alt="In-gym menu poster for the hot dog set"
              className="w-full rounded-[10px]"
              style={{ border: "0.5px solid #eee" }}
            />
            <span className="text-[12px] text-[#999]">In-gym menu poster</span>
          </div>
          <div className="flex flex-col gap-2">
            <img
              src="/content/poster-instructor-beomseop.webp"
              alt="Instructor spotlight poster, one of a series for the coaching team"
              className="w-full rounded-[10px]"
              style={{ border: "0.5px solid #eee" }}
            />
            <span className="text-[12px] text-[#999]">Instructor spotlight — one of a series made for the whole coaching team</span>
          </div>
        </div>
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
          students. So instead of casting a wide net, I built student discount passes and
          pushed them through Reels aimed squarely at people walking past the gym every
          day. Three campaigns in, the playbook keeps getting sharper — the latest, a
          five-session student pass, runs with promotion support from nearby university
          student councils.
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
      heroTheme={{
        gradient: "linear-gradient(160deg, #FDFAF0 0%, #FAEFC9 55%, #F5E3A8 100%)",
        blob: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,160,23,0.16) 0%, transparent 100%)",
        labelColor: "#A8860B",
      }}
    />
  );
}
