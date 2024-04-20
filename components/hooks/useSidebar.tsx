'use client'
import { useContext } from "react";
import { SidebarContext } from "../providers/SidebarProvider";

export const useToggleSidebar = () => useContext(SidebarContext);
