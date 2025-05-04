"use client";
import "./globals.css";
import Navbar from "@/components/navbar";
import Banner from "@/components/banner";
import ThemeProviderWrapper from "@/components/theme-provider";
import { usePathname } from "next/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showBanner = !(
    pathname.startsWith("/projects/") || pathname.startsWith("/courses/")
  );

  return (
    <html lang="en">
      <body className="bg-light-bg text-light-text-black dark:bg-dark-bg dark:text-dark-text-white flex flex-col h-screen">
        <div className="w-[90%] mx-auto my-8">
          <ThemeProviderWrapper>
            <Navbar />
            {showBanner && <Banner />}
            {children}
          </ThemeProviderWrapper>
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
