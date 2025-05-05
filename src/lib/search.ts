import projects from "@/data/projects.json";
import courses from "@/data/courses.json";
import slugify from "@/lib/slugify";

export type SearchHit = {
  type: "project" | "course";
  title: string;
  slug: string; // destination (built from title or code)
  snippet: string; // text around the match (with context ellipses)
  match: string; // the exact substring that matched
};

export function search(term: string): SearchHit[] {
  const raw = term.trim();
  const q = raw.toLowerCase();
  if (!q) return [];

  // Returns both the snippet and the exact matched substring.
  const around = (text: string): { snippet: string; match: string } | null => {
    const lower = text.toLowerCase();
    const idx = lower.indexOf(q);
    if (idx === -1) return null;

    const start = Math.max(0, idx - 20);
    const end = Math.min(text.length, idx + q.length + 20);
    const before = text.slice(start, idx).trimStart();
    const hitText = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length, end).trimEnd();

    const prefix = start > 0 ? "… " : "";
    const suffix = end < text.length ? " …" : "";

    return {
      snippet: `${prefix}${before}${hitText}${after}${suffix}`,
      match: hitText,
    };
  };

  const hits: SearchHit[] = [];

  // Projects
  projects.forEach((p) => {
    // Title match
    if (p.title.toLowerCase().includes(q)) {
      hits.push({
        type: "project",
        title: p.title,
        slug: `/projects/${slugify(p.title)}?q=${encodeURIComponent(raw)}`,
        snippet: p.title,
        match: p.title.substring(
          p.title.toLowerCase().indexOf(q),
          p.title.toLowerCase().indexOf(q) + q.length
        ),
      });
      return;
    }

    // Tag match
    const matchedTag = p.tags.find((tag) => tag.toLowerCase().includes(q));
    if (matchedTag) {
      hits.push({
        type: "project",
        title: p.title,
        slug: `/projects/${slugify(p.title)}?q=${encodeURIComponent(raw)}`,
        snippet: matchedTag,
        match: matchedTag,
      });
      return;
    }

    // Description match
    const desc = around(p.description);
    if (desc) {
      hits.push({
        type: "project",
        title: p.title,
        slug: `/projects/${slugify(p.title)}?q=${encodeURIComponent(raw)}`,
        snippet: desc.snippet,
        match: desc.match,
      });
      return;
    }
  });

  // Courses
  courses.forEach((c) => {
    // Code match
    if (c.code.toLowerCase().includes(q)) {
      const idx = c.code.toLowerCase().indexOf(q);
      hits.push({
        type: "course",
        title: c.title,
        slug: `/courses?q=${encodeURIComponent(raw)}`,
        snippet: c.code,
        match: c.code.substring(idx, idx + q.length),
      });
      return;
    }

    // Title match
    if (c.title.toLowerCase().includes(q)) {
      const idx = c.title.toLowerCase().indexOf(q);
      hits.push({
        type: "course",
        title: c.title,
        slug: `/courses?q=${encodeURIComponent(raw)}`,
        snippet: c.title,
        match: c.title.substring(idx, idx + q.length),
      });
      return;
    }

    // Description match
    const desc = around(c.description);
    if (desc) {
      hits.push({
        type: "course",
        title: c.title,
        slug: `/courses?q=${encodeURIComponent(raw)}`,
        snippet: desc.snippet,
        match: desc.match,
      });
      return;
    }

    // Details match
    const details = around(c.details);
    if (details) {
      hits.push({
        type: "course",
        title: c.title,
        slug: `/courses?q=${encodeURIComponent(raw)}`,
        snippet: details.snippet,
        match: details.match,
      });
      return;
    }
  });

  return hits;
}
