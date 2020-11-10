import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Dashboard from '../screens/dashboard/Dashboard.Container';
import Correspondence from '../screens/correspondence/Correspondence.Container';
import SidebarMenu from '../componets/sideBarMenu/SidebarMenu.Container';
import NavigationDrawerHeader from './NavigationDrawerHeader';
import CorrespondenceDetail from '../screens/correspondence/correspondenceDetails/CorrespondenceDetails.Container';
import Profile from '../screens/profile/Profile.Container';
import Search from '../screens/search/Search.Container';
import ChangeLanguage from '../navigations/ChangeLanguage';
import SearchList from '../screens/search/searchList/SearchList';
import SearchDetails from '../screens/search/searchDetails/SearchDetails.Container';
// import i18n, { t } from '../utils/localization/servicesi18n/index';
import * as config from '../utils/localization/config/i18n';
let language = config.fallback
console.log('Navigation drawer js file', language);
const DashBoard_StackNavigator = createStackNavigator({
    First: {
      screen: Dashboard,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#aa182c',
        },
        headerTintColor: '#fff',
      }),
    },
    seconds: {
      screen: ChangeLanguage,
      navigationOptions: ({ navigation }) => ({
        title: 'ChangeLanguage',
       // headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
       // headerRight:() => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#aa182c',
        },
        headerTintColor: '#fff',
      }),
    },
  });

  const Correspondence_StackNavigator = createStackNavigator({
    First: {
      screen: Correspondence,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
       // headerRight:() => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#aa182c',
        },
        headerTintColor: '#fff',
      }),
    },
    second: {
      screen: CorrespondenceDetail,
      navigationOptions: ({ navigation }) => ({
        title: 'Details',
        headerStyle: {
          backgroundColor: '#aa182c',
        },
        headerTintColor: '#fff',
      }),
    },
    
  });

  const Profile_StackNavigator = createStackNavigator({
    First: {
      screen: Profile,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#aa182c',
        },
        headerTintColor: '#fff',
      }),
    },
    
  });

  const Search_StackNavigator = createStackNavigator({
    First: {
      screen: Search,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerLeft: () => <NavigationDrawerHeader navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#aa182c',
        },
        headerTintColor: '#fff',
      }),
    },

    SearchLits: {
      screen: SearchList,
      navigationOptions: ({ navigation }) => ({
        title: 'Search Results',
        headerStyle: {
          backgroundColor: '#aa182c',
        },
        headerTintColor: '#fff',
      }),
    },
    
    SearchDetail: {
      screen: SearchDetails,
      navigationOptions: ({ navigation }) => ({
       title: 'Details',
        headerStyle: {
          backgroundColor: '#aa182c',
        },
        headerTintColor: '#fff',
      }),
    },  
  });
  // const CorrespondenceNavigationStack = createStackNavigator({
   
  //   CorrespondenceDetail: {
  //     screen: CorrespondenceDetail,
  //     navigationOptions: ({ navigation }) => ({
  //       title: 'CorrespondenceDetail',
  //       headerStyle: {
  //         backgroundColor: '#aa182c',
  //       },
  //      // headerLeft: </>,
  //       headerTintColor: '#fff',
  //       headerShown:true,
  //       headerBackTitle:'Back',
        
  //     }),
  //   },
  //  });

  const DrawerNavigatorRoutes = createDrawerNavigator(
    {
      Dashboard: {
        screen: DashBoard_StackNavigator,
        navigationOptions: {
          drawerLabel: 'Dashboard',
        },
      },
      
      Correspondence: {
        screen: Correspondence_StackNavigator,
        navigationOptions: {
          drawerLabel: 'Correspondence',
        },  
      },
      
      Profile: {
        screen: Profile_StackNavigator,
        navigationOptions: {
          drawerLabel: 'Profile',
        },
      },
      Search: {
        screen: Search_StackNavigator,
        navigationOptions: {
          drawerLabel: 'Search',
        },
      }, 
    },
    
    {
      contentComponent: SidebarMenu,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      //drawerPosition: language == "en" ? 'right' : 'left'

    }
  );

 
  export default DrawerNavigatorRoutes;