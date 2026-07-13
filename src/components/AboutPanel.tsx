"use client";

import AboutContent from "@/components/AboutContent";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AboutPanel({ open, onClose }: Props) {
  return (
    <aside
      className="fixed top-24 left-6 z-20 w-[440px] max-h-[calc(100vh-120px)] flex flex-col transition-transform duration-300 ease-in-out"
      style={{
        transform: open ? "translateX(0)" : "translateX(calc(-100% - 24px))",
        backgroundColor: "#E8623A",
        borderRadius: "20px",
        boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 pt-7 pb-5 shrink-0">
        <span className="text-[12px] font-semibold tracking-widest uppercase text-white">
          About
        </span>
        <button
          onClick={onClose}
          className="text-white opacity-70 hover:opacity-100 transition-opacity text-base leading-none"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div className="mx-8 shrink-0" style={{ borderTop: "0.5px solid rgba(255,255,255,0.25)" }} />

      <div className="scrollbar-hide flex-1 overflow-y-auto px-8 py-5">
        <AboutContent />
      </div>
    </aside>
  );
}
