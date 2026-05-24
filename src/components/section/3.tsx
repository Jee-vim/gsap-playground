import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Third() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const horizontal = containerRef.current?.querySelector(".horizontal") as HTMLElement;
    const items = gsap.utils.toArray<HTMLElement>(".item");

    const scrollLength = horizontal.scrollWidth - window.innerWidth;

    // Horizontal scroll animation
    gsap.to(items, {
      xPercent: -100 * (items.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: horizontal,
        start: "top top",
        end: () => `+=${scrollLength}`,
        scrub: 1,
        pin: true,
      },
    });
  }, { scope: containerRef })
  return (
    <div ref={containerRef} className="relative">
      <div className="horizontal h-screen overflow-hidden">
        <ul className="flex h-full w-[300vw] divide-x">
          {Array.from({ length: 3 }).map((_, idx) => {
            return <li key={idx} className="item w-screen h-full flex items-center justify-center">
              <h2>{idx + 1}</h2>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}
