import { HeroSection } from "../_components/_home/HeroSection";

export default async function Home() {
  return (
    <div className="relative min-h-screen w-full flex flex-col grid-bg bg-black">
      <HeroSection />
    </div>
  );
}
