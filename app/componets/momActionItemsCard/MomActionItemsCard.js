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

import ApproveModelPopup from '../correspondencePopup/momApprovePop/MomAopprovePopup';
import i18n, { t } from '../../utils/localization/servicesi18n/index';
import * as config from '../../utils/localization/config/i18n';

  class MomActionItemsCard extends Component {

    constructor(props) {
      super(props);
      console.log(this.props);
      this.state = {
        isApproveModalVisible: false,
      };
    }
    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: screenWidth,
              backgroundColor: "#DCDCDC",
              marginTop:10
            }}
          />
        );
      }

      handleApproveTap = () => {
        this.setState((state) => {
          return {
            isApproveModalVisible: true,
          };
        });
      }

    render() {

    const { isApproveModalVisible } = this.state;
    if (config.fallback == 'en'){
      return (
             
        <TouchableOpacity >
         
                      <View style={{margin:5,flexDirection:'column'}}>
                      {
           isApproveModalVisible && <ApproveModelPopup userId = {this.props.userId} workFTID = {this.props.workFTID} token = {this.props.token} onModalClose={() => { this.setState({ isApproveModalVisible: false }) }} getApproveValuesrefersh={(isRefersh) => {
              console.log('Go back approve popup')
            
             if (isRefersh == true) {
                    this.props.getApproveValuesrefersh(true)
                 }
                }} />
                 }
                        <View style={{}}>
                           <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR, fontWeight:'600', margin:3}}>{this.props.correspondenceActionItems.name ? this.props.correspondenceActionItems.name: 'N/A'}</Text>
                           <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,margin:3}}>{t('InboxScreen:ApprovalCommment')}: {this.props.correspondenceActionItems.comments ? this.props.correspondenceActionItems.comments : 'N/A'}</Text>
                           {/* <Text style={{fontSize:12, margin:3}}>{this.props.correspondenceTask.taskStatus && this.props.correspondenceTask.taskStatus}</Text> */}
                           <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR, margin:3}}>{t('InboxScreen:ApprovalDueDate')}: {moment(this.props.correspondenceActionItems.approvedTstmp).format('MMM DD, YYYY HH:mm')}</Text>
                           { this.props.correspondenceActionItems.isapproved == 'N' &&
                           <Button style={{backgroundColor:'white',marginLeft:-13, marginTop:0, width:150,height:25}}onPress={() => { this.handleApproveTap() }}>
                               <Text style={{color:'blue',fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Approve')}</Text>
                           </Button>
                          }
                        </View>
                        {this.FlatListItemSeparator()}
                      </View>
                   
         </TouchableOpacity>
    
       );
    } else {
      return (
             
        <TouchableOpacity >
         
                      <View style={{marginRight:0,flexDirection:'column',alignSelf:'flex-end',justifyContent:'flex-end'}}>
                      {
           isApproveModalVisible && <ApproveModelPopup userId = {this.props.userId} workFTID = {this.props.workFTID} onModalClose={() => { this.setState({ isApproveModalVisible: false }) }} getApproveValues={(isBack) => {
              console.log('Go back approve popup')
              console.log(isBack)
             if (isBack == true) {
               setTimeout(() => { 
                 this.props.navigation.pop();
                 }, 1000);
                 }
                }} />
                 }
                        <View style={{alignSelf:'flex-end',marginRight:0}}>
                           <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR, fontWeight:'600', marginRight:3,textAlign:'right'}}>{this.props.correspondenceActionItems.name ? this.props.correspondenceActionItems.name: 'N/A'}</Text>
                           <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,marginRight:3,textAlign:'right'}}>{t('InboxScreen:ApprovalCommment')}: {this.props.correspondenceActionItems.comments ? this.props.correspondenceActionItems.comments : 'N/A'}</Text>
                           {/* <Text style={{fontSize:12, margin:3}}>{this.props.correspondenceTask.taskStatus && this.props.correspondenceTask.taskStatus}</Text> */}
                           <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR, marginRight:3, textAlign:'right'}}>{t('InboxScreen:ApprovalDueDate')}: {this.props.correspondenceActionItems.approvedTstmp ? moment(this.props.correspondenceActionItems.approvedTstmp).format('MMM DD, YYYY HH:mm') : 'N/A'}</Text>
                           { this.props.correspondenceActionItems.isapproved == 'N' &&
                           <Button style={{backgroundColor:'white',marginRight:-40,marginLeft:0, marginTop:0, width:80,height:25, textAlign:'right'}}onPress={() => { this.handleApproveTap() }}>
                               <Text style={{color:'blue',fontSize:13, fontFamily:FONT_FAMILY_PT_REGULAR, textAlign:'right'}}>{t('InboxScreen:Approve')}</Text>
                           </Button>
                          }
                        </View>
                        {this.FlatListItemSeparator()}
                      </View>
                   
         </TouchableOpacity>
    
       );
    }
       
    }
}

export default withNavigation(MomActionItemsCard);
