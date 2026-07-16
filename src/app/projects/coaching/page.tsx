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
          I coach climbers at PEAKERS Sinchon, a bouldering gym in Seoul — from
          first-timers testing the mats to teenagers chasing their first real send.
          The job, as I see it: get people on the wall, keep them safe on it, and
          make them want to come back.
        </p>
      </div>
    ),
  },
  {
    id: "qualifications",
    label: "Qualifications",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Qualifications</h2>
        <div className="space-y-6">
          <div>
            <p className="text-[15px] font-semibold text-[#1a1a1a]">
              Certified Climbing Instructor — Level 2
            </p>
            <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px] mt-1">
              National coaching qualification issued by the Korean government — the
              standard credential for climbing instructors in Korea.
            </p>
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#1a1a1a]">
              CPR &amp; First Aid
            </p>
            <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px] mt-1">
              Trained formally through seven years of military service, and again as
              part of the instructor certification.
            </p>
          </div>
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
        <div className="space-y-4">
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            Two programs, developed together with the coaching team, each running
            three months: one for climbers in their first months on the wall, one for
            intermediate students focused on technique and injury prevention. Classes
            run seven sessions a month, so skills stack week to week instead of
            resetting every class.
          </p>
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            Every technique follows the same skeleton — why it matters, where it
            works (and where it doesn&apos;t), what to watch out for, and drills that
            make it stick.
          </p>
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            I adapted both programs into English and taught them that way —
            international climbers came through the gym daily, so English sessions
            were part of the regular rotation.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "how-i-coach",
    label: "How I coach",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">How I coach</h2>
        <div className="space-y-4">
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            My classes run on two rules: nobody gets hurt, and nobody gets bored.
          </p>
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            Every session starts from safety — warm-up, falling technique, mat
            awareness — because fun only counts if everyone walks out the way they
            walked in. From there, drills turn into games wherever it helps: climbing
            bingo, a board game adapted from a Korean classic. With my teenage
            students (14–18), play is how they learn without noticing. With adults,
            it&apos;s what makes a hard session something to look forward to.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "safety",
    label: "Safety",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Safety</h2>
        <div className="space-y-4">
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            Every new climber and visitor went through a safety induction before
            touching the wall — falling technique, mat awareness, gym rules. I ran
            facility checks on a regular schedule, and handled mat repairs and hold
            re-tightening the moment they were needed, not when it was convenient.
          </p>
          <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
            In lessons, safety came before progress, every time. The record shows
            it: not a single injury in any session I&apos;ve run.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "retention",
    label: "Retention",
    content: (
      <div>
        <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-4">Retention</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">100+</p>
            <p className="text-[13px] text-[#999] mt-2">climbers coached — from one-day intros to regular students</p>
          </div>
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">80%+</p>
            <p className="text-[13px] text-[#999] mt-2">of monthly regular students renewed after their first month (16/19)</p>
          </div>
          <div>
            <p className="text-[40px] font-bold text-[#D85A30] leading-none">0</p>
            <p className="text-[13px] text-[#999] mt-2">injuries in any session</p>
          </div>
        </div>
        <p className="text-[15px] leading-[1.7] text-[#555] max-w-[720px]">
          The renewal number comes down to two habits. First, coaching to where
          each student actually is — not where the curriculum says they should be.
          Second, following up: every student leaves each month with individual
          feedback and a clear next goal, so when renewal time comes, &ldquo;one more
          month&rdquo; is the obvious answer.
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
          From first fall /<br />
          to first send
        </>
      }
      sections={sections}
      heroTheme={{
        gradient: "linear-gradient(160deg, #FDF6F2 0%, #F9E0D0 40%, #F5CDB4 100%)",
        blob: "radial-gradient(ellipse 45% 55% at 20% 10%, rgba(216,90,48,0.38) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 85% 25%, rgba(240,153,123,0.50) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 55% 95%, rgba(245,196,179,0.65) 0%, transparent 65%)",
        labelColor: "#993C1D",
      }}
    />
  );
}
