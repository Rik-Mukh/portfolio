"use client";
import Link from "next/link";
import { SearchHit } from "@/lib/search";
import projectsData from "@/data/projects.json";
import coursesData from "@/data/courses.json";
import slugify from "@/lib/slugify";

export default function ResultItem({
  hit,
  active = false,
}: {
  hit: SearchHit;
  active?: boolean;
}) {
  const slugVal = hit.slug.split("/").pop() || "";
  if (hit.type === "project") {
    const project = projectsData.find((p) => slugify(p.title) === slugVal);
    return (
      <li>
        <Link
          href={hit.slug}
          className={`block px-3 py-2 hover:bg-dark-primary/20 text-sm ${
            active ? "bg-dark-primary/40" : ""
          }`}
        >
          {/* Title */}
          <div className="font-semibold">
            {hit.match.toLowerCase() === project?.title.toLowerCase() ? (
              <mark>{project.title}</mark>
            ) : (
              project?.title
            )}
          </div>

          {/* Tags (comma-separated) */}
          <div className="text-xs text-gray-500 mb-1">
            {project?.tags.join(", ")}
          </div>

          {/* Description snippet */}
          {hit.snippet !== project?.title &&
            !project?.tags.includes(hit.snippet) && (
              <div className="text-xs text-gray-400">{hit.snippet}</div>
            )}
        </Link>
      </li>
    );
  } else {
    // Course result
    const course = coursesData.find(
      (c) => c.title === hit.title || c.code === hit.snippet
    );
    return (
      <li>
        <Link
          href={hit.slug}
          className={`block px-3 py-2 hover:bg-dark-primary/20 text-sm ${
            active ? "bg-dark-primary/40" : ""
          }`}
        >
          {/* Code and Title */}
          <div className="font-semibold">
            {hit.match.toLowerCase() === course?.code.toLowerCase() ? (
              <mark>{course.code}</mark>
            ) : (
              course?.code
            )}{" "}
            -{" "}
            {hit.match.toLowerCase() === course?.title.toLowerCase() ? (
              <mark>{course.title}</mark>
            ) : (
              course?.title
            )}
          </div>

          {/* Description/Details snippet */}
          {hit.snippet !== course?.code && hit.snippet !== course?.title && (
            <div className="text-xs text-gray-400">{hit.snippet}</div>
          )}
        </Link>
      </li>
    );
  }
}
