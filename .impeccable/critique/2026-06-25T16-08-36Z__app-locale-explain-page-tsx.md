---
target: app/[locale]/explain/page.tsx
total_score: 26
p0_count: 0
p1_count: 2
p2_count: 2
timestamp: 2026-06-25T16-08-36Z
slug: app-locale-explain-page-tsx
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No scroll-progress or stage-marker as user moves through 5 stages |
| 2 | Match System / Real World | 3 | Clear terminology for tech audience; "spec-driven" jargon acceptable for target |
| 3 | User Control and Freedom | 3 | No back-to-top or stage-jump navigation on a long page |
| 4 | Consistency and Standards | 2 | Every section uses identical eyebrow+kicker template — internally consistent but monotonous; design system explicitly bans this pattern |
| 5 | Error Prevention | 4 | Static content page; no error paths exist |
| 6 | Recognition Rather Than Recall | 2 | Long scroll with no persistent navigation; must remember what stage 2 said when reading stage 5 |
| 7 | Flexibility and Efficiency | 2 | No TOC, jump links, or keyboard shortcuts for 8-section page |
| 8 | Aesthetic and Minimalist Design | 2 | Repeating pattern across every section creates visual noise; identical card grid; template-like structure |
| 9 | Error Recovery | 4 | No errors possible |
| 10 | Help and Documentation | 1 | Page not linked from main nav; no guidance on how to use the page |
| **Total** | | **26/40** | **Acceptable** |

#### Anti-Patterns Verdict

**LLM assessment:** This page shows clear signs of template-driven structure. Every section (Workflow Overview, Human vs AI, Why This Workflow Works, Example Flow) opens with the identical kicker: a `h-px` gradient line on both sides of a `10px font-black tracking-[0.4em]` uppercase label. The DESIGN.md explicitly bans this: *"A single strong kicker can be voice; repeating it on every section is AI grammar."* The page reads as a content template filled in with copy, not as a deliberately crafted narrative flow. The "Why This Workflow Works" section has 5 structurally identical cards (icon box + uppercase title + description), which the design system bans as "identical card grids." The stage detail sections follow the exact same layout for all 5 stages: purpose → human/AI split → 4-column grid → callout. Template consistency becomes monotony.

The content itself is substantive and well-written. The page structure is logical. But the chrome — the decorative framing around each section — is where the AI grammar leaks through.

**Deterministic scan:** The bundled detector (`detect.mjs`) ran against all 7 component files in `app/_components/_explain/` and returned zero findings. The scan was clean — no contrast, labeling, or structural antipatterns detected at the deterministic level.

**Visual overlays:** No browser visualization was performed — the critique target is a source path (not a URL), and the deterministic CLI scan already returned clean results. The live dev server is accessible at `localhost:3000/en/explain` for manual inspection.

#### Overall Impression

The Explain page communicates a genuinely interesting workflow with well-written copy and solid information architecture. It's structurally sound and consistent with the site's visual identity. The problem is that the visual consistency is achieved through template repetition rather than intentional design variation. Every section header looks the same, every card looks the same, every stage detail follows the exact same layout. For a page that sells Ahmed's *craft* — the very skill a recruiter is evaluating — the presentation needs to feel more bespoke and less templated. The single biggest opportunity is to let each section's visual treatment be shaped by its content, not by a shared template.

#### What's Working

1. **Clear information architecture.** The page flows logically: what → overview → detail per stage → comparison → why it works → real example. A recruiter can understand the process in under 30 seconds of scanning.

2. **Strong copy.** The translation content is specific, substantive, and avoids empty filler. "Human-led decision making" and "spec-driven execution" are concise differentiators. Each stage's "why it matters" callout gives a concrete reason for the stage to exist.

3. **Consistent brand execution.** The dark/cyan palette, monospaced typography, and grid background are faithfully applied. The page unmistakably belongs to the same system as the rest of the portfolio.

#### Priority Issues

- **[P1] Every section uses the identical eyebrow + gradient-line header treatment.** Four sections (THE WORKFLOW, HUMAN VS AI RESPONSIBILITY, WHY THIS WORKFLOW WORKS, EXAMPLE: ADDING A FEATURE) all open with `flex items-center gap-4` → gradient line → `text-[10px] font-black tracking-[0.4em]` uppercase label → reverse gradient line. The DESIGN.md explicitly bans this: *"Don't put the tiny uppercase tracked eyebrow above every section heading. A single strong kicker can be voice; repeating it on every section is AI grammar."* **Why it matters:** This pattern immediately reads as template scaffolding. For a page whose purpose is to demonstrate Ahmed's craft, template repetition undermines the message. **Fix:** Vary section headers by content. The Workflow Overview could use left-bracket decoration (like CLI output). Human vs AI could use a table-header style. Why It Works could lead with a stat. Example Flow could have no kicker at all — just a heading. Let content dictate header structure. **Suggested command:** `/impeccable layout`

- **[P1] Identical card grid in "Why This Workflow Works."** Five cards with the exact same structure: `w-10 h-10` icon box → uppercase title → `text-xs text-slate-400` description. This is listed under the absolute bans as "Identical card grids." **Why it matters:** Cards become wallpaper — the reader stops seeing them individually and scans past the entire section. Each card's content (Speed, Quality, Human Judgment, etc.) is distinct enough to warrant different treatments. **Fix:** Vary card structure. "Speed Without Chaos" could be a stat callout (big number + explanation). "Quality Through Process" could be a checklist. "Human Judgment at Every Gate" could be a highlighted quote. The structure should be shaped by the content, not by a template. **Suggested command:** `/impeccable distill`

- **[P2] No persistent stage navigation on a long sequential page.** The page covers 5 stages in detail, plus a comparison table, an explanation section, and an example flow — roughly 8 vertical sections. There's no sticky stage indicator, no "you are here" marker on the 5-stage sequence, and no way to jump to a specific stage. **Why it matters:** Recruiters are comparing candidates. If they want to check "stage 3" (Execution), they must scroll blindly through the entire page. Users who land on the page and want to skim will leave before finding what they need. **Fix:** Add a sticky sidebar or horizontal stage indicator that updates as the user scrolls through each stage section. A minimal 5-dot progress bar or a floating "Stage 3 of 5" label would suffice. **Suggested command:** `/impeccable adapt`

- **[P2] Template-identical stage detail sections.** All 5 stages use: large background number → stage number label → heading → purpose paragraph → human/AI role grid → 4-column list grid → "why it matters" callout. **Why it matters:** The information architecture is sound, but the uniform layout means the first stage after the overview teaches the reader the template, and the remaining 4 stages are predictable rather than engaging. The most interesting aspects of each stage are flattened into sameness. **Fix:** Let each stage's layout be shaped by what's most notable about it. Planning (stage 1) could emphasize the execution brief as a hero element. Execution (stage 3) could show a code-snippet comparison. Verification (stage 4) could lead with a test-results panel. **Suggested command:** `/impeccable layout`

- **[P3] Page not linked from primary navigation.** The top nav shows: Home, Log (About), Skills, Projects. The bottom mobile nav shows: grid (Home), user (About), CPU (Skills), table (Projects). There's no entry for the Explain page in either navigation system. **Why it matters:** Recruiters won't find this page unless they already know the URL or it's linked from somewhere else (e.g., a "how I work" link on the About page or a callout on the home page). **Fix:** Add a navigation entry ("./Workflow" matching the i18n key) or link to this page prominently from the About page. **Suggested command:** `/impeccable layout`

#### Persona Red Flags

**Jordan (First-Timer, recruiter)**: Jordan lands on the portfolio and navigates to the Explain page (or finds it via search). Jordan sees a dark, technical page with uppercase labels and tracked terminology. The "STAGE_01" labels are clear, but Jordan has to scroll through all 5 stages to understand the full process — there's no summary card or sticky indicator showing the full picture. Jordan would benefit from a "TL;DR" section at the top or a persistent overview. Without it, Jordan might read stages 1-2, lose context, and abandon around stage 3.

**Riley (Stress Tester, rival developer)**: Riley notices the gradient-line section headers are identical across every section. Riley identifies the `text-[10px] tracking-[0.4em] uppercase` pattern as a template artifact. Riley questions whether the page was AI-generated — the exact repetition of visual patterns across sections is the kind of shortcut AI tools produce. Riley would be looking for craft details and finds template uniformity instead.

**Alex (Power User, technical hiring manager)**: Alex wants to find "Execution" (stage 3) to understand how AI code generation is controlled. Alex scrolls past stages 1-2 because the layout is identical and there's no way to skip ahead. Alex gets frustrated with the scroll and looks for a "Skip to stage 3" link — there isn't one. Alex evaluates the portfolio as "solid content, template delivery."

#### Minor Observations

- The `border-t-2 border-primary/30` on Why It Works cards is a variant of the banned "side-stripe" pattern (accent applied to one edge). Consider a full border or a solid background tint instead.
- The hero has a hardcoded `pt-32 pb-16` that doesn't account for the fixed header height on all viewports.
- The Workflow Overview step cards show a connector line between steps on desktop, but the 5-column layout at 220px max-width per card means text gets cramped at tablet sizes (`md:grid-cols-5` collapses to single-column on mobile, but the in-between state around 1024px is tight).
- The `max-w-2xl` on the overview subtitle constrains the line length well, but the `text-center` alignment paired with a left-cyan-accent line in the hero creates a slight directional tension.
- Each section uses `py-20` which creates strong vertical rhythm but also significant repetition in whitespace. Some sections could use `py-16` or `py-24` for rhythmic variation.
- The human-vs-AI table uses `overflow-x-auto` which is correct for responsive, but on mobile the table with 15% / 42.5% / 42.5% column widths will be very narrow and hard to read.

#### Questions to Consider

- "If the goal of this page is to demonstrate craft, does the template-driven visual presentation support or undermine that message?"
- "What would it look like if the first stage detail emphasized the planning document (the execution brief) as the hero, while the third stage showed actual code outputs rather than role descriptions?"
- "Is a scrollytelling format right for 8 sections of text-heavy content, or would a tabbed/accordion pattern let recruiters move faster?"
