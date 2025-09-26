import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import Navigation from "../components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pycode - Learn Python Programming Online | Interactive Python Course",
  description: "Master Python programming with interactive lessons, quizzes, and hands-on practice. Learn coding step by step with gamified exercises. Start your Python journey today - completely free!",
  keywords: ["python", "learn python", "programming", "coding", "interactive lessons", "python tutorial", "coding practice", "programming education", "python course", "beginner python", "python exercises", "online coding", "programming bootcamp"],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  author: "Pycode Team",
  category: "education",
  
  openGraph: {
    title: "Pycode - Learn Python Programming Online | Interactive Python Course",
    description: "Master Python programming with interactive lessons, quizzes, and hands-on practice. Learn coding step by step with gamified exercises.",
    url: "https://Pycode.vercel.app",
    siteName: "Pycode",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pycode.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pycode - Interactive Python Learning Platform",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Pycode - Learn Python Programming Online",
    description: "Master Python programming with interactive lessons, quizzes, and hands-on practice. Learn coding step by step with gamified exercises.",
    images: ["https://Pycode.vercel.app/og-image.png"],
    creator: "@Pycode_app",
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  alternates: {
    canonical: "https://Pycode.vercel.app",
  },
  
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  
  manifest: "/site.webmanifest",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <AuthProvider>
          <div className="flex h-screen">
            <Navigation />
            <main className="flex-1 lg:ml-64 overflow-auto">
              <div className="lg:hidden h-16"></div> {/* Spacer for mobile top nav */}
              <div className="pb-16 lg:pb-0"> {/* Bottom padding for mobile bottom nav */}
                {children}
              </div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
