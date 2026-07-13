"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AboutPanel from "@/components/AboutPanel";
import ContactPanel from "@/components/ContactPanel";
import HeroGrid from "@/components/HeroGrid";
import ProjectCarousel, { type CarouselHandle } from "@/components/ProjectCarousel";

const CAROUSEL_LABELS = ["About", "Coaching", "Content", "Vibe coding", "Contact"];

export default function Home() {
  const [aboutOpen, setAboutOpen]   = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [heroMode, setHeroMode]     = useState<"grid" | "carousel">("grid");
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<CarouselHandle>(null);

  // Close panels when entering carousel mode
  useEffect(() => {
    if (heroMode === "carousel") {
      setAboutOpen(false);
      setContactOpen(false);
    }
  }, [heroMode]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#EEEEEE 1px, transparent 1px), linear-gradient(90deg, #EEEEEE 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Coral blob — grid mode only */}
      {heroMode === "grid" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 75% 0%, rgba(216, 90, 48, 0.18) 0%, transparent 100%)",
          }}
        />
      )}

      {/* Nav */}
      <nav className="relative z-30 flex items-center justify-between px-16 py-8">
        {/* Left group */}
        <div className="flex items-center" style={{ gap: 48 }}>
          <div className="flex flex-col" style={{ gap: "3px" }}>
            <span className="text-[15px] font-semibold tracking-tight text-[#444] leading-none">
              Beomseop Kim
            </span>
            <span className="text-[12px] font-normal leading-none" style={{ color: "#999" }}>
              goes by Malcolm
            </span>
          </div>

          {heroMode === "grid" ? (
            /* Grid mode: About + Contact panel toggles */
            <div className="flex items-center" style={{ gap: 32 }}>
              <button
                onClick={() => setAboutOpen((v) => !v)}
                className={`text-[15px] transition-colors cursor-pointer ${
                  aboutOpen ? "text-[#D85A30]" : "text-[#555] hover:text-[#D85A30]"
                }`}
              >
                About
              </button>
              <button
                onClick={() => setContactOpen((v) => !v)}
                className={`text-[15px] transition-colors cursor-pointer ${
                  contactOpen ? "text-[#D85A30]" : "text-[#555] hover:text-[#D85A30]"
                }`}
              >
                Contact
              </button>
            </div>
          ) : (
            /* Carousel mode: 5 slide label buttons */
            <div className="flex items-center" style={{ gap: 28 }}>
              {CAROUSEL_LABELS.map((label, i) => (
                <button
                  key={label}
                  onClick={() => carouselRef.current?.scrollToIndex(i)}
                  className="transition-colors cursor-pointer hover:text-[#555]"
                  style={{
                    fontSize: 14,
                    color: activeSlide === i ? "#D85A30" : "#999",
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontWeight: activeSlide === i ? 600 : 400,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right group: mode toggle */}
        <button
          onClick={() => setHeroMode((m) => (m === "grid" ? "carousel" : "grid"))}
          className="hover:bg-[rgba(216,90,48,0.18)] transition-colors cursor-pointer"
          style={{
            fontSize: 13,
            padding: "6px 14px",
            borderRadius: 9999,
            background: "rgba(216,90,48,0.10)",
            color: "#D85A30",
            border: "none",
          }}
        >
          {heroMode === "grid" ? "Carousel" : "Grid"}
        </button>
      </nav>

      {/* Hero headline — grid mode only */}
      {heroMode === "grid" && (
        <main className="relative z-10 px-16 pt-16 pb-32">
          <h1 className="text-[56px] font-bold leading-[1.2]" style={{ marginTop: "calc(56px * 1.2)" }}>
            <Link
              href="/projects/coaching"
              className="block text-[#444] hover:text-[#D85A30] transition-colors cursor-pointer no-underline w-fit"
            >
              Climbing coach.
            </Link>
            <Link
              href="/projects/content"
              className="block text-[#444] hover:text-[#D85A30] transition-colors cursor-pointer no-underline w-fit"
            >
              Content creator.
            </Link>
            <Link
              href="/projects/vibe-coder"
              className="block text-[#444] hover:text-[#D85A30] transition-colors cursor-pointer no-underline w-fit"
            >
              Vibe coder.
            </Link>
          </h1>
          <p className="mt-6 text-[16px] leading-[1.65] text-[#555] whitespace-nowrap">
            Currently coaching, creating, and coding — mostly in that order.
          </p>
        </main>
      )}

      {/* 3×3 pipe grid */}
      {heroMode === "grid" && (
        <div
          className="absolute z-10"
          style={{ left: "37%", top: "50%", transform: "translateY(-50%)" }}
        >
          <HeroGrid />
        </div>
      )}

      {/* Full-screen carousel */}
      {heroMode === "carousel" && (
        <ProjectCarousel ref={carouselRef} onActiveChange={setActiveSlide} />
      )}

      {/* Side panels (grid mode only) */}
      <AboutPanel   open={aboutOpen}   onClose={() => setAboutOpen(false)} />
      <ContactPanel open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
