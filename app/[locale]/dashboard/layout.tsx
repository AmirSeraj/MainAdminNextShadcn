import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import initTranslations from "@/app/i18n";
import Sidebar from "@/components/Sidebar/page";

const i18Namespaces = ["dashboard", "blog"];

const Layout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  }

  const { t, resources } = await initTranslations(locale, i18Namespaces);

  return (
    <div className="flex" dir={locale === "fa" ? "rtl" : "ltr"}>
      {/* sidebar */}
      <Sidebar locale={locale} />

      {/* content */}
      <div className="flex flex-col w-full">
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;
