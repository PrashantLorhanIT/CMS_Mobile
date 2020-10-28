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

  class AttendeesCard extends Component {

    constructor(props) {
      super(props);
      console.log('AttendeesCard card props');
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
      if(config.fallback == 'en'){
        return (
          <>
           <Card>
                <View style={styles.userContainer}> 
                  <Text style={styles.nameText}>{t('InboxScreen:Name')}:</Text>
                    <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:92,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.attendeesData.name && this.props.attendeesData.name}</Text>
                </View> 
                <View style={styles.userContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:Title')}:</Text>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:100,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.attendeesData.title && this.props.attendeesData.title}</Text>
                </View>   
                <View style={styles.userContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:EmailID')}:</Text>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:77,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.attendeesData.email && this.props.attendeesData.email}</Text>
                </View> 
                <View style={styles.userContainer}>
                  <Text style={styles.nameText}>{t('InboxScreen:UnitOrganization')}:</Text>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:18,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.attendeesData.organisation && this.props.attendeesData.organisation}</Text>
                </View>   
                <View style={styles.userContainer}>
                 <Text style={styles.nameText}>{t('InboxScreen:DistributionChannel')}:</Text>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:3,marginRight:5,flexWrap: 'wrap', flexShrink:1}}>{this.props.attendeesData.distributionChannel && this.props.attendeesData.distributionChannel}</Text>
               </View>
             
           {this.FlatListItemSeparator()} 
          </Card>      
     </>   
   );
      } else {
        return (
          <>
           <Card>
                <View style={styles.userContainerArabic}> 
                    <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:95,flexWrap: 'wrap', flexShrink:1}}>{this.props.attendeesData.name && this.props.attendeesData.name}</Text>
                    <Text style={styles.nameText}>{t('InboxScreen:Name')}:</Text>
                </View> 
                <View style={styles.userContainerArabic}>
                   <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:90,flexWrap: 'wrap', flexShrink:1}}>{this.props.attendeesData.title && this.props.attendeesData.title}</Text>
                   <Text style={styles.nameText}>{t('InboxScreen:Title')}:</Text>
                </View>   
                <View style={styles.userContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:0,flexWrap: 'wrap', flexShrink:1}}>{this.props.attendeesData.email && this.props.attendeesData.email}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:EmailID')}:</Text>
                </View> 
                <View style={styles.userContainerArabic}>
                  <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:40,flexWrap: 'wrap', flexShrink:1}}>{this.props.attendeesData.organisation && this.props.attendeesData.organisation}</Text>
                  <Text style={styles.nameText}>{t('InboxScreen:UnitOrganization')}:</Text>
                </View>   
                <View style={styles.userContainerArabic}>
                 <Text style={{fontSize:14,fontWeight: FONT_WEIGHT_REGULAR,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginLeft:5,marginRight:60,flexWrap: 'wrap', flexShrink:1}}>{this.props.attendeesData.distributionChannel && this.props.attendeesData.distributionChannel}</Text>
                 <Text style={styles.nameText}>{t('InboxScreen:DistributionChannel')}:</Text>
               </View>  
           {this.FlatListItemSeparator()} 
          </Card>      
     </>   
   );
      }
        
    }
}

export default withNavigation (AttendeesCard);
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
         marginLeft:5
          
        },
    userContainerArabic: {
          flexDirection:'row',
          marginTop:0,
          marginBottom:0,
         justifyContent:'flex-start',
         marginRight:5,
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
