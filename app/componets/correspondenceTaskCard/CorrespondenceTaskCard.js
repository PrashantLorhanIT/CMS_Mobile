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
  import {TouchableOpacity,Dimensions,Image} from 'react-native';
  import { withNavigation } from 'react-navigation';
  import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14,FONT_FAMILY_PT_REGULAR } from '../../utils/styles/typography';
  import attachment from '../../assets/image/attchment/attachment.png';
  import moment from 'moment';
  const screenWidth = Dimensions.get("window").width;
  import i18n, { t } from '../../utils/localization/servicesi18n/index';
  import * as config from '../../utils/localization/config/i18n';

  class CorrespondenceTaskCard extends Component {

    constructor(props) {
      super(props);
      console.log('CorrespondenceAttachmentCard card props');
      console.log(this.props);
    }
    FlatListItemSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: screenWidth,
            backgroundColor: "#DCDCDC",
            marginTop:5,marginBottom:5
          }}
        />
      );
    }

    render() {
      if (this.props.isTask == true) {
        if (config.fallback == 'en'){
          return (
          
            <>
                         <View style={{margin:5,flexDirection:'column'}}>
                           <View style={{}}>
                              <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR, fontWeight:'600', margin:3}}>{this.props.correspondenceTask.name && this.props.correspondenceTask.name}</Text>
                              <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR,margin:3}}>{this.props.correspondenceTask.subject && this.props.correspondenceTask.subject}</Text>
                              {/* <Text style={{fontSize:12, margin:3}}>{this.props.correspondenceTask.taskStatus && this.props.correspondenceTask.taskStatus}</Text> */}
                              <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR, margin:3}}>{t('InboxScreen:AssignmentDate')}: {moment(this.props.correspondenceTask.addedon).format('MMM DD, YYYY')}</Text>
                              <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,margin:3}}>{t('InboxScreen:CompletionDate')}: { this.props.correspondenceTask.completionDate ? moment(this.props.correspondenceTask.completionDate).format('MMM DD, YYYY'): 'N/A'}</Text>
                           </View>
                         </View>
                      
            </>
  
          );
        }else {
          return (
          
            <>
                         <View style={{margin:5,flexDirection:'column',justifyContent:'flex-end',alignSelf:'flex-end'}}>
                           <View style={{}}>
                              <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR, fontWeight:'600', margin:3, textAlign:'right'}}>{this.props.correspondenceTask.name && this.props.correspondenceTask.name}</Text>
                              <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR,margin:3, textAlign: 'right'}}>{this.props.correspondenceTask.subject && this.props.correspondenceTask.subject}</Text>
                              {/* <Text style={{fontSize:12, margin:3}}>{this.props.correspondenceTask.taskStatus && this.props.correspondenceTask.taskStatus}</Text> */}
                              <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR, margin:3, textAlign: 'right'}}>{t('InboxScreen:AssignmentDate')}: {moment(this.props.correspondenceTask.addedon).format('MMM DD, YYYY')}</Text>
                              <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,margin:3, textAlign : 'right'}}>{t('InboxScreen:CompletionDate')}: { this.props.correspondenceTask.completionDate ? moment(this.props.correspondenceTask.completionDate).format('MMM DD, YYYY'): 'N/A'}</Text>
                           </View>
                         </View>
                      
            </>
  
          );
        }
         
      } else {
        if (config.fallback == 'en'){
          return (
          
            <>
                         <View style={{margin:5,flexDirection:'column'}}>
                           <View style={{}}>
                              <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR, fontWeight:'600', margin:3}}>{this.props.correspondenceTask.assigneeFirstName && this.props.correspondenceTask.assigneeFirstName} {this.props.correspondenceTask.assigneeLastName && this.props.correspondenceTask.assigneeLastName}</Text>
                              <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR,margin:3}}>{this.props.correspondenceTask.tasksubject && this.props.correspondenceTask.tasksubject}</Text>
                              <Text style={{fontSize:12, margin:3}}>{this.props.correspondenceTask.taskStatus && this.props.correspondenceTask.taskStatus}</Text>
                              <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR, margin:3}}>{t('InboxScreen:AssignmentDate')}: {moment(this.props.correspondenceTask.addedon).format('MMM DD, YYYY')}</Text>
                              <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,margin:3}}>{t('InboxScreen:CompletionDate')}: { this.props.correspondenceTask.completionDate ? moment(this.props.correspondenceTask.completionDate).format('MMM DD, YYYY'): 'N/A'}</Text>
                           </View>
                         </View>
                      {this.FlatListItemSeparator()}
            </>
  
          );
        }else{
          return (
          
            <>
                         <View style={{margin:5,flexDirection:'column',justifyContent:'flex-end', alignSelf:'flex-end'}}>
                           <View style={{}}>
                              <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR, fontWeight:'600', margin:3, textAlign:'right'}}>{this.props.correspondenceTask.assigneeFirstName && this.props.correspondenceTask.assigneeFirstName} {this.props.correspondenceTask.assigneeLastName && this.props.correspondenceTask.assigneeLastName}</Text>
                              <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR,margin:3, textAlign:'right'}}>{this.props.correspondenceTask.tasksubject && this.props.correspondenceTask.tasksubject}</Text>
                              <Text style={{fontSize:12, margin:3, textAlign:'right'}}>{this.props.correspondenceTask.taskStatus && this.props.correspondenceTask.taskStatus}</Text>
                              <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR, margin:3, textAlign:'right'}}>{t('InboxScreen:AssignmentDate')}: {moment(this.props.correspondenceTask.addedon).format('MMM DD, YYYY')}</Text>
                              <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,margin:3, textAlign:'right'}}>{t('InboxScreen:CompletionDate')}: { this.props.correspondenceTask.completionDate ? moment(this.props.correspondenceTask.completionDate).format('MMM DD, YYYY'): 'N/A'}</Text>
                           </View>
                         </View>
                      {this.FlatListItemSeparator()}
            </>
  
          );
        }
        
      }
        
    }
}

export default CorrespondenceTaskCard;
