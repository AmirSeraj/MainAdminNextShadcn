"use client";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { MdNotifications, MdOutlineChat } from "react-icons/md";
import LanguageChanger from "@/components/SettingComp/LanguageChanger";
import ModeToggle from "../SettingComp/ThemeChanger";
import { usePathname } from "next/navigation";
import { useToggleSidebar } from "../hooks/useSidebar";

const Navbar = () => {
  const pathname = usePathname();
  const { toggleSidebar } = useToggleSidebar();
  return (
    <div className="w-full py-6 sm:px-6 px-3 flex justify-between items-center bg-gray-500 rounded-md">
      <div className="flex items-center sm:gap-3 gap-1">
        <div className="cursor-pointer lg:hidden block" onClick={toggleSidebar}>
          <RiMenuUnfoldLine size={22} />
        </div>
        <p className="sm:mx-2 mx-1 capitalize sm:text-base text-sm">
          {pathname.split("/").pop()}
        </p>
      </div>
      <div className="flex items-center sm:gap-3 gap-1">
        <MdOutlineChat size={20} />
        <MdNotifications size={20} />
        <LanguageChanger />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
