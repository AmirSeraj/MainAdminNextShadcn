"use client";
import clsx from "clsx";
import React from "react";
import styles from "./sidebar.module.css";
import { useToggleSidebar } from "../hooks/useSidebar";

const SidebarContainer = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  const { sidebarVisible } = useToggleSidebar();
  return (
    <div
      className={clsx(
        styles.container,
        "flex bg-gradient-to-b pt-3 from-[#dcdcec] via-[#b96a86] to-[#9154ce] dark:from-[#52525c] dark:via-[#5f0726] dark:to-[#301051]",
        locale === 'en' && (sidebarVisible ? "translate-x-0" : "-translate-x-full"),
        locale === 'fa' && (sidebarVisible ? "translate-x-0" : "translate-x-full"),
        "lg:static absolute transition-transform duration-1000 lg:translate-x-0",
        locale === 'fa' ? 'right-0' : 'left-0'
      )}
    >
      {children}
    </div>
  );
};

export default SidebarContainer;
