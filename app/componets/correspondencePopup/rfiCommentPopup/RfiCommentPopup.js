import React, { useState } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions, Alert } from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea } from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD,FONT_FAMILY_PT_REGULAR } from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { BlurView } from "@react-native-community/blur";
import RfiCommentCard from './RfiCommentpopupCard';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import { constants } from '../../../utils/constants/constants';
import axios from 'axios'
import * as config from '../../../utils/localization/config/i18n';
import moment from 'moment';

const RfiCommentPopup = (props) => {
     const [visible, setVisible] = useState(true);
     const [comment, setcomment] =  useState('');

     
     const onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
        props.getRFIDetailsRefreshValues(false);
      };
      const onButtonClick = () => {
        props.onModalClose(); 
        setVisible(false);
        props.getRFIDetailsRefreshValues(true);
      };
      const onSubmitClick = () => {
        const token = props.token;
        submitRFIcomment(token);
      };

      const  submitRFIcomment =  (token) => {
        console.log('RFI addd comment Action method');
        // return async (dispatch) => {
            try {
              const params = {
                ridRficomment: 0,
                comments:comment,
                isactive: 'Y',
                hasattachment: 'null',
                ridRfidetails: props.ridRfiDetails,
                forRidRfidetails: 0,
                  commentTime: moment(new Date()).format('yyyy-MM-DDTHH:MM:ss'),
                //commenttime: 'null'
            }

                console.log('Parameter in Correspondence Details RFI Comment');
                console.log(params);
                console.log(token);
                console.log(`${constants.webService.baseURL}${constants.webService.methods.common.rfiAddComment}`);
                // <Loader isLoading = {true} />
                
                axios.post(`${constants.webService.baseURL}${constants.webService.methods.common.rfiAddComment}`, params, token)
                .then(res => {
                  console.log('RFI Comment response inside');
                    console.log(res);
                    console.log(res.data)
                    if (res.data.statusCode == "200") {
  
                      alertWithMessage("Comment added sucessfully");
                      
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

        if (config.fallback == 'en'){
          return(
            <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
                {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
                   <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                       <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                            <View style={{marginTop:150, width:screenWidth-20,  alignSelf: 'stretch',marginLeft:10, marginRight:10, borderRadius:10,backgroundColor:'white'}}>
                            <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                    <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                    <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('InboxScreen:RFIComment')}</Text>
                                    </ImageBackground>
                                    </View>
                                    <View style={{ flexDirection:'row',paddingTop:0,backgroundColor:'white',marginBottom:40}}>
                                          <View style={{flex:1,margin:5,marginLeft:10,marginRight:10,height:30}}>
                                           <Textarea style={{height:70,fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:14}} spellCheck={false} rowSpan={4} bordered placeholder="Comments" type="text" value={comment} onChangeText={(value) => { setcomment(value) }}  />
                                         </View>
                                         <Button style={{marginTop:25,margin:5,marginRight:20,backgroundColor:'#373d38',width:120,height:35, justifyContent:'center',alignContent:'center'}} onPress={() => { onSubmitClick() }}>
                                         <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:AddComment')}</Text>
                                         </Button>
                                    </View>
                                    <View style={{paddingTop:0,backgroundColor:'white',marginBottom:40,height:200}}>
                                      <Content>
                                      {
                                     props.rfisComments && props.rfisComments.length > 0 ? props.rfisComments.map((ele, index) => <RfiCommentCard  key={index} rfiComment={ele}/>) : <Text style={{fontSize:16,marginTop:30,fontWeight:'600',textAlign:'center'}}>No Record Found</Text>
    
                                      }
                                    </Content>
                                    </View>
                                     <View style={{marginTop:10, flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                        <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                         <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
                                        </Button>
                                </View> 
                              
                        </View>
                 </Container>
              </SafeAreaView>
            </Modal>
          );
        }else {
          return(
            <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
                {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
                   <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                       <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                            <View style={{marginTop:150, width:screenWidth-20,  alignSelf: 'stretch',marginLeft:10, marginRight:10, borderRadius:10,backgroundColor:'white'}}>
                            <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                    <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                    <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('InboxScreen:RFIComment')}</Text>
                                    </ImageBackground>
                                    </View>
                                    <View style={{ flexDirection:'row',paddingTop:0,backgroundColor:'white',marginBottom:40}}>
                                        <Button style={{marginTop:25,margin:5,marginRight:20,backgroundColor:'#373d38',width:120,height:35, justifyContent:'center',alignContent:'center'}} onPress={() => { onSubmitClick() }}>
                                         <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:AddComment')}</Text>
                                         </Button>
                                          <View style={{flex:1,margin:5,marginLeft:10,marginRight:10,height:30}}>
                                           <Textarea style={{height:70,fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:14,textAlign:'right'}} spellCheck={false} rowSpan={4} bordered placeholder="Comments" type="text" value={comment} onChangeText={(value) => { setcomment(value) }}  />
                                         </View>
                                        
                                    </View>
                                    <View style={{paddingTop:0,backgroundColor:'white',marginBottom:40,height:200}}>
                                      <Content>
                                      {
                                     props.rfisComments && props.rfisComments.length > 0 ? props.rfisComments.map((ele, index) => <RfiCommentCard  key={index} rfiComment={ele}/>) : <Text style={{fontSize:16,marginTop:30,fontWeight:'600',textAlign:'center'}}>No Record Found</Text>
    
                                      }
                                    </Content>
                                    </View>
                                     <View style={{marginTop:10, flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                        <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                         <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
                                        </Button>
                                </View> 
                              
                        </View>
                 </Container>
              </SafeAreaView>
            </Modal>
          );
        }
      
      
}

export default RfiCommentPopup;
