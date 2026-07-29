import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteDescription =
  "Marketing portfolio of Zoei Benzon, fourteenzerosix studios";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fourteenzerosixstudios.com"),
  title: "Zoei Benzon | Gen Marketer",
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Zoei Benzon",
    title: "Zoei Benzon | Gen Marketer",
    description: siteDescription,
    url: "/",
    images: [
      { url: "/icon.jpg", width: 1454, height: 1363, alt: "Zoei Benzon" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoei Benzon | Gen Marketer",
    description: siteDescription,
    images: ["/icon.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
