"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { useState } from "react";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    title: "CollabEditor",
    description:
      "Real-time collaborative code editor with multi-user rooms and WebSocket synchronization.",
    stack: ["React", "Node.js", "WebSockets", "Socket.io", "Redis"],
    image: "/Document.png",
    liveUrl: "https://collab-editor-chi.vercel.app",
    architecture: [
      "Client connects via WebSocket",
      "Room-based session management on server",
      "Redis used for state synchronization",
      "Broadcast updates to all connected clients",
    ],
    metrics: [
      "Sub-200ms update latency",
      "Supports concurrent multi-user sessions",
      "Event-based synchronization model",
    ],
  },
  {
    title: "Cloud File Storage Service",
    description:
      "Scalable cloud storage platform with secure, versioned uploads.",
    stack: ["Node.js", "AWS S3", "PostgreSQL", "JWT"],
    image: "/Storage.png",
    architecture: [
      "Client uploads via pre-signed URLs",
      "Metadata stored in PostgreSQL",
      "Access controlled using JWT tokens",
      "Versioning handled at object level",
    ],
    metrics: [
      "Reduced backend load by 70%",
      "Secure, role-based access",
      "Highly scalable object storage",
    ],
  },
  {
    title: "AI Video Storyboard Generator",
    description:
      "AI-powered pipeline that converts scripts into visual storyboards using LLMs and diffusion models.",
    stack: ["Python", "GPT", "Stable Diffusion", "Flask", "FFmpeg"],
    image: "/Video.png",
    architecture: [
      "User submits script via frontend",
      "Backend processes text using LLM",
      "Stable Diffusion generates storyboard frames",
      "FFmpeg stitches frames into video output",
    ],
    metrics: [
      "Automated storyboard generation",
      "Reduced manual effort by 80%",
      "Modular AI pipeline architecture",
    ],
  },
];

export default function ProjectsSection({
  onBack,
}: {
  onBack: () => void;
}) {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [open, setOpen] = useState(false);

  return (
    <Section>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative min-h-screen bg-[#0f1115] px-6 py-24"
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 px-3 py-2
                     text-lime-300 text-sm font-semibold
                     hover:underline"
        >
          ← Back
        </button>

        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-lime-300 mb-14">
          Projects
        </h2>

        {/* Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={
                typeof window !== "undefined" && window.innerWidth > 768
                  ? { y: -6 }
                  : {}
              }
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty(
                  "--x",
                  `${e.clientX - rect.left}px`
                );
                e.currentTarget.style.setProperty(
                  "--y",
                  `${e.clientY - rect.top}px`
                );
              }}
              className="group relative rounded-2xl border border-lime-400/20 bg-slate-900/40
                         hover:border-lime-300/60 transition-all"
            >
              {/* Cursor-follow glow */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px at var(--x) var(--y), rgba(190,242,100,0.15), transparent 40%)",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Image */}
              <div className="relative h-48 sm:h-56 flex items-center justify-center
                              bg-[#0d1117] rounded-t-2xl overflow-hidden">
                <motion.img
                  src={p.image}
                  alt={p.title}
                  className="w-[75%] h-[75%] object-contain"
                  whileHover={
                    typeof window !== "undefined" && window.innerWidth > 768
                      ? { scale: 1.05 }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content */}
              <div className="relative p-6 text-center">
                <h3 className="text-lg font-semibold text-lime-200">
                  {p.title}
                </h3>

                <p className="text-slate-400 mt-2 text-sm sm:text-base">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-lime-400/25 bg-lime-300/10
                                 px-2.5 py-1 text-[11px] text-lime-200/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    className="inline-block mt-6 text-sm font-semibold text-lime-300
                               hover:underline"
                  >
                    View Live →
                  </a>
                )}

                {/* View Architecture Button */}
                <button
                  onClick={() => {
                    setSelectedProject(p);
                    setOpen(true);
                  }}
                  className="mt-4 block w-full text-sm font-semibold text-lime-300
                             border border-lime-400/30 rounded-lg py-2
                             hover:bg-lime-300/10 transition-colors"
                >
                  View Architecture
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Architecture Modal */}
        <ProjectModal
          open={open}
          onClose={() => setOpen(false)}
          project={selectedProject}
        />
      </motion.section>
    </Section>
  );
}
