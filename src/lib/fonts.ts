import localFont from "next/font/local";
import { Inter } from "next/font/google";

const tiemposHeadlineFont = localFont({
  src: [
    {
      path: "../../public/fonts/Tiempos-Headline-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Tiempos-Headline-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Tiempos-Headline-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Tiempos-Headline-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Tiempos-Headline-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Tiempos-Headline-Black.otf",
      weight: "900",
      style: "normal",
    },

    {
      path: "../../public/fonts/Tiempos-Headline-Light-Italic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/fonts/Tiempos-Headline-Regular-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Tiempos-Headline-Medium-Italic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Tiempos-Headline-Semibold-Italic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/Tiempos-Headline-Bold-Italic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/Tiempos-Headline-Black-Italic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-tiempos-headline",
  display: "swap",
});

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export { tiemposHeadlineFont, interFont };
