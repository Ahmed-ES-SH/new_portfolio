---
target: app/[locale]/skills/page.tsx
total_score: 24
p0_count: 0
p1_count: 5
p2_count: 3
timestamp: 2026-06-25T16-00-04Z
slug: app-locale-skills-page-tsx
---
# Design Critique: app/[locale]/skills/page.tsx

## Design Health Score: 24/40

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | No loading states (SSR, fine). No category indicator beyond headers |
| 2 | Match System / Real World | 3 | Terminal metaphor consistent. Uppercase mono skill names sacrifice readability |
| 3 | User Control and Freedom | 3 | No destructive actions. No skill filtering/sorting for 30+ items |
| 4 | Consistency and Standards | 2 | Scanlines + grids + parallax + slider rounded-full + layout animation — conflicting systems |
| 5 | Error Prevention | 3 | Read-only page, low error surface |
| 6 | Recognition Rather Than Recall | 3 | Skills visible by name. Icons help recognition |
| 7 | Flexibility and Efficiency | 1 | Zero shortcuts, no filtering/search. Linear browse only |
| 8 | Aesthetic and Minimalist Design | 2 | Overproduction: 3 background layers + ping dot + glow lines + slider + neon borders |
| 9 | Error Recovery | 3 | No error-prone interactions |
| 10 | Help and Documentation | 1 | No tooltips/inline help. Skill descriptions never shown on cards |
| **Total** | | **24/40** | **Acceptable — low end** |

## Anti-Patterns Verdict

**This page does not scream "AI made this" outright** — the dark cyberpunk direction has its own identity. But it triggers multiple category-reflex tells: scanline overlay, status badge kicker, cyan-on-black terminal tropes, identical card grid. PRODUCT.md specifically names these as things to evolve away from.

**Deterministic scan:** `detect.mjs` found 1 anti-pattern:
- **Side-tab accent border** (`border-l-4 border-(--primary,#00f0ff)`) at line 106 — colored left border on each category `<h2>`. Absolute ban violation.

## Overall Impression

Technically functional but visually overproduced and internally conflicted. It deploys every visual in the system at once (grid, scanlines, parallax background, neon glows, gradient lines, ping animations, infinite sliders) — violating "Confidence without shouting" and the Cyan Ceiling Rule. The biggest missed opportunity: skill descriptions — carefully written bilingual content — are never rendered on the page.

## What's Working

1. **RTL parity** — `dir={directionMap[locale]}`, RTL-aware border swapping. The bilingual foundation is solid.
2. **Category layout** — Headers with gradient underline provide clear narrative structure across 5 groups.
3. **Performance** — SSR page, no client waterfalls. Efficient data mapping.

## Priority Issues

### [P1] Scanline overlay contradicts product direction
Scanline texture across the entire page (line 93). PRODUCT.md explicitly says to evolve away from this trope. The grid background is sufficient.
**Suggested command:** `/impeccable quieter app/[locale]/skills/page.tsx`

### [P1] Side-stripe border on every category heading
`border-l-4 border-(--primary,#00f0ff)` on line 106 — absolute ban violation. Replace with full bottom border or remove.
**Suggested command:** `/impeccable quieter app/[locale]/skills/page.tsx`

### [P1] Skill descriptions are never rendered
SkillCard receives `skill.desc` but never displays it. Only icon and title shown. Recruiters cannot assess depth. Well-written bilingual content goes unread.
**Suggested command:** `/impeccable distill app/_components/_skills/SkillCard.tsx`

### [P1] `animate-ping` has no reduced-motion fallback
Status dot in SkillsHeroSection (line 27) runs unconditionally. PRODUCT.md requires reduced-motion fallbacks on all animations.
**Suggested command:** `/impeccable polish app/[locale]/skills/page.tsx`

### [P1] Read-more uses height animation (layout property)
Lines 49-56 animate `height` — banned by design system. Causes layout reflow.
**Suggested command:** `/impeccable polish app/[locale]/skills/page.tsx`

### [P2] 12-row parallax background animation
SkillsBackGround renders 12 × ~30 = ~360 image elements with continuous GPU animation. Battery drain, no reduced-motion stop.
**Suggested command:** `/impeccable quieter app/_components/_skills/SkillsBackGround.tsx`

### [P2] Identical card grid (icon + title, repeated 30×)
"Identical card grids" absolute ban. No distinction between expert vs. familiar skills.
**Suggested command:** `/impeccable shape app/_components/_skills/SkillCard.tsx`

### [P2] Cyan Ceiling Rule likely exceeded
Cyan appears on nearly every element. DESIGN.md limits it to ≤15% of any viewport.
**Suggested command:** `/impeccable quieter app/[locale]/skills/page.tsx`

### [P3] `rounded-full` on slider items breaks zero-radius rule
SkillsSlider line 22. DESIGN.md: zero-radius corners on all containers.
**Suggested command:** `/impeccable polish app/_components/_skills/SkillsSlider.tsx`

### [P3] Hero heading overflow risk
`text-4xl md:text-6xl` with multi-word titles can overflow on tablet/with Arabic.
**Suggested command:** `/impeccable adapt app/[locale]/skills/page.tsx`

## Persona Red Flags

**Jordan (First-Timer / recruiter):** 30+ skills with no depth differentiation. Description clipped behind read-more. "AI Capabilities" vs "AI Tooling" overlap in meaning.

**Casey (Distracted Mobile User):** 12 parallax rows drain battery. No search for 30+ skills. Duplicate icon images loaded by slider.

**Riley (Stress Tester):** RTL + height animation may clip. `mask-x-from-90%` classes may be inert (no-op CSS).

## Minor Observations
- `rounded-full` on SkillsSlider breaks zero-radius system rule
- `mask-x-from-90%` classes may not resolve in this Tailwind config
- No `text-wrap: balance` on h1
- Background grid 40px differs from 50px mentioned in DESIGN.md
- Read-more button lacks `aria-expanded`
