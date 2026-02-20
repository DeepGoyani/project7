import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
      gsap.fromTo(
        lines,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          delay: 3.2,
        }
      );

      gsap.fromTo(
        imageRef.current,
        { width: "50%" },
        {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen flex-col justify-center px-6 pt-24 md:px-12">
      <div className="mb-12 md:mb-16">
        <div className="overflow-hidden">
          <div ref={line1Ref} className="text-[12vw] font-black uppercase leading-[0.9] tracking-tighter text-foreground">
            DIGITAL
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={line2Ref} className="text-[12vw] font-black uppercase leading-[0.9] tracking-tighter text-foreground">
            EXPERIENCES
          </div>
        </div>
        <div className="overflow-hidden">
          <div ref={line3Ref} className="text-[12vw] font-black uppercase leading-[0.9] tracking-tighter text-muted-foreground">
            THAT MATTER
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


