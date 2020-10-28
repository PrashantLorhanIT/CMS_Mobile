import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions,StyleSheet, ScrollView} from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea,Segment,Card,CardItem, Body,} from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_WEIGHT_REGULAR, FONT_FAMILY_PT_BOLD} from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { BlurView } from "@react-native-community/blur";
import AttendeesCard from './AttendeesCard';
import TaskCommentCard from './TaskCommentCard';
import moment from 'moment';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import * as config from '../../../utils/localization/config/i18n';


const MomPropertiesPopup = (props) => {

    const [visible, setVisible] = useState(true);
    const [momDetails, setMomDetails] = useState(true);
    const [attendees, setAttendes] = useState(false);
    const [taskComment, setTaskComment] = useState(false);
    
    const  onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
      };

      const  onSegmentMomDetailsClick = () => {
   console.log(`onSegmentCabClick - onSegmentCorrespondenceClick`);
   setMomDetails(true);
   setAttendes(false);
   setTaskComment(false);
    // _distributeData();
  
  }

  const onSegmentAttendesClick = () => {
  console.log(`onSegmentCabClick - onSegmentDistributeClick`);
   setMomDetails(false);
   setAttendes(true);
   setTaskComment(false);
  }
  const onSegmentTaskCommentClick = () => {
    console.log(`onSegmentCabClick - onSegmentDistributeClick`);
    setMomDetails(false);
    setAttendes(false);
    setTaskComment(true);
  
    }

    const _renderSegment = () => {
      if(config.fallback == 'en'){
        return (
          <Segment style={styles.segment}>
              <Button first active={momDetails}
                  style={momDetails ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                  onPress={() => onSegmentMomDetailsClick()}>
                  <Text uppercase={false} style={momDetails ? styles.activeSegmentText : styles.inactiveSegmentText}>
                  {t('InboxScreen:MOMDetails')}
                  </Text>
              </Button>
              <Button  active={attendees}
                      style={attendees ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                      onPress={() => onSegmentAttendesClick()} >
                      <Text uppercase={false} style={attendees? styles.activeSegmentText : styles.inactiveSegmentText}>
                      {t('InboxScreen:Attendees')}
                      </Text>
                  </Button>
              <Button last active={taskComment}
                      style={taskComment ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                      onPress={() => onSegmentTaskCommentClick()} >
                      <Text uppercase={false} style={taskComment? styles.activeSegmentText : styles.inactiveSegmentText}>
                      {t('InboxScreen:TaskComment')}
                      </Text>
              </Button>
             
          </Segment>
      );
      }else {
        return (
          <Segment style={styles.segment}>
              <Button last active={taskComment}
                      style={taskComment ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                      onPress={() => onSegmentTaskCommentClick()} >
                      <Text uppercase={false} style={taskComment? styles.activeSegmentText : styles.inactiveSegmentText}>
                      {t('InboxScreen:TaskComment')}
                      </Text>
              </Button>
              <Button  active={attendees}
                      style={attendees ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                      onPress={() => onSegmentAttendesClick()} >
                      <Text uppercase={false} style={attendees? styles.activeSegmentText : styles.inactiveSegmentText}>
                      {t('InboxScreen:Attendees')}
                      </Text>
                  </Button>
                  <Button first active={momDetails}
                  style={momDetails ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                  onPress={() => onSegmentMomDetailsClick()}>
                  <Text uppercase={false} style={momDetails ? styles.activeSegmentText : styles.inactiveSegmentText}>
                  {t('InboxScreen:MOMDetails')}
                  </Text>
              </Button>
             
          </Segment>
      );
      }
       
    }
    
      
   const _renderCard = () => {
       if (momDetails == true) {
         if (config.fallback == 'en'){
          return (
            <Card style={{marginTop:5,marginLeft:15,marginRight:15,height:320}}>
              <CardItem>
                <Body>
                  <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:DRN')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:77,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.drn && props.momProperties.drn} </Text>
                </View>
                {/* <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Organizer')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:46,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.organizerName && props.momProperties.organizerName}</Text>
                </View> */}
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:AddedBy')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:50,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.initiatorName && props.momProperties.initiatorName}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Status')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:68,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.status && props.momProperties.status}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Discipline')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:45,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.discipline && props.momProperties.discipline}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:ProjectContract')}:</Text>
                  <Text style={styles.dateText}>{props.momProperties.contract && props.momProperties.contract}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:SubjectDetails')}:</Text>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:60,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.subject && props.momProperties.subject}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:DueDate')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:48,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{moment(props.momProperties.meetingdate && props.momProperties.meetingdate).format('DD-MMM-YYYY')}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Location')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:52,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.location && props.momProperties.location}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:MeetingAgenda')}:</Text>
                  <Text style={styles.dateText}>{props.momProperties.meetingagenda && props.momProperties.meetingagenda}</Text>
                </View>
                {/* <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:SubjectDetails')}:</Text>
                 <Text style={styles.dateText}>               {props.momProperties.subject && props.momProperties.subject}</Text>
                </View> */}
                </Body>
              </CardItem>
            </Card>
           
          );
         }else {
          return (
            <Card style={{marginTop:5,marginLeft:15,marginRight:15,height:320}}>
              <CardItem>
                <Body>
                  <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:85,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.drn && props.momProperties.drn} </Text>
                  <Text style={styles.nameText}>{t('InboxScreen:DRN')}:</Text>
                </View>
                {/* <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Organizer')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:46,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.organizerName && props.momProperties.organizerName}</Text>
                </View> */}
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:45,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.initiatorName && props.momProperties.initiatorName}</Text>
                  <Text style={styles.nameText}>{t('InboxScreen:AddedBy')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:85,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.status && props.momProperties.status}</Text>
                  <Text style={styles.nameText}>{t('InboxScreen:Status')}:</Text>
               </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:70,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.discipline && props.momProperties.discipline}</Text>
                  <Text style={styles.nameText}>{t('InboxScreen:Discipline')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:20,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.contract && props.momProperties.contract}</Text>
                  <Text style={styles.nameText}>{t('InboxScreen:ProjectContract')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:75,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.subject && props.momProperties.subject}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:SubjectDetails')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:25,flexWrap: 'wrap', flexShrink:1}}>{moment(props.momProperties.meetingdate && props.momProperties.meetingdate).format('DD-MMM-YYYY')}</Text>
                  <Text style={styles.nameText}>{t('InboxScreen:DueDate')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:70,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.location && props.momProperties.location}</Text>
                  <Text style={styles.nameText}>{t('InboxScreen:Location')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:52,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{props.momProperties.meetingagenda && props.momProperties.meetingagenda}</Text>
                  <Text style={styles.nameText}>{t('InboxScreen:MeetingAgenda')}:</Text>
                </View>
                {/* <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:SubjectDetails')}:</Text>
                 <Text style={styles.dateText}>               {props.momProperties.subject && props.momProperties.subject}</Text>
                </View> */}
                </Body>
              </CardItem>
            </Card>
           
          );
         }
        
       } else if (attendees == true) {
       console.log('Attendees data');
       console.log(props.attendees);
        return (
          <View style={{margin:5,marginLeft:10,marginRight:10,height:300}}>
            <Content>
                {
               props.attendees && props.attendees.length > 0 ? props.attendees.map((ele, index) => <AttendeesCard  key={index} attendeesData={ele} />) : <Text style={styles.noRecordsText}>No Record Found</Text>
                 }
            </Content>    
          </View>
        );
      }  else if (taskComment == true) {
        return (
          <View style={{margin:5,marginLeft:10,marginRight:10,height:300}}>
              <Content>
                {
               props.taskComment.map((ele, index) => <TaskCommentCard  key={index} taskComment={ele} />) 
                }
              </Content>
        </View>
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
                      <View style={{marginTop:100, height:520, width:screenWidth-20, marginLeft:10, marginRight:10, borderRadius:10,backgroundColor:'white'}}>
                           
                              <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                              <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('InboxScreen:MOMProperties')}</Text>
                              </ImageBackground>
                              </View>
                              <View style={{marginTop:0,backgroundColor:'white',marginBottom:10}}>
                              {_renderSegment()}
                              <ScrollView>
                              {_renderCard()}

                              </ScrollView>
                              </View>
                               <View style={{marginTop:10, marginBottom:10,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                  <Button style={{margin:5,marginTop:0,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                   <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>Cancel</Text>
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
                      <View style={{marginTop:100, height:520, width:screenWidth-20, marginLeft:10, marginRight:10, borderRadius:10,backgroundColor:'white'}}>
                           
                              <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                              <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('InboxScreen:MOMProperties')}</Text>
                              </ImageBackground>
                              </View>
                              <View style={{marginTop:0,backgroundColor:'white',marginBottom:10}}>
                              {_renderSegment()}
                              <ScrollView>
                              {_renderCard()}

                              </ScrollView>
                              </View>
                               <View style={{marginTop:10, marginBottom:10,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                  <Button style={{margin:5,marginTop:0,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
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
    fontSize: 12,
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
  width:screenWidth-80,
  marginLeft:5
 },
 textContainer: {
        
  flexDirection:'row',
  marginTop:5,
  marginBottom:0,
 justifyContent:'flex-start',
  
},
textContainerArabic: {
        
  flexDirection:'row',
  marginTop:5,
  marginBottom:0,
 justifyContent:'flex-start',
 alignSelf:'flex-end'
  
},
  });
export default MomPropertiesPopup;
