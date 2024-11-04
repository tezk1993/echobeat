"use client";
import { PlayButton } from "@/Components/PlayButton";
import { useLoadImage } from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";
interface SongCardProps {
  data: Song;
  onClick: (id: string) => void;
}

export const SongCard: React.FC<SongCardProps> = ({ data, onClick }) => {
  const { author, title } = data;
  const imagePath = useLoadImage(data);
  return (
    <div
      onClick={() => onClick(data.id)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-1"
    >
      <div className="relative aspect-square w-full h-full overflow-hidden rounded-md ">
        <Image
          src={imagePath || ""}
          fill
          className="object-cover"
          alt={`${data.title}-image`}
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{title}</p>
        <p className=" text-neutral-400 text-sm pb-4 w-full truncate">
          By {author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5 ">
        <PlayButton />
      </div>
    </div>
  );
};
