///****App router i18next (internationalization)

///1-installation:
//npm i i18next react-i18next i18next-resources-to-backend next-i18n-router

//2-file creation:
//at the root of your rpoject create a file called (i18nConfig.js)

//i18nConfig.js:
const i18nConfig = {
  locales: ["en", "fa"],
  defaultLocale: "en",
  prefixdefault: true, ///if you want to add en at url.
};

module.exports = i18nConfig;

///this is some thing like this ==> '/en/about-us' , '/fa/about-us'

//3. create folder locale and put all pages in this folder.: [locale]

//4. create a folder called middleware.js at the root of project:
//middleware.js:

import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export function middleware(request) {
  return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};

//5. go to: https://app.i18nexus.com/ 
//create a project, watch video from: 10:00 ~ 14:00

//for exporting click on Export copy Project Api Key and paste it in .env file I18NEXUS_API_KEY 
//and then run this command: (npm install i18nexus-cli -g) and then run: (i18nexus pull) ==> this create 
//a folder named locales in main root.

//6. in package.json:
"scripts": {
  "dev": "i18nexus pull && next dev",
  "build": "i18nexus pull && next build",
  "start": "i18nexus pull && next start",
  "lint": "next lint"
},

//7. and then run: npm i i18nexus-cli --save-dev

//8. make a js file in app directory: i18n.js: (settings for i18n to be used in server component)
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '@/i18nConfig';

export default async function initTranslations(
  locale,
  namespaces,
  i18nInstance,
  resources
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language, namespace) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  };
}

//in server-side components: 

