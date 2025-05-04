"use client";

import { ThemeProvider } from "next-themes";

export default function ThemeProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * `attribute="class"` makes next-themes add/remove a `class="dark"`
   * on the <html> element (Tailwind looks for this).
   */
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
