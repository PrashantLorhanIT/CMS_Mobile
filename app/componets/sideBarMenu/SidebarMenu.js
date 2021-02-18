import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, Alert, Image } from 'react-native';
import { isManualLogout } from './SidebarMenu.Action';
import { withNavigation } from 'react-navigation';
import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14,FONT_FAMILY_PT_REGULAR, FONT_FAMILY_PT_BOLD } from '../../utils/styles/typography';
import inboxmenu from '../../assets/image/inboxmenu/inboxmenu.png';
import dashboardmenu from '../../assets/image/dashboardmenu/dashboardmenu.png';
import searchmenu from '../../assets/image/searchmenu/searchmenu.png';
import profilemenu from '../../assets/image/profilemenu/profilemenu.png';
import logoutmenu from '../../assets/image/logoutmenu/logoutmenu.png';
import profile from '../../assets/image/profileByDefault/profile.png';
import { Icon } from 'native-base';
import * as config from '../../utils/localization/config/i18n';
import { AsyncStorage } from 'react-native';

const SidebarMenu = props => {
  let items = [];
  const [inboxCount, setInboxCount] = useState();

useEffect (() => {
  AsyncStorage.getItem('InboxCount').then((value) => {
    setInboxCount(value);
  });
  
},[setInboxCount])

  if (config.fallback == 'en'){
     items = [

      {
        navOptionName: 'Dashboard',
        screenToNavigate: 'Dashboard',
        navOptionThumb: dashboardmenu,
      },
      {
        navOptionName: `${'Inbox'} (${inboxCount})`,
        screenToNavigate: 'Correspondence',
        navOptionThumb: inboxmenu
      },
      
      {
        navOptionName: 'Search',
        screenToNavigate: 'Search',
        navOptionThumb: searchmenu,
      },
      {
        navOptionName: 'Profile',
        screenToNavigate: 'Profile',
        navOptionThumb: profilemenu,
      },
      
      {
        navOptionName: 'Logout',
        screenToNavigate: 'logout',
        navOptionThumb: logoutmenu,
      },
    ];
  } else {
     items = [

      {
        navOptionName: 'لوحة القيادة',
        screenToNavigate: 'Dashboard',
        navOptionThumb: dashboardmenu,
      },
      {
        navOptionName:`${'صندوق الوارد'} ${inboxCount != null && inboxCount != NaN} ? (${inboxCount}) : '' `,
        screenToNavigate: 'Correspondence',
        navOptionThumb: inboxmenu
      },
      
      {
        navOptionName: 'البحث',
        screenToNavigate: 'Search',
        navOptionThumb: searchmenu,
      },
      {
        navOptionName: "الملف الشخصي",
        screenToNavigate: 'Profile',
        navOptionThumb: profilemenu,
      },
    
      {
        navOptionName: 'تسجيل خروج',
        screenToNavigate: 'logout',
        navOptionThumb: logoutmenu,
      },
    ];
  }
    
    

    const handleClick = (index, screenToNavigate) => {
        if (screenToNavigate == 'logout') {
          props.navigation.toggleDrawer();
          Alert.alert(
            'Logout',
            'Are you sure You want to logout?',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  return null;
                },
              },
              {
                text: 'Confirm',
                onPress: () => {
                  props.performLogout(() => _navigateLogin());
                  // _navigateLogin();
                  // console.log('Logout frist ')
                  // if (props.isManualLogout == true){
                  //   console.log('Logout second ')

                  //   props.navigation.navigate('Auth');

                 // }
                  
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          props.navigation.toggleDrawer();
          global.currentScreenIndex = screenToNavigate;
          props.navigation.navigate(screenToNavigate);
        }
      };

      _navigateLogin = () => {
        console.log('Logout ')
        console.log(props.isManualLogout)

       // if (props.isManualLogout == true){
          props.navigation.navigate('Auth');
       // }
      }
      return (
      
        <View style={stylesSidebar.sideMenuContainer}>
          <View style={stylesSidebar.profileHeader}>
            <View style={stylesSidebar.profileHeaderPicCircle}>
              {/* <Text style={{ fontSize: 27,fontFamily:FONT_FAMILY_PT_BOLD, color: '#307ecc' }}>
                 { props.userProfile && props.userProfile.firstname.charAt(0)}{ props.userProfile && props.userProfile.lastname.charAt(0)}
              </Text> */}
             
             {/* <Image source ={{uri: 'http://cms.lorhanit.com/CMSProfile/Images/Harish.Saidu.png'}}/> */}
             <Image source ={profile}/>
            </View>
            <Text style={stylesSidebar.profileHeaderText}>{ props.userProfile && props.userProfile.firstname} { props.userProfile && props.userProfile.lastname}</Text>
          </View>
          <View style={stylesSidebar.profileHeaderLine} />
          <View style={{ width: '100%', flex: 1 }}>
            {items.map((item, key) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 20,
                  color: 'white',
                  backgroundColor:
                    global.currentScreenIndex === item.screenToNavigate
                      ? '#373d38'
                      : '#373d38',
                }}
                key={key}
                onStartShouldSetResponder={() =>
                  handleClick(key, item.screenToNavigate)
                }>
                 <View style={{ marginRight: 10, marginLeft: 0 }}>
                 <Image source={item.navOptionThumb} style={{width:20,height:20}} />
                </View>
                <Text style={{ fontSize: 18, fontFamily:FONT_FAMILY_PT_REGULAR, color: 'white' }}>
                  {item.navOptionName}
                </Text>
              </View>
            ))}
          </View>
        </View>
      );
    };

    const stylesSidebar = StyleSheet.create({
        sideMenuContainer: {
          width: '100%',
          height: '100%',
          backgroundColor: '#373d38',
          paddingTop: 40,
          color: 'white',
        },
        profileHeader: {
          flexDirection: 'row',
          backgroundColor: '#373d38',
          padding: 15,
          textAlign: 'center',
        },
        profileHeaderPicCircle: {
          width: 80,
          height: 80,
          borderRadius: 80 / 2,
        //  color: 'white',
        //  backgroundColor: '#ffffff',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        },
        profileHeaderText: {
          color: 'white',
          alignSelf: 'center',
          paddingHorizontal: 10,
          fontWeight: 'bold',
          fontFamily:FONT_FAMILY_PT_BOLD,
          fontSize:20
        },
        profileHeaderLine: {
          height: 1,
          marginHorizontal: 20,
          backgroundColor: '#e2e2e2',
          marginTop: 15,
          marginBottom: 10,
        },
      });
 export default SidebarMenu;