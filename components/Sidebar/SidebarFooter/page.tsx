import { logout } from "@/lib/actions";
import { IoExitOutline } from "react-icons/io5";
import initTranslations from "@/app/i18n";

const i18Namespaces = ["sidebar"];

const SidebarFooter = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, i18Namespaces);
  return (
    <form action={logout} className="flex items-center gap-2">
      <div className={locale === "fa" && "rotate-180"}>
        <IoExitOutline size={22} color="white" />
      </div>
      <button className="text-lg text-[#f0f0f0]">
        {locale === "fa" ? "خروج" : "Exit"}
      </button>
    </form>
  );
};

export default SidebarFooter;
