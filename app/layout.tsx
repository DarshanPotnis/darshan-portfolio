import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    "Backend Software Developer specializing in scalable systems, real-time infrastructure, and cloud-native applications.",
  keywords: [
    "Backend Developer",
    "Software Engineer",
    "Node.js",
    "Distributed Systems",
    "Real-time Systems",
    "Cloud Computing",
  ],
  authors: [{ name: "Darshan Potnis" }],
  openGraph: {
    title: "Darshan Potnis | Backend Software Developer",
    description:
      "Portfolio of Darshan Potnis — building scalable backend and real-time systems.",
    url: "https://your-vercel-url.vercel.app",
    siteName: "Darshan Potnis Portfolio",
    type: "website",
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
        {/* Devicons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0f1115] text-slate-50`}
      >
        {children}
      </body>
    </html>
  );
}
