"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import { MdPublic } from "react-icons/md";

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = () => {
    let lang = "";
    if (currentLocale === "fa") {
      lang = "en";
    } else {
      lang = "fa";
    }
    
    const newLocale = lang;
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <>
      <button onClick={handleChange} className="cursor-pointer">
        <MdPublic size={20} />
      </button>
      {/* {currentLocale === "fa" ? (
        <button
          onClick={() => handleChange("en")}
          className="border-b-2 px-3 border-blue-600 py-1"
        >
          English
        </button>
      ) : (
        <button
          onClick={() => handleChange("fa")}
          className="border-b-2 px-3 border-blue-600 py-1"
        >
          Farsi
        </button>
      )} */}
    </>
    // <Select label="Select Language" onChange={handleChange} className="w-[130px] text-xs">
    //   <SelectItem value="en">English</SelectItem>
    //   <SelectItem value="fa">Farsi</SelectItem>
    // </Select>

    // <select
    //   onChange={handleChange}
    //   value={currentLocale}
    //   className="block py-2.5 px-3 w-auto text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
    // >
    //   <option value="en">English</option>
    //   <option value="fa">Farsi</option>
    // </select>
  );
}
