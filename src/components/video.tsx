"use client";
type VideoData = [string, string, string[]];

export default function Video({ data }: { data: VideoData }) {
  const [title, thumbnail, tags] = data;

  return (
    <div className="flex flex-col w-full">
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="w-full aspect-video object-cover rounded-md"
      />

      {/* Title */}
      <p className="mt-1 text-sm font-medium text-dark-text-white truncate">
        {title}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <p className="text-xs text-dark-text-gray">{tags.join(", ")}</p>
      )}
    </div>
  );
}
