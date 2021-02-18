import React, { useState } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions } from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea } from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD, FONT_FAMILY_PT_REGULAR } from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { BlurView } from "@react-native-community/blur";
import CorrespondenceCommentCard from '../../../componets/correspondenceComment/CorrespondenceCommentCard';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import * as config from '../../../utils/localization/config/i18n';

const CorrespondenceCommentPopup = (props) => {

     const [visible, setVisible] = useState(true);
     
     const onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
      };
       if (config.fallback == 'en'){
        return(
          <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
              {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
                 <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                     <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                          <View style={{marginTop:150, width:screenWidth-20,  alignSelf: 'stretch',marginLeft:10, marginRight:10, borderRadius:10,backgroundColor:'white'}}>
                          <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                  <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                  <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('InboxScreen:CorrespondenceComment')}</Text>
                                  </ImageBackground>
                                  </View>
                                  <View style={{paddingTop:0,backgroundColor:'white',marginBottom:40,height:250}}>
                                    <Content>
                                    {
                                      props.correspondenceComments && props.correspondenceComments.length > 0 ? props.correspondenceComments.map((ele, index) => <CorrespondenceCommentCard  key={index} correspondenceComment={ele}/>) : <Text style={{fontSize:16, marginTop:30,fontWeight:'600',textAlign:'center'}}>No Record Found</Text>
  
                                    }
                                  </Content>
                                  </View>
                                   <View style={{marginTop:5, flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                      <Button style={{margin:5,marginLeft:20,marginBottom:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                       <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
                                      </Button>
                              </View> 
                            
                      </View>
               </Container>
            </SafeAreaView>
          </Modal>
        );
       } else {
      return(
        <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
            {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
               <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                   <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                        <View style={{marginTop:150, width:screenWidth-20,  alignSelf: 'stretch',marginLeft:10, marginRight:10, borderRadius:10,backgroundColor:'white'}}>
                        <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('InboxScreen:CorrespondenceComment')}</Text>
                                </ImageBackground>
                                </View>
                                <View style={{paddingTop:0,backgroundColor:'white',marginBottom:40,height:200}}>
                                  <Content>
                                  {
                                    props.correspondenceComments && props.correspondenceComments.length > 0 ? props.correspondenceComments.map((ele, index) => <CorrespondenceCommentCard  key={index} correspondenceComment={ele}/>) : <Text style={{fontSize:16, marginTop:30,fontWeight:'600',textAlign:'center'}}>No Record Found</Text>

                                  }
                                </Content>
                                </View>
                                 <View style={{marginTop:10, flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <Button style={{margin:5,marginLeft:20,marginBottom:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
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

export default CorrespondenceCommentPopup;
