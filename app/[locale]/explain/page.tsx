import { getServerTranslation } from "@/app/helpers/serverTranslation";
import { getSharedMetadata } from "@/app/helpers/SharedMetadata";
import { ExplainPageShell } from "@/app/_components/_explain/ExplainPageShell";
import { ExplainWorkflowHero } from "@/app/_components/_explain/ExplainWorkflowHero";
import { ExplainWorkflowOverview } from "@/app/_components/_explain/ExplainWorkflowOverview";
import { ExplainStageDetail } from "@/app/_components/_explain/ExplainStageDetail";
import { ExplainHumanVsAI } from "@/app/_components/_explain/ExplainHumanVsAI";
import { ExplainWhyItWorks } from "@/app/_components/_explain/ExplainWhyItWorks";
import { ExplainExampleFlow } from "@/app/_components/_explain/ExplainExampleFlow";

import { WORKFLOW_STAGES } from "@/constants/workflowStages";

type Locale = "en" | "ar";
type PageParams = Promise<{ locale: Locale }>;

export async function generateMetadata({ params }: { params: PageParams }) {
  const { locale } = await params;
  const t = getServerTranslation(locale, "metaExplainPage");

  const sharedMetadata = getSharedMetadata(t.title, t.description);

  return {
    title: t.title,
    description: t.description,
    ...sharedMetadata,
  };
}

export default async function ExplainPage({
  params,
}: {
  params: PageParams;
}) {
  const { locale } = await params;

  return (
    <ExplainPageShell locale={locale}>
      <ExplainWorkflowHero />
      <ExplainWorkflowOverview />
      {WORKFLOW_STAGES.map((stage, index) => (
        <ExplainStageDetail key={stage.slug} stage={stage} index={index} />
      ))}
      <ExplainHumanVsAI />
      <ExplainWhyItWorks />
      <ExplainExampleFlow />
    </ExplainPageShell>
  );
}
