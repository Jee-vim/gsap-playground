import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRerender } from "../../hooks"
import Rerender from "../rerender"

export default function First() {
  const [key, triggerRerender] = useRerender()

  useGSAP(() => {
    // NOTE: u can do like this
    // let tl = gsap.timeline()
    // tl.rise(".box")
    //   .rise(".round", { ease: "power2.out", duration: 2 })
    // NOTE: or this
    gsap.effects.rise(".box")
    gsap.effects.rise(".round", { ease: "power1.out", duration: 2 })
  }, { dependencies: [key] })
  return (
    <section className="parent flex items-end justify-center gap-4" key={key}>
      <div className="box" />
      <div className="round" />
      <Rerender onClick={triggerRerender} />
    </section>
  )
}
