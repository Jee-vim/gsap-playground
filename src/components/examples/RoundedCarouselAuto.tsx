import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
}

export default function RoundedCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const circlePath = MotionPathPlugin.convertToPath("#holder", false)[0] as SVGPathElement;
    circlePath.id = "circlePath";
    containerRef.current.querySelector("svg")?.prepend(circlePath);

    const items = gsap.utils.toArray<HTMLElement>(".item");
    const numItems = items.length;
    const itemStep = 1 / numItems;

    const wrapProgress = gsap.utils.wrap(0, 1);
    const snap = gsap.utils.snap(itemStep);
    const wrapTracker = gsap.utils.wrap(0, numItems);
    const tracker = { item: 0 };

    gsap.set(items, {
      motionPath: {
        path: circlePath,
        align: circlePath,
        alignOrigin: [0.5, 0.5],
        end: (i) => gsap.utils.wrap(0, 1, i / items.length + 0.75)
      },
      scale: 0.9
    });

    const tl = gsap.timeline({ paused: true, reversed: true });

    tl.to(".wrapper", {
      rotation: 360,
      transformOrigin: "center",
      duration: 1,
      ease: "none"
    }, 0);

    tl.to(items, {
      rotation: "-=360",
      transformOrigin: "center center",
      duration: 1,
      ease: "none"
    }, 0);

    tl.to(tracker, {
      item: numItems,
      duration: 1,
      ease: "none",
      modifiers: {
        item: (value) => wrapTracker(numItems - Math.round(value))
      }
    }, 0);

    const moveWheel = (amount: number) => {
      const progress = tl.progress();
      tl.progress(wrapProgress(snap(tl.progress() + amount)));
      const next = tracker.item;
      tl.progress(progress);

      containerRef.current?.querySelector(".item.active")?.classList.remove("active");
      items[next]?.classList.add("active");

      gsap.to(tl, {
        progress: snap(tl.progress() + amount),
        modifiers: {
          progress: wrapProgress
        }
      });
    };

    // Binds trackpad and mouse wheel input events directly to layout rotation increment vectors
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (gsap.isTweening(tl)) return;

      if (e.deltaY > 0) {
        moveWheel(-itemStep);
      } else if (e.deltaY < 0) {
        moveWheel(itemStep);
      }
    };

    const container = containerRef.current;
    container.addEventListener("wheel", handleWheel, { passive: false });

    // Page scroll execution mapping container position timeline to wheel state progress
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${window.innerHeight * 2}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        if (container.matches(":hover")) return;
        const targetProgress = snap(self.progress);
        gsap.to(tl, {
          progress: targetProgress,
          duration: 0.1,
          overwrite: "auto",
          onUpdate: () => {
            const currentTrackerItem = wrapTracker(numItems - Math.round(tl.progress() * numItems));
            if (items[currentTrackerItem] && !items[currentTrackerItem].classList.contains("active")) {
              container.querySelector(".item.active")?.classList.remove("active");
              items[currentTrackerItem].classList.add("active");
            }
          }
        });
      }
    });

    items.forEach((el, i) => {
      el.addEventListener("click", () => {
        const current = tracker.item;
        if (i === current) return;

        containerRef.current?.querySelector(".item.active")?.classList.remove("active");
        items[i]?.classList.add("active");

        const diff = current - i;
        if (Math.abs(diff) < numItems / 2) {
          moveWheel(diff * itemStep);
        } else {
          const amt = numItems - Math.abs(diff);
          moveWheel(current > i ? amt * -itemStep : amt * itemStep);
        }
      });
    });

    const nextBtn = containerRef.current.querySelector("#next");
    const prevBtn = containerRef.current.querySelector("#prev");

    const onNext = () => moveWheel(-itemStep);
    const onPrev = () => moveWheel(itemStep);

    nextBtn?.addEventListener("click", onNext);
    prevBtn?.addEventListener("click", onPrev);

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative max-w-[1000px] mx-auto min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="wrapper relative w-[800px] h-[800px] flex items-center justify-center">
        <svg viewBox="0 0 800 800" className="absolute w-[800px] h-[800px] z-0 overflow-visible top-0 left-0">
          <circle id="holder" cx="400" cy="400" r="380" className="fill-none stroke-neutral-500/30 stroke-2" />
        </svg>

        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className={`item ${idx === 0 ? "active" : ""} absolute w-[200px] h-[280px] bg-accent text-white flex items-center justify-center text-4xl font-bold rounded-xl z-10 cursor-pointer [&.active]:bg-blue-600 transition-colors duration-200 shadow-xl`}
          >
            {idx + 1}
          </div>
        ))}
      </div>

      <div className="text-center mt-12 flex gap-4 justify-center z-20">
        <button id="prev" className="px-6 py-3 border border-neutral-300 rounded-lg font-sans hover:bg-neutral-100 font-semibold">Prev</button>
        <button id="next" className="px-6 py-3 border border-neutral-300 rounded-lg font-sans hover:bg-neutral-100 font-semibold">Next</button>
      </div>
    </div>
  );
}
