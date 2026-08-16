import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Navbar from "./components/Navbar";
import Home from "./section/Home";
import Skills from "./section/Skills";
import About from "./section/About";
import Contact from "./section/Contact";
import Eduction from "./section/Eduction";
import Experience from "./section/Experience";
import Footer from "./section/Footer";
import Projects from "./section/Project";
import CustomeCursor from "./components/CustomCursor";
import ParticalsBackground from "./components/ParticalsBackground";
import Stairs from "./components/Common/Stairs";

const ProjectDetail = lazy(() => import("./section/ProjectDetail"));
const NotFound = lazy(() => import("./section/NotFound"));
const ChatbotWidget = lazy(() => import("./components/ChatbotWidget"));

gsap.registerPlugin(ScrollToPlugin);

function scrollToSection(target) {
  const section = document.getElementById(target) || document.querySelector(`.${target}`);
  if (section) {
    gsap.killTweensOf(window);
    gsap.to(window, {
      duration: 0.7,
      ease: "power2.out",
      scrollTo: {
        y: section,
        offsetY: 72,
        autoKill: true,
      },
    });
  }
}
const App = () => {
  const location = useLocation();
  const [isPageVisible, setIsPageVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPageVisible(false);

    const timer = window.setTimeout(() => {
      setIsPageVisible(true);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Stairs />
      <ParticalsBackground />

      <div
        style={{
          opacity: isPageVisible ? 1 : 0,
          transition: "opacity 0.25s ease",
          pointerEvents: isPageVisible ? "auto" : "none",
        }}
      >
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/project/:slug" element={<Wrapper children={<ProjectDetail />} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Suspense fallback={null}>
        <ChatbotWidget />
      </Suspense>
    </>
  );
};

function Main() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative top-0 gradient text-white w-full max-w-screen min-h-screen"
      style={{ position: "relative" }}
    >
      <CustomeCursor />
      <Navbar scrollToSection={scrollToSection} />
      <div>
        <Home />
      </div>
      <div>
        <About scrollToSection={scrollToSection} />
      </div>
      <div>
        <Skills />
      </div>
      <div>
        <Projects />
      </div>
      <div>
        <Eduction />
      </div>
      <div>
        <Experience />
      </div>
      <div>
        <Contact />
      </div>
      <div>
        <Footer />
      </div>
    </motion.div>
  );
}
function Wrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative gradient text-white w-full h-full max-w-screen"
      style={{ position: "relative" }}
    >
      {children}
    </motion.div>
  );
}

export default App;
