# Plan: Improve TerminalBox Terminal Usage and Styling

## Objective

Refactor the `TerminalBox` component to deliver a polished, real-terminal-like experience — improving usability (command history, keyboard shortcuts, tab completion), visual styling (monospace font correctness, scanline effects, cursor animation), and code architecture (extract command registry, fix stale closure bugs), while staying strictly within the established cyberpunk design system.

---

## Expected Outcome & Success Criteria

1. **Up/Down arrow keys** navigate a per-session command history (last 50 commands).
2. **Tab key** auto-completes commands and known navigation paths.
3. **Keyboard shortcuts** work — `Ctrl+L` clears screen, `Ctrl+D` / `Escape` close terminal, `Ctrl+U` clears current line.
4. **Font** is explicitly `IBM Plex Mono` (monospace) in terminal body, input, and output — matching DESIGN.md specification.
5. **Scanline overlay** renders as a subtle animated CRT effect across the terminal body (using the existing `.scanline-overlay` CSS).
6. **Cursor blink** animation on the input caret.
7. **New commands** are added: `history`, `whoami`, `date`, `echo`, `banner`, `social`, `repo`, and aliases (`cls` → `clear`, `exit` → `close`, `ls` → `nav /projects`).
8. **All existing commands** (`/h`, `/help`, `/nav`, `/contact`, `/clear`, `/close`) continue to work identically.
9. **Error handling** — unknown commands show a helpful suggestion if close match found (e.g., "Did you mean `/help`?").
10. **Architecture** — command handling is extracted into a registry map; the monolithic `switch` is removed.
11. **Stale closure** in `handleCommandInternal`'s `useCallback` dependency on `idCounter` is fixed.
12. **Accessibility** — terminal output area has `role="log"` and `aria-live="polite"`; input has proper `aria-label`.
13. **Mobile** — font size scales down; terminal height adjusts on small screens; touch-friendly.
14. **Build passes** — `npm run build` completes with zero errors.

---

## Sub-tasks / Milestones

### Phase A — Architecture & State Management
1. **Extract command registry** — create `app/_components/_global/_terminalBox/commands.ts` with a `CommandRegistry` map that maps command names to handler functions (name, aliases, description, handler). Handlers receive `(args: string[], context: CommandContext)` and return `HistoryLine[]`.
2. **Refactor history to `useReducer`** — replace `useState<HistoryLine[]>` + `idCounter` with a `useReducer` pattern that manages `{ lines: HistoryLine[], nextId: number }`. This eliminates the stale-closure problem in `handleCommandInternal`.
3. **Add command history buffer** — a `useRef<string[]>` that stores the last 50 raw user inputs. Implement `historyIndex` state for up/down navigation.
4. **Fix `useCallback` stale closure** — after moving to `useReducer`, `handleCommandInternal` no longer needs `idCounter` in its dependency array.

### Phase B — Usability Features
5. **Keyboard event handler** — add a `onKeyDown` handler on the input that intercepts:
   - `ArrowUp` / `ArrowDown` — navigate command history
   - `Tab` — autocomplete current input (commands + nav paths)
   - `Ctrl+L` — clear screen
   - `Ctrl+D` / `Escape` — close terminal
   - `Ctrl+U` — clear current line (delete from cursor to line start)
6. **Tab completion** — on Tab press, find matching commands or `/nav` paths, cycle through completions, or show available options if multiple matches.
7. **Add new commands** to registry — `history`, `whoami`, `date`, `echo`, `banner`, `social`, `repo`. Add aliases `cls` → `clear`, `exit` → `close`, `ls` → `nav /projects`.
8. **Fuzzy suggestion on error** — when a command is not found, check Levenshtein distance against known commands and suggest the closest match.

### Phase C — Visual Styling
9. **Apply IBM Plex Mono** — add `font-mono` (or explicit `ibm-plex-mono-regular` class) to the terminal container, output lines, and input field. Verify it uses the IBM Plex Mono font family from the loaded Google Fonts.
10. **Scanline overlay** — add the `.scanline-overlay` div inside the terminal body (positioned absolute, pointer-events none), using the existing CSS from `globals.css`.
11. **Cursor blink animation** — add a CSS `@keyframes blink-cursor` in globals.css and apply it to the input caret via Tailwind or inline style; or use a simulated block cursor element that pulses.
12. **Typography polish** — adjust `leading-relaxed` to a tighter `leading-snug` for terminal output; ensure correct `tracking-` values; adjust font-size to `text-xs` on mobile, `text-sm` on desktop.
13. **Color refinement** — differentiate output types further:
    - `system` → cyan with `text-glow`
    - `user` → white/70 (keep)
    - `response` → green tint (`text-primary` but slightly dimmer)
    - `error` → red-400 (keep)
14. **Scroll behavior** — ensure the input line stays pinned to the bottom of the visible viewport. Use a bottom-anchored approach: the input form lives outside the scrollable history area. History scrolls independently; input stays fixed at the bottom of the terminal panel.
15. **Responsive adjustments** — on screens <640px: smaller font, reduced padding, adjusted `h-[25vh]` to `h-[35vh]` for more usable space.

### Phase D — Accessibility & Polish
16. **Add ARIA attributes** — `role="log"` + `aria-live="polite"` on the output container; `aria-label="Terminal output"` on scroll area; ensure input has `aria-label="Terminal command input"` (already exists but verify).
17. **Focus management** — auto-focus input when terminal opens (via `useEffect` + `inputRef.current?.focus()`); keep focus on input when clicking anywhere in the terminal body (already implemented but verify with new layout).
18. **Terminal entrance animation** — replace `spring` with `easeOutExpo` per DESIGN.md spec ("Don't use bounce or elastic easings. Exponential ease-out for entrances"). Change `transition` to `{ type: "tween", ease: "easeOutExpo", duration: 0.5 }`.
19. **prefers-reduced-motion** — respect reduced motion preferences by disabling scanline and cursor blink animations.

### Phase E — Testing & Verification
20. **Manual QA checklist** — verify all old commands, new commands, keyboard shortcuts, tab completion, arrow history, mobile layout, RTL (if applicable), and build pass.

---

## Scope

### In Scope
- All changes listed in **Sub-tasks / Milestones** above.
- Refactoring `handleCommandInternal` and the monolithic switch statement.
- Adding the command registry file (`commands.ts`) inside `_terminalBox/`.
- Modifying `TerminalBox.tsx` and `globals.css` (add cursor-blink keyframes).
- Updating `Terminalcontent.tsx` only if needed for help text / command descriptions.
- Removing unused imports or code after refactor.

### Out of Scope
- Persistent command history across page reloads (localStorage / sessionStorage) — defer to future enhancement.
- Actual terminal emulation (pty, shell integration) — this stays a simulated command interface.
- Multi-tab / multi-session terminal support.
- Drag-to-resize terminal panel — deferred.
- Customizable prompt or theme — deferred.
- i18n of terminal messages — the terminal is intentionally English-only; not changing this now.
- Adding a full virtualizer for history (e.g., `react-window`) — unnecessary at expected history lengths.
- Changing the `VariablesContext` shape or the external `terminalCommand` API contract.

---

## Technical Constraints & Dependencies

- **Next.js 16.1.6** (App Router) — component is `"use client"`.
- **React 19.2.3** — must use React 19 compatible patterns; `useReducer` and `useRef` are fine.
- **Framer Motion 12.35** — animation API must be version-compatible.
- **Tailwind CSS v4** — all styling uses Tailwind v4 utility classes and `@theme` custom properties; no CSS-in-JS.
- **IBM Plex Mono** is loaded via Google Fonts in `layout.tsx` — CSS classes `ibm-plex-mono-*` already exist in `globals.css`.
- **Design System** (`DESIGN.md`) — terminal must follow the "Terminal Module" spec (section 5) and all named rules (The Cyan Ceiling Rule, The Flat-By-Default Rule, etc.).
- **No external dependencies** — all functionality must be built with existing packages (React, Framer Motion, Lucide). No new npm packages.
- **`hidden-scrollbar`** class used elsewhere — do not break it.
- **Build must pass** — zero TypeScript errors, zero ESLint errors.

---

## Risks & Assumptions

### Risks (HIGH)
1. **🔴 HIGH: Breaking existing `terminalCommand` external API** — the `VariablesContext` exposes `setTerminalCommand` which other components may use to inject commands. If `handleCommandInternal` changes its signature or dependency pattern, external callers could break. **Mitigation**: maintain a stable public API; the refactored handler must accept the same raw string input.
2. **🔴 HIGH: Scanline overlay covers interactive elements** — if `pointer-events: none` is missing, clicking the terminal will be blocked. **Mitigation**: verify overlay has `pointer-events: none` and `z-index` is above content but below input.
3. **MEDIUM: useReducer refactor could introduce regressions in history rendering** — the current `setHistory` + `addLines` pattern is simple and working. Changing to `useReducer` touches the core logic. **Mitigation**: keep `addLines` helper behavior identical; write a regression checklist.
4. **MEDIUM: Tab completion interferes with normal form behavior** — Tab normally moves focus. **Mitigation**: `preventDefault()` early in the Tab handler.

### Assumptions
- The `hidden-scrollbar` CSS class is intentionally hiding scrollbars for the terminal (already applied). We assume this is desired.
- The design system's rule against bounce easings means the spring animation on terminal entry should be replaced with a tween easeOutExpo — assumed to be the correct direction.
- Command history is scoped to the current session (component lifetime) — no persistence required.
- The `setTerminalCommand` context value is used only by `TerminalBox` and not by any other component for reading — assumed safe to keep the same contract.

---

## Affected Files, Modules & Systems

### Backend / Data — *(none affected)*

### Frontend — Components & Logic
| File | Change Type |
|---|---|
| `app/_components/_global/TerminalBox.tsx` | **Major refactor** — replace switch with registry, add keyboard handlers, fix useCallback, add ARIA, restructure layout for fixed input |
| `app/_components/_global/_terminalBox/commands.ts` | **New file** — command registry with all command handlers |
| `app/_components/_global/_terminalBox/Terminalcontent.tsx` | **Minor update** — update `HELP_OUTPUT` to include new commands; export command metadata for registry |
| `app/_components/_global/_terminalBox/types.ts` | **New file** (optional) — shared TypeScript types for `Command`, `CommandHandler`, `CommandContext`, `HistoryLine` |
| `app/context/VariablesContext.tsx` | **No change** — stable API contract |

### Styles
| File | Change Type |
|---|---|
| `app/globals.css` | **Add** `@keyframes blink-cursor` animation; adjust `.terminal-module` if needed |

### No changes expected
- `app/[locale]/layout.tsx` — unchanged
- Other `_global/*.tsx` files — unchanged
- `app/lib/projects-data.ts` — unchanged

---

## Open Questions & Blocker

1. **🔴 Blocker: Should the terminal use a custom scrollbar or keep the system default?** Currently `.hidden-scrollbar` hides the scrollbar entirely. The global scrollbar styling (thin cyan thumb) does not apply because the terminal scroll area uses `hidden-scrollbar`. **Decision needed**: keep hidden, or show a styled custom scrollbar?
2. **Clarification: For the `social` command, what links should be displayed?** LinkedIn, GitHub, Twitter/X?
3. **Clarification: Should the `repo` command open the portfolio's own GitHub repo, or is it a general command?**
4. **Clarification: Is the spring-to-expo easing change desired, or should the current spring animation be kept?** DESIGN.md says "Don't use bounce or elastic easings. Exponential ease-out for entrances."
5. **Clarification: For tab completion, should it cycle through matches on repeated Tab presses (like a real shell), or show a list of matches?**

---

## Suggested Implementation Approach *(high-level)*

### Architecture: Command Registry Pattern

Create a new file `commands.ts` in the `_terminalBox/` directory with:

```typescript
export interface CommandContext {
  router: ReturnType<typeof useRouter>;
  setShowTerminal: (v: boolean) => void;
  clearHistory: () => void;
  getHistory: () => string[];
}

export type CommandHandler = (
  args: string[],
  context: CommandContext,
) => { type: HistoryLine["type"]; text: string | React.ReactNode }[];

export interface Command {
  name: string;
  aliases: string[];
  description: string;
  handler: CommandHandler;
}
```

The registry is a `Map<string, Command>` keyed by name. `TerminalBox.tsx` imports the registry and iterates over it. This replaces the `switch` entirely.

### State Management: useReducer

```typescript
type State = { lines: HistoryLine[]; nextId: number };
type Action =
  | { type: "ADD_LINES"; lines: Omit<HistoryLine, "id">[] }
  | { type: "CLEAR" };
```

The reducer handles `ADD_LINES` (auto-increments ids) and `CLEAR`. No more `idCounter` state variable.

### Layout: Pin Input

Wrap the body area in a `flex flex-col h-full` container:
- History area: `flex-1 overflow-y-auto`
- Input form: `shrink-0` (stays at bottom)

This ensures the input is always visible regardless of history length.

### Animation: Expo Ease-Out

Replace the spring transition:
```tsx
transition={{ type: "spring", stiffness: 100, damping: 20 }}
```
with:
```tsx
transition={{ type: "tween", ease: "easeOutExpo", duration: 0.5 }}
```

### Keyboard: Single onKeyDown Handler

A single `handleKeyDown` on the `<input>` intercepts `ArrowUp/Down`, `Tab`, `Ctrl+L/D/U`, and `Escape`. All call `e.preventDefault()` before processing.

### Cursor Blink: Pure CSS

Add to `globals.css`:
```css
@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.terminal-cursor {
  animation: blink-cursor 1s step-end infinite;
}
```

### Recommended Build Order

1. **Phase A** (architecture) — no visual change; no regressions.
2. **Phase D, step 17** (focus management) — easy win.
3. **Phase B** (usability) — all keyboard features on top of new architecture.
4. **Phase C** (visual styling) — visible polish after functionality is solid.
5. **Phase D, steps 16–19** (accessibility, animation, reduced-motion).
6. **Phase E** (QA).

---

## Metadata

- **Phase**: Planning
- **Status**: Approved
- **Approved on**: 2026-06-26
- **Next phase**: Context/Prompt Preparation
