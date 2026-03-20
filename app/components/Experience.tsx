"use client";

const JOBS = [
  {
    company: "99 Yards",
    role: "Software Engineer Intern",
    period: "Jun – Aug 2025",
    location: "New York City, NY",
    color: "var(--accent2)",
    accentRgb: "99,102,241",
    tags: ["FastAPI","Redis Streams","AWS Fargate","PostgreSQL","Terraform","GitHub Actions"],
    bullets: [
      { strong: "45% API latency reduction", rest: " via Redis Streams-based event pipeline, replacing polling and improving response consistency under peak traffic" },
      { strong: "60% faster deployments", rest: " — GitHub Actions + Terraform CI/CD cut manual deployment steps from ~12 to 3" },
      { strong: "3× request load handled", rest: " — FastAPI on AWS Fargate with auto-scaling + PostgreSQL connection pooling during product launch, zero manual intervention" },
    ],
  },
  {
    company: "Scienox Technologies",
    role: "Backend Engineer Intern",
    period: "Oct 2022 – Apr 2023",
    location: "Mumbai, India",
    color: "var(--amber)",
    accentRgb: "245,158,11",
    tags: ["Flask","PostgreSQL","Redis","AWS EC2","Python","Observability"],
    bullets: [
      { strong: "40% faster API response", rest: " on Flask/PostgreSQL by rewriting N+1 SQL queries + Redis caching, reducing avg DB query load by ~55%" },
      { strong: "~92% → 99.4% delivery rate", rest: " — fixed message-loss bugs in real-time financial data pipeline on AWS EC2" },
      { strong: "4 microservices", rest: " — added structured logging + health-check endpoints; team resolved 3 critical incidents within minutes of deploy" },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: "100px 80px", borderTop: "1px solid var(--border)", maxWidth: 1400, margin: "0 auto" }}>
      <style>{`
        .exp-card-new { background:var(--bg3); border:1px solid var(--border); border-radius:14px; padding:30px 34px; transition:all 0.3s; position:relative; overflow:hidden; margin-bottom:16px; }
        .exp-card-new:hover { border-color:var(--border2); transform:translateY(-3px); box-shadow:0 12px 48px rgba(0,0,0,0.5); }
        .exp-top-accent { position:absolute; top:0; left:0; right:0; height:2px; transform:scaleX(0.25); transform-origin:left; transition:transform 0.5s cubic-bezier(.22,1,.36,1); }
        .exp-card-new.visible .exp-top-accent, .exp-card-new:hover .exp-top-accent { transform:scaleX(1); }
        .exp-b-new { display:flex; gap:10px; font-size:13.5px; color:var(--muted); line-height:1.75; margin-bottom:9px; }
        .exp-b-new::before { content:'▸'; color:var(--accent2); flex-shrink:0; margin-top:3px; font-size:10px; transition:transform 0.2s; }
        .exp-card-new:hover .exp-b-new::before { transform:translateX(2px); }
        .exp-tag { font-family:var(--jet); font-size:10px; padding:4px 11px; border-radius:5px; background:var(--bg2); border:1px solid var(--border); color:var(--muted2); transition:all 0.18s; }
        .exp-tag:hover { border-color:var(--accent); color:var(--accent2); background:var(--accent-dim); transform:translateY(-1px); }
        .edu-card { background:var(--bg3); border:1px solid var(--border); border-radius:14px; padding:24px 28px; transition:all 0.2s; }
        .edu-card:hover { border-color:var(--border2); transform:translateY(-2px); }
        .rec-pill { padding:14px 16px; border-radius:8px; border:1px solid; transition:all 0.2s; margin-bottom:10px; }
        .rec-pill:hover { transform:translateY(-2px); }
        .reveal-up { opacity:0; transform:translateY(20px); transition:opacity 0.55s ease,transform 0.55s ease; }
        .reveal-up.vis { opacity:1; transform:translateY(0); }
      `}</style>

      <div style={{ fontFamily: "var(--jet)", fontSize: 11, color: "var(--accent2)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 24, height: 1, background: "var(--accent2)", opacity: 0.5, display: "inline-block" }} />
        Work History
      </div>
      <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Where I've worked.</h2>
      <p style={{ fontSize: "1rem", color: "var(--muted)", marginBottom: 52 }}>Two internships. Real production systems. Numbers that held under load.</p>

      {JOBS.map(job => (
        <div key={job.company} className="exp-card-new">
          <div className="exp-top-accent" style={{ background: `linear-gradient(90deg,${job.color},transparent)` }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
            <div>
              <div style={{ fontFamily: "var(--sans)", fontSize: 19, fontWeight: 800, letterSpacing: "-0.03em", color: job.color, marginBottom: 3 }}>{job.company}</div>
              <div style={{ fontFamily: "var(--jet)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: job.color, opacity: 0.8 }}>{job.role}</div>
            </div>
            <div style={{ fontFamily: "var(--jet)", fontSize: 10, color: "var(--muted2)", textAlign: "right", lineHeight: 1.7 }}>{job.period}<br />{job.location}</div>
          </div>
          <div style={{ marginBottom: 18 }}>
            {job.bullets.map((b, i) => (
              <div key={i} className="exp-b-new">
                <span><strong style={{ color: "var(--text)", fontWeight: 600 }}>{b.strong}</strong>{b.rest}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {job.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
          </div>
        </div>
      ))}

      {/* Education + Awards row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
        <div className="edu-card">
          <div style={{ fontFamily: "var(--jet)", fontSize: 9, color: "var(--muted2)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Education</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>University of Southern California</div>
            <div style={{ fontFamily: "var(--jet)", fontSize: 10, color: "var(--accent2)", marginBottom: 3 }}>M.S. Applied Data Science</div>
            <div style={{ fontFamily: "var(--jet)", fontSize: 10, color: "var(--muted2)" }}>Jan 2024 – Dec 2025 · Los Angeles, CA</div>
            <div style={{ fontFamily: "var(--jet)", fontSize: 10, color: "var(--muted2)", marginTop: 4 }}>Distributed Systems · DS&A · Databases · OS</div>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>University of Mumbai</div>
            <div style={{ fontFamily: "var(--jet)", fontSize: 10, color: "var(--muted2)" }}>B.S. Computer Science · Aug 2019 – Jun 2022</div>
          </div>
        </div>

        <div className="edu-card">
          <div style={{ fontFamily: "var(--jet)", fontSize: 9, color: "var(--muted2)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 16 }}>Recognition</div>
          <div className="rec-pill" style={{ background: "rgba(245,158,11,0.06)", borderColor: "rgba(245,158,11,0.2)" }}>
            <div style={{ fontSize: 13, color: "var(--amber)", fontWeight: 600, marginBottom: 4 }}>🏆 USC FinTech Hackathon — Winner</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Real-time financial analytics · Python + AWS · 1st of 50+ teams</div>
          </div>
          <div className="rec-pill" style={{ background: "rgba(99,102,241,0.06)", borderColor: "rgba(99,102,241,0.2)" }}>
            <div style={{ fontSize: 13, color: "var(--accent2)", fontWeight: 600, marginBottom: 4 }}>☁️ AWS Certified Cloud Practitioner</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>AWS architecture, core services, security · 2024</div>
          </div>
        </div>
      </div>
    </section>
  );
}
