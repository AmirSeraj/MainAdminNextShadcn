"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { MdOutlineLightMode, MdNightlight } from "react-icons/md";

const ModeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <>
      {theme === "dark" ? (
        <div className="cursor-pointer" onClick={() => setTheme("light")}>
          <MdOutlineLightMode size={22} />
        </div>
      ) : (
        <div className="cursor-pointer" onClick={() => setTheme("dark")}>
          <MdNightlight size={22} />
        </div>
      )}
    </>
  );
};

export default ModeToggle;
