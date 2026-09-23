import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fraunces, archivoBlack } from "./fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/lib/site";

const description =
  "Edgar Muñoz Millán — Visual Communication Designer. Brand identity, visual systems, web design and product design that help businesses connect.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — ${site.role}`,
    template: `%s — ${site.fullName}`,
  },
  description,
  keywords: [
    "Edgar Millán",
    "Edgar Muñoz Millán",
    "visual designer",
    "brand identity designer",
    "graphic designer portfolio",
    "web design",
    "product design",
  ],
  authors: [{ name: site.fullName, url: site.url }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${site.fullName} — ${site.role}`,
    description: site.tagline,
    url: site.url,
    siteName: site.fullName,
    images: [{ url: "/pictures/foto de perfil copia.jpg", width: 1200, height: 1200 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — ${site.role}`,
    description: site.tagline,
    images: ["/pictures/foto de perfil copia.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0a0c",
};

// Avoid theme flash before hydration.
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.add(t);
    document.documentElement.style.colorScheme = t;
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${archivoBlack.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain">
        <ThemeProvider>
          <SmoothScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
