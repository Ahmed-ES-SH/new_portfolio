# Redesign Explain Page — AI-Assisted Development Workflow

**One-line summary:** Redesign the `/app/[locale]/explain/page.tsx` from scratch to present the 5-stage AI-assisted software development workflow (Planning → Context/Prompt Preparation → Execution → Verification → Review) as a polished portfolio case-study page that communicates human-led, AI-assisted engineering.

---

## 1. Objective

Replace the current "Explain" page (which covers Rationale & Planning, Terminal-Driven Development, and Human Oversight) with a completely new page that visually documents the structured 5-phase development cycle: **Planning → Context/Prompt Preparation → Execution → Verification → Review**. The page must position the developer (Ahmed Ismail) as the decision-maker and AI as a controlled execution/analysis layer — not an autonomous replacement. The page must feel like a professional portfolio case study, not a generic AI workflow diagram.

---

## 2. Expected Outcome & Success Criteria

| Criterion | Verification Method |
|---|---|
| Page renders all 5 workflow stages with individual detailed sections | Visual inspection |
| Each stage section shows: purpose, human role, AI role, inputs, outputs, decisions made, mistakes prevented, why it matters | Visual inspection |
| A dedicated "Human vs AI Responsibility" section exists and clearly separates ownership | Visual inspection |
| A "Why This Workflow Works" section exists with 4–6 value cards | Visual inspection |
| Optional "Example Flow" section exists (mini case study) | Visual inspection |
| Hero section communicates "human-led, AI-assisted" before scroll | Visual inspection |
| Page is fully bilingual (EN/AR) — all new text content has translation entries in both `en.json` and `ar.json` | Run the page in both locales |
| RTL layout works correctly for Arabic (no broken alignment, mirrored workflow arrows if any) | Visual inspection in Arabic |
| Design system compliance — uses `#00f0ff` primary, IBM Plex Mono, pure black cards, zero-radius corners, no gradient text, no glassmorphism except nav | Style audit |
| Cyan accent stays below ~15% of viewport | Visual estimation |
| All existing route/framework patterns preserved (Next.js 15 App Router, `params: Promise<{ locale: string }>`, `generateMetadata`) | Code review |
| No regressions on other pages | Manual smoke test of home, about, projects, skills pages |
| All animations have `prefers-reduced-motion` fallbacks | Style audit |
| Body text maintains 4.5:1 contrast ratio | Color contrast check |

---

## 3. Sub-tasks / Milestones

### Phase A — Content & Translation (can run in parallel)
- [ ] A1. Define full content architecture for all 7+ page sections (hero, overview, 5 stages, human-vs-ai, why-it-works, example flow)
- [ ] A2. Write microcopy for all sections in English
- [ ] A3. Write Arabic translations for all sections
- [ ] A4. Update `en.json` and `ar.json` with new `explain` namespace keys — this is a **breaking change** to the translation shape

### Phase B — Component Architecture (sequential after A)
- [ ] B1. **Verify with grep** that no other file imports the old explain components, then delete: `ExplainHero.tsx`, `ExplainRationale.tsx`, `ExplainTerminal.tsx`, `ExplainHuman.tsx`
- [ ] B2. Create `constants/workflowStages.ts` — typed data array containing all 5 stage objects with translations keys
- [ ] B3. Create new component files:
  - `ExplainPageShell.tsx` — server component: wraps content with grid bg, locale direction, consistent padding
  - `ExplainWorkflowHero.tsx` — hero with headline, sub-headline, trust signal badges
  - `ExplainWorkflowOverview.tsx` — 5-step visual cycle (horizontal desktop / vertical mobile)
  - `ExplainStageDetail.tsx` — **reusable** single component that renders a stage breakdown card from props
  - `ExplainHumanVsAI.tsx` — two-column human vs AI responsibility comparison
  - `ExplainWhyItWorks.tsx` — value cards grid
  - `ExplainExampleFlow.tsx` — optional mini case study timeline

### Phase C — Page Integration (after B)
- [ ] C1. Rewrite `app/[locale]/explain/page.tsx` — new server component using `ExplainPageShell` and all new sub-components
- [ ] C2. Update `generateMetadata` — meta description should reflect the new workflow focus
- [ ] C3. Verify RTL layout works correctly for all new sections

### Phase D — Polish & Verification (after C)
- [ ] D1. Add scroll-based progress indicator / sticky workflow navigation (optional but recommended)
- [ ] D2. Verify all animations respect `prefers-reduced-motion`
- [ ] D3. Manual QA across desktop, tablet, mobile breakpoints
- [ ] D4. Verify no console errors, no hydration mismatches
- [ ] D5. Smoke test other pages for regressions

---

## 4. Scope

### In Scope
- Complete rewrite of the Explain page layout and content
- New component tree replacing all 4 existing components
- New translation entries in both `en.json` and `ar.json`
- New `constants/workflowStages.ts` data constant
- All sections specified in the requirements:
  - Hero/Intro
  - Workflow Overview (5-step cycle)
  - Detailed Stage Breakdown (5 cards/sections)
  - Human vs AI Responsibility
  - Why This Workflow Works
  - Optional Example Flow
- RTL support for all new content
- Scroll-based sticky navigation (if feasible within dev time)
- Framer Motion scroll-reveal animations on all stage sections

### Out of Scope
- Changing the global layout, navbar, footer, or any other page — the Explain page is isolated
- Adding a new route or modifying the routing structure
- Redesigning the design system tokens (colors, typography, spacing remain as defined in DESIGN.md)
- Adding actual interactive workflow simulation / demo (this is a static explainer page)
- Creating an animated SVG workflow diagram — use CSS/framer-motion based visual flow instead
- Changing the i18n mechanism or locale resolution logic
- Adding server-side data fetching for this page (it is fully static content)
- The "Optional Example Flow" section can be deferred to a follow-up if it would delay the core sections

---

## 5. Technical Constraints & Dependencies

### Framework & Routing
- **Next.js 15 App Router** — `params` is a `Promise<{ locale: string }>` (must be awaited)
- **Locale resolution** via `params.locale`, direction mapped via `directionMap` from `@/constants/global`
- **Metadata** must use `generateMetadata` with `getServerTranslation(locale, "metaExplainPage")`

### Design System (from DESIGN.md)
- **No gradient text** (`background-clip: text`)
- **No glassmorphism** outside nav/topbar
- **Zero border-radius** on all containers
- **Pure black** (`#000000`) for card backgrounds
- **IBM Plex Mono** for all text — no font swapping
- **Cyan accent ≤15%** of any viewport
- **No side-stripe borders** (`border-left`/`border-right` >1px as accent on cards) — use full borders or bg tints
- **No numbered section markers** ("01 //", "02 //") as default scaffolding — numbers only when the sequence is real (the 5-stage workflow *is* a real sequence, so numbered stages are appropriate)
- **No bounce or elastic easings** — use quart/quint/expo ease-out
- **Animate only transform and opacity** — no layout animations
- **`prefers-reduced-motion`** fallbacks on every animation

### Translation System
- **Namespace**: `explain` (same as current — but shape will change completely)
- **Hook**: `useTranslation("explain")` on client components
- **Server helper**: `getServerTranslation(locale, "explain")` for server components
- Both `en.json` and `ar.json` must be updated in lockstep

### External Libraries (already in project)
- **framer-motion** — for `whileInView` scroll animations
- **lucide-react** — for icons (check available icons, avoid adding new icon packages)
- **Custom translation hook** — `useTranslation` from `@/app/hooks/useTranslation`

### Dependencies
- None — this page is independent of other feature work
- Must not break existing pages (home, about, projects, skills, contact)

---

## 6. Risks & Assumptions

### Risks

| Risk | Severity | Likelihood | Mitigation |
|---|---|---|---|
| **Translation shape change breaks existing references** (if any page imports `explain` namespace keys outside the explain page) | HIGH | LOW — grep confirms only explain page uses `explain` namespace | Search entire codebase for `t("explain` or `useTranslation("explain"` — already confirmed only the explain page uses it |
| **New content length overwhelms the page** — the spec is very detailed (5 stages × 7 fields each + 4 additional sections) | MEDIUM | MEDIUM | Use expandable detail panels for per-stage content; keep visible summary compact |
| **Arabic text in mono font may be less readable** for long body copy | MEDIUM | MEDIUM | Cairo is already configured as Arabic fallback in the design system; use it for body paragraphs and keep paragraphs short (max 8–10 lines per the design system) |
| **Scroll-based animations on a long page feel sluggish** | LOW | MEDIUM | Use `whileInView` with `once: true` and stagger children; avoid animating every single element independently |
| **Backwards compatibility with old translation keys** if a user has cached the old page | LOW | HIGH | Since the page is fully replaced, old keys will cause undefined lookups; ensure new translation files cover every new key and old keys are removed to avoid dead code |

### Assumptions
- The `explain` namespace is used **only** by the explain page — confirmed via grep
- The current `container-section` utility class is sufficient for all new sections
- The four existing `.tsx` files in `_explain/` can be deleted entirely (no other file imports them) — **verify with grep before deletion**
- All new components will be client components (`"use client"`) because they use `useTranslation` and framer-motion
- The `ExplainPageShell` wrapper can be a server component that handles locale direction and grid background, delegating to client children

---

## 7. Affected Files, Modules & Systems

### Files to DELETE
| File | Reason |
|---|---|
| `app/_components/_explain/ExplainHero.tsx` | Replaced by `ExplainWorkflowHero.tsx` |
| `app/_components/_explain/ExplainRationale.tsx` | Replaced by new stage sections |
| `app/_components/_explain/ExplainTerminal.tsx` | Replaced by new stage sections |
| `app/_components/_explain/ExplainHuman.tsx` | Replaced by `ExplainHumanVsAI.tsx` |

### Files to MODIFY
| File | Change |
|---|---|
| `app/[locale]/explain/page.tsx` | Complete rewrite — new imports, new component tree |
| `translations/en.json` | Replace the entire `explain` object with new structure |
| `translations/ar.json` | Replace the entire `explain` object with new structure |

### Files to CREATE
| File | Purpose |
|---|---|
| `app/_components/_explain/ExplainWorkflowHero.tsx` | Hero section with headline, summary, status badges |
| `app/_components/_explain/ExplainWorkflowOverview.tsx` | 5-step visual cycle overview |
| `app/_components/_explain/ExplainStageDetail.tsx` | **Reusable** stage breakdown component |
| `app/_components/_explain/ExplainHumanVsAI.tsx` | Human vs AI responsibility comparison |
| `app/_components/_explain/ExplainWhyItWorks.tsx` | Value proposition cards |
| `app/_components/_explain/ExplainExampleFlow.tsx` | Optional mini case study |
| `app/_components/_explain/ExplainPageShell.tsx` | **Server component** — wraps content with grid bg, locale direction, consistent padding |
| `constants/workflowStages.ts` | Typed data structure for all 5 stages |

### Systems Touched
- **Translation system** — new keys in `explain` namespace
- **Component system** — new `_explain/` components, old ones removed
- **No infrastructure, no database, no API changes**

---

## 8. Open Questions & Blockers

### 🔴 Blocker (must resolve before implementation)

1. **Translation key strategy**: The current `explain` namespace has a flat structure under `hero`, `rationale`, `terminal`, `human`. The new page needs a much deeper structure. **Recommendation**: Fully replace the existing `explain` object (option a) since the old page is completely replaced. **Needs confirmation.**

2. **Stage detail component design**: Should each of the 5 stages be a separate component file, or a single reusable `ExplainStageDetail` that receives stage data as props? **Recommendation**: Single reusable component — reduces duplication, enforces consistency, easy to add stages. **Needs confirmation.**

### 🟡 Clarifications (work can proceed with assumptions)

3. **Example Flow content**: Should the mini case study be hardcoded or pulled from translations? **Assumption**: Hardcoded example for simplicity.

4. **Visual cycle direction**: Horizontal timeline or vertical stacked flow? **Assumption**: Vertical stacked flow on mobile, horizontal connected steps on desktop — using CSS grid/flex switching.

5. **Expansion panels**: Should secondary info be expandable or always visible? **Assumption**: Always visible but visually grouped with smaller font and dimmer colors.

6. **"Human vs AI" visual pattern**: Two-column comparison table or layered diagram? **Assumption**: Two-column layout — `Human Responsibilities` | `AI Responsibilities` — with matching rows per phase.

---

## 9. Suggested Implementation Approach

### Architectural Decision: Reusable Stage Component with Data-Driven Content

Create a single `ExplainStageDetail` component that accepts a `StageData` prop with the following shape:

```typescript
interface StageData {
  number: number;
  slug: string;
  title: string;
  purpose: string;
  humanRole: string;
  aiRole: string;
  inputs: string[];
  outputs: string[];
  decisions: string[];
  prevents: string[];
  whyMatters: string;
}
```

Store all 5 stages in a `workflowStages.ts` constant file that maps to translation keys. The component renders a consistent card layout for all stages.

### Page Structure (top to bottom)

```
<ExplainPageShell>                               ← server component, wraps with grid bg, dir, spacing
  <ExplainWorkflowHero />                        ← Hero with headline + status badges
  <ExplainWorkflowOverview />                    ← 5-step visual cycle (horizontal desktop / vertical mobile)
  {/* Stage sections — rendered from data array */}
  {STAGES.map((stage) => <ExplainStageDetail key={stage.slug} data={stage} />)}
  <ExplainHumanVsAI />                           ← Two-column responsibility split
  <ExplainWhyItWorks />                          ← 4–6 value cards in a grid
  <ExplainExampleFlow />                         ← Optional mini case study
</ExplainPageShell>
```

### Sticky Workflow Navigation (Optional Enhancement)

Add a scroll-spy progress indicator — a vertical timeline on the left edge (desktop) or thin top bar (mobile) that fills as the user scrolls through stages. Uses framer-motion `useScroll` + `useTransform`.

### Visual Recommendations per Section

| Section | Layout | Key Visual Elements |
|---|---|---|
| **Hero** | Full-width, left-aligned (or centered for EN), max-width constrained | Cyan accent line, status badge row ("Human-led" / "AI-assisted" as pill badges with colored dots), large display headline, compact blurb |
| **Overview** | Horizontal row of 5 connected numbered cards on desktop; vertical list on mobile | Number circles with cyan border, connector lines/arrows between stages, dim arrow SVGs in cyan |
| **Stage Detail** | Full-width card per stage, alternating offset (even stages slightly inset) | Large stage number (opacity 0.1 as background decoration), card header with stage name, then purpose, then two-column "My Role / AI Role" split, then compact lists for inputs/outputs/decisions/prevents |
| **Human vs AI** | Two-column table-like comparison with phase rows | Left column cyan-tinted, right column slate/dim tint, phase labels as row headers |
| **Why It Works** | 2×3 or 3×2 card grid | Icon + title + short description cards, subtle cyan left border or top border |
| **Example Flow** | Vertical step list with compact status badges per stage | Timeline left rail with connected dots, stage name badge + one-line action |

### Key Interaction Ideas

- **Scroll-triggered sticky progress indicator**: Vertical timeline on left edge (desktop) or thin top bar (mobile) that fills on scroll. framer-motion `useScroll` + `useTransform`.
- **Stage detail cards**: `whileInView` fade-up staggered entrance (staggerChildren: 0.1). Large background number fades in first, then content.
- **Hover on overview steps**: Each overview card highlights on hover with full neon-border glow, tooltip or expand shows the one-line summary.
- **Expansion on stage details**: Optional — keep all fields visible but use visual weight (dim labels, small text) to prioritize purpose + roles over secondary info.

### Translation Shape (New `explain` namespace)

```json
{
  "explain": {
    "meta": { "title": "...", "description": "..." },
    "hero": {
      "headline": "My AI-Assisted Development Workflow",
      "subHeadline": "...",
      "trustSignals": ["Human-led", "AI-assisted", "Verification-first", "Review before acceptance"]
    },
    "overview": {
      "title": "THE WORKFLOW",
      "subtitle": "...",
      "steps": [
        { "number": "01", "label": "Planning", "summary": "Define the objective, scope, constraints, and success criteria" },
        { "number": "02", "label": "Context / Prompt Preparation", "summary": "Convert the plan into a precise execution brief for AI" },
        { "number": "03", "label": "Execution", "summary": "Implement the task within the defined scope and constraints" },
        { "number": "04", "label": "Verification", "summary": "Validate correctness against requirements and expected behavior" },
        { "number": "05", "label": "Review", "summary": "Judge code quality, maintainability, and long-term engineering fit" }
      ]
    },
    "stages": {
      "planning": {
        "stageNum": "01", "title": "Planning",
        "purpose": "...",
        "humanRole": "...",
        "aiRole": "...",
        "inputs": ["Task request", "Project context", "Architecture docs"],
        "outputs": ["Structured plan", "Scope boundaries", "Acceptance criteria"],
        "decisions": ["What to build", "What not to build", "Success definition"],
        "prevents": ["Ambiguous requirements", "Scope creep", "Undefined 'done'"],
        "whyMatters": "Reducing ambiguity before implementation is the highest-leverage engineering activity."
      },
      "contextPrep": { /* same shape */ },
      "execution": { /* same shape */ },
      "verification": { /* same shape */ },
      "review": { /* same shape */ }
    },
    "humanVsAI": {
      "title": "Human-Led, AI-Assisted",
      "humanTitle": "My Responsibility",
      "aiTitle": "AI's Role",
      "rows": [
        { "phase": "Planning", "human": "Define objective and scope", "ai": "None — not yet involved" },
        { "phase": "Context Preparation", "human": "Write execution brief", "ai": "Receive instructions" },
        { "phase": "Execution", "human": "Supervise and steer", "ai": "Implement scoped changes" },
        { "phase": "Verification", "human": "Validate against criteria", "ai": "Provide analysis" },
        { "phase": "Review", "human": "Judge quality and approve", "ai": "Suggest improvements" }
      ]
    },
    "whyItWorks": {
      "title": "WHY THIS WORKFLOW WORKS",
      "cards": [
        { "title": "Clarity Before Code", "desc": "..." },
        { "title": "Controlled AI Execution", "desc": "..." },
        { "title": "Quality at Every Gate", "desc": "..." },
        { "title": "Repeatable & Predictable", "desc": "..." },
        { "title": "Human Accountability", "desc": "..." }
      ]
    },
    "exampleFlow": {
      "title": "A REAL EXAMPLE",
      "task": "Add authentication to admin dashboard",
      "stages": [
        { "stage": "Planning", "action": "Defined scope, affected routes, auth rules" },
        { "stage": "Context Preparation", "action": "Gathered auth files, route guards, API contracts" },
        { "stage": "Execution", "action": "Implemented auth flow within scope" },
        { "stage": "Verification", "action": "Confirmed behavior and edge cases" },
        { "stage": "Review", "action": "Checked maintainability and architecture fit" }
      ]
    }
  }
}
```

### Page Character & Narrative Goal

The final impression should be:

> *"This is not someone who prompts AI and hopes for the best. This is an engineer who has designed a systematic development pipeline where AI operates inside clearly defined gates — planning, context, execution, verification, review — and every gate has a human decision. The workflow exists not because AI is unreliable, but because professional engineering demands clarity, accountability, and quality. The developer is in control at every moment."*

The tone is confident, precise, and calm. The page earns trust through structure, not through hype. Every section reinforces the core message: **human-led, AI-assisted, verification-first, review-before-acceptance.**

---

## Metadata

- **Phase**: Planning
- **Status**: Approved
- **Approved on**: 2026-06-25
- **Next phase**: Context/Prompt Preparation
