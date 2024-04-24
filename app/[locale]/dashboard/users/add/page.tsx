import initTranslations from "@/app/i18n";
import AddUser from "@/components/Users/AddUser";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import React from "react";

const i18Namespaces = ["users"];

const AddUserPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t, resources } = await initTranslations(locale, i18Namespaces);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18Namespaces}
    >
      <AddUser />
    </TranslationsProvider>
  );
};

export default AddUserPage;
