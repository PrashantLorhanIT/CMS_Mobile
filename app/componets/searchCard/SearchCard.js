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
  import i18n, { t } from '../../utils/localization/servicesi18n/index';
  import * as config from '../../utils/localization/config/i18n';

  class SearchCard extends Component {

    constructor(props) {
      super(props);
      console.log('SearchCard card props');
     // this.goToDetailScreen = this.goToDetailScreen.bind(this);  

    }
    
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width:'100%',
          backgroundColor: "#DCDCDC",
          marginTop:5
        }}
      />
    );
  }
  
  goToDetailScreen() {
    console.log('Correspondece details push method');
    this.props.navigation.navigate({ 
      routeName: 'SearchDetail' , 
      params: { 
        searchData: this.props.searchData,
        searchType: this.props.searchType
      }
    }); 
  }
  getPastDate(elementDate)
  {
    if(elementDate){
     
    elementDate =  moment( elementDate && elementDate).format('yyyy-MM-DD hh:mm')
    var date =  moment( new Date() && new Date()).format('yyyy-MM-DD hh:mm')
    
    if(elementDate <= date)
      return true;
    else
    return false;
    }
    else
    return false;
  }

    render() {
      if (this.props.searchType == "Correspondence") {
        var pastdate = this.getPastDate(this.props.searchData.replyRequiredByDate);
       if (pastdate == true) {
         if(config.fallback == 'en'){
          return (
            <TouchableOpacity onPress={() => this.goToDetailScreen()} >
                  <View style={{marginLeft:10, marginRight:10,backgroundColor:'#f2f2f2'}}>
                       <View style={styles.userContainer}>
                         <Text style={styles.nameTextRed}>{t('SearchScreen:ReferenceNumber')}:</Text>
                         <Text style={styles.dateTextRed}>  {this.props.searchData.referencenumber && this.props.searchData.referencenumber}</Text>
                       </View> 
                       <View style={styles.container}>
                         <View style={styles.mainContainer}>
                           <View style={styles.userContainer}>
                            <Text style={styles.nameTextRed}>{t('SearchScreen:Status')}:</Text>
                              <Text style={styles.dateTextRed}>  {this.props.searchData.status && this.props.searchData.status}</Text>
                           </View> 
                        </View>
                        <View style={styles.dateContainer}>
                         <View style={styles.userContainer}>
                          <Text style={styles.nameTextRed}>{t('SearchScreen:Date')}:</Text>
                          <Text style={styles.dateTextRed}> {moment(this.props.searchData.correspondenceDate && this.props.searchData.correspondenceDate).format('MMM DD, YYYY')}</Text>
                        </View>                       
                        </View>
                       </View>
                       <View style={styles.userContainer}>
                         <Text style={styles.nameTextRed}>{t('SearchScreen:Sender')}:</Text>
                         <Text style={styles.dateTextRed}>  {this.props.searchData.senderName && this.props.searchData.senderName}</Text>
                       </View>   
                       <View style={styles.userContainer}>
                         <Text style={styles.nameTextRed}>{t('SearchScreen:Recipient')}:</Text>
                        <Text style={styles.dateTextRed}>  {this.props.searchData.recipientName && this.props.searchData.recipientName}</Text>
                       </View>   
                       {this.FlatListItemSeparator()}    
                 </View>    
                  
            </TouchableOpacity>  
          );
         } else {
        return (
          <TouchableOpacity onPress={() => this.goToDetailScreen()} >
                <View style={{marginLeft:10, marginRight:10,backgroundColor:'#f2f2f2'}}>
                     <View style={styles.userContainerArabic}>
                       <Text style={styles.dateTextRed}>  {this.props.searchData.referencenumber && this.props.searchData.referencenumber}</Text>
                       <Text style={styles.nameTextRed}>{t('SearchScreen:ReferenceNumber')}:</Text>
                     </View> 
                     <View style={styles.userContainerArabic}>

                     <View style={styles.dateContainerArabic}>
                       <View style={styles.userContainerArabic}>
                        <Text style={styles.dateTextRed}> {moment(this.props.searchData.correspondenceDate && this.props.searchData.correspondenceDate).format('MMM DD, YYYY')}</Text>
                        <Text style={styles.nameTextRed}>{t('SearchScreen:Date')}:</Text>
                      </View>                       
                      </View>

                       <View style={styles.mainContainerArabic}>
                         <View style={styles.userContainerArabic}>
                            <Text style={styles.dateTextRed}>  {this.props.searchData.status && this.props.searchData.status}</Text>
                            <Text style={styles.nameTextRed}>{t('SearchScreen:Status')}:</Text>
                         </View> 
                      </View>
                     
                     </View>
                     <View style={styles.userContainerArabic}>
                       <Text style={styles.dateTextRed}>  {this.props.searchData.senderName && this.props.searchData.senderName}</Text>
                       <Text style={styles.nameTextRed}>{t('SearchScreen:Sender')}:</Text>
                     </View>   
                     <View style={styles.userContainerArabic}>
                      <Text style={styles.dateTextRed}>  {this.props.searchData.recipientName && this.props.searchData.recipientName}</Text>
                      <Text style={styles.nameTextRed}>{t('SearchScreen:Recipient')}:</Text>
                     </View>   
                     {this.FlatListItemSeparator()}    
               </View>    
                
          </TouchableOpacity>
           
        );
         }
       } else {
         if(config.fallback == 'en'){
          return (
            <TouchableOpacity onPress={() => this.goToDetailScreen()} >
                  <View style={{marginLeft:10, marginRight:10,backgroundColor:'#f2f2f2'}}>
                       <View style={styles.userContainer}>
                         <Text style={styles.nameText}>{t('SearchScreen:ReferenceNumber')}:</Text>
                         <Text style={styles.dateText}>  {this.props.searchData.referencenumber && this.props.searchData.referencenumber}</Text>
                       </View> 
                       <View style={styles.container}>
                         <View style={styles.mainContainer}>
                           <View style={styles.userContainer}>
                            <Text style={styles.nameText}>{t('SearchScreen:Status')}:</Text>
                              <Text style={styles.dateText}>  {this.props.searchData.status && this.props.searchData.status}</Text>
                           </View> 
                        </View>
                        <View style={styles.dateContainer}>
                         <View style={styles.userContainer}>
                          <Text style={styles.nameText}>{t('SearchScreen:Date')}:</Text>
                          <Text style={styles.dateTexts}> {moment(this.props.searchData.correspondenceDate && this.props.searchData.correspondenceDate).format('MMM DD, YYYY')}</Text>
                        </View>                       
                        </View>
                       </View>
                       <View style={styles.userContainer}>
                         <Text style={styles.nameText}>{t('SearchScreen:Sender')}:</Text>
                         <Text style={styles.dateText}>  {this.props.searchData.senderName && this.props.searchData.senderName}</Text>
                       </View>   
                       <View style={styles.userContainer}>
                         <Text style={styles.nameText}>{t('SearchScreen:Recipient')}:</Text>
                        <Text style={styles.dateText}>  {this.props.searchData.recipientName && this.props.searchData.recipientName}</Text>
                       </View>   
                       {this.FlatListItemSeparator()}    
                 </View>    
                  
            </TouchableOpacity>
             
          );
         } else {
        return (
          <TouchableOpacity onPress={() => this.goToDetailScreen()} >
                <View style={{marginLeft:10, marginRight:10,backgroundColor:'#f2f2f2'}}>
                     <View style={styles.userContainerArabic}>
                       <Text style={styles.dateText}>  {this.props.searchData.referencenumber && this.props.searchData.referencenumber}</Text>
                       <Text style={styles.nameText}>{t('SearchScreen:ReferenceNumber')}:</Text>
                     </View> 
                     <View style={styles.userContainerArabic}>

                     <View style={styles.dateContainerArabic}>
                       <View style={styles.userContainerArabic}>
                        <Text style={styles.dateTexts}> {moment(this.props.searchData.correspondenceDate && this.props.searchData.correspondenceDate).format('MMM DD, YYYY')}</Text>
                        <Text style={styles.nameText}>{t('SearchScreen:Date')}:</Text>
                      </View>                       
                      </View>

                       <View style={styles.mainContainerArabic}>
                         <View style={styles.userContainerArabic}>
                            <Text style={styles.dateText}>  {this.props.searchData.status && this.props.searchData.status}</Text>
                            <Text style={styles.nameText}>{t('SearchScreen:Status')}:</Text>
                         </View> 
                      </View>
                      
                     </View>
                     <View style={styles.userContainerArabic}>
                       <Text style={styles.dateText}>  {this.props.searchData.senderName && this.props.searchData.senderName}</Text>
                       <Text style={styles.nameText}>{t('SearchScreen:Sender')}:</Text>
                     </View>   
                     <View style={styles.userContainerArabic}>
                      <Text style={styles.dateText}>  {this.props.searchData.recipientName && this.props.searchData.recipientName}</Text>
                      <Text style={styles.nameText}>{t('SearchScreen:Recipient')}:</Text>
                     </View>   
                     {this.FlatListItemSeparator()}    
               </View>    
                
          </TouchableOpacity>
           
        );
         }
       }
      } else if (this.props.searchType == "MOM") {
        if (config.fallback == 'en'){
          return (
            <TouchableOpacity onPress={() => this.goToDetailScreen()} >
                  <View style={{marginLeft:10, marginRight:10,backgroundColor:'#f2f2f2'}}>
                       <View style={styles.userContainer}>
                         <Text style={styles.nameText}>{t('SearchScreen:ReferenceNumber')}:</Text>
                         <Text style={styles.dateText}>  {this.props.searchData.drn && this.props.searchData.drn}</Text>
                       </View> 
                       <View style={styles.container}>
                         <View style={styles.mainContainer}>
                           <View style={styles.userContainer}>
                            <Text style={styles.nameText}>{t('SearchScreen:Status')}:</Text>
                              <Text style={styles.dateText}>  {this.props.searchData.status && this.props.searchData.status}</Text>
                           </View> 
                        </View>
                        <View style={styles.dateContainer}>
                         <View style={styles.userContainer}>
                          <Text style={styles.nameText}>{t('SearchScreen:Date')}:</Text>
                          <Text style={styles.dateTexts}> {moment(this.props.searchData.meetingdate && this.props.searchData.meetingdate).format('MMM DD, YYYY')}</Text>
                        </View>                       
                        </View>
                       </View>
                       <View style={styles.userContainer}>
                         <Text style={styles.nameText}>{t('SearchScreen:Sender')}:</Text>
                         <Text style={styles.dateText}>  {this.props.searchData.initiatorName && this.props.searchData.initiatorName}</Text>
                       </View>   
                       {/* <View style={styles.userContainer}>
                         <Text style={styles.nameText}>Recipient:</Text>
                        <Text style={styles.dateText}>  {this.props.searchData.recipientName && this.props.searchData.recipientName}</Text>
                       </View>    */}
                        
                       
                       {this.FlatListItemSeparator()}    
                 </View>    
                  
            </TouchableOpacity>
             
          );
        } else {
          return (
            <TouchableOpacity onPress={() => this.goToDetailScreen()} >
                  <View style={{marginLeft:10, marginRight:10,backgroundColor:'#f2f2f2'}}>
                       <View style={styles.userContainerArabic}>
                         <Text style={styles.dateText}>  {this.props.searchData.drn && this.props.searchData.drn}</Text>
                         <Text style={styles.nameText}>{t('SearchScreen:ReferenceNumber')}:</Text>
                       </View> 
                       <View style={styles.userContainerArabic}>
                       <View style={styles.dateContainerArabic}>
                         <View style={styles.userContainerArabic}>
                          <Text style={styles.dateTexts}> {moment(this.props.searchData.correspondenceDate && this.props.searchData.correspondenceDate).format('MMM DD, YYYY')}</Text>
                          <Text style={styles.nameText}>{t('SearchScreen:Date')}:</Text>
                        </View>                       
                        </View>
                         <View style={styles.mainContainerArabic}>
                           <View style={styles.userContainerArabic}>
                              <Text style={styles.dateText}>  {this.props.searchData.status && this.props.searchData.status}</Text>
                              <Text style={styles.nameText}>{t('SearchScreen:Status')}:</Text>
                           </View> 
                        </View>
                       </View>
                       <View style={styles.userContainerArabic}>
                         <Text style={styles.dateText}>  {this.props.searchData.initiatorName && this.props.searchData.initiatorName}</Text>
                         <Text style={styles.nameText}>{t('SearchScreen:Sender')}:</Text>
                       </View>   
                       {/* <View style={styles.userContainer}>
                         <Text style={styles.nameText}>Recipient:</Text>
                        <Text style={styles.dateText}>  {this.props.searchData.recipientName && this.props.searchData.recipientName}</Text>
                       </View>    */}
                        
                       
                       {this.FlatListItemSeparator()}    
                 </View>    
                  
            </TouchableOpacity>
             
          );
        }
      } else {
        if(config.fallback == 'en'){
          return (
            <TouchableOpacity onPress={() => this.goToDetailScreen()} >
                  <View style={{marginLeft:10, marginRight:10,backgroundColor:'#f2f2f2'}}>
                       <View style={styles.userContainer}>
                         <Text style={styles.nameText}>{t('SearchScreen:ReferenceNumber')}:</Text>
                         <Text style={styles.dateText}>  {this.props.searchData.drn && this.props.searchData.drn}</Text>
                       </View> 
                       <View style={styles.container}>
                         <View style={styles.mainContainer}>
                           <View style={styles.userContainer}>
                            <Text style={styles.nameText}>{t('SearchScreen:Status')}:</Text>
                              <Text style={styles.dateText}>  {this.props.searchData.status && this.props.searchData.status}</Text>
                           </View> 
                        </View>
                        <View style={styles.dateContainer}>
                         <View style={styles.userContainer}>
                          <Text style={styles.nameText}>{t('SearchScreen:Date')}:</Text>
                          <Text style={styles.dateTexts}> {moment(this.props.searchData.rfidate && this.props.searchData.rfidate).format('MMM DD, YYYY')}</Text>
                        </View>                       
                        </View>
                       </View>
                       <View style={styles.userContainer}>
                         <Text style={styles.nameText}>{t('SearchScreen:Sender')}:</Text>
                         <Text style={styles.dateText}>  {this.props.searchData.initiatorName && this.props.searchData.initiatorName}</Text>
                       </View>   
                       {/* <View style={styles.userContainer}>
                         <Text style={styles.nameText}>Recipient:</Text>
                        <Text style={styles.dateText}>  {this.props.searchData.recipientName && this.props.searchData.recipientName}</Text>
                       </View>    */}
                        
                       
                       {this.FlatListItemSeparator()}    
                 </View>    
                  
            </TouchableOpacity>
             
          );
        }else{
          return (
            <TouchableOpacity onPress={() => this.goToDetailScreen()} >
                  <View style={{marginLeft:10, marginRight:10,backgroundColor:'#f2f2f2'}}>
                       <View style={styles.userContainerArabic}>
                         <Text style={styles.dateText}>  {this.props.searchData.drn && this.props.searchData.drn}</Text>
                         <Text style={styles.nameText}>{t('SearchScreen:ReferenceNumber')}:</Text>
                       </View> 
                       <View style={styles.userContainerArabic}>
                       <View style={styles.dateContainerArabic}>
                         <View style={styles.userContainerArabic}>
                          <Text style={styles.dateTexts}> {moment(this.props.searchData.rfidate && this.props.searchData.rfidate).format('MMM DD, YYYY')}</Text>
                        <Text style={styles.nameText}>{t('SearchScreen:Date')}:</Text>
                        </View>                       
                        </View>
                         <View style={styles.mainContainerArabic}>
                           <View style={styles.userContainerArabic}>
                              <Text style={styles.dateText}>  {this.props.searchData.status && this.props.searchData.status}</Text>
                              <Text style={styles.nameText}>{t('SearchScreen:Status')}:</Text>
                           </View> 
                        </View> 
                       </View>
                       <View style={styles.userContainerArabic}>
                         <Text style={styles.dateText}>  {this.props.searchData.initiatorName && this.props.searchData.initiatorName}</Text>
                         <Text style={styles.nameText}>{t('SearchScreen:Sender')}:</Text>
                       </View>   
                       {/* <View style={styles.userContainer}>
                         <Text style={styles.nameText}>Recipient:</Text>
                        <Text style={styles.dateText}>  {this.props.searchData.recipientName && this.props.searchData.recipientName}</Text>
                       </View>    */}
                       {this.FlatListItemSeparator()}    
                 </View>    
                  
            </TouchableOpacity>
             
          );
        }
       
      }
        
    }
}

export default  withNavigation (SearchCard);
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
    userContainerArabic: {
      flex:1, 
      flexDirection:'column',
      justifyContent:'flex-end',
      alignSelf:'flex-end'   
  },
    userContainer: {
        
          flexDirection:'row',
          marginTop:3,
          marginBottom:0,
         justifyContent:'flex-start',
         marginLeft:10
          
        },
        userContainerArabic: {
        
          flexDirection:'row',
          marginTop:3,
          marginBottom:0,
         justifyContent:'flex-end',
         marginRight:0,
         alignSelf:'flex-end'
          
        },
        
   nameText: {
    fontSize:13,
    fontWeight: FONT_WEIGHT_BOLD,
    fontFamily:FONT_FAMILY_PT_BOLD,
    color:'#4d4f5c',
   },
   nameTextRed: {
    fontSize:13,
    fontWeight: FONT_WEIGHT_BOLD,
    fontFamily:FONT_FAMILY_PT_BOLD,
    color:'#6F3236',
   },
   dateTextRed: {
    fontSize:13,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontFamily:FONT_FAMILY_PT_REGULAR,
    color:'#6F3236',
   },
   dateText: {
    fontSize:13,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontFamily:FONT_FAMILY_PT_REGULAR,
    color:'#43425d',
   },
   dateTexts: {
    fontSize:13,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontFamily:FONT_FAMILY_PT_REGULAR,
    color:'#43425d',
    marginRight:10
   },
   container: {
    flex:1, 
    flexDirection:'row',
    justifyContent:'center',   
},
mainContainer: {
   flex:1,
      flexDirection:'row',
     justifyContent:'space-between',
      
    },
dateContainer: { 
        flex:1,
        flexDirection:'row',
         justifyContent:'flex-end',
        // alignContent:'flex-end',
        
    },
    mainContainerArabic: {
         flex:1,
         flexDirection:'row',
         justifyContent:'flex-end',
         marginRight:0
       },
   dateContainerArabic: { 
           flex:1,
           flexDirection:'row',
            justifyContent:'space-between',
           alignContent:'flex-start',
           
       },
})
