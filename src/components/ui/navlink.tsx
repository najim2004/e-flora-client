"use client";

import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<LinkProps, "href"> {
  children: ReactNode;
  href: string;
  className?: string;
  activeClass?: string;
}

const NavLink = ({
  children,
  href,
  className = "",
  activeClass = "",
  ...props
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClass)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
