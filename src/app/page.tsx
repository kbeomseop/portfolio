"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AboutPanel from "@/components/AboutPanel";
import ContactPanel from "@/components/ContactPanel";
import HeroGrid from "@/components/HeroGrid";
import ProjectCarousel, { type CarouselHandle } from "@/components/ProjectCarousel";

const CAROUSEL_LABELS = ["About", "Coaching", "Content", "Vibe coding", "Contact"];

const STATUS_TEXT = "Moving to Auckland — September 2026 · Working Holiday Visa · Open to climbing gym roles";
// 오클랜드 도착 후 아래로 교체:
// const STATUS_TEXT = "Currently in Auckland · Working Holiday Visa · Open to climbing gym roles";

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
      <nav className="relative z-30 flex items-center justify-between px-5 py-6 md:px-16 md:py-8">
        {/* Left group */}
        <div className="flex items-center gap-6 md:gap-12 min-w-0">
          <span className="text-[15px] font-semibold tracking-tight text-[#444] leading-none whitespace-nowrap">
            Beomseop Kim
          </span>

          {heroMode === "grid" ? (
            /* Grid mode: About + Contact panel toggles */
            <div className="flex items-center gap-5 md:gap-8">
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
            <div className="flex items-center gap-4 md:gap-7 overflow-x-auto scrollbar-hide min-w-0">
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
                    whiteSpace: "nowrap",
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
        <main className="relative z-10 px-5 pt-8 pb-20 md:px-16 md:pt-16 md:pb-32">
          <div
            className="inline-flex items-center w-fit text-[12px] md:text-[13px] px-3 py-[5px] md:px-[14px] md:py-[6px] mt-8 md:mt-[67px]"
            style={{
              gap: 8,
              fontWeight: 500,
              color: "#993C1D",
              background: "#FAECE7",
              border: "1px solid #F0997B",
              borderRadius: 9999,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#D85A30",
                flexShrink: 0,
              }}
            />
            {STATUS_TEXT}
          </div>
          <h1 className="text-[34px] sm:text-[44px] md:text-[56px] font-bold leading-[1.2]" style={{ marginTop: 20 }}>
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
          <p className="mt-6 text-[16px] leading-[1.65] text-[#555] md:whitespace-nowrap">
            Currently coaching, creating, and coding — mostly in that order.
          </p>
        </main>
      )}

      {/* 3×3 pipe grid */}
      {heroMode === "grid" && (
        <div
          className="hidden md:block absolute z-10"
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
