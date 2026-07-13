"use client";

import ContactContent from "@/components/ContactContent";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ContactPanel({ open, onClose }: Props) {
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

      <div className="scrollbar-hide flex-1 overflow-y-auto px-8 py-6">
        <ContactContent />
      </div>
    </aside>
  );
}
