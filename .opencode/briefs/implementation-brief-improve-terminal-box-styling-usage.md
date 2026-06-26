# Implementation Brief — Improve Terminal Box Styling and Usage

## 1. Task Objective

Refactor the `TerminalBox` component to deliver a polished, real-terminal-like experience. This includes: extracting the monolithic command switch into a registry pattern, fixing the stale closure bug in `handleCommandInternal`, adding command history (up/down arrows), tab completion with a selection list, keyboard shortcuts (Ctrl+L/D/U, Escape), new commands (`history`, `whoami`, `date`, `echo`, `banner`, `social`, `repo`), visual polish (IBM Plex Mono throughout, scanline overlay, cursor blink, custom thin terminal scrollbar, color refinement), improved layout (input pinned to bottom, responsive sizing), ARIA accessibility, and ease-out entrance animation — all while maintaining backward compatibility with every existing command and the `terminalCommand` external API.

## 2. Scope

### In Scope
- Extract command handling into a `CommandRegistry` map (`commands.ts`), removing the `switch` statement.
- Replace `useState<HistoryLine[]>` + `idCounter` with `useReducer` for history state (fixes stale closure).
- Add per-session command history buffer (last 50 commands) with up/down arrow navigation.
- Add `handleKeyDown` on the input for: ArrowUp/Down (history), Tab (show completion list), Ctrl+L (clear), Ctrl+D / Escape (close), Ctrl+U (clear line).
- Tab completion: on Tab press, show a list of matching commands/aliases/nav paths the user can select from.
- Add new commands: `history`, `whoami`, `date`, `echo`, `banner`, `social`, `repo`.
- Add aliases: `cls` → `clear`, `exit` → `close`, `ls` → `nav /projects`.
- Add fuzzy suggestion on unknown command (Levenshtein distance) — "Did you mean X?"
- Apply `ibm-plex-mono-regular` class to the terminal container, output lines, and input.
- Add `.scanline-overlay` div inside the terminal body (already exists in CSS, needs to be rendered).
- Add cursor blink CSS (`@keyframes blink-cursor` + `.terminal-cursor` class) and apply to input caret.
- Add custom thin terminal scrollbar class (`.terminal-scrollbar`) — remove `.hidden-scrollbar` from the terminal, show a thin (3–4px) cyan thumb on dark track.
- Color refinement: `system` → cyan with glow, `user` → white/70, `response` → green-tinted primary, `error` → red-400.
- Restructure layout: wrap body in `flex flex-col h-full`, history area `flex-1 overflow-y-auto`, input form `shrink-0` pinned at bottom.
- Responsive adjustments: font-size `text-xs` on mobile `<640px`, `text-sm` on desktop; height `h-[35vh]` on mobile, `h-[25vh]` on desktop.
- ARIA: `role="log"` + `aria-live="polite"` on output container, `aria-label="Terminal command input"` on input.
- Replace spring entrance animation with `{ type: "tween", ease: "easeOutExpo", duration: 0.5 }`.
- Respect `prefers-reduced-motion`: disable scanline and cursor blink animations.
- Auto-focus input when terminal opens.
- Update `HELP_OUTPUT` in `Terminalcontent.tsx` to include new commands.
- Modify `TerminalBox.tsx`, `globals.css`, and `Terminalcontent.tsx`.
- Add `commands.ts` and optionally `types.ts` (shared types).
- Build must pass (`npm run build`) with zero errors.

### Out of Scope
- Persistent command history across page reloads (localStorage / sessionStorage) — deferred.
- Actual terminal emulation (pty, shell integration) — stays simulated.
- Multi-tab / multi-session terminal support.
- Drag-to-resize terminal panel.
- Customizable prompt or theme.
- i18n of terminal messages.
- Full virtualizer for history (e.g., `react-window`).
- Changing `VariablesContext` shape or the `terminalCommand` API contract.
- Other `_global/*.tsx` files besides `TerminalBox.tsx` and `_terminalBox/` files.
- `app/[locale]/layout.tsx` — no changes.
- `app/lib/projects-data.ts` — no changes.

## 3. Project Context

### Relevant Files & Modules

| File / Module | Role | Change Required |
|---|---|---|
| `app/_components/_global/TerminalBox.tsx` | Main terminal component — state, event handlers, rendering | **Major refactor** |
| `app/_components/_global/_terminalBox/commands.ts` | **New file** — command registry with all command handlers | **New file** |
| `app/_components/_global/_terminalBox/types.ts` | **New file** (optional) — shared types: `Command`, `CommandHandler`, `CommandContext`, `HistoryLine` | **New file** (optional) |
| `app/_components/_global/_terminalBox/Terminalcontent.tsx` | Exports HELP_OUTPUT, STARTUP_SEQUENCE, PROMPT, VALID_NAV_PATHS, ASCII art, links | **Minor update** — add new commands to HELP_OUTPUT, export command metadata |
| `app/_components/_global/_terminalBox/TerminalButton.tsx` | Floating terminal toggle button | No change |
| `app/context/VariablesContext.tsx` | Shared context for showTerminal, terminalCommand | No change |
| `app/globals.css` | Global styles including `.scanline-overlay`, `.ibm-plex-mono-*`, `.hidden-scrollbar` | **Add** — `@keyframes blink-cursor`, `.terminal-cursor`, `.terminal-scrollbar` |
| `app/lib/projects-data.ts` | Project data with `linkSourceCode` used by `repo` command | No change (read only) |
| `DESIGN.md` | Design system reference — terminal spec, color rules, easing rules | No change (reference only) |

### Architecture Constraints
- **Next.js 16.1.6** (App Router) — component is `"use client"`.
- **React 19.2.3** — use `useReducer` and `useRef` (React 19 compatible).
- **Framer Motion 12.35** — use `motion.div` with `AnimatePresence`; API must be v12 compatible.
- **Tailwind CSS v4** — all styling via Tailwind v4 utility classes and `@theme` custom properties; no CSS-in-JS.
- **IBM Plex Mono** loaded via Google Fonts in `app/[locale]/layout.tsx`; CSS classes `ibm-plex-mono-*` already exist in `globals.css`.
- **Design System (`DESIGN.md`)** — must follow "Terminal Module" spec (section 5) and all named rules (The Cyan Ceiling Rule, The Flat-By-Default Rule, The Single Family Rule, no bounce easings).
- **No new npm packages** — use only existing: React, Framer Motion, Lucide.
- **`hidden-scrollbar`** class used elsewhere — do not modify it globally; replace only within `TerminalBox`.
- **Build must pass** — zero TypeScript errors, zero ESLint errors.

### Dependencies & External Services
- Google Fonts (IBM Plex Mono) — must not break existing font loading.
- `VariablesContext` — stable API: `showTerminal`, `setShowTerminal`, `terminalCommand`, `setTerminalCommand`.
- `projects-data.ts` — `getProjectSlugs()` and `projectsConfig` used by `repo` command.

## 4. Implementation Guidance

### Recommended Build Order

**Phase A — Architecture & State Management (no visual change)**
1. Create `_terminalBox/types.ts` with shared types: `HistoryLine`, `Command`, `CommandHandler`, `CommandContext`, `Action`, `State`.
2. Create `_terminalBox/commands.ts` with the `CommandRegistry` map containing all command handlers (existing + new).
3. Refactor `TerminalBox.tsx` to use `useReducer` for `{ lines: HistoryLine[]; nextId: number }` — replaces `useState` + `idCounter`.
4. Wire the command registry into `handleCommandInternal` — replace the `switch` statement.
5. Fix the `useCallback` stale closure (remove `idCounter` dependency).
6. Verify all existing commands still work identically after refactor.

**Phase B — Usability Features**
7. Add command history buffer (`useRef<string[]>`, last 50, `historyIndex` state).
8. Add `handleKeyDown` on the input for ArrowUp/Down (history navigation).
9. Add Tab completion: on Tab press, build match list, show selection overlay/list.
10. Add remaining keyboard shortcuts: Ctrl+L (clear), Ctrl+D / Escape (close), Ctrl+U (clear line).
11. Add fuzzy suggestion on unknown command (Levenshtein distance or simple substring match).
12. Add new commands: `history`, `whoami`, `date`, `echo`, `banner`, `social`, `repo` and aliases.

**Phase C — Visual Styling**
13. Replace `hidden-scrollbar` with new `.terminal-scrollbar` class in `globals.css`.
14. Apply `ibm-plex-mono-regular` to terminal container, output lines, input.
15. Add `.scanline-overlay` div inside the terminal body.
16. Add cursor blink CSS and apply to input caret.
17. Refine output type colors: `system` → cyan + glow, `user` → white/70, `response` → green-tinted primary, `error` → red-400.
18. Restructure layout: `flex flex-col h-full` with `flex-1` history area and `shrink-0` input at bottom.
19. Responsive: `text-xs` on mobile, `text-sm` on desktop; height `h-[35vh]` mobile, `h-[25vh]` desktop; reduced padding below 640px.

**Phase D — Accessibility, Animation, Reduced Motion**
20. Add `role="log"` + `aria-live="polite"` on output container; `aria-label` on input (verify existing).
21. Auto-focus input on terminal open via `useEffect` + `inputRef.current?.focus()`.
22. Replace spring transition with `{ type: "tween", ease: "easeOutExpo", duration: 0.5 }`.
23. Respect `prefers-reduced-motion` — disable scanline and cursor blink animations.
24. Update `HELP_OUTPUT` in `Terminalcontent.tsx` to list all new commands.

**Phase E — Verification**
25. Run `npm run build` — must pass with zero errors.
26. Manual QA checklist (see Acceptance Criteria).

### Branch Strategy
- Create a feature branch from `main`: `git checkout -b improve/terminal-box`

### Test Strategy
- No existing test infrastructure. Manual QA checklist must be followed.
- Verify build passes after each phase to catch issues early.

### Rollback Considerations
- All changes are to a single component (`TerminalBox.tsx`) and its adjacent files — easy to revert by reverting the branch or specific commits.
- Keep `hidden-scrollbar` class intact elsewhere (do not modify the global class).

## 5. Expected Deliverables

| Artifact | Path | Type |
|---|---|---|
| **Modified** | `app/_components/_global/TerminalBox.tsx` | Major refactor |
| **New** | `app/_components/_global/_terminalBox/commands.ts` | Command registry with handlers |
| **New (optional)** | `app/_components/_global/_terminalBox/types.ts` | Shared TypeScript types |
| **Modified** | `app/_components/_global/_terminalBox/Terminalcontent.tsx` | Updated HELP_OUTPUT, exports |
| **Modified** | `app/globals.css` | Added blink-cursor, .terminal-cursor, .terminal-scrollbar |

No migration scripts, no configuration changes.

## 6. Acceptance Criteria

- [ ] **Existing commands** — `/h`, `/help`, `/nav [path]`, `/contact`, `/clear`, `/close` work identically as before.
- [ ] **New commands** — `history` (shows last commands), `whoami` (shows user info), `date` (shows current date/time), `echo [text]` (echoes text), `banner` (shows ASCII banner), `social` (shows GitHub + LinkedIn + Email + CV), `repo [slug]` (opens project `linkSourceCode` URL).
- [ ] **Aliases** — `cls` → clears screen, `exit` → closes terminal, `ls` → navigates to `/projects`.
- [ ] **Up/Down arrows** navigate per-session command history (last 50 commands).
- [ ] **Tab** shows a list of matching completion options (commands, aliases, nav paths) for the user to select from.
- [ ] **Ctrl+L** clears the terminal screen.
- [ ] **Ctrl+D** / **Escape** closes the terminal.
- [ ] **Ctrl+U** clears the current input line.
- [ ] **Unknown command error** suggests closest match (e.g., "Did you mean `/help`?").
- [ ] **IBM Plex Mono** is applied to terminal body text, output lines, and input.
- [ ] **Scanline overlay** renders as a subtle animated CRT effect across the terminal body (pointer-events none, z-index above content).
- [ ] **Cursor blink** animation pulses on the input caret.
- [ ] **Terminal scrollbar** is thin (~3–4px), cyan thumb on dark track, styled per design system.
- [ ] **Color differentiation**: `system` = cyan+glow, `user` = white/70, `response` = green-tinted primary, `error` = red-400.
- [ ] **Input is pinned** at the bottom of the terminal panel — does not scroll with history.
- [ ] **Responsive** — `<640px`: `text-xs`, `h-[35vh]`, reduced padding; desktop: `text-sm`, `h-[25vh]`.
- [ ] **ARIA** — output container has `role="log"` + `aria-live="polite"`; input has `aria-label="Terminal command input"`.
- [ ] **Auto-focus** — input is focused when terminal opens.
- [ ] **Entrance animation** uses `{ type: "tween", ease: "easeOutExpo", duration: 0.5 }` (no spring).
- [ ] **prefers-reduced-motion** — scanline and cursor blink animations are suppressed.
- [ ] **TerminalButton** still works — clicking it reopens the terminal.
- [ ] **External API** unchanged — `setTerminalCommand` from `VariablesContext` still injects commands correctly.
- [ ] **Build passes** — `npm run build` completes with zero TypeScript and ESLint errors.

## 7. Quality Requirements

- **Code style / linting** — must pass `npm run lint` (ESLint) with zero errors.
- **Test coverage** — no automated tests exist; manual QA must cover all acceptance criteria.
- **Documentation** — inline JSDoc/comments for the command registry and reducer; no README changes needed.
- **Security** — no user input is evaluated or executed; all commands are string-matched against the registry.
- **Accessibility** — ARIA attributes as specified; focus management; reduced-motion support.

## 8. Assumptions

- **CV link for `social` command**: assumed to be `/cv.pdf` or similar — if not yet available, the `social` command should show a placeholder or note. **Verify with user.**
- **GitHub link for `social` command**: assumed to be `https://github.com/Ahmed-ES-SH` (based on project repo patterns).
- **LinkedIn link for `social` command**: assumed path — **verify with user if available**.
- Email for `social` command: assumed `ahmedismaildev6@gmail.com` (from existing contact ASCII).
- The `repo` command accepts a project slug and resolves `linkSourceCode` from `projects-data.ts`. If no matching slug found, show an error.
- The `banner` command can reuse or reference the existing ASCII art structure.
- The `hidden-scrollbar` class on `TerminalBox` will be replaced with a new `.terminal-scrollbar` class — the global `.hidden-scrollbar` definition will remain untouched.
- The existing `terminalCommand` context API (string input → `handleCommandInternal`) remains compatible with the refactored handler.

## 9. Unresolved Ambiguities & Blockers

| # | Ambiguity / Blocker | Recommended Resolution | Priority |
|---|---|---|---|
| 1 | **`social` CV link** — what URL/path should the CV link point to? | Ask user for the CV URL or clarify that a placeholder should be used. | **High** |
| 2 | **`social` LinkedIn URL** — what is the LinkedIn profile URL? | Ask user for LinkedIn URL. | **Medium** |
| 3 | **`social` GitHub URL** — confirm it should link to `https://github.com/Ahmed-ES-SH` (the org/account, not a specific repo). | Confirm with user. | **Low** |
| 4 | **`whoami` output** — what should the `whoami` command display? (e.g., "ahmedismaildev" or full name + role) | Default to showing the prompt user identity `ahmedismaildev` / "Ahmed Ismail — Full-Stack Developer". | **Low** |
| 5 | **`banner` ASCII art** — should it render the existing startup sequence, a new creative banner, or the name logo? | Default: render a centered "Ahmed Ismail" ASCII banner similar to the contact ASCII style. Can be adjusted later. | **Low** |
| 6 | **`history` output format** — should it show numbered lines with prompt prefix, or just the raw commands? | Default: show numbered lines like `1  ~:ahmedismaildev/admin:/ $ /help` (with prompt). | **Low** |

## 10. Handoff Notes for Execution Agent

1. **Run `npm run build` first** to confirm a clean baseline build before starting.
2. **Run `npm run dev`** to test changes incrementally.
3. **Start from `main`** branch: `git checkout -b improve/terminal-box`.
4. **Phase order matters** — Phase A first (architecture) because it touches the core state management. Do not combine Phase A with visual changes in a single commit.
5. **Know the existing code** — `TerminalBox.tsx` is 246 lines, uses `useState` for `history` + `idCounter`, `useCallback` for `handleCommandInternal` (stale closure on `idCounter`), a `switch` statement for commands, and a `useEffect` watching `terminalCommand`.
6. **The normalization logic** (`cmd.startsWith("/")` → `"/" + cmd`) currently exists in the switch — this logic moves into the registry lookup function.
7. **For Tab completion overlay**, consider rendering a positioned suggestion list below the input or as an overlay inside the terminal body. Keep it simple — a styled `<div>` with clickable options.
8. **For the `repo` command**, import `projectsConfig` from `@/app/lib/projects-data` and look up `linkSourceCode` by slug.
9. **The `hidden-scrollbar` class** is used in 4 files outside `TerminalBox.tsx` — do not modify those usages. Only remove it from the terminal's scroll div.
10. **The scanline overlay** CSS already exists (`.scanline-overlay` in `globals.css`) — just render the div in the JSX with that class.
11. **The `prefers-reduced-motion`** media query already exists in `globals.css` (lines 185–190) — the cursor blink and scanline animations will naturally be suppressed as long as they use `animation` properties (which the media query targets globally).

---
_Brief prepared by: Context & Prompt Preparation Agent (Step 2)_
_Workflow: Planning → **Context Prep** → Execution → Verification → Review → Documentation_
