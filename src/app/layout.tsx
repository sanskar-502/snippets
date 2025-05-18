import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FancyBackground } from "@/components/ui/fancy-background";
import { Footer } from "@/components/ui/footer";
import { ToastProvider } from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LoveySnips",
  description: "Share your code snippets with a personal touch",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/app-icon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
    other: [
      { url: '/app-icon.svg', sizes: '512x512', type: 'image/svg+xml' },
      { url: '/app-icon.svg', sizes: '192x192', type: 'image/svg+xml' },
    ]
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: "LoveySnips",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: '#9333EA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FancyBackground>
          <div className="container mx-auto p-4 md:p-6 lg:p-12">
            {children}
            <Footer />
          </div>
        </FancyBackground>
        <ToastProvider />
      </body>
    </html>
  );
}
