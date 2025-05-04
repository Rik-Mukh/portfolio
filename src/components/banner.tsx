"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Banner() {
  const pathname = usePathname();
  const tabs = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Courses", href: "/courses" },
    { name: "About", href: "/about" },
    { name: "Resume", href: "/resume" },
  ];

  return (
    <section className="flex flex-col justify-end gap-6 py-8 px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Top row: avatar + text/socials */}
      <div className="flex flex-row items-start gap-4 sm:gap-8">
        {/* Profile photo */}
        <div className="shrink-0">
          {/* TODO: Replace with my profile picture */}
          <Image
            src="/profile.png"
            alt="Profile picture"
            width={500}
            height={500}
            className="rounded-full object-cover h-24 sm:h-36 md:h-44 w-auto"
          />
        </div>

        {/* Textual information */}
        <div className="flex flex-col justify-between gap-2 sm:gap-3 px-0 sm:px-6">
          <h1 className="text-dark-text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Rik&nbsp;Mukherji
          </h1>

          {/* TODO: Replace with my actual bio */}
          <p className="text-sm sm:text-base md:text-lg text-dark-text-gray max-w-prose">
            If you&apos;re reading this, welcome to my corner of the internet&nbsp;😄
          </p>

          {/* Social links */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-3">
            {/* Email */}
            <Link
              href="mailto:rikmukherji05@gmail.com"
              aria-label="Send me an email"
              className="hover:text-gray-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-current"
              >
                <path d="M2 4h20a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v.01l10 6 10-6V6H2zm0 12h20V8l-10 6L2 8v10z" />
              </svg>
            </Link>

            {/* GitHub */}
            <Link
              href="https://github.com/Rik-Mukh"
              aria-label="GitHub profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-current"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 5.373 0 12a12 12 0 008.205 11.385c.6.11.82-.26.82-.577v-2.02c-3.338.726-4.042-1.414-4.042-1.414-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.836 2.807 1.306 3.492.998.107-.775.42-1.306.763-1.605-2.665-.31-5.467-1.334-5.467-5.93 0-1.31.47-2.38 1.236-3.22-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.3 1.23a11.52 11.52 0 013.003-.403 11.53 11.53 0 013.003.403c2.29-1.553 3.296-1.23 3.296-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.615-5.48 5.92.432.373.816 1.103.816 2.222v3.293c0 .319.218.693.824.575A12.002 12.002 0 0024 12c0-6.627-5.373-12-12-12z"
                />
              </svg>
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://www.linkedin.com/in/rik-mukherji/"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-current"
              >
                <path d="M20.447 20.452H17.21v-5.569c0-1.328-.025-3.038-1.849-3.038-1.854 0-2.136 1.447-2.136 2.942v5.665H9.974V9h3.111v1.561h.043c.435-.823 1.498-1.692 3.077-1.692 3.292 0 3.9 2.165 3.9 4.977v6.606zM5.337 7.433a1.806 1.806 0 110-3.612 1.806 1.806 0 010 3.612zM6.934 20.452H3.736V9h3.198v11.452zM22.225 0H1.771C.791 0 0 .771 0 1.708v20.524C0 23.23.792 24 1.771 24h20.451c.982 0 1.778-.771 1.778-1.768V1.708C24 .771 23.205 0 22.225 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="w-full">
        <ul className="flex flex-wrap space-x-4 [@media(max-width:353px)]:space-x-1 sm:space-x-8 md:space-x-12">
          {tabs.map(({ name, href }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`font-medium text-base transition-colors duration-200 py-2 border-b-[2.5px] ${
                    isActive
                      ? "text-dark-text-white border-dark-text-white"
                      : "text-gray-400 border-transparent hover:border-gray-500"
                  }`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* thin grey divider spanning full viewport */}
      <div className="relative -mt-4 w-full">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-screen border-[1.5px] border-[#3F3F3F]" />
      </div>
    </section>
  );
}
