"use client";

import useGetSongById from "@/Hooks/useGetSongById";
import { useLoadSongUrl } from "@/Hooks/useLoadSongUrl";
import usePlayer from "@/Hooks/usePlayer";
import { Song } from "@/types";
import React from "react";
import { PlayerContent } from "./PlayerContent";

export const Player = () => {
  const player = usePlayer();

  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) return null;
  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};
