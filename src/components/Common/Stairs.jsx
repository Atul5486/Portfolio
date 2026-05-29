import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const Stairs = () => {
  const stairsParent = useRef(null);
  useGSAP(function () {
    const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.28 } });
    const stairs = gsap.utils.toArray(".stairs", stairsParent.current);

    tl.to(stairsParent.current, {
      display: "block",
    });
    tl.from(stairs, {
      height: 0,
      stagger: {
        amount: 0.24,
      },
    });
    tl.to(stairs, {
      y: "100%",
      stagger: {
        amount: 0.2,
      },
    });
    tl.to(stairsParent.current, {
      display: "none",
    });
    tl.to(stairs, {
      y: "0",
    });
  }, []);
  return (
    <div className="w-screen h-full overflow-hidden pointer-events-none" aria-hidden="true">
      <div ref={stairsParent} className="h-screen w-screen fixed top-0 z-100">
        <div className="w-full h-full flex">
          <div className="stairs h-full w-1/5 bg-black/85"></div>
          <div className="stairs h-full w-1/5 bg-black/85"></div>
          <div className="stairs h-full w-1/5 bg-black/85"></div>
          <div className="stairs h-full w-1/5 bg-black/85"></div>
          <div className="stairs h-full w-1/5 bg-black/85"></div>
        </div>
      </div>
    </div>
  );
};

export default Stairs;
