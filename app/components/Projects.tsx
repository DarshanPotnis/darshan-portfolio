"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const GatewayDiagram = dynamic(() => import("./GatewayDiagram"), { ssr: false });
const CollabDiagram   = dynamic(() => import("./CollabDiagram"),  { ssr: false });
const StorageDiagram  = dynamic(() => import("./StorageDiagram"), { ssr: false });

/* ─── Smooth expand / collapse ─── */
function ExpandPanel({ open, children }: { open: boolean; children: React.ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (open) {
      const h = el.scrollHeight;
      setHeight(h);
      const tid = setTimeout(() => setHeight("auto"), 460);
      return () => clearTimeout(tid);
    } else {
      // snapshot then animate to 0
      setHeight(el.scrollHeight);
      requestAnimationFrame(() => requestAnimationFrame(() => setHeight(0)));
    }
  }, [open]);

  return (
    <div style={{
      overflow: "hidden",
      height: height,
      transition: height === "auto" ? "none" : "height 0.45s cubic-bezier(.22,1,.36,1)",
      willChange: "height",
    }}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

/* ─── Project data ─── */
const PROJECTS = [
  {
    id: "gateway",
    num: "01",
    title: "Redis-Backed API Gateway & Rate Limiter",
    color: "var(--amber)",
    hexColor: "#ffb000",
    rgb: "255,176,0",
    subtitle: "Distributed API Gateway · Rate Limiting · Concurrency",
    stack: ["FastAPI", "Redis", "Docker", "Python"],
    desc: "Distributed API gateway with Redis token-bucket rate limiting and API-key authentication. Load-tested to 1,000+ RPS with consistent enforcement across 3 horizontally scaled instances.",
    hard: "The core challenge was race conditions under concurrent load — naive application-layer counters let multiple requests slip through simultaneously. Solved with atomic Redis Lua scripts that check and decrement in a single operation, reducing limit-check latency by ~3× and achieving zero quota bypasses across 500 concurrent clients in load testing.",
    metrics: [
      { val: "1,000+", label: "RPS sustained"           },
      { val: "~3×",    label: "limit-check latency ↓"   },
      { val: "Zero",   label: "quota bypasses"           },
      { val: "<2%",    label: "false-positive rate"      },
    ],
    github: "https://github.com/darshanpotnis/api-gateway-rate-limiter",
    live: "",
    Diagram: GatewayDiagram,
  },
  {
    id: "collab",
    num: "02",
    title: "Real-Time Collaborative Code Editor",
    color: "var(--cyan)",
    hexColor: "#00ffff",
    rgb: "0,255,255",
    subtitle: "WebSockets · Operational Transform · Pub-Sub",
    stack: ["React", "Node.js", "WebSockets", "Socket.io"],
    desc: "Sub-200ms edit propagation via WebSocket event engine. Reduced redundant WebSocket messages by ~60% with a pub-sub layer routing diffs only to active document subscribers.",
    hard: "The hard problem is concurrent edit conflicts — two users typing at the same position simultaneously will corrupt the document without careful resolution. Implemented Operational Transformation: each edit is transformed against concurrent operations before applying, with causal event ordering ensuring eventual consistency. Zero page reloads on conflict.",
    metrics: [
      { val: "<200ms", label: "edit propagation"          },
      { val: "~60%",   label: "redundant messages ↓"      },
      { val: "Zero",   label: "page reloads on conflict"  },
      { val: "OT",     label: "correct under concurrency" },
    ],
    github: "https://github.com/darshanpotnis/collab-code-editor",
    live: "https://collab-editor-chi.vercel.app",
    Diagram: CollabDiagram,
  },
  {
    id: "storage",
    num: "03",
    title: "Distributed Cloud File Storage",
    color: "var(--green)",
    hexColor: "#00ff41",
    rgb: "0,255,65",
    subtitle: "AWS S3 Pre-signed URLs · Resumable Uploads · RBAC",
    stack: ["Node.js", "React", "AWS S3", "PostgreSQL"],
    desc: "~65% server bandwidth reduction via S3 pre-signed URLs — file transfers go directly to object storage, never through the app server. Chunked resumable uploads up to 500MB with SHA-256 integrity validation.",
    hard: "Chunked resumable uploads are tricky because partial failures are common — network drops mid-upload should be resumable without restarting. Built a chunk manifest system in PostgreSQL tracking which chunks landed, with SHA-256 per-chunk integrity checks before committing the final file. Upload failure retries cut by ~70%.",
    metrics: [
      { val: "~65%",  label: "bandwidth reduction"   },
      { val: "~70%",  label: "upload retries ↓"      },
      { val: "500MB", label: "max file, chunked"      },
      { val: "<20ms", label: "RBAC query response"   },
    ],
    github: "https://github.com/DarshanPotnis/cloud-storage",
    live: "https://cloud-storage-delta.vercel.app",
    Diagram: StorageDiagram,
  },
] as const;

export default function Projects() {
  const [openDiagram, setOpenDiagram] = useState<string | null>(null);
  const toggle = (id: string) => setOpenDiagram(p => p === id ? null : id);

  return (
    <section id="projects" style={{ padding: "100px 80px", borderTop: "1px solid rgba(255,255,255,0.07)", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ fontFamily: "var(--jet)", fontSize: 11, color: "var(--accent2)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 24, height: 1, background: "var(--accent2)", opacity: 0.5, display: "inline-block" }} />Selected Work
      </div>
      <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Projects I've built.</h2>
      <p style={{ fontSize: "1rem", color: "var(--muted)", marginBottom: 52 }}>Three real systems. All measurable. All with a hard engineering problem at the center.</p>

      <style>{`
        .proj-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 18px;
          background: rgba(255,255,255,0.02);
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .proj-card:hover {
          border-color: rgba(255,255,255,0.14);
          box-shadow: 0 14px 48px rgba(0,0,0,0.55);
          transform: translateY(-2px);
        }
        .proj-card-body { padding: 28px 32px; }
        .proj-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .proj-card-name {
          font-family: var(--syne);
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 3px;
        }
        .proj-card-sub {
          font-family: var(--mono);
          font-size: 10px;
          color: var(--muted2);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .proj-stack-new { display: flex; flex-wrap: wrap; gap: 6px; }
        .pst-pill {
          font-family: var(--mono);
          font-size: 9px;
          padding: 3px 10px;
          border-radius: 4px;
          border: 1px solid;
          letter-spacing: 0.04em;
          transition: transform 0.18s;
        }
        .pst-pill:hover { transform: translateY(-1px); }
        .proj-card-desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.78;
          margin-bottom: 14px;
        }
        .hard-callout {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          background: rgba(8,8,18,0.7);
          border-radius: 8px;
          padding: 14px 18px;
          margin-bottom: 20px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(99,102,241,0.18);
          transition: border-color 0.25s;
        }
        .proj-card:hover .hard-callout { border-color: rgba(99,102,241,0.32); }
        .hard-bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: var(--accent);
          border-radius: 0 2px 2px 0;
          opacity: 0.7;
        }
        .hard-label {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--accent2);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .hard-body {
          font-size: 13px;
          color: var(--text);
          line-height: 1.75;
        }
        .proj-metrics-new {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-bottom: 22px;
        }
        .pm-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--muted);
          transition: color 0.2s;
        }
        .pm-item:hover { color: var(--text); }
        .pm-item strong { color: var(--text); font-weight: 600; }
        .pm-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }
        .proj-actions-new { display: flex; gap: 10px; flex-wrap: wrap; }
        .pa-btn {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 500;
          padding: 8px 18px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          border: 1px solid;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          letter-spacing: 0.05em;
        }
        .pa-btn:hover { transform: translateY(-2px); }
        .pa-arch-active {
          background: rgba(99,102,241,0.15) !important;
          border-color: rgba(99,102,241,0.45) !important;
          color: var(--accent2) !important;
        }
        .diag-panel {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 22px 32px 28px;
          background: rgba(0,0,0,0.28);
        }
        .diag-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .diag-label {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--muted2);
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .diag-hint {
          font-family: var(--mono);
          font-size: 9px;
          color: var(--muted2);
        }
      `}</style>

      {PROJECTS.map(proj => {
        const isOpen = openDiagram === proj.id;
        const { Diagram } = proj;

        return (
          <div key={proj.id} className="proj-card">
            {/* colour accent strip */}
            <div style={{ height: 2, background: `linear-gradient(90deg,${proj.hexColor},rgba(${proj.rgb},0.06))` }} />

            <div className="proj-card-body">
              {/* top row */}
              <div className="proj-card-top">
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--muted2)", letterSpacing: "0.12em", marginBottom: 6 }}>
                    // {proj.num}
                  </div>
                  <div className="proj-card-name" style={{ color: proj.color }}>{proj.title}</div>
                  <div className="proj-card-sub">{proj.subtitle}</div>
                </div>
                <div className="proj-stack-new">
                  {proj.stack.map(t => (
                    <span key={t} className="pst-pill"
                      style={{ borderColor: `rgba(${proj.rgb},0.3)`, color: proj.color, background: `rgba(${proj.rgb},0.06)` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="proj-card-desc">{proj.desc}</p>

              {/* Why it's hard — the DSA/systems signal */}
              <div className="hard-callout">
                <div className="hard-bar" />
                <span className="hard-label">Why it's hard →</span>
                <span className="hard-body">{proj.hard}</span>
              </div>

              {/* Metrics */}
              <div className="proj-metrics-new">
                {proj.metrics.map(m => (
                  <div key={m.label} className="pm-item">
                    <div className="pm-dot" style={{ background: proj.color }} />
                    <strong>{m.val}</strong>&nbsp;{m.label}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="proj-actions-new">
                {proj.github && (
                  <a className="pa-btn" href={proj.github} target="_blank" rel="noopener noreferrer"
                    style={{ background: proj.hexColor, color: "#000", borderColor: "transparent" }}>
                    GitHub ↗
                  </a>
                )}
                {proj.live && (
                  <a className="pa-btn" href={proj.live} target="_blank" rel="noopener noreferrer"
                    style={{ background: "transparent", color: proj.color, borderColor: `rgba(${proj.rgb},0.35)` }}>
                    Live Demo ↗
                  </a>
                )}
                <button
                  className={`pa-btn${isOpen ? " pa-arch-active" : ""}`}
                  onClick={() => toggle(proj.id)}
                  style={isOpen ? {} : { background: "transparent", color: "var(--muted)", borderColor: "rgba(255,255,255,0.15)" }}>
                  {isOpen ? "▲ Hide diagram" : "▼ System diagram"}
                </button>
              </div>
            </div>

            {/* Inline diagram — smooth height animation */}
            <ExpandPanel open={isOpen}>
              <div className="diag-panel">
                <div className="diag-header">
                  <span className="diag-label">// architecture · {proj.id}</span>
                  <span className="diag-hint">click any node for details</span>
                </div>
                <Diagram />
              </div>
            </ExpandPanel>
          </div>
        );
      })}
    </section>
  );
}
