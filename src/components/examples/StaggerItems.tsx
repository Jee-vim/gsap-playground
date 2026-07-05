import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import Rerender from "../rerender"
import { useRerender } from "../../hooks"

export default function StaggerItems() {
  const [key, triggerRerender] = useRerender()
  const containerRef = useRef<HTMLUListElement>(null)
  const totalItems = 4

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".item-inner")
    if (items.length === 0) return

    gsap.fromTo(
      items,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }, { scope: containerRef, dependencies: [key] })

  return (
    <ul className="parent flex flex-col justify-between gap-5 w-full" ref={containerRef} key={key}>
      {Array.from({ length: totalItems }).map((_, idx) => {
        // Calculate the percentage step relative to total number of elements
        const factor = idx / (totalItems - 1)

        return (
          <li
            key={idx}
            className="w-full block"
            style={{
              paddingLeft: `calc(${factor} * (100% - var(--item-width, 14rem)))`,
            }}
          >
            <div className="item-inner flex items-center gap-2 w-fit [--item-width:14rem]">
              <p className="text-4xl">{"{"}</p>
              <div>
                <p>Item {idx}</p>
                <p>lorem ipsim dolor {idx}</p>
              </div>
            </div>
          </li>
        )
      })}
      <Rerender onClick={triggerRerender} />
    </ul>
  )
}
