import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions,StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea,Segment,Card,CardItem, Body,} from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_WEIGHT_REGULAR, FONT_FAMILY_PT_BOLD} from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { BlurView } from "@react-native-community/blur";
import * as config from '../../../utils/localization/config/i18n';

import moment from 'moment';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';


const RfiPropertiesPopup = (props) => {

    const [visible, setVisible] = useState(true);
    
    const  onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
      };

   const _renderCard = () => {
       if(config.fallback == 'en'){
        return (
          <Card style={{margin:10,marginLeft:15,marginRight:15}}>
            <CardItem>
              <Body> 
                <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:DRN')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:65,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.drn && props.rfiProperties.drn}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:DueDate')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:35,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{moment(props.rfiProperties.duedate && props.rfiProperties.duedate).format('DD-MMM-YYYY')}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:SubjectDetails')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:48,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.subject  && props.rfiProperties.subject}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:InitiatorName')}:</Text>
               <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.initiatorName && props.rfiProperties.initiatorName}</Text>
              </View>
              {/* <View style={styles.textContainer}>
                <Text style={styles.nameText}>Approve By:</Text>
        <Text style={styles.dateText}>  {props.rfiProperties.initiatorName && props.rfiProperties.initiatorName}</Text>
              </View> */}
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:Status')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:55,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.status && props.rfiProperties.status}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:RFIDate')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:40,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{moment(props.rfiProperties.rfidate && props.rfiProperties.rfidate).format('DD-MMM-YYYY')}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:Contract')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:40,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{`${props.rfiProperties.contractCode} - ${props.rfiProperties.contractName}`  && `${props.rfiProperties.contractCode} - ${props.rfiProperties.contractName}`}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:Location')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:38,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.locationName && props.rfiProperties.locationName}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:Discipline')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:29,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.disciplineName && props.rfiProperties.disciplineName}</Text>
              </View>
              {/* <View style={styles.textContainer}>
                <Text style={styles.nameText}>MDL:</Text>
        <Text style={styles.dateText}>        </Text>
              </View> */}
              </Body>
            </CardItem>
          </Card>
         
        );
       }else {
         return (
           <Card style={{margin:10,marginLeft:15,marginRight:15}}>
             <CardItem>
               <Body> 
                 <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:65,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.drn && props.rfiProperties.drn}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:DRN')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:35,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{moment(props.rfiProperties.duedate && props.rfiProperties.duedate).format('DD-MMM-YYYY')}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:DueDate')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:40,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.subject  && props.rfiProperties.subject}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:SubjectDetails')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:40,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.initiatorName && props.rfiProperties.initiatorName}</Text>
                <Text style={styles.nameText}>{t('InboxScreen:InitiatorName')}:</Text>
               </View>
               {/* <View style={styles.textContainer}>
                 <Text style={styles.nameText}>Approve By:</Text>
         <Text style={styles.dateText}>  {props.rfiProperties.initiatorName && props.rfiProperties.initiatorName}</Text>
               </View> */}
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:65,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.status && props.rfiProperties.status}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:Status')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:45,flexWrap: 'wrap', flexShrink:1}}>{moment(props.rfiProperties.rfidate && props.rfiProperties.rfidate).format('DD-MMM-YYYY')}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:RFIDate')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:65,flexWrap: 'wrap', flexShrink:1}}>{`${props.rfiProperties.contractCode} - ${props.rfiProperties.contractName}`  && `${props.rfiProperties.contractCode} - ${props.rfiProperties.contractName}`}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:Contract')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:50,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.locationName && props.rfiProperties.locationName}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:Location')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:40,flexWrap: 'wrap', flexShrink:1}}>{props.rfiProperties.disciplineName && props.rfiProperties.disciplineName}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:Discipline')}:</Text>
               </View>
               {/* <View style={styles.textContainer}>
                 <Text style={styles.nameText}>MDL:</Text>
         <Text style={styles.dateText}>        </Text>
               </View> */}
               </Body>
             </CardItem>
           </Card>
          
         );
      } 
    }

    if(config.fallback == 'en'){
      return(
        <>
       
      <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
          {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
             <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                 <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                      <View style={{marginTop:150, width:screenWidth-20,  alignSelf: 'stretch', marginLeft:10, marginRight:10, borderRadius:10,backgroundColor:'white'}}>
                           
                              <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                              <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('InboxScreen:RFIProperties')}</Text>
                              </ImageBackground>
                              </View>
                              <View style={{paddingTop:0,backgroundColor:'white',marginBottom:20}}>
                              {/* {_renderSegment()} */}
                              {_renderCard()}
                              </View>
                               <View style={{marginTop:0, flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                  <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center',marginBottom:20}} onPress={() => { onButtonCancelClick() }}>
                                   <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
                                  </Button>
                          </View> 
                        
                  </View>
           </Container>
        </SafeAreaView>
      </Modal>
      </>
    );
    }else {
      return(
        <>
       
      <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
          {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
             <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                 <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                      <View style={{marginTop:150, width:screenWidth-20,  alignSelf: 'stretch', marginLeft:10, marginRight:10, borderRadius:10,backgroundColor:'white'}}>
                           
                              <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                              <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('InboxScreen:RFIProperties')}</Text>
                              </ImageBackground>
                              </View>
                              <View style={{paddingTop:0,backgroundColor:'white',marginBottom:20}}>
                              {/* {_renderSegment()} */}
                              {_renderCard()}
                              </View>
                               <View style={{marginTop:0, flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                  <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center',marginBottom:20}} onPress={() => { onButtonCancelClick() }}>
                                   <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
                                  </Button>
                          </View> 
                        
                  </View>
           </Container>
        </SafeAreaView>
      </Modal>
      </>
    );
    }   
}
const styles = StyleSheet.create({
  segment: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 15,
    paddingTop: 10,
    color:'#f2f2f2'
    //paddingBottom: SCALE_8,
},
    activeSegmentButton: {
      flex: 1,
      backgroundColor: '#373d38',
      borderWidth: 1,
     // borderRadius: 13,
      borderColor: '#373d38',
      borderBottomEndRadius: 13,
      borderTopEndRadius: 13,
      borderBottomStartRadius: 13,
      borderTopStartRadius: 13
  },
  activeSegmentText: {
    flex: 1,
    color: 'white',
    fontSize: 13,
    fontWeight: FONT_WEIGHT_BOLD,
    fontFamily:FONT_FAMILY_PT_REGULAR,
    textAlign: 'center'
},
inactiveSegmentInboxButton: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    // borderRadius: 12,
    borderColor: '#f2f2f2',
    // borderBottomStartRadius: 13,
    // borderTopStartRadius: 13
},
inactiveSegmentTaskButton: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    // borderRadius: 12,
    borderColor: '#f2f2f2',
    borderBottomEndRadius: 13,
    borderTopEndRadius: 13,
},
inactiveSegmentText: {
    flex: 1,
    color: '#373d38',
    fontSize: 13,
    fontWeight: FONT_WEIGHT_BOLD,
    fontFamily:FONT_FAMILY_PT_REGULAR,
    textAlign: 'center'
},
nameText: {
  fontSize:14,
  fontWeight: FONT_WEIGHT_BOLD,
  fontFamily:FONT_FAMILY_PT_BOLD,
  color:'#4d4f5c',
 },
 dateText: {
  fontSize:14,
  fontWeight: FONT_WEIGHT_REGULAR,
  fontFamily:FONT_FAMILY_PT_REGULAR,
  color:'#43425d',
  flexWrap: 'wrap',
  flexShrink: 1,
  width:screenWidth-80
 },
 textContainer: {
        
  flexDirection:'row',
  marginTop:10,
  marginBottom:0,
 justifyContent:'flex-start',
  
},
textContainerArabic: {
        
  flexDirection:'row',
  marginTop:10,
  marginBottom:0,
 justifyContent:'flex-start',
 alignSelf:'flex-end'
  
},
  });
export default RfiPropertiesPopup;
