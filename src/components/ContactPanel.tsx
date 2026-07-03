"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const offDutyItems: { id: string; title: string; desc: React.ReactNode }[] = [
  {
    id: "albums",
    title: "Swapping albums, start to finish",
    desc: (
      <>
        Your daily listening albums — singles totally count too.
        <br />
        K-pop recommendation requests also welcome.
      </>
    ),
  },
  {
    id: "beta",
    title: "Comparing beta on the same crux",
    desc: "Stuck on a problem? I promise I've got plenty of my own.",
  },
  {
    id: "route",
    title: "Planning a route to nowhere",
    desc: (
      <>
        Good routes with no real destination.
        <br />
        Bonus points if there&apos;s decent coffee at the end.
      </>
    ),
  },
];

const contactLinks = [
  { label: "Email", value: "—" },
  { label: "Instagram", value: "—" },
  { label: "Mobile", value: "—" },
];

const divider = <div style={{ borderTop: "0.5px solid rgba(255,255,255,0.15)" }} />;

export default function ContactPanel({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <aside
      className="fixed top-24 right-6 z-20 w-[400px] max-h-[calc(100vh-120px)] flex flex-col transition-transform duration-300 ease-in-out"
      style={{
        transform: open ? "translateX(0)" : "translateX(calc(100% + 24px))",
        backgroundColor: "#1A1A1A",
        borderRadius: "20px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-7 pb-5 shrink-0">
        <button
          onClick={onClose}
          className="text-white opacity-70 hover:opacity-100 transition-opacity text-base leading-none"
          aria-label="Close"
        >
          ✕
        </button>
        <span className="text-[12px] font-semibold tracking-widest uppercase text-white">
          Contact
        </span>
      </div>

      <div className="mx-8 shrink-0" style={{ borderTop: "0.5px solid rgba(255,255,255,0.15)" }} />

      {/* Content */}
      <div className="scrollbar-hide flex-1 overflow-y-auto px-8 py-6 space-y-8">
        {/* Title */}
        <h2 className="text-[28px] font-semibold leading-[1.3] text-white">
          Get in touch
        </h2>

        {/* Contact links */}
        <ul className="space-y-5">
          {contactLinks.map(({ label, value }) => (
            <li key={label} className="flex flex-col gap-1">
              <span
                className="text-[11px] font-semibold tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {label}
              </span>
              <span className="text-[15px] text-white">{value}</span>
            </li>
          ))}
        </ul>

        {divider}

        {/* Off duty */}
        <section>
          <h3 className="text-[14px] font-semibold text-white mb-5">
            A few things I&apos;d rather talk about:
          </h3>

          <ul className="-mx-5">
            {offDutyItems.map((item, i) => {
              const isOpen = expanded === item.id;
              const isLast = i === offDutyItems.length - 1;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full text-left py-4 px-5 hover:opacity-70 transition-opacity"
                  >
                    <p className="text-[14px] font-semibold text-white">{item.title}</p>
                    <p
                      className="text-[13px] leading-[1.6] mt-1"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {item.desc}
                    </p>
                  </button>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.3s ease",
                    }}
                  >
                    <div style={{ overflow: "hidden" }}>
                      <div className="pb-4 px-5">
                        <div
                          className="w-full h-36 rounded-[12px] flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.08)" }}
                        >
                          <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Photo coming soon
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {!isLast && (
                    <div
                      className="mx-5"
                      style={{ borderTop: "0.5px solid rgba(255,255,255,0.15)" }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <div className="h-2" />
      </div>
    </aside>
  );
}
