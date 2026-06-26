"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import useVariablesContext from "../../context/VariablesContext";
import TerminalButton from "./_terminalBox/TerminalButton";
import {
  executeCommand,
  getCompletions,
  getAllCommandNames,
} from "./_terminalBox/commands";
import type { HistoryLine, TerminalState, TerminalAction } from "./_terminalBox/types";
import {
  PROMPT,
  STARTUP_SEQUENCE,
} from "./_terminalBox/Terminalcontent";

// ─── Reducer ───────────────────────────────────────────────────────────────

function terminalReducer(
  state: TerminalState,
  action: TerminalAction,
): TerminalState {
  switch (action.type) {
    case "ADD_LINES": {
      const newLines: HistoryLine[] = action.lines.map((l, i) => ({
        ...l,
        id: state.nextId + i,
      }));
      return {
        lines: [...state.lines, ...newLines],
        nextId: state.nextId + action.lines.length,
      };
    }
    case "CLEAR":
      return { lines: [], nextId: 1 };
    default:
      return state;
  }
}

function createInitialState(): TerminalState {
  const startupLines: HistoryLine[] = STARTUP_SEQUENCE.map((text, i) => ({
    id: i + 1,
    type: "system" as const,
    text,
  }));
  return { lines: startupLines, nextId: startupLines.length + 1 };
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function TerminalBox() {
  const router = useRouter();

  const { showTerminal, setShowTerminal, terminalCommand, setTerminalCommand } =
    useVariablesContext();

  const [state, dispatch] = useReducer(
    terminalReducer,
    undefined,
    createInitialState,
  );
  const [inputValue, setInputValue] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showTabComplete, setShowTabComplete] = useState(false);
  const [tabMatches, setTabMatches] = useState<string[]>([]);
  const [tabSelectedIndex, setTabSelectedIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandHistoryRef = useRef<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const MAX_HISTORY = 50;

  // ── Auto-scroll ────────────────────────────────────────────────────────

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [state.lines]);

  // ── Auto-focus when terminal opens ─────────────────────────────────────

  useEffect(() => {
    if (showTerminal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showTerminal]);

  // ── Stable helpers ─────────────────────────────────────────────────────

  const addLines = useCallback((lines: Omit<HistoryLine, "id">[]) => {
    dispatch({ type: "ADD_LINES", lines });
  }, []);

  const clearScreen = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  // ── Command execution ───────────────────────────────────────────────────

  const handleCommandInternal = useCallback(
    (raw: string) => {
      // Save to command history buffer
      const history = commandHistoryRef.current;
      const trimmed = raw.trim();
      if (trimmed) {
        if (
          history.length === 0 ||
          history[history.length - 1] !== trimmed
        ) {
          history.push(trimmed);
          if (history.length > MAX_HISTORY) history.shift();
        }
      }
      commandHistoryRef.current = history;
      setHistoryIndex(-1);

      const userLine: Omit<HistoryLine, "id"> = {
        type: "user",
        text: `${PROMPT} ${raw}`,
      };

      const context = {
        router,
        setShowTerminal,
        addLines,
        clearScreen,
        getCommandHistory: () => commandHistoryRef.current,
        navigate: (path: string) => router.push(path),
      };

      const result = executeCommand(raw, context);

      if (!result.skipUserLine && trimmed) {
        addLines([userLine, ...result.lines]);
      } else if (result.lines.length > 0) {
        addLines(result.lines);
      }
    },
    [router, setShowTerminal, addLines, clearScreen],
  );

  // ── Form submit ────────────────────────────────────────────────────────

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputValue.trim();
    if (!raw) return;
    handleCommandInternal(raw);
    setInputValue("");
    setShowTabComplete(false);
  };

  // ── Key handler (history, tab completion, shortcuts) ────────────────────

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const history = commandHistoryRef.current;

    // ── ArrowUp / ArrowDown (command history) ────────────────────────
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const newIndex =
        historyIndex === -1
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInputValue(history[newIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex === history.length - 1) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(history[newIndex]);
      }
      return;
    }

    // ── Tab (completion) ─────────────────────────────────────────────
    if (e.key === "Tab") {
      e.preventDefault();
      if (!inputValue.trim()) {
        // Show all commands
        const all = getAllCommandNames();
        if (all.length > 0) {
          setTabMatches(all);
          setTabSelectedIndex(0);
          setShowTabComplete(!showTabComplete);
        }
        return;
      }

      if (showTabComplete) {
        // Cycle through matches
        if (tabMatches.length === 0) return; // guard mod-by-zero
        const nextIndex = (tabSelectedIndex + 1) % tabMatches.length;
        setTabSelectedIndex(nextIndex);
        setInputValue(tabMatches[nextIndex]);
        return;
      }

      const matches = getCompletions(inputValue);
      if (matches.length === 1) {
        // Single match — auto-complete
        setInputValue(matches[0]);
      } else if (matches.length > 1) {
        setTabMatches(matches);
        setTabSelectedIndex(0);
        setShowTabComplete(true);
      }
      return;
    }

    // ── Escape (close or dismiss tab complete) ──────────────────────
    if (e.key === "Escape") {
      if (showTabComplete) {
        e.preventDefault();
        setShowTabComplete(false);
        return;
      }
      e.preventDefault();
      clearScreen();
      setShowTerminal(false);
      return;
    }

    // ── Ctrl+L (clear) ──────────────────────────────────────────────
    if ((e.ctrlKey || e.metaKey) && e.key === "l") {
      e.preventDefault();
      clearScreen();
      return;
    }

    // ── Ctrl+D (close) ──────────────────────────────────────────────
    if ((e.ctrlKey || e.metaKey) && e.key === "d") {
      e.preventDefault();
      clearScreen();
      setShowTerminal(false);
      return;
    }

    // ── Ctrl+U (clear line) ─────────────────────────────────────────
    if ((e.ctrlKey || e.metaKey) && e.key === "u") {
      e.preventDefault();
      setInputValue("");
      return;
    }

    // Dismiss tab complete on any other keypress
    if (showTabComplete) {
      setShowTabComplete(false);
    }
  };

  // ── Tab complete click handler ─────────────────────────────────────────

  const handleTabClick = (match: string) => {
    setInputValue(match);
    setShowTabComplete(false);
    inputRef.current?.focus();
  };

  // ── Watch for external terminal commands from context ──────────────────

  useEffect(() => {
    if (terminalCommand) {
      const timeout = setTimeout(() => {
        handleCommandInternal(terminalCommand);
        setTerminalCommand(null);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [terminalCommand, setTerminalCommand, handleCommandInternal]);

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <>
      {/* TerminalButton always renders (it self-hides via its own !showTerminal check).
          Keeping it outside AnimatePresence avoids breaking its own exit animation. */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            key="terminal"
            dir="ltr"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed bottom-0 left-0 right-0 w-full z-999999"
          >
        <div className="terminal-module overflow-hidden shadow-[0_-5px_20px_rgba(0,240,255,0.15)] bg-[#050a0f]/90 backdrop-blur-md border-t border-(--color-terminal-border) relative transition-all duration-300 hover:shadow-[0_-5px_30px_rgba(0,240,255,0.25)]">
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-60"></div>

          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="bg-[#0a151a] border-b border-(--color-terminal-border) px-4 py-2 flex items-center justify-between">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => {
                  clearScreen();
                  setShowTerminal(false);
                }}
                className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 shadow-[0_0_5px_rgba(239,68,68,0.5)] transition-colors focus:outline-none"
                aria-label="Close terminal"
              />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
            </div>

            <div className="text-[10px] text-primary opacity-70 tracking-widest uppercase ibm-plex-mono-regular">
              [ SYS_TERMINAL_V1.0 — INTERACTIVE ]
            </div>
            <div className="w-[44px]" />
          </div>

          {/* ── Body ───────────────────────────────────────────────── */}
          {/* Reduced from 70vh to 35vh mobile / 25vh desktop so terminal
              doesn't dominate the viewport, especially on small screens. */}
          <div className="flex flex-col h-full max-h-[35vh] sm:max-h-[25vh]">
            {/* History area */}
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              role="log"
              aria-live="polite"
              className="flex-1 overflow-y-auto px-4 py-3 sm:px-6 sm:py-4 text-sm max-sm:text-xs max-sm:px-3 max-sm:py-2 text-primary relative z-10 cursor-text terminal-scrollbar ibm-plex-mono-regular"
              style={{ minHeight: "100px" }}
            >
              {/* Scanline overlay */}
              <div
                className="scanline-overlay"
                aria-hidden="true"
              />

              {state.lines.map((line) => (
                <div
                  key={line.id}
                  className={`mb-1 leading-relaxed ibm-plex-mono-regular ${
                    line.type === "error"
                      ? "text-red-400"
                      : line.type === "user"
                        ? "text-white/70"
                        : line.type === "response"
                          ? "text-[#00ff88] text-glow"
                          : "text-primary text-glow"
                  }`}
                >
                  {line.text}
                </div>
              ))}
            </div>

            {/* Input area (pinned to bottom) */}
            <div className="shrink-0 relative">
              {/* Tab completion overlay */}
              {showTabComplete && tabMatches.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 z-20 mx-4 mb-1 max-sm:mx-3">
                  <div className="bg-[#0a151a] border border-primary/30 rounded-lg overflow-hidden shadow-lg shadow-primary/10">
                    <div className="px-3 py-1.5 text-[10px] text-primary/50 tracking-wider uppercase ibm-plex-mono-regular">
                      Tab completion ({tabMatches.length} matches)
                    </div>
                    <div className="max-h-[120px] overflow-y-auto">
                      {tabMatches.map((match, i) => (
                        <button
                          key={match}
                          onClick={() => handleTabClick(match)}
                          onMouseEnter={() => setTabSelectedIndex(i)}
                          className={`w-full text-left px-3 py-1 text-xs ibm-plex-mono-regular transition-colors ${
                            i === tabSelectedIndex
                              ? "bg-primary/20 text-primary"
                              : "text-white/60 hover:bg-white/5 hover:text-white/80"
                          }`}
                        >
                          {match}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleFormSubmit}
                className="flex items-center gap-2 px-4 py-2 border-t border-(--color-terminal-border) max-sm:px-3 max-sm:py-1.5"
              >
                <span className="shrink-0 text-primary text-glow opacity-90 select-none ibm-plex-mono-regular text-sm max-sm:text-xs">
                  {PROMPT}
                </span>
                {/* Terminal cursor indicator after prompt */}
                <span className="terminal-cursor" aria-hidden="true" />
                <div className="relative flex-1 flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-white w-full ibm-plex-mono-regular text-sm max-sm:text-xs"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    aria-label="Terminal command input"
                    style={{ caretColor: "var(--color-primary)" }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
          </motion.div>
        )}
      </AnimatePresence>
      <TerminalButton />
    </>
  );
}
