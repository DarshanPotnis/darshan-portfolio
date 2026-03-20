"use client";

type Section = "hero" | "about" | "skills" | "projects" | "contact";

const EXPERIENCES = [
  {
    company: "99 Yards",
    role: "Software Engineer Intern",
    color: "var(--green)",
    period: "Jun – Aug 2025",
    location: "New York City, NY",
    bullets: [
      <><strong>45% API latency reduction</strong> via Redis Streams-based event pipeline, replacing polling and improving response consistency under peak traffic</>,
      <><strong>60% faster deployments</strong> by building CI/CD pipelines with GitHub Actions + Terraform, cutting manual steps from ~12 to 3</>,
      <>FastAPI microservices on <strong>AWS Fargate</strong> with auto-scaling + PostgreSQL connection pooling — handled <strong>3× request load</strong> during product launch with zero manual intervention</>,
    ],
  },
  {
    company: "Scienox Technologies",
    role: "Backend Engineer Intern",
    color: "var(--amber)",
    period: "Oct 2022 – Apr 2023",
    location: "Mumbai, India",
    bullets: [
      <><strong>40% faster API response</strong> on Flask/PostgreSQL backend by rewriting N+1 SQL queries + Redis caching layer, reducing avg DB query load by ~55%</>,
      <>Improved real-time financial data pipeline reliability from <strong>~92% to 99.4%</strong> delivery rate, fixing message-loss bugs on AWS EC2</>,
      <>Added structured logging + health-check endpoints across <strong>4 microservices</strong> — team detected and resolved 3 critical incidents within minutes of deploy</>,
    ],
  },
];

const EDUCATION = [
  { school: "University of Southern California", degree: "M.S. Applied Data Science", period: "Jan 2024 – Dec 2025", current: true, courses: "Distributed Systems · Databases · DS&A · Operating Systems" },
  { school: "University of Mumbai",              degree: "B.S. Computer Science",      period: "Aug 2019 – Jun 2022", current: false, courses: null },
];

const TRAITS = [
  { icon: "⚡", label: "Performance First",       val: "LATENCY=MIN"       },
  { icon: "🔁", label: "Event-Driven by default", val: "ASYNC=TRUE"        },
  { icon: "📐", label: "Clean Architecture",      val: "MAINTAINABLE=TRUE" },
  { icon: "☁️", label: "Cloud-Native",            val: "INFRA=AWS"         },
  { icon: "🧪", label: "Test before ship",        val: "COVERAGE=HIGH"     },
];

export default function About({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <>
      <div className="pg-header">
        <div className="pg-eyebrow">about.exe</div>
        <h1 className="pg-title">DARSHAN POTNIS</h1>
        <p className="pg-sub">New grad Backend Engineer · USC M.S. Applied Data Science · Open to work across the US</p>
      </div>

      <div className="about-grid">
        {/* LEFT: Experience */}
        <div>
          <div style={{ fontSize: 9, color: "var(--muted2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18, display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ color: "var(--green)" }}>//</span> WORK EXPERIENCE
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

          {/* Certifications */}
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ background: "rgba(255,176,0,0.06)", border: "1px solid rgba(255,176,0,0.2)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "var(--amber)" }}>
              <span style={{ fontSize: 9, letterSpacing: "0.1em", opacity: 0.6 }}>[AWARD]</span>
              🏆 Winner — USC FinTech Hackathon · 50+ teams · Python + AWS
            </div>
            <div style={{ background: "rgba(0,255,65,0.04)", border: "1px solid rgba(0,255,65,0.18)", padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "var(--green)" }}>
              <span style={{ fontSize: 9, letterSpacing: "0.1em", opacity: 0.6 }}>[CERT]</span>
              ☁️ AWS Certified Cloud Practitioner (2024)
            </div>
          </div>
        </div>

        {/* RIGHT: Education + traits */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div>
            <div style={{ fontSize: 9, color: "var(--muted2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14, display: "flex", gap: 8 }}>
              <span style={{ color: "var(--green)" }}>//</span> EDUCATION
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
                {ed.courses && (
                  <div style={{ fontSize: 9, color: "var(--muted2)", marginTop: 4, letterSpacing: "0.02em" }}>{ed.courses}</div>
                )}
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 9, color: "var(--muted2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, display: "flex", gap: 8 }}>
              <span style={{ color: "var(--green)" }}>//</span> ENGINEERING VALUES
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
              [ HIRE ME ]
            </button>
            <button className="cta-ghost" style={{ fontSize: 10, padding: "8px 16px" }} onClick={() => onNavigate("projects")}>
              [ SEE PROJECTS ]
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
