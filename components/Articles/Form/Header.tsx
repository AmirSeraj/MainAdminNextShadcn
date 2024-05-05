import { Poppins } from "next/font/google";
import clsx from "clsx";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  title: string;
}

export const Header = ({ label, title }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={clsx("text-3xl font-semibold drop-shadow-xl", font)}>🔐 {title}</h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};