'use client'
import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";
import styles from "./sidebarMain.module.css";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface MenuLinkProps {
  item: {
    path: string;
    icon: React.ReactNode;
    title: string;
  };
  locale: string;
}

const MenuLink = ({ item, locale }: MenuLinkProps) => {
  const pathname = usePathname();
  
  return (
    <Link href={item.path} className={clsx(styles.menuLink, ((pathname === item.path) || (pathname === '/fa' + item.path)) && styles.active)}>
      <div className={styles.title}>
        {item.icon}
        {item.title}
      </div>
      <div className={clsx(styles.icon, locale === 'fa' && 'rotate-180')}>
        <MdArrowForwardIos size={12} />
      </div>
    </Link>
  );
};

export default MenuLink;
