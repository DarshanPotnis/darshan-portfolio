"use client";

import { useState } from "react";

// Just the ID from your Formspree URL — not the full URL
const FORMSPREE_ID = "mojknkwz";

type FormState = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setState("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setState("sent"); setForm({ name: "", email: "", message: "" }); }
      else setState("error");
    } catch { setState("error"); }
  };

  return (
    <>
      <div className="pg-header">
        <div className="pg-eyebrow">contact.ini</div>
        <h1 className="pg-title">GET_IN_TOUCH</h1>
        <p className="pg-sub">Open to full-time SWE roles across the United States. Let's build something great.</p>
      </div>

      <div className="avail-banner">
        <span className="avail-dot" />
        OPEN_TO_WORK = TRUE &nbsp;·&nbsp; LOCATION = UNITED_STATES &nbsp;·&nbsp; GRAD = DEC_2025 &nbsp;·&nbsp; ROLE = BACKEND_SWE
      </div>

      <div className="contact-layout">
        <div>
          <div className="cl-list">
            {([
              { key: "EMAIL",    val: "potnisd@usc.edu",               href: "mailto:potnisd@usc.edu",                color: "var(--green)" },
              { key: "GITHUB",   val: "github.com/DarshanPotnis",      href: "https://github.com/DarshanPotnis",      color: "var(--cyan)"  },
              { key: "LINKEDIN", val: "linkedin.com/in/darshanpotnis", href: "https://linkedin.com/in/darshanpotnis", color: "var(--amber)" },
              { key: "RESUME",   val: "Darshan_Potnis_Resume_2026.pdf",href: "/Darshan_Potnis_Resume_2026.pdf",        color: "var(--muted)" },
            ] as const).map(link => (
              <a key={link.key} className="cl-item" href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                <div>
                  <div className="cl-key" style={{ color: link.color }}>{link.key}</div>
                  <div style={{ fontSize: 15 }}>{link.val}</div>
                </div>
                <span className="cl-arrow">→</span>
              </a>
            ))}
          </div>

          <div className="status-table">
            <div className="st-header">CURRENT_STATUS.SYS</div>
            <div className="st-row"><span className="st-k">LOCATION</span><span className="st-v">Los Angeles → United States</span></div>
            <div className="st-row"><span className="st-k">LOOKING_FOR</span><span className="st-v">Backend / Full-Stack SWE</span></div>
            <div className="st-row"><span className="st-k">WORK_AUTH</span><span className="st-v-amber">OPT / CPT eligible</span></div>
            <div className="st-row"><span className="st-k">GRADUATION</span><span className="st-v">Dec 2025</span></div>
            <div className="st-row"><span className="st-k">START_DATE</span><span className="st-v">Immediately / Dec 2025</span></div>
          </div>
        </div>

        <div className="form-panel">
          <div className="form-head">SEND_MESSAGE.EXE</div>
          <div className="form-body">
            {state === "sent" ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 16, color: "var(--green)" }}>✓</div>
                <div style={{ color: "var(--green)", fontFamily: "var(--mono)", fontSize: 16, letterSpacing: "0.08em", marginBottom: 8 }}>
                  MESSAGE_SENT = TRUE
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>I'll respond within 24 hours.</div>
                <button onClick={() => setState("idle")} className="cta-ghost" style={{ marginTop: 20, fontSize: 12 }}>
                  [ SEND_ANOTHER ]
                </button>
              </div>
            ) : (
              <>
                <label className="f-label">NAME</label>
                <input className="f-input" placeholder="Your name" value={form.name} onChange={e => update("name", e.target.value)} />
                <label className="f-label">EMAIL</label>
                <input className="f-input" type="email" placeholder="your@company.com" value={form.email} onChange={e => update("email", e.target.value)} />
                <label className="f-label">MESSAGE</label>
                <textarea className="f-input" rows={5} style={{ resize: "vertical" }} placeholder="Tell me about the role or opportunity..." value={form.message} onChange={e => update("message", e.target.value)} />
                {state === "error" && (
                  <div style={{ color: "#ff4444", fontSize: 13, marginBottom: 10, fontFamily: "var(--mono)" }}>
                    [ERROR] Send failed. Email potnisd@usc.edu directly.
                  </div>
                )}
                <button className="cta-primary" style={{ fontSize: 13, marginTop: 4, opacity: state === "sending" ? 0.6 : 1 }}
                  onClick={submit} disabled={state === "sending"}>
                  {state === "sending" ? "[ SENDING... ]" : "[ SEND_MESSAGE ]"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
