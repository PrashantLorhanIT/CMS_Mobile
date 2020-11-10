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
  import { FONT_SIZE_12,FONT_SIZE_14,FONT_WEIGHT_BOLD,FONT_FAMILY_PT_REGULAR,FONT_FAMILY_PT_BOLD,FONT_WEIGHT_REGULAR } from '../../utils/styles/typography';
  import moment from 'moment';
  const { height } = Dimensions.get('window');
  import i18n, { t } from '../../utils/localization/servicesi18n/index';
  import * as config from '../../utils/localization/config/i18n';

  class CorrespondenceCommentCard extends Component {

    constructor(props) {
      super(props);
      console.log('CorrespondenceCommentCard card props');
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
      if (config.fallback == 'en'){
        return (
          <>
              <View style={{flexDirection:'row',marginLeft:10, marginRight:10,marginTop:15,backgroundColor:'white',height:60}}>
                <View style={styles.mainContainer}> 
                  <View style={styles.container}>
                   <View style={styles.userContainer}>
                     <Text style={styles.nameText}>{t('InboxScreen:Sender')}:</Text>
                       <Text style={styles.dateText}>              {this.props.correspondenceComment.from}</Text>
                   </View> 
                   <View style={styles.userContainer}>
                     <Text style={styles.nameText}>{t('InboxScreen:Recipient')}:</Text>
                      <Text style={styles.dateText}>           {this.props.correspondenceComment.to}</Text>
                   </View>   
                   <View style={styles.userContainer}>
                     <Text style={styles.nameText}>{t('InboxScreen:Comment')}:</Text>
                    <Text style={styles.dateText}>           {this.props.correspondenceComment.comment}</Text>
                   </View> 
                   <View style={styles.userContainer}>
                     <Text style={styles.nameText}>{t('InboxScreen:CommentDate')}:</Text>
                     <Text style={styles.dateText}>  {moment(this.props.correspondenceComment.commenttime).format('MMM DD YYYY hh:mm')}</Text>
                   </View>   
                 </View>
              </View> 
           </View>   
           
         {this.FlatListItemSeparator()}   
         </> 
      );
      }else {
        return (
            <>
                <View style={{flexDirection:'row',marginLeft:10, marginRight:10,marginTop:15,backgroundColor:'white',height:60}}>
                  <View style={styles.mainContainer}> 
                    <View style={styles.container}>
                     <View style={styles.userContainerArabic}>
                     <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:45,flexWrap: 'wrap', flexShrink:1}}>{this.props.correspondenceComment.from && this.props.correspondenceComment.from}</Text>
                         <Text style={styles.nameText}>{t('InboxScreen:Sender')}:</Text>
                     </View> 
                     <View style={styles.userContainerArabic}>
                     <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:25,flexWrap: 'wrap', flexShrink:1}}>{this.props.correspondenceComment.to && this.props.correspondenceComment.to}</Text>
                        <Text style={styles.nameText}>{t('InboxScreen:Recipient')}:</Text>
                     </View>   
                     <View style={styles.userContainerArabic}>
                     <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:40,flexWrap: 'wrap', flexShrink:1}}>{this.props.correspondenceComment.comment && this.props.correspondenceComment.comment}</Text>
                      <Text style={styles.nameText}>{t('InboxScreen:Comment')}:</Text>
                     </View> 
                     <View style={styles.userContainerArabic}>
                     <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.correspondenceComment.commenttime && moment(this.props.correspondenceComment.commenttime).format('MMM DD YYYY hh:mm')}</Text>
                       <Text style={styles.nameText}>{t('InboxScreen:CommentDate')}:</Text>
                     </View>   
                   </View>
                </View> 
             </View>   
             
           {this.FlatListItemSeparator()}   
           </> 
        );
      }
    }
}

export default withNavigation (CorrespondenceCommentCard);
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
        userContainerArabic: {
        
          flexDirection:'row',
          marginTop:0,
          marginBottom:0,
         justifyContent:'flex-start',
         alignSelf:'flex-end'
          
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
//    contentText: {
//     fontSize:FONT_SIZE_12,
//     fontWeight: FONT_WEIGHT_REGULAR,
//    }
})
