"use client";

import { useState } from "react";

const DETAIL: Record<string, { title: string; body: string }> = {
  ua: {
    title: "User A — browser client",
    body: "The React client maintains a local copy of the document. Every keystroke creates a delta operation (insert or delete at a position). The operation is sent immediately over WebSocket without waiting for server acknowledgment — this keeps the UI responsive. Local state is tentatively applied and reconciled when the server echoes the transformed version back.",
  },
  ub: {
    title: "User B — browser client",
    body: "Identical architecture to User A. Both clients are peers from the server's perspective — there is no primary editor. Each operates independently and the server is responsible for reconciling divergent states using Operational Transform.",
  },
  srv: {
    title: "Node.js server — Socket.io rooms",
    body: "Each document gets an isolated Socket.io room. The server is stateful per-room: it tracks the current document state and a sequence number representing the authoritative history. When two operations arrive in the same logical slot, the server detects the conflict and passes both to the OT engine before broadcasting.",
  },
  ot: {
    title: "Operational Transform engine",
    body: "The core algorithmic challenge. If User A inserts 'X' at position 5 while User B deletes position 3, User B's delete shifts everything left — now A's insert at position 5 is wrong; it should be position 4. OT transforms A's operation against B's before applying it. The result is applied to both clients, converging them to identical document state without either user seeing a conflict or losing a character.",
  },
  causal: {
    title: "Causal event ordering — vector clocks",
    body: "Events are timestamped with vector clocks (not wall-clock time) to establish causal order. If A's operation was based on document state v=3 and B's was also based on v=3, the server knows they're concurrent and both need transformation. If A's is based on v=4 (after seeing B's), it's not concurrent — just apply it directly. This eliminates page reloads when states diverge.",
  },
  redis: {
    title: "Redis pub/sub — multi-room relay",
    body: "When a server instance handles room A and a client in the same document connects to a different instance, Redis pub/sub relays events between instances. Every operation broadcast is published to a Redis channel keyed by document ID. This makes the server layer horizontally scalable — any instance can handle any client in any room.",
  },
};

const MODES = {
  normal: {
    label: "Two users typing — edits propagate normally",
    aEvt: "insert(A, pos=12)", bEvt: "insert(B, pos=8)",
    aOp: '+ "world!"', bOp: '+ "hey"',
    otText: "No conflict — apply directly",
    otSub: "positions aligned",
    otFill: "rgba(34,197,94,0.1)", otStroke: "rgba(34,197,94,0.35)",
    otTextColor: "#86efac", srvState: "Sequence: consistent",
  },
  conflict: {
    label: "Both users edit same position simultaneously",
    aEvt: "insert(A, pos=5)", bEvt: "delete(B, pos=5)",
    aOp: "insert at 5", bOp: "delete at 5",
    otText: "⚠ Concurrent conflict detected",
    otSub: "running transform()...",
    otFill: "rgba(244,63,94,0.1)", otStroke: "rgba(244,63,94,0.4)",
    otTextColor: "#fca5a5", srvState: "Conflict detected at v=3",
  },
  resolved: {
    label: "OT resolved — both clients converge identically",
    aEvt: "insert(A, pos=4)", bEvt: "delete(B, pos=5)",
    aOp: "✓ adjusted → 4", bOp: "✓ position held",
    otText: "transform() complete",
    otSub: "→ consistent on both clients",
    otFill: "rgba(34,197,94,0.1)", otStroke: "rgba(34,197,94,0.35)",
    otTextColor: "#86efac", srvState: "State converged — v=4",
  },
} as const;

type Mode = keyof typeof MODES;

export default function CollabDiagram() {
  const [mode, setMode] = useState<Mode>("normal");
  const [detail, setDetail] = useState<string | null>(null);
  const cfg = MODES[mode];

  const btnStyle = (m: Mode): React.CSSProperties => ({
    fontFamily: "var(--jet)",
    fontSize: 10,
    padding: "5px 14px",
    borderRadius: 4,
    cursor: "pointer",
    border: mode === m ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.1)",
    background: mode === m ? "rgba(99,102,241,0.15)" : "transparent",
    color: mode === m ? "var(--accent2)" : "var(--muted)",
    transition: "all 0.18s",
    letterSpacing: "0.05em",
  });

  return (
    <div style={{ paddingTop: 8 }}>
      <style>{`
        @keyframes cd-flow  { to { stroke-dashoffset: -28; } }
        @keyframes cd-flowr { to { stroke-dashoffset:  28; } }
        @keyframes cd-pulse { 0%,100%{r:14;opacity:.5} 50%{r:22;opacity:0} }
        @keyframes cd-fadein { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .cd-pipe  { stroke-dasharray:7 5; animation: cd-flow  1.2s linear infinite; }
        .cd-piper { stroke-dasharray:7 5; animation: cd-flowr 1.4s linear infinite; }
        .cd-slow  { stroke-dasharray:5 6; animation: cd-flow  2.2s linear infinite; }
        .cd-pulse-r { animation: cd-pulse 1.4s ease-out infinite; }
        .cd-pulse-r2{ animation: cd-pulse 1.4s ease-out .6s infinite; }
        .cd-block { cursor: pointer; }
        .cd-block rect { transition: opacity .15s; }
        .cd-block:hover rect { opacity: .82; }
      `}</style>

      {/* Scenario buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--jet)", fontSize: 11, color: "var(--text)", fontWeight: 700, marginRight: 4 }}>Scenario</span>
        <button style={btnStyle("normal")}   onClick={() => setMode("normal")}>Normal sync</button>
        <button style={btnStyle("conflict")} onClick={() => setMode("conflict")}>Concurrent conflict</button>
        <button style={btnStyle("resolved")} onClick={() => setMode("resolved")}>OT resolved ✓</button>
        <span style={{ fontFamily: "var(--jet)", fontSize: 10, color: "var(--muted)", marginLeft: 6 }}>{cfg.label}</span>
      </div>

      <svg width="100%" viewBox="0 0 680 450" style={{ display: "block" }}>
        <defs>
          <marker id="cd-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* BG */}
        <rect x="20" y="20" width="640" height="410" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

        {/* ── USER A ── */}
        <g className="cd-block" onClick={() => setDetail(detail === "ua" ? null : "ua")}>
          <rect x="36" y="40" width="140" height="90" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "var(--text)" }} x="106" y="62" textAnchor="middle">User A</text>
          <rect x="52" y="70" width="108" height="48" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "var(--muted)" }} x="62" y="86">hello world</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "#93c5fd", transition: "all 0.3s" }} x="62" y="102">{cfg.aOp}</text>
          <rect x="108" y="79" width="2" height="12" fill="#6366f1" style={{ animation: "cd-blink 1s step-end infinite" }} />
        </g>

        {/* ── USER B ── */}
        <g className="cd-block" onClick={() => setDetail(detail === "ub" ? null : "ub")}>
          <rect x="504" y="40" width="140" height="90" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "var(--text)" }} x="574" y="62" textAnchor="middle">User B</text>
          <rect x="520" y="70" width="108" height="48" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "var(--muted)" }} x="530" y="86">hello world</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "#fcd34d", transition: "all 0.3s" }} x="530" y="102">{cfg.bOp}</text>
          <rect x="574" y="79" width="2" height="12" fill="#f59e0b" style={{ animation: "cd-blink 1s step-end .4s infinite" }} />
        </g>

        {/* A → Server */}
        <line x1="176" y1="84" x2="252" y2="156" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#cd-arr)" className="cd-pipe" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "var(--muted)", transition: "all 0.3s" }}
          transform="rotate(-36,200,128)" x="200" y="128" textAnchor="middle">{cfg.aEvt}</text>

        {/* B → Server */}
        <line x1="504" y1="84" x2="428" y2="156" stroke="#f59e0b" strokeWidth="1.5" fill="none" markerEnd="url(#cd-arr)" className="cd-pipe" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "var(--muted)", transition: "all 0.3s" }}
          transform="rotate(36,478,128)" x="478" y="128" textAnchor="middle">{cfg.bEvt}</text>

        {/* Server → A (broadcast) */}
        <line x1="252" y1="196" x2="176" y2="118" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" fill="none" markerEnd="url(#cd-arr)" className="cd-slow" />
        {/* Server → B (broadcast) */}
        <line x1="428" y1="196" x2="504" y2="118" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" fill="none" markerEnd="url(#cd-arr)" className="cd-slow" />

        {/* ── SERVER ── */}
        <g className="cd-block" onClick={() => setDetail(detail === "srv" ? null : "srv")}>
          <rect x="244" y="158" width="192" height="64" rx="8" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#93c5fd" }} x="340" y="182" textAnchor="middle">Node.js server</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(147,197,253,0.7)", transition: "all 0.3s" }} x="340" y="200" textAnchor="middle">{cfg.srvState}</text>
        </g>
        {/* pulse */}
        <circle className="cd-pulse-r"  cx="340" cy="190" r="14" fill="none" stroke="rgba(59,130,246,0.35)" strokeWidth="1" />
        <circle className="cd-pulse-r2" cx="340" cy="190" r="14" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />

        {/* Server → OT */}
        <line x1="340" y1="222" x2="340" y2="258" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" markerEnd="url(#cd-arr)" />

        {/* ── OT ENGINE ── */}
        <g className="cd-block" onClick={() => setDetail(detail === "ot" ? null : "ot")}>
          <rect x="222" y="260" width="236" height="70" rx="8"
            fill={cfg.otFill} stroke={cfg.otStroke} strokeWidth="0.5"
            style={{ transition: "fill 0.35s, stroke 0.35s" }} />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: cfg.otTextColor, transition: "fill 0.3s" }} x="340" y="284" textAnchor="middle">Operational Transform</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: cfg.otTextColor, opacity: 0.8, transition: "all 0.3s" }} x="340" y="301" textAnchor="middle">{cfg.otText}</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: cfg.otTextColor, opacity: 0.7, transition: "all 0.3s" }} x="340" y="318" textAnchor="middle">{cfg.otSub}</text>
        </g>

        {/* OT → Causal */}
        <line x1="340" y1="330" x2="340" y2="356" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" markerEnd="url(#cd-arr)" />

        {/* ── CAUSAL ORDERING ── */}
        <g className="cd-block" onClick={() => setDetail(detail === "causal" ? null : "causal")}>
          <rect x="222" y="358" width="236" height="52" rx="8" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#fcd34d" }} x="340" y="380" textAnchor="middle">Causal event ordering</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(252,211,77,0.7)" }} x="340" y="397" textAnchor="middle">Vector clocks · no page reloads</text>
        </g>

        {/* ── REDIS pub/sub ── */}
        <g className="cd-block" onClick={() => setDetail(detail === "redis" ? null : "redis")}>
          <rect x="516" y="260" width="140" height="70" rx="8" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.25)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#93c5fd" }} x="586" y="284" textAnchor="middle">Redis</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(147,197,253,0.7)" }} x="586" y="301" textAnchor="middle">Pub / sub relay</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(147,197,253,0.7)" }} x="586" y="318" textAnchor="middle">multi-room</text>
        </g>
        <line x1="458" y1="295" x2="516" y2="295" stroke="rgba(59,130,246,0.5)" strokeWidth="1" fill="none" markerEnd="url(#cd-arr)" className="cd-pipe" />

        {/* latency badge */}
        <rect x="36" y="358" width="166" height="52" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "var(--muted)" }} x="119" y="378" textAnchor="middle">End-to-end latency</text>
        <text style={{ fontFamily: "var(--jet)", fontSize: 16, fontWeight: 700, fill: "var(--accent2)" }} x="119" y="400" textAnchor="middle">&lt; 200ms</text>
      </svg>

      {/* Detail panel */}
      {detail && DETAIL[detail] && (
        <div style={{ marginTop: 12, padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 13, animation: "cd-fadein .25s ease both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontWeight: 700, color: "var(--text)", fontFamily: "var(--jet)" }}>{DETAIL[detail].title}</span>
            <button onClick={() => setDetail(null)} style={{ fontFamily: "var(--mono)", fontSize: 10, padding: "3px 10px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "var(--muted)", cursor: "pointer" }}>close</button>
          </div>
          <p style={{ color: "var(--muted)", lineHeight: 1.75, margin: 0 }}>{DETAIL[detail].body}</p>
        </div>
      )}
    </div>
  );
}
