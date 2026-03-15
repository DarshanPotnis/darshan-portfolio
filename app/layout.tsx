import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Darshan Potnis | Backend Software Engineer",
  description:
    "Backend Software Engineer specializing in distributed systems, real-time infrastructure, WebSockets, and cloud-native architecture. Open to work across the United States.",
  authors: [{ name: "Darshan Potnis" }],
  creator: "Darshan Potnis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Syne:wght@700;800&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
