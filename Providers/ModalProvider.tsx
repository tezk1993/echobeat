"use client";

import { AuthModal } from "@/Components/AuthModal";
import SubscribeModal from "@/Components/SubscribeModal";
import { UploadModal } from "@/Components/UploadModal";
import { ProductWithPrice } from "@/types";
import React, { useEffect, useState } from "react";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
};
