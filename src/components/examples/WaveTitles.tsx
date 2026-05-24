import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

export default function Second() {
  const containerRef = useRef<HTMLUListElement>(null);
  useGSAP(() => {
    const titles = gsap.utils.toArray<HTMLElement>(".title");

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progrss = self.progress;
        const waveSpeed = 2;
        const amplitude = 100

        titles.forEach((title, idx) => {
          const offset = Math.sin(progrss * Math.PI * waveSpeed + idx * 0.8) * amplitude
          gsap.to(title, { x: offset, duration: 0.4, ease: "power2.out" })
        })

        const viewportCenter = window.innerHeight / 2
        let closestIdx = 0
        let minDistance = Infinity

        titles.forEach((txt, idx) => {
          const rect = txt.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elCenter - viewportCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIdx = idx;
          }
        });

        titles.forEach((txt, idx) => {
          txt.classList.toggle("text-neutral-900", idx === closestIdx);
          txt.classList.toggle("text-neutral-900/50", idx !== closestIdx);
        });
      },
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [])
  return (
    <ul className="parent flex items-center flex-col justify-center" ref={containerRef}>
      {Array.from({ length: 20 }).map((_, idx) => {
        return <li key={idx}>
          <h2 className="title">Title {idx}</h2>
        </li>
      })}
    </ul>
  )
}
