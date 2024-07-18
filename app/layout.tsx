import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import HeadLine from "@/components/headers/HeadLine";
import HeadTitle from "@/components/headers/HeadTitle";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "mdg40/animeTracker",
  description: "Anime Tracking system created by mdg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={cn(
        "min-h-screen bg-muted/40 font-sans antialiased",
        fontSans.variable
      )

      }>
        <main className="pt-20 flex items-center flex-col ">
          <section className="w-10/12">
            <div>
              <HeadLine />
              <HeadTitle />
            </div>
          </section>

          {children}
        </main>
      </body>
    </html >
  );
}
