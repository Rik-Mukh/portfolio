"use client";
import Link from "next/link";
import { SearchHit } from "@/lib/search";
import projectsData from "@/data/projects.json";
import coursesData from "@/data/courses.json";

export default function ResultItem({
  hit,
  active = false,
}: {
  hit: SearchHit;
  active?: boolean;
}) {
  // Find full data for projects or courses
  const project =
    hit.type === "project"
      ? projectsData.find((p) => p.title === hit.title)
      : undefined;
  const course =
    hit.type === "course"
      ? coursesData.find((c) => c.title === hit.title)
      : undefined;

  return (
    <li>
      <Link
        href={hit.slug}
        className={`block px-3 py-2 text-sm hover:bg-dark-primary/20 ${
          active ? "bg-dark-primary/40" : ""
        }`}
      >
        {hit.type === "project" && project && (
          <>
            {/* Project Title */}
            <div className="font-semibold">{project.title}</div>

            {/* Tags */}
            <div className="text-xs text-gray-500 mb-1">
              {project.tags.join(", ")}
            </div>

            {/* Snippet (description only, not tag matches) */}
            {hit.snippet && hit.snippet !== project.title && !project.tags.includes(hit.snippet) && (
              <div className="text-xs text-gray-400">{hit.snippet}</div>
            )}
          </>
        )}

        {hit.type === "course" && course && (
          <>
            {/* Course Code & Title */}
            <div className="font-semibold">
              {course.code} - {course.title}
            </div>

            {/* Snippet (description/details) */}
            {hit.snippet &&
              hit.snippet !== course.code &&
              hit.snippet !== course.title && (
                <div className="text-xs text-gray-400">{hit.snippet}</div>
              )}
          </>
        )}
      </Link>
    </li>
  );
}
