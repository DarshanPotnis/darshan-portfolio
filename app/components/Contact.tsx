"use client";

import { useState } from "react";

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
    <footer id="contact" style={{ padding: "100px 80px", borderTop: "1px solid var(--border)" }}>
      <style>{`
        .clink-new { display:flex; align-items:center; justify-content:space-between; padding:15px 20px; background:var(--bg3); border:1px solid var(--border); border-radius:10px; text-decoration:none; color:var(--text); transition:all 0.22s; margin-bottom:10px; }
        .clink-new:hover { border-color:var(--border2); transform:translateX(5px); background:var(--surface); box-shadow:4px 0 20px rgba(99,102,241,0.1); }
        .cl-arr-new { color:var(--muted2); font-size:16px; transition:all 0.22s; }
        .clink-new:hover .cl-arr-new { color:var(--accent2); transform:translateX(4px); }
        .sc-row-new { display:flex; justify-content:space-between; padding:10px 18px; border-bottom:1px solid var(--border); font-family:var(--jet); font-size:11px; transition:background 0.15s; }
        .sc-row-new:last-child { border-bottom:none; }
        .sc-row-new:hover { background:rgba(255,255,255,0.02); }
        .f-inp-new { width:100%; background:var(--bg2); border:1px solid var(--border2); border-radius:8px; padding:11px 14px; color:var(--text); font-family:var(--jet); font-size:12px; outline:none; transition:all 0.2s; margin-bottom:14px; letter-spacing:0.02em; }
        .f-inp-new:focus { border-color:var(--accent); box-shadow:0 0 0 3px rgba(99,102,241,0.1); }
        .f-inp-new::placeholder { color:var(--muted2); }
        .f-lbl-new { font-family:var(--jet); font-size:10px; color:var(--muted2); letter-spacing:0.12em; text-transform:uppercase; display:block; margin-bottom:7px; }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>

        {/* LEFT */}
        <div>
          <div style={{ fontFamily: "var(--jet)", fontSize: 11, color: "var(--accent2)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 24, height: 1, background: "var(--accent2)", opacity: 0.5, display: "inline-block" }} />Get in touch
          </div>
          <h2 style={{ fontFamily: "var(--sans)", fontSize: "2.2rem", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 12 }}>
            Let's talk.
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 32, lineHeight: 1.75 }}>
            Open to full-time Backend SWE roles across the United States. I respond fast — usually same day.
          </p>

          {[
            { lbl: "Email",    val: "potnisdarshan@gmail.com",          href: "mailto:potnisdarshan@gmail.com",                       c: "var(--accent2)" },
            { lbl: "LinkedIn", val: "linkedin.com/in/darshan-potnis",   href: "https://www.linkedin.com/in/darshan-potnis-9304a3218/", c: "var(--cyan)"    },
            { lbl: "GitHub",   val: "github.com/DarshanPotnis",         href: "https://github.com/DarshanPotnis",                     c: "var(--muted)"   },
          ].map(l => (
            <a key={l.lbl} className="clink-new" href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
              <div>
                <div style={{ fontFamily: "var(--jet)", fontSize: 9, color: l.c, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>{l.lbl}</div>
                <div style={{ fontSize: 13 }}>{l.val}</div>
              </div>
              <span className="cl-arr-new">→</span>
            </a>
          ))}

          <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", marginTop: 4 }}>
            <div style={{ background: "var(--bg2)", padding: "10px 18px", fontFamily: "var(--jet)", fontSize: 9, color: "var(--muted2)", letterSpacing: "0.14em", textTransform: "uppercase", borderBottom: "1px solid var(--border)" }}>Current Status</div>
            {[
              { k: "Location",    v: "LA → US (open to relocate)",  c: "var(--accent2)"  },
              { k: "Looking for", v: "Backend SWE · Full-Stack SWE", c: "var(--green)"    },
              { k: "Work auth",   v: "OPT eligible",                 c: "var(--amber)"    },
              { k: "Graduation",  v: "Dec 2025",                     c: "var(--muted)"    },
              { k: "Available",   v: "Immediately",                  c: "var(--green)"    },
            ].map(r => (
              <div key={r.k} className="sc-row-new">
                <span style={{ color: "var(--muted2)" }}>{r.k}</span>
                <span style={{ color: r.c }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <div style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 14, padding: 34, transition: "border-color 0.3s" }}>
          <div style={{ fontFamily: "var(--jet)", fontSize: 10, color: "var(--muted2)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>Send a message</div>

          {state === "sent" ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 16, color: "var(--green)" }}>✓</div>
              <div style={{ fontFamily: "var(--jet)", fontSize: 14, color: "var(--green)", letterSpacing: "0.06em", marginBottom: 8 }}>Message sent!</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>I'll reply within 24 hours.</div>
              <button onClick={() => setState("idle")} style={{ marginTop: 20, fontFamily: "var(--jet)", fontSize: 11, padding: "8px 20px", borderRadius: 7, background: "transparent", border: "1px solid var(--border2)", color: "var(--muted)", cursor: "pointer" }}>Send another</button>
            </div>
          ) : (
            <>
              <label className="f-lbl-new">Name</label>
              <input className="f-inp-new" placeholder="Your name" value={form.name} onChange={e => update("name", e.target.value)} />
              <label className="f-lbl-new">Email</label>
              <input className="f-inp-new" type="email" placeholder="you@company.com" value={form.email} onChange={e => update("email", e.target.value)} />
              <label className="f-lbl-new">Message</label>
              <textarea className="f-inp-new" rows={5} style={{ resize: "vertical", marginBottom: 18 }} placeholder="Tell me about the role — team size, stack, what you're building..." value={form.message} onChange={e => update("message", e.target.value)} />
              {state === "error" && <div style={{ fontFamily: "var(--jet)", fontSize: 12, color: "var(--rose)", marginBottom: 10 }}>Send failed. Email potnisdarshan@gmail.com directly.</div>}
              <button onClick={submit} disabled={state === "sending"} style={{ width: "100%", padding: "13px", borderRadius: 8, background: "var(--accent)", color: "#fff", border: "none", fontFamily: "var(--sans)", fontSize: 14, fontWeight: 700, cursor: "pointer", opacity: state === "sending" ? 0.6 : 1, transition: "all 0.2s" }}>
                {state === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </>
          )}
        </div>
      </div>

      <p style={{ textAlign: "center", marginTop: 48, fontFamily: "var(--jet)", fontSize: 10, color: "var(--muted2)" }}>
        © 2026 Darshan Potnis · Backend Engineer · USC M.S. Applied Data Science
      </p>
    </footer>
  );
}
