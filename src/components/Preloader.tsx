import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [count, setCount] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(obj.val)),
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-end justify-end bg-background p-8 md:p-12"
    >
      <span
        ref={counterRef}
        className="text-[20vw] font-black leading-none text-foreground tabular-nums"
      >
        {count}%
      </span>
    </div>
  );
};

export default Preloader;
