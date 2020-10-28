/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import { Updates } from 'expo';

import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { StatusBar, Updates, AsyncStorage} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './app/redux/index';

import AppNavigator from './app/navigations/AppNavigator';
import { withTranslation} from 'react-i18next';
import i18n from './app/utils/localization/servicesi18n/index';
import * as config from './app/utils/localization/config/i18n';
 
class App extends Component {

  state = { isI18nInitialized: false }

  componentDidMount() {
    config.fallback = 'en'
  //   AsyncStorage.getItem('SelectedLanguage').then((value) => {
  //     if (value != ''){
  //     if (value == 'en'){
  //       config.fallback = 'en'
  //     } else {
  //       config.fallback = 'ar'
  //     }
  //   } else {
  //     config.fallback = 'en'
  //   }
  //  });
    i18n.init()
        .then(() => {
           // const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';
            // RN doesn't always correctly identify native
            // locale direction, so we force it here.
           // if (i18n.dir !== RNDir) {
                if(config.fallback == 'ar') {
                  RNI18nManager.forceRTL(true);
                //}
                // const isLocaleRTL = i18n.dir === 'RTL';

                // RNI18nManager.forceRTL(isLocaleRTL);

                // RN won't set the layout direction if we
                // don't restart the app's JavaScript.
                Updates.reloadFromCache();
            }

            this.setState({ isI18nInitialized: true });
        })
        .catch((error) => console.warn(error));
}

  render() {
    console.disableYellowBox = true;
    const store = configureStore();
  return (
    
    <>
    <Provider store={store}>      
              <AppNavigator/>
      </Provider>
    </>
  );
  }
};

export default App;
