import React, { useState } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions, Alert, ScrollView} from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea,Picker, CardItem } from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD,FONT_FAMILY_PT_REGULAR } from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { BlurView } from "@react-native-community/blur";
import { Card } from 'react-native-elements';
import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../../redux/index';
import { constants } from '../../../utils/constants/constants';
import { Reachability } from '../../../services/netInfo/Rechability';
import axios from 'axios'
import Loader from '../../../componets/loder/Loader';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import * as config from '../../../utils/localization/config/i18n';

const RFIDelegatePopup = (props) => {

  console.log('Correspondence Details Delegate props');
  console.log(props.userMasterData);
   const [visible, setVisible] = useState(true);
   const [userMasterId, setuserMasterId] = useState(0);
   const [comment, setcomment] =  useState('');

   const onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
        props.getApproveValues(false);
    };
    const onButtonClick = () => {
      props.onModalClose(); 
      setVisible(false);
      props.getApproveValues(true);

    };

    const  onButtonApproveClick = () => {
      if (userMasterId == 0) {
        alertWithMessageValidation("Please select delegate user");   
      } else {
        console.log('Delegate user value selected');
        const userId = props.userId;
        const delegateUserID = userMasterId; 
        const workFlowTransactionId = props.workFTID;
        const comments = comment
        const token = props.token
        submitCorrespondenceDetailDelegate(userId, delegateUserID,workFlowTransactionId,comments, token);
      }
    };
    const onUserMasterChange = (value) => {
            console.log('Delegate user value selected', value);
            setuserMasterId(value);
    }
   
    const  submitCorrespondenceDetailDelegate =  (userid, delegateUserId, wftId, comment, token) => {
      console.log('Correspondence details Action method  Approve');
      // return async (dispatch) => {
          try {
            const params = {
              existingUserId: userid,
              delegatedUserId: delegateUserId,
              workflowtransactionID: wftId,
              comments: comment
          }

              console.log('Parameter in Correspondence Details Delegate');
              console.log(params);
              // <Loader isLoading = {true} />
              axios.post(`${constants.webService.baseURL}${constants.webService.methods.common.rfiDelegate}`, params, axios.defaults.headers.Authorization = `Bearer ${token}`)
              .then(res => {
                console.log('Correspondence Details Delegate response inside');
                  console.log(res);
                  console.log(res.data)
                  if (res.data.statusCode == "200") {

                    alertWithMessage("Delegated sucessfully");
                    
                  }    
              })
              .catch(error => console.log(error));
              alertWithMessage(error);
              
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
              { text: "OK", onPress: () => {onButtonClick()} }
          ],
          { cancelable: false }
      );
      const alertWithMessageValidation = (message) =>
      Alert.alert(
          "",
          message,
          [
              { text: "OK", onPress: () => {} }
          ],
          { cancelable: false }
      );
      if (config.fallback == 'en'){
        return(
          <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
              {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
                 <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                 <ScrollView>
                     <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                          <View style={{marginTop:200,width:screenWidth-40, height:350,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                               <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                  <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                  <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('InboxScreen:Delegate')}</Text>
                                  </ImageBackground>
                                  </View>
                                  
                                  <View style={{marginTop:0,backgroundColor:'white',marginBottom:70}}>
                                     <Text style={{fontSize:14,margin:10,marginTop:5,marginBottom:0,marginLeft:20,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Pleaseselectdelegate')}</Text>
                                    
                                     <View  style = {{ backgroundColor:'white',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:15,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', height: 35}}>
               <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('InboxScreen:Selectuser')}
                                                selectedValue={userMasterId}
                                                onValueChange={onUserMasterChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                              <Picker.Item label='Select' value={-1} key={-1} />
  
  {props.userMasterData && props.userMasterData.map((user, index) => {
      return (
        <Picker.Item label= {`${user.firstname} ${user.lastname}`} value={user.ridUsermaster} key={index} />
        );
  })}
</Picker>
            
              </View>
                                       <View style={{marginLeft:15,marginRight:15,height:30,marginTop:15}}>
                                         {/* <Textarea style={{height:50}} rowSpan={4} bordered placeholder="Comments"  /> */}
                                         <Textarea style={{height:80,fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:14,paddingLeft:20}} spellCheck="false" rowSpan={4} bordered placeholder= {t('InboxScreen:Comments')} type="text" value={comment} onChangeText={(value) => { setcomment(value) }}  />
                                       </View>
                                  </View>
                                   <View style={{marginTop:10, flexDirection:'row',justifyContent:'space-between'}}>
                                      <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                       <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
                                      </Button>
                                       <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonApproveClick() }}>
                                      <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Submit')}</Text>
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
          <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
              {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
                 <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                 <ScrollView>
                     <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                          <View style={{marginTop:200,width:screenWidth-40, height:350,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                               <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                  <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                  <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff', textAlign:'right'}}>{t('InboxScreen:Delegate')}</Text>
                                  </ImageBackground>
                                  </View>
                                  
                                  <View style={{marginTop:0,backgroundColor:'white',marginBottom:70}}>
                                     <Text style={{fontSize:14,margin:10,marginTop:5,marginBottom:0,marginRight:20,fontFamily:FONT_FAMILY_PT_REGULAR,textAlign:'right'}}>{t('InboxScreen:Pleaseselectdelegate')}</Text>
                                    
                              
                                   <View  style = {{ backgroundColor:'white',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:15,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', height: 35}}>
               <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('InboxScreen:Selectuser')}
                                                selectedValue={userMasterId}
                                                onValueChange={onUserMasterChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                              <Picker.Item label='Select' value={-1} key={-1} />
  
  {props.userMasterData && props.userMasterData.map((user, index) => {
      return (
        <Picker.Item label= {`${user.firstname} ${user.lastname}`} value={user.ridUsermaster} key={index} />
        );
  })}
</Picker>
            
              </View>
                                       <View style={{marginLeft:15,marginRight:15,height:30,marginTop:10}}>
                                         {/* <Textarea style={{height:50}} rowSpan={4} bordered placeholder="Comments"  /> */}
                                         <Textarea style={{height:80,fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:14,paddingLeft:20, textAlign:'right'}} spellCheck="false" rowSpan={4} bordered placeholder= {t('InboxScreen:Comments')} type="text" value={comment} onChangeText={(value) => { setcomment(value) }}  />
                                       </View>
                                  </View>
                                   <View style={{marginTop:10, flexDirection:'row',justifyContent:'space-between'}}>
                                   <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonApproveClick() }}>
                                      <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Submit')}</Text>
                                       </Button>

                                      <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                       <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
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

export default RFIDelegatePopup;
