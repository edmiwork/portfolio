import { Fraunces, Archivo_Black } from "next/font/google";

// Expressive variable serif for big creative headlines.
// Mundial stays as the body/UI font (self-hosted in globals.css).
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

// Heavy grotesque for the oversized hero name that fills the screen.
export const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-archivo",
});
