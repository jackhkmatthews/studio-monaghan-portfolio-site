"use client";

import { ClientImage } from "@/components/client-image";
import { ComponentProps, useRef, useEffect } from "react";

type ImageLightboxProps = ComponentProps<typeof ClientImage>;

export function ImageLightbox({
  className,
  ...imageProps
}: ImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleImageClick = () => {
    dialogRef.current?.showModal();
  };

  const handleBackdropClick = () => {
    // Only close if clicking the backdrop (the dialog element itself)
    dialogRef.current?.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Prevent body scroll when dialog is open
    const handleOpen = () => {
      document.body.style.overflow = "hidden";
    };

    const handleClose = () => {
      document.body.style.overflow = "";
    };

    dialog.addEventListener("open", handleOpen);
    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("open", handleOpen);
      dialog.removeEventListener("close", handleClose);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <ClientImage
        {...imageProps}
        className={className}
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="w-[95vw] h-[95vh] p-0 bg-transparent backdrop:bg-black/80 backdrop:backdrop-blur-sm m-auto outline-none"
      >
        <ClientImage
          {...imageProps}
          sizes="100vw"
          onClick={handleBackdropClick}
          className="w-full h-full object-contain focus:outline-none"
        />
      </dialog>
    </>
  );
}
