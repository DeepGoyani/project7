import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AgencyFooter = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-cta",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative flex min-h-screen flex-col justify-between bg-background px-6 py-12 md:px-12"
    >
      <div />
      <div className="flex flex-col items-center justify-center">
        <p className="mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Have a project in mind?
        </p>
        <a
          href="mailto:hello@agency.com"
          className="footer-cta hoverable text-[10vw] font-black uppercase leading-none text-foreground transition-opacity hover:opacity-60 md:text-[12vw]"
        >
          LET'S TALK
        </a>
      </div>
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            © {new Date().getFullYear()} AGENCY
          </span>
        </div>
        <div className="flex gap-6">
          {["Instagram", "Twitter", "Dribbble", "LinkedIn"].map((s) => (
            <a
              key={s}
              href="#"
              className="hoverable text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default AgencyFooter;
