import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Image,
    Modal,
    ImageBackground,
    Dimensions,
    Alert,
    ScrollView,
    AsyncStorage
} from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea } from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD,FONT_FAMILY_PT_REGULAR } from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { BlurView } from "@react-native-community/blur";
// import Loader from '../../../componets/loder/Loader';
import { constants } from '../../../utils/constants/constants';
import { Reachability } from '../../../services/netInfo/Rechability';
import axios from 'axios';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import * as config from '../../../utils/localization/config/i18n';
import {isManualLogout} from '../../../componets/sideBarMenu/SidebarMenu.Action';
// import { ScrollView } from 'react-native-gesture-handler';

const ChangePassword = (props) => {

    const [visible, setVisible] = useState(true);
    const [userName, setUserName] =  useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
      };

    const onButtonOkClick = () => {
        props.onModalClose(); 
        setVisible(false);
        props.getLogoutValues(true);
      };
      
     const handleOnUserNameChange = (e) => {
        e.persist();
       setUserName(e.nativeEvent.text);   
     }
     const handleOnOldPasswordChange = (e) => {
        e.persist();
       setOldPassword(e.nativeEvent.text);   
     }
     const handleOnnewPasswordChange = (e) => {
        e.persist();
       setNewPassword(e.nativeEvent.text);   
     }
     const handleOnconfirmPasswordChange = (e) => {
        e.persist();
       setConfirmPassword(e.nativeEvent.text);   
     }
    const  onButtonSubmitClick = () => {
        if (userName == '') {
            alertWithMessage('Please enter usename');
        } else if (oldPassword == newPassword) {
            alertWithMessage('Please enter new password diffrent');
        } else if (newPassword.length <= 6){
            alertWithMessage('Please enter new password length 6');
        } else if (newPassword != confirmPassword) {
            alertWithMessage('Please enter new password and confrom password');
        }
        AsyncStorage.getItem('token').then((token) => {
            submitChangePassword(userName, oldPassword, newPassword, token);   
        });
      };

    const  submitChangePassword =  (userName, oldPassword, newPassword, token) => {
            try {
                const params = {
                    username: userName,
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }
                console.log('Parameter in Change Password');
                console.log(params);
               // <Loader isLoading = {true} />
                axios.post(`${constants.webService.baseURL}${constants.webService.methods.auth.changePassword}`, params,  axios.defaults.headers.Authorization = `Bearer ${token}`)
                .then(res => {
                //   console.log('Change Passwordresponse inside');
                //     console.log(res);
                //     console.log(res.data)
                    if (res.data.statusCode == "200") {
                        if (res.data.data === "Password changed successfully") {
                            alertWithMessage('Password changed successfully');
                        }
                    }    
                })
                .catch(error => console.log(error));  
            } catch (error) {
            }
    }

   const alertWithMessage = (message) =>
        Alert.alert(
            "",        
            message,
            [
                { text: "OK", onPress: () => {onButtonOkClick()} }
            ],
            { cancelable: false }
        );

        if (config.fallback == "en") {
      return(
        <Modal transparent animated visible={visible}  animationIn="slideInLeft" animationOut="slideOutRight"onRequestClose={() => { console.log('onRequestClose'); }}>
            {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
               <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                   <ScrollView>
                   <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                        <View style={{marginTop:200,width:screenWidth-40, height:350,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                        <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('ProfileScreen:ChangePasswordTitle')}</Text>
                                </ImageBackground>
                                </View>
                               
                                <View style={{marginTop:0,backgroundColor:'white',marginBottom:0}}>
                                 <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,height:40}}>
                                 <Input
                                              type="text"
                                              name='userName'
                                              
                                              value={userName}
                                              onChange={(value) => handleOnUserNameChange(value)}
                                              underlineColorAndroid = "transparent"
                                              clearButtonMode='always'
                                              placeholderTextColor='#afafaf'
                                              placeholder={t('ProfileScreen:UserName')}
                                              spellCheck={false}
                                              autoCorrect={false}
                                              style={{borderColor: 'gray',
                                              borderWidth: 1,
                                              borderRadius:5,
                                              marginTop:0,
                                              textAlign: 'auto',
                                              paddingLeft:15,
                                              backgroundColor:'#f2f2f2',
                                              fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0,marginRight:0, height:40,fontSize:16}}
                                          />
                                </View>     
                                <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,height:40}}>
                                 <Input
                                              type="text"
                                              name='oldPassword'
                                              
                                              value={oldPassword}
                                              onChange={(value) => handleOnOldPasswordChange(value)}
                                              underlineColorAndroid = "transparent"
                                              clearButtonMode='always'
                                              placeholderTextColor='#afafaf'
                                              placeholder={t('ProfileScreen:OldPassword')}
                                              spellCheck={false}
                                              autoCorrect={false}
                                              style={{borderColor: 'gray',
                                              borderWidth: 1,
                                              borderRadius:5,
                                              marginTop:0,
                                              textAlign:'auto',
                                              paddingLeft:15,
                                              backgroundColor:'#f2f2f2',
                                              fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0, marginRight:0,height:40,fontSize:16}}
                                          />
                                </View>     
                                <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,height:40}}>
                                 <Input
                                              type="text"
                                              name='newPassword'
                                              
                                              value={newPassword}
                                              onChange={(value) => handleOnnewPasswordChange(value)}
                                              underlineColorAndroid = "transparent"
                                              clearButtonMode='always'
                                              placeholderTextColor='#afafaf'
                                              placeholder={t('ProfileScreen:NewPassword')}
                                              spellCheck={false}
                                              autoCorrect={false}
                                              style={{borderColor: 'gray',
                                              borderWidth: 1,
                                              borderRadius:5,
                                              marginTop:0,
                                              textAlign:'auto',
                                              paddingLeft:15,
                                              backgroundColor:'#f2f2f2',
                                              fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0, marginRight:0,height:40,fontSize:16}}
                                          />
                                </View>     
                                <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,height:40}}>
                                 <Input
                                              type="text"
                                              name='confirmPassword'
                                              
                                              value={confirmPassword}
                                              onChange={(value) => handleOnconfirmPasswordChange(value)}
                                              underlineColorAndroid = "transparent"
                                              clearButtonMode='always'
                                              placeholderTextColor='#afafaf'
                                              placeholder={t('ProfileScreen:ConfirmPassword')}
                                              spellCheck={false}
                                              autoCorrect={false}
                                              style={{borderColor: 'gray',
                                              borderWidth: 1,
                                              borderRadius:5,
                                              marginTop:0,
                                              textAlign:'auto',
                                              paddingLeft:15,
                                              backgroundColor:'#f2f2f2',
                                              fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0, marginRight:0,height:40,fontSize:16}}
                                          />
                                </View>      
                                </View>
                                 <View style={{marginTop:10, flexDirection:'row',justifyContent:'space-between'}}>
                                    <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                     <Text uppercase={false} style={{fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('ProfileScreen:Cancel')}</Text>
                                    </Button>
                                     <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonSubmitClick() }}>
                                    <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('ProfileScreen:Submit')}</Text>
                                     </Button>
                                </View> 
                        
                    </View>
             </Container>
             </ScrollView>
          </SafeAreaView>
        </Modal>
      );
    }else {
        return(
            <Modal transparent animated visible={visible}  animationIn="slideInLeft" animationOut="slideOutRight"onRequestClose={() => { console.log('onRequestClose'); }}>
                {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
                   <SafeAreaView style={{flex:1}}>
                       <ScrollView style={{width:'100%',height:'100%'}}>
                       <Container style={{width:'100%',height:'100%', paddingTop:0}} >
                            <View style={{marginTop:180,width:screenWidth-40, height:360,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                            <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                    <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                    <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('ProfileScreen:ChangePasswordTitle')}</Text>
                                    </ImageBackground>
                                    </View>
                                   
                                    <View style={{marginTop:0,backgroundColor:'white',marginBottom:0}}>
                                     <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,height:40}}>
                                     <Input
                                                  type="text"
                                                  name='userName'
                                                  
                                                  value={userName}
                                                  onChange={(value) => handleOnUserNameChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder={t('ProfileScreen:UserName')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign: 'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0,marginRight:0, height:40,fontSize:16}}
                                              />
                                    </View>     
                                    <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,height:40}}>
                                     <Input
                                                  type="text"
                                                  name='oldPassword'
                                                  
                                                  value={oldPassword}
                                                  onChange={(value) => handleOnOldPasswordChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder={t('ProfileScreen:OldPassword')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0, marginRight:0,height:40,fontSize:16}}
                                              />
                                    </View>     
                                    <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,height:40}}>
                                     <Input
                                                  type="text"
                                                  name='newPassword'
                                                  
                                                  value={newPassword}
                                                  onChange={(value) => handleOnnewPasswordChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder={t('ProfileScreen:NewPassword')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0, marginRight:0,height:40,fontSize:16}}
                                              />
                                    </View>     
                                    <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,height:40}}>
                                     <Input
                                                  type="text"
                                                  name='confirmPassword'
                                                  
                                                  value={confirmPassword}
                                                  onChange={(value) => handleOnconfirmPasswordChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder={t('ProfileScreen:ConfirmPassword')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0, marginRight:0,height:40,fontSize:16}}
                                              />
                                    </View>      
                                    </View>
                                     <View style={{marginTop:10, flexDirection:'row',justifyContent:'space-between'}}>
                                        <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonSubmitClick() }}>
                                        <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('ProfileScreen:Submit')}</Text>
                                         </Button>
                                        <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                         <Text uppercase={false} style={{fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('ProfileScreen:Cancel')}</Text>
                                        </Button>
                                        
                                    </View> 
                            
                        </View>
                 </Container>
                 </ScrollView>
              </SafeAreaView>
            </Modal>
          );
    }
      
}

export default ChangePassword;
