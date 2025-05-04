// Custom event name for coordinating flips on mobile
"use client";
import { useState, useEffect, useRef } from "react";
type CourseData = [string, string, string, string];

const COURSE_FLIP_EVENT = "course-flip";

export default function Course({ data }: { data: CourseData }) {
  const [code, name, description, whatILearnt] = data;
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // When another card flips, this one should unflip
  useEffect(() => {
    const listener = (e: Event) => {
      const id = (e as CustomEvent).detail as string;
      if (id !== code) {
        setFlipped(false);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener(COURSE_FLIP_EVENT, listener as EventListener);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(
          COURSE_FLIP_EVENT,
          listener as EventListener
        );
      }
    };
  }, [code]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (window.innerWidth >= 640) return; // only on phones
      if (!cardRef.current) return;
      if (!cardRef.current.contains(e.target as Node)) {
        setFlipped(false);
      }
    };
    window.addEventListener("click", handleOutside);
    return () => window.removeEventListener("click", handleOutside);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === "undefined" || window.innerWidth >= 640) return;

    // Toggle flip state
    const newState = !flipped;
    setFlipped(newState);

    // If flipping open, notify others to close
    if (newState) {
      window.dispatchEvent(
        new CustomEvent(COURSE_FLIP_EVENT, { detail: code })
      );
    }
  };

  return (
    // perspective gives the 3‑D feel during rotation.
    <div
      ref={cardRef}
      className="group w-full h-full cursor-pointer [perspective:1000px]"
      onClick={handleClick}
    >
      {/* wrapper that actually rotates */}
      <div
        className={`relative w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        } group-hover:[transform:rotateY(180deg)]`}
      >
        {/* FRONT */}
        <div className="relative flex flex-col gap-2 rounded-lg bg-neutral-900/70 backdrop-blur-md border border-white/10 p-4 shadow-lg [backface-visibility:hidden]">
          <h3 className="text-lg font-semibold text-dark-text-white break-words">
            {code}
          </h3>
          <h4 className="text-base font-medium text-dark-text-white break-words">
            {name}
          </h4>
          <p className="text-sm text-dark-text-gray break-words">
            {description}
          </p>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 flex flex-col items-start justify-start gap-2 rounded-lg bg-neutral-900/70 backdrop-blur-md border border-white/10 p-4 shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-lg font-semibold mb-2 text-center text-dark-text-white whitespace-pre-wrap break-words">
            What I learnt
          </p>
          <p className="text-sm text-dark-text-gray whitespace-pre-wrap break-words">
            {whatILearnt}
          </p>
        </div>
      </div>
    </div>
  );
}
