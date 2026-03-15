"use client";

import { useState } from "react";

const PROJECTS = [
  {
    id: "collab", num: "01", colorClass: "proj-c1",
    title: "CollabEditor", color: "var(--cyan)", hexColor: "#00ffff",
    subtitle: "Real-Time Collaborative Code Editor",
    stack: ["React","Node.js","WebSockets","Redis"],
    stackBorder: "rgba(0,255,255,0.3)", stackColor: "var(--cyan)",
    desc: "Multi-user code editing with WebSocket synchronization achieving sub-200ms latency. Operational reconciliation algorithms maintain consistent document state across distributed clients at scale.",
    metrics: [
      { val: "<200ms", label: "sync latency" },
      { val: "Multi-user", label: "rooms" },
      { val: "Op.", label: "reconciliation" },
      { val: "Redis", label: "pub-sub" },
    ],
    liveUrl: "https://collab-editor-chi.vercel.app",
    arch: {
      flow: [
        "Client opens WebSocket handshake with unique room ID",
        "Server creates isolated room state in memory + Redis",
        "Keystrokes broadcast as delta events to all room subscribers",
        "Operational transform resolves concurrent edit conflicts",
        "All clients apply patches → consistent state in <200ms",
      ],
      stack: ["React","Node.js","Socket.io","Redis pub/sub","Vercel"],
      metrics: ["<200ms end-to-end latency","Concurrent multi-user rooms","Event ordering guarantees","Redis-backed relay"],
    },
  },
  {
    id: "storage", num: "02", colorClass: "proj-c2",
    title: "CloudVault", color: "var(--green)", hexColor: "#00ff41",
    subtitle: "Distributed Cloud File Storage System",
    stack: ["Node.js","AWS S3","PostgreSQL","JWT"],
    stackBorder: "rgba(0,255,65,0.3)", stackColor: "var(--green)",
    desc: "Scalable object storage using S3 pre-signed URLs and stateless APIs, reducing backend server load by 70%. Chunked resumable uploads with SHA-256 integrity validation for fault-tolerant large file transfers.",
    metrics: [
      { val: "70%", label: "backend load reduction" },
      { val: "Pre-signed", label: "S3 URLs" },
      { val: "RBAC", label: "auth" },
      { val: "Chunked", label: "uploads" },
    ],
    liveUrl: "",
    arch: {
      flow: [
        "Client authenticates, receives JWT with scoped permissions",
        "API generates pre-signed S3 URL (15-min TTL)",
        "File uploads directly to S3 — server never touches bytes",
        "Metadata + chunk manifest written to PostgreSQL atomically",
        "SHA-256 hash verified post-upload for integrity assurance",
      ],
      stack: ["Node.js","AWS S3","PostgreSQL","JWT"],
      metrics: ["70% backend load reduction","Pre-signed URL architecture","RBAC access control","Fault-tolerant chunked uploads"],
    },
  },
  {
    id: "gateway", num: "03", colorClass: "proj-c3",
    title: "RateLimiter Pro", color: "var(--amber)", hexColor: "#ffb000",
    subtitle: "API Gateway & Distributed Rate Limiter",
    stack: ["FastAPI","Redis","Python"],
    stackBorder: "rgba(255,176,0,0.3)", stackColor: "var(--amber)",
    desc: "Production-grade FastAPI gateway with Redis-backed token bucket rate limiting, API key authentication, HTTP 429 enforcement, and a live monitoring dashboard with tier simulation and real-time TTL countdowns.",
    metrics: [
      { val: "Token bucket", label: "algorithm" },
      { val: "HTTP 429", label: "enforcement" },
      { val: "Live", label: "dashboard" },
      { val: "Multi-tier", label: "support" },
    ],
    liveUrl: "https://github.com/DarshanPotnis/api-rate-limiter",
    liveLabel: "[ VIEW_GITHUB ]",
    liveStyle: { background: "var(--amber)", color: "#000" },
    arch: {
      flow: [
        "Request arrives with API key in Authorization header",
        "Key looked up in Redis, tier config loaded (<1ms)",
        "Token bucket counter atomically decremented in Redis",
        "Exceeded quota → HTTP 429 + Retry-After header returned",
        "Dashboard WebSocket stream shows live counter/reset state",
      ],
      stack: ["FastAPI","Redis","Python","REST"],
      metrics: ["Token bucket algorithm","API key tiers","HTTP 429 enforcement","Real-time monitoring UI"],
    },
  },
];

function Modal({ proj, onClose }: { proj: typeof PROJECTS[0]; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="modal-title-label">// ARCHITECTURE.LOG — {proj.title}</div>
            <div className="modal-title" style={{ color: proj.color }}>{proj.subtitle}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="modal-section">SYSTEM_FLOW</div>
          <div className="modal-flow">
            {proj.arch.flow.map((step, i) => (
              <div key={i} className="mf-step">
                <span style={{ color: proj.color, flexShrink: 0, opacity: 0.7, width: 22 }}>[{i + 1}]</span>
                <span className="mf-text">{step}</span>
              </div>
            ))}
          </div>
          <div className="modal-section">TECH_STACK</div>
          <div className="modal-tags">
            {proj.arch.stack.map(t => (
              <span key={t} style={{ fontSize: 9, padding: "3px 9px", border: `1px solid ${proj.hexColor}44`, color: proj.color, fontFamily: "var(--mono)" }}>{t}</span>
            ))}
          </div>
          <div className="modal-section">KEY_METRICS</div>
          <div className="modal-metrics">
            {proj.arch.metrics.map(m => (
              <div key={m} className="mm">{m}</div>
            ))}
          </div>
          <button
            onClick={onClose}
            style={{ fontFamily: "var(--mono)", fontSize: 9, padding: "8px 18px", background: "transparent", border: `1px solid ${proj.hexColor}44`, color: proj.color, cursor: "pointer", letterSpacing: "0.1em" }}
          >
            [ CLOSE ]
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [modal, setModal] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <>
      <div className="pg-header">
        <div className="pg-eyebrow">work.log</div>
        <h1 className="pg-title">SHIPPED_PROJECTS</h1>
        <p className="pg-sub">Production-grade systems. Real performance. Real scale.</p>
      </div>

      {PROJECTS.map(proj => (
        <div key={proj.id} className={`proj-item ${proj.colorClass}`}>
          <div className="proj-inner">
            <div className="proj-index" style={{ color: `${proj.hexColor}22` }}>{proj.num}</div>
            <div className="proj-content">
              <div className="proj-top">
                <div>
                  <div className="proj-title" style={{ color: proj.color }}>{proj.title}</div>
                  <div className="proj-subtitle">{proj.subtitle}</div>
                </div>
                <div className="proj-stack-row">
                  {proj.stack.map(t => (
                    <span key={t} className="pst" style={{ borderColor: proj.stackBorder, color: proj.stackColor }}>{t}</span>
                  ))}
                </div>
              </div>
              <p className="proj-desc">{proj.desc}</p>
              <div className="proj-metrics">
                {proj.metrics.map(m => (
                  <div key={m.label} className="pm"><strong>{m.val}</strong> {m.label}</div>
                ))}
              </div>
              <div className="proj-acts">
                {proj.liveUrl && (
                  <a
                    className="pa pa-live"
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={proj.liveStyle}
                  >
                    {proj.liveLabel || "[ LIVE_DEMO ]"}
                  </a>
                )}
                <button className="pa pa-arch" onClick={() => setModal(proj)}>
                  [ ARCHITECTURE ]
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {modal && <Modal proj={modal} onClose={() => setModal(null)} />}
    </>
  );
}
