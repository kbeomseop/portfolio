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

  const toggle = (id: string) => setExpanded((prev) => (prev === id ? null : id));

  return (
    <aside
      className="fixed top-0 right-0 h-full w-[420px] z-20 flex flex-col transition-transform duration-300 ease-in-out"
      style={{
        transform: open ? "translateX(0)" : "translateX(100%)",
        backgroundColor: "#FDFAF7",
        boxShadow: open ? "-4px 0 40px rgba(0,0,0,0.10)" : "none",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-10 py-8 border-b border-[#EEEEEE]">
        <button
          onClick={onClose}
          className="text-[#999] hover:text-[#444] transition-colors text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>
        <span className="text-[13px] font-semibold tracking-widest uppercase text-[#999]">
          Contact
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10">
        {/* Title */}
        <section>
          <h2 className="text-[32px] font-semibold leading-[1.3] text-[#444]">
            Get in touch
          </h2>
        </section>

        {/* Contact links */}
        <section>
          <ul className="space-y-5">
            {contactLinks.map(({ label, value }) => (
              <li key={label} className="flex flex-col gap-1">
                <span className="text-[13px] font-semibold tracking-widest uppercase text-[#999]">
                  {label}
                </span>
                <span className="text-[16px] text-[#444]">{value}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="border-t border-[#EEEEEE]" />

        {/* Off duty accordion */}
        <section>
          <h3 className="text-[15px] font-semibold text-[#444] mb-5">
            A few things I&apos;d rather talk about:
          </h3>
          <ul className="space-y-2">
            {offDutyItems.map((item) => {
              const isOpen = expanded === item.id;
              return (
                <li key={item.id} className="border border-[#EEEEEE] rounded-[12px] overflow-hidden">
                  <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-black/[0.02] transition-colors"
                  >
                    <span className="text-[14px] font-semibold text-[#444]">
                      {item.title}
                    </span>
                    <span
                      className="text-[#999] text-lg leading-none transition-transform duration-200 shrink-0 ml-3"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      +
                    </span>
                  </button>

                  {/* Accordion body */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? "280px" : "0px" }}
                  >
                    <div className="px-5 pb-5 space-y-3">
                      {/* Photo placeholder */}
                      <div className="w-full h-36 rounded-[8px] bg-[#EEEEEE] flex items-center justify-center">
                        <span className="text-[13px] text-[#999]">Photo coming soon</span>
                      </div>
                      <p className="text-[14px] leading-[1.6] text-[#666]">{item.desc}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </aside>
  );
}
