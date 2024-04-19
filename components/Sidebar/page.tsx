import clsx from "clsx";
import React from "react";
import styles from "./sidebar.module.css";
import SidebarHeader from "./SidebarHeader/page";
import SidebarMain from "./SidebarMain/page";
import SidebarFooter from "./SidebarFooter/page";

const Sidebar = ({ locale }: { locale: string }) => {
  return (
    <div
      className={clsx(
        styles.container,
        "lg:flex hidden bg-gradient-to-b from-[#52525c] via-[#5f0726] to-[#301051]"
      )}
    >
      <SidebarHeader />
      <SidebarMain />
      <SidebarFooter locale={locale} />
    </div>
  );
};

export default Sidebar;
