/**
 * Shared types for the TerminalBox module.
 */

import type { ReactNode } from "react";

/** A single line in the terminal output history */
export interface HistoryLine {
  id: number;
  type: "system" | "user" | "response" | "error";
  text: string | ReactNode;
}

/** Reducer state for terminal lines and ID counter */
export interface TerminalState {
  lines: HistoryLine[];
  nextId: number;
}

/** Reducer actions */
export type TerminalAction =
  | { type: "ADD_LINES"; lines: Omit<HistoryLine, "id">[] }
  | { type: "CLEAR" };

/**
 * Context passed to every command handler at invocation time.
 * Provides access to router, terminal controls, and command history.
 */
export interface CommandContext {
  router: ReturnType<typeof import("next/navigation").useRouter>;
  setShowTerminal: (show: boolean) => void;
  addLines: (lines: Omit<HistoryLine, "id">[]) => void;
  clearScreen: () => void;
  getCommandHistory: () => string[];
  navigate: (path: string) => void;
}

/** The result returned by a command handler */
export interface CommandResult {
  lines: Omit<HistoryLine, "id">[];
  /** If true, the user's input line will NOT be added to history (for clear/close). */
  skipUserLine?: boolean;
}

/** A command entry in the registry */
export interface CommandEntry {
  handler: (args: string[], context: CommandContext) => CommandResult;
  description: string;
  usage?: string;
  aliases?: string[];
}
