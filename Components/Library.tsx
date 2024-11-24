"use client";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import Image from "next/image";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { MediaItem } from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";

interface LibraryProps {
  songs: Song[];
}

export const Library: React.FC<LibraryProps> = ({ songs }) => {
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();
  const onPlay = useOnPlay(songs);
  const onClick = () => {
    console.log("Add song");
    if (!user) {
      return authModal.onOpen();
    }
    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className={"flex flex-col"}>
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400 " />
          <p className="text-neutral-400 font-medium text-md ">Your Library</p>
          <AiOutlinePlus
            onClick={onClick}
            size={20}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
      </div>
      <div className="pt-4">
        {songs.map((item) => (
          <MediaItem
            key={item.id}
            data={item}
            onClick={(id: string) => onPlay(id)}
          />
        ))}
      </div>
    </div>
  );
};
