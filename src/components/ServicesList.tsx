import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import project1 from "@/assets/project-1.png";
import project2 from "@/assets/project-2.png";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: "Web Design", img: project1 },
  { name: "Development", img: project2 },
  { name: "SEO & Strategy", img: project3 },
  { name: "Branding", img: project4 },
  { name: "E-Commerce", img: project5 },
  { name: "N8N Automation", img: project1 },
  { name: "Software Solutions", img: project2 },
];

const ServicesList = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgTagRef = useRef<HTMLImageElement>(null);
  const hoveredIdxRef = useRef<number | null>(null);

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
        ".service-item",
        { yPercent: 30, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (imageRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      gsap.to(imageRef.current, {
        x: e.clientX - rect.left - 150,
        y: e.clientY - rect.top - 100,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, []);

  const handleMouseEnter = useCallback((i: number) => {
    hoveredIdxRef.current = i;
    if (imgTagRef.current) {
      imgTagRef.current.src = services[i].img;
    }
    if (imageRef.current) {
      gsap.to(imageRef.current, { opacity: 0.9, duration: 0.3 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoveredIdxRef.current = null;
    if (imageRef.current) {
      gsap.to(imageRef.current, { opacity: 0, duration: 0.3 });
    }
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-background px-6 py-24 md:px-12 md:py-40"
      onMouseMove={handleMouseMove}
    >
      <div className="overflow-hidden">
        <h2
          ref={headingRef}
          className="text-[8vw] font-black uppercase leading-none tracking-tighter text-foreground md:text-[6vw]"
        >
          Services
        </h2>
      </div>
      <p className="mt-4 mb-16 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        What we do best
      </p>

      {/* Always rendered, visibility controlled by GSAP opacity */}
      <div
        ref={imageRef}
        className="pointer-events-none absolute z-50 h-[200px] w-[300px] overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          ref={imgTagRef}
          src={services[0].img}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-40">
        {services.map((service, i) => (
          <div
            key={i}
            className="service-item hoverable flex items-center justify-between border-b border-border px-4 py-8 md:py-10"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-8">
              <span className="service-index text-sm font-medium text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="service-name text-3xl font-bold uppercase md:text-5xl lg:text-6xl">
                {service.name}
              </span>
            </div>
            <ArrowUpRight className="service-arrow h-6 w-6 text-muted-foreground md:h-8 md:w-8" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
