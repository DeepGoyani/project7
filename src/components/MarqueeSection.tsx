const MarqueeSection = () => {
  const text = "CREATIVE • DEVELOPMENT • STRATEGY • DESIGN • BRANDING • ";

  return (
    <section className="overflow-hidden border-y border-border py-8 md:py-12">
      <div className="marquee-track">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-stroke whitespace-nowrap text-6xl font-black uppercase md:text-8xl lg:text-9xl"
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;
