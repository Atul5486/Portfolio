import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";

const Stairs = () => {
  const stairsParent = useRef(null);
  const currentPath = useLocation().pathname;

  useGSAP(
    function () {
      const tl = gsap.timeline();

      tl.to(stairsParent.current, {
        display: "block",
      });

      tl.from(".stairs", {
        height: 0,
        stagger: {
          amount: 0.3,
        },
      });

      tl.to(".stairs", {
        y: "100%",
        stagger: {
          amount: 0.3,
        },
      });

      tl.to(stairsParent.current, {
        display: "none",
      });

      tl.to(".stairs", {
        y: "0",
      });
    },
    [currentPath],
  );

  return (
    <div className="h-full w-screen overflow-hidden">
      <div ref={stairsParent} className="fixed top-0 z-10 h-screen w-screen">
        <div className="flex h-full w-full">
          <div className="stairs h-full w-1/5 bg-black"></div>
          <div className="stairs h-full w-1/5 bg-black"></div>
          <div className="stairs h-full w-1/5 bg-black"></div>
          <div className="stairs h-full w-1/5 bg-black"></div>
          <div className="stairs h-full w-1/5 bg-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Stairs;