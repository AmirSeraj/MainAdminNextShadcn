import { SiteIcon } from "@/components/SvgIcons";
import { getSession } from "@/lib/actions";
import { FaUserShield } from "react-icons/fa";
import Image from "next/image";
import React from "react";

const SidebarHeader = async () => {
  const session = await getSession();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <SiteIcon />
        <p className="text-small font-bold uppercase text-[#ecedee]">Acme</p>
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
        <p className="capitalize text-white font-thin">{session?.user?.name}</p>
      </div>
    </div>
  );
};

export default SidebarHeader;
