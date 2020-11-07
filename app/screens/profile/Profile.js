import React, { Component } from 'react';
import {
    Body,
    Card,
    CardItem,
    Icon,
    Text,
    View,
    Segment,
    Container,
    Button,
    Content,
  } from 'native-base';
  import { StyleSheet,  SafeAreaView, StatusBar, ScrollView, KeyboardAvoidingView,ImageBackground, Image, Dimensions,Alert} from 'react-native';
  import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_FAMILY_PT_BOLD } from '../../utils/styles/typography';

import styles from '../profile/Profile.style';
import HeaderTilte from '../../assets/image/headerTitle/HeaderTilte.jpg';
import designation from '../../assets/image/profileDesignation/profileDesignation.png';
import role from '../../assets/image/profileRole/profileRole.png';
import company from '../../assets/image/profileCompany/profileCompany.png';
import emails from '../../assets/image/email/email.png';
import ChangePassword from './changePassword/ChangePassword';
import i18n, { t } from '../../utils/localization/servicesi18n/index';
import { configureFonts } from 'react-native-paper';
import * as config from '../../utils/localization/config/i18n';

const screenWidth = Dimensions.get("window").width;


class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            isChangePasswordVisible: false,
            flipForRTL: true
        };
    }
    componentDidMount = () => {
        console.log('correspondenceInbox componentDidMount');
        console.log(this.props);
        console.log(this.props.userProfile)
        if (this.props.userProfile == 0) {
          this.props.getProfileDetails(this.props.loggedInUser.ridUsermaster);
        }
      }
      FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#DCDCDC",
              marginTop:15
            }}
          />
        );
      }

      handleChangePasswordTap = () => {
        console.log('Change password');
        console.log(this.props.userProfile.isaduser)
        if(this.props.userProfile.isaduser === "N"){
          this.setState((state) => {
            return {
              isChangePasswordVisible: true,
            };
          });
        } else {
          this.alertWithMessage("User is Ad User doesn’t change password");
        }
      };

       alertWithMessage = (message) =>
        Alert.alert(
            "",
            
            message,
            [
                { text: "OK", onPress: () => {onButtonClick()} }
            ],
            { cancelable: false }
        );
        _navigateLogin = () => {
          console.log('Logout ');
          console.log(this.props);
  
         // if (props.isManualLogout == true){
            this.props.navigation.navigate('Auth');
         // }
        }
    _renderProfileImage =() => {
        if (config.fallback == 'en'){
          return (
            <View style={{marginTop:100, marginLeft:8, marginRight:8, marginHorizontal:20, backgroundColor:'white', height:430, borderRadius:10,marginBottom:10}}>
             
             <View style={{justifyContent:'center', alignContent:'center', alignSelf:'center',marginTop:-50}}>
                 <View style={{width: 100, height: 100, borderRadius: 100 / 2, backgroundColor: '#41499e', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                 <Text style={{ fontSize: 18, color:'white', fontFamily:FONT_FAMILY_PT_BOLD }}>{this.props.userProfile.firstname ? this.props.userProfile.firstname.charAt(0): ''} {this.props.userProfile.lastname ? this.props.userProfile.lastname.charAt(0): ''}</Text>
                 </View>
             </View>
             <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:0}}>
             <Text style={{fontSize:18, fontFamily:FONT_FAMILY_PT_BOLD,marginTop:10}}>{ this.props.userProfile.firstname ? this.props.userProfile.firstname : ''} { this.props.userProfile.lastname ? this.props.userProfile.lastname : ''}</Text>
             </View>
             <View style={{flexDirection:'column', margin:0,marginTop:25,...i18n.select({
             rtl: { paddingEnd: 1 },
             ltr: { paddingStart: 1 },
         })}}>
 
             <View style={{flexDirection:'row',justifyContent:'flex-start', alignContent:'center',alignItems:'center',marginLeft:25, ...i18n.select({
             rtl: { paddingStart: 5 },
             ltr: { paddingStart: 5},
         })}}>
                  <Image style={{width:25,height:25, ...i18n.select({ltr:{ paddingStart:5}}) }} source={emails}/>
                    <View>
                       <Text style={{fontSize:14, fontFamily:FONT_FAMILY_PT_BOLD ,marginLeft:10}}>{t('ProfileScreen:Designation')}</Text>
                       <Text style={{fontSize:13, fontFamily:FONT_FAMILY_PT_REGULAR,marginTop:0,marginLeft:10}}>{this.props.userProfile.appointedas ? this.props.userProfile.appointedas : ''}</Text>
                    </View>
                 </View>
                 {this.FlatListItemSeparator()}
                 <View style={{flexDirection:'row',justifyContent:'flex-start', alignContent:'center',alignItems:'center',marginTop:15,marginLeft:25}}>
                  <Image style={{width:25,height:25}} source={designation}/>
                    <View>
                       <Text style={{fontSize:14, fontFamily:FONT_FAMILY_PT_BOLD ,marginLeft:10}}>{t('ProfileScreen:Role')}</Text>
                       <Text style={{fontSize:13, fontFamily:FONT_FAMILY_PT_REGULAR,marginTop:0,marginLeft:10,flexDirection: 'row'}}>{this.props.userProfile.rolename ? this.props.userProfile.rolename : ''}</Text>
                    </View>
                 </View>
                 {this.FlatListItemSeparator()}
                 <View style={{flexDirection:'row',justifyContent:'flex-start', alignContent:'center',alignItems:'center',marginTop:15,marginLeft:25}}>
                  <Image style={{width:25,height:25}} source={role}/>
                    <View>
                       <Text style={{fontSize:14, fontFamily:FONT_FAMILY_PT_BOLD ,marginLeft:10}}>{t('ProfileScreen:Company')}</Text>
                       <Text style={{fontSize:13, fontFamily:FONT_FAMILY_PT_REGULAR,marginTop:0,marginLeft:10}}>{this.props.userProfile.entityName ? this.props.userProfile.entityName : ''}</Text>
                    </View>
                 </View>
                 {this.FlatListItemSeparator()}
                 <View style={{flexDirection:'row',justifyContent:'flex-start', alignContent:'center',alignItems:'center',marginTop:15,marginLeft:25}}>
                  <Image style={{width:25,height:25}} source={company}/>
                    <View>
                       <Text style={{fontSize:14, fontFamily:FONT_FAMILY_PT_BOLD ,marginLeft:10,marginTop:0}}>{t('ProfileScreen:Email')}</Text>
                       <Text style={{fontSize:13, fontFamily:FONT_FAMILY_PT_REGULAR,marginTop:0,marginLeft:10,flexDirection: 'row'}}>{this.props.userProfile.email ? this.props.userProfile.email : ''}</Text>
                    </View>
                 </View>
                 {this.FlatListItemSeparator()}
                 <View style={ {backgroundColor: '#a62032',justifyContent:'center',alignItems:'center',marginTop:50,marginLeft:20, marginRight:20,borderRadius:5}}>
                   <Button style={{backgroundColor: '#a62032',width:200,justifyContent:'center'}} onPress={()=> this.handleChangePasswordTap()}>
                     <Text uppercase={false} style={{fontSize:15,fontFamily:FONT_FAMILY_PT_REGULAR,alignContent:'center',backgroundColor: '#a62032'}}>{t('ProfileScreen:ChangePassword')}</Text>
                   </Button>
                 </View>
             </View>
         </View>
         );
        } else {
           return (
           <View style={{marginTop:100, marginLeft:8, marginRight:8, marginHorizontal:20, backgroundColor:'white', height:430, borderRadius:10,marginBottom:10}}>
            
            <View style={{justifyContent:'center', alignContent:'center', alignSelf:'center',marginTop:-50}}>
                <View style={{width: 100, height: 100, borderRadius: 100 / 2, backgroundColor: '#41499e', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize: 18, color:'white', fontFamily:FONT_FAMILY_PT_BOLD }}>{this.props.userProfile.firstname ? this.props.userProfile.firstname.charAt(0): ''} {this.props.userProfile.lastname ? this.props.userProfile.lastname.charAt(0): ''}</Text>
                </View>
            </View>
            <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:0}}>
            <Text style={{fontSize:18, fontFamily:FONT_FAMILY_PT_BOLD,marginTop:10}}>{ this.props.userProfile.firstname ? this.props.userProfile.firstname : ''} { this.props.userProfile.lastname ? this.props.userProfile.lastname : ''}</Text>
            </View>
            <View style={{flexDirection:'column', margin:0,marginTop:25 }}>

            <View style={{flexDirection:'row',justifyContent: 'flex-end', alignContent:'center',alignItems:'center',marginRight:25}}>
                     <View>
                      <Text style={{fontSize:14, fontFamily:FONT_FAMILY_PT_BOLD ,marginRight:10,textAlign:'right'}}>{t('ProfileScreen:Designation')}</Text>
                      <Text style={{flexDirection:'column-reverse',fontSize:13, fontFamily:FONT_FAMILY_PT_REGULAR,marginTop:0,marginRight:10}}>{this.props.userProfile.appointedas ? this.props.userProfile.appointedas : ''}</Text>
                   </View>
                 <Image style={{width:25,height:25, ...i18n.select({ltr:{ paddingStart:5}}) }} source={emails}/>
                   
                </View>
                {this.FlatListItemSeparator()}
                <View style={{flexDirection:'row',justifyContent:'flex-end', alignContent:'center',alignItems:'center',marginTop:15,marginRight:25}}>
                <View>
                      <Text style={{fontSize:14, fontFamily:FONT_FAMILY_PT_BOLD ,marginRight:10, textAlign:'right'}}>{t('ProfileScreen:Role')}</Text>
                      <Text style={{fontSize:13, fontFamily:FONT_FAMILY_PT_REGULAR,marginTop:0,marginRight:10,flexDirection: 'row',textAlign:'right'}}>{this.props.userProfile.rolename ? this.props.userProfile.rolename : ''}</Text>
                   </View>
                 <Image style={{width:25,height:25}} source={designation}/>
                  
                </View>
                {this.FlatListItemSeparator()}
                <View style={{flexDirection:'row',justifyContent:'flex-end', alignContent:'center',alignItems:'center',marginTop:15,marginRight:25}}>
                <View>
                      <Text style={{fontSize:14, fontFamily:FONT_FAMILY_PT_BOLD ,marginRight:10, textAlign:'right'}}>{t('ProfileScreen:Company')}</Text>
                      <Text style={{fontSize:13, fontFamily:FONT_FAMILY_PT_REGULAR,marginTop:0,marginRight:10,textAlign:'right'}}>{this.props.userProfile.entityName ? this.props.userProfile.entityName : ''}</Text>
                   </View>
                 <Image style={{width:25,height:25}} source={role}/>
                  
                </View>
                {this.FlatListItemSeparator()}
                <View style={{flexDirection:'row',justifyContent:'flex-end', alignContent:'center',alignItems:'center',marginTop:15,marginRight:25}}>
                <View>
                      <Text style={{fontSize:14, fontFamily:FONT_FAMILY_PT_BOLD ,marginRight:10,marginTop:0, textAlign:'right'}}>{t('ProfileScreen:Email')}</Text>
                      <Text style={{fontSize:13, fontFamily:FONT_FAMILY_PT_REGULAR,marginTop:0,marginRight:10,flexDirection: 'row',textAlign:'right'}}>{this.props.userProfile.email ? this.props.userProfile.email : ''}</Text>
                   </View>
                 <Image style={{width:25,height:25}} source={company}/>
                  
                </View>
                {this.FlatListItemSeparator()}
                <View style={ {backgroundColor: '#a62032',justifyContent:'center',alignItems:'center',marginTop:50,marginLeft:20, marginRight:20,borderRadius:5}}>
                  <Button style={{backgroundColor: '#a62032',width:200,justifyContent:'center'}} onPress={()=> this.handleChangePasswordTap()}>
                    <Text uppercase={false} style={{fontSize:15,fontFamily:FONT_FAMILY_PT_REGULAR,alignContent:'center',backgroundColor: '#a62032'}}>{t('ProfileScreen:ChangePassword')}</Text>
                  </Button>
                </View>
            </View>
        </View>
        );
      }
    }
    render() {
      const { isChangePasswordVisible } = this.state;
      console.log('Aftr logout ', this.props.userProfile);
      if (this.props.userProfile != null) {
        if (config.fallback == 'en'){
          return (
     
            <SafeAreaView>
              <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
                <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
                  <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('ProfileScreen:title')}</Text>
                 </ImageBackground>
              </View>
               
               <ScrollView>
              <Container>
{/*               
                 isChangePasswordVisible && <ChangePassword token = {this.props.loggedInUser.token} onModalClose={() => { this.setState({ isChangePasswordVisible: false }) }} /> 
              } */}
              {
              isChangePasswordVisible && <ChangePassword token = {this.props.loggedInUser.token}  onModalClose={() => { this.setState({ isChangePasswordVisible: false }) }} getLogoutValues={(logout) => {
                
                if (logout == true) {
                  this.props.performLogout(() => this._navigateLogin());
                }
                 }} /> 
                }
                <View style={{backgroundColor:'Gray',width:'100%',height:'60%'}}>
                {this._renderProfileImage()}
                
                </View>
                </Container>
                </ScrollView>
            </SafeAreaView>
          
        );
        }else{
          return (
     
            <SafeAreaView>
              <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
                <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
                  <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('ProfileScreen:title')}</Text>
                 </ImageBackground>
              </View>
               
               <ScrollView>
              <Container>
              { 
                 isChangePasswordVisible && <ChangePassword token = {this.props.loggedInUser.token} onModalClose={() => { this.setState({ isChangePasswordVisible: false }) }} /> 
              }
              
                <View style={{backgroundColor:'Gray',width:'100%',height:'60%'}}>
                {this._renderProfileImage()}
                
                </View>
                </Container>
                </ScrollView>
            </SafeAreaView>
          
        );
        }
       
       } else {
        return (
     
          <SafeAreaView>
            <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
                <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('ProfileScreen:title')}</Text>
               </ImageBackground>
            </View>
             <ScrollView>
            <Container>
            { 
               isChangePasswordVisible && <ChangePassword token = {this.props.loggedInUser.token} onModalClose={() => { this.setState({ isChangePasswordVisible: false }) }} /> 
            }
            
              <View style={{backgroundColor:'Gray',width:'100%',height:'60%'}}>
             {/* // {this._renderProfileImage()} */} 
              </View>
              </Container>
              </ScrollView>
          </SafeAreaView>
      );
       }
    }
}

export default profile;
