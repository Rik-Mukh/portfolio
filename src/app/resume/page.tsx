import Image from "next/image";

export default function Resume() {
  return (
    <div className="w-full flex justify-center items-start px-4 py-6 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
        {/* Static resume image */}
        <div className="relative w-full aspect-[70/99] rounded-md overflow-hidden">
          <Image
            src="/resume.jpg"
            alt="Resume"
            fill
            className="object-contain object-top"
          />
        </div>
        
        {/* Download button (top‑right corner) */}
        <a
          href="/resume.pdf"
          download
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-5 md:-right-5 bg-dark-bg-search-icon p-2 sm:p-1 rounded-full hover:bg-dark-outline-search"
          aria-label="Download PDF"
        >
          {/* TODO: Change padding of download icon */}
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
            <Image
              src="/download-icon.svg"
              alt="Download"
              fill
              className="object-contain"
            />
          </div>
        </a>
      </div>
    </div>
  );
}
