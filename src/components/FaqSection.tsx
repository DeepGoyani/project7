import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We specialize in web design, full-stack development, branding, e-commerce solutions, and SEO strategy. Every project is tailored to your unique needs.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary based on scope. A landing page can be delivered in 1–2 weeks, while a full-scale web application typically takes 4–8 weeks from concept to launch.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "We offer project-based pricing with transparent quotes. After an initial consultation, we provide a detailed proposal outlining deliverables, timeline, and cost.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely. We collaborate with clients worldwide. All communication and project management happens digitally, ensuring a seamless experience regardless of location.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "Our stack includes React, Next.js, TypeScript, Tailwind CSS, Node.js, and modern CMS platforms. We choose the best tools for each project's requirements.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes. We offer maintenance packages that include updates, performance monitoring, and priority support to keep your digital product running flawlessly.",
  },
];

const FaqSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".faq-item",
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative px-6 py-24 md:px-12 md:py-40"
    >
      <div className="overflow-hidden">
        <h2
          ref={headingRef}
          className="text-[8vw] font-black uppercase leading-none tracking-tighter text-foreground md:text-[6vw]"
        >
          FAQ
        </h2>
      </div>
      <p className="mt-4 mb-16 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Common questions answered
      </p>

      <div className="faq-list mx-auto max-w-4xl">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="faq-item border-b border-border">
              <button
                onClick={() => toggle(i)}
                className="hoverable flex w-full items-center justify-between py-8 text-left transition-colors duration-300 hover:text-muted-foreground md:py-10"
              >
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
                    {faq.question}
                  </span>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border transition-all duration-300 hover:bg-foreground hover:text-background">
                  {isOpen ? (
                    <Minus className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: isOpen ? "300px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p className="pb-8 pl-14 pr-12 text-base leading-relaxed text-muted-foreground md:pl-16">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FaqSection;
