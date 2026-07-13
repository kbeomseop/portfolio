"use client";

import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import Link from "next/link";
import AboutContent from "@/components/AboutContent";
import ContactContent from "@/components/ContactContent";

export type CarouselHandle = { scrollToIndex: (i: number) => void };

const CARD_H = "min(640px, calc(100vh - 152px))";

const projectCards = [
  {
    key: "coach",
    label: "Coaching",
    title: "Climbing coach",
    gradient: "linear-gradient(160deg, #F9E0D0 0%, #F0B393 100%)",
    href: "/projects/coaching",
  },
  {
    key: "sns",
    label: "Content",
    title: "Content creator",
    gradient: "linear-gradient(160deg, #FAEFC9 0%, #EFD98A 100%)",
    href: "/projects/content",
  },
  {
    key: "coding",
    label: "Vibe coding",
    title: "Vibe coder",
    gradient: "linear-gradient(160deg, #E2DFF5 0%, #B9AFE6 100%)",
    href: "/projects/vibe-coder",
  },
];

interface Props {
  onActiveChange: (index: number) => void;
}

const ProjectCarousel = forwardRef<CarouselHandle, Props>(({ onActiveChange }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useImperativeHandle(ref, () => ({
    scrollToIndex: (i: number) => {
      const card = cardRefs.current[i];
      const container = containerRef.current;
      if (!card || !container) return;
      container.scrollTo({ left: card.offsetLeft - 96, behavior: "smooth" });
    },
  }));

  // Wheel → horizontal scroll (passive:false so preventDefault works)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY + e.deltaX;
    };
    container.addEventListener("wheel", handler, { passive: false });
    return () => container.removeEventListener("wheel", handler);
  }, []);

  // Active card detection via scroll position
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let lastActive = -1;
    const handler = () => {
      const center = container.scrollLeft + container.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - cardCenter);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      if (closest !== lastActive) {
        lastActive = closest;
        onActiveChange(closest);
      }
    };
    container.addEventListener("scroll", handler, { passive: true });
    return () => container.removeEventListener("scroll", handler);
  }, [onActiveChange]);

  return (
    <div
      ref={containerRef}
      className="scrollbar-hide"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        top: 88,
        bottom: 0,
        overflowX: "auto",
        overflowY: "hidden",
        display: "flex",
        alignItems: "center",
        gap: 56,
        padding: "0 96px",
        zIndex: 20,
      }}
    >
      {/* About card */}
      <div
        ref={(el) => { cardRefs.current[0] = el; }}
        style={{
          flexShrink: 0,
          width: 440,
          height: CARD_H,
          borderRadius: 20,
          backgroundColor: "#E8623A",
          boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "28px 32px 20px", flexShrink: 0 }}>
          <span style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#fff",
          }}>
            ABOUT
          </span>
        </div>
        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.25)", margin: "0 32px", flexShrink: 0 }} />
        <div className="scrollbar-hide flex-1 overflow-y-auto" style={{ padding: "20px 32px" }}>
          <AboutContent />
        </div>
      </div>

      {/* Project cards */}
      {projectCards.map((card, i) => (
        <Link
          key={card.key}
          href={card.href}
          ref={(el) => { cardRefs.current[i + 1] = el as HTMLElement | null; }}
          className="hover:-translate-y-[6px] transition-[transform] duration-[250ms] ease-out"
          style={{
            flexShrink: 0,
            width: 900,
            height: CARD_H,
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 24px 60px rgba(0,0,0,0.16)",
            background: card.gradient,
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div style={{ padding: "48px 48px 0", flexShrink: 0 }}>
            <p style={{
              fontSize: 13, fontWeight: 600, letterSpacing: "1.5px",
              textTransform: "uppercase", color: "rgba(0,0,0,0.45)",
            }}>
              {card.label}
            </p>
            <h3 style={{ fontSize: 40, fontWeight: 700, color: "#1a1a1a", marginTop: 8 }}>
              {card.title}
            </h3>
          </div>
          {/* Preview placeholder — fills remaining card height, clipped by overflow:hidden */}
          <div style={{
            flex: 1,
            margin: "32px 48px 0",
            borderRadius: "16px 16px 0 0",
            background: "rgba(255,255,255,0.5)",
            border: "1px solid rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{ fontSize: 13, color: "#888" }}>[ preview ]</span>
          </div>
        </Link>
      ))}

      {/* Contact card */}
      <div
        ref={(el) => { cardRefs.current[4] = el; }}
        style={{
          flexShrink: 0,
          width: 400,
          height: CARD_H,
          borderRadius: 20,
          backgroundColor: "#1A1A1A",
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "28px 32px 20px", flexShrink: 0 }}>
          <span style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#fff",
          }}>
            CONTACT
          </span>
        </div>
        <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.15)", margin: "0 32px", flexShrink: 0 }} />
        <div className="scrollbar-hide flex-1 overflow-y-auto" style={{ padding: "24px 32px" }}>
          <ContactContent />
        </div>
      </div>
    </div>
  );
});

ProjectCarousel.displayName = "ProjectCarousel";
export default ProjectCarousel;
