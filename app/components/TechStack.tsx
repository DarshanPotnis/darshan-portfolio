"use client";

const SKILLS = [
  {
    cat: "Languages", color: "var(--accent2)", rgb: "99,102,241",
    tools: ["Python","JavaScript","TypeScript","SQL","Bash"],
  },
  {
    cat: "Backend & Frameworks", color: "var(--green)", rgb: "34,197,94",
    tools: ["FastAPI","Flask","Node.js","Redis","WebSockets","REST APIs","React"],
  },
  {
    cat: "Cloud & DevOps", color: "var(--amber)", rgb: "245,158,11",
    tools: ["AWS (EC2, S3, Fargate, Lambda)","Docker","Terraform","GitHub Actions","CI/CD"],
  },
  {
    cat: "Databases", color: "#a78bfa", rgb: "167,139,250",
    tools: ["PostgreSQL","Redis"],
  },
];

const CONCEPTS = [
  "Distributed Systems","Event-Driven Architecture","Concurrency & Race Conditions",
  "API Design","Rate Limiting","Operational Transformation","Pub/Sub Patterns",
  "Query Optimization","System Design","Microservices",
  "Data Structures & Algorithms","Cloud Infrastructure",
];

export default function TechStack() {
  return (
    <section id="skills" style={{ padding: "100px 80px", borderTop: "1px solid var(--border)", maxWidth: 1400, margin: "0 auto" }}>
      <style>{`
        .sg-card { background:var(--bg3); border:1px solid var(--border); border-radius:12px; padding:22px 24px; transition:all 0.22s; }
        .sg-card:hover { border-color:var(--border2); transform:translateY(-2px); }
        .sg-card:hover .sg-icon { transform:rotate(-10deg) scale(1.1); }
        .sg-icon { width:28px; height:28px; border-radius:7px; display:flex; align-items:center; justify-content:center; font-size:14px; transition:transform 0.3s; flex-shrink:0; }
        .sc-chip { font-family:var(--jet); font-size:11px; padding:5px 13px; border-radius:6px; border:1px solid var(--border2); color:var(--muted); transition:all 0.2s; cursor:default; }
        .sc-chip:hover { border-color:var(--accent); color:var(--accent2); background:var(--accent-dim); transform:translateY(-2px); box-shadow:0 4px 12px rgba(99,102,241,0.15); }
        .fc-chip { font-family:var(--jet); font-size:10px; padding:4px 13px; border-radius:100px; border:1px solid var(--border); color:var(--muted2); transition:all 0.2s; cursor:default; display:inline-block; margin:0 5px 7px 0; }
        .fc-chip:hover { border-color:var(--accent); color:var(--accent2); background:var(--accent-dim); }
      `}</style>

      <div style={{ fontFamily: "var(--jet)", fontSize: 11, color: "var(--accent2)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 24, height: 1, background: "var(--accent2)", opacity: 0.5, display: "inline-block" }} />Tech Stack
      </div>
      <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>What I work with.</h2>
      <p style={{ fontSize: "1rem", color: "var(--muted)", marginBottom: 52 }}>Tools I've used in production or built real projects with — nothing padded.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        {/* Languages - full width */}
        <div className="sg-card" style={{ gridColumn: "1/-1" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div className="sg-icon" style={{ background: "var(--accent-dim)" }}>🔤</div>
            <span style={{ fontFamily: "var(--jet)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent2)" }}>Languages</span>
            <span style={{ fontFamily: "var(--jet)", fontSize: 9, color: "var(--muted2)", marginLeft: "auto" }}>5</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {SKILLS[0].tools.map(t => <span key={t} className="sc-chip">{t}</span>)}
          </div>
        </div>

        {SKILLS.slice(1).map((g, i) => (
          <div key={g.cat} className="sg-card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div className="sg-icon" style={{ background: `rgba(${g.rgb},0.1)` }}>
                {i === 0 ? "⚙️" : i === 1 ? "☁️" : "🗄"}
              </div>
              <span style={{ fontFamily: "var(--jet)", fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: g.color }}>{g.cat}</span>
              <span style={{ fontFamily: "var(--jet)", fontSize: 9, color: "var(--muted2)", marginLeft: "auto" }}>{g.tools.length}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {g.tools.map(t => <span key={t} className="sc-chip">{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Concepts strip */}
      <div style={{ padding: "20px 24px", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 12 }}>
        <div style={{ fontFamily: "var(--jet)", fontSize: 9, color: "var(--muted2)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>Systems & CS Concepts</div>
        <div>{CONCEPTS.map(c => <span key={c} className="fc-chip">{c}</span>)}</div>
      </div>
    </section>
  );
}
