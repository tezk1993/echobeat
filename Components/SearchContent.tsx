"use client";

import { SongCard } from "@/app/(site)/Components/SongCard";
import { Song } from "@/types";
import React from "react";
import { MediaItem } from "./MediaItem";
import { LikeButton } from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
}

export const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs available
      </div>
    );
  }
  const onPlay = useOnPlay(songs);
  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        // <SongCard key={item.id} onClick={() => {}} data={item} />
        <div key={song.id} className=" flex items-center gap-x-4 w-full ">
          <div className="flex-1">
            <MediaItem data={song} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};
