"use client";
import Image from 'next/image'

type VideoData = [string, string, string[]];

export default function Video({ data }: { data: VideoData }) {
  const [title, thumbnail, tags] = data;

  return (
    <div className="flex flex-col w-full">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

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
