// import Localization from 'react-native-locale-detector';
import{ AsyncStorage, 
    NativeModules, 
    Platform , 
    I18nManager as RNI18nManager
} from 'react-native';

const STORAGE_KEY = '@App:languageCode';
const languageDetector = {
    init:() => {},
    type: 'languageDetector',
    async: true,
    detect: async callback => {
        const savedDataJson = await AsyncStorage.getItem(STORAGE_KEY);
        const lng = savedDataJson ? savedDataJson: null;

        const deviceLocal = 
        Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale : NativeModules.I18nManager.localIdentifier;
                            
        let local = 'en';
        if(!deviceLocal) {
            local = split(deviceLocal, '_', 1)[0];
        }
        // We will get back a string like "en-US". We
        // return a string like "en" to match our language
        // files.
        //callback(Localization.locale.split('-')[0]);
        const selectLanguage = lng || local;
        callback(selectLanguage);
    //    console.log('After dash board call');
    //    //callback('ar');
    //    callback("ar");
    //    'ar'
    },
    init: () => { },
    cacheUserLanguage: () => { },
};

export default languageDetector;