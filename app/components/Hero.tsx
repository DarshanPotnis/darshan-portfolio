"use client";

import { useEffect, useRef, useState } from "react";

type Section = "hero" | "about" | "skills" | "projects" | "contact";

const TERM_LINES = [
  { p: true,  t: "whoami",                                      col: "",              d: 300  },
  { p: false, t: "darshan-potnis",                              col: "var(--green)",  d: 800  },
  { p: true,  t: "cat skills.sh | grep primary",                col: "",              d: 1300 },
  { p: false, t: "Redis · FastAPI · WebSockets · AWS",          col: "var(--muted)",  d: 1800 },
  { p: true,  t: "echo $AVAILABILITY",                          col: "",              d: 2300 },
  { p: false, t: "OPEN_TO_WORK=true  # United States",          col: "var(--green)",  d: 2800 },
  { p: true,  t: "ping hiring-manager.company.com",             col: "",              d: 3200 },
  { p: false, t: "PONG 12ms — potnisd@usc.edu",                col: "var(--amber)",  d: 3700 },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let cur = 0;
    const step = to / 60;
    const t = setInterval(() => {
      cur += step;
      if (cur >= to) { setVal(to); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 1200 / 60);
    return () => clearInterval(t);
  }, [to]);
  return <>{val}{suffix}</>;
}

export default function Hero({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [termLines, setTermLines] = useState<{ p: boolean; t: string; col: string }[]>([]);
  const [showCaret, setShowCaret] = useState(false);

  useEffect(() => {
    TERM_LINES.forEach(l => {
      setTimeout(() => setTermLines(prev => [...prev, { p: l.p, t: l.t, col: l.col }]), l.d);
    });
    setTimeout(() => setShowCaret(true), 4100);
  }, []);

  const CHIPS = ["Redis", "FastAPI", "WebSockets", "AWS EC2", "PostgreSQL", "Docker", "Node.js", "React"];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 32px)" }}>

      {/* Sysinfo bar */}
      <div className="hero-sysinfo">
        {[
          { label: "PROCESSOR",  val: "Backend Systems",    sub: "Distributed · Real-time" },
          { label: "MEMORY",     val: "Redis Streams",      sub: "50k+ req/min" },
          { label: "STORAGE",    val: "PostgreSQL · S3",    sub: "99.9% uptime" },
          { label: "NETWORK",    val: "WebSockets · REST",  sub: "<200ms latency" },
        ].map(item => (
          <div key={item.label} className="hsi-col">
            <div className="hsi-label">{item.label}</div>
            <div className="hsi-val">{item.val}</div>
            <div className="hsi-sub">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Main two-col */}
      <div className="hero-body" style={{ flex: 1 }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingRight: 48 }}>
          <div>
            <div className="hero-tag">BACKEND_SDE · OPEN_TO_WORK · UNITED_STATES</div>

            <div style={{ marginBottom: 20 }}>
              <div className="hero-label">// SYSTEM_USER:</div>
              <div className="hero-name">
                DARSHAN
                <span className="hero-name-last">POTNIS</span>
              </div>
              <div className="hero-role">
                <strong>Backend &amp; Distributed Systems</strong> Engineer<br />
                M.S. Applied Data Science · University of Southern California
              </div>
            </div>

            <p className="hero-desc">
              I build infrastructure that <em>doesn't go down</em>. Real-time pipelines,
              event-driven microservices, and APIs engineered for <em>the edge cases</em>{" "}
              that break everyone else's stack.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
              <button className="cta-primary" onClick={() => onNavigate("projects")}>
                [ VIEW_PROJECTS ]
              </button>
              <button className="cta-ghost" onClick={() => onNavigate("contact")}>
                [ HIRE_ME ]
              </button>
              <a className="cta-ghost" href="/Darshan_Potnis_Resume_2026.pdf" target="_blank" rel="noopener noreferrer">
                [ RESUME.PDF ]
              </a>
            </div>

            <div className="chip-row" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {CHIPS.map(c => <span key={c} className="chip">{c}</span>)}
            </div>
          </div>

          {/* Stats */}
          <div style={{ marginTop: 28 }}>
            <div className="stat-grid">
              {[
                { id: "s1", to: 45, suf: "%",  color: "var(--green)", badge: "PERF",  label: "API Latency ↓",   desc: "Redis pipeline @ 99 Yards" },
                { id: "s2", to: 50, suf: "k+", color: "var(--cyan)",  badge: "THRU",  label: "Req/min peak",    desc: "Marketplace traffic" },
                { id: "s3", to: 99, suf: "%",  color: "var(--amber)", badge: "SLA",   label: "Uptime SLA",      desc: "Production APIs" },
                { id: "s4", to: 3,  suf: "",   color: "var(--green)", badge: "SHIP",  label: "Shipped systems", desc: "Full-stack projects" },
              ].map(s => (
                <div key={s.id} className="stat-cell">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div className="stat-n" style={{ color: s.color }}>
                      <Counter to={s.to} suffix={s.suf} />
                    </div>
                    <div className="stat-badge" style={{ borderColor: `${s.color}44`, color: s.color }}>{s.badge}</div>
                  </div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-desc">{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="hack-bar" style={{ marginTop: 8 }}>
              <span style={{ fontSize: 9, letterSpacing: "0.1em", opacity: 0.6 }}>[AWARD]</span>
              🏆 &nbsp;Winner — USC FinTech Hackathon · 50+ competing teams · Python + AWS
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="hero-right">
          {/* Terminal */}
          <div className="term">
            <div className="term-bar">
              <div className="term-dot" style={{ background: "#ff5f56" }} />
              <div className="term-dot" style={{ background: "#ffbd2e" }} />
              <div className="term-dot" style={{ background: "#27c93f" }} />
              <span className="term-label">darshan@backend-sde ~ zsh</span>
            </div>
            <div className="term-body">
              {termLines.map((l, i) => (
                <div key={i} className="t-line">
                  {l.p ? (
                    <>
                      <span className="t-prompt">~$</span>
                      <span className="t-cmd">&nbsp;{l.t}</span>
                    </>
                  ) : (
                    <span style={{ color: l.col || "var(--muted)", paddingLeft: 28 }}>{l.t}</span>
                  )}
                </div>
              ))}
              {showCaret && (
                <div className="t-line">
                  <span className="t-prompt">~$</span>
                  <span className="t-cmd">&nbsp;</span>
                  <span className="t-caret" />
                </div>
              )}
            </div>
          </div>

          {/* Process table */}
          <div style={{ border: "1px solid var(--border)", padding: "14px 16px", background: "var(--surface)" }}>
            <div style={{ fontSize: 9, color: "var(--amber)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10, borderBottom: "1px solid var(--border)", paddingBottom: 6 }}>
              PROCESS_TABLE
            </div>
            {[
              { name: "redis-streams",  status: "RUNNING", meta: "45% ↓latency" },
              { name: "websocket-srv",  status: "RUNNING", meta: "1k+ sessions" },
              { name: "api-gateway",    status: "RUNNING", meta: "50k req/min"  },
              { name: "postgres-pool",  status: "STANDBY", meta: "99.9% uptime", amber: true },
            ].map(p => (
              <div key={p.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 5 }}>
                <span style={{ color: "var(--muted)" }}>{p.name}</span>
                <span style={{ color: p.amber ? "var(--cyan)" : "var(--green)" }}>{p.status}</span>
                <span style={{ color: "var(--muted2)" }}>{p.meta}</span>
              </div>
            ))}
          </div>

          {/* Availability */}
          <div style={{ background: "rgba(0,255,65,0.04)", border: "1px solid rgba(0,255,65,0.18)", padding: "12px 16px" }}>
            <div style={{ fontSize: 9, color: "var(--muted2)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
              AVAILABILITY_STATUS
            </div>
            <div style={{ fontSize: 11, color: "var(--green)", marginBottom: 3 }}>● OPEN_TO_WORK = TRUE</div>
            <div style={{ fontSize: 9, color: "var(--muted)" }}>United States · Remote-friendly · Dec 2025 grad</div>
            <div style={{ fontSize: 9, color: "var(--muted)", marginTop: 2 }}>Full-time SWE / Backend / Distributed Systems roles</div>
          </div>
        </div>
      </div>

      {/* Function key bar */}
      <div className="hero-bottom">
        {[
          { label: "About",    id: "about"    as Section },
          { label: "Stack",    id: "skills"   as Section },
          { label: "Projects", id: "projects" as Section },
          { label: "Contact",  id: "contact"  as Section },
        ].map(item => (
          <span key={item.id} className="fn-key" onClick={() => onNavigate(item.id)}>{item.label}</span>
        ))}
        <span className="fn-key" onClick={() => window.open("/Darshan_Potnis_Resume_2026.pdf")}>Resume</span>
      </div>
    </div>
  );
}
