import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "./ui/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Real-Time Collaborative Code Editor",
  description: "Real-Time Collaborative Code Editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="float-right"> <ThemeToggle /> </div>
        {children}
      </body>
    </html>
  );
}
