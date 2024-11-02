"use client";

import { useLoadImage } from "@/Hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
}
export const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  };

  const imageUrl = useLoadImage(data);

  return (
    <div
      onClick={handleClick}
      className="flex items-center group gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image
          fill
          src={imageUrl || "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate ">{data.title}</p>
        <p className=" text-neutral-400 text-sm  truncate">By {data.author}</p>
      </div>
    </div>
  );
};
