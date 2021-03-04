import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions,StyleSheet, ScrollView} from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea,Segment,Card,CardItem, Body,} from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_WEIGHT_REGULAR, FONT_FAMILY_PT_BOLD} from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { BlurView } from "@react-native-community/blur";

import moment from 'moment';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import * as config from '../../../utils/localization/config/i18n';

const CorrespondencePropertiesPopup = (props) => {

    const [visible, setVisible] = useState(true);
    const [correspondence, setCorrespondence] = useState(true);
    const [distribute, setDistibute] = useState(false);
    const [approval, setApproval] = useState(false);
    const [distributeData, setdistributeData] = useState([]);
    const [reviewerData, setreviewerData]= useState([]);
    const [ApproverData , setApproverData]= useState([]);
    const [mdl , setmdl]= useState('');
    const [adHoc, setadHoc] = useState('');
    const [to, setTo] = useState('');
    const [cc, setcc] = useState('');
    const [rec, setrec] = useState('');
    const [rev, setrev] = useState('');
    const [app, setapp] = useState('');
   
    useEffect(() => {
        _distributeData();
  
    }, [correspondence,distribute, approval]);

    const onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
      };

  const  onSegmentCorrespondenceClick = () => {
    setCorrespondence(true);
    setDistibute(false);
    setApproval(false);
  }


  const onSegmentDistributeClick = () => {
    setCorrespondence(false);
    setDistibute(true);
    setApproval(false);
  }
  const onSegmentApprovalClick = () => {
    setCorrespondence(false);
    setDistibute(false);
    setApproval(true);
  
    }

  
    const _distributeData = () => {
     
      props.worlflowSteps.forEach(element => {
      
        if (element.stepname==='DISTRIBUTE'){

          if (distributeData != undefined) 
            setdistributeData(props.distributeProperties.filter(data => data.ridWorkflowstep===element.ridWorkflowstep));
            
        } else if (element.sequence === 2 ) {
          if (distributeData != undefined)
          setdistributeData(props.distributeProperties.filter(data => data.ridWorkflowstep===element.ridWorkflowstep)); 
        }
        if (element.sequence === 2 ) {
          if (reviewerData != undefined)
            setreviewerData(props.distributeProperties.filter(data => data.ridWorkflowstep===element.ridWorkflowstep));
        }
        if (element.sequence === 3 ) {
          if (ApproverData != undefined)
            setApproverData(props.distributeProperties.filter(data => data.ridWorkflowstep===element.ridWorkflowstep));
        }
       });
  
  
      setmdl(distributeData.filter(element => element.mdlname != null && element.ridCommunicationtype===1).map(element => element.mdlname).join(', '));
      setadHoc(distributeData.filter(element => (element.firstname != null || element.lastname != null) && element.ridCommunicationtype===1).map(element => element.firstname + ' ' + element.lastname).join(', '));
      setTo(distributeData.filter(element => element.to != null && element.ridCommunicationtype===2).map(element => element.to).join(', '));
      setcc(distributeData.filter(element => element.cc != null && element.ridCommunicationtype===2).map(element => element.cc).join(', '));
      setrec(distributeData.filter(element => (element.firstname != null || element.lastname != null) && element.ridCommunicationtype===3).map(element => element.firstname + ' ' + element.lastname).join(', '));
      // if (this.category == 1) {
      setrev(reviewerData.filter(element => element.firstname != null || element.lastname != null).map(element => element.firstname + ' ' + element.lastname).join(', '));
      setapp(ApproverData.filter(element => element.firstname != null || element.lastname != null).map(element => element.firstname + ' ' + element.lastname).join(', '));
      // }
  
    }

    const _renderSegment = () => {
      //_distributeData();
      if (config.fallback == 'en'){
        return (
          <Segment style={styles.segment}>
              <Button first active={correspondence}
                  style={correspondence ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                  onPress={() => onSegmentCorrespondenceClick()}>
                  <Text uppercase={false} style={correspondence ? styles.activeSegmentText : styles.inactiveSegmentText}>
                  {t('InboxScreen:Correspondence')}
                  </Text>
              </Button>
              <Button  active={distribute}
                      style={distribute ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                      onPress={() => onSegmentDistributeClick()} >
                      <Text uppercase={false} style={distribute? styles.activeSegmentText : styles.inactiveSegmentText}>
                      {t('InboxScreen:Distribute')}
                      </Text>
                  </Button>
              <Button last active={approval}
                      style={approval ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                      onPress={() => onSegmentApprovalClick()} >
                      <Text  uppercase={false} style={approval? styles.activeSegmentText : styles.inactiveSegmentText}>
                      {t('InboxScreen:Approval')}
                      </Text>
              </Button>
             
          </Segment>
      );
      }else {
        return (
            <Segment style={styles.segment}>
                
                <Button last active={approval}
                        style={approval ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                        onPress={() => onSegmentApprovalClick()} >
                        <Text  uppercase={false} style={approval? styles.activeSegmentText : styles.inactiveSegmentText}>
                        {t('InboxScreen:Approval')}
                        </Text>
                </Button>
                <Button  active={distribute}
                        style={distribute ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                        onPress={() => onSegmentDistributeClick()} >
                        <Text uppercase={false} style={distribute? styles.activeSegmentText : styles.inactiveSegmentText}>
                        {t('InboxScreen:Distribute')}
                        </Text>
                    </Button>
                    <Button first active={correspondence}
                    style={correspondence ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                    onPress={() => onSegmentCorrespondenceClick()}>
                    <Text uppercase={false} style={correspondence ? styles.activeSegmentText : styles.inactiveSegmentText}>
                    {t('InboxScreen:Correspondence')}
                    </Text>
                </Button>
               
            </Segment>
        );
      }
    }
    
      
   const _renderCard = () => {
       if (correspondence == true) {
         if(config.fallback == 'en'){
          return (
            <Card style={{marginTop:0,marginLeft:15,marginRight:15}}>
              <CardItem>
                <Body>
                  <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Originator')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:71,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.firstname} {props.correspondenceProperties.lastname}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:DocumentType')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:40,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.documenttypename}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Sender')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:85,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.senderName}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Contract')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:80,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{`${props.correspondenceProperties.contractcode}-${props.correspondenceProperties.contractname}`}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Template')}:</Text>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:75,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.templatename? props.correspondenceProperties.templatename : 'N/A'}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Recipient')}:</Text>
                  <Text  style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:75,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.recipientName}</Text>
                </View>
                
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:ReplyRequired')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:40,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.isreplyrequired}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:ReplyRequiredDate')}:</Text>
                  {/* //<Text style={styles.dateText}>{moment(props.correspondenceProperties.replyrequiredbydate && props.correspondenceProperties.replyrequiredbydate).format('DD-MMM-YYYY')}</Text> */}
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:7,flexWrap: 'wrap', flexShrink:1}}>{ props.correspondenceProperties.replyrequiredbydate ? moment(props.correspondenceProperties.replyrequiredbydate).format('DD-MMM-YYYY'): 'N/A'}</Text>
 
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Confidential')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:57,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.isconfidential}</Text>
                </View>
                </Body>
              </CardItem>
            </Card> 
          );
         }else {
         return (
           <Card style={{marginTop:0,marginLeft:15,marginRight:15}}>
             <CardItem>
               <Body>
                 <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:75,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.firstname} {props.correspondenceProperties.lastname}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:Originator')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:45,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.documenttypename}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:DocumentType')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:85,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.senderName}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:Sender')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:90,flexWrap: 'wrap', flexShrink:1}}>{`${props.correspondenceProperties.contractcode}-${props.correspondenceProperties.contractname}`}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:Contract')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:85,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.templatename? props.correspondenceProperties.templatename : 'N/A'}</Text>
                <Text style={styles.nameText}>{t('InboxScreen:Template')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text  style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:55,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.recipientName}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:Recipient')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:4,marginRight:60,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.isreplyrequired}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:ReplyRequired')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 {/* //<Text style={styles.dateText}>{moment(props.correspondenceProperties.replyrequiredbydate && props.correspondenceProperties.replyrequiredbydate).format('DD-MMM-YYYY')}</Text> */}
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:7,flexWrap: 'wrap', flexShrink:1}}>{ props.correspondenceProperties.replyrequiredbydate ? moment(props.correspondenceProperties.replyrequiredbydate).format('DD-MMM-YYYY'): 'N/A'}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:ReplyRequiredDate')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:57,flexWrap: 'wrap', flexShrink:1}}>{props.correspondenceProperties.isconfidential}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:Confidential')}:</Text>
               </View>
               </Body>
             </CardItem>
           </Card> 
         );
        }
       } else if (distribute == true) {
       if (config.fallback == 'en'){
        return (
          
          <Card style={{marginTop:0,marginLeft:15,marginRight:15}}>
             
             <CardItem>
               <Body>
                 <View style={styles.textContainerMdl}>
                 <ScrollView>
                 <Text style={styles.nameText}>{t('InboxScreen:MDL')}:</Text>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:40,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{mdl ? mdl : 'N/A'}</Text>
                 </ScrollView>
               </View>
               <View style={styles.textContainerMdl}>
               <ScrollView>
                 <Text style={styles.nameText}>{t('InboxScreen:AdHoc')}:</Text>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:28,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{adHoc ? adHoc: 'N/A'}</Text>
                 </ScrollView>
               </View>
               <View style={styles.textContainer}>
                 <Text style={styles.nameText}>{t('InboxScreen:To')}:</Text>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:52,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{to ? to : 'N/A'}</Text>
               </View>
               <View style={styles.textContainer}>
                 <Text style={styles.nameText}>{t('InboxScreen:CC')}:</Text>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:51,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{cc ? cc : 'N/A'}</Text>
               </View>
               <View style={styles.textContainer}>
                 <Text style={styles.nameText}>{t('InboxScreen:Recipient')}:</Text>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:10,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{rec ? rec : 'N/A'}</Text>
               </View>
               </Body>
             </CardItem>
           </Card>
           
        );
       } else {
        return (
          <Card style={{marginTop:0,marginLeft:15,marginRight:15}}>
             <CardItem>
               <Body>
                 <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:35,flexWrap: 'wrap', flexShrink:1}}>{mdl ? mdl : 'N/A'}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:MDL')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:28,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{adHoc ? adHoc: 'N/A'}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:AdHoc')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:45,flexWrap: 'wrap', flexShrink:1}}>{to ? to : 'N/A'}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:To')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:51,flexWrap: 'wrap', flexShrink:1}}>{cc ? cc : 'N/A'}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:CC')}:</Text>
               </View>
               <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:10,flexWrap: 'wrap', flexShrink:1}}>{rec ? rec : 'N/A'}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:Recipient')}:</Text>
               </View>
               </Body>
             </CardItem>
           </Card>
        );
       }
        
      }  else if (approval == true) {
        if (config.fallback == 'en') {
          return (
            <Card style={{marginTop:0,marginLeft:15,marginRight:15}}>
            <CardItem>
              <Body>
                <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:Reviewer')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:10,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{rev ? rev : 'N/A'}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('InboxScreen:Approver')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:10,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{app ? app : 'N/A'}</Text>
              </View>
              </Body>
            </CardItem>
          </Card>
          );
        }else {
        return (
          <Card style={{marginTop:0,marginLeft:15,marginRight:15}}>
          <CardItem>
            <Body>
              <View style={styles.textContainerArabic}>
              <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:25,flexWrap: 'wrap', flexShrink:1}}>{rev ? rev : 'N/A'}</Text>
              <Text style={styles.nameText}>{t('InboxScreen:Reviewer')}:</Text>
            </View>
            <View style={styles.textContainerArabic}>
              <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{app ? app : 'N/A'}</Text>
              <Text style={styles.nameText}>{t('InboxScreen:Approver')}:</Text>
            </View>
            </Body>
          </CardItem>
        </Card>
        );
        }
      }  
    }

    
    if (config.fallback == 'en'){
      return(
        <>
       
      <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
          {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
             <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                 <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                      <View style={{marginTop:150, width:screenWidth-20,  alignSelf: 'stretch', marginLeft:10, marginRight:10, borderRadius:10,backgroundColor:'white'}}>
                           
                              <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                              <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('InboxScreen:CorrespondenceProperties')}</Text>
                              </ImageBackground>
                              </View>
                              <View style={{paddingTop:0,backgroundColor:'white',marginBottom:10}}>
                              {_renderSegment()}
                              {_renderCard()}
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
      </>
    );
    } else {
      return(
        <>
       
      <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
          {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
             <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                 <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                      <View style={{marginTop:150, width:screenWidth-20,  alignSelf: 'stretch', marginLeft:10, marginRight:10, borderRadius:10,backgroundColor:'white'}}>
                           
                              <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                              <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('InboxScreen:CorrespondenceProperties')}</Text>
                              </ImageBackground>
                              </View>
                              <View style={{paddingTop:0,backgroundColor:'white',marginBottom:10}}>
                              {_renderSegment()}
                              {_renderCard()}
                              </View>
                               <View style={{marginTop:10, flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                  <Button style={{margin:5,marginLeft:20,marginBottom:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
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
    margin: 10,
    marginTop: 5,
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
    fontSize: 12,
    // fontWeight: FONT_WEIGHT_BOLD,
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
    fontSize: 12,
    // fontWeight: FONT_WEIGHT_BOLD,
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
  width:screenWidth-80,
  marginLeft:10,
  marginRight:5,
  textAlign:'left',
 },
 textContainer: {
 flexDirection: "row",
 marginLeft: 10,
 marginRight: 5,
 marginTop: 5,
 marginBottom: 3,
 justifyContent: "flex-start",
},
textContainerMdl: {
  flexDirection: "row",
  marginLeft: 10,
  marginRight: 5,
  marginTop: 5,
  marginBottom: 3,
  justifyContent: "flex-start",
  height:100
 },
textContainerArabic: {
  flexDirection: "row",
  marginLeft: 10,
  marginRight: 5,
  marginTop: 5,
  marginBottom: 3,
  justifyContent: "flex-start",
  alignSelf:'flex-end'
 },
  });
export default CorrespondencePropertiesPopup;
