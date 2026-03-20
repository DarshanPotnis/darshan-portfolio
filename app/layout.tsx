import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Darshan Potnis | Backend Engineer",
  description:
    "Backend Software Engineer specializing in distributed systems, high-throughput APIs, and cloud-native infrastructure on AWS. USC M.S. Applied Data Science. Open to work.",
  authors: [{ name: "Darshan Potnis" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
