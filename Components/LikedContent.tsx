"use client";

import { Song } from "@/types";
import React, { useEffect } from "react";
import { MediaItem } from "./MediaItem";
import { LikeButton } from "./LikeButton";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
  songs: Song[];
}

export const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  if (isLoading) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        Loading !!!
      </div>
    );
  }
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No liked songs available
      </div>
    );
  }

  const onPlay = useOnPlay(songs);
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
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
