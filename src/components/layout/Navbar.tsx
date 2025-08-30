"use client";
import { Button } from "@/components/ui/button";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hamburger from "./Hamburger";
import NavLink from "../ui/navlink";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import * as Avatar from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/redux/features/user/userApiSlice";

export interface NavItems {
  id: string;
  href: string;
  label: string;
}

const Navbar: React.FC = () => {
  const navItems: NavItems[] = [
    { id: "home", href: "/", label: "Home" },
    {
      id: "crop-suggestions",
      href: "/crop-suggestions",
      label: "Crop Suggestions",
    },
    {
      id: "disease-detection",
      href: "/disease-detection",
      label: "Disease Detection",
    },
    { id: "chatbot", href: "/chatbot", label: "Chatbot" },
    { id: "support", href: "/support", label: "Support" },
  ];
  const userState = useSelector((state: RootState) => state.user);
  const [logout] = useLogoutMutation();
  const logoutHandler = async () => {
    await logout({});
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto max-w-7xl">
        <div className="flex items-center space-x-2">
          <Image
            src="https://readdy.ai/api/search-image?query=A%20minimalist%20logo%20for%20Matir%20Sathi%20agricultural%20platform%20with%20a%20simple%20leaf%20or%20plant%20sprout%20icon%20in%20green%20and%20brown%20earthy%20tones%2C%20modern%20clean%20design%20suitable%20for%20an%20app%20icon%2C%20transparent%20background%2C%20professional&width=50&height=50&seq=1&orientation=squarish"
            alt="eFlora Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-xl font-bold text-primary">eFlora</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              href={item.href || "/"}
              className={`text-base font-medium text-muted-foreground cursor-pointer !rounded-button whitespace-nowrap`}
              activeClass="text-primary"
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-x-4">
          <Button
            variant="outline"
            className="hidden md:flex items-center space-x-2 border-primary text-primary hover:bg-primary/10 cursor-pointer !rounded-button whitespace-nowrap"
          >
            <FontAwesomeIcon icon={faGlobe} className="text-sm" />
            <span>English</span>
          </Button>

          {userState?.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative size-8 rounded-full border data-[state=open]:bg-muted cursor-pointer"
                >
                  <Avatar.Avatar className="size-8">
                    <Avatar.AvatarImage
                      src={userState?.user?.profileImage}
                      alt={userState.user?.name}
                    />
                    <Avatar.AvatarFallback>
                      {userState.user?.name[0] || "U"}
                    </Avatar.AvatarFallback>
                  </Avatar.Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              className="bg-primary hover:bg-primary/80 text-white cursor-pointer !rounded-button whitespace-nowrap"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          )}

          <Hamburger navItems={navItems} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
