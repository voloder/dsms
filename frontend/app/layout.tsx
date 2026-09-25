import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roadwise | Driving school operations",
  description: "Manage students, instructors, lessons, and progress in one place.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
