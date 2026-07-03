"use client";

import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const offDutyItems = [
  {
    id: "albums",
    title: "Swapping albums, start to finish",
    desc: "Your daily listening albums — singles totally count too. K-pop recommendation requests also welcome.",
  },
  {
    id: "beta",
    title: "Comparing beta on the same crux",
    desc: "Stuck on a problem? I promise I've got plenty of my own.",
  },
  {
    id: "route",
    title: "Planning a route to nowhere",
    desc: "Good routes with no real destination. Bonus points if there's decent coffee at the end.",
  },
];

const contactLinks = [
  { label: "Email", value: "—" },
  { label: "Instagram", value: "—" },
  { label: "Mobile", value: "—" },
];

export default function ContactPanel({ open, onClose }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <aside
      className="fixed top-24 right-6 z-20 w-[400px] max-h-[calc(100vh-120px)] flex flex-col transition-transform duration-300 ease-in-out"
      style={{
        transform: open ? "translateX(0)" : "translateX(calc(100% + 24px))",
        backgroundColor: "#FDFAF7",
        borderRadius: "20px",
        boxShadow: "0 8px 48px rgba(0,0,0,0.12)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-7 pb-5 shrink-0">
        <button
          onClick={onClose}
          className="text-[#bbb] hover:text-[#444] transition-colors text-base leading-none"
          aria-label="Close"
        >
          ✕
        </button>
        <span className="text-[12px] font-semibold tracking-widest uppercase text-[#999]">
          Contact
        </span>
      </div>

      <div className="border-t border-[#EEEEEE] mx-8 shrink-0" />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
        {/* Title */}
        <h2 className="text-[28px] font-semibold leading-[1.3] text-[#444]">
          Get in touch
        </h2>

        {/* Contact links */}
        <ul className="space-y-5">
          {contactLinks.map(({ label, value }) => (
            <li key={label} className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#bbb]">
                {label}
              </span>
              <span className="text-[15px] text-[#444]">{value}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-[#EEEEEE]" />

        {/* Off duty */}
        <section>
          <h3 className="text-[14px] font-semibold text-[#444] mb-5">
            A few things I&apos;d rather talk about:
          </h3>

          <ul>
            {offDutyItems.map((item, i) => {
              const isOpen = expanded === item.id;
              const isLast = i === offDutyItems.length - 1;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full text-left py-4 hover:opacity-70 transition-opacity"
                  >
                    <p className="text-[14px] font-semibold text-[#444]">
                      {item.title}
                    </p>
                    <p className="text-[13px] leading-[1.6] text-[#888] mt-1">
                      {item.desc}
                    </p>
                  </button>

                  {/* Photo placeholder */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? "180px" : "0px" }}
                  >
                    <div className="pb-4">
                      <div className="w-full h-36 rounded-[12px] bg-[#E8E8E8] flex items-center justify-center">
                        <span className="text-[12px] text-[#aaa]">
                          Photo coming soon
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isLast && <div className="border-t border-[#EEEEEE]" />}
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
