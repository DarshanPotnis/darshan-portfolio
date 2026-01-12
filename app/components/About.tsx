"use client";

import { motion } from "framer-motion";
import Section from "./Section";

export default function About({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <Section>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="min-h-screen flex flex-col justify-center px-6 bg-[#0f1115]"
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 px-3 py-2
                        text-lime-300 text-sm font-semibold
                        hover:underline"
        >
            ← Back
        </button>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-lime-300 mb-6">
            About Me
          </h2>

          <p className="text-slate-300 text-lg leading-relaxed">
            I’m a backend-focused software developer who enjoys building systems
            that are reliable, scalable, and easy to reason about. I’m especially
            interested in real-time systems, APIs, and cloud-native infrastructure.
          </p>

          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            I care deeply about clean architecture, thoughtful trade-offs, and
            writing code that other engineers can understand and maintain.
            Outside of coding, I enjoy continuously learning new technologies
            and improving how systems are designed.
          </p>
        </div>
      </motion.section>
    </Section>
  );
}
