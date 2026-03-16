import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CategorySection } from "@/components/sections/CategorySection";
import { JobsPreviewSection } from "@/components/sections/JobsPreviewSection";
import { TrustSection } from "@/components/sections/TrustSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <CategorySection />
      <JobsPreviewSection />
      <TrustSection />
    </>
  );
}
