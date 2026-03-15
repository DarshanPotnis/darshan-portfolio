"use client";

type Section = "hero" | "about" | "skills" | "projects" | "contact";

const EXPERIENCES = [
  {
    company: "99 Yards", role: "Software Engineer", color: "var(--green)",
    period: "Jun – Aug 2025", location: "New York City, NY",
    bullets: [
      <>Architected Redis Streams event pipeline · <strong>45% API latency reduction</strong> · 50k+ req/min</>,
      <>Full-stack marketplace (React + FastAPI + PostgreSQL) for <strong>10k+ daily active users</strong></>,
      <>WebSocket messaging infra · <strong>1k+ concurrent sessions</strong> · real-time propagation</>,
    ],
  },
  {
    company: "Scienox Technologies", role: "Software Engineer", color: "var(--amber)",
    period: "Oct 2022 – Apr 2023", location: "Mumbai, India",
    bullets: [
      <>Flask microservices + Redis caching → <strong>40% faster API response</strong> on financial endpoints</>,
      <>Real-time AWS EC2 data ingestion pipeline · thousands of financial events per minute</>,
      <>Achieved <strong>99.9% uptime</strong> via structured logging &amp; auto failure detection</>,
    ],
  },
];

const EDUCATION = [
  { school: "University of Southern California", degree: "M.S. Applied Data Science",          period: "Jan 2024 – Dec 2025", current: true },
  { school: "University of Mumbai",              degree: "Post-Grad Diploma · Predictive Analytics", period: "Jun 2022 – Jul 2023", current: false },
  { school: "University of Mumbai",              degree: "B.S. Computer Science",               period: "Aug 2019 – Jun 2022", current: false },
];

const TRAITS = [
  { icon: "⚡", label: "Performance First",        val: "LATENCY=MIN"         },
  { icon: "♻",  label: "Reliability",              val: "UPTIME=99.9%"        },
  { icon: "📐", label: "Clean Architecture",       val: "MAINTAINABLE=TRUE"   },
  { icon: "☁️", label: "Cloud-Native by default",  val: "INFRA=AWS"           },
  { icon: "🔁", label: "Event-Driven Thinking",    val: "ASYNC=TRUE"          },
];

export default function About({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <>
      <div className="pg-header">
        <div className="pg-eyebrow">about.exe</div>
        <h1 className="pg-title">DARSHAN POTNIS</h1>
        <p className="pg-sub">Backend engineer. Systems thinker. Distributed infrastructure obsessive.</p>
      </div>

      <div className="about-grid">
        {/* LEFT: Experience */}
        <div>
          <div style={{ fontSize: 9, color: "var(--muted2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18, display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: "var(--green)" }}>//</span> WORK_HISTORY.LOG
          </div>

          {EXPERIENCES.map((exp, i) => (
            <div key={exp.company} className="exp-entry" style={i === EXPERIENCES.length - 1 ? { borderBottom: "none" } : {}}>
              <div className="exp-header">
                <div>
                  <div className="exp-co" style={{ color: exp.color }}>{exp.company}</div>
                  <div className="exp-role-title" style={{ color: exp.color }}>{exp.role}</div>
                </div>
                <div className="exp-meta">{exp.period}<br />{exp.location}</div>
              </div>
              <div className="exp-bullets">
                {exp.bullets.map((b, j) => (
                  <div key={j} className="exp-b">{b}</div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ background: "rgba(255,176,0,0.06)", border: "1px solid rgba(255,176,0,0.2)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "var(--amber)", marginTop: 16 }}>
            <span style={{ fontSize: 9, letterSpacing: "0.1em", opacity: 0.6 }}>[AWARD]</span>
            🏆 Winner — USC FinTech Hackathon · 50+ competing teams · Python + AWS
          </div>
        </div>

        {/* RIGHT: Education + traits */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div>
            <div style={{ fontSize: 9, color: "var(--muted2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", gap: 8 }}>
              <span style={{ color: "var(--green)" }}>//</span> EDUCATION.DAT
            </div>
            {EDUCATION.map(ed => (
              <div key={ed.degree} className={`edu-entry${ed.current ? " current" : ""}`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div className="edu-school">{ed.school}</div>
                  {ed.current && (
                    <span style={{ fontSize: 8, padding: "2px 7px", border: "1px solid rgba(0,255,65,0.3)", color: "var(--green)", flexShrink: 0 }}>CURRENT</span>
                  )}
                </div>
                <div className="edu-deg">{ed.degree}</div>
                <div className="edu-year">{ed.period}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 9, color: "var(--muted2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, display: "flex", gap: 8 }}>
              <span style={{ color: "var(--green)" }}>//</span> CORE_VALUES.INI
            </div>
            <div className="trait-list">
              {TRAITS.map(t => (
                <div key={t.label} className="trait-item">
                  <span style={{ fontSize: 14, width: 20, textAlign: "center" }}>{t.icon}</span>
                  <span style={{ color: "var(--muted)", flex: 1 }}>{t.label}</span>
                  <span className="trait-val">{t.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button className="cta-primary" style={{ fontSize: 10, padding: "9px 18px" }} onClick={() => onNavigate("contact")}>
              [ HIRE_ME ]
            </button>
            <button className="cta-ghost" style={{ fontSize: 10, padding: "8px 16px" }} onClick={() => onNavigate("projects")}>
              [ SEE_WORK ]
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
