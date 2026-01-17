import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionConfig } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Darshan Potnis | Backend Software Developer",
  description:
    "Backend Software Developer specializing in scalable systems, real-time infrastructure, WebSockets, and cloud-native backend architecture.",
  keywords: [
    "Backend Developer",
    "Software Engineer",
    "Backend Software Developer",
    "Node.js",
    "Distributed Systems",
    "WebSockets",
    "System Design",
    "Cloud Computing",
    "AWS",
    "Real-time Systems",
  ],
  authors: [{ name: "Darshan Potnis" }],
  creator: "Darshan Potnis",

  openGraph: {
    title: "Darshan Potnis | Backend Software Developer",
    description:
      "Portfolio showcasing scalable backend systems, real-time applications, and cloud-native architecture.",
    url: "https://darshan-portfolio-fawn.vercel.app",
    siteName: "Darshan Potnis Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Darshan Potnis Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Darshan Potnis | Backend Software Developer",
    description: "Scalable backend systems, real-time infrastructure, and clean APIs.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f1115] text-slate-50 overflow-x-hidden`}
      >
        <MotionConfig
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.8,
          }}
        >
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
