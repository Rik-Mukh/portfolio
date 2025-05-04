"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Gallery({
  items,
}: {
  items: { type: "image" | "video"; src: string }[];
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // helpers
  const isYouTube = (url: string) =>
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)/.test(url);

  const getYouTubeEmbed = (url: string) => {
    const idMatch =
      url.match(/youtube\.com\/watch\?v=([^&]+)/) ||
      url.match(/youtu\.be\/([^?&]+)/);
    return idMatch ? `https://www.youtube.com/embed/${idMatch[1]}` : url;
  };

  const isRemote = (url: string) => /^https?:\/\//.test(url);

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {items.map((item, idx) => (
          <div key={idx}>
            {item.type === "image" ? (
              isRemote(item.src) ? (
                <img
                  src={item.src}
                  alt=""
                  className="rounded shadow max-w-full h-auto"
                />
              ) : (
                <Image
                  src={item.src}
                  alt=""
                  width={960}
                  height={540}
                  className="rounded shadow"
                />
              )
            ) : isYouTube(item.src) ? (
              <iframe
                src={getYouTubeEmbed(item.src)}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full aspect-video rounded shadow"
              />
            ) : (
              <video
                src={item.src}
                controls
                className="rounded shadow w-full max-h-[540px]"
              />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}
