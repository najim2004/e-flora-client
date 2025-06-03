import { toast } from "sonner";

export const errorToast = (message: string) =>
  toast.error(message, {
    className: "!bg-destructive border !border-red-500 !text-white",
    position: "top-center",
  });
