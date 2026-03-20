"use client";

import { useEffect, useState } from "react";

const TERM_LINES = [
  { p: true,  t: "whoami",                                       col: "",             d: 300  },
  { p: false, t: "darshan-potnis // backend-sde",                col: "var(--accent2)", d: 750  },
  { p: true,  t: "cat stack.sh | grep primary",                  col: "",             d: 1200 },
  { p: false, t: "FastAPI · Redis · Node.js · AWS · PostgreSQL", col: "var(--muted)", d: 1650 },
  { p: true,  t: "echo $AVAILABILITY",                           col: "",             d: 2100 },
  { p: false, t: "OPEN_TO_WORK=true  # United States",           col: "var(--green)", d: 2500 },
  { p: true,  t: "ping hiring-manager.company.com",              col: "",             d: 2900 },
  { p: false, t: "PONG 8ms — potnisdarshan@gmail.com",           col: "var(--amber)", d: 3300 },
];

function Counter({ to, suffix = "", dur = 1100 }: { to: number; suffix?: string; dur?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step = to / 60;
    const t = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, dur / 60);
    return () => clearInterval(t);
  }, [to, dur]);
  return <>{val}{suffix}</>;
}

export default function Hero() {
  const [lines, setLines] = useState<{ p: boolean; t: string; col: string }[]>([]);
  const [caret, setCaret] = useState(false);

  useEffect(() => {
    TERM_LINES.forEach(l => setTimeout(() => setLines(p => [...p, l]), l.d));
    setTimeout(() => setCaret(true), 3800);
  }, []);

  return (
    <section style={{ minHeight: "100vh", padding: "130px 80px 80px", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes hero-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes grad-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes line-grow  { to{width:48%} }
        @keyframes shimmer    { 0%{left:-100%} 100%{left:200%} }
        @keyframes tcaret     { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes glow-pulse { 0%,100%{box-shadow:0 0 4px var(--green)} 50%{box-shadow:0 0 14px var(--green),0 0 24px rgba(34,197,94,0.3)} }
        .h1{animation:hero-up 0.7s cubic-bezier(.22,1,.36,1) 0.1s both}
        .h2{animation:hero-up 0.7s cubic-bezier(.22,1,.36,1) 0.2s both}
        .h3{animation:hero-up 0.7s cubic-bezier(.22,1,.36,1) 0.3s both}
        .h4{animation:hero-up 0.7s cubic-bezier(.22,1,.36,1) 0.4s both}
        .h5{animation:hero-up 0.7s cubic-bezier(.22,1,.36,1) 0.5s both}
        .h6{animation:hero-up 0.7s cubic-bezier(.22,1,.36,1) 0.65s both}
        .stat-card { padding:16px 20px; background:var(--bg3); border:1px solid var(--border); border-radius:12px; transition:all 0.25s; position:relative; overflow:hidden; }
        .stat-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--accent),transparent); opacity:0; transition:opacity 0.3s; }
        .stat-card:hover { border-color:rgba(99,102,241,0.3); transform:translateY(-4px); box-shadow:0 8px 32px rgba(0,0,0,0.5); }
        .stat-card:hover::before { opacity:1; }
        .btn-p { display:inline-flex; align-items:center; gap:8px; padding:13px 30px; border-radius:9px; background:var(--accent); color:#fff; font-size:13px; font-weight:700; text-decoration:none; border:none; cursor:pointer; transition:all 0.22s; }
        .btn-p:hover { background:#4f46e5; box-shadow:0 0 28px var(--accent-glow); transform:translateY(-2px); }
        .btn-s { display:inline-flex; align-items:center; gap:8px; padding:12px 26px; border-radius:9px; background:transparent; color:var(--text); font-size:13px; font-weight:600; border:1px solid var(--border2); text-decoration:none; cursor:pointer; transition:all 0.22s; }
        .btn-s:hover { border-color:rgba(255,255,255,0.28); background:rgba(255,255,255,0.05); transform:translateY(-2px); }
        .tbadge { font-family:var(--jet); font-size:10px; padding:4px 12px; border-radius:6px; border:1px solid var(--border2); color:var(--muted); transition:all 0.2s; cursor:default; }
        .tbadge:hover { border-color:var(--accent); color:var(--accent2); background:var(--accent-dim); transform:translateY(-2px); }
        .t-caret-blink { display:inline-block; width:8px; height:13px; background:var(--accent2); vertical-align:text-bottom; margin-left:2px; animation:tcaret 1.1s step-end infinite; }
        .award-pill { display:flex; align-items:center; gap:10px; padding:11px 16px; border-radius:9px; border:1px solid; font-size:12px; transition:all 0.2s; }
        .award-pill:hover { transform:translateY(-2px); }
      `}</style>

      {/* bg grid */}
      <div style={{ position: "fixed", inset: 0, zIndex: -1, backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)", backgroundSize: "64px 64px", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 30% 30%,black 20%,transparent 80%)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: -2, background: "radial-gradient(ellipse 70% 60% at 30% 40%,rgba(99,102,241,0.07) 0%,transparent 70%)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 420px", gap: 80, alignItems: "center" }}>

        {/* LEFT */}
        <div>
          {/* tag pill */}
          <div className="h1" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 100, border: "1px solid rgba(99,102,241,0.35)", background: "var(--accent-dim)", fontFamily: "var(--jet)", fontSize: 10, color: "var(--accent2)", letterSpacing: "0.08em", marginBottom: 24, position: "relative", overflow: "hidden" }}>
            Backend Engineer · New Grad · USC M.S. Dec 2025
            <span style={{ position: "absolute", top: 0, left: "-100%", width: "100%", height: "100%", background: "linear-gradient(90deg,transparent,rgba(129,140,248,0.2),transparent)", animation: "shimmer 3s ease-in-out infinite" }} />
          </div>

          {/* name */}
          <h1 className="h2" style={{ fontFamily: "var(--sans)", fontSize: "clamp(3.2rem,6.5vw,5.8rem)", fontWeight: 900, lineHeight: 0.93, letterSpacing: "-0.05em", marginBottom: 16 }}>
            <span style={{ display: "block", color: "var(--text)" }}>Darshan</span>
            <span style={{ display: "block", background: "linear-gradient(135deg,var(--accent),var(--accent2),#a5b4fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", backgroundSize: "200% 200%", animation: "grad-shift 4s ease infinite", position: "relative" }}>
              Potnis.
              <span style={{ position: "absolute", left: 0, bottom: -6, width: 0, height: 2, background: "linear-gradient(90deg,var(--accent),var(--accent2),transparent)", borderRadius: 2, animation: "line-grow 0.8s 0.9s cubic-bezier(.22,1,.36,1) forwards" }} />
            </span>
          </h1>

          <p className="h3" style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: 12, lineHeight: 1.5 }}>
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>Backend & Distributed Systems</strong> · University of Southern California
          </p>

          <p className="h4" style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85, maxWidth: 560, marginBottom: 36 }}>
            I build systems that handle{" "}
            <span style={{ color: "var(--text)", fontWeight: 500, background: "linear-gradient(90deg,rgba(99,102,241,0.15),transparent)", padding: "0 4px", borderRadius: 3 }}>real load under real constraints</span>
            {" "}— high-throughput APIs, event-driven pipelines, and cloud infrastructure on AWS. I care about{" "}
            <span style={{ color: "var(--text)", fontWeight: 500, background: "linear-gradient(90deg,rgba(99,102,241,0.15),transparent)", padding: "0 4px", borderRadius: 3 }}>correctness, latency, and maintainability</span>.
          </p>

          <div className="h5" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}>
            <a className="btn-p" href="#projects">View Projects ↓</a>
            <a className="btn-s" href="#contact">Get in Touch</a>
            <a className="btn-s" href="/Darshan_Potnis_Resume_2026.pdf" target="_blank" rel="noopener noreferrer">Resume ↗</a>
          </div>

          {/* stats */}
          <div className="h6" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
            {[
              { to: 45,  suf: "%",   col: "var(--accent2)", label: "API Latency ↓",    src: "Redis Streams @ 99 Yards"    },
              { to: 60,  suf: "%",   col: "var(--green)",   label: "Deploy Time ↓",    src: "GitHub Actions + Terraform"  },
              { to: 99,  suf: ".4%", col: "var(--amber)",   label: "Delivery Rate",    src: "Scienox pipeline"            },
              { to: 3,   suf: "",    col: "var(--accent2)", label: "Projects Shipped",  src: "All with real metrics"       },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div style={{ fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: s.col, marginBottom: 6 }}>
                  <Counter to={s.to} suffix={s.suf} />
                </div>
                <div style={{ fontFamily: "var(--jet)", fontSize: 9, color: "var(--muted2)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "var(--muted2)" }}>{s.src}</div>
              </div>
            ))}
          </div>

          {/* award pills */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div className="award-pill" style={{ background: "rgba(245,158,11,0.07)", borderColor: "rgba(245,158,11,0.28)", color: "var(--amber)" }}>
              🏆 USC FinTech Hackathon — 1st place · 50+ teams
            </div>
            <div className="award-pill" style={{ background: "rgba(99,102,241,0.07)", borderColor: "rgba(99,102,241,0.28)", color: "var(--accent2)" }}>
              ☁️ AWS Certified Cloud Practitioner (2024)
            </div>
          </div>
        </div>

        {/* RIGHT — terminal */}
        <div style={{ animation: "hero-up 0.7s cubic-bezier(.22,1,.36,1) 0.45s both" }}>
          <div style={{ background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.03)" }}>
            <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 7 }}>
              {["#ff5f56","#ffbd2e","#27c93f"].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
              <span style={{ marginLeft: 10, fontFamily: "var(--jet)", fontSize: 10, color: "var(--muted2)" }}>darshan@portfolio — zsh</span>
            </div>
            <div style={{ padding: 20, fontFamily: "var(--jet)", fontSize: 12, lineHeight: 1.85, minHeight: 148 }}>
              {lines.map((l, i) => (
                <div key={i} style={{ display: "flex", gap: 10, animation: "hero-up 0.25s ease both" }}>
                  {l.p
                    ? <><span style={{ color: "var(--accent2)", opacity: 0.7 }}>~$</span><span style={{ color: "var(--text)" }}>&nbsp;{l.t}</span></>
                    : <span style={{ color: l.col || "var(--muted)", paddingLeft: 32 }}>{l.t}</span>}
                </div>
              ))}
              {caret && (
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: "var(--accent2)", opacity: 0.7 }}>~$</span>
                  <span style={{ color: "var(--text)" }}>&nbsp;</span>
                  <span className="t-caret-blink" />
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, padding: "14px 20px", borderTop: "1px solid var(--border)" }}>
              {["FastAPI","Redis","Node.js","PostgreSQL","AWS","Docker","Terraform","WebSockets"].map(t => (
                <span key={t} className="tbadge">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
