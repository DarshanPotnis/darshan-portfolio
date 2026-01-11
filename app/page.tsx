"use client";

import { useState } from "react";

import Hero from "./components/Hero";
import About from "./components/About";
import TechStackSection from "./components/TechStack";
import ProjectsSection from "./components/Projects";

type Section = "hero" | "about" | "skills" | "projects";

export default function Page() {
  const [activeSection, setActiveSection] = useState<Section>("hero");

  return (
    <main className="bg-[#0f1115] text-slate-50 min-h-screen">
      {activeSection === "hero" && (
        <Hero onNavigate={setActiveSection} />
      )}

      {activeSection === "about" && (
        <About onBack={() => setActiveSection("hero")} />
      )}

      {activeSection === "skills" && (
        <TechStackSection onBack={() => setActiveSection("hero")} />
      )}

      {activeSection === "projects" && (
        <ProjectsSection onBack={() => setActiveSection("hero")} />
      )}
    </main>
  );
}
