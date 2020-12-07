import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea,Segment,Card,CardItem, Body,} from 'native-base';
import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_WEIGHT_REGULAR, FONT_FAMILY_PT_BOLD} from '../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import * as config from '../../utils/localization/config/i18n';
import i18n, { t } from '../../utils/localization/servicesi18n/index';

const CorrespondenceSearchDitributeCard = (props) => {
  const [distribute, setDistibute] = useState(false);
  const [distributeData, setdistributeData] = useState([]);
  const [mdl, setmdl]= useState('');
  const [adHoc, setadHoc] = useState('');
  const [to, setTo] = useState('');
  const [cc, setcc] = useState('');
  const [rec, setrec] = useState('');

  
  useEffect(() => {
    _distributeData();
}, [distribute]);

  const _distributeData = () => {
    
     console.log('Distributed Data inside for each');
    props.worlflowSteps.forEach(element => {
    
      if (element.stepname==='DISTRIBUTE'){

        if (distributeData != undefined) 
          setdistributeData(props.distributeProperties.filter(data => data.ridWorkflowstep===element.ridWorkflowstep));
          
      } else if (element.sequence === 2 ) {
        if (distributeData != undefined)
        setdistributeData(props.distributeProperties.filter(data => data.ridWorkflowstep===element.ridWorkflowstep)); 
      }
      
     });
    setmdl(distributeData.filter(element => element.mdlname != null && element.ridCommunicationtype===1).map(element => element.mdlname).join(', '));
    setadHoc(distributeData.filter(element => (element.firstname != null || element.lastname != null) && element.ridCommunicationtype===1).map(element => element.firstname + ' ' + element.lastname).join(', '));
    setTo(distributeData.filter(element => element.to != null && element.ridCommunicationtype===2).map(element => element.to).join(', '));
    setcc(distributeData.filter(element => element.cc != null && element.ridCommunicationtype===2).map(element => element.cc).join(', '));
    setrec(distributeData.filter(element => (element.firstname != null || element.lastname != null) && element.ridCommunicationtype===3).map(element => element.firstname + ' ' + element.lastname).join(', '));
  }
  if (config.fallback == 'en') {
    return (
      <> 
      <Card style={{margin:10,marginLeft:15,marginRight:15}}>
               <CardItem>
                 <Body>
                   <View style={styles.textContainer}>
                   <Text style={styles.nameText}>{t('SearchScreen:MDL')}:</Text>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:42,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{mdl ? mdl : 'N/A'}</Text>
                 </View>
                 <View style={styles.textContainer}>
                   <Text style={styles.nameText}>{t('SearchScreen:AdHoc')}:</Text>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:28,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{adHoc ? adHoc : 'N/A'}</Text>
                 </View>
                 <View style={styles.textContainer}>
                   <Text style={styles.nameText}>{t('SearchScreen:To')}:</Text>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:55,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{to ? to : 'N/A'}</Text>
                 </View>
                 <View style={styles.textContainer}>
                   <Text style={styles.nameText}>{t('SearchScreen:CC')}:</Text>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:50,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{cc ? cc : 'N/A'}</Text>
                 </View>
                 <View style={styles.textContainer}>
                   <Text style={styles.nameText}>{t('SearchScreen:Recipient')}:</Text>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{rec ? rec : 'N/A'}</Text>
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
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginRight:5,marginRight:32,flexWrap: 'wrap', flexShrink:1}}>{mdl ? mdl : 'N/A'}</Text>
                   <Text style={styles.nameText}>:{t('SearchScreen:MDL')}</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1, textAlign:'right'}}>{adHoc ? adHoc : 'N/A'}</Text>
                  <Text style={styles.nameText}>{t('SearchScreen:AdHoc')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:40,flexWrap: 'wrap', flexShrink:1}}>{to ? to : 'N/A'}</Text>
                  <Text style={styles.nameText}>{t('SearchScreen:To')}:</Text>
                </View>
                <View style={styles.textContainerArabic}>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:45,flexWrap: 'wrap', flexShrink:1}}>{cc ? cc : 'N/A'}</Text>
                   <Text style={styles.nameText}>:{t('SearchScreen:CC')}</Text>
                </View>
                <View style={styles.textContainerArabic}>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:25,flexWrap: 'wrap', flexShrink:1}}>{rec ? rec : 'N/A'}</Text>
                   <Text style={styles.nameText}>{t('SearchScreen:Recipient')}:</Text>
                </View>
                </Body>
              </CardItem>
            </Card>
      </>
    );
  }
    
}

export default CorrespondenceSearchDitributeCard;

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