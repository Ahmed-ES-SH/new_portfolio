# Implementation Plan: Technical Skills Tabbed Dark Theme

## Objective
Implement the "Technical Ecosystem" section using the provided Stitch design, integrating existing skills data (`constants/skillsContent.ts`), and localizing static text into English and Arabic. We will strictly adhere to the phased approach, Next.js App Router rules, and utilize Tailwind CSS v4 logic.

## Proposed Changes

### Skills Incorporated
To ensure premium code output fitting the project standards, the following skills from `.agents/skills` will be strictly adhered to:
- **`frontend-design`**: To construct distinctive, production-grade frontend interfaces with high design quality for the dark neon theme.
- **`react-components`**: To architect modular, clean component splits for the tabs and skillset cards.
- **`stitch-loop`**: Applying lessons from iterative Stitch building to translate the raw HTML to React precisely.
- **`vercel-react-best-practices`**: Ensuring rigorous server/client component boundaries for optimal Next.js performance.

### Localization (Completed in Phase 1)
- Translation keys for "Technical Ecosystem" title, description, and tab labels have been added to `translations/en.json` and `translations/ar.json`.

### Component Development (Phase 3)
- **`app/_components/_skills/SkillCard.tsx`**: 
    - A reusable component for individual skill items.
    - Will feature the `neon-border` hover effect and glow transitions.
    - Props: `skill` (from `skillsContent.ts`), `locale`.
- **`app/_components/_skills/SkillsTabs.tsx`**: 
    - A client-side component (`"use client"`) to handle tab switching.
    - Will use Framer Motion for smooth transitions between categories (Frontend, Backend, Tools).
- **`app/_components/_skills/SkillsSection.tsx`**: 
    - The main container for the skills section.
    - A server-side component that fetches translations and passes data to `SkillsTabs`.
    - Will incorporate the `tech-grid` background and header styling from the Stitch design.

### Integration (Phase 4)
- Add the `SkillsSection` to the main landing page, ensuring it fits within the modern, dark aesthetic of the portfolio.

## Verification Plan

### Manual Verification
1. **Visual Check**: Open the application in a browser and navigate to the Technical Ecosystem section.
2. **Tab Switching**: Verify that clicking on Frontend, Backend, and Tools tabs correctly updates the displayed skills.
3. **Localization**: Toggle between English and Arabic to ensure the section header, description, and tab labels update correctly.
4. **Responsiveness**: Resize the browser window to confirm the grid layout adjusts appropriately for mobile, tablet, and desktop views.
5. **Animations**: Confirm that the `neon-border` hover effect and tab transitions are smooth and performant.

### Automated Tests
- No specific automated tests are planned for this UI-centric update, but a basic check for component rendering can be performed if needed.
