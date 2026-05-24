import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Eight() {
  const words = ["CREATIVE", "DESIGN", "ANIMATION", "GSAP"];
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tracks = gsap.utils.toArray<HTMLElement>(".track");

    tracks.forEach((track) => {
      const speed = parseFloat(track.dataset.speed || "1");
      const reverse = track.dataset.reverse === "true";
      const duration = 10 / speed;
      const xStart = reverse ? -50 : 0;
      const xEnd = reverse ? 0 : -50;

      const anim = gsap.fromTo(track,
        { xPercent: xStart },
        {
          xPercent: xEnd,
          duration: duration,
          ease: "none",
          repeat: -1
        }
      );

      const onMouseEnter = () => anim.pause();
      const onMouseLeave = () => anim.play();

      track.addEventListener("mouseenter", onMouseEnter);
      track.addEventListener("mouseleave", onMouseLeave);

      // Register cleanups within context to avoid listener duplication
      return () => {
        track.removeEventListener("mouseenter", onMouseEnter);
        track.removeEventListener("mouseleave", onMouseLeave);
      };
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="parent overflow-hidden whitespace-nowrap flex flex-col gap-4 justify-center w-full">
      {Array.from({ length: 3 }).map((_, idx) => {
        return (
          <div
            key={idx}
            className="track flex gap-8 w-fit will-change-transform cursor-pointer"
            data-speed="0.5"
            data-reverse={idx % 2 === 0 ? "true" : "false"}
          >
            {Array.from({ length: 4 }).map((_, loopIdx) => (
              <div key={loopIdx} className="flex gap-8 shrink-0">
                {words.map((word, wordIdx) => (
                  <h2 key={wordIdx}>{word}</h2>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
