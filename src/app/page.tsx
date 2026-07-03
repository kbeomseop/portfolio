"use client";

import { useState } from "react";
import Link from "next/link";
import AboutPanel from "@/components/AboutPanel";
import ContactPanel from "@/components/ContactPanel";

export default function Home() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#EEEEEE 1px, transparent 1px), linear-gradient(90deg, #EEEEEE 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Coral blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 75% 0%, rgba(216, 90, 48, 0.18) 0%, transparent 100%)",
        }}
      />

      {/* Nav */}
      <nav className="relative z-30 flex items-center justify-between px-16 py-8">
        <div className="flex flex-col" style={{ gap: "3px" }}>
          <span className="text-[15px] font-semibold tracking-tight text-[#444] leading-none">
            Beomseop Kim
          </span>
          <span className="text-[12px] font-normal leading-none" style={{ color: "#999" }}>
            goes by Malcolm
          </span>
        </div>
        <ul className="flex items-center gap-10">
          <li>
            <button
              onClick={() => setAboutOpen((v) => !v)}
              className={`text-[15px] transition-colors cursor-pointer ${
                aboutOpen ? "text-[#D85A30]" : "text-[#555] hover:text-[#D85A30]"
              }`}
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => setContactOpen((v) => !v)}
              className={`text-[15px] transition-colors cursor-pointer ${
                contactOpen ? "text-[#D85A30]" : "text-[#555] hover:text-[#D85A30]"
              }`}
            >
              Contact
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero content */}
      <main className="relative z-10 flex flex-col justify-center px-16 pt-24 pb-32">
        <h1 className="text-[56px] font-bold leading-[1.2] max-w-2xl">
          <Link
            href="/projects/coaching"
            className="block text-[#444] hover:text-[#D85A30] transition-colors cursor-pointer no-underline"
          >
            Climbing coach.
          </Link>
          <Link
            href="/projects/content"
            className="block text-[#444] hover:text-[#D85A30] transition-colors cursor-pointer no-underline"
          >
            Content creator.
          </Link>
          <Link
            href="/projects/vibe-coder"
            className="block text-[#444] hover:text-[#D85A30] transition-colors cursor-pointer no-underline"
          >
            Vibe coder.
          </Link>
        </h1>

        <p className="mt-6 text-[16px] leading-[1.65] text-[#555] whitespace-nowrap">
          Currently coaching, creating, and coding — mostly in that order.
        </p>
      </main>

      {/* Projects trigger — bottom-right */}
      <Link
        href="/projects/coaching"
        className="absolute bottom-16 right-16 z-10 flex items-center justify-center hover:opacity-80 transition-opacity"
        style={{
          width: 80,
          height: 80,
          background: "#D85A30",
          borderRadius: 12,
        }}
        aria-label="View projects"
      />

      {/* Side panels */}
      <AboutPanel open={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
