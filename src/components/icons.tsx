import { cn } from "@/lib/utils";

export const Icons = {
  logo: ({ className, ...props }: React.HTMLAttributes<SVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      className={cn("w-10 h-10", className)}
      {...props}
    >
      <path d="M25 5 L45 25 L25 45 L5 25 Z" fill="#2E7D32" />
      <path d="M25 15 L35 25 L25 35 L15 25 Z" fill="#4CAF50" />
    </svg>
  ),
};
