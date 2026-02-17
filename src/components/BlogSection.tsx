import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    date: "Feb 2026",
    title: "Why Your Business Needs a Modern Website in 2026",
    category: "Growth",
    excerpt:
      "Your website is your 24/7 salesperson. We break down the ROI of a professional web presence and why outdated sites cost you customers.",
  },
  {
    date: "Jan 2026",
    title: "How Great Design Converts Visitors Into Customers",
    category: "UX / Design",
    excerpt:
      "From visual hierarchy to micro-interactions — the science behind interfaces that don't just look good, but drive real revenue.",
  },
  {
    date: "Dec 2025",
    title: "Speed, SEO & Performance: The Invisible Revenue Drivers",
    category: "Performance",
    excerpt:
      "A 1-second delay drops conversions by 7%. We explore the technical optimisations that silently multiply your bottom line.",
  },
  {
    date: "Nov 2025",
    title: "From Concept to Launch: Our Development Process",
    category: "Process",
    excerpt:
      "Transparency builds trust. Here's a look at how we take your idea from wireframe to a live, revenue-generating product.",
  },
];

const BlogSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

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
        ".blog-item",
        { yPercent: 40, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".blog-list", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative bg-background px-6 py-24 md:px-12 md:py-40"
    >
      <div className="overflow-hidden">
        <h2
          ref={headingRef}
          className="text-[8vw] font-black uppercase leading-none tracking-tighter text-foreground md:text-[6vw]"
        >
          Journal
        </h2>
      </div>
      <p className="mt-4 mb-16 max-w-lg text-sm font-medium uppercase leading-relaxed tracking-widest text-muted-foreground">
        Insights on how design &amp; technology drive business growth
      </p>

      <div className="blog-list">
        {posts.map((post, i) => (
          <a
            key={i}
            href="#"
            className="blog-item hoverable group flex flex-col gap-4 border-b border-border px-2 py-10 transition-all duration-400 hover:bg-foreground hover:text-background hover:translate-x-2 md:flex-row md:items-center md:justify-between md:px-4"
          >
            <div className="flex items-center gap-6 md:gap-10">
              <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-400 group-hover:text-background/60">
                {post.date}
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight md:text-4xl lg:text-5xl">
                {post.title}
              </h3>
            </div>
            <div className="flex items-center gap-6 md:gap-10">
              <span className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground transition-colors duration-400 group-hover:text-background/60 lg:block">
                {post.excerpt}
              </span>
              <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-400 group-hover:text-background/60">
                {post.category}
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:rotate-45 group-hover:scale-125 group-hover:text-background" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
