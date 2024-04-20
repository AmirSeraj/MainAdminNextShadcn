'use client'
import { RiMenuFoldLine } from "react-icons/ri";
import { useToggleSidebar } from "@/components/hooks/useSidebar";

const CloseSidebar = () => {
  const { toggleSidebar } = useToggleSidebar();
  return (
    <div className="lg:hidden block cursor-pointer" onClick={toggleSidebar}>
      <RiMenuFoldLine size={22} />
    </div>
  );
};

export default CloseSidebar;
