import { useEffect } from "react";
import { motion } from "framer-motion";
import { Route, Routes } from "react-router-dom";
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
import ProjectDetail from "./section/ProjectDetail";
import NotFound from "./section/NotFound";
import CustomeCursor from "./components/CustomCursor";
import ParticalsBackground from "./components/ParticalsBackground";
import Stairs from "./components/Common/Stairs";

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
  useEffect(() => {
    window.scrollTo(0, 0);

    return undefined;
  }, []);

  return (
    <>
      <Stairs />
      <ParticalsBackground />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/project/:slug" element={<Wrapper children={<ProjectDetail />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
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
