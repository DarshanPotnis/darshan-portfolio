"use client";

import { motion } from "framer-motion";
import Section from "./Section";

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

export default function TechStackSection() {
  return (
    <Section>
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
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-lime-400/20 bg-slate-900/40 p-6
                         hover:border-lime-300/60 hover:shadow-[0_0_25px_rgba(190,242,100,0.25)] transition-all"
            >
              <h3 className="text-lg font-semibold text-lime-200 mb-5 text-center">
                {cat.title}
              </h3>

              <div className="flex flex-wrap justify-center gap-4">
                {cat.skills.map((s, idx) => (
                  <motion.i
                    key={s}
                    className={`${deviconMap[s]} text-4xl`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Section>
  );
}
