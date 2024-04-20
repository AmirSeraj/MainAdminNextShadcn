import { getSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import initTranslations from "@/app/i18n";
import Sidebar from "@/components/Sidebar/page";
import Navbar from "@/components/Navbar/page";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/providers/SidebarProvider";

const i18Namespaces = ["dashboard"];

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
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18Namespaces}
    >
      <SidebarProvider>
        <div className="flex" dir={locale === "fa" ? "rtl" : "ltr"}>
          {/* sidebar */}
          <Sidebar locale={locale} />

          {/* content */}
          <div className="flex flex-col w-full sm:p-5 p-2">
            <ThemeProvider attribute="class" enableSystem enableColorScheme>
              <Navbar />
              {children}
              {/* <Footer /> */}
            </ThemeProvider>
          </div>
        </div>
      </SidebarProvider>
    </TranslationsProvider>
  );
};

export default Layout;
