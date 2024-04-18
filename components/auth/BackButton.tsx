import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
}

const BackButton = ({ label, href }: BackButtonProps) => {
  return (
    <Button
      className="font-normal w-full no-underline"
      variant={"link"}
      size={"sm"}
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
};

export default BackButton;
