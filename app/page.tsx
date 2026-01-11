"use client";

import Hero from "./components/Hero";
import TechStackSection from "./components/TechStack";
import ProjectsSection from "./components/Projects";
import About from "./components/About";

export default function Page() {
  return (
    <main className="bg-[#0f1115] text-slate-50">
      <Hero />
      <About />
      <TechStackSection />
      <ProjectsSection />

      <footer className="text-center text-xs text-slate-500 pb-10">
        © {new Date().getFullYear()} Darshan Potnis · Built with Next.js, Tailwind & Framer Motion
      </footer>
    </main>
  );
}
