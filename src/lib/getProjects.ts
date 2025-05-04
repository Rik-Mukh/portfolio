import raw from "@/data/projects.json";
import slugify from "@/lib/slugify";

export type Project = {
  title: string;
  tags: string[];
  thumbnail: string;
  description: string;
  url: string;
  gallery: { type: "image" | "video"; src: string }[];
};

const projects: (Project & { slug: string })[] = (
  raw as Array<
    Omit<Project, "gallery"> & {
      gallery: { type: string; src: string }[];
    }
  >
).map((p) => ({
  ...p,
  // ensure gallery.type narrows to "image" | "video"
  gallery: p.gallery.map((item) => ({
    ...item,
    type: (item.type === "video" ? "video" : "image") as "video" | "image",
  })),
  slug: slugify(p.title),
}));

export function getAllProjects() {
  return projects;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
