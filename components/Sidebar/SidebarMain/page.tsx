import clsx from "clsx";
import styles from "./sidebarMain.module.css";
import MenuLink from "./MenuLink";
import initTranslations from "@/app/i18n";
import MenuItems from "./MenuItems";

const i18Namespaces = ["sidebar"];

const SidebarMain = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, i18Namespaces);
  const menuItems = MenuItems(t);
  return (
    <div
      className={clsx(
        styles.container,
        locale === "fa" ? "pr-4 pl-1" : "pl-4 pr-1",
        "py-2 my-1 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
      )}
    >
      <ul className="flex flex-col gap-4">
        {menuItems.map((cat) => (
          <li key={cat.title} className="flex flex-col gap-0.5">
            <span
              className={clsx(
                "font-bold mb-0.5 text-sm",
                MenuItems.length > 10 && "text-[0.77rem]"
              )}
            >
              {cat.title}
            </span>
            <div
              className={`text-sm ${
                MenuItems.length > 10 && "text-[0.75rem]"
              } ${locale === "fa" ? "pr-3" : "pl-3"} flex flex-col gap-1`}
            >
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
