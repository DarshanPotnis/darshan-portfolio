"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  { t: 180,  txt: "Initializing DARSHAN_OS kernel...",                          cls: "" },
  { t: 380,  txt: "Loading memory modules: Redis · PostgreSQL · S3...",         cls: "" },
  { t: 580,  txt: "Mounting distributed systems framework...",                   cls: "" },
  { t: 780,  txt: "[OK] WebSocket server initialized",                           cls: "ok" },
  { t: 950,  txt: "[OK] FastAPI gateway online",                                 cls: "ok" },
  { t: 1100, txt: "[OK] Redis Streams pipeline: 50k req/min capacity",          cls: "ok" },
  { t: 1280, txt: "Checking USC M.S. Applied Data Science credentials...",      cls: "" },
  { t: 1480, txt: "[OK] Degree verified: Jan 2024 – Dec 2025",                 cls: "ok" },
  { t: 1650, txt: "Loading experience modules...",                               cls: "" },
  { t: 1820, txt: "[OK] 99 Yards: Redis pipeline, 45% latency reduction",      cls: "ok" },
  { t: 2000, txt: "[OK] Scienox Technologies: Flask/Redis, 40% faster APIs",   cls: "ok" },
  { t: 2180, txt: "[AWARD] USC FinTech Hackathon: 1st Place / 50+ teams",      cls: "award" },
  { t: 2360, txt: "Verifying availability status...",                            cls: "" },
  { t: 2520, txt: "[OK] OPEN_TO_WORK = TRUE // United States",                 cls: "ok" },
  { t: 2700, txt: "All systems operational. Starting portfolio UI...",           cls: "ok" },
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<{ txt: string; cls: string }[]>([]);
  const [progress, setProgress] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [status, setStatus] = useState("Initializing...");
  const [hiding, setHiding] = useState(false);
  const booted = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);

  const enter = () => {
    if (booted.current) return;
    booted.current = true;
    setHiding(true);
    setTimeout(onDone, 700);
  };

  useEffect(() => {
    BOOT_LINES.forEach((l, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, { txt: l.txt, cls: l.cls }]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
        setStatus(l.cls === "ok" ? "OK" : l.cls === "award" ? "AWARD" : "Loading...");
        logRef.current?.scrollTo({ top: 9999 });
      }, l.t);
    });
    setTimeout(() => setShowEnter(true), 2900);
    const auto = setTimeout(enter, 3800);
    return () => clearTimeout(auto);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") enter();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const today = new Date().toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div
      className={`boot-screen${hiding ? " hide" : ""}`}
      onClick={enter}
      style={{ cursor: "none" }}
    >
      {/* Header */}
      <div className="boot-header">
        <div className="boot-bios">
          DARSHAN_OS BIOS v<span>2.0.25</span> — Distributed Systems Edition
        </div>
        <div className="boot-copy">Copyright (C) 2025, Darshan Potnis. All Rights Reserved.</div>
        <div className="boot-line">
          <span>Backend Software Engineer</span>
          <span>USC M.S. Applied Data Science</span>
          <span>{today}</span>
        </div>
      </div>

      {/* System specs */}
      <div className="boot-cols">
        <div className="boot-col">
          <div className="bc-title">DEVELOPER INFO</div>
          <div className="bc-row"><span>Name</span><span className="bc-val">Darshan Potnis</span></div>
          <div className="bc-row"><span>Type</span><span className="bc-val">Backend SDE</span></div>
          <div className="bc-row"><span>Location</span><span className="bc-val">United States</span></div>
          <div className="bc-row"><span>Status</span><span className="bc-val">OPEN_TO_WORK</span></div>
        </div>
        <div className="boot-col">
          <div className="bc-title">SYSTEM SPECS</div>
          <div className="bc-row"><span>Primary Lang</span><span className="bc-val">Python / JS</span></div>
          <div className="bc-row"><span>Infra</span><span className="bc-val">AWS EC2 / K8s</span></div>
          <div className="bc-row"><span>Cache Layer</span><span className="bc-val">Redis Streams</span></div>
          <div className="bc-row"><span>Uptime SLA</span><span className="bc-val">99.9%</span></div>
        </div>
        <div className="boot-col">
          <div className="bc-title">PERFORMANCE</div>
          <div className="bc-row"><span>API Latency ↓</span><span className="bc-val">45%</span></div>
          <div className="bc-row"><span>Throughput</span><span className="bc-val">50k req/min</span></div>
          <div className="bc-row"><span>Projects</span><span className="bc-val">3 shipped</span></div>
          <div className="bc-row"><span>Hackathon</span><span className="bc-val">1st Place 🏆</span></div>
        </div>
      </div>

      {/* Boot log */}
      <div className="boot-log" ref={logRef}>
        {lines.map((l, i) => (
          <div key={i} className="blog-line">
            {l.cls === "ok" && (
              <span>
                <span className="ok-green">[OK]</span>
                {l.txt.replace("[OK]", "")}
              </span>
            )}
            {l.cls === "award" && (
              <span>
                <span className="ok-amber">[AWARD]</span>
                {l.txt.replace("[AWARD]", "")}
              </span>
            )}
            {l.cls === "" && <span>{l.txt}</span>}
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="boot-progress">
        <div className="boot-bar" style={{ width: `${progress}%` }} />
      </div>

      {showEnter && (
        <div className="press-enter">
          Press <strong>[ENTER]</strong> to continue or wait...
        </div>
      )}

      <div className="boot-footer">
        <span>ESC: Skip</span>
        <span>{status}</span>
        <span>DEL: SETUP</span>
      </div>
    </div>
  );
}
