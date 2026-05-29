import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Vidya Varidhee Bal Vinay Mandir Indore",
    company: "High School",
    duration: "2019 - 2020",
    description:
      "Completed high school education with a focus on foundational academics and general knowledge.",
  },
  
  {
    role: "Govt.School Of Excellence Bal Vinay Mandir indore",
    company: "Higher Secondary",
    duration: "2021 - 2022",
    description:
      "Completed higher secondary education with focus on core academic subjects including mathematics and science.",
  },
{
    role: "Govt. Holkar Science College",
    company: "Bachelor Of Computer Applications",
    duration: "2022 - 2025",
    description:
      "Completed BCA with focus on programming and web development. Built proficiency in MERN stack.",
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
 
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isAbove = idx % 2 === 0;
  const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 30 : -30, 0]);


 const cardX = useTransform(scrollYProgress, [start, end], [-12, 0]);

  if (layout === "desktop") {
    return (
      <div className="relative flex-1 flex justify-center items-center min-w-0" key={`${exp.company}-${exp.role}-${idx}`}>
        {/* Marker dot on the timeline */}
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        {/* Small vertical line above or below the marker */}
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-0.75 bg-white/40`}
          style={{ height: 40, opacity: cardOpacity }}
        />
        {/* Experience card with role, company, duration, description */}
        <motion.article
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-80 shadow-lg`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <p className="text-md text-gray-400 mb-3">{exp.company} | {exp.duration}</p>
          <p className="text-md text-gray-300 wrap-break-words">{exp.description}</p>
        </motion.article>
      </div>
    );
  }

  // Render for Mobile layout
  return (
    <div key={`${exp.company}-${exp.role}-m-${idx}`} className="relative flex items-start">
      {/* Marker dot on mobile timeline */}
      <motion.div
  className="absolute -left-3.5 top-6 z-10 w-6 h-6 rounded-full bg-white shadow-[0_0_0_8px_rgba(255,255,255,0.1)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      {/* Experience card (mobile version) */}
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <h3 className="text-lg font-semibold wrap-break-words">{exp.role}</h3>
        <p className="text-sm text-gray-400 mb-2 wrap-break-words">{exp.company} | {exp.duration}</p>
        <p className="text-sm text-gray-300 wrap-break-words">{exp.description}</p>
      </motion.article>
    </div>
  );
}

// Main Experience component
const Experience = () => {
  const sceneRef = React.useRef(null); // Ref for the scrolling section
  const [isMobile, setIsMobile] = React.useState(false); 
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Dynamic scene height based on device type and number of experiences
  const SCENE_HEIGHT_VH = isMobile
  ? experiences.length * 130
  : experiences.length * 120;


  // Get scroll progress for animations
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  // Calculate thresholds for each experience card's animation start/end
  const numExperiences = experiences.length;
  const thresholds = React.useMemo(
    () => Array.from({ length: numExperiences }, (_, i) => (i + 1) / numExperiences),
    [numExperiences]
  );

  // Animate timeline line width (desktop) and height (mobile)
  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(
  scrollYProgress,
  [0, 0.95],
  ["0%", "100%"]
);

  return (
    <section id="experience" className="experience relative bg-black text-white">
      {/* Main container with dynamic height */}
      <div ref={sceneRef} style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }} className="relative">
        <div className={`sticky top-0 flex flex-col ${!isMobile && "h-[120vh]"}`}>
          {/* Section Title */}
          <div className="shrink-0 px-6 pt-8">
            <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">Education</h2>
          </div>
          {/* Timeline container */}
          <div className="flex-1 flex items-center justify-center px-6 pb-10">
            {/* Desktop Timeline */}
            <div className="relative w-full max-w-7xl hidden md:block">
              {/* Horizontal timeline line */}
              <div className="relative h-1.5 bg-white/15 rounded">
                <motion.div className="absolute left-0 top-0 h-1.5 bg-white rounded origin-left" style={{ width: lineWidth }} />
              </div>
              {/* Experience items mapped for desktop */}
              <div className="relative flex justify-between mt-0">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>
            {/* Mobile Timeline */}
            <div className="relative w-full max-w-md md:hidden">
              {/* Vertical timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/15 rounded">
                <motion.div className="absolute top-0 left-0 w-1.5 bg-white rounded origin-top" style={{ height: lineHeight }} />
              </div>
              {/* Experience items mapped for mobile */}
              <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                {experiences.map((exp, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <ExperienceItem
                      key={`${exp.company}-${exp.role}-m-${idx}`}
                      exp={exp}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;