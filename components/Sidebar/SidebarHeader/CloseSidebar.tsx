"use client";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { useToggleSidebar } from "@/components/hooks/useSidebar";

const CloseSidebar = ({ locale }: { locale: string }) => {
  const { toggleSidebar } = useToggleSidebar();
  return (
    <div className="lg:hidden block cursor-pointer" onClick={toggleSidebar}>
      {locale === "fa" ? (
        <RiMenuUnfoldLine size={22} />
      ) : (
        <RiMenuFoldLine size={22} />
      )}
    </div>
  );
};

export default CloseSidebar;
