import { faBars, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NavLink from "./ui/navlink";
import { NavItems } from "./Navbar";

interface HamburgerProps {
  navItems: NavItems[];
}

export default function Hamburger({ navItems }: HamburgerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden text-gray-700 cursor-pointer !rounded-button whitespace-nowrap"
          id="mobile-menu-button"
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[280px] p-0">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-[#2E7D32]">
              Menu
            </SheetTitle>
          </div>
        </SheetHeader>
        <nav className="p-4">
          <div className="flex flex-col space-y-4">
            {navItems?.map((item) => (
              <NavLink
                key={item.id}
                href={item.href || "/"}
                className="justify-start text-base font-medium cursor-pointer !rounded-button whitespace-nowrap text-gray-600"
                activeClass="text-[#2E7D32]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Separator className="my-4" />
            <Button
              variant="outline"
              className="justify-start border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] cursor-pointer !rounded-button whitespace-nowrap"
            >
              <FontAwesomeIcon icon={faGlobe} className="text-sm mr-2" />
              English
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
