import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const floatVariants = {
  animate: (delay = 0) => ({
    y: [0, -18, 0],
    x: [0, 10, 0],
    rotate: [0, 8, 0],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  }),
};

const NotFound = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_40%),linear-gradient(135deg,#302b63,#00bf8f_55%,#1cd8d2)]" />
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] bg-size-[28px_28px]" />

      <motion.div
        aria-hidden="true"
        className="absolute left-8 top-20 h-28 w-28 rounded-full bg-white/20 blur-3xl"
        variants={floatVariants}
        animate="animate"
        custom={0}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-12 top-32 h-36 w-36 rounded-full bg-emerald-200/20 blur-3xl"
        variants={floatVariants}
        animate="animate"
        custom={0.6}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-20 left-1/4 h-24 w-24 rounded-full bg-cyan-100/20 blur-3xl"
        variants={floatVariants}
        animate="animate"
        custom={1.1}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-3xl rounded-4xl border border-white/10 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm uppercase tracking-[0.45em] text-white/80"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-4 text-5xl font-semibold sm:text-7xl text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base"
        >
          The page you are looking for does not exist or has moved. Use the button below to go back to the portfolio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-950 transition hover:scale-[1.02] hover:bg-cyan-100"
          >
            Back to home
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            View projects
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default NotFound;