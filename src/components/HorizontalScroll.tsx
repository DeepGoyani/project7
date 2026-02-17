import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Luminous Brand", category: "Branding", img: project1 },
  { title: "Gallery Space", category: "Web Design", img: project2 },
  { title: "Prestige Line", category: "E-Commerce", img: project3 },
  { title: "Abstract Forms", category: "Art Direction", img: project4 },
  { title: "Urban Pulse", category: "Development", img: project5 },
];

const HorizontalScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        }
      );

      // Calculate how far the track needs to scroll
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden bg-background"
    >
      {/* Header */}
      <div className="px-6 pt-24 md:px-12 md:pt-40">
        <div className="overflow-hidden">
          <h2
            ref={headingRef}
            className="text-[8vw] font-black uppercase leading-none tracking-tighter text-foreground md:text-[6vw]"
          >
            Selected Work
          </h2>
        </div>
        <p className="mt-4 mb-12 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Projects we're proud of
        </p>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex gap-8 px-6 pb-24 md:px-12 md:pb-40">
        {projects.map((project, i) => (
          <div
            key={i}
            className="hoverable group relative w-[80vw] flex-shrink-0 md:w-[50vw] lg:w-[40vw]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-xl font-bold uppercase tracking-tight text-foreground md:text-2xl">
                  {project.title}
                </span>
                <span className="ml-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {project.category}
                </span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 flex aspect-[4/3] items-center justify-center bg-background/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-3xl font-black uppercase text-foreground drop-shadow-lg md:text-5xl">
                View Project
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
