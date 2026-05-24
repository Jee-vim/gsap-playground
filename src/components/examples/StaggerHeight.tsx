import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Rerender from "../rerender";
import { useRerender } from "../../hooks";

export default function Nineth() {
  const [key, triggerRerender] = useRerender()
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".animate-item",
      {
        height: 0,
        opacity: 0
      },
      {
        height: 180,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "top 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef, dependencies: [key] })

  return (
    <div ref={containerRef} key={key} className="parent flex items-center justify-center min-h-screen w-full">
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="animate-item w-32 h-0 opacity-0 overflow-hidden">
            <div className="size-full bg-accent rounded-md min-h-[180px]"></div>
          </div>
        ))}
      </div>
      <Rerender onClick={triggerRerender} />
    </div>
  );
}
