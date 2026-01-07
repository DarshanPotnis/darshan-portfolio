"use client";

import { motion } from "framer-motion";

/* -------------------- TECH STACK DATA -------------------- */

const categories = [
  { title: "Programming Languages", skills: ["python", "java", "cplusplus", "javascript", "sql", "bash"] },
  {
    title: "Backend & Frontend Frameworks",
    skills: ["nodejs", "express", "flask", "django", "react", "nextjs", "tailwindcss", "docker", "git", "redis"],
  },
  { title: "Cloud, DevOps & Infrastructure", skills: ["aws", "googlecloud", "azure", "kubernetes", "terraform"] },
  { title: "Testing & APIs", skills: ["selenium", "postman"] },
  { title: "Databases", skills: ["postgresql", "mongodb", "mysql", "firebase"] },
];

const deviconMap: Record<string, string> = {
  python: "devicon-python-plain colored",
  java: "devicon-java-plain colored",
  cplusplus: "devicon-cplusplus-plain colored",
  javascript: "devicon-javascript-plain colored",
  sql: "devicon-mysql-plain colored",
  bash: "devicon-bash-plain colored",
  nodejs: "devicon-nodejs-plain colored",
  express: "devicon-express-original",
  flask: "devicon-flask-original",
  django: "devicon-django-plain colored",
  react: "devicon-react-original colored",
  nextjs: "devicon-nextjs-original",
  tailwindcss: "devicon-tailwindcss-original-wordmark colored",
  docker: "devicon-docker-plain colored",
  git: "devicon-git-plain colored",
  redis: "devicon-redis-plain colored",
  aws: "devicon-amazonwebservices-original colored",
  googlecloud: "devicon-googlecloud-plain colored",
  azure: "devicon-azure-plain colored",
  kubernetes: "devicon-kubernetes-plain colored",
  terraform: "devicon-terraform-plain colored",
  selenium: "devicon-selenium-original colored",
  postman: "devicon-postman-plain colored",
  postgresql: "devicon-postgresql-plain colored",
  mongodb: "devicon-mongodb-plain colored",
  mysql: "devicon-mysql-plain colored",
  firebase: "devicon-firebase-plain colored",
};

/* -------------------- TECH STACK SECTION -------------------- */

function TechStackSection() {
  return (
    <section id="skills" className="py-28 bg-[#0f1115]">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-lime-300 mb-4">
        Tech Stack
      </h2>
      <p className="text-center text-slate-400 mb-14 px-4">
        Core focus on backend systems, real-time infrastructure, and cloud-native architecture
      </p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-lime-400/20 bg-slate-900/40 p-6
                       hover:border-lime-300/60 hover:shadow-[0_0_25px_rgba(190,242,100,0.25)] transition-all"
          >
            <h3 className="text-lg font-semibold text-lime-200 mb-5 text-center">
              {cat.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {cat.skills.map((s) => (
                <i key={s} className={`${deviconMap[s]} text-4xl`} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- PROJECTS -------------------- */

const projects = [
  {
    title: "Collaborative Document Editor",
    description:
      "Built a real-time collaborative editor supporting concurrent users with conflict-free updates using CRDTs.",
    stack: ["Node.js", "CRDT", "MongoDB", "WebSockets", "Docker", "AWS"],
    image: "/Document.png",
  },
  {
    title: "Cloud File Storage Service",
    description:
      "Designed a scalable cloud file storage platform with versioned uploads and secure access control.",
    stack: ["Node.js", "AWS S3", "PostgreSQL", "MongoDB", "React"],
    image: "/Storage.png",
  },
  {
    title: "AI Video Storyboard Generator",
    description:
      "Developed an AI-powered pipeline that converts scripts into visual storyboards using LLMs and diffusion models.",
    stack: ["Python", "GPT", "Stable Diffusion", "FFmpeg", "Flask", "React"],
    image: "/Video.png",
  },
];

function ProjectsSection() {
  return (
    <section id="projects" className="py-28 bg-[#0f1115]">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-lime-300 mb-14">
        Projects
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 sm:px-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="rounded-2xl border border-lime-400/20 bg-slate-900/40
                       hover:border-lime-300/60 hover:shadow-[0_0_35px_rgba(190,242,100,0.25)] transition-all"
          >
            <div className="h-48 sm:h-56 flex items-center justify-center bg-[#0d1117] rounded-t-2xl">
              <img src={p.image} alt={p.title} className="w-[75%] h-[75%] object-contain" />
            </div>

            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-lime-200">{p.title}</h3>
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
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* -------------------- PAGE -------------------- */

export default function Page() {
  return (
    <main className="bg-[#0f1115] text-slate-50">
      {/* HERO */}
      <section className="min-h-[90vh] flex flex-col items-center justify-start pt-16 sm:pt-20 px-6 text-center">
        {/* PHOTO */}
        <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 mb-8 sm:mb-10
                        rounded-full border-4 border-lime-500/60
                        shadow-[0_0_40px_rgba(190,242,100,0.25)] overflow-hidden">
          <img
            src="/Darshan_memoji.png"
            alt="Darshan Potnis"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-sm text-lime-200 font-semibold mb-3">
          Hi, I’m Darshan Potnis 👋
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                       font-bold max-w-5xl leading-tight">
          Backend Software Developer building{" "}
          <span className="text-lime-300">scalable, real-time systems</span> and clean APIs
        </h1>

        <p className="mt-5 max-w-2xl text-slate-400 text-base sm:text-lg">
          I design production-grade backend infrastructure with a focus on performance,
          reliability, and system scalability.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#projects"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(190,242,100,0.45)",
              backgroundColor: "rgba(190,242,100,0.12)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3 rounded-xl border border-lime-400/40
                       text-lime-300 font-semibold transition-all"
          >
            View Projects
          </motion.a>

          <motion.a
            href="#skills"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(190,242,100,0.45)",
              backgroundColor: "rgba(190,242,100,0.12)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3 rounded-xl border border-lime-400/40
                       text-lime-300 font-semibold transition-all"
          >
            View Tech Stack
          </motion.a>

          <motion.a
            href="/Darshan_Potnis_Resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(190,242,100,0.45)",
              backgroundColor: "rgba(190,242,100,0.12)",
            }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3 rounded-xl border border-lime-400/40
                       text-lime-300 font-semibold transition-all"
          >
            Download Resume
          </motion.a>
        </div>
      </section>

      <TechStackSection />
      <ProjectsSection />

      <footer className="text-center text-xs text-slate-500 pb-10">
        © {new Date().getFullYear()} Darshan Potnis · Built with Next.js, Tailwind & Framer Motion
      </footer>
    </main>
  );
}
