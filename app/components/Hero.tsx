"use client";

import { motion, useMotionValue } from "framer-motion";

/* -------------------- MAGNETIC BUTTON -------------------- */

function MagneticButton({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      onMouseMove={(e) => {
        // Disable magnetic effect on mobile
        if (typeof window !== "undefined" && window.innerWidth < 768) return;

        const rect = e.currentTarget.getBoundingClientRect();

        const moveX = (e.clientX - rect.left - rect.width / 2) * 0.12;
        const moveY = (e.clientY - rect.top - rect.height / 2) * 0.12;

        x.set(moveX);
        y.set(moveY);
      }}
      onMouseLeave={() => {
        if (typeof window !== "undefined" && window.innerWidth < 768) return;

        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 0.4,
      }}
      className="px-7 py-3 rounded-xl border border-lime-400/40
                 text-lime-300 font-semibold
                 hover:bg-lime-300/10 transition-colors"
    >
      {label}
    </motion.a>
  );
}

/* -------------------- HERO SECTION -------------------- */

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-start pt-16 sm:pt-20 px-6 text-center">
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 mb-8
                   rounded-full border-4 border-lime-500/60
                   shadow-[0_0_40px_rgba(190,242,100,0.25)] overflow-hidden"
      >
        <img
          src="/Darshan_memoji.png"
          alt="Darshan Potnis"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Intro */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-sm text-lime-200 font-semibold mb-3"
      >
        Hi, I’m Darshan Potnis 👋
      </motion.p>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold max-w-5xl leading-tight"
      >
        Backend Software Developer building{" "}
        <span className="text-lime-300">scalable, real-time systems</span> and clean APIs
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-5 max-w-2xl text-slate-400 text-base sm:text-lg"
      >
        I design production-grade backend infrastructure with a focus on performance,
        reliability, and system scalability.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="mt-10 flex gap-4 flex-wrap justify-center"
      >
        <MagneticButton label="View Projects" href="#projects" />
        <MagneticButton label="View Tech Stack" href="#skills" />
        <MagneticButton
          label="Download Resume"
          href="/Darshan_Potnis_Resume_2026.pdf"
          external
        />
      </motion.div>
    </section>
  );
}