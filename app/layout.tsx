import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../src/styles/index.css";

const siteName = "Восъчна пекарна";
const description = "Първата восъчна пекарна в България за свещи-печива.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vosuchnapekarna.com"),
  title: {
    default: `${siteName} | Свещи-печива в България`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: ["восъчни свещи", "свещи-печива", "Восъчна пекарна", "ръчно изработени свещи"],
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName,
    title: `${siteName} | Свещи-печива в България`,
    description,
    images: [
      {
        url: "/images/wax-candle-bakery-hero.jpg",
        width: 1280,
        height: 720,
        alt: "Ръчно изработени свещи-печива от Восъчна пекарна",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Свещи-печива в България`,
    description,
    images: ["/images/wax-candle-bakery-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
