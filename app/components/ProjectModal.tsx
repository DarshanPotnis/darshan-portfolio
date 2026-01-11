"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: {
    title: string;
    architecture: string[];
    stack: string[];
    metrics: string[];
  } | null;
}

export default function ProjectModal({
  open,
  onClose,
  project,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full rounded-2xl bg-[#0f1115] border border-lime-400/20 p-6"
          >
            <h3 className="text-2xl font-bold text-lime-300 mb-4">
              {project.title} — Architecture
            </h3>

            <div className="mb-5">
              <h4 className="text-lime-200 font-semibold mb-2">
                System Flow
              </h4>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                {project.architecture.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>

            <div className="mb-5">
              <h4 className="text-lime-200 font-semibold mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-lime-400/30 bg-lime-300/10
                               px-3 py-1 text-xs text-lime-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lime-200 font-semibold mb-2">
                Key Metrics / Considerations
              </h4>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                {project.metrics.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 rounded-xl border border-lime-400/40
                         text-lime-300 font-semibold hover:bg-lime-300/10"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
