"use client";
import { Box } from "@/Components/Box";
import { Button } from "@/Components/Button";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();
  return (
    <Box className="h-full flex items-center justify-center">
      <div className="flex flex-col justify-center text-center ">
        <div className="text-neutral-400 p-4">Something went wrong</div>
        <Button onClick={() => router.push("/")}>Return to home</Button>
      </div>
    </Box>
  );
};

export default Error;
