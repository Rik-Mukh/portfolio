import { notFound } from "next/navigation";
import { getProject, getAllProjects } from "@/lib/getProjects";
import Gallery from "@/components/gallery";
import Tag from "@/components/tag";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const params = await props.params;
  const proj = getProject(params.slug);
  return proj ? { title: proj.title } : {};
}

export default async function ProjectPage(props: { params: Promise<Params> }) {
  const params = await props.params;
  const project = getProject(params.slug);
  if (!project) return notFound();

  const { title, tags, description, url, gallery } = project;

  return (
    <div className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto mb-8 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold mt-6">{title}</h1>

      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <Gallery items={gallery} />

      <p className="leading-relaxed text-lg">{description}</p>

      {/* TODO: Change view on GitHub button */}
      <a
        href={url}
        target="_blank"
        className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
      >
        View on GitHub
      </a>
    </div>
  );
}
