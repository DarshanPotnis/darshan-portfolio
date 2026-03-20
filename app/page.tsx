import Navbar     from "./components/Navbar";
import Hero       from "./components/Hero";
import Projects   from "./components/Projects";
import Experience from "./components/Experience";
import TechStack  from "./components/TechStack";
import Contact    from "./components/Contact";

export default function Page() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <Navbar />
      <Hero />
      <Projects />
      <Experience />
      <TechStack />
      <Contact />
    </main>
  );
}
