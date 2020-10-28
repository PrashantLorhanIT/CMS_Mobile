import React, { useState } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions, Alert, ScrollView } from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea } from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD,FONT_FAMILY_PT_REGULAR } from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { BlurView } from "@react-native-community/blur";
// import Loader from '../../../componets/loder/Loader';
import { constants } from '../../../utils/constants/constants';
import { Reachability } from '../../../services/netInfo/Rechability';
import axios from 'axios'
import * as config from '../../../utils/localization/config/i18n';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';

const ForgotPassword = (props) => {

    const [visible, setVisible] = useState(true);
    const [userName, setUserName] =  useState('');
    const [emailId, setemailId] = useState('');
    
    const onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
      };
      
    const  onButtonSubmitClick = () => {
      if (userName == '') {
        alertWithMessage('Please enter usename');
      }
        submitForgotPassword(userName, emailId);   

      };

      const handleOnUserNameChange = (e) => {
        console.log('User Name values',e);
        e.persist();
       setUserName(e.nativeEvent.text);   
     }

     const handleOnEmailIdChange = (e) => {
      e.persist();
      setemailId(e.nativeEvent.text);   
   }

    const  submitForgotPassword  = (userName, emailAddress) => {
        console.log('Forgot Password Action method  Approve');
        // return async (dispatch) => {
            try {
                const params = {
                    username: userName,
                    emailAddress: emailAddress,    
                }
                console.log('Parameter in Forgot Password');
                console.log(params);
                axios.post(`${constants.webService.baseURL}${constants.webService.methods.auth.forgotPassword}`, params)
                .then(res => {
                  console.log('Forgot Passwordresponse inside');
                    console.log(res);
                    console.log(res.data)
                    if (res.data.statusCode == "200") {
                       // props.getApproveValues(true);
                        if (res.data.data == 'Password sent to registered email') {
                          alertWithMessage('Password sent to registered email');
                        }
                    }    
                })
                .catch(error => console.log(error));
               
                
            } catch (error) {
                //dispatch(isAppLoading(false));
            }
      //  }
    }
    const alertWithMessage = (message) =>
        Alert.alert(
            "",        
            message,
            [
                { text: "OK", onPress: () => {onButtonCancelClick()} }
            ],
            { cancelable: false }
        );
    
        if (config.fallback == 'en'){
          return(
            <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
                {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
                   <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                   <ScrollView>
                       <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)'
    , paddingTop:0}} >
                            <View style={{marginTop:200,width:screenWidth-40, height:250,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                            <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                    <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                    <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('LoginScreen:forgotPassword')}</Text>
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
                                                  placeholder={t('LoginScreen:username')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'auto',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0,marginRight:0, height:35,fontSize:16}}
                                              />
                                    </View>     
                                    <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,height:40}}>
                                     <Input
                                                  type="text"
                                                  name='emailId'
                                                  
                                                  value={emailId}
                                                  onChange={(value) => handleOnEmailIdChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder={t('LoginScreen:EmailId')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'auto',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0, marginRight:0,height:35,fontSize:16}}
                                              />
                                    </View>        
                                    </View>
                                     <View style={{marginTop:10, flexDirection:'row',justifyContent:'space-between'}}>
                                        <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                         <Text uppercase={false} style={{fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('LoginScreen:Cancel')}</Text>
                                        </Button>
                                         <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonSubmitClick() }}>
                                        <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('LoginScreen:Submit')}</Text>
                                         </Button>
                                    </View> 
                                   
                                    </View>
                 </Container>
                 </ScrollView>
              </SafeAreaView>
            </Modal>
          );
        } else {
          return(
            <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
                {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
                   <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                   <ScrollView>
                       <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)'
    , paddingTop:0}} >
                            <View style={{marginTop:200,width:screenWidth-40, height:250,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                            <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                    <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                    <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff', textAlign:'right'}}>{t('LoginScreen:forgotPassword')}</Text>
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
                                                  placeholder={t('LoginScreen:username')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign: 'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0,marginRight:0, height:35,fontSize:16}}
                                              />
                                    </View>     
                                    <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,height:40}}>
                                     <Input
                                                  type="text"
                                                  name='emailId'
                                                  
                                                  value={emailId}
                                                  onChange={(value) => handleOnEmailIdChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder={t('LoginScreen:EmailId')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign: 'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,marginLeft:0, marginRight:0,height:35,fontSize:16}}
                                              />
                                    </View>        
                                    </View>
                                     <View style={{marginTop:10, flexDirection:'row',justifyContent:'space-between'}}>
                                      <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonSubmitClick() }}>
                                        <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('LoginScreen:Submit')}</Text>
                                         </Button>
                                        <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                         <Text uppercase={false} style={{fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('LoginScreen:Cancel')}</Text>
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

export default ForgotPassword;
