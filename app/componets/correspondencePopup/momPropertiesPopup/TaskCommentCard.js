import React, { Component } from 'react';
import {
    SafeAreaView,
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
  import { withNavigation } from 'react-navigation';
  import { Image,TouchableOpacity, Modal, Linking, Platform, StyleSheet, Dimensions } from 'react-native';
  import { FONT_SIZE_12,FONT_SIZE_14,FONT_WEIGHT_BOLD,FONT_FAMILY_PT_REGULAR,FONT_FAMILY_PT_BOLD,FONT_WEIGHT_REGULAR } from '../../../utils/styles/typography';
  import moment from 'moment';
  const { height } = Dimensions.get('window');
  import i18n, { t } from '../../../utils/localization/servicesi18n/index';
  import * as config from '../../../utils/localization/config/i18n';

  class TaskCommentCard extends Component {

    constructor(props) {
      super(props);
      console.log('TaskCommentCard card props');
      console.log(this.props);
         }
    
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "#DCDCDC",
          marginTop:15
        }}
      />
    );
  }
  
    render() {
      console.log("Mom Properties comment card");
      console.log(this.props.taskComment);
      if(config.fallback == 'en'){
        return (
          <>
              {/* <View style={{marginLeft:10, marginRight:10,marginTop:5,backgroundColor:'white',height:85}}> 
                <View style={styles.mainContainer}> 
                  <View style={styles.container}> */}
                  <Card>
                  <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('InboxScreen:ActionBy')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:6,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{ this.props.taskComment.name && this.props.taskComment.name}</Text>
          </View>
              <View style={styles.textContainer}>
              <Text style={styles.nameText}>{t('InboxScreen:SubjectDetails')}:</Text>
              <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:18,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.taskComment.subject && this.props.taskComment.subject}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('InboxScreen:Comment')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:6,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.taskComment.comments && this.props.taskComment.comments}</Text>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.nameText}>{t('InboxScreen:DueDate')}:</Text>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.taskComment.dueDate ? moment(this.props.taskComment.dueDate && this.props.taskComment.dueDate).format('DD-MMM-YYYY') : 'N/A'}</Text>
          </View>
                 {/* </View>
              </View>  */}
               {this.FlatListItemSeparator()}  
           {/* </View>    */}
           </Card>
         
         </> 
      );
      }else {
        return (
          <>
              {/* <View style={{marginLeft:10, marginRight:10,marginTop:5,backgroundColor:'white',height:60}}> */}
                {/* <View style={styles.mainContainer}> 
                  <View style={styles.container}> */}
                  <Card>
                  <View style={styles.textContainerArabic}>
                <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:15,flexWrap: 'wrap', flexShrink:1}}>{this.props.taskComment.name && this.props.taskComment.name}</Text>
                    <Text style={styles.nameText}>{t('InboxScreen:ActionBy')}:</Text>
                </View>
                  <View style={styles.textContainerArabic}>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:45,flexWrap: 'wrap', flexShrink:1}}>{this.props.taskComment.subject && this.props.taskComment.subject}</Text>
                  <Text style={styles.nameText}>{t('InboxScreen:SubjectDetails')}:</Text>
               </View>
           <View style={styles.textContainerArabic}>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:40,flexWrap: 'wrap', flexShrink:1}}>{this.props.taskComment.comments && this.props.taskComment.comments}</Text>
            <Text style={styles.nameText}>{t('InboxScreen:Comment')}:</Text>
          </View>
          <View style={styles.textContainerArabic}>
            <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:0,flexWrap: 'wrap', flexShrink:1}}>{this.props.taskComment.duedate ? moment(this.props.taskComment.duedate).format('DD-MMM-YYYY') : 'N/A'}</Text>
            <Text style={styles.nameText}>{t('InboxScreen:DueDate')}:</Text>
          </View>     
          {this.FlatListItemSeparator()}  
           </Card>
         </> 
      );
      }
        
    }
}

export default withNavigation (TaskCommentCard);
export const styles = StyleSheet.create({
    scrollView: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    seprator: {
        width: 4,
        backgroundColor: "#4bbc00",
        marginRight:-5,
        marginRight:7,
        marginStart:-5
    },
    sepratorLine:{
        height:3,
        width:3,
        backgroundColor: '#4bbc00',
        marginLeft:0,
        marginRight:0,
        marginTop:5
    },
    mainContainer: {
        flex:1,
        marginRight:5,
        padding:0,
        backgroundColor:'white'
    },
    container: {
        flex:1, 
        flexDirection:'column',
        justifyContent:'center',   
    },
    userContainer: {
        
          flexDirection:'row',
          marginTop:0,
          marginBottom:0,
         justifyContent:'flex-start',
          
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
   },
   
   textContainer: {
        
    flexDirection:'row',
    marginTop:5,
    marginBottom:0,
   justifyContent:'flex-start',
   marginLeft:10
    
  },
  textContainerArabic: {
        
    flexDirection:'row',
    marginTop:5,
    marginBottom:0,
   justifyContent:'flex-start',
   marginRight:10,
   alignSelf:'flex-end'
    
  },
//    contentText: {
//     fontSize:FONT_SIZE_12,
//     fontWeight: FONT_WEIGHT_REGULAR,
//    }
})
