import First from "./components/section/1"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Second from "./components/section/2";
import Third from "./components/section/3";
import Fourth from "./components/section/4";
import Fiveth from "./components/section/5";
import Sixth from "./components/section/6";
import Seventh from "./components/section/7";
import Eight from "./components/section/8";
import Nineth from "./components/section/9";

function App() {

  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);


  // register animation that gonna be used everywhere
  gsap.registerEffect({
    name: "rise",
    effect: (target: string, config: any) => {
      return gsap.to(target, {
        y: config.y,
        ease: config.ease,
        duration: config.duration
      })
    },
    defaults: { y: -200, ease: "power3.out", duration: 3 },
    extendTimeline: true // means you can call the effect  directly  on any gsap timeline
  })

  return (
    <main className="py-5 space-y-5">
      <First />
      <Second />
      <Third />
      <Fourth />
      <Fiveth />
      <Sixth />
      <Seventh />
      <Eight />
      <Nineth />
    </main>
  )
}

export default App
