import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
}

export default function LargeGapStagingCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0] as SVGPathElement;
    circlePath.id = "circlePath";
    containerRef.current.querySelector("svg")?.prepend(circlePath);

    const items = gsap.utils.toArray<HTMLElement>(".item");
    const numItems = items.length;
    if (numItems === 0) return;
    
    const step = 0.25; 
    const startPoint = 0.75; // Apex peak center

    const tl = gsap.timeline({ paused: true });

    items.forEach((item, i) => {
      const itemOffset = i * step;
      const initialPosition = startPoint + itemOffset;

      gsap.set(item, {
        motionPath: {
          path: circlePath,
          align: circlePath,
          alignOrigin: [0.5, 0.5],
          end: initialPosition,
        }
      });

      // Animate across the complete sequence distance to clear all items
      tl.to(item, {
        motionPath: {
          path: circlePath,
          align: circlePath,
          alignOrigin: [0.5, 0.5],
          start: initialPosition,
          end: initialPosition - (step * (numItems - 1)), 
        },
        ease: "none",
        duration: 1
      }, 0);
    });

    const scrollLength = window.innerHeight * numItems;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${scrollLength}`,
      scrub: 0.5,
      pin: true,
      animation: tl,
      snap: {
        snapTo: 1 / (numItems - 1),
        duration: { min: 0.2, max: 0.4 },
        delay: 0.05,
        ease: "power2.out"
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-start overflow-hidden bg-neutral-900">
      
      <div className="wrapper relative w-[2000px] h-[2000px] flex items-center justify-center translate-y-[45%]">
        <svg viewBox="0 0 2000 2000" className="absolute w-[2000px] h-[2000px] z-0 overflow-visible top-0 left-0">
          <circle id="holder" cx="1000" cy="1000" r="950" className="fill-none stroke-neutral-800 stroke-2" />
        </svg>

        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="item absolute w-[400px] h-[550px] bg-neutral-800 text-white flex flex-col items-center justify-center text-7xl font-bold rounded-3xl z-10 shadow-2xl border border-neutral-700"
          >
            <span className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Stage</span>
            {idx + 1}
          </div>
        ))}
      </div>

    </div>
  );
}
