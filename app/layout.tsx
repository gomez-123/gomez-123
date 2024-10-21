import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://citeutcubamba.pe/"),
  title: {
    default: "CITE Utcubamba Amazonas",
    template: "%s | CITE Utcubamba Amazonas",
  },
  description:
    "Centro de Innovación Tecnológica en Artesanía y Turismo Utcubamba Amazonas",
  manifest: "/manifest.json",
  icons: {
    apple: "/images/icon-128x128.png",
  },
  openGraph: {
    title: "CITE Utcubamba Amazonas",
    description:
      "Centro de Innovación Tecnológica en Artesanía y Turismo Utcubamba Amazonas",
    url: "https://citeutcubamba.pe/",
    siteName: "citeutcubamba.pe",
    locale: "es",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "CITE Utcubamba Amazonas",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-zinc-50 dark:bg-zinc-950`}>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
