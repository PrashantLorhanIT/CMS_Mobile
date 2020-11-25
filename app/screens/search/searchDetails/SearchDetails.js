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
import { SafeAreaView, Dimensions, ScrollView, Image,TouchableOpacity,StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import info from '../../../assets/image/info/info.png';
import comment from '../../../assets/image/comments/comment.png';
import forward from '../../../assets/image/forward/Forword.png';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD, FONT_FAMILY_PT_REGULAR, FONT_WEIGHT_REGULAR,FONT_SIZE_14} from '../../../utils/styles/typography';
import CorrespondenceAttachmentCard from '../../../componets/correspondenceAttachment/CorrespondenceAttachmentCard';
import TaskCommentCard from '../../../componets/correspondencePopup/momPropertiesPopup/TaskCommentCard';
import AttendeesCard from '../../../componets/correspondencePopup/momPropertiesPopup/AttendeesCard';
const screenWidth = Dimensions.get("window").width;
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import * as config from '../../../utils/localization/config/i18n';

class SearchDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
        isCorrespondence:true,
        isDistribute:false,
        isApproval:false,
        mdl:'',
        adHoc:'',
        to:'',
        cc: '',
        recipient:'',
        reviewer:'',
        approver: '',
        distributeData:[],
        reviewerData:[],
        ApproverData:[],
        };
    }

    componentDidMount  = () => {

      console.log('Search Details Componet didmount method');
      console.log(this.props.navigation.state.params.searchType);
      console.log(this.props.navigation.state.params.searchData);
      const token = this.props.loggedInUser.token;

      if (this.props.navigation.state.params.searchType === "Correspondence") {

        const corrId = this.props.navigation.state.params.searchData.ridCorr;
        console.log('Corrrespondence corr id ');
        console.log(corrId);
        this.props.getQuickSearchRecordDetailsProperties(corrId, token);
  
       } else if (this.props.navigation.state.params.searchType == "MOM") {

        const momId = this.props.navigation.state.params.searchData.ridMom;
        this.props.getQuickSearchRecordsMomDetailsProperties(momId, token);

      } else if (this.props.navigation.state.params.searchType == "RFI") {

        const rfiId = this.props.navigation.state.params.searchData.ridRfi;
        this.props.getQuickSearchRecordRFIDetailsProperties(rfiId, token);
      } 
    }
     _renderCorrespondenceCard = () => {
      if (config.fallback == "en"){ 
        return (
          <>
          <View style={{marginLeft:10,marginRight:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center'}}>
          <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginLeft:20,color:'white'}}>{this.state.searchType}{t('SearchScreen:Correspondence')}</Text>   
          </View>
          <Card style={{margin:10,marginLeft:15,marginRight:15}}>
            <CardItem>
              <Body>
                <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Originator')}:</Text>
               <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:65,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{ this.props.searchCorrespondenceProperties.firstname && this.props.searchCorrespondenceProperties.firstname } { this.props.searchCorrespondenceProperties.lastname && this.props.searchCorrespondenceProperties.lastname } </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:DocumentType')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:33,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.documenttypename ? this.props.searchCorrespondenceProperties.documenttypename : 'N/A'}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Sender')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:88,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.senderName ? this.props.searchCorrespondenceProperties.senderName : 'N/A'}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Contract')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:80,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.contractname ? this.props.searchCorrespondenceProperties.contractname: 'N/A'}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Template')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:75,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.templatename ? this.props.searchCorrespondenceProperties.templatename: 'N/A'}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Recipient')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:75,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.recipientName ? this.props.searchCorrespondenceProperties.recipientName : 'N/A'}</Text>
              </View>
              {/* <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Recipient')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:75,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.isreplyrequired ? this.props.searchCorrespondenceProperties.isreplyrequired: 'N/A'}</Text>
              </View> */} 
               <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:ReplyRequiredDate')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.replyrequiredbydate ? moment(this.props.searchCorrespondenceProperties.replyrequiredbydate).format('MMM DD, YYYY  hh:ss') : 'N/A'} </Text>
                
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Confidential')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:58,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.isconfidential ? this.props.searchCorrespondenceProperties.isconfidential : 'N/A'}</Text>
              </View>
              </Body>
            </CardItem>
          </Card>
         </>
        );
      } else {
        return (
            <>
            <View style={{marginLeft:10,marginRight:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center',alignItems:'flex-end'}}>
            <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginRight:20,color:'white'}}>{this.state.searchType}{t('SearchScreen:Correspondence')}</Text>   
            </View>
            <Card style={{margin:10,marginLeft:15,marginRight:15}}>
              <CardItem>
                <Body>
                  <View style={styles.textContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:45,flexWrap: 'wrap', flexShrink:1}}>{ this.props.searchCorrespondenceProperties.firstname && this.props.searchCorrespondenceProperties.firstname } { this.props.searchCorrespondenceProperties.lastname && this.props.searchCorrespondenceProperties.lastname } </Text>
                 <Text style={styles.nameText}>{t('SearchScreen:Originator')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:20,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.documenttypename ? this.props.searchCorrespondenceProperties.documenttypename : 'N/A'}</Text>
                  <Text style={styles.nameText}>{t('SearchScreen:DocumentType')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:65,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.senderName ? this.props.searchCorrespondenceProperties.senderName : 'N/A'}</Text>
                  <Text style={styles.nameText}>{t('SearchScreen:Sender')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:65,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.contractname ? this.props.searchCorrespondenceProperties.contractname: 'N/A'}</Text>
                  <Text style={styles.nameText}>{t('SearchScreen:Contract')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:70,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.templatename ? this.props.searchCorrespondenceProperties.templatename: 'N/A'}</Text>
                  <Text style={styles.nameText}>{t('SearchScreen:Template')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:60,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.recipientName ? this.props.searchCorrespondenceProperties.recipientName : 'N/A'}</Text>
                  <Text style={styles.nameText}>{t('SearchScreen:Recipient')}:</Text>
                </View>
                {/* <View style={styles.textContainer}>
                  <Text style={styles.nameText}>{t('SearchScreen:Recipient')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:75,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.isreplyrequired ? this.props.searchCorrespondenceProperties.isreplyrequired: 'N/A'}</Text>
                </View> */} 
                 <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:0,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.replyrequiredbydate ? moment(this.props.searchCorrespondenceProperties.replyrequiredbydate).format('MMM DD, YYYY  hh:ss') : 'N/A'} </Text>
                  <Text style={styles.nameText}>{t('SearchScreen:ReplyRequiredDate')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:80,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchCorrespondenceProperties.isconfidential ? this.props.searchCorrespondenceProperties.isconfidential : 'N/A'}</Text>
                  <Text style={styles.nameText}>{t('SearchScreen:Confidential')}:</Text>
                </View>
                </Body>
              </CardItem>
            </Card>
           </>
          );
        }
     }
 _renderCorrespondenceDistribute =() => {
  if (config.fallback == "en"){ 
    return (
      <>
       <View style={{marginLeft:10,marginRight:10,marginTop:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center'}}>
               <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginLeft:20,color:'white'}}>{this.state.searchType}{t('SearchScreen:Distribute')}</Text>   
          </View>
          <Card style={{margin:10,marginLeft:15,marginRight:15}}>
                 <CardItem>
                   <Body>
                     <View style={styles.textContainer}>
                     <Text style={styles.nameText}>{t('SearchScreen:MDL')}:</Text>
                     <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:42,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.state.mdl ? this.state.mdl : 'N/A'}</Text>
                   </View>
                   <View style={styles.textContainer}>
                     <Text style={styles.nameText}>{t('SearchScreen:AdHoc')}:</Text>
                     <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:28,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.state.adHoc ? this.state.adHoc : 'N/A'}</Text>
                   </View>
                   <View style={styles.textContainer}>
                     <Text style={styles.nameText}>{t('SearchScreen:To')}:</Text>
                     <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:55,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.state.to ? this.state.to : 'N/A'}</Text>
                   </View>
                   <View style={styles.textContainer}>
                     <Text style={styles.nameText}>{t('SearchScreen:CC')}:</Text>
                     <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:50,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.state.cc ? this.state.cc : 'N/A'}</Text>
                   </View>
                   <View style={styles.textContainer}>
                     <Text style={styles.nameText}>{t('SearchScreen:Recipient')}:</Text>
                     <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.state.recipient ? this.state.recipient : 'N/A'}</Text>
                   </View>
                   </Body>
                 </CardItem>
               </Card>
      </>
      );
  } else {
   return (
   <>
    <View style={{marginLeft:10,marginRight:10,marginTop:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center',alignItems:'flex-end'}}>
            <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginRight:20,color:'white'}}>{this.state.searchType}{t('SearchScreen:Distribute')}</Text>   
       </View>
       <Card style={{margin:10,marginLeft:15,marginRight:15}}>
              <CardItem>
                <Body>
                  <View style={styles.textContainerArabic}>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginRight:5,marginRight:32,flexWrap: 'wrap', flexShrink:1}}>{this.state.mdl ? this.state.mdl : 'N/A'}</Text>
                   <Text style={styles.nameText}>:{t('SearchScreen:MDL')}</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1, textAlign:'right'}}>{this.state.adHoc ? this.state.adHoc : 'N/A'}</Text>
                  <Text style={styles.nameText}>{t('SearchScreen:AdHoc')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:40,flexWrap: 'wrap', flexShrink:1}}>{this.state.to ? this.state.to : 'N/A'}</Text>
                  <Text style={styles.nameText}>{t('SearchScreen:To')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:45,flexWrap: 'wrap', flexShrink:1}}>{this.state.cc ? this.state.cc : 'N/A'}</Text>
                   <Text style={styles.nameText}>:{t('SearchScreen:CC')}</Text>
                </View>
                <View style={styles.textContainerArabic}>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:25,flexWrap: 'wrap', flexShrink:1}}>{this.state.recipient ? this.state.recipient : 'N/A'}</Text>
                   <Text style={styles.nameText}>{t('SearchScreen:Recipient')}:</Text>
                </View>
                </Body>
              </CardItem>
            </Card>
   </>
   );
  }
 }

 _renderCorrepondenceApproval =() => {

  if (config.fallback == "en"){ 
    return (
      <>
      <View style={{marginLeft:10,marginRight:10,marginTop:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center'}}>
             <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginLeft:20, color:'white'}}>{this.state.searchType}{t('SearchScreen:Approval')}</Text>   
        </View>
        <Card style={{margin:10,marginLeft:15,marginRight:15}}>
            <CardItem>
              <Body>
                <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Reviewer')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.state.reviewer ? this.state.reviewer : 'N/A'}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Approver')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.state.approver ? this.state.approver: 'N/A'}</Text>
              </View>
              </Body>
            </CardItem>
          </Card>
        </>
    );

  } else {
    return (
      <>
      <View style={{marginLeft:10,marginRight:10,marginTop:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center',alignItems:'flex-end'}}>
             <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginRight:20, color:'white'}}>{this.state.searchType}{t('SearchScreen:Approval')}</Text>   
        </View>
        <Card style={{margin:10,marginLeft:15,marginRight:15}}>
            <CardItem>
              <Body>
                <View style={styles.textContainerArabic}>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.state.reviewer ? this.state.reviewer : 'A/N'}</Text>
                <Text style={styles.nameText}>{t('SearchScreen:Reviewer')}:</Text>
              </View>
              <View style={styles.textContainerArabic}>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.state.approver ? this.state.approver: 'A/N'}</Text>
                <Text style={styles.nameText}>{t('SearchScreen:Approver')}:</Text>
              </View>
              </Body>
            </CardItem>
          </Card>
        </>
    );
  }

   
 }

 _renderMomCard = () => {
   if (config.fallback == 'en'){
    return (
      <>
      <View style={{marginLeft:10,marginRight:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center'}}>
      <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginLeft:20,color:'white'}}>{t('SearchScreen:MOM')}</Text>   
  </View>
      <Card style={{margin:10,marginLeft:15,marginRight:15}}>
        <CardItem>
          <Body>
            <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:DRN')}:</Text>
           <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:83,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{ this.props.searchMomProperties.drn ? this.props.searchMomProperties.drn : 'N/A'} </Text>
          </View>
          {/* <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:Originator')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:46,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.organizerName ? this.props.searchMomProperties.organizerName: 'N/A'}</Text>
          </View> */}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:AddedBy')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:50,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.initiatorName ? this.props.searchMomProperties.initiatorName : 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:Status')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:71,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.status ? this.props.searchMomProperties.status: 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:Discipline')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:48,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.discipline ? this.props.searchMomProperties.discipline: 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:Project/Contract')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.contract ? this.props.searchMomProperties.contract : 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:Subject')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:63,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.subject ? this.props.searchMomProperties.subject: 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:DueDate')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:53,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.meetingdate ? moment(this.props.searchMomProperties.meetingdate).format('MMM DD, YYYY  hh:ss') : 'N/A'}
  </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:Location')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:57,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.location ? this.props.searchMomProperties.location: 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:MeetingAgenda')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.meetingagenda ? this.props.searchMomProperties.meetingagenda: 'N/A'}</Text>
          </View>
          </Body>
        </CardItem>
      </Card>
     </>
    );
   } else{
  return (
    <>
    <View style={{marginLeft:10,marginRight:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center',alignItems:'flex-end'}}>
    <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginRight:20,color:'white'}}>{t('SearchScreen:MOM')}</Text>   
</View>
    <Card style={{margin:10,marginLeft:15,marginRight:15}}>
      <CardItem>
        <Body>
          <View style={styles.textContainerArabic}>
         <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:70,flexWrap: 'wrap', flexShrink:1}}>{ this.props.searchMomProperties.drn ? this.props.searchMomProperties.drn : 'N/A'} </Text>
         <Text style={styles.nameText}>:{t('SearchScreen:DRN')}</Text>
        </View>
        {/* <View style={styles.textContainer}>
          <Text style={styles.nameText}>{t('SearchScreen:Originator')}:</Text>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:46,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.organizerName ? this.props.searchMomProperties.organizerName: 'N/A'}</Text>
        </View> */}
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:15,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.initiatorName ? this.props.searchMomProperties.initiatorName : 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:AddedBy')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:70,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.status ? this.props.searchMomProperties.status: 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:Status')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:50,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.discipline ? this.props.searchMomProperties.discipline: 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:Discipline')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:0,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.contract ? this.props.searchMomProperties.contract : 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:Project/Contract')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:60,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.subject ? this.props.searchMomProperties.subject: 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:Subject')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:10,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.meetingdate ? moment(this.props.searchMomProperties.meetingdate).format('MMM DD, YYYY  hh:ss') : 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:DueDate')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:65,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.location ? this.props.searchMomProperties.location: 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:Location')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:0,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchMomProperties.meetingagenda ? this.props.searchMomProperties.meetingagenda: 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:MeetingAgenda')}:</Text>
        </View>
        </Body>
      </CardItem>
    </Card>
   </>
  );
  }
}
_renderMOMTaskComment =() => {
  if(config.fallback == 'en'){
    return (
      <>
      <View style={{marginLeft:10,marginRight:10,marginTop:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center'}}>
             <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginLeft:20, color:'white'}}>{t('SearchScreen:MeetingAgenda')}</Text>   
        </View>
        <Card style={{margin:10,marginLeft:15,marginRight:15}}>
            <Content>
                  {
                 this.props.searchMomTaskComment && this.props.searchMomTaskComment.length > 0 ? this.props.searchMomTaskComment.map((ele, index) => <TaskCommentCard  key={index} taskComment={ele} />) : <Text style={styles.noRecordsText}>No Record Found</Text>
                   }
              </Content>
          </Card>
        </>
    );
  } else {
    return (
      <>
      <View style={{marginLeft:10,marginRight:10,marginTop:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center',alignItems:'flex-end'}}>
             <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginRight:20, color:'white'}}>{t('SearchScreen:MeetingAgenda')}</Text>   
        </View>
        <Card style={{margin:10,marginLeft:15,marginRight:15}}>
            <Content>
                  {
                 this.props.searchMomTaskComment && this.props.searchMomTaskComment.length > 0 ? this.props.searchMomTaskComment.map((ele, index) => <TaskCommentCard  key={index} taskComment={ele} />) : <Text style={styles.noRecordsText}>No Record Found</Text>
                   }
              </Content>
          </Card>
        </>
    );
  } 
}
_renderMOMAttendees =() => {
  if(config.fallback == 'en'){
    return (
      <>
      <View style={{marginLeft:10,marginRight:10,marginTop:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center'}}>
             <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginLeft:20, color:'white'}}>{t('SearchScreen:Attendees')}</Text>   
        </View>
        <Card style={{margin:10,marginLeft:15,marginRight:15}}>
            <Content>
                  {
                 this.props.searchMomAttendees && this.props.searchMomAttendees.length > 0 ? this.props.searchMomAttendees.map((ele, index) => <AttendeesCard  key={index} attendeesData={ele} />) : <Text style={styles.noRecordsText}>No Record Found</Text>
                   }
              </Content>
          </Card>
        </>
    );
  } else {
    return (
      <>
      <View style={{marginLeft:10,marginRight:10,marginTop:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center',alignItems:'flex-end'}}>
             <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginRight:20, color:'white'}}>{t('SearchScreen:Attendees')}</Text>   
        </View>
        <Card style={{margin:10,marginLeft:15,marginRight:15}}>
            <Content>
                  {
                 this.props.searchMomAttendees && this.props.searchMomAttendees.length > 0 ? this.props.searchMomAttendees.map((ele, index) => <AttendeesCard  key={index} attendeesData={ele} />) : <Text style={styles.noRecordsText}>No Record Found</Text>
                   }
              </Content>
          </Card>
        </>
    );
  }
  
}

_renderRFICard = () => {

  if (config.fallback == 'en'){
    return (
      <>
      <View style={{marginLeft:10,marginRight:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center'}}>
      <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginLeft:20,color:'white'}}>{t('SearchScreen:RFI')}</Text>   
       </View>
      <Card style={{margin:10,marginLeft:15,marginRight:15}}>
        <CardItem>
          <Body>
            <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:DRN')}:</Text>
           <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:70,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{ this.props.searchRFIProperties.drn ? this.props.searchRFIProperties.drn: 'N/A' } </Text>
          </View>
         
          {/* <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:AddedBy')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:37,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.addedby ? this.props.searchRFIProperties.addedby: 'N/A'}</Text>
          </View> */}
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:InitiatorName')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.initiatorName ? this.props.searchRFIProperties.initiatorName: 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:Status')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:58,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.status ? this.props.searchRFIProperties.status: 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:Contract')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:45,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{`${this.props.searchRFIProperties.contractCode} - ${this.props.searchRFIProperties.contractName}` ?`${this.props.searchRFIProperties.contractCode} - ${this.props.searchRFIProperties.contractName}` : 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:RFIDate')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:42,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.rfidate ? moment(this.props.searchRFIProperties.rfidate).format('MMM DD, YYYY  hh:ss'): 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:DueDate')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:38,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.duedate ? moment(this.props.searchRFIProperties.duedate).format('MMM DD, YYYY  hh:ss'): 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('SearchScreen:Subject')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:50,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.subject ? this.props.searchRFIProperties.subject: 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Location:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:40,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{`${this.props.searchRFIProperties.locationCode}- ${this.props.searchRFIProperties.locationName}` ? `${this.props.searchRFIProperties.locationCode}-${this.props.searchRFIProperties.locationName}`: 'N/A'}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>Discipline:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:33,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{`${this.props.searchRFIProperties.disciplineCode}- ${this.props.searchRFIProperties.disciplineName}` ? `${this.props.searchRFIProperties.disciplineCode}-${this.props.searchRFIProperties.disciplineName}`: 'N/A'}</Text>
          </View>
          </Body>
        </CardItem>
      </Card>
     </>
    );
  } else {
  return (
    <>
    <View style={{marginLeft:10,marginRight:10,height:40,backgroundColor:'#383d38',alignContent:'center',justifyContent:'center',alignItems:'flex-end'}}>
    <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginRight:20,color:'white'}}>{t('SearchScreen:RFI')}</Text>   
     </View>
    <Card style={{margin:10,marginLeft:15,marginRight:15}}>
      <CardItem>
        <Body>
          <View style={styles.textContainerArabic}>
         <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:60,flexWrap: 'wrap', flexShrink:1}}>{ this.props.searchRFIProperties.drn ? this.props.searchRFIProperties.drn: 'N/A' } </Text>
         <Text style={styles.nameText}>{t('SearchScreen:DRN')}:</Text>
        </View>
       
        {/* <View style={styles.textContainer}>
          <Text style={styles.nameText}>{t('SearchScreen:AddedBy')}:</Text>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:37,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.addedby ? this.props.searchRFIProperties.addedby: 'N/A'}</Text>
        </View> */}
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:30,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.initiatorName ? this.props.searchRFIProperties.initiatorName: 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:InitiatorName')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:60,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.status ? this.props.searchRFIProperties.status: 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:Status')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:75,flexWrap: 'wrap', flexShrink:1}}>{`${this.props.searchRFIProperties.contractCode} - ${this.props.searchRFIProperties.contractName}` ?`${this.props.searchRFIProperties.contractCode} - ${this.props.searchRFIProperties.contractName}` : 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:Contract')}:</Text>
          </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:42,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.rfidate ? moment(this.props.searchRFIProperties.rfidate).format('MMM DD, YYYY  hh:ss'): 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:RFIDate')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:0,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.duedate ? moment(this.props.searchRFIProperties.duedate).format('MMM DD, YYYY  hh:ss'): 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:DueDate')}:</Text>
          </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:15,marginRight:20,flexWrap: 'wrap', flexShrink:1}}>{this.props.searchRFIProperties.subject ? this.props.searchRFIProperties.subject: 'N/A'}</Text>
          <Text style={styles.nameText}>{t('SearchScreen:Subject')}:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:45,flexWrap: 'wrap', flexShrink:1}}>{`${this.props.searchRFIProperties.locationCode}- ${this.props.searchRFIProperties.locationName}` ? `${this.props.searchRFIProperties.locationCode}-${this.props.searchRFIProperties.locationName}`: 'N/A'}</Text>
          <Text style={styles.nameText}>Location:</Text>
        </View>
        <View style={styles.textContainerArabic}>
          <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:40,flexWrap: 'wrap', flexShrink:1}}>{`${this.props.searchRFIProperties.disciplineCode}- ${this.props.searchRFIProperties.disciplineName}` ? `${this.props.searchRFIProperties.disciplineCode}-${this.props.searchRFIProperties.disciplineName}`: 'N/A'}</Text>
          <Text style={styles.nameText}>Discipline:</Text>
        </View>
        </Body>
      </CardItem>
    </Card>
   </>
  );
  }
}
 _renderAttachment = () => {
   if (config.fallback == 'en'){
    return (
      <View style={{marginLeft:15,marginRight:20,backgroundColor:'#ffffff',alignSelf: 'stretch',marginBottom:10,marginTop:10}}>
          <Content>
          {
           this.props.searchAttachment && this.props.searchAttachment.length > 0 && this.props.searchAttachment.map((ele, index) => <CorrespondenceAttachmentCard key={index} correspondenceAttachment={ele} />)
         }
          </Content>
      </View>
  );
   }else{
  return (
      <View style={{marginLeft:15,marginRight:20,backgroundColor:'#ffffff',alignSelf: 'stretch',alignItems:'flex-end',marginBottom:10,marginTop:10}}>
          <Content>
          {
           this.props.searchAttachment && this.props.searchAttachment.length > 0 && this.props.searchAttachment.map((ele, index) => <CorrespondenceAttachmentCard key={index} correspondenceAttachment={ele} />)
         }
          </Content>
      </View>
  );
  }
}
  _distributeData = () => {
  
  this.props.searchCorrespondenceWrokFlowSteps.forEach(element => {
  console.log('distributed data');
    if (element.stepname==='DISTRIBUTE'){
      console.log('distributed data DISTRIBUTE');
      if (this.state.distributeData != undefined) 
        // distributeData.push(props.distributeProperties.filter(data => data.ridWorkflowstep === element.ridWorkflowstep));
        // else
        
        this.setState({
          distributeData: this.props.searchCorrespondenceDistribute.filter(data => data.ridWorkflowstep === element.ridWorkflowstep)

        });
       
    } else if (element.sequence === 2 ) {
      console.log('distributed data  else 2');
      if (this.state.distributeData != undefined)
      // setdistributeData(push(props.distributeProperties.filter(data => data.ridWorkflowstep === element.ridWorkflowstep)));
      // else
      this.setState({
        distributeData: this.props.searchCorrespondenceDistribute.filter(data => data.ridWorkflowstep===element.ridWorkflowstep)

      })
      
    }
    if (element.sequence === 2 ) {
      console.log('distributed data 2');
      if (this.state.reviewerData != undefined)
        // this.reviewerData.push(this.data.inOutCorrDetails.filter(data => data.ridWorkflowstep === element.ridWorkflowstep));
      // else

      this.setState({
        distributeData: this.props.searchCorrespondenceDistribute.filter(data => data.ridWorkflowstep===element.ridWorkflowstep)

      })
    }
    if (element.sequence === 3 ) {
      console.log('distributed data 2');
      if (this.state.ApproverData != undefined)
        // this.ApproverData.push(this.data.inOutCorrDetails.filter(data => data.ridWorkflowstep === element.ridWorkflowstep));
      // else

      this.setState({
        distributeData: this.props.searchCorrespondenceDistribute.filter(data => data.ridWorkflowstep===element.ridWorkflowstep)

      })
    }
   });
   console.log('Distributed Data before set value',this.state.distributeData);
   this.setState({
   mdl: this.state.distributeData.filter(element => element.mdlname != null && element.ridCommunicationtype===1).map(element => element.mdlname).join(', '),
   adHoc: this.state.distributeData.filter(element => (element.firstname != null || element.lastname != null) && element.ridCommunicationtype===1).map(element => element.firstname + ' ' + element.lastname).join(', '),
   to: this.state.distributeData.filter(element => element.to != null && element.ridCommunicationtype===2).map(element => element.to).join(', '),
   cc:  this.state.distributeData.filter(element => element.cc != null && element.ridCommunicationtype===2).map(element => element.cc).join(', '),
   recipient:   this.state.distributeData.filter(element => (element.firstname != null || element.lastname != null) && element.ridCommunicationtype===3).map(element => element.firstname + ' ' + element.lastname).join(', ')

   });
    
  if (this.category == 1) {
    this.setState({
      reviewer: this.state.reviewerData.filter(element => element.firstname != null || element.lastname != null).map(element => element.firstname + ' ' + element.lastname).join(', '),
      approver: this.state.ApproverData.filter(element => element.firstname != null || element.lastname != null).map(element => element.firstname + ' ' + element.lastname).join(', ')

    })
  }
}
     componentDidUpdate = (prevProps, prevState) => {
     if (this.props.navigation.state.params.searchType == "Correspondence") {
      if (prevProps.searchCorrespondenceDistribute !== this.props.searchCorrespondenceDistribute && this.props.searchCorrespondenceDistribute != null && this.props.searchCorrespondenceDistribute.length > 0){
       this._distributeData();
      }
    }
  }  

render () {
      if (this.props.navigation.state.params.searchType == "Correspondence") {
        return(
          <Container style ={{backgroundColor:'#f2f2f2'}}>
              <View style={{paddingTop:10,backgroundColor:'#f2f2f2',marginBottom:40}}>
                <ScrollView>
                   {this._renderCorrespondenceCard()}
                   {this._renderCorrespondenceDistribute()}
                   {this._renderCorrepondenceApproval()}
                   {this._renderAttachment()}
               </ScrollView>
             </View>
          </Container>
      );
      } else if (this.props.navigation.state.params.searchType === "MOM") {
        return(
          <Container style={{backgroundColor:'#f2f2f2'}}>
              <View style={{paddingTop:10,backgroundColor:'#f2f2f2',marginBottom:40}}>
                <ScrollView> 
                  {this._renderMomCard()}
                  {this._renderMOMTaskComment()}
                  {this._renderMOMAttendees()}
                  {this._renderAttachment()}
               </ScrollView>
             </View>
          </Container>
      );
      } else if (this.props.navigation.state.params.searchType === "RFI") {
        return(
          <Container style={{backgroundColor:'#f2f2f2'}}>
              <View style={{paddingTop:10,backgroundColor:'#f2f2f2',marginBottom:40}}>
                <ScrollView>
                  {this._renderRFICard()}
                  {this._renderAttachment()}
               </ScrollView>
             </View>
          </Container>
      );
      }
    }
}

export default withNavigation(SearchDetails);


const styles = StyleSheet.create({
    segment: {
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 20,
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
    fontSize:15,
    fontWeight: FONT_WEIGHT_BOLD,
    fontFamily:FONT_FAMILY_PT_BOLD,
    color:'#4d4f5c',
   },
  
   dateText: {
    fontSize:15,
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