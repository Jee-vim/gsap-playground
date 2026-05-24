import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Seventh() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Timeline 1: Handles pinning and zoom logic exactly as written
    gsap.timeline()
      .fromTo(
        ".zoom-text",
        { scale: 4, opacity: 0.8, height: 120, y: 200 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          height: 50,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
          },
        }
      );

    // Timeline 2: Handles the horizontal marquee tracking
    gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Smooth scrub delay: adds a slight lag (1s) so it glidingly catches up to the scroll position
      }
    })
      .to(".lft .marquee-inner", {
        xPercent: -50,
        ease: "none", // Linear movement removes sudden speed spikes mid-scroll
      }, 0) // Force both tracks to animate across the entire scroll duration
      .to(".rgt .marquee-inner", {
        xPercent: 0,
        ease: "none",
      }, 0);
  }, []);

  return (
    <div
      ref={containerRef}
      className="parent overflow-hidden flex flex-col items-center justify-center min-h-screen"
    >
      {Array.from({ length: 4 }).map((_, idx) => {
        const isLeft = idx % 2 === 0;

        return (
          <h2 className={`zoom-text w-full overflow-hidden flex whitespace-nowrap ${isLeft ? 'lft' : 'rgt'}`} key={idx}>
            <span
              className="marquee-inner flex whitespace-nowrap will-change-transform"
              style={{ transform: isLeft ? "translateX(0%)" : "translateX(-50%)" }}
            >
              <span className="pr-4">Lorem ipsum dolor sit amet, qui minim labore adipisicing. —</span>
              <span className="pr-4">Lorem ipsum dolor sit amet, qui minim labore adipisicing. —</span>
              <span className="pr-4">Lorem ipsum dolor sit amet, qui minim labore adipisicing. —</span>
            </span>
          </h2>
        );
      })}
    </div>
  );
}
