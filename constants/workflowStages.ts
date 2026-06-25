/**
 * Workflow stage data for the AI-assisted development cycle explainer page.
 *
 * Each entry references a translation slug used to resolve rich content
 * (title, purpose, roles, inputs, outputs, etc.) from the `explain.stages`
 * namespace in the translation files.
 *
 * @see translations/en.json — `explain.stages`
 * @see translations/ar.json — `explain.stages`
 */
export interface StageData {
  /** Zero-padded number e.g. "01", "02" — used as a visual label. */
  number: string;
  /** Translation key slug matching `explain.stages[slug]`. */
  slug: "planning" | "contextPrep" | "execution" | "verification" | "review";
}

export const WORKFLOW_STAGES: StageData[] = [
  { number: "01", slug: "planning" },
  { number: "02", slug: "contextPrep" },
  { number: "03", slug: "execution" },
  { number: "04", slug: "verification" },
  { number: "05", slug: "review" },
];
