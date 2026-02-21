import { useState, useCallback } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ParticleField from "@/components/ParticleField";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MarqueeSection from "@/components/MarqueeSection";
import HorizontalScroll from "@/components/HorizontalScroll";
import ServicesList from "@/components/ServicesList";
import TeamSection from "@/components/TeamSection";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
import AgencyFooter from "@/components/AgencyFooter";
import SmoothScroll from "@/components/SmoothScroll";

const Index = () => {
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    // Delay state change to let GSAP finish its animation before React touches the DOM
    setTimeout(() => setPreloaderDone(true), 100);
  }, []);

  return (
    <>
      <CustomCursor />
      <ParticleField />
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}
      <SmoothScroll>
        <Header />
        <main className="relative z-10">
          <section id="home">
            <Hero />
          </section>
          <MarqueeSection />
          <ServicesList />
          <HorizontalScroll />
          <TeamSection />
          <BlogSection />
          <FaqSection />
          <AgencyFooter />
        </main>
      </SmoothScroll>
    </>
  );
};

export default Index;
