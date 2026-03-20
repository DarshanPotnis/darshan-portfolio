"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  { t: 150,  txt: "Initializing DARSHAN_OS kernel...",                          cls: "" },
  { t: 320,  txt: "Loading memory modules: Redis · PostgreSQL · AWS S3...",     cls: "" },
  { t: 490,  txt: "Mounting distributed systems framework...",                   cls: "" },
  { t: 650,  txt: "[OK] FastAPI microservices online — AWS Fargate",            cls: "ok" },
  { t: 800,  txt: "[OK] Redis Streams pipeline initialized",                    cls: "ok" },
  { t: 940,  txt: "[OK] CI/CD pipelines — GitHub Actions + Terraform",         cls: "ok" },
  { t: 1080, txt: "Checking USC M.S. Applied Data Science credentials...",      cls: "" },
  { t: 1220, txt: "[OK] Degree verified: Jan 2024 – Dec 2025",                  cls: "ok" },
  { t: 1360, txt: "Loading experience modules...",                               cls: "" },
  { t: 1490, txt: "[OK] 99 Yards: 45% API latency ↓ · 60% deploy time ↓",     cls: "ok" },
  { t: 1620, txt: "[OK] Scienox Technologies: 40% faster APIs · 99.4% reliability", cls: "ok" },
  { t: 1750, txt: "[AWARD] USC FinTech Hackathon: 1st Place / 50+ teams",      cls: "award" },
  { t: 1880, txt: "Verifying availability status...",                            cls: "" },
  { t: 1980, txt: "[OK] OPEN_TO_WORK = TRUE // United States",                  cls: "ok" },
  { t: 2080, txt: "All systems operational. Starting portfolio...",              cls: "ok" },
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
    setTimeout(onDone, 500);
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
    setTimeout(() => setShowEnter(true), 2100);
    const auto = setTimeout(enter, 2800);
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

      <div className="boot-cols">
        <div className="boot-col">
          <div className="bc-title">DEVELOPER INFO</div>
          <div className="bc-row"><span>Name</span><span className="bc-val">Darshan Potnis</span></div>
          <div className="bc-row"><span>Role</span><span className="bc-val">Backend SDE</span></div>
          <div className="bc-row"><span>Location</span><span className="bc-val">United States</span></div>
          <div className="bc-row"><span>Status</span><span className="bc-val">OPEN_TO_WORK</span></div>
        </div>
        <div className="boot-col">
          <div className="bc-title">SYSTEM SPECS</div>
          <div className="bc-row"><span>Languages</span><span className="bc-val">Python · JS · TS</span></div>
          <div className="bc-row"><span>Infra</span><span className="bc-val">AWS Fargate · EC2</span></div>
          <div className="bc-row"><span>Cache Layer</span><span className="bc-val">Redis Streams</span></div>
          <div className="bc-row"><span>DevOps</span><span className="bc-val">Terraform · CI/CD</span></div>
        </div>
        <div className="boot-col">
          <div className="bc-title">PERFORMANCE</div>
          <div className="bc-row"><span>API Latency ↓</span><span className="bc-val">45%</span></div>
          <div className="bc-row"><span>Deploy Time ↓</span><span className="bc-val">60%</span></div>
          <div className="bc-row"><span>Projects</span><span className="bc-val">3 shipped</span></div>
          <div className="bc-row"><span>Hackathon</span><span className="bc-val">1st Place 🏆</span></div>
        </div>
      </div>

      <div className="boot-log" ref={logRef}>
        {lines.map((l, i) => (
          <div key={i} className="blog-line">
            {l.cls === "ok" && (
              <span><span className="ok-green">[OK]</span>{l.txt.replace("[OK]", "")}</span>
            )}
            {l.cls === "award" && (
              <span><span className="ok-amber">[AWARD]</span>{l.txt.replace("[AWARD]", "")}</span>
            )}
            {l.cls === "" && <span>{l.txt}</span>}
          </div>
        ))}
      </div>

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
        <span>Click anywhere to continue</span>
      </div>
    </div>
  );
}
