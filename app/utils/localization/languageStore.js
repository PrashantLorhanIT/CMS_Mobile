// import I18n from 'i18next';
// import { reactI18nextModule } from 'react-i18next';
// import locale from 'react-native-locale-detector';
 import { AsyncStorage } from 'react-native';

 const STORAGE_KEY = 'SelectedLanguage'

 class LanguageStore {
async saveToStoreLanguage(language) {
    this.guardAgainstUnspecifiedList();

    try {
        await AsyncStorage.setItem(STORAGE_KEY, language)
   
  } catch (e) {

    alert('Failed to save the data to the storage')
  }
}

    async getToStoreLanguage  ()  {

    try {
      const language = await AsyncStorage.getItem(STORAGE_KEY)
  
      if (language !== null) {

        return language;

      } else {
          
         return 
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
 }
 export default LanguageStore;


// import en from './en.json';
// import ar from './ar.json';

// const STORAGE_KEY = '@APP:languageCode';

// // creating a language detection plugin using expo
// // http://i18n.com/docs/ownplugin/#languagedetector
// const languageDetector = {
//     init: Function.prototype,
//     type: 'languageDetector',
//     async: true, // flags below detection to be async
//     detect: async (callback) => {
//         const savedDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
//         const lng = (savedDataJSON) ? savedDataJSON: null;
//         const selectLanguage = lng || locale;
//         console.log('detect - selectLanguage:', selectLanguage);
//         callback(selectLanguage);
//     },
//     cacheUserLanguage: () => {}
// };

// I18n
//     .use(languageDetector)
//     .use(reactI18nextModule)
//   .init({
//     fallbackLng: 'en',
//     resources: { en, ar},

//     // have a common namespace used around the full app
//     ns: ['common'],
//     defaultNS: 'common',

//     debug: true,

//   //   cache: {
//      //  enabled: true
//     // },

//     interpolation: {
//       escapeValue: false, // not needed for react as it does escape per default to prevent xss!
//     }
//   });


// export default I18n;