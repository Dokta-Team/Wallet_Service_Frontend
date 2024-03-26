import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { siteConfig } from "@/lib/site";
import TopNavBar from "@/components/layouts/TopNavBar";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig?.url),
  title: "Doktahealth - Feel better about finding healthcare.",
  description:
    "Doktahealth is a platform that provides innovative deployment of data and technology in preventive care and in the management of health outcomes to save millions of lives.",
  keywords: ["Health", "Pharmacy"],
  authors: [
    {
      name: "Dokta",
      url: siteConfig?.url,
    },
  ],
  creator: "Dokta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig?.url,
    title: siteConfig?.name,
    description: siteConfig?.description,
    siteName: siteConfig?.name,
  },
  icons: {
    icon: "/favicon.ico",
    //shortcut: "/favicon-16x16.png",
    //apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter?.className}>
        <TopNavBar />
        {children}
      </body>
    </html>
  );
}
