import { Song } from "@/types";
import { createClient } from "@/server";
import { cookies } from "next/headers";

export const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from("likedsongs")
    .select("*, songs(*)")
    .eq("user_id", session?.user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  if (!data) {
    return [];
  }
  return data.map((item) => ({ ...item.songs }));
};
