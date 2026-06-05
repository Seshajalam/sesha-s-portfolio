'use client';

import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const siteUrl = "https://seshajalam.github.io/sesha-s-portfolio";

const inter = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-inter",
  weight: "100 900",
});

const spaceGrotesk = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-space-grotesk",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Seshajalam G | AI Research & ML Engineer Portfolio</title>
        <meta name="description" content="Portfolio of Seshajalam G — AI Engineer specializing in deep learning, computer vision, and NLP." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Seshajalam G | AI Engineer Portfolio" />
        <meta property="og:description" content="AI Engineer specializing in deep learning, computer vision, and NLP. Explore my projects and research." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/images/profile.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Seshajalam G | AI Engineer Portfolio" />
        <meta name="twitter:description" content="AI Engineer specializing in deep learning, computer vision, and NLP." />
        <meta name="twitter:image" content={`${siteUrl}/images/profile.png`} />
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/favicon.ico`} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
