"use client";

import useVariablesContext from "@/app/context/VariablesContext";
import ContactPopup from "./ContactPopup";

export default function ContactButton({ text }: { text: string }) {
  const { setIsPopupOpen } = useVariablesContext();

  const handleOpen = () => {
    setIsPopupOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="neon-border bg-transparent text-primary px-4 md:px-6 py-2 text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300 relative group overflow-hidden"
      >
        <span className="relative z-10 hidden md:block">{text}</span>
        <span className="relative z-10 md:hidden">
          {text && text.split(" ")[1]}
        </span>
        <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>

      <ContactPopup />
    </>
  );
}
