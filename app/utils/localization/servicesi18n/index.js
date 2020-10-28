import i18next from 'i18next';
import { I18nManager as RNI18nManager } from 'react-native';
import {initReactI18next } from 'react-i18next';
import * as config from '../config/i18n';

import date from './date';
import languageDetector from './languageDetector';
import translationLoader from './translationLoader';
import en from '../language/en.json';
import ar from '../language/ar.json';
console.log('Tansaltion i18n file index ');
console.log('Tansaltion i18n file index language detector ');

console.log(languageDetector);
console.log('Tansaltion i18n file index transalation detector ');
console.log(translationLoader);

const i18n = {

    init: () => {
       
        return new Promise((resolve, reject) => {
             console.log('Tansaltion loader file index');
             console.log(languageDetector);
             console.log(translationLoader);
            i18next
                .use(languageDetector)
                .use(initReactI18next)
                .init({
                    fallbackLng: config.fallback,
                    resources:{en, ar},
                    ns: config.namespaces,
                    defaultNS: config.defaultNamespace,
                    debug:false,
                    interpolation: {
                        escapeValue: false,
                        format(value, format) {
                            if (value instanceof Date) {
                                return date.format(value, format);
                            }
                        }
                    },
                }, (error) => {
                    if (error) { return reject(error); }

                    date.init(i18next.language)
                        .then(resolve)
                        .catch(error => reject(error));
                });
        });
    },

    /**
     * @param {string} key
     * @param {Object} options
     * @returns {string}
     */
    
    t: (key, options) => i18next.t(key, options),
    

    /**
     * @returns {string}
     */
    get locale() { return i18next.language; },

    /**
     * @returns {'LTR' | 'RTL'}
     */
    get dir() {
        return i18next.dir().toUpperCase();
    },

    /**
     * @returns {boolean}
     */
    get isRTL() {
        return RNI18nManager.isRTL;
    },

    /**
     * @param {Object<string,mixed>} map
     * @returns {mixed}
     */
    select(map) {
        //console.log('Language transaliation i18n file select lanhayge RTL method');
        const key = this.isRTL ? 'rtl' : 'ltr';
        console.log(key);
        return map[key];
    }
};

export const t = i18n.t;

export default i18n;