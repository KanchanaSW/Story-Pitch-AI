import type { Metadata } from "next";
import { Playfair_Display, Special_Elite } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-special-elite",
});

export const metadata: Metadata = {
  title: "Story Pitch AI — Turn One Line Into a Legend",
  description:
    "Turn a wild one-sentence story pitch into a full cinematic synopsis with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${specialElite.variable} antialiased`}
      >
        <div className="film-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
