"use client";

const SKILLS = [
  { cat: "LANGUAGES",    tools: [
    { icon: "devicon-python-plain colored",             label: "Python"     },
    { icon: "devicon-javascript-plain colored",         label: "JavaScript" },
    { icon: "devicon-java-plain colored",               label: "Java"       },
    { icon: "devicon-cplusplus-plain colored",          label: "C++"        },
    { icon: "devicon-mysql-plain colored",              label: "SQL"        },
    { icon: "devicon-bash-plain colored",               label: "Bash"       },
  ]},
  { cat: "BACKEND",      tools: [
    { icon: "devicon-nodejs-plain colored",             label: "Node.js"    },
    { icon: "devicon-flask-original",                   label: "Flask",     style: { color: "#fff" } },
    { icon: "devicon-redis-plain colored",              label: "Redis"      },
    { icon: "devicon-docker-plain colored",             label: "Docker"     },
    { icon: "devicon-react-original colored",           label: "React"      },
    { icon: "devicon-nextjs-original",                  label: "Next.js",   style: { color: "#fff" } },
    { icon: "devicon-git-plain colored",                label: "Git"        },
  ]},
  { cat: "CLOUD / DEVOPS", tools: [
    { icon: "devicon-amazonwebservices-original colored", label: "AWS"       },
    { icon: "devicon-googlecloud-plain colored",          label: "GCP"       },
    { icon: "devicon-azure-plain colored",                label: "Azure"     },
    { icon: "devicon-kubernetes-plain colored",           label: "Kubernetes"},
    { icon: "devicon-terraform-plain colored",            label: "Terraform" },
  ]},
  { cat: "DATABASES",    tools: [
    { icon: "devicon-postgresql-plain colored",         label: "PostgreSQL" },
    { icon: "devicon-mongodb-plain colored",            label: "MongoDB"    },
    { icon: "devicon-mysql-plain colored",              label: "MySQL"      },
    { icon: "devicon-firebase-plain colored",           label: "Firebase"   },
  ]},
];

const FOCUS = [
  "Distributed Systems","Microservices","Event-Driven Architecture","Caching Strategies",
  "Rate Limiting","Concurrency","Real-Time Systems","REST APIs",
  "GraphQL","WebSockets","CI/CD Pipelines","System Design","Cloud Infrastructure",
];

export default function TechStack() {
  return (
    <>
      <div className="pg-header">
        <div className="pg-eyebrow">stack.dat</div>
        <h1 className="pg-title">TECH_STACK</h1>
        <p className="pg-sub">Backend-first · Cloud-native · Real-time obsessed</p>
      </div>

      <table className="skill-table">
        <thead>
          <tr>
            <th>CATEGORY</th>
            <th>TOOLS &amp; TECHNOLOGIES</th>
          </tr>
        </thead>
        <tbody>
          {SKILLS.map(row => (
            <tr key={row.cat}>
              <td className="sk-cat">{row.cat}</td>
              <td>
                <div className="sk-icons">
                  {row.tools.map(tool => (
                    <div key={tool.label} className="sk-item">
                      <i className={tool.icon} style={(tool as any).style} />
                      {tool.label}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ fontSize: 9, color: "var(--muted2)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, display: "flex", gap: 8 }}>
        <span style={{ color: "var(--green)" }}>//</span> SYSTEM_DESIGN_FOCUS
      </div>
      <div className="focus-row">
        {FOCUS.map(f => <span key={f} className="ftag">{f}</span>)}
      </div>
    </>
  );
}
