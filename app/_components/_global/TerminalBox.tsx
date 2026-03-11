"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import useVariablesContext from "../../context/VariablesContext";
import TerminalButton from "./_terminalBox/TerminalButton";
import {
  GMAIL_ASCII,
  HELP_OUTPUT,
  PROMPT,
  STARTUP_SEQUENCE,
  VALID_NAV_PATHS,
  WHATSAPP_ASCII,
} from "./_terminalBox/Terminalcontent";

interface HistoryLine {
  id: number;
  type: "system" | "user" | "response" | "error";
  text: string | React.ReactNode;
}

export default function TerminalBox() {
  const router = useRouter();

  const { showTerminal, setShowTerminal, terminalCommand, setTerminalCommand } =
    useVariablesContext();

  const [history, setHistory] = useState<HistoryLine[]>(() =>
    STARTUP_SEQUENCE.map((text, i) => ({
      id: i + 1,
      type: "system" as const,
      text,
    })),
  );
  const [inputValue, setInputValue] = useState("");
  const [idCounter, setIdCounter] = useState(STARTUP_SEQUENCE.length + 1);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on every history change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const addLines = useCallback(
    (lines: Omit<HistoryLine, "id">[], startId: number) => {
      const newLines = lines.map((l, i) => ({ ...l, id: startId + i }));
      setHistory((prev) => [...prev, ...newLines]);
      setIdCounter(startId + lines.length);
    },
    [],
  );

  const handleCommandInternal = useCallback(
    (raw: string) => {
      const userLine: Omit<HistoryLine, "id"> = {
        type: "user",
        text: `${PROMPT} ${raw}`,
      };

      const parts = raw.split(" ");
      const cmd = parts[0].toLowerCase();
      const arg = parts[1];

      let responseLines: Omit<HistoryLine, "id">[] = [];

      // Normalize command logic to support both slash and non-slash variants for specific commands
      const baseCmd = cmd.startsWith("/") ? cmd : "/" + cmd;

      switch (baseCmd) {
        case "/h":
        case "/help":
          responseLines = [{ type: "response", text: HELP_OUTPUT }];
          break;

        case "/nav":
          if (!arg) {
            responseLines = [
              {
                type: "error",
                text: "Error: No path provided. Usage: /nav [path]",
              },
            ];
          } else if (
            VALID_NAV_PATHS.includes(arg) ||
            arg.startsWith("/projects/")
          ) {
            responseLines = [
              { type: "response", text: `Navigating to ${arg}...` },
            ];
            router.push(arg);
          } else {
            responseLines = [
              {
                type: "error",
                text: `Error: Unknown path '${arg}'. Type /h for valid paths.`,
              },
            ];
          }
          break;

        case "/contact":
          responseLines = [
            { type: "response", text: WHATSAPP_ASCII },
            { type: "response", text: GMAIL_ASCII },
          ];
          break;

        case "/clear":
          setHistory([]);
          setIdCounter(1);
          return;

        case "/close":
          // Clear history before closing as requested
          setHistory([]);
          setIdCounter(1);
          setShowTerminal(false);
          break;

        default:
          responseLines = [
            {
              type: "error",
              text: `Command not found: '${cmd}'. Type /h for help.`,
            },
          ];
      }

      const nextId = idCounter;
      const allNewLines = [userLine, ...responseLines];
      addLines(allNewLines, nextId);
    },
    [idCounter, addLines, router, setShowTerminal],
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputValue.trim();
    if (!raw) return;
    handleCommandInternal(raw);
    setInputValue("");
  };

  // Watch for external terminal commands from context
  useEffect(() => {
    if (terminalCommand) {
      // Use setTimeout to avoid synchronous setState inside useEffect (prevents cascading renders)
      const timeout = setTimeout(() => {
        handleCommandInternal(terminalCommand);
        setTerminalCommand(null); // Reset command after execution
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [terminalCommand, handleCommandInternal, setTerminalCommand]);

  if (!showTerminal) return <TerminalButton />;

  return (
    <AnimatePresence>
      <motion.div
        key="terminal"
        dir="ltr"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 200, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed bottom-0 left-0 right-0 w-full z-999999"
      >
        <div className="terminal-module overflow-hidden shadow-[0_-5px_20px_rgba(0,240,255,0.15)] bg-[#050a0f]/90 backdrop-blur-md border-t border-(--color-terminal-border) relative transition-all duration-300 hover:shadow-[0_-5px_30px_rgba(0,240,255,0.25)]">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-60"></div>

          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="bg-[#0a151a] border-b border-(--color-terminal-border) px-4 py-2 flex items-center justify-between">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setHistory([]);
                  setIdCounter(1);
                  setShowTerminal(false);
                }}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 shadow-[0_0_5px_rgba(239,68,68,0.5)] transition-colors focus:outline-none"
                aria-label="Close terminal"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
            </div>

            <div className="text-[10px] text-primary opacity-70  tracking-widest uppercase">
              [ SYS_TERMINAL_V1.0 — INTERACTIVE ]
            </div>
            <div className="w-[44px]" />
          </div>

          {/* ── Body ───────────────────────────────────────────────── */}
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="container-section p-4 h-[25vh] min-h-[160px] overflow-y-auto  text-sm text-primary relative z-10 cursor-text hidden-scrollbar"
          >
            {history.map((line) => (
              <div
                key={line.id}
                className={`mb-1 leading-relaxed ${
                  line.type === "error"
                    ? "text-red-400"
                    : line.type === "user"
                      ? "text-white/70"
                      : "text-glow opacity-90"
                }`}
              >
                {line.text}
              </div>
            ))}

            <form
              onSubmit={handleFormSubmit}
              className="mt-2 flex items-center gap-2"
            >
              <span className="shrink-0 text-primary text-glow opacity-90 select-none">
                {PROMPT}
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="bg-transparent border-none outline-none text-white w-full caret-primary"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
