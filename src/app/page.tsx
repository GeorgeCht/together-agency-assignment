"use client";

import { AutomationsSection } from "@/components/sections/automation";
import { FeaturesSection } from "@/components/sections/features";
import { FooterSection } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero";
import { IntegrationsSection } from "@/components/sections/integrations";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <main className='flex flex-col justify-center bg-white font-inter'>
        <HeroSection id={"hero-section"} />
        <AutomationsSection id={"automations-section"} />
        <FeaturesSection id={"features-section"} />
        <IntegrationsSection id={"integrations-section"} />
        <TestimonialsSection id={"testimonials-section"} />
      </main>
      <FooterSection />
    </>
  );
}
