import React, {useState}from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import drawerImage from '../assets/image/drawerImage/drawerWhite.png';
import headerLogo from '../assets/image/headerLogo/logo.png';
import language from '../assets/image/language/language.png';
import { withNavigation } from 'react-navigation';
import ChangeLanguage from '../navigations/ChangeLanguage';
import {Container} from 'native-base';
import * as config from '../utils/localization/config/i18n';

const NavigationDrawerHeader = props => {
  const [visible, setVisible] = useState(false);

    const toggleDrawer = () => {
      props.navigationProps.toggleDrawer();
    };
  const toggleChangeLanguage = () => {
        //props.navigationProps.navigate('seconds');
        setVisible(true)

  };

  if (config.fallback == 'en'){
    return (
      <>
      {
      visible &&  <ChangeLanguage onModalClose={() => { setVisible(false)  }} /> 

      }
        <Container style= {{backgroundColor: 'transparent', flexDirection:'row', justifyContent:'center'}}>
        <View style={{ flex:1,flexDirection: 'row',justifyContent: 'space-between' }}>
         
          <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Image
              source={drawerImage}
              style={{ width: 25, height: 25, marginLeft: 15,marginTop:10}}
            />        
          </TouchableOpacity>
          <Image  
              source={headerLogo}
              style={{ width: 137, height: 25, marginLeft: 35,marginBottom:0,marginTop:10 }}
              />
           </View>  

           <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>

           <TouchableOpacity onPress={toggleChangeLanguage}>
            <Image
              source={language}
              style={{ width: 25, height: 25,marginTop:10, marginLeft:140}}/>
            
          </TouchableOpacity>

          </View>

        </View>
        </Container>
        </>
      );
  } else {
    return (
      <>
      {
      visible &&  <ChangeLanguage onModalClose={() => { setVisible(false)  }} /> 

      }
        <Container style= {{backgroundColor: 'transparent', flexDirection:'row-reverse', marginLeft:5,marginRight:5}}>
        <View style={{flex:1,flexDirection:'row',margin:5,justifyContent:'space-between'}}>

          <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>

          <TouchableOpacity onPress={toggleChangeLanguage}>
            <Image
              source={language}
              style={{ width: 25, height: 25,marginTop:10,marginLeft:20 }}/>    
          </TouchableOpacity>
          </View>
          
           <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end', alignSelf:'flex-end', marginLeft:100}}>

           <Image  
              source={headerLogo}
              style={{ width: 137, height: 25, marginLeft: 35,marginBottom:0,marginTop:10, marginRight:20 }}
              />
           <TouchableOpacity onPress={toggleDrawer}>
            <Image
              source={drawerImage}
              style={{ width: 25, height: 25, marginLeft: 20,marginTop:10}}
            />        
          </TouchableOpacity>

          </View>  
          
          </View>
        </Container>
        </>
      );
  }
    
    };
    export default NavigationDrawerHeader;