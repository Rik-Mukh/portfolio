// highlight search term if present
"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { highlight } from "@/lib/highlight";
type CourseData = [string, string, string, string];

const COURSE_FLIP_EVENT = "course-flip";

export default function Course({ data }: { data: CourseData }) {
  const [code, name, description, whatILearnt] = data;
  // highlight search term if present
  const searchParams = useSearchParams();
  const qRaw = searchParams.get("q") || "";

  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-flip card if search term appears in the back content
  useEffect(() => {
    if (qRaw && whatILearnt.toLowerCase().includes(qRaw.toLowerCase())) {
      setFlipped(true);
      // Notify other cards to close
      window.dispatchEvent(
        new CustomEvent(COURSE_FLIP_EVENT, { detail: code })
      );
    }
  }, [qRaw, whatILearnt, code]);

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
      if (window.innerWidth >= 640) return;
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

    // Toggle flip state on click for all screen sizes
    const newState = !flipped;
    setFlipped(newState);

    // Notify other cards to close when opening
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
            {highlight(code, qRaw)}
          </h3>
          <h4 className="text-base font-medium text-dark-text-white break-words">
            {highlight(name, qRaw)}
          </h4>
          <p className="text-sm text-dark-text-gray break-words">
            {highlight(description, qRaw)}
          </p>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 flex flex-col items-start justify-start gap-2 rounded-lg bg-neutral-900/70 backdrop-blur-md border border-white/10 p-4 shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-lg font-semibold mb-2 text-center text-dark-text-white whitespace-pre-wrap break-words">
            What I learnt
          </p>
          <p className="text-sm text-dark-text-gray whitespace-pre-wrap break-words">
            {highlight(whatILearnt, qRaw)}
          </p>
        </div>
      </div>
    </div>
  );
}
