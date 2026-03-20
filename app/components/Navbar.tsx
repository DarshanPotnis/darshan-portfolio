"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = ["projects", "experience", "skills", "contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let cur = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) cur = id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#projects",   label: "Projects"   },
    { href: "#experience", label: "Experience" },
    { href: "#skills",     label: "Stack"      },
    { href: "#contact",    label: "Contact"    },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: 60,
      background: scrolled ? "rgba(10,10,15,0.88)" : "rgba(10,10,15,0.6)",
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "transparent"}`,
      display: "flex", alignItems: "center",
      padding: "0 48px", gap: 32,
      transition: "background 0.3s, border-color 0.3s",
      animation: "nav-slide 0.5s cubic-bezier(.22,1,.36,1) both",
    }}>
      <style>{`
        @keyframes nav-slide { from{transform:translateY(-100%);opacity:0} to{transform:translateY(0);opacity:1} }
        .nav-link-item { font-family:var(--jet); font-size:11px; padding:6px 14px; border-radius:6px; color:var(--muted); text-decoration:none; transition:all 0.18s; letter-spacing:0.04em; border:1px solid transparent; }
        .nav-link-item:hover { color:var(--text); background:rgba(255,255,255,0.05); }
        .nav-link-item.active { color:var(--accent2); background:var(--accent-dim); border-color:rgba(99,102,241,0.25); }
        .nav-cta { font-family:var(--sans); font-size:12px; font-weight:700; padding:7px 18px; border-radius:7px; background:var(--accent); color:#fff; text-decoration:none; transition:all 0.2s; border:none; cursor:pointer; }
        .nav-cta:hover { background:#4f46e5; box-shadow:0 0 20px var(--accent-glow); transform:translateY(-1px); }
        .nav-avail { display:flex; align-items:center; gap:7px; font-family:var(--jet); font-size:10px; color:var(--muted); padding:5px 12px; border:1px solid rgba(255,255,255,0.1); border-radius:100px; transition:all 0.2s; }
        .nav-avail:hover { border-color:rgba(34,197,94,0.4); color:var(--green); }
        .nav-dot { width:6px; height:6px; border-radius:50%; background:var(--green); animation:glow-dot 2s ease-in-out infinite; flex-shrink:0; }
        @keyframes glow-dot{0%,100%{box-shadow:0 0 4px var(--green)}50%{box-shadow:0 0 12px var(--green),0 0 20px rgba(34,197,94,0.3)}}
      `}</style>

      <a href="#" style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 800, color: "var(--text)", textDecoration: "none", letterSpacing: "-0.03em", flexShrink: 0 }}>
        Darshan<span style={{ color: "var(--accent)" }}>.</span>
      </a>

      <nav style={{ display: "flex", gap: 2, margin: "0 auto" }}>
        {links.map(l => (
          <a key={l.href} href={l.href}
            className={`nav-link-item${active === l.href.slice(1) ? " active" : ""}`}>
            {l.label}
          </a>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="nav-avail"><span className="nav-dot" />Open to work</div>
        <a className="nav-cta" href="/Darshan_Potnis_Resume_2026.pdf" target="_blank" rel="noopener noreferrer">
          Resume ↗
        </a>
      </div>
    </header>
  );
}
