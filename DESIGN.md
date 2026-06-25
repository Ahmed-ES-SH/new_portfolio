---
name: Ahmed Ismail Portfolio
description: Full-stack developer portfolio — dark cyberpunk identity refined with precision
colors:
  primary: "#00f0ff"
  primary-deep: "#00c4d1"
  surface-dark: "#0d0f10"
  surface-card: "#000000"
  surface-overlay: "#050a0f"
  terminal-border: "#1a3a4a"
  text-body: "#94a3b8"
  text-heading: "#ffffff"
  text-dim: "#64748b"
  success: "#059669"
  danger: "#dc2626"
  warning: "#d97706"
  info: "#0284c7"
typography:
  display:
    fontFamily: '"IBM Plex Mono", "Cairo", monospace'
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  heading:
    fontFamily: '"IBM Plex Mono", "Cairo", monospace'
    fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: '"IBM Plex Mono", "Cairo", monospace'
    fontSize: "clamp(0.875rem, 1.2vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: '"IBM Plex Mono", "Cairo", monospace'
    fontSize: "0.625rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "0.3em"
    textTransform: "uppercase"
  mono:
    fontFamily: '"IBM Plex Mono", monospace'
rounded:
  none: "0px"
  sm: "4px"
  md: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#000000"
    rounded: "{rounded.none}"
    padding: "16px 40px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "16px 40px"
    typography: "{typography.label}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "16px 40px"
    border: "1px solid {colors.primary}"
    typography: "{typography.label}"
  button-outline-hover:
    backgroundColor: "{colors.primary}"
    textColor: "#000000"
    rounded: "{rounded.none}"
    padding: "16px 40px"
    typography: "{typography.label}"
  card-project:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-body}"
    rounded: "{rounded.none}"
    padding: "0px"
    border: "2px solid rgba(0, 240, 255, 0.25)"
  nav-link:
    backgroundColor: "transparent"
    textColor: "rgba(0, 240, 255, 0.8)"
    typography: "{typography.label}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.text-heading}"
    rounded: "{rounded.none}"
    border: "none"
  terminal-box:
    backgroundColor: "{colors.surface-overlay}"
    textColor: "{colors.primary}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
    border: "1px solid {colors.terminal-border}"
---

# Design System: Ahmed Ismail Portfolio

## 1. Overview

**Creative North Star: "The Developer Terminal"**

A dark industrial interface that feels like a mission-control console for a precision engineering operation. The aesthetic is cyberpunk refined — retaining the neon-cyan pulse of the original direction but stripped of gimmicks. Scanlines and flicker become rare, earned effects rather than default decoration. Every visual element reads as functional: status indicators, system prompts, terminal modules, grid overlays. The monitor glow is not decoration — it's the interface's own voice.

This system explicitly rejects corporate template sterility, generic developer-portfolio patterns (overused terminal themes, blue-on-white gradients), and any surface that feels loud without purpose. The confidence comes from precision, not from volume.

**Key Characteristics:**
- Dark-on-dark with high-contrast cyan accent as the single voice
- Monospaced typography throughout — IBM Plex Mono as the system font
- Grid-based backgrounds that evoke engineering blueprints and HUD displays
- Sharp, zero-radius corners on containers; right angles as the default
- Functional decorations: status badges, progress bars, corner brackets, system labels
- Motion as feedback, not as ornament

## 2. Colors

**Character:** A restrained dark palette anchored by an electric cyan primary that reads as both accent and utility — like an oscilloscope trace. No warm neutrals, no paper tones. The palette is cool, deliberate, and industrial.

### Primary

- **Terminal Cyan** (#00f0ff / oklch(0.88 0.19 196)): The single voice of the system. Used for borders on hover, active link states, glowing text markers, terminal prompts, progress fill, and decorative accent lines. Never exceeds ~15% of any given screen surface.

### Neutral

- **Pit Black** (#000000): Pure black used as card and container background. Creates the illusion of infinite depth behind content panels.
- **Surface Dark** (#0d0f10): The body background — a near-black with a barely perceptible cool tint. Warmer than pure black, colder than charcoal.
- **Overlay Dark** (#050a0f): Terminal and popup backgrounds. The lowest layer before pure black.
- **Terminal Border** (#1a3a4a): A muted teal-gray used for module borders and separator lines. Low contrast by design — reads as structural rather than decorative.
- **Body Text** (#94a3b8 / oklch(0.65 0.02 250)): A cool slate at 4.6:1 against Surface Dark. Readable, muted, never straining for attention.
- **Heading Text** (#ffffff): Full white reserved for headings, hero copy, and interactive labels.
- **Dim Text** (#64748b / oklch(0.55 0.02 250)): Metadata, secondary labels, placeholder text.

### State Colors

- **Success** (#059669 / oklch(0.55 0.15 165)): Status badges, access-level indicators
- **Danger** (#dc2626 / oklch(0.55 0.22 30)): Critical status markers
- **Warning** (#d97706 / oklch(0.65 0.18 75)): Threat-level labels
- **Info** (#0284c7 / oklch(0.55 0.15 255)): Info badges

### Named Rules

**The Cyan Ceiling Rule.** The primary cyan accent occupies no more than 15% of any viewport. Its rarity is the point — when cyan appears (border, text glow, progress bar), it signals something active or interactive. A screen flooded with cyan has lost its signal.

**The No-Warmth Rule.** The palette contains zero warm tones. No beige, amber, orange, or brown. The system is deliberately cool. Warmth enters only through imagery (profile photos, project covers) — never through the chrome.

## 3. Typography

**Display / UI Font:** IBM Plex Mono (with Cairo for Arabic fallback)
**Body Font:** IBM Plex Mono (with Cairo for Arabic fallback)

**Character:** A single-family monospaced system. The uniformity is the statement — every character occupies the same horizontal space, creating a rhythmic, grid-aligned reading experience that reinforces the terminal/HUD metaphor. IBM Plex Mono carries the full weight spectrum (100–700), which provides contrast within a singular voice. Arabic text uses Cairo at matching optical weights to preserve the monospaced rhythm in RTL.

### Hierarchy

- **Display** (900, clamp(2.5rem, 6vw, 5rem), 1.1): Primary hero headings. All-caps or title-case. Tight tracking (-0.03em). Reserved for the single most prominent headline per page.
- **Heading** (900, clamp(1.5rem, 3.5vw, 2.5rem), 1.2): Section titles, modal headers, card titles. All-caps recommended. Slightly looser than display.
- **Title** (700, clamp(1rem, 2vw, 1.25rem), 1.3): Card titles, feature names, component headers.
- **Body** (400, clamp(0.875rem, 1.2vw, 1rem), 1.7): Paragraphs, descriptions, long-form content. Cap line length at 65–75ch. Monospace at body size is readable in short bursts; avoid walls of text longer than 8–10 lines.
- **Label** (900, 0.625rem, 1, 0.3em tracking, uppercase): Status badges, nav links, button text, metadata, section markers. The signature utility voice — tiny, dense, authoritative.

### Named Rules

**The Single Family Rule.** All text uses IBM Plex Mono (or Cairo for Arabic). No second font family enters the system. Visual contrast comes from weight, size, and case — not from a font swap.

## 4. Elevation

The system uses tonal layering rather than drop shadows. Depth is conveyed through color value — lighter (closer) or darker (farther) against the Surface Dark body background. Cards sit on pure black (#000000) which reads as a void panel below the body surface. Overlays and terminal modules use #050a0f, one step up from the card layer.

Shadows are reserved exclusively for glow effects tied to the cyan primary: `neon-border` (0 0 15px rgba(0, 240, 255, 0.4)), `neon-glow` (0 0 15px rgba(0, 242, 255, 0.4)). These appear only on hover, active state, or important call-to-action elements. No ambient or structural shadows exist in the system.

### Shadow Vocabulary

- **Neon Border Glow** (`0 0 15px rgba(0, 240, 255, 0.4)`): Applied on hover to interactive elements with `neon-border` class. Evokes a CRT monitor powering on.
- **Terminal Drop Shadow** (`0 -5px 20px rgba(0, 240, 255, 0.15)`): The terminal module's top shadow, creating the illusion of a physical panel sliding up from below.
- **Mobile Nav Glow** (`0 -10px 30px rgba(0, 245, 228, 0.15)`): The bottom mobile nav bar's ambient glow.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest — no shadow, no elevation. Glow appears only as a response to state (hover, focus, active). A component that glows at rest is broken.

## 5. Components

### Buttons
- **Shape:** Sharp zero-radius corners (0px border-radius). Right angles reinforce the industrial/terminal identity.
- **Primary (default):** Terminal Cyan fill (#00f0ff), black text, neon-border glow shadow. 16px 40px padding.
- **Primary (hover):** Transparent fill, cyan text, neon-border intensifies (0 0 15px rgba(0, 240, 255, 0.4)).
- **Outlined (default):** Transparent fill, cyan text, 1px solid cyan border, neon-border glow.
- **Outlined (hover):** Cyan fill, black text, glow intensifies.
- **Typography:** 10px–12px, font-black (900), uppercase, 0.3–0.4em tracking, uppercase.
- **Transition:** 300ms ease all properties.
- **Interaction:** An underline slide-in effect on the Contact button (a ::before pseudo-element translating from full bottom to full).

### Navigation (Top Bar)
- **Structure:** Fixed top, full-width, flex layout. `background: rgba(0, 240, 255, 0.1)` with backdrop-blur. Bottom border 1px `rgba(0, 240, 255, 0.3)`.
- **Logo:** PNG image (256×256) with `neon-text` glow on the name heading.
- **Links:** IBM Plex Mono, 12px, uppercase, 0.3em tracking, `rgba(0, 240, 255, 0.8)` at rest, full `#00f0ff` on hover/active. Active link has a bottom border (1px solid cyan).
- **Contact Button:** Uses the standard button-outlined pattern (neon-border, transparent bg, cyan text).
- **Language Switcher:** Button-outlined pattern with a Terminal (lucide) icon and the target language code (AR/EN).

### Navigation (Mobile Bottom Bar)
- **Structure:** Fixed bottom, `bg-black/80 backdrop-blur-xl`, border-top 2px `rgba(0, 240, 255, 0.3)`. Four icon-labeled links.
- **Icons:** Lucide React icons (LayoutGrid, User2, Cpu, TableProperties) at 24px.
- **Active State:** Cyan color with drop-shadow glow, a 3px cyan underline tab indicator animated with framer-motion `layoutId`.
- **Typography:** Hidden labels (icons only).

### Cards (Project Cards)
- **Structure:** Full-bleed container with `bg-black`, `border-2` at `rgba(0, 240, 255, 0.25)`, no radius.
- **Header:** `bg-primary/20`, `border-b-2 border-primary/40`. Card title in cyan, font-black, tracked tighter. A status badge (cyan bg, dark text, 10px).
- **Body:** 24px padding. Image thumbnail with cyan-tinted gradient overlay. Description text in `#94a3b8` (slate-300). Tech stack tags: `bg-slate-900`, `border border-primary/20`, 10px, cyan text, uppercase.
- **Stats Panel:** `bg-slate-900/80`, `border-l-2 border-primary`. Two-column key-value rows with dim labels and cyan values.
- **Action Buttons:** Two full-width outlined buttons stacked vertically. Standard button-outline pattern.
- **Hover:** Entire card border shifts to `neon-border` treatment, header background intensifies to `bg-primary/30`, image opacity increases.

### Skill Cards
- **Structure:** `neon-border`, `bg-primary/20` background, centered layout with icon and title. Full height, flex column.
- **Icon:** 48×48 image (or first two characters of title as fallback), centered above title, scales to 110% on hover.
- **Title:** 12px, uppercase, centered, tracking-wider.
- **Hover:** Overlay tint (`rgba(0, 210, 255, 0.05)`) fades in. Standard `neon-border` glow.

### Inputs / Fields
- **Style:** Transparent background, no border, no outline. Text color white, caret cyan.
- **Focus:** No visible border or ring shift. The caret color is the only focus indicator.
- **Context:** Used exclusively inside the Terminal module. No standalone form inputs visible elsewhere in the system.

### Terminal Module
- **Structure:** Fixed bottom, full-width panel. Dark teal background (#050a0f), top border 1px terminal-border (#1a3a4a). Slides up with spring animation (framer-motion).
- **Header:** Darker header bar (#0a151a) with three macOS-style colored dots (red, yellow, green) with matching glow shadows. Centered system label in cyan, 10px, uppercase.
- **Body:** Scrollable output area, 25vh height. IBM Plex Mono, 12px. Error lines in red (#f87171), user input in white/70, system output in cyan with text glow.
- **Input:** Transparent input with cyan caret, full-width. Prompt prefix `~:ahmedismaildev/admin:/ $` in cyan.
- **Behavior:** Commands: `/help`, `/nav [path]`, `/contact`, `clear`, `close`. Startup sequence prints two system messages on open.

### Hero Section
- **Background:** `grid-bg` with 50px × 50px grid lines at `rgba(0, 240, 255, 0.2)` and an inset dark glow. A radial blur glow (500px, cyan/10) behind the illustration column.
- **Status Badge:** Inline flex with a pulsing cyan dot, 10px label, uppercase, `border border-accent-blue/50`, `bg-accent-blue/5`.
- **Headline:** 5xl–7xl, font-black, tracked tighter, white with cyan text glow. Animated typewriter effect using `react-type-animation` cycling through role titles.
- **Subtitle:** `border-s-2 border-cyan`, `#94a3b8` slate text, 17px–20px, `bg-accent-blue/5`. Has a highlighted span in white.
- **CTA Buttons:** Two standard button patterns (primary filled + outlined) side by side.
- **Portrait:** A dual-layer image composition with a pixel-art profile photo. Lead layer: grayscale, brightened, screen-blended offset. Main layer: bordered in `rgba(0, 240, 255, 0.4)`, with scanline overlay. Floating stat boxes (terminal-style panels, each with flickering value, label, progress bar) along the left edge. Corner tech-info badges in the top-right and bottom-right.

### Contact Popup
- **Structure:** Centered overlay with dark backdrop. Closed by default, toggled via context state.
- **Display:** Contact information rendered as ASCII art blocks (WhatsApp number, Gmail address) inside bordered panels.

## 6. Do's and Don'ts

### Do:
- **Do** use IBM Plex Mono for all text. No other font family enters the system.
- **Do** use pure black (#000000) for card containers — the void effect is intentional.
- **Do** keep cyan accent below 15% of any viewport. Rarity signals interactivity.
- **Do** use sharp zero-radius corners on all containers. Right angles reinforce the industrial identity.
- **Do** use `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on body prose.
- **Do** add `prefers-reduced-motion` fallbacks to every animation (instant reveal or crossfade).
- **Do** maintain 4.5:1 minimum contrast for body text (#94a3b8 against #0d0f10 passes at 4.6:1).
- **Do** cap body line length at 65–75ch.
- **Do** use progress bars and status indicators as functional decoration — not ornament.

### Don't:
- **Don't** use gradient text (`background-clip: text` with a gradient). Emphasis comes from weight, size, and solid cyan.
- **Don't** add side-stripe borders (border-left or border-right >1px as a colored accent on cards or callouts). Use full borders or background tints instead.
- **Don't** default to glassmorphism. Backdrop-blur is reserved for the top navbar and terminal — not for cards, modals, or decorative overlays.
- **Don't** use numbered section markers (01 · About / 02 · Skills) as default scaffolding across every page. Numbers only when the section is a real sequence.
- **Don't** put the tiny uppercase tracked eyebrow ("SYSTEM_STATUS", "SKILLS_MATRIX") above every section heading. One per page as a deliberate system label is voice; repeating it on every section is AI grammar.
- **Don't** use hero-metric templates (big number + small label + gradient accent). Stats in this system are functional gauges (progress bars, flickering counters in terminal panels).
- **Don't** use monospace as a lazy shorthand for "developer." Here it is the deliberate identity — every design choice must earn this register.
- **Don't** make cards identical across the site. Project cards differ from skill cards, which differ from stat panels. Vary structure by content.
- **Don't** animate layout properties. Use transform and opacity only.
- **Don't** use bounce or elastic easings. Exponential ease-out (quart, quint, expo) for entrances; linear for scanlines.
- **Don't** let text overflow its container. Test every heading at every breakpoint and clamp accordingly.
