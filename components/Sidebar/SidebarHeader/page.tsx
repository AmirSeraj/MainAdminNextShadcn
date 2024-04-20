import { SiteIcon } from "@/components/SvgIcons";
import { getSession } from "@/lib/actions";
import { FaUserShield } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import CloseSidebar from "./CloseSidebar";

const SidebarHeader = async ({
  siteName,
  locale,
}: {
  siteName: string;
  locale: string;
}) => {
  const session = await getSession();

  return (
    <div className="flex flex-col gap-2 mb-2 py-1 px-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <SiteIcon />
          <p className="text-small font-bold uppercase">{siteName}</p>
        </div>
        <CloseSidebar locale={locale} />
      </div>
      <div className="flex gap-2 items-center">
        {session?.user?.image ? (
          <Image
            alt="userImg"
            width={40}
            height={40}
            src={session?.user?.image}
          />
        ) : (
          <FaUserShield size={30} className="ml-2" />
        )}
        <p className="capitalize">{session?.user?.name}</p>
      </div>
    </div>
  );
};

export default SidebarHeader;
