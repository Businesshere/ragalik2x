import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BeFirst — Google Reviews for your business",
  description:
    "Get more 5-star reviews, build trust, and rank higher on Google with real customer feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>{children}</body>
    </html>
  );
}
