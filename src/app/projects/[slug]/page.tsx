import { notFound } from "next/navigation";
import { getProject, getAllProjects } from "@/lib/getProjects";
import { highlight } from "@/lib/highlight";
import Gallery from "@/components/gallery";
import Tag from "@/components/tag";
import React from "react";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const params = await props.params;
  const proj = getProject(params.slug);
  return proj ? { title: proj.title } : {};
}

export default async function ProjectPage(
  props: {
    params: Promise<Params>;
    searchParams: Promise<{ q?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const { slug } = await props.params;
  const qRaw = searchParams.q || "";
  const project = getProject(slug);
  if (!project) return notFound();

  const { title, tags, description, url, gallery } = project;

  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto mb-8 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold mt-6">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline inline-flex items-center"
        >
          {highlight(title, qRaw)}
          <svg
            fill="#ffffff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block ml-2 h-5 w-5"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M22,12v9a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V3A1,1,0,0,1,3,2h9a1,1,0,0,1,0,2H4V20H20V12a1,1,0,0,1,2,0Zm-.618-9.923A.991.991,0,0,0,21,2H16a1,1,0,0,0,0,2h2.586l-7.293,7.293a1,1,0,1,0,1.414,1.414L20,5.414V8a1,1,0,0,0,2,0V3a1.01,1.01,0,0,0-.077-.382A1,1,0,0,0,21.382,2.077Z"></path>
            </g>
          </svg>
        </a>
      </h1>

      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag key={t}>{highlight(t, qRaw)}</Tag>
        ))}
      </div>

      <Gallery items={gallery} />

      <p className="leading-relaxed text-lg">{highlight(description, qRaw)}</p>
    </div>
  );
}
