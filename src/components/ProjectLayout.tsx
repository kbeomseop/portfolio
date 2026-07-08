"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export interface ProjectSection {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface Props {
  categoryLabel: string;
  title: React.ReactNode;
  sections: ProjectSection[];
  heroImages?: string[];
}

const PLACEHOLDER_BG = ["#F0EBE7", "#EDE4DE", "#F2E9E2"];

export default function ProjectLayout({ categoryLabel, title, sections, heroImages }: Props) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideResetKey, setSlideResetKey] = useState(0);

  const slideCount = heroImages ? heroImages.length : 3;

  // Carousel auto-advance; slideResetKey increments on dot click to reset the interval
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 4000);
    return () => clearInterval(id);
  }, [slideCount, slideResetKey]);

  // Section highlight via IntersectionObserver (viewport-based)
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(section.id);
        },
        { root: null, rootMargin: "-20% 0px -65% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveId(id);
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 96,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section
        style={{
          width: "100%",
          minHeight: 560,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 64,
          paddingBottom: 0,
          background: "linear-gradient(160deg, #FDF6F2 0%, #F9E4D8 55%, #F6D8C6 100%)",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(216,90,48,0.14) 0%, transparent 100%)",
          }}
        />

        {/* Back link */}
        <Link
          href="/"
          className="hover:text-[#444] transition-colors"
          style={{
            position: "absolute",
            top: 32,
            left: 48,
            zIndex: 10,
            fontSize: 13,
            color: "#999",
            textDecoration: "none",
          }}
        >
          ← Back
        </Link>

        {/* Category label */}
        <p
          style={{
            fontSize: 13,
            color: "#B06845",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 12,
            zIndex: 1,
          }}
        >
          {categoryLabel}
        </p>

        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#1a1a1a",
            maxWidth: 760,
            zIndex: 1,
          }}
        >
          {title}
        </h1>

        {/* Carousel */}
        <div
          style={{
            marginTop: 48,
            zIndex: 1,
            position: "relative",
            width: 720,
            height: 400,
            borderRadius: "20px 20px 0 0",
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
          }}
        >
          {Array.from({ length: slideCount }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: currentSlide === i ? 1 : 0,
                transition: "opacity 0.6s ease-in-out",
                background: heroImages ? undefined : PLACEHOLDER_BG[i],
              }}
            >
              {heroImages ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={heroImages[i]}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{ fontSize: 13, color: "#bbb" }}>[ photo {i + 1} ]</span>
              )}
            </div>
          ))}

          {/* Dot indicators */}
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 8,
              zIndex: 2,
            }}
          >
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentSlide(i);
                  setSlideResetKey((k) => k + 1);
                }}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  background: currentSlide === i ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sidebar + Content ── */}
      <div className="flex justify-center">
        <div className="w-full max-w-[1100px] flex">

          {/* Sidebar */}
          <aside
            className="w-[200px] shrink-0 flex flex-col pt-10 pb-8"
            style={{
              borderRight: "0.5px solid #EEEEEE",
              position: "sticky",
              top: 0,
              height: "100vh",
              alignSelf: "flex-start",
            }}
          >
            <nav>
              <ul className="flex flex-col gap-5">
                {sections.map((section) => {
                  const isActive = activeId === section.id;
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className="w-full text-left text-[13px] transition-colors"
                        style={
                          isActive
                            ? {
                                color: "#D85A30",
                                borderLeft: "2px solid #D85A30",
                                paddingLeft: "12px",
                              }
                            : {
                                color: "#999",
                                paddingLeft: "14px",
                              }
                        }
                      >
                        {section.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            <div className="px-16 pt-16 pb-12">
              <div className="space-y-20">
                {sections.map((section) => (
                  <section key={section.id} id={section.id}>
                    {section.content}
                  </section>
                ))}
              </div>
              <div className="h-16" />
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
