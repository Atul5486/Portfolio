import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { projects as projectData } from "../data/projects";

const MH3 = motion.h3;



/* -----------------------------
Mobile detection hook
-------------------------------- */
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    setIsMobile(mql.matches);
    mql.addEventListener?.("change", handler) || mql.addListener(handler);

    return () =>
      mql.removeEventListener?.("change", handler) ||
      mql.removeListener(handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () =>
      projectData.map((project) => ({
        title: project.title,
        link: `/project/${project.slug}`,
        bgColor: project.accent,
        image: project.images[isMobile ? 0 : 0],
      })),
    [isMobile],
  );


  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const clamped = Math.min(Math.max(v, 0), 0.9999);
      const index = Math.floor(clamped * projects.length);
      setActiveIndex((prev) => (prev === index ? prev : index));
    });

    return unsubscribe;
  }, [scrollYProgress, projects.length]);

  const activeProject = projects[activeIndex];

  /* -----------------------------
     Render
  -------------------------------- */
  return (
    <section
      id="projects"
      ref={sceneRef}
      className="projects relative text-white"
      style={{
        height: `${projects.length * 100}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 500ms ease",
      }}
    >
      {/* Sticky frame */}
      <div className="sticky -top-4 h-screen flex flex-col items-center">
        {/* Title */}
        <h2 className={`text-6xl font-semibold mt-4 z-10`}>My Work</h2>

        {/* Project stage */}
        <div className="relative flex-1 w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.title}
              className="absolute inset-0 flex items-center justify-center z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="w-[85%] max-w-300">
                <MH3
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`text-[clamp(2rem,6vw,5rem)] font-bangers italic mb-6 ${
                    isMobile ? "text-center" : "text-left"
                  }`}
                >
                  {activeProject.title}
                </MH3>

                <div
                  className="relative h-[62vh] sm:h-[66vh] overflow-hidden rounded-3xl border border-white/15 p-2 sm:p-3 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${activeProject.bgColor}33 0%, rgba(255,255,255,0.08) 45%, rgba(10,10,10,0.28) 100%)`,
                    boxShadow: `0 20px 70px ${activeProject.bgColor}22`,
                  }}
                >
                  <Link
                    to={activeProject.link}
                    rel="noopener noreferrer"
                    className="block relative h-full overflow-hidden rounded-[1.2rem]"
                  >
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-white/10 pointer-events-none" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className={`absolute ${isMobile ? "bottom-20" : "bottom-10"}`}>
          <Link
            to={activeProject.link}
            className="cursor-pointer px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            View Project
          </Link>
        </div>
      </div>
    </section>
  );
}
