"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/modal";

interface ImagePreviewProps {
  imageUrl: string;
  thumbnailSize?: {
    width: number;
    height: number;
  };
  modalSize?: {
    width: number;
    height: number;
  };
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  imageUrl,
  thumbnailSize = { width: 500, height: 300 },
  modalSize = { width: 1024, height: 768 }
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="relative aspect-video w-full max-w-2xl mx-auto">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Uploaded crop for analysis"
          width={thumbnailSize.width}
          height={thumbnailSize.height}
          className="w-full h-full rounded-lg object-contain border border-green-100 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={openModal}
          priority
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Image Preview">
        <div className="relative max-h-[80vh] w-full">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt="Uploaded crop for analysis"
            width={modalSize.width}
            height={modalSize.height}
            className="w-full h-full rounded-lg object-contain border border-green-100"
            quality={100}
            priority
          />
        </div>
      </Modal>
    </>
  );
};

export default ImagePreview;