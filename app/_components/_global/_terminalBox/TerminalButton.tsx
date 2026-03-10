"use client";
import useVariablesContext from "@/app/context/VariablesContext";
import { Terminal } from "lucide-react";

export default function TerminalButton() {
  const { showTerminal, setShowTerminal } = useVariablesContext();

  return (
    !showTerminal && (
      <div className="size-14 group duration-300 bg-primary animate-bounce hover:-translate-y-2 fixed bottom-16 lg:bottom-4 ltr:right-4 rtl:left-4 rounded-full  flex items-center justify-center border border-primary shadow-lg shadow-primary/50 z-9999">
        <button
          onClick={() => setShowTerminal(!showTerminal)}
          className="size-12  text-white text-lg  rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-gray-800 duration-300  bg-gray-800"
        >
          <Terminal className="" />
        </button>
      </div>
    )
  );
}
