import { toast } from "sonner";

export const errorToast = (message: string) =>
  toast.error(message, {
    className: "!bg-destructive border !border-red-500 !text-white",
    position: "top-center",
  });

export const successToast = (message: string) =>
  toast.success(message, {
    className: "!bg-primary border !border-primary/80 !text-primary-foreground",
    position: "top-center",
  });
