import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UTME Pro CBT | Practice Smarter",
  description: "Professional JAMB UTME exam practice website for Nigerian students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
