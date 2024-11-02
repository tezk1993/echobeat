import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import uniqid from "uniqid";

import useUploadModal from "@/Hooks/useUploadModal";
import { Input } from "./Input";
import { Button } from "./Button";
import { useUser } from "@/Hooks/useUser";

export const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onClose, isOpen } = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const uploadForm = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      iamge: null,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uid = uniqid();

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uid}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        console.log(songError.message);
        return toast.error("Failed song upload.");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${values.title}-${uid}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);

        return toast.error("Failed image upload.");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song Uploaded !");
      uploadForm.reset();
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      uploadForm.reset();
      onClose();
    }
  };

  return (
    <Modal
      title="Add A Song"
      description="Upload a audio file"
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={uploadForm.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...uploadForm.register("title", { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...uploadForm.register("author", { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept="audio/*"
            disabled={isLoading}
            {...uploadForm.register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select an Image</div>
          <Input
            id="image"
            type="file"
            accept="image/*"
            disabled={isLoading}
            {...uploadForm.register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Upload Song
        </Button>
      </form>
    </Modal>
  );
};
