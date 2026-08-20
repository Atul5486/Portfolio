import { useEffect, useRef } from "react";
import Lenis from "lenis";

export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with enhanced easing for more pronounced lerp effect
    lenisRef.current = new Lenis({
      duration: 1.4, // Slightly longer duration for smoother feel
      easing: (t) => t * (2 - t), // Ease-out quadratic for more noticeable lerp
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.1, // Increased lerp for smoother movement (more interpolation)
    });

    // Handle scroll events if needed
    const onScroll = (e) => {
      // Can add custom scroll logic here if needed
    };

    lenisRef.current.on("scroll", onScroll);

    // Add raf for animation frame
    const raf = (time) => {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenisRef.current.off("scroll", onScroll);
      lenisRef.current.destroy();
    };
  }, []);

  return lenisRef.current;
};