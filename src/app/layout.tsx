import type { Metadata } from "next";

import { tiemposHeadlineFont, interFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  title: "Together Agency | Developer Technical Assignment",
  description: "Technical test assignment. Developed by GeorgeCht.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      {/* React scan for rerenders checks */}
      {/* <head>
        <script
          crossOrigin='anonymous'
          src='https://unpkg.com/react-scan@0.4.3/dist/auto.global.js'
        ></script>
      </head> */}
      <body
        className={cn(
          interFont.variable,
          tiemposHeadlineFont.variable,
          "antialiased",
        )}
      >
        {children}
      </body>
    </html>
  );
}
