"use client";
import { useTheme } from "next-themes";

/**
 * Re-usable button that switches between light ↔ dark.
 * Swaps your provided moon / sun SVGs.
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Treat "system" as dark if the OS is in dark mode
  const isLight = theme === "light";

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="flex items-center justify-center h-[42px] aspect-square p-2 rounded-full bg-dark-bg-search-icon"
    >
      {/* Moon (shows in dark mode) */}
      <svg
        className={`${isLight ? "hidden" : "block"} w-full h-full`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-0.5 -5.5 9.09 11.59"
      >
        <path
          d="M0 5A1 1 0 005-5Q6 2 0 5"
          stroke="#FFFFFF"
          strokeWidth={0.5}
          fill="#FFFFFF"
        />
      </svg>

      {/* Sun (shows in light mode) */}
      <svg
        className={`${isLight ? "block" : "hidden"} w-full h-full`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-10.5 -10.5 21 21"
      >
        <path
          d="M-5 0A1 1 0 005 0 1 1 0 00-5 0M0-7v-3M7 0h3M0 7v3M-7 0h-3M5-5 7-7M5 5 7 7M-5-5-7-7M-5 5-7 7"
          stroke="#FFFFFF"
          strokeWidth={0.5}
          fill="#FFFFFF"
        />
      </svg>
    </button>
  );
}
