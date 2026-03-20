"use client";

import { useEffect, useRef, useState } from "react";

const DETAIL: Record<string, { title: string; body: string }> = {
  gw: {
    title: "FastAPI Gateway",
    body: "Every request hits the gateway first. The API key is extracted from the Authorization header and looked up in Redis in under 1ms. If the key is unknown, the request is rejected immediately — no downstream services touched. This keeps the hot path extremely fast.",
  },
  redis: {
    title: "Redis Token Bucket (Lua script)",
    body: "The rate limiter uses a Lua script executed atomically in Redis. A single script: (1) fetch the current counter for this API key, (2) check against the tier limit, (3) decrement if allowed — all in one round trip. This eliminates the race conditions that plague application-layer counters under concurrent load. Under 1ms at 1,000+ RPS.",
  },
  up: {
    title: "Upstream service — 3 Docker instances",
    body: "Three horizontally scaled FastAPI instances sit behind the gateway. Rate limiting happens before routing so the upstream never sees more traffic than it can handle. Each instance is stateless — all rate state lives in Redis, not the application layer.",
  },
  "429": {
    title: "HTTP 429 — Too Many Requests",
    body: "When a client exceeds quota, the gateway returns 429 with a Retry-After header indicating exactly when the token bucket refills. Validated with 500 concurrent clients in load testing — zero quota bypasses and under 2% false-positive rate on legitimate traffic.",
  },
  dash: {
    title: "Live monitoring dashboard",
    body: "A WebSocket stream pushes per-client counter updates in real time. Shows live RPS, current token counts per key, TTL until bucket refills, and tier simulation to preview how quota changes would affect specific clients. Pure push — no polling.",
  },
};

export default function GatewayDiagram() {
  const [rps, setRps] = useState(2);
  const [detail, setDetail] = useState<string | null>(null);
  const barTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [bars, setBars] = useState([20, 14, 22, 18, 20]);

  useEffect(() => {
    barTimerRef.current = setInterval(() => {
      setBars([...Array(5)].map(() => 10 + Math.round(Math.random() * 16)));
    }, 900);
    return () => { if (barTimerRef.current) clearInterval(barTimerRef.current); };
  }, []);

  const configs = [
    { label: "200 RPS",   text: "Low traffic",          pipeDur: "2s",   showRed: false, decFill: "#FAEEDA", loadFill: "#EAF3DE", loadStroke: "#3B6D11", loadText: "✓" },
    { label: "1,000 RPS", text: "Normal traffic",        pipeDur: "1s",   showRed: false, decFill: "#FAEEDA", loadFill: "#E6F1FB", loadStroke: "#185FA5", loadText: "OK" },
    { label: "1,200 RPS", text: "Rate limiting active",  pipeDur: "0.5s", showRed: true,  decFill: "#F7C1C1", loadFill: "#FCEBEB", loadStroke: "#A32D2D", loadText: "429" },
  ];
  const cfg = configs[rps - 1];

  const pipeStyle = (color: string): React.CSSProperties => ({
    strokeDasharray: "7 5",
    animation: `gw-flow ${cfg.pipeDur} linear infinite`,
  });

  return (
    <div style={{ paddingTop: 8 }}>
      <style>{`
        @keyframes gw-flow { to { stroke-dashoffset: -28; } }
        @keyframes gw-pulse { 0%,100%{r:16;opacity:.5} 50%{r:24;opacity:0} }
        .gw-pipe { stroke-dasharray:7 5; animation: gw-flow var(--dur,1s) linear infinite; }
        .gw-slow { stroke-dasharray:6 6; animation: gw-flow 2s linear infinite; }
        .gw-red  { stroke-dasharray:5 5; animation: gw-flow .6s linear infinite; }
        .gw-block { cursor: pointer; }
        .gw-block rect, .gw-block polygon { transition: opacity .15s; }
        .gw-block:hover rect, .gw-block:hover polygon { opacity: .85; }
        .gw-pulse-ring { animation: gw-pulse 1.5s ease-out infinite; }
        .gw-pulse-ring2 { animation: gw-pulse 1.5s ease-out .6s infinite; }
      `}</style>

      {/* Load slider */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, fontSize: 13, color: "var(--muted)", fontFamily: "var(--jet)" }}>
        <span style={{ color: "var(--text)", fontWeight: 500 }}>Simulate load</span>
        <span>Low</span>
        <input type="range" min={1} max={3} value={rps} step={1}
          onChange={e => setRps(parseInt(e.target.value))}
          style={{ flex: 1, accentColor: "var(--accent)" }} />
        <span>Spike</span>
        <span style={{ minWidth: 80, textAlign: "right", color: "var(--text)", fontWeight: 700 }}>{cfg.label}</span>
      </div>

      <svg width="100%" viewBox="0 0 680 460" style={{ display: "block" }}>
        <defs>
          <marker id="gw-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* BG */}
        <rect x="20" y="20" width="640" height="420" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

        {/* CLIENTS */}
        <g className="gw-block" onClick={() => setDetail(detail === "clients" ? null : "clients")}>
          <rect x="36" y="42" width="128" height="80" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 11, fill: "var(--muted)" }} x="100" y="62" textAnchor="middle">Clients</text>
          {[72, 100, 128].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy={96} r={11} fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.3)" strokeWidth="0.5" />
              <text style={{ fontFamily: "var(--jet)", fontSize: 11, fill: "var(--accent2)" }} x={cx} y={100} textAnchor="middle">C</text>
            </g>
          ))}
        </g>

        {/* Client → Gateway pipe */}
        <line x1="164" y1="82" x2="218" y2="82" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#gw-arr)" className="gw-pipe" style={{ "--dur": cfg.pipeDur } as React.CSSProperties} />

        {/* GATEWAY */}
        <g className="gw-block" onClick={() => setDetail(detail === "gw" ? null : "gw")}>
          <rect x="220" y="52" width="160" height="60" rx="8" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.35)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#93c5fd" }} x="300" y="75" textAnchor="middle">FastAPI Gateway</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(147,197,253,0.7)" }} x="300" y="93" textAnchor="middle">API key validation</text>
        </g>
        {/* pulse rings on gateway */}
        <circle className="gw-pulse-ring"  cx="300" cy="82" r="16" fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="1" />
        <circle className="gw-pulse-ring2" cx="300" cy="82" r="16" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />

        {/* Gateway → Redis */}
        <path d="M380 82 L436 82 L436 140" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#gw-arr)" className="gw-pipe" style={{ "--dur": cfg.pipeDur } as React.CSSProperties} />

        {/* REDIS */}
        <g className="gw-block" onClick={() => setDetail(detail === "redis" ? null : "redis")}>
          <rect x="374" y="120" width="180" height="68" rx="8" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#86efac" }} x="464" y="146" textAnchor="middle">Redis Token Bucket</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(134,239,172,0.7)" }} x="464" y="163" textAnchor="middle">Lua script — atomic check</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(134,239,172,0.7)" }} x="464" y="178" textAnchor="middle">+ decrement per key</text>
        </g>

        {/* Redis → Decision */}
        <line x1="464" y1="188" x2="464" y2="212" stroke="rgba(34,197,94,0.6)" strokeWidth="1.5" fill="none" markerEnd="url(#gw-arr)" />

        {/* DECISION diamond */}
        <polygon points="464,214 514,244 464,274 414,244" fill={cfg.decFill} stroke="rgba(245,158,11,0.5)" strokeWidth="0.5" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "#633806" }} x="464" y="240" textAnchor="middle">Quota</text>
        <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "#633806" }} x="464" y="256" textAnchor="middle">OK?</text>

        {/* YES → upstream */}
        <line x1="414" y1="244" x2="316" y2="244" stroke="rgba(34,197,94,0.7)" strokeWidth="1.5" fill="none" markerEnd="url(#gw-arr)" className="gw-pipe" style={{ "--dur": cfg.pipeDur } as React.CSSProperties} />
        <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(134,239,172,0.8)" }} x="362" y="238" textAnchor="middle">yes</text>

        {/* UPSTREAM */}
        <g className="gw-block" onClick={() => setDetail(detail === "up" ? null : "up")}>
          <rect x="164" y="214" width="152" height="58" rx="8" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#93c5fd" }} x="240" y="239" textAnchor="middle">Upstream service</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(147,197,253,0.7)" }} x="240" y="257" textAnchor="middle">3 Docker instances</text>
        </g>

        {/* Response back */}
        <path d="M240 272 L240 350 L96 350 L96 122" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" fill="none" markerEnd="url(#gw-arr)" className="gw-slow" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "var(--muted)" }} x="152" y="335" textAnchor="middle">200 OK</text>

        {/* NO → 429 */}
        {cfg.showRed && (
          <>
            <line x1="514" y1="244" x2="578" y2="244" stroke="rgba(244,63,94,0.8)" strokeWidth="1.5" fill="none" markerEnd="url(#gw-arr)" className="gw-red" />
            <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(244,63,94,0.8)" }} x="548" y="238" textAnchor="middle">no</text>
          </>
        )}
        <g className="gw-block" onClick={() => setDetail(detail === "429" ? null : "429")} style={{ opacity: cfg.showRed ? 1 : 0.25, transition: "opacity 0.4s" }}>
          <rect x="540" y="216" width="116" height="56" rx="8" fill="rgba(244,63,94,0.1)" stroke="rgba(244,63,94,0.35)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#fca5a5" }} x="598" y="239" textAnchor="middle">HTTP 429</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(252,165,165,0.7)" }} x="598" y="257" textAnchor="middle">Retry-After header</text>
        </g>

        {/* DASHBOARD */}
        <g className="gw-block" onClick={() => setDetail(detail === "dash" ? null : "dash")}>
          <rect x="36" y="370" width="608" height="64" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "var(--text)" }} x="340" y="392" textAnchor="middle">Live monitoring dashboard</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "var(--muted)" }} x="340" y="408" textAnchor="middle">WebSocket stream · per-client counters · TTL resets · tier simulation</text>
          {/* mini bars */}
          {bars.map((h, i) => (
            <rect key={i} x={60 + i * 16} y={426 - h} width={8} height={h} rx={2}
              fill={i === 3 && cfg.showRed ? "rgba(244,63,94,0.7)" : "rgba(99,102,241,0.5)"}
              style={{ transition: "height 0.5s, y 0.5s" }} />
          ))}
        </g>

        {/* dashed lines to dashboard */}
        <path d="M598 272 L598 356 L340 356 L340 370" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" markerEnd="url(#gw-arr)" strokeDasharray="4 3" />
        <path d="M240 272 L240 356" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" strokeDasharray="4 3" />

        {/* Load indicator */}
        <circle cx="96" cy="160" r="24" fill={cfg.loadFill} stroke={cfg.loadStroke} strokeWidth="0.5" style={{ transition: "fill 0.3s" }} />
        <text style={{ fontFamily: "var(--jet)", fontSize: 11, fontWeight: 500, fill: cfg.loadStroke, transition: "fill 0.3s" }} x="96" y="165" textAnchor="middle">{cfg.loadText}</text>
        <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "var(--muted)" }} x="96" y="200" textAnchor="middle">{cfg.text}</text>
      </svg>

      {/* Detail panel */}
      {detail && DETAIL[detail] && (
        <div style={{ marginTop: 12, padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 13, animation: "gw-fadein .25s ease both" }}>
          <style>{`@keyframes gw-fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
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
