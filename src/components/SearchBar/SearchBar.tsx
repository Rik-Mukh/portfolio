"use client";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { search, SearchHit } from "@/lib/search";
import ResultItem from "./ResultItem";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [showShake, setShowShake] = useState(false);
  const [dropPos, setDropPos] = useState<{
    left: number;
    top: number;
    width: number;
  }>({ left: 0, top: 0, width: 0 });
  const [searched, setSearched] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLUListElement>(null);

  const runSearch = (value: string, viaSubmit: boolean = false) => {
    if (!value.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setTerm(value);
    const r = search(value);
    setResults(r);
    setSearched(true);

    if (viaSubmit && r.length === 0) {
      setShowShake(true);
      setTimeout(() => setShowShake(false), 500);
    }

    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setDropPos({ left: rect.left, top: rect.bottom, width: rect.width });
    }
  };

  // close dropdown on click outside search box *and* dropdown
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !boxRef.current?.contains(target) &&
        !dropRef.current?.contains(target)
      ) {
        setResults([]);
        setSearched(false);
        setActiveIndex(-1);
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  // debounce search while typing
  useEffect(() => {
    const id = setTimeout(() => {
      runSearch(term);
    }, 400); // 400 ms pause
    return () => clearTimeout(id);
  }, [term]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  return (
    <>
      <div ref={boxRef} className="w-[70%]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch(term, true);
          }}
          className={`flex flex-grow ${showShake ? "animate-shake" : ""}`}
        >
          <input
            type="text"
            placeholder="Search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="flex-grow min-w-0 px-3 py-1.5 sm:py-2 dark:bg-dark-bg-search bg-light-bg-search border border-dark-outline-search rounded-l-full text-white placeholder-[#757575] focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="flex-none flex items-center justify-center px-3 sm:px-4 bg-dark-bg-search-icon border border-dark-outline-search border-l-0 rounded-r-full"
          >
            <img
              src="/search-icon.svg"
              alt="Search"
              className="h-4 sm:h-5 md:h-6 w-auto"
            />
          </button>
        </form>
      </div>

      {searched &&
        results.length > 0 &&
        createPortal(
          <ul
            ref={dropRef}
            className="fixed z-[9999] max-h-80 overflow-auto rounded-md bg-dark-bg-search-icon shadow-lg"
            style={{
              left: dropPos.left,
              top: dropPos.top + 4,
              width: dropPos.width,
            }}
          >
            {results.map((hit, idx) => (
              <ResultItem
                key={hit.slug + hit.snippet}
                hit={hit}
                active={idx === activeIndex}
              />
            ))}
          </ul>,
          document.body
        )}

      {searched &&
        results.length === 0 &&
        createPortal(
          <div
            className="fixed z-[9999] px-3 py-2 rounded bg-red-600 text-sm text-white shadow-lg"
            style={{
              left: dropPos.left,
              top: dropPos.top + 4,
              width: dropPos.width,
            }}
          >
            No results found for&nbsp;<strong>{term}</strong>
          </div>,
          document.body
        )}
    </>
  );
}
