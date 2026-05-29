import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    type: "experience",
    role: "InfoBeans Foundation",
    company: "Trainee",
    duration: "2025 - present",
    description:
      "Currently working as a Trainee at InfoBeans Foundation , gaining hands-on experience in developing Java full-stack web applications using Java, Spring, SpringBoot, Hibernate,React js, Mongodb, MYSQL.",
  },
  {
    type: "certification",
    role: "Full Stack Web Development",
    company: "National Skill Up Program",
    duration: "2025",
    description:
      "Certified in MERN Full Stack Web Development with hands-on experience building end-to-end applications using HTML, CSS, JavaScript, React.js, Node.js, Express.js, and MongoDB.",
  },
  {
    type: "certification",
    role: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    company: "Oracle University",
    duration: "October 2025",
    description:
      "Oracle Certified Foundations Associate in Cloud Infrastructure with expertise in AI concepts, cloud computing fundamentals, and enterprise solutions.",
  },
];

function ExperienceItem({ exp, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
 
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isAbove = idx % 2 === 0;
  const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 30 : -30, 0]);


 const cardX = useTransform(scrollYProgress, [start, end], [-12, 0]);
  const isCertification = exp.type === "certification";

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
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-7 w-96 shadow-lg`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          {isCertification && (
            <span className="inline-block mb-3 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
              Certification
            </span>
          )}
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
        {isCertification && (
          <span className="inline-block mb-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-200">
            Certification
          </span>
        )}
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
            <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center">Experience & Certifications</h2>
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