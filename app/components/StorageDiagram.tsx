"use client";

import { useRef, useState } from "react";

const DETAIL: Record<string, { title: string; body: string }> = {
  client: {
    title: "Browser client — chunked file upload",
    body: "The client splits the file into chunks (typically 5–10MB each). Each chunk gets its own SHA-256 hash computed client-side before upload. The chunk manifest tracks which chunks landed. On a network failure, the client queries PostgreSQL for confirmed chunks and resumes from chunk N+1 — the user never restarts a 500MB upload from zero.",
  },
  app: {
    title: "Node.js app server — RBAC and pre-signing",
    body: "The server never touches file bytes. Its role: (1) verify the JWT and check RBAC permissions for this file path, (2) request a pre-signed URL from S3 with a short TTL (15 minutes), (3) return that URL to the client. PostgreSQL metadata indexing keeps RBAC queries under 20ms regardless of user or file count.",
  },
  s3: {
    title: "AWS S3 — direct object storage",
    body: "S3 receives chunks directly from the browser over HTTPS using the pre-signed URL. No application server sits in the middle. This is the key architectural decision — it saves ~65% of server bandwidth compared to proxying uploads through the app. S3 handles the bytes; the app handles the metadata.",
  },
  sha: {
    title: "SHA-256 integrity validation",
    body: "After each chunk lands in S3, the app server computes the SHA-256 hash of what S3 received and compares it to the hash the client sent. A mismatch means the chunk was corrupted in transit — the client re-uploads that specific chunk only, not the whole file. The final file is only committed when every chunk passes.",
  },
  pg: {
    title: "PostgreSQL — chunk manifest and RBAC",
    body: "PostgreSQL stores: the chunk manifest (file ID, chunk number, S3 key, SHA-256 hash, upload status), file metadata (owner, permissions), and RBAC rules. The manifest is what makes resumability possible — it's the source of truth for which chunks are confirmed and which still need uploading.",
  },
  resume: {
    title: "Resumable upload on network failure",
    body: "When a network drop interrupts a 500MB upload halfway, naive solutions restart from zero. Instead: the client queries the chunk manifest, gets the confirmed list, and starts from chunk N+1. SHA-256 per-chunk validation means partial chunks are never silently accepted. Upload failure retries dropped by ~70%.",
  },
};

export default function StorageDiagram() {
  const [detail, setDetail] = useState<string | null>(null);
  const [progW, setProgW] = useState(0);
  const [progColor, setProgColor] = useState("rgba(59,130,246,0.7)");
  const [progText, setProgText] = useState("");
  const [simStatus, setSimStatus] = useState("");
  const [commitFill, setCommitFill] = useState("rgba(34,197,94,0.1)");
  const [commitStroke, setCommitStroke] = useState("rgba(34,197,94,0.35)");
  const [commitText, setCommitText] = useState("Atomic commit");
  const [commitSub, setCommitSub] = useState("All chunks verified → file ready");
  const rafRef = useRef<number | null>(null);

  const runUpload = (withFailure: boolean) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setCommitFill("rgba(34,197,94,0.1)");
    setCommitStroke("rgba(34,197,94,0.35)");
    setCommitText("Atomic commit");
    setCommitSub("All chunks verified → file ready");
    setProgColor("rgba(59,130,246,0.7)");
    setSimStatus("Uploading...");
    let w = 0;
    let failed = false;

    const step = () => {
      const speed = withFailure && !failed ? 1.2 : 1.8;
      w += speed;
      if (withFailure && !failed && w >= 52) {
        failed = true;
        setProgColor("rgba(244,63,94,0.8)");
        setProgW(52);
        setProgText("52% — FAILED");
        setSimStatus("Network dropped at 52% — resuming from chunk 5...");
        setTimeout(() => {
          setProgColor("rgba(59,130,246,0.7)");
          setSimStatus("Resumed. Uploading remaining chunks...");
          const resume = () => {
            w += 1.4;
            setProgW(Math.min(w, 100));
            setProgText(Math.round(Math.min(w, 100)) + "%");
            if (w < 100) { rafRef.current = requestAnimationFrame(resume); }
            else { finish(true); }
          };
          rafRef.current = requestAnimationFrame(resume);
        }, 1400);
        return;
      }
      setProgW(Math.min(w, 100));
      setProgText(Math.round(Math.min(w, 100)) + "%");
      if (w < 100) { rafRef.current = requestAnimationFrame(step); }
      else { finish(false); }
    };
    rafRef.current = requestAnimationFrame(step);

    const finish = (wasFailure: boolean) => {
      setSimStatus(wasFailure ? "✓ Resumed — 0 bytes re-uploaded from chunks 1–5" : "✓ Upload complete — all chunks verified");
      setCommitFill("rgba(34,197,94,0.2)");
      setCommitStroke("rgba(34,197,94,0.6)");
      setCommitText("✓ Committed");
      setCommitSub("SHA-256 ✓ · manifest atomic");
    };
  };

  return (
    <div style={{ paddingTop: 8 }}>
      <style>{`
        @keyframes sd-flow  { to { stroke-dashoffset: -28; } }
        @keyframes sd-fadein{ from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .sd-pipe { stroke-dasharray:7 5; animation: sd-flow 1.3s linear infinite; }
        .sd-fast { stroke-dasharray:8 4; animation: sd-flow  .8s linear infinite; }
        .sd-slow { stroke-dasharray:6 6; animation: sd-flow  2s  linear infinite; }
        .sd-block { cursor: pointer; }
        .sd-block rect { transition: opacity .15s; }
        .sd-block:hover rect { opacity: .82; }
      `}</style>

      {/* Simulate buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--jet)", fontSize: 11, color: "var(--text)", fontWeight: 700, marginRight: 4 }}>Simulate</span>
        <button onClick={() => runUpload(false)}
          style={{ fontFamily: "var(--jet)", fontSize: 10, padding: "5px 14px", borderRadius: 4, cursor: "pointer", border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: "var(--muted)", letterSpacing: "0.05em" }}>
          Normal upload
        </button>
        <button onClick={() => runUpload(true)}
          style={{ fontFamily: "var(--jet)", fontSize: 10, padding: "5px 14px", borderRadius: 4, cursor: "pointer", border: "1px solid rgba(244,63,94,0.4)", background: "rgba(244,63,94,0.08)", color: "#fca5a5", letterSpacing: "0.05em" }}>
          Mid-upload failure → resume
        </button>
        {simStatus && <span style={{ fontFamily: "var(--jet)", fontSize: 10, color: "var(--muted)" }}>{simStatus}</span>}
      </div>

      <svg width="100%" viewBox="0 0 680 460" style={{ display: "block" }}>
        <defs>
          <marker id="sd-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* BG */}
        <rect x="20" y="20" width="640" height="420" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

        {/* ── CLIENT ── */}
        <g className="sd-block" onClick={() => setDetail(detail === "client" ? null : "client")}>
          <rect x="36" y="42" width="140" height="88" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "var(--text)" }} x="106" y="64" textAnchor="middle">Browser client</text>
          {/* Chunk visuals */}
          {["C1", "C2", "C3"].map((label, i) => (
            <g key={label}>
              <rect x={52 + i * 36} y={72} width={30} height={20} rx={3} fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.4)" strokeWidth="0.5" />
              <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "#93c5fd" }} x={67 + i * 36} y={86} textAnchor="middle">{label}</text>
            </g>
          ))}
          <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "var(--muted)" }} x="106" y="110" textAnchor="middle">500MB chunked</text>
        </g>

        {/* 1: client → app (auth) */}
        <line x1="176" y1="72" x2="256" y2="72" stroke="#6366f1" strokeWidth="1.5" fill="none" markerEnd="url(#sd-arr)" className="sd-pipe" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "var(--muted)" }} x="216" y="65" textAnchor="middle">① Auth + JWT</text>

        {/* ── APP SERVER ── */}
        <g className="sd-block" onClick={() => setDetail(detail === "app" ? null : "app")}>
          <rect x="258" y="44" width="162" height="56" rx="8" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#93c5fd" }} x="339" y="67" textAnchor="middle">Node.js server</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(147,197,253,0.7)" }} x="339" y="85" textAnchor="middle">RBAC · pre-sign URL</text>
        </g>

        {/* 2: server → S3 presign request */}
        <line x1="420" y1="72" x2="500" y2="72" stroke="rgba(34,197,94,0.6)" strokeWidth="1.5" fill="none" markerEnd="url(#sd-arr)" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "var(--muted)" }} x="460" y="65" textAnchor="middle">② pre-sign req</text>

        {/* ── AWS S3 ── */}
        <g className="sd-block" onClick={() => setDetail(detail === "s3" ? null : "s3")}>
          <rect x="502" y="44" width="154" height="56" rx="8" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#86efac" }} x="579" y="67" textAnchor="middle">AWS S3</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(134,239,172,0.7)" }} x="579" y="85" textAnchor="middle">Object storage</text>
        </g>

        {/* 3: pre-signed URL back to client */}
        <path d="M502 87 L438 87 L438 106 L176 106" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" fill="none" markerEnd="url(#sd-arr)" className="sd-slow" strokeDasharray="5 5" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "rgba(134,239,172,0.7)" }} x="339" y="100" textAnchor="middle">③ pre-signed URL (15-min TTL)</text>

        {/* 4: direct upload to S3 — the key architecture */}
        <path d="M176 55 L176 36 L502 36" stroke="rgba(59,130,246,0.6)" strokeWidth="2" fill="none" markerEnd="url(#sd-arr)" className="sd-fast" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 9, fill: "#93c5fd", fontWeight: 500 }} x="339" y="30" textAnchor="middle">④ chunks upload directly to S3 — server never sees bytes</text>

        {/* Bandwidth badge */}
        <rect x="36" y="156" width="162" height="50" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "var(--muted)" }} x="117" y="176" textAnchor="middle">Bandwidth saved</text>
        <text style={{ fontFamily: "var(--jet)", fontSize: 18, fontWeight: 700, fill: "var(--accent2)" }} x="117" y="198" textAnchor="middle">~65%</text>

        {/* Progress bar */}
        <rect x="36" y="222" width="608" height="52" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "var(--muted)" }} x="340" y="240" textAnchor="middle">Upload progress</text>
        <rect x="52" y="246" width="576" height="14" rx="4" fill="rgba(255,255,255,0.05)" />
        <rect x="52" y="246" width={Math.round(progW / 100 * 576)} height="14" rx="4" fill={progColor} style={{ transition: "width 0.05s linear, fill 0.3s" }} />
        {progText && <text style={{ fontFamily: "var(--jet)", fontSize: 9, fontWeight: 700, fill: "white" }} x="340" y="258" textAnchor="middle">{progText}</text>}

        {/* ── SHA-256 ── */}
        <g className="sd-block" onClick={() => setDetail(detail === "sha" ? null : "sha")}>
          <rect x="222" y="294" width="236" height="52" rx="8" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#fcd34d" }} x="340" y="316" textAnchor="middle">SHA-256 integrity check</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(252,211,77,0.7)" }} x="340" y="334" textAnchor="middle">Per-chunk hash verified post-upload</text>
        </g>

        {/* ── POSTGRESQL ── */}
        <g className="sd-block" onClick={() => setDetail(detail === "pg" ? null : "pg")}>
          <rect x="36" y="294" width="168" height="52" rx="8" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#93c5fd" }} x="120" y="316" textAnchor="middle">PostgreSQL</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(147,197,253,0.7)" }} x="120" y="334" textAnchor="middle">Chunk manifest · RBAC</text>
        </g>
        <line x1="222" y1="320" x2="204" y2="320" stroke="rgba(59,130,246,0.5)" strokeWidth="1" fill="none" markerEnd="url(#sd-arr)" className="sd-pipe" />

        {/* ── RESUME ── */}
        <g className="sd-block" onClick={() => setDetail(detail === "resume" ? null : "resume")}>
          <rect x="474" y="294" width="182" height="52" rx="8" fill="rgba(244,63,94,0.1)" stroke="rgba(244,63,94,0.3)" strokeWidth="0.5" />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#fca5a5" }} x="565" y="316" textAnchor="middle">Network drop?</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(252,165,165,0.7)" }} x="565" y="334" textAnchor="middle">Resume from last chunk</text>
        </g>
        <line x1="458" y1="320" x2="474" y2="320" stroke="rgba(244,63,94,0.5)" strokeWidth="1" fill="none" markerEnd="url(#sd-arr)" />

        {/* Retry badge */}
        <rect x="474" y="366" width="182" height="50" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "var(--muted)" }} x="565" y="386" textAnchor="middle">Upload failure retries ↓</text>
        <text style={{ fontFamily: "var(--jet)", fontSize: 18, fontWeight: 700, fill: "var(--green)" }} x="565" y="408" textAnchor="middle">~70%</text>

        {/* ── COMMIT ── */}
        <g className="sd-block" onClick={() => setDetail(detail === "pg" ? null : "pg")}>
          <rect x="222" y="366" width="236" height="50" rx="8" fill={commitFill} stroke={commitStroke} strokeWidth="0.5" style={{ transition: "fill 0.4s, stroke 0.4s" }} />
          <text style={{ fontFamily: "var(--jet)", fontSize: 12, fontWeight: 500, fill: "#86efac", transition: "all 0.3s" }} x="340" y="387" textAnchor="middle">{commitText}</text>
          <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "rgba(134,239,172,0.7)", transition: "all 0.3s" }} x="340" y="404" textAnchor="middle">{commitSub}</text>
        </g>

        {/* Query latency badge */}
        <rect x="36" y="366" width="168" height="50" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text style={{ fontFamily: "var(--jet)", fontSize: 10, fill: "var(--muted)" }} x="120" y="386" textAnchor="middle">RBAC query response</text>
        <text style={{ fontFamily: "var(--jet)", fontSize: 18, fontWeight: 700, fill: "var(--amber)" }} x="120" y="408" textAnchor="middle">&lt; 20ms</text>
      </svg>

      {/* Detail panel */}
      {detail && DETAIL[detail] && (
        <div style={{ marginTop: 12, padding: "14px 18px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 13, animation: "sd-fadein .25s ease both" }}>
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
