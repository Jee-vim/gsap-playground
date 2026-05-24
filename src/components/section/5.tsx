import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import Rerender from "../rerender"
import { useRerender } from "../../hooks"

export default function Fiveth() {
  const [key, triggerRerender] = useRerender()
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.timeline({
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    })
      .to(".left", { y: -180 }, 0)
      .to(".right", { y: 100 }, 0)
  }, { dependencies: [key] })

  return (
    <div className="parent" ref={containerRef} key={key}>
      <div className="left box absolute left-0 top-36" />
      <div className="right box absolute right-0 bottom-28" />
      <Rerender onClick={triggerRerender} />
    </div>
  )
}
