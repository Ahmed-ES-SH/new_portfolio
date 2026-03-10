import { HeroSection } from "../_components/_home/HeroSection";

export default async function Home() {
  return (
    <div className="relative max-md:mt-12 min-h-screen w-full flex flex-col grid-bg bg-black">
      <HeroSection />
    </div>
  );
}
