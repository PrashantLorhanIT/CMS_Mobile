export const fallback = "en";
 //console.log('English json file', require('../language/ar.json'));
export const supportedLocales = {
    en: {
        name: "English",
        translationFileLoader: () => require('../language/ar.json'),
        // en is default locale in Moment
        momentLocaleLoader: () => Promise.resolve(),
    },
    ar: {
        name: "عربي",
        translationFileLoader: () => require('../language/en.json'),
       
      //  momentLocaleLoader: () => import('moment/locale/ar'),
    },
};

export const defaultNamespace = "common";

export const namespaces = [
    "common",
    "lists",
    "login",
    "Dashboard",
    "Correspondence",
    "Profile",
    "Search",
];