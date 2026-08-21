import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/interactive/CustomCursor";
import ScrollProgress from "@/components/interactive/ScrollProgress";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const siteUrl = "https://aoa.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AOA — Web design & development team in Pune, India, for clients worldwide",
    template: "%s · AOA",
  },
  description:
    "AOA is a small web design and development team based in Pune, India, building considered, high-craft websites for founders and teams across the US, UK, EU, and beyond.",
  keywords: [
    "AOA",
    "web development agency India",
    "freelance web developer for international clients",
    "Next.js developer Pune",
    "React development team India",
    "custom website design",
  ],
  authors: [{ name: "AOA" }],
  openGraph: {
    title: "AOA — Digital craft, built to earn trust",
    description:
      "A small web design and development team in Pune, India, building considered websites for clients across timezones.",
    url: siteUrl,
    siteName: "AOA",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AOA — Digital craft, built to earn trust",
    description:
      "A small web design and development team in Pune, India, building considered websites for clients across timezones.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f1e7",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AOA",
  description:
    "Small web design and development team based in Pune, India, building considered websites for clients across timezones.",
  url: siteUrl,
  areaServed: ["IN", "US", "GB", "EU"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressCountry: "IN",
  },
  sameAs: ["https://instagram.com", "https://linkedin.com", "https://github.com"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ScrollProgress />
        <CustomCursor />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
