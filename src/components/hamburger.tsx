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

export default function Hamburger() {
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
            <NavLink
              className="justify-start text-base font-medium cursor-pointer !rounded-button whitespace-nowrap text-gray-600"
              activeClass="text-[#2E7D32]"
              href="/"
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              className="justify-start text-base font-medium cursor-pointer !rounded-button whitespace-nowrap text-gray-600"
              activeClass="text-[#2E7D32]"
              href="/features"
            >
              Features
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              className="justify-start text-base font-medium cursor-pointer !rounded-button whitespace-nowrap text-gray-600"
              activeClass="text-[#2E7D32]"
              href="/chatbot"
            >
              Chatbot
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              className="justify-start text-base font-medium cursor-pointer !rounded-button whitespace-nowrap text-gray-600"
              activeClass="text-[#2E7D32]"
              href="/support"
            >
              Support
            </NavLink>
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
