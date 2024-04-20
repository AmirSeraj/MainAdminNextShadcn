import clsx from "clsx";
import styles from "./sidebarMain.module.css";
import { MenuItems } from "./MenuItems";
import MenuLink from "./MenuLink";

const SidebarMain = ({ locale }: { locale: string }) => {
  return (
    <div
      className={clsx(
        styles.container,
        "shadow-[inset_-12px_-8px_40px_#46464620]"
      )}
    >
      <ul className="px-2 flex flex-col gap-4">
        {MenuItems.map((cat) => (
          <li key={cat.title} className="flex flex-col gap-1">
            <span className="font-bold mb-1">{cat.title}</span>
            <div className="px-3 flex flex-col gap-2">
              {cat.list.map((item) => (
                <MenuLink item={item} locale={locale} />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMain;
