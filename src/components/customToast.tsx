import { toast } from "sonner";

export const successToast = (
  message: string,
  action?: {
    level?: string;
    onClick?: () => void;
  }
) => {
  if (action) {
    toast.success(message, {
      className:
        "!bg-primary border !border-primary/80 !text-primary-foreground",
      position: "top-center",
      duration: 4000,
      action: {
        label: action.level,
        onClick: () => action.onClick && action.onClick(),
        actionButtonStyle: {
          backgroundColor: "white",
          color: "#22c55e",
          fontWeight: "bold",
        },
      },
    });
  } else {
    toast.success(message, {
      className:
        "!bg-primary border !border-primary/80 !text-primary-foreground",
      position: "top-center",
      duration: 4000,
    });
  }
};

export const errorToast = (message: string) =>
  toast.error(message, {
    className: "!bg-destructive border !border-red-500 !text-white",
    position: "top-center",
  });
