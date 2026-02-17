import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Globe, Github } from "lucide-react";
import teamMember1 from "@/assets/team-member-1.png";
import teamMember2 from "@/assets/team-member-2.png";

gsap.registerPlugin(ScrollTrigger);

const members = [
  {
    name: "Deep Goyani",
    role: "Full-Stack Developer",
    bio: "Crafting performant digital experiences with clean code and bold ideas.",
    img: teamMember1,
    linkedin: "https://www.linkedin.com/in/deepgoyani/",
    portfolio: "https://deep-goyani.vercel.app/",
    github: "https://github.com/DeepGoyani",
  },
  {
    name: "Om Savani",
    role: "Full-Stack Developer", 
    bio: "Building scalable applications with modern technologies and best practices.",
    img: teamMember2,
    linkedin: "https://www.linkedin.com/in/om-savani-8ab04a273/",
    portfolio: "https://omsavaniportfolio.netlify.app/",
    github: "https://github.com/Omhacker",
  },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading reveal
      gsap.fromTo(
        ".team-heading",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Cards clip-path reveal
      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 1.4,
            ease: "power4.out",
            delay: i * 0.2,
            scrollTrigger: { trigger: card, start: "top 85%" },
          }
        );
      });

      // Image parallax
      document.querySelectorAll(".team-img-wrap").forEach((el) => {
        gsap.fromTo(
          el.querySelector("img"),
          { yPercent: -10, scale: 1.15 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Name text reveal
      gsap.utils.toArray<HTMLElement>(".team-name").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 95%" },
          }
        );
      });

      // Social links staggered
      document.querySelectorAll(".team-socials").forEach((el) => {
        gsap.fromTo(
          el.children,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative bg-background px-6 pt-8 pb-24 md:px-12 md:pt-16 md:pb-40"
    >
      {/* Section heading — big and bold like graffico */}
      <div className="overflow-hidden">
        <h2 className="team-heading text-[8vw] font-black uppercase leading-none tracking-tighter text-foreground md:text-[6vw]">
          The Team
        </h2>
      </div>
      <p className="mt-4 mb-16 text-sm font-medium uppercase tracking-widest text-muted-foreground md:mb-24">
        The people behind the pixels
      </p>

      <div className="team-cards grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
        {members.map((member, i) => (
          <div key={i} className="team-card group">
            {/* Image — compact aspect ratio */}
            <div className="team-img-wrap relative mb-6 aspect-[4/5] max-h-[500px] overflow-hidden">
              <img
                src={member.img}
                alt={member.name}
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="text-lg font-bold uppercase tracking-wider text-foreground md:text-2xl">
                  {member.role}
                </span>
              </div>
            </div>

            {/* Info + Social */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="overflow-hidden">
                  <h3 className="team-name text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl lg:text-4xl">
                    {member.name}
                  </h3>
                </div>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {member.role}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>

              {/* Social Links — horizontal */}
              <div className="team-socials flex shrink-0 gap-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hoverable flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={member.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hoverable flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
                  aria-label="Portfolio"
                >
                  <Globe className="h-4 w-4" />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hoverable flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
