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
import {
  Container,
  Button,
  Text,
  Textarea
} from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import {
  FONT_FAMILY_PT_BOLD,
  FONT_FAMILY_PT_REGULAR
} from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { constants } from '../../../utils/constants/constants';
import { Reachability } from '../../../services/netInfo/Rechability';
import axios from 'axios'
import i18n, { t } from '../../../utils/localization/servicesi18n/index';

const CorrespondenceExternalLinkPopup = (props) => {

    const [visible, setVisible] = useState(true);
    const [comment, setcomment] =  useState('');
    const [isback, setIsback] = useState(false);

    const onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
      };
      
      const onButtonClick = () => {
        props.onModalClose(); 
        setVisible(false);
        props.getApproveValues(true);
      };

    const  onButtonApproveClick = () => {
        const wrokFlowTransactionId = props.workFTID;
        const Approve = "Y";
        const comments = comment
        AsyncStorage.getItem('token').then((token) => {
          submitCorrespondenceDetailApproveReject(wrokFlowTransactionId, Approve, comments, token);   
        });
      };

    const  submitCorrespondenceDetailApproveReject =  (wftId, approve, comment, token) => {
        console.log('Correspondence details Action method  Approve');
        // return async (dispatch) => {
            try {
                const params = {
                  workFlowTransactionID: wftId,
                  approve: approve,
                  comment: comment
                    
                }

                console.log('Parameter in Correspondence Details Approve');
                console.log(params);
                console.log(token);
                // <Loader isLoading = {true} />
                axios.post(`${constants.webService.baseURL}${constants.webService.methods.common.correspondenceApproveReject}`, params, axios.defaults.headers.Authorization = `Bearer ${token}`)
                .then(res => {
                  console.log('Correspondence Details Approve response inside');
                    console.log(res);
                    console.log(res.data)
                    if (res.data.statusCode == "200") {
                      alertWithMessage("Initiated sucessfully");  
                    } else {
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
            { text: "OK", onPress: () => {onButtonClick()} }
        ],
        { cancelable: false }
    );
    
      return(
        <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
            {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
               <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
               <ScrollView>
                   <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)'
, paddingTop:0}} >
                        <View style={{marginTop:200,width:screenWidth-40, height:240,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                        <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{'External Link'}</Text>
                                </ImageBackground>
                                </View>
                                <View style={{paddingTop:0,backgroundColor:'white',marginBottom:50}}>
                                   <Text style={{fontSize:14,margin:5,marginLeft:15,marginBottom:0,fontFamily:FONT_FAMILY_PT_REGULAR}}>{'External links'}:</Text>
                                     <View style={{margin:5,marginLeft:10,marginRight:10,height:30}}>
                                       <Textarea style={{height:70, color:'blue',fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:14}} spellCheck="false"  rowSpan={4} bordered  type="text" value={props.externalLink}  />
                                     </View>
                                </View>
                                 <View style={{marginTop:10, flexDirection:'row',justifyContent:'center'}}>
                                    <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                     <Text uppercase={false} style={{fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
                                    </Button>
                                     {/* <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonApproveClick() }}>
                                    <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Initiate')}</Text>
                                     </Button> */}
                                </View> 
                                </View>
             </Container>
             </ScrollView>
          </SafeAreaView>
        </Modal>
      );
      
}

export default CorrespondenceExternalLinkPopup;
