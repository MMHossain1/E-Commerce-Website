"use client";

import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [order, setOrder] = useState(() => images.map((_, i) => i));

  const swapToMain = (thumbPos: number) => {
    setOrder((prev) => {
      const next = [...prev];
      [next[0], next[thumbPos + 1]] = [next[thumbPos + 1], next[0]];
      return next;
    });
  };

  const main = images[order[0]];
  const thumbs = order.slice(1).map((i) => images[i]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Main image */}
      <div className="col-span-2 aspect-square bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <img
          src={main.src}
          alt={main.alt}
          className="w-full h-full object-cover transition-all duration-500"
        />
      </div>

      {/* Thumbnails */}
      {thumbs.map((img, i) => (
        <button
          key={i}
          onClick={() => swapToMain(i)}
          className="aspect-square bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:ring-2 hover:ring-secondary/40 transition-all"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </button>
      ))}
    </div>
  );
}
