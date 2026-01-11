"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Section({ children }: { children: ReactNode }) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: typeof window !== "undefined" && window.innerWidth < 768 ? 20 : 40,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
