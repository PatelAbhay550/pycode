import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PyCode - Online Python Editor",
  description: "Beautiful online Python code editor with dark/light mode support",
  keywords: ["python", "code editor", "online", "interpreter", "dark mode", "light mode", "next.js", "react", "pyodide"],
  openGraph: {
    title: "PyCode - Online Python Editor",
    description: "Beautiful online Python code editor with dark/light mode support",
    url: "https://pycode.vercel.app",
    siteName: "PyCode",
    images: [
      {
        url: "https://pycode.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "PyCode - Online Python Editor",
      },
    ],
    locale: "en_US",
    type: "website",
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
