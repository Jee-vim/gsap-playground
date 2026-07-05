import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import Rise from "./components/examples/Rise"
import WaveTitles from "./components/examples/WaveTitles";
import HorizontalScroll from "./components/examples/HorizontalScroll";
import HorizontalScrollCarousel from "./components/examples/HorizontalScrollCarousel";
import StaggerItems from "./components/examples/StaggerItems";
import TimelineY from "./components/examples/TimelineY";
import TimelineText from "./components/examples/TimelineText";
import ZoomMarquee from "./components/examples/ZoomMarquee";
import InteractiveMarquee from "./components/examples/InteractiveMarquee";
import RoundedCarousel from "./components/examples/RoundedCarousel";

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
      <Rise />
      <WaveTitles />
      <HorizontalScroll />
      <HorizontalScrollCarousel />
      <StaggerItems />
      <TimelineY />
      <TimelineText />
      <ZoomMarquee />
      <InteractiveMarquee />
      <RoundedCarousel />
    </main>
  )
}

export default App
