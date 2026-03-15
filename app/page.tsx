"use client";

import { useState, useEffect, useRef } from "react";
import BootScreen from "./components/BootScreen";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

type Section = "hero" | "about" | "skills" | "projects" | "contact";

const NAV: { id: Section; key: string; label: string }[] = [
  { id: "hero",     key: "01", label: "HOME.SYS"    },
  { id: "about",    key: "02", label: "ABOUT.EXE"   },
  { id: "skills",   key: "03", label: "STACK.DAT"   },
  { id: "projects", key: "04", label: "WORK.LOG"    },
  { id: "contact",  key: "05", label: "CONTACT.INI" },
];

const PATHS: Record<Section, string> = {
  hero:     "C:\\DARSHAN\\HOME.SYS",
  about:    "C:\\DARSHAN\\ABOUT.EXE",
  skills:   "C:\\DARSHAN\\STACK.DAT",
  projects: "C:\\DARSHAN\\WORK.LOG",
  contact:  "C:\\DARSHAN\\CONTACT.INI",
};

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return <>{time}</>;
}

export default function Page() {
  const [booted, setBooted]   = useState(false);
  const [active, setActive]   = useState<Section>("hero");
  const curRef = useRef<HTMLDivElement>(null);

  // Custom cursor
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (curRef.current) {
        curRef.current.style.left = e.clientX + "px";
        curRef.current.style.top  = e.clientY  + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const navigate = (id: Section) => setActive(id);

  return (
    <>
      {/* CRT scanline overlay */}
      <div className="scanline" />

      {/* Custom cursor */}
      <div className="custom-cursor" ref={curRef} />

      {/* Boot screen */}
      {!booted && <BootScreen onDone={() => setBooted(true)} />}

      {/* Main app */}
      {booted && (
        <div className="app-shell">

          {/* ── SIDEBAR ── */}
          <nav className="sidebar">
            <div className="sb-header">
              <div className="sb-title">DARSHAN_OS v2.0</div>
              <div className="sb-name">DARSHAN POTNIS</div>
              <div className="sb-sub">Backend Software Engineer</div>
            </div>

            <div className="sb-nav">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item${active === item.id ? " active" : ""}`}
                  onClick={() => navigate(item.id)}
                >
                  <span className="ni-key">{item.key}</span>
                  {item.label}
                  <span className="ni-arrow">›</span>
                </button>
              ))}
              <div className="sb-divider" />
              <button
                className="nav-item"
                onClick={() => window.open("/Darshan_Potnis_Resume_2026.pdf")}
              >
                <span className="ni-key">↗</span>
                RESUME.PDF
                <span className="ni-arrow">›</span>
              </button>
            </div>

            <div className="sb-status">
              <div className="ss-row">
                <span className="ss-key">STATUS</span>
                <span className="ss-val blink-anim">● ONLINE</span>
              </div>
              <div className="ss-row">
                <span className="ss-key">LOCATION</span>
                <span className="ss-val">US</span>
              </div>
              <div className="ss-row">
                <span className="ss-key">AVAIL</span>
                <span className="ss-val-amber">OPEN</span>
              </div>
            </div>

            <div className="sb-socials">
              <a className="soc-link" href="https://github.com/DarshanPotnis" target="_blank" rel="noopener noreferrer">GH</a>
              <a className="soc-link" href="https://linkedin.com/in/darshanpotnis" target="_blank" rel="noopener noreferrer">LI</a>
              <a className="soc-link" href="mailto:potnisd@usc.edu">ML</a>
            </div>
          </nav>

          {/* ── MAIN ── */}
          <div className="main-content">

            {/* Topbar */}
            <div className="topbar">
              <span className="tb-dot" />
              <span className="tb-path">{PATHS[active]}</span>
              <span className="tb-sep">|</span>
              <span className="tb-info">Backend SWE · USC · Open to work · United States</span>
              <span className="tb-clock"><Clock /></span>
            </div>

            {/* Pages */}
            <div className={`page${active === "hero"     ? " active" : ""}`} id="page-hero">
              <Hero onNavigate={navigate} />
            </div>
            <div className={`page${active === "about"    ? " active" : ""}`} id="page-about">
              <About onNavigate={navigate} />
            </div>
            <div className={`page${active === "skills"   ? " active" : ""}`} id="page-skills">
              <TechStack />
            </div>
            <div className={`page${active === "projects" ? " active" : ""}`} id="page-projects">
              <Projects />
            </div>
            <div className={`page${active === "contact"  ? " active" : ""}`} id="page-contact">
              <Contact />
            </div>

          </div>
        </div>
      )}
    </>
  );
}
