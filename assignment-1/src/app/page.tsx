import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SpeedSection from "@/components/SpeedSection";
import SecuritySection from "@/components/SecuritySection";
import HowItWorks from "@/components/HowItWorks";
import RewardsSection from "@/components/RewardsSection";
import WaitlistCTA from "@/components/WaitlistCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SpeedSection />
        <HowItWorks />
        <SecuritySection />
        <RewardsSection />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
