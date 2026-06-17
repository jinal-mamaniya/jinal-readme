import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

/* Custom font selection — Geist Sans + Geist Mono.
 * Per RESEARCH.md §2B: engineering-doc register (Stripe / Linear / Vercel)
 * requires "tight, geometric, slightly cold" typography. System fonts
 * (SF on macOS, Segoe UI on Windows) read as generic-app polish, not
 * engineering-doc craft. Geist is free, open-source, designed by Vercel
 * specifically for this register, and ships proper italic variants.
 *
 * Self-hosted automatically by next/font/google (subset + zero runtime
 * cost). variable: assigns to CSS custom property consumed by
 * globals.css --font-sans / --font-mono tokens. */
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jinal Mamaniya — README",
  description:
    "Senior Software Engineer. A handoff document for the systems I've helped maintain across legal-tech, public-safety, and enterprise.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Jinal Mamaniya — README",
    description:
      "Senior Software Engineer. A handoff document for the systems I've helped maintain.",
    url: SITE_URL,
    siteName: "Jinal Mamaniya",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jinal Mamaniya — README",
    description:
      "Senior Software Engineer. A handoff document for the systems I've helped maintain.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Anti-FOUC theme bootstrap script.
 *
 * Runs synchronously before React hydrates. Reads localStorage("theme")
 * — falls back to prefers-color-scheme if unset — and sets the
 * `data-theme` attribute on <html> so CSS variables resolve correctly
 * on first paint. Without this, dark-mode users would see a single-frame
 * flash of light theme before the ThemeToggle component hydrated.
 *
 * Minified inline so it's a single sub-millisecond synchronous statement
 * in <head>. Wrapped in try/catch because localStorage throws in some
 * private-browsing modes — quiet fail keeps the page rendering in light
 * mode rather than crashing.
 */
const themeBootstrapScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}else if(t==='light'){document.documentElement.setAttribute('data-theme','light');}else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          // Anti-FOUC theme bootstrap — runs synchronously before hydration.
          // suppressHydrationWarning on <html> is required because this script
          // mutates the DOM attribute before React reconciles.
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
