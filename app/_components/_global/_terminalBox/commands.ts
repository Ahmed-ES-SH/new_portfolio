/**
 * Command registry for the terminal.
 *
 * Every command handler receives `(args, context)` and returns a `CommandResult`.
 * The registry is a plain Map keyed by the command name (without leading slash).
 * Aliases point to the same canonical entry.
 */

import type { CommandContext, CommandEntry, CommandResult } from "./types";
import {
  GMAIL_ASCII,
  HELP_OUTPUT,
  PROMPT,
  VALID_NAV_PATHS,
  WHATSAPP_ASCII,
  BANNER_ASCII,
  SOCIAL_OUTPUT,
} from "./Terminalcontent";
import { projectsConfig } from "@/app/lib/projects-data";

// ─── Levenshtein distance (fuzzy suggestion) ───────────────────────────────

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// ─── Registry ──────────────────────────────────────────────────────────────

const registry = new Map<string, CommandEntry>();
const aliasMap = new Map<string, string>(); // alias → canonical name

function register(
  name: string,
  entry: CommandEntry,
  aliases: string[] = [],
): void {
  registry.set(name, entry);
  for (const alias of aliases) {
    aliasMap.set(alias, name);
  }
}

// ─── Handlers ──────────────────────────────────────────────────────────────

// /help
register("help", {
  handler: () => ({ lines: [{ type: "response", text: HELP_OUTPUT }] }),
  description: "Show this help menu",
  usage: "help",
  aliases: ["h"],
});

// /nav [path]
register("nav", {
  handler: (args, context) => {
    if (!args[0]) {
      return {
        lines: [
          {
            type: "error",
            text: "Error: No path provided. Usage: nav [path]",
          },
        ],
      };
    }
    const path = args[0];
    if (VALID_NAV_PATHS.includes(path) || path.startsWith("/projects/")) {
      context.navigate(path);
      return { lines: [{ type: "response", text: `Navigating to ${path}...` }] };
    }
    return {
      lines: [
        {
          type: "error",
          text: `Error: Unknown path '${path}'. Type help for valid paths.`,
        },
      ],
    };
  },
  description: "Navigate to a page",
  usage: "nav [path]",
});

// /contact
register("contact", {
  handler: () => ({
    lines: [
      { type: "response", text: WHATSAPP_ASCII },
      { type: "response", text: GMAIL_ASCII },
    ],
  }),
  description: "Get contact information",
  usage: "contact",
});

// /clear — with aliases: cls
register("clear", {
  handler: (_args, context) => {
    context.clearScreen();
    return { lines: [], skipUserLine: true };
  },
  description: "Clear the terminal history",
  usage: "clear",
  aliases: ["cls"],
});

// /close — with alias: exit
register("close", {
  handler: (_args, context) => {
    context.clearScreen();
    context.setShowTerminal(false);
    return { lines: [], skipUserLine: true };
  },
  description: "Close the terminal window",
  usage: "close",
  aliases: ["exit"],
});

// ls — navigate to /projects (alias-like convenience)
register("ls", {
  handler: (_args, context) => {
    context.navigate("/projects");
    return { lines: [{ type: "response", text: "Navigating to /projects..." }] };
  },
  description: "List projects (navigate to /projects)",
  usage: "ls",
});

// history — show command history buffer
register("history", {
  handler: (_args, context) => {
    const history = context.getCommandHistory();
    if (history.length === 0) {
      return { lines: [{ type: "response", text: "No commands in history." }] };
    }
    const lines = history.map(
      (cmd, i) =>
        `${String(i + 1).padStart(3, " ")}  ${PROMPT} ${cmd}`,
    );
    return {
      lines: [
        { type: "system", text: `Command history (${history.length}):` },
        ...lines.map((text) => ({ type: "response" as const, text })),
      ],
    };
  },
  description: "Show command history",
  usage: "history",
});

// whoami
register("whoami", {
  handler: () => ({
    lines: [
      { type: "response", text: "Ahmed Ismail — Full-Stack Developer" },
      { type: "response", text: "Portfolio: ahmedismail.dev" },
      { type: "system", text: "You are authenticated as: ahmedismaildev" },
    ],
  }),
  description: "Display current user identity",
  usage: "whoami",
});

// date
register("date", {
  handler: () => ({
    lines: [
      {
        type: "response",
        text: new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        }),
      },
    ],
  }),
  description: "Show current date and time",
  usage: "date",
});

// echo [text...]
register("echo", {
  handler: (args) => ({
    lines: [{ type: "response", text: args.join(" ") || "" }],
  }),
  description: "Echo the input text",
  usage: "echo [text...]",
});

// banner
register("banner", {
  handler: () => ({
    lines: [{ type: "system", text: BANNER_ASCII }],
  }),
  description: "Display the ASCII banner",
  usage: "banner",
});

// social
register("social", {
  handler: () => ({
    lines: [{ type: "response", text: SOCIAL_OUTPUT }],
  }),
  description: "Show social links and contact info",
  usage: "social",
});

// repo [slug]
register("repo", {
  handler: (args) => {
    if (!args[0]) {
      const slugs = projectsConfig.map((p) => p.slug).join(", ");
      return {
        lines: [
          {
            type: "error",
            text: `Usage: repo [slug]. Available slugs: ${slugs}`,
          },
        ],
      };
    }
    const slug = args[0];
    const project = projectsConfig.find((p) => p.slug === slug);
    if (!project) {
      return {
        lines: [
          {
            type: "error",
            text: `Project '${slug}' not found. Type 'repo' to see available slugs.`,
          },
        ],
      };
    }
    if (!project.linkSourceCode) {
      return {
        lines: [
          {
            type: "error",
            text: `No source code link for '${project.title.en}'.`,
          },
        ],
      };
    }
    window.open(project.linkSourceCode, "_blank");
    return {
      lines: [
        {
          type: "response",
          text: `Opening ${project.title.en} repository...`,
        },
      ],
    };
  },
  description: "Open a project's source code repository",
  usage: "repo [slug]",
});

// ─── Lookup helpers ────────────────────────────────────────────────────────

/**
 * Execute a raw command string.
 * Normalizes the input, looks up the command (or its alias), runs the handler,
 * and returns the result.  If no command matches, tries fuzzy suggestion.
 */
export function executeCommand(
  raw: string,
  context: CommandContext,
): CommandResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { lines: [] };
  }

  const parts = trimmed.split(" ");
  // Strip leading slash and lowercase
  const cmdName = parts[0].toLowerCase().replace(/^\/+/, "");
  const args = parts.slice(1);

  // Direct registry lookup
  let entry = registry.get(cmdName);
  if (!entry) {
    // Try alias map
    const canonical = aliasMap.get(cmdName);
    if (canonical) {
      entry = registry.get(canonical);
    }
  }

  if (entry) {
    return entry.handler(args, context);
  }

  // Fuzzy suggestion: find closest match among all known names + aliases
  const allNames = new Set<string>();
  for (const key of registry.keys()) allNames.add(key);
  for (const alias of aliasMap.keys()) allNames.add(alias);

  let bestMatch: string | null = null;
  let bestDist = Infinity;
  for (const name of allNames) {
    const dist = levenshtein(cmdName, name);
    if (dist < bestDist && dist <= 3) {
      bestDist = dist;
      bestMatch = name;
    }
  }

  if (bestMatch) {
    return {
      lines: [
        {
          type: "error",
          text: `Command not found: '${parts[0]}'. Did you mean '${bestMatch}'?`,
        },
      ],
    };
  }

  return {
    lines: [
      {
        type: "error",
        text: `Command not found: '${parts[0]}'. Type 'help' for available commands.`,
      },
    ],
  };
}

/**
 * Return completion suggestions for a given input prefix.
 * Matches command names, aliases, and nav paths.
 */
export function getCompletions(prefix: string): string[] {
  const lower = prefix.toLowerCase().replace(/^\/+/, "");
  if (!lower) return [];

  const matches = new Set<string>();

  // Command names
  for (const key of registry.keys()) {
    if (key.startsWith(lower)) matches.add(key);
  }
  // Alias names (only those not already matching as canonical)
  for (const alias of aliasMap.keys()) {
    if (alias.startsWith(lower)) matches.add(alias);
  }
  // Nav paths
  for (const path of VALID_NAV_PATHS) {
    if (path.startsWith(lower) || path.startsWith("/" + lower)) {
      matches.add(path);
    }
  }
  // Project slugs
  for (const project of projectsConfig) {
    if (project.slug.startsWith(lower)) {
      matches.add(project.slug);
    }
  }

  return Array.from(matches).sort();
}

/**
 * Return all known command names (for initial tab completion display).
 */
export function getAllCommandNames(): string[] {
  return Array.from(registry.keys()).sort();
}
