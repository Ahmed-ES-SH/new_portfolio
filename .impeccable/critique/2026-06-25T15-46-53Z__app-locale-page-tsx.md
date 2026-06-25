---
target: app/[locale]/page.tsx — Homepage HeroSection
total_score: 25
p0_count: 0
p1_count: 3
p2_count: 2
timestamp: 2026-06-25T15-46-53Z
slug: app-locale-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Typewriter animation communicates activity but stat labels may obscure meaning |
| 2 | Match System / Real World | 3/4 | Terminal/HUD metaphor is consistent; tech-coordinate jargon may confuse non-technical recruiters |
| 3 | User Control and Freedom | 2/4 | Typewriter auto-cycles with no pause control; bounce animation can't be stopped |
| 4 | Consistency and Standards | 3/4 | Design system applied consistently; side-stripe border accent breaks own rules |
| 5 | Error Prevention | 2/4 | No destructive actions; external image URL is a fragility risk |
| 6 | Recognition Rather Than Recall | 3/4 | CTAs are clear; typewriter animation makes headings harder to catch on scan |
| 7 | Flexibility and Efficiency | 2/4 | No keyboard shortcuts; power users can't skip the typewriter animation |
| 8 | Aesthetic and Minimalist Design | 3/4 | Strong committed aesthetic; floating mascot and scanline are decorative noise |
| 9 | Error Recovery | 2/4 | External image breakage would show broken asset with no fallback |
| 10 | Help and Documentation | 2/4 | Terminal module has `/help` but no inline guidance on hero |
| **Total** | | **25/40** | **Acceptable** |

## Anti-Patterns Verdict

**Does this look AI-generated?** No — but it has tropes.

The dark cyberpunk HUD aesthetic is committed and goes beyond generic templates. The IBM Plex Mono system, grid backgrounds, scanline overlays, and floating stat panels form a consistent, intentional visual language. A recruiter wouldn't glance and say "AI made this."

**However**, the typewriter animation and floating tech mascot with bounce easing edge toward the developer-portfolio trope zone. These are the elements that feel most "template-like" and least intentional within the otherwise refined system.

**Deterministic scan** (detect.mjs):
- **1 finding**: `bounce-easing` at `HeroSection.tsx:147` — `animate-bounce` on the floating mascot. The design system explicitly bans bounce easings.

**Browser visualization**: No browser automation available. Fallback signal: code review only.

## Overall Impression

The homepage has strong bones — a committed dark cyberpunk identity, distinctive stat panel composition, and consistent monospaced typography. The single biggest opportunity is removing the elements that undermine the refinement: the bounce-animated external mascot image, the side-stripe border on the subtitle (banned by the DS), and the typewriter timing that fights the user's scanning rhythm.

## What's Working

1. **Floating stat boxes as a layout move** — The terminal-style panels nested along the portrait's left edge are creative and break away from standard portfolio hero layouts. The progress bars and flickering values sell the HUD metaphor better than decorative icons would.

2. **Consistent single-family typography** — IBM Plex Mono throughout with no second font is a genuine design commitment. The weight contrasts (900 labels vs 400 body) create hierarchy within a monospaced constraint.

3. **The tech-info corner badges** — Small details like `ID: A-001`, `SRC: dev.ahmed.local`, and coordinate badges in the portrait corners reinforce the system metaphor without overwhelming the composition. These are exactly the kind of earned decorative elements the DESIGN.md calls for.

## Priority Issues

### [P1] Bounce easing on floating mascot — contradicts design system

- **What**: The `animate-bounce` class on the Google-hosted mascot image at `HeroSection.tsx:147` with `[animation-duration:4s]`.
- **Why it matters**: The design system explicitly bans bounce/elastic easings ("Don't use bounce or elastic easings. Exponential ease-out for entrances."). It's the single finding the automated detector caught. It also makes an otherwise refined hero feel cheap.
- **Fix**: Remove `animate-bounce`. Use a subtle `animate-float` with a custom `ease-in-out` keyframe or remove the element entirely if it doesn't earn its place.
- **Suggested command**: `/impeccable polish`

### [P1] External Google-hosted image as a hard dependency

- **What**: The floating mascot image at `HeroSection.tsx:144` loads from `lh3.googleusercontent.com` — a personal Google user-content URL with a long opaque ID.
- **Why it matters**: This WILL break when Google rotates URLs, the asset is cleaned up, or access permissions change. The portfolio then ships with a broken image in a prominent position.
- **Fix**: Download the asset locally to `/public/` and reference it as a local import, or remove the mascot element if it's not essential.
- **Suggested command**: `/impeccable polish`

### [P1] Side-stripe border accent on subtitle — banned by design system

- **What**: `border-s-2 border-(--color-accent-blue)` on the subtitle paragraph at `HeroSection.tsx:32`.
- **Why it matters**: The DESIGN.md's Don'ts section explicitly states: "Don't add side-stripe borders (border-left or border-right >1px as a colored accent on cards or callouts). Use full borders or background tints instead."
- **Fix**: Replace the 2px left border with a full-width top/bottom border or keep the border-left but reduce to 1px with a tinted bg as the primary visual cue (the `bg-accent-blue/5` is already there).
- **Suggested command**: `/impeccable polish`

### [P2] Typewriter animation fights scanning

- **What**: The `TypeAnimation` component cycles through 4 job titles every 2 seconds with `repeat={Infinity}` at `AnimateText.tsx:21-28`.
- **Why it matters**: Recruiters scan hero sections in 2-5 seconds. If they land on the wrong word in the cycle, they may miss the primary value prop. The animation is also a developer-portfolio trope — it's the first thing that makes this feel templated.
- **Fix**: Consider a static multi-line heading showing all titles, or a slower cycle (5-6s per title) with a pause-on-hover behavior.
- **Suggested command**: `/impeccable polish`

### [P2] Portrait stat boxes may overflow on mobile

- **What**: The stat box container uses `absolute -left-6 sm:-left-12` with `w-32 sm:w-40` and `translate-x-4` on the middle box. Combined with `max-md:w-[85%]` on the illustration column and `max-md:w-[105%]` on the content column.
- **Why it matters**: Negative left offsets and percentage overrides past 100% suggest layout compression on small viewports. The stat boxes extend into the left margin and may overlap the text column. The `max-md:w-[105%]` on the content column is an explicit admission of overflow.
- **Fix**: Test on real mobile widths (375px). Either collapse the stat panels into a row below the portrait on mobile, or adjust their positioning to be inset.
- **Suggested command**: `/impeccable adapt`

## Persona Red Flags

### Jordan (First-Timer / Recruiter)

- **Tech jargon overload**: Badges like `ID: A-001`, `SRC: dev.ahmed.local`, `VER: 2.4.1` and coordinate labels read as authentic in a terminal context but may alienate non-technical recruiters who just want to know "who is this person and can they code?" The status badge at the top is the single most important element for this persona — make sure it clearly communicates availability/role in plain language.
- **Typewriter racing**: By the time Jordan reads one title, it's already switched. They never get a stable fix on the headline value prop.

### Casey (Distracted Mobile User)

- **Layout overflow risk**: The `max-md:w-[105%]` and negative stat box offsets suggest the layout breaks at mobile widths. CTA buttons at `max-md:w-[80%]` hanging below the illustration suggest they're fighting for space.
- **Bounce animation drain**: The infinite bounce on the mascot keeps drawing peripheral attention away from the CTA buttons on a small screen.

### Riley (Stress Tester)

- **Broken image pathway**: The Google-hosted URL is the first thing that will break under Riley's testing. No fallback, no local asset.
- **Infinite animation**: The typewriter and mascot bounce both run forever. No max iterations, no pause-resume. Tab not visible? Still running.

## Minor Observations

- **`max-md:w-[105%]` is a smell** — extending past 100% width on mobile is almost always the wrong fix for a layout problem. The grid columns likely need rethinking at mobile rather than overflow compensation.
- **Stat bar values feel arbitrary** — `w-[99.9%]`, `w-[75%]`, `w-full` for reliability/integrations/latency. If these aren't backed by real data, the specificity undermines the terminal-authenticity aesthetic.
- **Scanline overlay on mobile** — The scanline animation runs at 8s linear infinite. On a small screen this is a larger percentage of the viewport being obscured by the scanning gradient.
- **Two blur contexts overlapping** — The portrait container has `backdrop-blur-sm` and the stat boxes have `backdrop-blur-xl`, both in the same visual region. This creates nested compositing layers that may jank on older devices.

## Questions to Consider

- "If the typewriter animation were removed entirely, what would the hero lose?" — The answer determines whether it's essential or a trope.
- "What if the floating mascot were replaced with a real project screenshot or a local graphic that reinforced the brand?" — The current image is an external dependency AND the weakest visual element.
- "Does the coord/ID/SRC/VER system info communicate anything meaningful to the target audience, or is it just set dressing?" — If tech recruiters don't read it, it's noise.
