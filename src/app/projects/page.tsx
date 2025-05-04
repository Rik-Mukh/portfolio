import Link from "next/link";
import Video from "@/components/video";
import projectsData from "@/data/projects.json";
import slugify from "@/lib/slugify";

// TODO: Replace with my actual projects
export default function Projects() {
  return (
    <div className="mb-8 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
        {projectsData.map((project) => {
          const { title, thumbnail, tags } = project;
          const slug = slugify(title);
          return (
            <Link key={slug} href={`/projects/${slug}`} className="block">
              <Video data={[title, thumbnail, tags]} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
