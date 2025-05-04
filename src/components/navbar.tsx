"use client";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import SearchBar from "@/components/SearchBar";
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-2 [@media(max-width:341px)]:gap-1 sm:gap-4 lg:gap-6 px-2 [@media(max-width:341px)]:px-1 sm:px-4 md:px-6 lg:px-8 w-full overflow-x-auto">
      {/* Logo */}
      <Link href="/" className="flex flex-none items-center">
        {/* TODO: Replace with my logo */}
        <Image src="/vercel.svg" alt="Logo" className="h-[30px] w-auto" />
      </Link>

      {/* Search bar */}

      <SearchBar />

      {/* Dark Mode toggle */}
      <ThemeToggle />
    </nav>
  );
}
