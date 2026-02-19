import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowUpRight, User, LogIn } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AgencyFooter = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

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

  const handleLetsTalkClick = () => {
    setShowConfirmation(true);
  };

  const handleYes = () => {
    navigate('/contact');
  };

  const handleNo = () => {
    setShowConfirmation(false);
  };

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
        
        {!showConfirmation ? (
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <button
              className="footer-cta hoverable relative text-[10vw] font-black uppercase leading-none text-foreground transition-all duration-300 hover:scale-105 hover:tracking-wider md:text-[12vw] cursor-pointer"
              onClick={handleLetsTalkClick}
            >
              WANNA TALK
            </button>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <span className="text-[2vw] text-muted-foreground animate-pulse whitespace-nowrap">tap me →</span>
            </div>
            <div className="mt-12 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <p className="text-2xl md:text-3xl font-semibold text-center">
              Want to talk?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleYes}
                className="px-8 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-muted hover:text-foreground transition-colors"
              >
                Yes
              </button>
              <button
                onClick={handleNo}
                className="px-8 py-3 border border-foreground rounded-lg font-medium hover:bg-muted transition-colors"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            © {new Date().getFullYear()} AGENCY
          </span>
        </div>
        <div className="flex gap-6">
          {[
            { name: "Instagram", url: "https://instagram.com" },
            { name: "Twitter", url: "https://twitter.com" },
            { name: "Dribbble", url: "https://dribbble.com" },
            { name: "LinkedIn", url: "https://linkedin.com" }
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hoverable text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
            >
              {social.name}
            </a>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider border border-border rounded-lg hover:bg-foreground hover:text-background transition-all"
          >
            <LogIn className="w-3 h-3" />
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider border border-border rounded-lg hover:bg-foreground hover:text-background transition-all"
          >
            <User className="w-3 h-3" />
            Sign Up
          </button>
        </div>
      </div>
    </footer>
  );
};

export default AgencyFooter;
