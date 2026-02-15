import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Monitoring - Monitor API Uptime & Performance",
  description: "Monitor API uptime, response times, and status",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
