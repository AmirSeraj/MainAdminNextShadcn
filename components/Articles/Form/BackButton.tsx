import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
  className?: string;
}

const BackButton = ({ label, href, className }: BackButtonProps) => {
  return (
    <Button
      className="font-normal w-full no-underline"
      variant={"link"}
      size={"sm"}
      asChild
    >
      <Link href={href} className={className}>
        {label}
      </Link>
    </Button>
  );
};

export default BackButton;