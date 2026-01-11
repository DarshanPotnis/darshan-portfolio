"use client";

import { motion } from "framer-motion";
import Section from "./Section";

export default function About() {
  return (
    <Section>
      <section id="about" className="py-28 bg-[#0f1115] px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-lime-300 mb-6">
            About Me
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-300 text-lg leading-relaxed"
          >
            I’m a backend-focused software developer who enjoys building systems
            that are reliable, scalable, and easy to reason about. I’m especially
            interested in real-time systems, APIs, and cloud-native infrastructure.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-400 text-base leading-relaxed"
          >
            I care deeply about clean architecture, thoughtful trade-offs, and
            writing code that other engineers can understand and maintain.
            Outside of coding, I enjoy continuously learning new technologies
            and improving how systems are designed.
          </motion.p>
        </div>
      </section>
    </Section>
  );
}
