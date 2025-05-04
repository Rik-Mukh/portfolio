import React from "react";

interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <span
      className="
      inline-block
      px-3 py-1
      text-sm font-medium
      bg-gray-200 text-gray-800
      dark:bg-gray-700 dark:text-gray-100
      rounded-full
    "
    >
      {children}
    </span>
  );
}
