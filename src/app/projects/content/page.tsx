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
          When I took over in March, the account was averaging around 120K views a
          month. Five months on it&apos;s holding at 165K, and it peaked at 238K — the
          highest the account has ever recorded.
        </p>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px] mt-4">
          That record landed six days after a reel I posted in my second week: 50K
          views, 229 shares, and 89% of the reach going to people who weren&apos;t
          following us yet.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-6 max-w-[720px]">
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">+33%</p>
            <p className="text-[13px] text-[#999] mt-2">monthly views, sustained</p>
          </div>
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">238K</p>
            <p className="text-[13px] text-[#999] mt-2">all-time account record</p>
          </div>
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">89%</p>
            <p className="text-[13px] text-[#999] mt-2">top reel reach — non-followers</p>
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
                           hover:opacity-100! hover:blur-none! hover:scale-[1.1] hover:z-10"
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
            className="inline-block mt-10 text-[13px] font-medium text-[#A8860B] hover:opacity-70 transition-opacity"
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
          Every reel starts as a phone clip and ends up cut, captioned, and
          color-graded in CapCut or Canva — usually the same day it&apos;s filmed. No
          outsourcing, no waiting on a designer. Same goes for graphics — event posters
          and promo visuals are mine too, start to finish. 25+ reels in five months, at
          least one a week.
        </p>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px] mt-4">
          Most of them meant getting coaches and members in front of a camera they
          hadn&apos;t asked to be in front of, and working around everyone&apos;s
          shifts to do it. The editing was rarely the hard part.
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
          The account&apos;s audience skewed 25–34. The neighborhood didn&apos;t. The
          gym sits in one of Seoul&apos;s densest university districts, and most of the
          people walking past it were students — the group that, once they settle into
          a gym, tends to stay.
        </p>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px] mt-4">
          So I went to them. Across three campaigns I reached out to nearby
          universities and their student bodies, alpine clubs and climbing societies,
          and ran student discounts through their channels alongside our own Reels.
          Timed to the semester, the biggest of them brought in 626 visits over three
          months against a 500 target. The latest turned that traffic into something
          that paid for itself: a five-session student pass, sold at the counter — 56
          went out, and five students came back for a second.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-6 max-w-[720px]">
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">8</p>
            <p className="text-[13px] text-[#999] mt-2">universities contacted</p>
          </div>
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">11</p>
            <p className="text-[13px] text-[#999] mt-2">student bodies and clubs</p>
          </div>
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">626</p>
            <p className="text-[13px] text-[#999] mt-2">visits in one semester (target: 500)</p>
          </div>
        </div>
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
        gradient: "linear-gradient(160deg, #FDFAF0 0%, #FAEFC9 40%, #F5E3A8 100%)",
        blob: "radial-gradient(ellipse 45% 55% at 20% 10%, rgba(212,160,23,0.30) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 85% 25%, rgba(239,217,138,0.55) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 55% 95%, rgba(245,227,168,0.65) 0%, transparent 65%)",
        labelColor: "#A8860B",
      }}
    />
  );
}
