import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SplashScreen from '../screens/splash/Splash.Container';
import LoginScreen from '../screens/login/Login.Container';
import CorrespondenceDetail from '../screens/correspondence/correspondenceDetails/CoreespondenceDetails'
import DrawerNavigationRoutes from '../navigations/DrawerNavigationRoutes';
// import i18n, { t } from '../utils/localization/servicesi18n/i18n';

//import { translate } from 'react-i18next';
 //import i18n from '../utils/localization/index';
import { FlatList } from 'react-native-gesture-handler';
const Auth = createStackNavigator({
   //Stack Navigator for Login and Sign up Screen
   LoginScreen: {
     screen: LoginScreen,
     navigationOptions: {
       headerShown: false,
     },
   },
   
 });
 const AppNavigators = createSwitchNavigator({ 
   SplashScreen: {
     /* SplashScreen which will come once for 5 Seconds */
     screen: SplashScreen,
     navigationOptions: {
       /* Hiding header for Splash Screen */
       headerShown: false,
     },
   },
   Auth: {
     /* Auth Navigator which includer Login Signup will come once */
     screen: Auth,
   },
   
   DrawerNavigationRoutes: {
     /* Navigation Drawer as a landing page */
     screen: DrawerNavigationRoutes,
     navigationOptions: {
       /* Hiding header for Navigation Drawer as we will use our custom header */
       headerShown: false,
     }, 
    
   },
   
   
 });
 const AppNavigator = createAppContainer(AppNavigators);
 export default AppNavigator;

