import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export default function Sixth() {

  useGSAP(() => {
    const text1 = ".text-1"
    const text2 = ".text-2"
    const text3 = ".text-3"
    const text4 = ".text-4"

    //  start: "top bottom",   // when top of element hits bottom of viewport
    //  end: "bottom top",     // when bottom of element hits top of viewport
    const tl = gsap.timeline({
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: ".text",
        start: "50% bottom",
        end: "+=1000", // 1000px scroll distance
        scrub: 0.5,
      },
    })

    // 0 means, start this animation at time 0 of the timeline
    // so it will run all animation tt the same time
    tl.from(text1, { xPercent: 10, }, 0)
    tl.from(text2, { xPercent: 10, }, 0)
    tl.from(text3, { xPercent: -10, }, 0)
    tl.from(text4, { xPercent: -10, }, 0)
  }, [])

  return (
    <div className="parent flex items-center justify-center">
      <h1 className="text flex flex-col leading-[1]">
        <span className="flex items-center gap-2">
          <span>Lo</span>
          <span className="text-1">Remipsum</span>
        </span>
        <span className="text-2">Dolor</span>
        <span className="text-3 text-end">lorem</span>
        <span className="text-4 text-end">sitamet</span>
      </h1>
    </div>
  )
}
