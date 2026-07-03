"use client";

import { useState, useEffect, useRef } from "react";
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
}

export default function ProjectLayout({ categoryLabel, title, sections }: Props) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(section.id);
        },
        { root: container, rootMargin: "0px 0px -65% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    const container = contentRef.current;
    if (!el || !container) return;
    setActiveId(id);
    container.scrollTo({ top: el.offsetTop - 48, behavior: "smooth" });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <aside className="w-[200px] shrink-0 h-full flex flex-col pt-10 pb-8" style={{ borderRight: "0.5px solid #EEEEEE" }}>
        <Link
          href="/"
          className="text-[13px] text-[#999] hover:text-[#444] transition-colors px-6 mb-10 block"
        >
          ← Back
        </Link>

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
      <main ref={contentRef} className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-14 py-12">
          {/* Header */}
          <p className="text-[13px] text-[#999] mb-3">{categoryLabel}</p>
          <h1 className="text-[32px] font-bold leading-[1.3] text-[#1a1a1a]">{title}</h1>

          {/* Hero image placeholder */}
          <div
            className="mt-8 w-full h-[200px] rounded-[8px] flex items-center justify-center"
            style={{ background: "#f7f7f5", border: "0.5px solid #eee" }}
          >
            <span className="text-[13px] text-[#bbb]">[ photo placeholder ]</span>
          </div>

          {/* Sections */}
          <div className="mt-14 space-y-20">
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
  );
}
