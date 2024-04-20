import React from "react";
import SidebarHeader from "./SidebarHeader/page";
import SidebarMain from "./SidebarMain/page";
import SidebarFooter from "./SidebarFooter/page";
import SidebarContainer from "./SidebarContainer";
const Sidebar = ({ locale }: { locale: string }) => {
  return (
    <SidebarContainer locale={locale}>
      <SidebarHeader siteName="Acme" locale={locale} />
      <SidebarMain locale={locale} />
      <SidebarFooter locale={locale} />
    </SidebarContainer>
  );
};

export default Sidebar;
