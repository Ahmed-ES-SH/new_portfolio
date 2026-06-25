# Implementation Brief — Redesign Explain Page to AI-Assisted Development Workflow

## 1. Task Objective

Completely rewrite the `/app/[locale]/explain/page.tsx` to present the 5-stage AI-assisted software development workflow (Planning → Context/Prompt Preparation → Execution → Verification → Review) as a polished portfolio case-study page. The page must visually document the structured development cycle with 7+ sections, position Ahmed Ismail (the developer) as the human decision-maker and AI as a controlled execution/analysis layer, and be fully bilingual (EN/AR) with correct RTL layout. All existing route/framework patterns (Next.js 15 App Router, `params: Promise<{ locale: string }>`, `generateMetadata`) must be preserved and TypeScript hygiene improved (no `any` types).

---

## 2. Scope

### In Scope
- Complete rewrite of the Explain page layout, content, and component tree
- 7 new sections: Hero, Workflow Overview (5-step cycle), 5 Stage Detail cards (reusable component), Human vs AI Responsibility, Why This Workflow Works, Optional Example Flow
- New `constants/workflowStages.ts` typed data constant with translation key references
- New client components: `ExplainWorkflowHero`, `ExplainWorkflowOverview`, `ExplainStageDetail`, `ExplainHumanVsAI`, `ExplainWhyItWorks`, `ExplainExampleFlow`
- New server component: `ExplainPageShell` (wraps content with grid bg, locale direction, consistent padding)
- Complete translation replacement: `translations/en.json` and `translations/ar.json` — `explain` namespace fully replaced + `metaExplainPage` content updated
- Deletion of 4 old component files: `ExplainHero.tsx`, `ExplainRationale.tsx`, `ExplainTerminal.tsx`, `ExplainHuman.tsx`
- Framer Motion scroll-reveal animations (`whileInView`) on all stage sections
- Scroll-based sticky progress indicator / workflow navigation (recommended, can be deferred)
- RTL layout support for all new content (mirrored workflow direction, correct alignment)
- Fix TypeScript types in `page.tsx` — replace `any` with typed `params: Promise<{ locale: string }>`
- `prefers-reduced-motion` fallbacks on every animation

### Out of Scope
- Changing the global layout, navbar, footer, or any other page route
- Adding a new route or modifying the routing structure
- Redesigning design system tokens (colors, typography, spacing remain as defined in DESIGN.md)
- Adding actual interactive workflow simulation or demo
- Creating an animated SVG workflow diagram — use CSS/framer-motion based visual flow instead
- Changing the i18n mechanism or locale resolution logic
- Adding server-side data fetching (this page is fully static content)
- The "Optional Example Flow" (`ExplainExampleFlow`) section — can be deferred to a follow-up if it would delay core sections
- Modifying any file outside `app/[locale]/explain/`, `app/_components/_explain/`, `constants/`, or `translations/`

---

## 3. Project Context

### Relevant Files & Modules

| File / Module | Role | Change Required |
|---|---|---|
| `app/[locale]/explain/page.tsx` | Page entry point — server component | **Yes** — complete rewrite, new imports, new component tree, typed `params`, updated `generateMetadata` |
| `app/_components/_explain/ExplainHero.tsx` | Old hero component | **Delete** — replaced by `ExplainWorkflowHero` |
| `app/_components/_explain/ExplainRationale.tsx` | Old rationale component | **Delete** — content distributed across new stage sections |
| `app/_components/_explain/ExplainTerminal.tsx` | Old terminal component | **Delete** — replaced by new stage sections |
| `app/_components/_explain/ExplainHuman.tsx` | Old human oversight component | **Delete** — replaced by `ExplainHumanVsAI` |
| `app/_components/_explain/ExplainWorkflowHero.tsx` | **New** — hero section | **Create** (client component) |
| `app/_components/_explain/ExplainWorkflowOverview.tsx` | **New** — 5-step visual cycle | **Create** (client component) |
| `app/_components/_explain/ExplainStageDetail.tsx` | **New** — reusable stage breakdown card | **Create** (client component) |
| `app/_components/_explain/ExplainHumanVsAI.tsx` | **New** — human vs AI responsibility table | **Create** (client component) |
| `app/_components/_explain/ExplainWhyItWorks.tsx` | **New** — value proposition cards | **Create** (client component) |
| `app/_components/_explain/ExplainExampleFlow.tsx` | **New** — optional mini case study | **Create** (client component, can defer) |
| `app/_components/_explain/ExplainPageShell.tsx` | **New** — server wrapper with grid bg | **Create** (server component — no `"use client"`) |
| `constants/workflowStages.ts` | **New** — typed stage data constant | **Create** |
| `translations/en.json` | English translations | **Yes** — replace `explain` namespace entirely; update `metaExplainPage` content |
| `translations/ar.json` | Arabic translations | **Yes** — replace `explain` namespace entirely; update `metaExplainPage` content |
| `constants/global.ts` | Direction map (`en→ltr`, `ar→rtl`) | **No** — used as-is |
| `app/hooks/useTranslation.ts` | Client translation hook | **No** — used as-is |
| `app/helpers/serverTranslation.ts` | Server translation helper | **No** — used as-is |
| `app/helpers/SharedMetadata.ts` | Shared OG/Twitter metadata builder | **No** — used as-is |
| `app/globals.css` | Global styles with `container-section`, grid, neon classes | **No** — used as-is (already has `prefers-reduced-motion` global rule at line 185) |
| `DESIGN.md` | Design system reference | **No** — consult for constraints; do not modify |

### Architecture Constraints

- **Next.js 15 App Router** — `params` is `Promise<{ locale: string }>` (must be awaited). Properly typed — no `any`.
- **Locale resolution** via `params.locale`, direction mapped via `directionMap` from `@/constants/global`
- **Server/Client boundary**: `ExplainPageShell` and `page.tsx` are server components. All sub-components that use `useTranslation` or `framer-motion` are client components (`"use client"`).
- **Metadata** uses `generateMetadata` with `getServerTranslation(locale, "metaExplainPage")` — `metaExplainPage` remains a **separate top-level namespace** (not inside `explain`).
- **Design system rules** (from DESIGN.md):
  - No gradient text (`background-clip: text`)
  - No glassmorphism outside nav/topbar
  - Zero border-radius on all containers
  - Pure black (`#000000`) for card backgrounds
  - IBM Plex Mono for all text (Cairo for Arabic fallback)
  - Cyan accent ≤15% of any viewport
  - No side-stripe borders (`border-left`/`border-right` >1px as accent on cards) — use full borders or bg tints
  - No numbered section markers ("01 //") as default scaffolding — except for the 5-stage workflow (which IS a real sequence)
  - No bounce or elastic easings — use quart/quint/expo ease-out
  - Animate only `transform` and `opacity` — no layout animations
  - `prefers-reduced-motion` fallbacks on every animation

### Dependencies & External Services

- **framer-motion** — for `whileInView` scroll animations, `useScroll`/`useTransform` for progress indicator
- **lucide-react** — for icons (use existing available icons; do not add new icon packages)
- **Custom translation hook** — `useTranslation` from `@/app/hooks/useTranslation`
- **Server translation helper** — `getServerTranslation` from `@/app/helpers/serverTranslation`
- No external APIs, SDKs, or environment variables needed for this page

---

## 4. Implementation Guidance

### Phase A — Content & Translation Preparation

**Step A1: Define full content architecture**
Map out the text content for all sections (see plan's translation shape in Section 8 of the planning doc, minus `meta` inside `explain`):
- `metaExplainPage`: title + description (updated)
- `explain.hero`: headline, subHeadline, trustSignals (4 badge labels)
- `explain.overview`: title, subtitle, steps (5 items with number, label, summary)
- `explain.stages`: 5 stage objects (planning, contextPrep, execution, verification, review) each with: stageNum, title, purpose, humanRole, aiRole, inputs[], outputs[], decisions[], prevents[], whyMatters
- `explain.humanVsAI`: title, humanTitle, aiTitle, rows (5 phase rows with phase, human, ai fields)
- `explain.whyItWorks`: title, cards (5 cards with title, desc)
- `explain.exampleFlow`: title, task, stages (5 stages with stage, action)

**Step A2: Write English microcopy** for all keys in the `explain` namespace and update `metaExplainPage`.

**Step A3: Write Arabic translations** for all keys in the `explain` namespace and update `metaExplainPage`.

**Step A4: Update translation files**
- Edit `translations/en.json`: replace the entire `explain` object with the new structure; update the `metaExplainPage` object.
- Edit `translations/ar.json`: replace the entire `explain` object with the new structure; update the `metaExplainPage` object.
- Both files must be updated in lockstep — same keys, same structure.

### Phase B — Component Architecture

**Step B1: Delete old components** (after verifying no other imports exist — confirmed by grep)
- Delete: `app/_components/_explain/ExplainHero.tsx`
- Delete: `app/_components/_explain/ExplainRationale.tsx`
- Delete: `app/_components/_explain/ExplainTerminal.tsx`
- Delete: `app/_components/_explain/ExplainHuman.tsx`

**Step B2: Create `constants/workflowStages.ts`**
- Define a `StageData` interface with: `number: string`, `slug: string`
- Export a `const WORKFLOW_STAGES: StageData[]` array with 5 entries ordered 01–05.
- All display text is resolved from translations via `t.stages[slug]`.

```typescript
export interface StageData {
  number: string; // "01", "02", etc.
  slug: string;   // "planning", "contextPrep", "execution", "verification", "review"
}

export const WORKFLOW_STAGES: StageData[] = [
  { number: "01", slug: "planning" },
  { number: "02", slug: "contextPrep" },
  { number: "03", slug: "execution" },
  { number: "04", slug: "verification" },
  { number: "05", slug: "review" },
];
```

**Step B3: Create `ExplainPageShell.tsx`** (server component — no `"use client"`)
- Purpose: wrap all page content with grid background, locale direction, consistent spacing.
- Props: `{ locale: string, children: React.ReactNode }`
- Renders:
  - `<main>` with `dir={directionMap[locale]}` and same grid-bg pattern as current page
  - A `<div>` with `container-section` class wrapping `{children}`
- No animation, no translation hook, no interactivity.

**Step B4: Create `ExplainWorkflowHero.tsx`** (client component — `"use client"`)
- Uses `useTranslation("explain")` to get `hero` namespace
- Renders: large display headline, sub-headline, trust signal pills/badges (4 items with colored dots)
- Framer Motion: fade-up entrance animation
- Cyan accent line decoration (similar pattern to existing hero)

**Step B5: Create `ExplainWorkflowOverview.tsx`** (client component — `"use client"`)
- Uses `useTranslation("explain")` to get `overview` namespace
- Renders: section title "THE WORKFLOW", subtitle, horizontal row of 5 connected numbered cards (desktop) / vertical list (mobile)
- Each card shows: number circle (cyan border), label, one-line summary
- Connector lines/arrows between stages (CSS-based, with RTL support — reverse direction for `dir="rtl"`)
- Framer Motion: staggered entrance animation

**Step B6: Create `ExplainStageDetail.tsx`** (client component — `"use client"` — reusable)
- Props: `{ stage: StageData }` (from `constants/workflowStages.ts`)
- Uses `useTranslation("explain")` to resolve text via `t.stages[stage.slug]`
- Renders a full-width card per stage:
  - Large stage number as background decoration (opacity ~0.1)
  - Card header with stage name (title)
  - Purpose paragraph
  - Two-column "My Role / AI Role" split
  - Compact lists for inputs, outputs, decisions, prevents
  - "Why it matters" callout
- Alternating visual offset: even stages slightly inset (CSS margin or padding shift)
- Framer Motion: `whileInView` fade-up with staggered children

**Step B7: Create `ExplainHumanVsAI.tsx`** (client component — `"use client"`)
- Uses `useTranslation("explain")` to get `humanVsAI` namespace
- Renders: two-column comparison — "My Responsibility" (left/cyan-tinted) | "AI's Role" (right/slate-tinted)
- Each row represents a workflow phase with matching phase label
- Framer Motion: scroll-reveal

**Step B8: Create `ExplainWhyItWorks.tsx`** (client component — `"use client"`)
- Uses `useTranslation("explain")` to get `whyItWorks` namespace
- Renders: section title, 5 value cards in a responsive grid (desktop: 3+2 or 5 in row, tablet: 3+2, mobile: stacked)
- Each card: lucide icon + title + short description
- Subtle cyan top border or full border treatment
- Framer Motion: staggered entrance

**Step B9: Create `ExplainExampleFlow.tsx`** (client component — optional, can defer)
- Uses `useTranslation("explain")` to get `exampleFlow` namespace
- Renders: mini case study with vertical timeline (left rail with connected dots), stage name badge + one-line action per step

**Step B10: Create scroll-based sticky progress indicator** (optional enhancement)
- A vertical timeline on the left edge (desktop) or thin top bar (mobile)
- Uses `framer-motion` `useScroll` + `useTransform` to fill as user scrolls
- Stage labels next to progress nodes

### Phase C — Page Integration

**Step C1: Rewrite `app/[locale]/explain/page.tsx`**
- Remove all old imports
- Remove `// eslint-disable @typescript-eslint/no-explicit-any`
- Properly type `params` as `Promise<{ locale: string }>` in both `generateMetadata` and `ExplainPage`
- Use typed params interface (e.g., `type PageParams = Promise<{ locale: string }>`) — consistent with any pattern used elsewhere in the app
- Import `ExplainPageShell` (server) from `@/app/_components/_explain/ExplainPageShell`
- Import all new client components
- Import `WORKFLOW_STAGES` from `@/constants/workflowStages`
- Structure:
  ```tsx
  <ExplainPageShell locale={locale}>
    <ExplainWorkflowHero />
    <ExplainWorkflowOverview />
    {WORKFLOW_STAGES.map((stage) => (
      <ExplainStageDetail key={stage.slug} stage={stage} />
    ))}
    <ExplainHumanVsAI />
    <ExplainWhyItWorks />
    <ExplainExampleFlow /> {/* optional — skip if deferred */}
  </ExplainPageShell>
  ```

**Step C2: Update `generateMetadata`**
- Keep using `getServerTranslation(locale, "metaExplainPage")` — `metaExplainPage` is still a separate top-level namespace
- Update `metaExplainPage` translations to reflect new workflow focus

**Step C3: Verify RTL layout**
- All new sections must be visually tested with `dir="rtl"`
- Workflow overview arrows must reverse direction in RTL
- Two-column layouts (Human vs AI) must swap left/right alignment
- Framer Motion `x` animation directions must account for RTL (negative x for LTR entrance, positive x for RTL entrance — or use `dir`-aware animation logic)

### Phase D — Polish & Verification

**Step D1: Add scroll-based progress indicator** (if not deferred)
- Sticky navigation that highlights the current stage as user scrolls
- Desktop: left-edge vertical timeline. Mobile: thin top bar.

**Step D2: Verify all animations respect `prefers-reduced-motion`**
- Global rule already exists in `globals.css` (line 185) — this handles CSS transitions/animations
- For framer-motion: use `useReducedMotion()` hook to disable `animate`/`initial` when reduced motion is preferred, or simply rely on the CSS rule which affects all animation/transition durations

**Step D3: Manual QA across breakpoints** — desktop (1440px), tablet (768px), mobile (375px)

**Step D4: No console errors, no hydration mismatches**
- Server/client component boundaries must be clean
- Text content must match between server and client renders

**Step D5: Smoke test other pages** — home, about, projects, skills, contact — verify no regressions

**Branch strategy**: Work on a feature branch `feat/redesign-explain-page`. Commit after each clean phase.

**Test strategy**: No unit tests are specified for this page (it's primarily presentational content). Acceptance is through visual inspection, bilingual rendering, and RTL verification. Manual smoke test of other pages.

---

## 5. Expected Deliverables

### Modified Files
| File | Change |
|---|---|
| `app/[locale]/explain/page.tsx` | Complete rewrite — new imports, typed `params`, new component tree, updated `generateMetadata` |
| `translations/en.json` | Replace `explain` namespace entirely; update `metaExplainPage` key |
| `translations/ar.json` | Replace `explain` namespace entirely; update `metaExplainPage` key |

### Deleted Files
| File | Reason |
|---|---|
| `app/_components/_explain/ExplainHero.tsx` | Replaced by `ExplainWorkflowHero.tsx` |
| `app/_components/_explain/ExplainRationale.tsx` | Replaced by new stage sections |
| `app/_components/_explain/ExplainTerminal.tsx` | Replaced by new stage sections |
| `app/_components/_explain/ExplainHuman.tsx` | Replaced by `ExplainHumanVsAI.tsx` |

### New Files
| File | Purpose |
|---|---|
| `constants/workflowStages.ts` | Typed `StageData` interface + `WORKFLOW_STAGES` constant array |
| `app/_components/_explain/ExplainPageShell.tsx` | Server component wrapper with grid bg, locale direction, padding |
| `app/_components/_explain/ExplainWorkflowHero.tsx` | Client component — hero with headline, sub-headline, trust badges |
| `app/_components/_explain/ExplainWorkflowOverview.tsx` | Client component — 5-step visual cycle |
| `app/_components/_explain/ExplainStageDetail.tsx` | Client component — reusable stage breakdown card |
| `app/_components/_explain/ExplainHumanVsAI.tsx` | Client component — human vs AI responsibility comparison |
| `app/_components/_explain/ExplainWhyItWorks.tsx` | Client component — value proposition cards |
| `app/_components/_explain/ExplainExampleFlow.tsx` | Client component — optional mini case study (can defer) |

### Additional Deliverables
- Scroll-based sticky progress indicator (if included)

---

## 6. Acceptance Criteria

- [ ] Page renders all 5 workflow stages with individual detailed sections visible
- [ ] Each stage section shows: purpose, human role, AI role, inputs, outputs, decisions, prevents, why it matters
- [ ] "Human vs AI Responsibility" section exists with two-column comparison across all 5 phases
- [ ] "Why This Workflow Works" section exists with 5 value cards
- [ ] Optional "Example Flow" section exists (or is cleanly omitted if deferred)
- [ ] Hero section communicates "human-led, AI-assisted" before scrolling (headline + trust badges)
- [ ] Page is fully bilingual — all new text content has entries in both `en.json` and `ar.json`; switching locale shows translated content
- [ ] RTL layout works correctly for Arabic: workflow arrows are mirrored, two-column layouts swap sides, no broken alignment
- [ ] Design system compliance verified:
  - Uses `#00f0ff` primary, IBM Plex Mono font family
  - Pure black (`#000000`) card backgrounds, zero border-radius on all containers
  - No gradient text, no glassmorphism (except nav — untouched)
  - Cyan accent estimated ≤15% of viewport
- [ ] No `any` types in `page.tsx` — `params` typed as `Promise<{ locale: string }>`
- [ ] `generateMetadata` returns correct metadata using `getServerTranslation(locale, "metaExplainPage")`
- [ ] All animations have `prefers-reduced-motion` fallbacks (CSS global rule + framer-motion `useReducedMotion` where needed)
- [ ] Body text maintains 4.5:1 contrast ratio (#94a3b8 against #0d0f10)
- [ ] No console errors, no hydration mismatches
- [ ] No regressions on home, about, projects, skills pages (manual smoke test)
- [ ] Build succeeds with zero TypeScript errors (`tsc --noEmit` or `next build`)

---

## 7. Quality Requirements

- **Code style**: Must pass existing ESLint config. Remove any `eslint-disable` comments from the page file (no `any` workarounds).
- **TypeScript**: Strict mode. No `any` types. `params` properly typed as `Promise<{ locale: string }>`.
- **Test coverage**: No test files required for this presentational page. Verification is through acceptance criteria inspection.
- **Documentation**: Inline JSDoc on the `StageData` interface in `constants/workflowStages.ts`. No README updates needed.
- **Accessibility**: Body text must maintain 4.5:1 contrast ratio (#94a3b8 against #0d0f10 passes at 4.6:1). `prefers-reduced-motion` respected.
- **Translation integrity**: Every translation key in the `explain` namespace of `en.json` must have a corresponding key in `ar.json` (and vice versa). Missing keys will crash the UI (the `useTranslation` hook returns `Record` which will be `undefined` for missing keys — components must handle gracefully with fallback text).
- **Animation**: Animate only `transform` and `opacity`. Use quart/quint/expo ease-out easings. No bounce or elastic.

---

## 8. Assumptions

- The `explain` namespace is used **only** by the explain page — confirmed via grep.
- `metaExplainPage` is a separate top-level namespace (confirmed — see `jq keys` output) and will remain so.
- Deleting the 4 old component files is safe — confirmed no other file imports them.
- All new components except `ExplainPageShell` will be client components because they use `useTranslation` and/or `framer-motion`.
- `ExplainPageShell` is a server component with no `"use client"` directive — it handles structure, direction, grid background only.
- The `container-section` utility class is sufficient for all new section containers.
- Framer Motion's `useReducedMotion()` combined with the global CSS `prefers-reduced-motion` rule is sufficient for motion accessibility.
- The optional `ExplainExampleFlow` component can be cleanly omitted by simply not importing/rendering it in `page.tsx`.

---

## 9. Unresolved Ambiguities & Blockers

| # | Ambiguity / Blocker | Recommended Resolution | Priority |
|---|---|---|---|
| 1 | **Stage detail visual design**: The plan suggests even stages slightly inset with alternating offset. This is a visual design decision that may need iteration. | Implement as CSS `margin-left`/`margin-right` shift on even stages; adjust based on visual review. Use a simple `stageIndex % 2 === 1` check in the map render. | Low |
| 2 | **Scroll progress indicator**: Whether to implement as a left-edge vertical timeline (desktop) or thin top bar (mobile) — or both. | Implement both: vertical timeline on `lg:` breakpoint, thin top bar below `lg:`. Use `useScroll` + `useTransform` from framer-motion. Can be deferred to a follow-up if time is tight. | Low (optional) |
| 3 | **Lucide icon selection**: Which specific icons to use for the 5 "Why It Works" cards is not specified. | Use existing icons already used elsewhere in the project (e.g., `CheckSquare`, `GitBranch`, `Terminal`, `Shield`, `Brain`, `Zap`, `EyeOff`). Avoid adding new icon packages. | Low |
| 4 | **Arabic readability in mono font**: The plan notes this risk. | Keep Arabic body paragraphs short (≤8–10 lines per design system). Cairo is already configured as the Arabic fallback in `globals.css` via `font-family: "IBM Plex Mono", "Cairo", monospace`. The existing body font stack handles this. | Low |

---

## 10. Handoff Notes for Execution Agent

### Before you start
1. **Read the full planning document** at `.opencode/plans/redesign-explain-workflow-page.md` — this brief is derived from it but the plan has additional detail (visual recommendations, interaction ideas, narrative tone).
2. **Review `DESIGN.md`** at the project root for the complete design system reference — especially the "Do's and Don'ts" section.
3. **Review existing components** in `app/_components/_explain/` (before deletion) to understand existing patterns for RTL handling, translation usage, and framer-motion patterns.
4. **Review `app/[locale]/explain/page.tsx`** to understand the current server/client boundary pattern.

### Environment
- Run `npm run dev` to start the dev server.
- Running `npm run build` or `npx tsc --noEmit` validates TypeScript.
- The project uses Tailwind CSS v4 (`@import "tailwindcss"` in globals.css) — note the `@apply` syntax in `@layer components` for reusable classes.

### Key decisions already made (do not re-negotiate)
- ✅ `metaExplainPage` stays as a separate top-level namespace — `generateMetadata` uses `getServerTranslation(locale, "metaExplainPage")`
- ✅ `ExplainPageShell` is a server component (no `"use client"`); all sub-components using translations/framer-motion are client components
- ✅ No `any` types — use typed `params: Promise<{ locale: string }>`

### Known pitfalls
- **Translation key mismatch**: Every key in `en.json` must have a corresponding key in `ar.json`. Missing Arabic keys will cause `undefined` lookups at runtime. Verify both files have identical key structures before committing.
- **RTL animation mirroring**: Framer Motion `initial={{ x: -30 }}` in LTR becomes `initial={{ x: 30 }}` in RTL for the same visual effect. Either use conditional animation props based on locale, or use a direction-aware wrapper.
- **Hydration mismatch**: Any component that is a server component cannot use `useTranslation` (client hook). Keep `ExplainPageShell` and `page.tsx` free of client-side APIs.
- **ESLint disable removal**: The current `page.tsx` has `/* eslint-disable @typescript-eslint/no-explicit-any */` at the top. Remove this entirely — the typed params will make it unnecessary.

### Verification workflow
1. Run `npm run dev` and navigate to `/explain` and `/ar/explain`
2. Check all sections render at desktop, tablet, mobile viewports
3. Toggle between EN and AR — verify all text translates, RTL layout is correct
4. Verify no console errors in DevTools
5. Run `npx tsc --noEmit` or `npm run build` to verify TypeScript
6. Smoke test home, about, projects, skills pages for regressions

### Links
- Planning doc: `.opencode/plans/redesign-explain-workflow-page.md`
- Design system: `DESIGN.md`
- Translations EN: `translations/en.json`
- Translations AR: `translations/ar.json`

---
_Brief prepared by: Context & Prompt Preparation Agent (Step 2)_
_Workflow: Planning → **Context Prep** → Execution → Verification → Review → Documentation_
