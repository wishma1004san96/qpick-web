import Hero from "@/components/home/Hero";
import HomeStats from "@/components/home/HomeStats";
import About from "@/components/home/About";
import PremiumTourPackagesCarousel from "@/components/home/PremiumTourPackagesCarousel";
import WhyChooseQPick from "@/components/home/WhyChooseQPick";
import LuxuryVehicleShowcase from "@/components/home/LuxuryVehicleShowcase";
import TwoPowerfulApps from "@/components/home/TwoPowerfulApps";
import Testimonials from "@/pageComponents/homePage/Testimonials";
import SriLankaVisualSection from "@/components/home/SriLankaVisualSection";
import PremiumCTA from "@/components/home/PremiumCTA";

export default function Home() {
  return (
    <>
      <main className="bg-gradient-to-b from-white via-slate-50/85 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Hero />
        <HomeStats />
        <About />
        <PremiumTourPackagesCarousel />
        <WhyChooseQPick />
        <LuxuryVehicleShowcase />
        <TwoPowerfulApps />
        <Testimonials />
        <SriLankaVisualSection />
        <PremiumCTA />
      </main>
    </>
  );
}
