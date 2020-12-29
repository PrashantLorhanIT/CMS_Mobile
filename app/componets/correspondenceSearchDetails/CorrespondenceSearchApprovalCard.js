import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions,StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea,Segment,Card,CardItem, Body,} from 'native-base';
import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_WEIGHT_REGULAR, FONT_FAMILY_PT_BOLD} from '../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import * as config from '../../utils/localization/config/i18n';
import i18n, { t } from '../../utils/localization/servicesi18n/index';

const CorrespondenceSearchApprovalCard = (props) => {
  const [approval, setApproval] = useState(false);
  const [reviewerData, setreviewerData]= useState([]);
  const [ApproverData , setApproverData]= useState([]);
  const [rev, setrev] = useState('');
  const [app, setapp] = useState('');


  useEffect(() => {
    
    _distributeData();
}, [approval]);


  const _distributeData = () => {
     console.log('Distributed Data inside for each');
     props.worlflowSteps.forEach(element => {
    
        if (element.sequence === 2 ) {
            if (reviewerData != undefined)
              setreviewerData(props.distributeProperties.filter(data => data.ridWorkflowstep===element.ridWorkflowstep));
          }
        if (element.sequence === 3 ) {
            if (ApproverData != undefined)
              setApproverData(props.distributeProperties.filter(data => data.ridWorkflowstep===element.ridWorkflowstep));
          }
      
     });
     setrev(reviewerData.filter(element => element.firstname != null || element.lastname != null).map(element => element.firstname + ' ' + element.lastname).join(', '));
     setapp(ApproverData.filter(element => element.firstname != null || element.lastname != null).map(element => element.firstname + ' ' + element.lastname).join(', '));
  }
  if (config.fallback == 'en') {
    return (
      <> 
      <Card style={{margin:10,marginLeft:15,marginRight:15}}>
            <CardItem>
              <Body>
                <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Reviewer')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{rev ? rev : 'N/A'}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{t('SearchScreen:Approver')}:</Text>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{app ? app : 'N/A'}</Text>
              </View>
              </Body>
            </CardItem>
          </Card>
      </>
  );
  } else{
    return(
      <> 
     <Card style={{margin:10,marginLeft:15,marginRight:15}}>
            <CardItem>
              <Body>
                <View style={styles.textContainerArabic}>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{rev ? rev : 'A/N'}</Text>
                <Text style={styles.nameText}>{t('SearchScreen:Reviewer')}:</Text>
              </View>
              <View style={styles.textContainerArabic}>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{app? app : 'A/N'}</Text>
                <Text style={styles.nameText}>{t('SearchScreen:Approver')}:</Text>
              </View>
              </Body>
            </CardItem>
          </Card>
      </>
    );
  }
    
}

export default CorrespondenceSearchApprovalCard;

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