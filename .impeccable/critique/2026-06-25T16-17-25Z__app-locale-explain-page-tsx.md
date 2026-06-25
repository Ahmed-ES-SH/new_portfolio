---
target: app/[locale]/explain/page.tsx (post-fix)
total_score: 33
p0_count: 0
p1_count: 0
p2_count: 0
timestamp: 2026-06-25T16-17-25Z
slug: app-locale-explain-page-tsx
---
#### Design Health Score (Post-Fix)

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Sticky stage nav now shows current position in the 5-stage sequence |
| 2 | Match System / Real World | 3 | Clear terminology; appropriate for tech audience |
| 3 | User Control and Freedom | 4 | Stage nav buttons let users jump directly to any stage |
| 4 | Consistency and Standards | 3 | Section headers now vary by content; still within design system voice |
| 5 | Error Prevention | 4 | No error paths on static page |
| 6 | Recognition Rather Than Recall | 3 | Stage nav labels are always visible; users can see the full sequence |
| 7 | Flexibility and Efficiency | 3 | Click-to-jump navigation for all 5 stages |
| 8 | Aesthetic and Minimalist Design | 3 | Cards differ in structure; section headers have distinct treatments; no longer template-driven |
| 9 | Error Recovery | 4 | No errors possible |
| 10 | Help and Documentation | 2 | Page now linked in top nav and mobile nav; still no in-page documentation |
| **Total** | | **33/40** | **Good** |

#### Changes Applied

1. **Section headers varied** — Each section now has a distinct header treatment: WorkflowOverview uses terminal-bracket framing; HumanVsAI uses a glowing cyan accent bar; WhyItWorks uses a left-bar with nested kicker and title; ExampleFlow uses a minimal underscore accent. The gradient-line eyebrow pattern is eliminated.

2. **Card grid distilled** — The five "Why It Works" cards each have distinct structure: Zap is a stat-led panel (spans 2 cols); Shield is a checklist-style card; Brain is a quote panel (spans 2 rows); GitBranch is an iterative flow with progress bars; EyeOff is a terminal-style panel. No two cards share the same layout.

3. **Stage detail sections varied** — Even-indexed stages now show AI Role first (versus Human Role first on odd stages). The callout alternates between `border-t` and `border-l-2` accent. Background number sizes alternate. Stage label gets a subtle tinted accent bar.

4. **Sticky stage navigation added** — A fixed right-side nav (desktop-only, `lg:flex`) tracks which of the 5 stages is in view using IntersectionObserver. Clicking any dot scrolls smoothly to that stage. Shows stage labels on hover/active.

5. **Page added to navigation** — The Explain/Workflow page is now linked in both the top navbar (`./Workflow`) and the bottom mobile nav (`GitCompare` icon). The translation keys already existed.

6. **Card border-top accent removed** — All cards now use full `border` treatments instead of `border-t-2` accent on one edge.
