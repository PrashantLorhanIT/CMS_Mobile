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
import { SafeAreaView, Dimensions, ScrollView, Image,TouchableOpacity, AsyncStorage} from 'react-native';
import { withNavigation } from 'react-navigation';
import ApproveModelPopup from '../../../componets/correspondencePopup/approvePopup/CorrespondenceApprovePopup';
import RejectModelPopup from '../../../componets/correspondencePopup/rejectPopup/CorrespondenceRejectPopup';
import DelegateModelPopup from '../../../componets/correspondencePopup/delegatePopup/CorrespondenceDelegatePopup';
import CommentModelPopup from '../../../componets/correspondencePopup/commentPopup/CorrespondenceCommentPopup';
import PropertiesModelPopup from '../../../componets/correspondencePopup/correspondenceProperties/CorrespondencePropertiesPopup';
import ForwardModelPopup from '../../../componets/correspondencePopup/forwordPopup/CorrespondenceForwordPopup';
import InitiateModalPopup from '../../../componets/correspondencePopup/initiatePopup/CorrespondenceInitiatePopup';
import RfiCommentModelPopup from '../../../componets/correspondencePopup/rfiCommentPopup/RfiCommentPopup';
import RfiPropertiesModelPopup from '../../../componets/correspondencePopup/rfiPropertiesPopup/RfiPropertiesPopup';
import MomPropertiesModelPopup from '../../../componets/correspondencePopup/momPropertiesPopup/MomPropertiesPopup';
import MomCommentModelPopup from '../../../componets/correspondencePopup/momCommentPopup/MomCommentPopup';
import RFIDelegateModelPopup from '../../../componets/correspondencePopup/rfiDelegetePopup/RFIDelegatePopup';
import RFIForwardModelPopup from '../../../componets/correspondencePopup/rfiForwardPopup/RFIForwardPopup';
import SignatureModelPopup from '../../../componets/correspondencePopup/signaturePopup/SignaturePopup';
import MomApproveModelPopup from '../../../componets/correspondencePopup/momApprovePop/MomAopprovePopup';
import Modal from 'react-native-modal';
import moment from 'moment';
import { ThemeProvider } from 'react-native-paper';
import CorrespondenceAttachmentCard from '../../../componets/correspondenceAttachment/CorrespondenceAttachmentCard';
import CorrespondenceTaskCard from '../../../componets/correspondenceTaskCard/CorrespondenceTaskCard';
import MomTaskCard from '../../../componets/momTaskCard/MomTaskCard';
import MOMActionItemsCard from '../../../componets/momActionItemsCard/MomActionItemsCard';
import { setCorrespondenceDetails, } from './CorrespondenceDetails.Action';
import info from '../../../assets/image/info/info.png';
import comment from '../../../assets/image/comments/comment.png';
import forward from '../../../assets/image/forward/Forword.png';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD, FONT_FAMILY_PT_REGULAR, FONT_SIZE_14} from '../../../utils/styles/typography';
import { constants } from '../../../utils/constants/constants';
import { Reachability } from '../../../services/netInfo/Rechability';
import axios from 'axios'
const screenWidth = Dimensions.get("window").width;
import HTML from 'react-native-render-html';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import * as config from '../../../utils/localization/config/i18n';

class CoreespondenceDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
        isDelegateModalVisible: false,
        isApproveModalVisible: false,
        isRejectModalVisible: false,
        isInitiateModalVisible: false,
        isForwardModelVisible: false,
        isCorrespondencePropertiesVisible: false,
        isCorrespondenceCommentsVisible:false,
        isRFICommentModelVisible:false,
        isRFIPropertiesModelVisible:false,
        isRFIDelegateModelVisible: false,
        isRFIForwardModelVisible: false,
        isMomPropertiesModelVisible:false,
        isMomCommentModelVisible:false,
        isSignatureModelVisible: false,
        isMomApproveModelVisible: false,
        distributeData:[],
        reviewerData:[],
        ApproverData:[],
        singingUrl: '',
        };
    }

    componentDidMount  = () => {
         const corrId = this.props.navigation.state.params.ridInOutCorr;
         const userId = this.props.userProfile.ridUsermaster;
         const token = this.props.loggedInUser.token;
         const entityId = this.props.userProfile.ridEntityList;
         const workFlowTransactionId = this.props.navigation.state.params.ridWorkflowtransaction;
         this.props.getCorrespondenceCategory(token);
         this.props.getCorrespondenceDetailsDelegateUserMasters(entityId);
         this.props.getRFIDetailsForwardUserMasters();
         this.props.getCorrespondenceDetailsForwardUserMasters(entityId, corrId);

         if (this.props.navigation.state.params.workflowName == 'Task'){
          this.props.getTaskDetails(userId, corrId);
         } else if (this.props.navigation.state.params.workflowName == 'MOM') {
           this.props.getMomDetails(userId, corrId);
         } else if (this.props.navigation.state.params.workflowName == 'Outgoing RFI' || this.props.navigation.state.params.workflowName == 'Incoming RFI') {
           this.props.getRFIDetails(userId, corrId, entityId,workFlowTransactionId);
          // this.props.getRFIDetailsForwardUserMasters();
         } else{
          this.props.getCorrespondenceDetails(userId, corrId);
        //  this.props.getCorrespondenceDetailsDelegateUserMasters(entityId,token);
          //this.props.getCorrespondenceDetailsForwardUserMasters(entityId, corrId);
         }     
    }
    
    _renderHeader = () => {

       if (this.props.navigation.state.params.workflowName == 'Task'){
        return (
          <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>  
            <View style={{flex:1,margin:5,marginBottom:25}}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                {/* <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                   <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
                     <Text style={{fontSize:FONT_SIZE_12,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                   </Button>
                </View>  */}
                  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                    <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:90,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.buttonText) }}>
                    <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{this.props.correspondenceDetailData.buttonText}</Text>
                   </Button> 
                </View>
              </View>
            </View>
            {this._renderCorrespondencePropertiesButton()}             
          </View>
      );
       } else if (this.props.navigation.state.params.workflowName == 'MOM') {
        const aprroveRject = this.props.correspondenceDetailData.approveRejectButtonText;
        if (aprroveRject == "Approve;Reject"){
         const approve = this.getFirstPartString(aprroveRject);
         const reject = this.getSecondPartString(aprroveRject);
          if (reject == "Reject") {
            return (
              <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>        
                <View style={{flex:1,margin:5,marginBottom:25}}>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                       <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
                         <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                       </Button>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                       {/* { this.props.correspondenceDetailData.showDelegate != 'N' &&
                         <Button style={{margin:5,backgroundColor:'#373d38',width:78,height:30}} onPress={() => { this.handleDelegateTap() }}>
                        <Text style={{fontSize:FONT_SIZE_12,fontFamily:FONT_FAMILY_PT_REGULAR}}>Delegate</Text>
                        </Button>
                      } */}
                      { this.props.correspondenceDetailData.showApproveRejct !='N' &&
                        <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:78,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                        <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{approve}</Text>
                       </Button>
                      } 
                      {/* { this.props.correspondenceDetailData.showApproveRejct !='N' &&
                       <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:78,height:30}} onPress={() => { this.handleRejectTap() }}>
                       <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>Reject</Text>
                       </Button>
                      }  */}
                    </View>
                  </View>
                </View>
                {this._renderCorrespondencePropertiesButton()}             
              </View>
          );
          } else {

            if (config.fallback == 'en'){
              return (
                <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>
                  
                  <View style={{flex:1,margin:5,marginBottom:25}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                         <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
                           <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                         </Button>
                      </View>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                         {/* { this.props.correspondenceDetailData.showDelegate != 'N' &&
                           <Button style={{margin:5,backgroundColor:'#373d38',width:78,height:30}} onPress={() => { this.handleDelegateTap() }}>
                          <Text style={{fontSize:FONT_SIZE_12,fontFamily:FONT_FAMILY_PT_REGULAR}}>Delegate</Text>
                          </Button>
                        } */}
                        { this.props.correspondenceDetailData.showApproveRejct !='N' && 
                          <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:78,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                          <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{this.props.correspondenceDetailData.approveRejectButtonText}</Text>
                         </Button>
                        } 
                      </View>
                    </View>
                  </View>
                  {this._renderCorrespondencePropertiesButton()}             
                </View>
            );
            }else {
              return (
                <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>
                  
                  <View style={{flex:1,margin:5,marginBottom:25}}>
                    <View style={{flex:1,flexDirection: 'row',justifyContent: 'space-between'}}>
                      <View style={{flex:1,flexDirection: 'row',justifyContent: 'flex-end'}}>
                         <Button style={{marginRight:0,marginTop:5,height:30,justifyContent: 'flex-end',backgroundColor:'#bcbccb', borderRadius:15}}>
                           <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                         </Button>
                      </View>
                      <View style={{flex:1,flexDirection:'row',justifyContent: 'flex-start'}}>
                         {/* { this.props.correspondenceDetailData.showDelegate != 'N' &&
                           <Button style={{margin:5,backgroundColor:'#373d38',width:78,height:30}} onPress={() => { this.handleDelegateTap() }}>
                          <Text style={{fontSize:FONT_SIZE_12,fontFamily:FONT_FAMILY_PT_REGULAR}}>Delegate</Text>
                          </Button>
                        } */}
                        { this.props.correspondenceDetailData.showApproveRejct !='N' && 
                          <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:78,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                          <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{this.props.correspondenceDetailData.approveRejectButtonText}</Text>
                         </Button>
                        } 
                      </View>
                    </View>
                  </View>
                  {this._renderCorrespondencePropertiesButton()}             
                </View>
            );
            }
            
          }
        } else {

          if (config.fallback == 'en'){
            return (
              <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>
                
                <View style={{flex:1,margin:5,marginBottom:25}}>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                       <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
                         <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                       </Button>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                       {/* { this.props.correspondenceDetailData.showDelegate != 'N' &&
                         <Button style={{margin:5,backgroundColor:'#373d38',width:78,height:30}} onPress={() => { this.handleDelegateTap() }}>
                        <Text style={{fontSize:FONT_SIZE_12,fontFamily:FONT_FAMILY_PT_REGULAR}}>Delegate</Text>
                        </Button>
                      } */}
                      { this.props.correspondenceDetailData.showApproveRejct !='N' && this.props.correspondenceDetailData.result_Status != 'INITIATED' && this.props.correspondenceDetailData.approveRejectButtonText != 'Initiate' &&
                        <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:78,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                        <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{this.props.correspondenceDetailData.approveRejectButtonText}</Text>
                       </Button>
                      } 
                    </View>
                  </View>
                </View>
                {this._renderCorrespondencePropertiesButton()}             
              </View>
          );
          }else {
            return (
              <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>
                
                <View style={{flex:1,margin:5,marginBottom:25}}>
                  <View style={{flex:1,flexDirection: 'row-reverse',justifyContent: 'space-between'}}>
                    <View style={{flex:1,flexDirection: 'row-reverse',justifyContent:'space-between'}}>
                       <Button style={{marginRight:0,marginTop:5,height:30,justifyContent: 'flex-end',backgroundColor:'#bcbccb', borderRadius:15}}>
                         <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                       </Button>
                    </View>
                    <View style={{flex:1,flexDirection: 'row',justifyContent: 'flex-start'}}>
                       {/* { this.props.correspondenceDetailData.showDelegate != 'N' &&
                         <Button style={{margin:5,backgroundColor:'#373d38',width:78,height:30}} onPress={() => { this.handleDelegateTap() }}>
                        <Text style={{fontSize:FONT_SIZE_12,fontFamily:FONT_FAMILY_PT_REGULAR}}>Delegate</Text>
                        </Button>
                      } */}
                      { this.props.correspondenceDetailData.showApproveRejct !='N' && this.props.correspondenceDetailData.result_Status != 'INITIATED' && this.props.correspondenceDetailData.approveRejectButtonText != 'Initiate' &&
                        <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:78,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                        <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{this.props.correspondenceDetailData.approveRejectButtonText}</Text>
                       </Button>
                      } 
                    </View>
                  </View>
                </View>
                {this._renderCorrespondencePropertiesButton()}             
              </View>
          );
          }
          
      }
       } else if (this.props.navigation.state.params.workflowName == 'Outgoing RFI' || this.props.navigation.state.params.workflowName == 'Incoming RFI') {
         // if (this.props.navigation.state.params.workflowName == 'Outgoing RFI') {
            const aprroveRject = this.props.correspondenceDetailData.approveRejectButtonText;
            if (aprroveRject == "Approve;Reject"){
             const approve = this.getFirstPartString(aprroveRject);
             const reject = this.getSecondPartString(aprroveRject);
              if (reject == "Reject") {
                return (
                  <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>        
                    <View style={{flex:1,margin:5,marginBottom:25}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                           <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
                             <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                           </Button>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                           { (this.props.correspondenceDetailData.result_Status == 'PENDING REPLY' || this.props.correspondenceDetailData.result_Status == 'PENDING REPLY(Rejected)') &&
                             <Button style={{margin:5,backgroundColor:'#373d38',width:88,height:30}} onPress={() => { this.handleRFIDelegateTap() }}>
                            <Text  uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>Delegate</Text>
                            </Button>
                          }
                          { this.props.correspondenceDetailData.showApproveRejct !='N' &&
                            <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:73,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                            <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{approve}</Text>
                           </Button>
                          } 
                          { this.props.correspondenceDetailData.showApproveRejct !='N' &&
                           <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:65,height:30}} onPress={() => { this.handleRejectTap() }}>
                           <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>Reject</Text>
                           </Button>
                          } 
                        </View>
                      </View>
                    </View>
                    {this._renderCorrespondencePropertiesButton()}             
                  </View>
              );
              } else {
                return (
                  <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>
                    
                    <View style={{flex:1,margin:5,marginBottom:25}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                           <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
                             <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                           </Button>
                        </View>
                        <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                           { (this.props.correspondenceDetailData.result_Status == 'PENDING REPLY' || this.props.correspondenceDetailData.result_Status == 'PENDING REPLY(Rejected)') &&
                             <Button style={{margin:5,backgroundColor:'#373d38',width:88,height:30}} onPress={() => { this.handleRFIDelegateTap() }}>
                            <Text  uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>Delegate</Text>
                            </Button>
                          }
                          { this.props.correspondenceDetailData.showApproveRejct !='N' && this.props.correspondenceDetailData.approveRejectButtonText != 'Initiate' &&
                            <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:78,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                            <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{this.props.correspondenceDetailData.approveRejectButtonText}</Text>
                           </Button>
                          } 
                        </View>
                      </View>
                    </View>
                    {this._renderCorrespondencePropertiesButton()}             
                  </View>
              );
              }
            } else {
              return (
                <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>
                  
                  <View style={{flex:1,margin:5,marginBottom:25}}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                         <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
                           <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                         </Button>
                      </View>
                      <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>

                         { (this.props.correspondenceDetailData.result_Status == 'PENDING REPLY' || this.props.correspondenceDetailData.result_Status == 'PENDING REPLY(Rejected)') &&
                           <Button style={{margin:5,backgroundColor:'#373d38',width:88,height:30}} onPress={() => { this.handleRFIDelegateTap() }}>
                          <Text  uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>Delegate</Text>
                          </Button>
                        }
                        { this.props.correspondenceDetailData.showApproveRejct !='N' && this.props.correspondenceDetailData.approveRejectButtonText != 'Initiate' &&
                          <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:78,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                          <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{this.props.correspondenceDetailData.approveRejectButtonText}</Text>
                         </Button>
                        } 
                      </View>
                    </View>
                  </View>
                  {this._renderCorrespondencePropertiesButton()}             
                </View>
            );
           // }
          // } else {
          //   return (
          //     <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>
                
          //       <View style={{flex:1,margin:5,marginBottom:25}}>
          //         <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
          //           <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          //              <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
          //                <Text uppercase={false} style={{fontSize:FONT_SIZE_12,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
          //              </Button>
          //           </View>
          //           <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
          //              {/* { this.props.correspondenceDetailData.showDelegate != 'N' &&
          //                <Button style={{margin:5,backgroundColor:'#373d38',width:78,height:30}} onPress={() => { this.handleDelegateTap() }}>
          //               <Text style={{fontSize:FONT_SIZE_12,fontFamily:FONT_FAMILY_PT_REGULAR}}>Delegate</Text>
          //               </Button>
          //             } */}
          //             { this.props.correspondenceDetailData.showApproveRejct !='N' &&
          //               <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:78,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
          //               <Text uppercase={false} style={{fontSize:FONT_SIZE_12,fontFamily:FONT_FAMILY_PT_REGULAR}}>{this.props.correspondenceDetailData.approveRejectButtonText}</Text>
          //              </Button>
          //             } 
          //           </View>
          //         </View>
          //       </View>
          //       {this._renderCorrespondencePropertiesButton()}             
          //     </View>
          // );
          }
        
       }else{
           const aprroveRject = this.props.correspondenceDetailData.approveRejectButtonText;
          if (aprroveRject == "Approve;Reject"){
           const approve = this.getFirstPartString(aprroveRject);
           const reject = this.getSecondPartString(aprroveRject);
         if (reject == "Reject") {
          return (
            <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>
              
              <View style={{flex:1,margin:5,marginBottom:25}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                     <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
                       <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                     </Button>
                  </View>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                     { this.props.correspondenceDetailData.showDelegate != 'N' &&
                       <Button style={{margin:5,backgroundColor:'#373d38',width:88,height:30}} onPress={() => { this.handleDelegateTap() }}>
                      <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>Delegate</Text>
                      </Button>
                    }
                    { this.props.correspondenceDetailData.showApproveRejct !='N' &&
                      <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:73,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                      <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{approve}</Text>
                     </Button>
                    }

                     { this.props.correspondenceDetailData.showApproveRejct !='N' &&
                      <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:65,height:30}} onPress={() => { this.handleRejectTap() }}>
                      <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>Reject</Text>
                     </Button>
                    } 
                  </View>
                </View>
              </View>
              {this._renderCorrespondencePropertiesButton()}             
            </View>
           );
         }
        }
        if (this.props.correspondenceDetailData.result_Status == 'IN DRAFT') {
          return (
            <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>
              
              <View style={{flex:1,margin:5,marginBottom:25}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                    {
                      this.props.correspondenceDetailData.result_Status != 'IN DISTRIBUTION' &&
                      <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
                       <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                     </Button>
                    }   
                  </View>
                  {/* <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                     { this.props.correspondenceDetailData.showDelegate != 'N' &&
                       <Button style={{margin:5,backgroundColor:'#373d38',width:88,height:30, alignContent:'center'}} onPress={() => { this.handleDelegateTap() }}>
                      <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,textAlign:'center',justifyContent:'center'}}>Delegate</Text>
                      </Button>
                    }
                    { this.props.correspondenceDetailData.showApproveRejct !='N' &&
                      <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:75,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                      <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{this.props.correspondenceDetailData.approveRejectButtonText}</Text>
                     </Button>
                    }
                  </View> */}
                </View>
              </View>
              {this._renderCorrespondencePropertiesButton()}             
            </View>
           );
        } else {
        return (
          <View style={{margin:5,marginTop:10, backgroundColor:'#f3f2f2',height:80}}>
            
            <View style={{flex:1,margin:5,marginBottom:25}}>
              <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                  {
                    this.props.correspondenceDetailData.result_Status != 'IN DISTRIBUTION' &&
                    <Button style={{marginLeft:0,marginTop:5,height:30,justifyContent:'center',backgroundColor:'#bcbccb', borderRadius:15,alignSelf:'flex-start'}}>
                     <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,alignSelf:'center',color:'#4d4f5c'}}>{this.props.correspondenceDetailData.result_Status && this.props.correspondenceDetailData.result_Status}</Text>
                   </Button>
                  }   
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                   { this.props.correspondenceDetailData.showDelegate != 'N' &&
                     <Button style={{margin:5,backgroundColor:'#373d38',width:88,height:30, alignContent:'center'}} onPress={() => { this.handleDelegateTap() }}>
                    <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR,textAlign:'center',justifyContent:'center'}}>Delegate</Text>
                    </Button>
                  }
                  { this.props.correspondenceDetailData.showApproveRejct !='N' && this.props.correspondenceDetailData.approveRejectButtonText != 'Initiate' &&
                    <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',width:75,height:30}} onPress={() => { this.handleApproveTap(this.props.correspondenceDetailData.approveRejectButtonText) }}>
                    <Text uppercase={false} style={{fontSize:11,fontFamily:FONT_FAMILY_PT_REGULAR}}>{this.props.correspondenceDetailData.approveRejectButtonText}</Text>
                   </Button>
                  }
                </View>
              </View>
            </View>
            {this._renderCorrespondencePropertiesButton()}             
          </View>
         );
         }
       }    
    }

    _renderCorrespondencePropertiesButton =()=> {

      if (this.props.navigation.state.params.workflowName == 'Task') {
        if (this.props.correspondenceDetailData.ridCorr != null) {
          console.log('This task is correspondece disply correspondecne properties');
          if (config.fallback == 'en'){
            return(
              <View style={{margin:10,marginTop:25,flexDirection:'row'}}>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCorrespondencePropertiesTap() }}>
                        <Image source={info} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCommentsTap() }}>
                    <Image source={comment} style={{width:20,height:20}}/>
                    </TouchableOpacity> */}
                    
              </View>
          );
          }else {
            return(
              <View style={{margin:10,marginTop:25,flexDirection: 'row-reverse'}}>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCorrespondencePropertiesTap() }}>
                        <Image source={info} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCommentsTap() }}>
                    <Image source={comment} style={{width:20,height:20}}/>
                    </TouchableOpacity> */}
                    
              </View>
          );
          }
          
        } else {
          console.log('This task is mom disply mom properties');
          if (config.fallback == 'en'){
            return(
              <View style={{margin:10,marginTop:25,flexDirection:'row'}}>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleMomPropertiesTap() }}>
                        <Image source={info} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCommentsTap() }}>
                    <Image source={comment} style={{width:20,height:20}}/>
                    </TouchableOpacity> */}
                    
              </View>
          );
          }else {
            return(
              <View style={{margin:10,marginTop:25,flexDirection: 'row-reverse'}}>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleMomPropertiesTap() }}>
                        <Image source={info} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCommentsTap() }}>
                    <Image source={comment} style={{width:20,height:20}}/>
                    </TouchableOpacity> */}
                    
              </View>
          );
          }
          
        }
        
       } else if (this.props.navigation.state.params.workflowName == 'MOM') {
         if (config.fallback == 'en'){
          return(
            <View style={{margin:10,marginTop:25,flexDirection:'row'}}>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleMomCommentTap() }}>
                  <Image source={comment} style={{width:20,height:20}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleMomPropertiesTap() }}>
                      <Image source={info} style={{width:20,height:20}}/>
                  </TouchableOpacity>  
            </View>
        );
         }else {
          return(
            <View style={{margin:10,marginTop:25,flexDirection: 'row-reverse'}}>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleMomCommentTap() }}>
                  <Image source={comment} style={{width:20,height:20}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleMomPropertiesTap() }}>
                      <Image source={info} style={{width:20,height:20}}/>
                  </TouchableOpacity>  
            </View>
        );
         }
        

       } else if (this.props.navigation.state.params.workflowName == 'Outgoing RFI' || this.props.navigation.state.params.workflowName == 'Incoming RFI') {
         if (this.props.correspondenceDetailData.result_Status == "PENDING REPLY" || this.props.correspondenceDetailData.result_Status == "PENDING REPLY(Rejected)") {
           if (config.fallback == 'en'){
            return(
              <View style={{margin:10,marginTop:25,flexDirection:'row'}}>
                 <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFICommentsTap() }}>
                    <Image source={comment} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFIPropertiesTap() }}>
                        <Image source={info} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFIForwardTap() }}>
                      <Image source={forward} style={{width:20,height:20}}/>
                     </TouchableOpacity>
                    
              </View>
          );
           } else {
            return(
              <View style={{margin:10,marginTop:25,flexDirection: 'row-reverse'}}>
                 <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFICommentsTap() }}>
                    <Image source={comment} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFIPropertiesTap() }}>
                        <Image source={info} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFIForwardTap() }}>
                      <Image source={forward} style={{width:20,height:20}}/>
                     </TouchableOpacity>
                    
              </View>
          );
           }
          
         } else {
           if (config.fallback == 'en'){
            return(
              <View style={{margin:10,marginTop:25,flexDirection:'row'}}>
                 <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFICommentsTap() }}>
                    <Image source={comment} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFIPropertiesTap() }}>
                        <Image source={info} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                    {/* {
                      this.props.correspondenceDetailData.showDelegate != 'Y' &&
                      <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFIForwardTap() }}>
                        <Image source={forward} style={{width:20,height:20}}/>
                        </TouchableOpacity>
                    } */}
                    
              </View>
          );
           }else {
            return(
              <View style={{margin:10,marginTop:25,flexDirection: 'row-reverse'}}>
                 <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFICommentsTap() }}>
                    <Image source={comment} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFIPropertiesTap() }}>
                        <Image source={info} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                    {/* {
                      this.props.correspondenceDetailData.showDelegate != 'Y' &&
                      <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleRFIForwardTap() }}>
                        <Image source={forward} style={{width:20,height:20}}/>
                        </TouchableOpacity>
                    } */}
                    
              </View>
          );
           }
          
         }
        

       }  else {
      
        if (this.props.correspondenceDetailData.showHistory == 'Y') {
          if (this.props.navigation.state.params.workflowName == 'Outgoing-Letter') {
            if (config.fallback == 'en'){
              return(
                <View style={{margin:10,marginTop:25,flexDirection:'row'}}>
                    <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCorrespondencePropertiesTap() }}>
                          <Image source={info} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCommentsTap() }}>
                      <Image source={comment} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                      {/* <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleForwardTap() }}>
                      <Image source={forward} style={{width:20,height:20}}/>
                      </TouchableOpacity> */}
                </View>
            );
            }else {
              return(
                <View style={{margin:10,marginTop:25,flexDirection: 'row-reverse'}}>
                    <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCorrespondencePropertiesTap() }}>
                          <Image source={info} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCommentsTap() }}>
                      <Image source={comment} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                      {/* <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleForwardTap() }}>
                      <Image source={forward} style={{width:20,height:20}}/>
                      </TouchableOpacity> */}
                </View>
            );
            }
            
          } else {

            if (config.fallback == 'en'){
              return(
                <View style={{margin:10,marginTop:25,flexDirection:'row'}}>
                    <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCorrespondencePropertiesTap() }}>
                          <Image source={info} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCommentsTap() }}>
                      <Image source={comment} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                      {
                  this.props.correspondenceDetailData.showDelegate != 'Y' &&
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleForwardTap() }}>
                    <Image source={forward} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                }
                </View>
            );
            }else {
              return(
                <View style={{margin:10,marginTop:25,flexDirection:'row-reverse'}}>
                    <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCorrespondencePropertiesTap() }}>
                          <Image source={info} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                      <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleCommentsTap() }}>
                      <Image source={comment} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                      {
                  this.props.correspondenceDetailData.showDelegate != 'Y' &&
                  <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleForwardTap() }}>
                    <Image source={forward} style={{width:20,height:20}}/>
                    </TouchableOpacity>
                }
                </View>
            );
            }
            }
          } else {
            if (config.fallback == 'en'){
              return(
                <View style={{margin:10,marginTop:25,flexDirection:'row'}}>
                      <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleForwardTap() }}>
                      <Image source={forward} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                </View>
            );
            }else {
              return(
                <View style={{margin:10,marginTop:25,flexDirection:'row-reverse'}}>
                      <TouchableOpacity style={{margin:5,width:40,height:30,justifyContent:'center'}} onPress={() => { this.handleForwardTap() }}>
                      <Image source={forward} style={{width:20,height:20}}/>
                      </TouchableOpacity>
                </View>
            );
            }
            
          }    
       }
    }
    _renderToandSubject = () => {

      if (this.props.navigation.state.params.workflowName == 'Task') {
          if (config.fallback == 'en'){
            return(
              <View style={{margin:10,marginTop:10,backgroundColor:'#ffffff',marginBottom:0}}>
                  <View>             
          <Text style={{fontSize:FONT_SIZE_14,fontFamily:FONT_FAMILY_PT_REGULAR,fontWeight:'700',color:'#373d38',margin:10,marginTop:15}}>{this.props.correspondenceDetailData.workflowName && this.props.correspondenceDetailData.workflowName}-{this.props.correspondenceDetailData.referencenummber && this.props.correspondenceDetailData.referencenummber}</Text>
                  </View>
                  <View style={{flexDirection:'row', margin:10}}>
                  <View style={{ flex:1,flexDirection:'row'}}>
                     <View style={{width: 40, height: 40, borderRadius: 60 / 2, backgroundColor: '#41499e', textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>
                       <Text style={{ fontSize:18,fontFamily:FONT_FAMILY_PT_REGULAR, color:'white' }}>{ this.props.correspondenceDetailData.originatorFirstName &&this.props.correspondenceDetailData.originatorFirstName.charAt(0)}</Text>
                       </View>
                   <View style={{marginLeft:10}}>
                     <View style={{flexDirection:'row'}}>
                     <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_BOLD,color:'#4d4f5c'}}>{t('InboxScreen:From')}:</Text>
                     <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#4d4f5c'}}> {this.props.correspondenceDetailData.originatorFirstName && this.props.correspondenceDetailData.originatorFirstName} {this.props.correspondenceDetailData.originatorLastName && this.props.correspondenceDetailData.originatorLastName}</Text>
                     </View>
                     <View style={{flexDirection:'row'}}>
                     <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_BOLD,color:'#43425d',marginTop:8}}>{t('InboxScreen:To')}:</Text>
            <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginTop:8}}> {this.props.userProfile.firstname && this.props.userProfile.firstname} {this.props.userProfile.lastname && this.props.userProfile.lastname}</Text>
                     </View>
                 </View>
                 <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                  <View style={{flexDirection:'row'}}>
                     <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d'}}>{t('InboxScreen:DueDate')}:</Text>
                     <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d'}}> {this.props.correspondenceDetailData.addedon && moment(this.props.correspondenceDetailData.addedon).format('MMM DD, YYYY')}</Text>
                     </View>
                 </View>
                 </View>
               </View>
               <View style={{margin:20,flexDirection:'row',marginRight:45}}>
                <Text style={{fontFamily:FONT_FAMILY_PT_BOLD,fontSize:FONT_SIZE_14}}>{t('InboxScreen:SubjectDetails')}: </Text><Text style={{marginRight:15,fontSize:14}}> {this.props.correspondenceDetailData.tasksubject && this.props.correspondenceDetailData.tasksubject}</Text>
    
                 </View>
              </View>
          );
          }else {
            return(
              <View style={{margin:10,marginTop:10,backgroundColor:'#ffffff',alignSelf: 'stretch',marginBottom:0, justifyContent:'flex-end',alignContent:'flex-end'}}>
                  <View>             
                  <Text style={{fontSize:FONT_SIZE_14,fontFamily:FONT_FAMILY_PT_REGULAR,fontWeight:'700',color:'#373d38',margin:10,marginTop:15, textAlign:'right'}}>{this.props.correspondenceDetailData.workflowName && this.props.correspondenceDetailData.workflowName}-{this.props.correspondenceDetailData.referencenummber && this.props.correspondenceDetailData.referencenummber}</Text>
                  </View>
                  <View style={{flexDirection:'row', margin:10,justifyContent:'flex-end',alignContent:'flex-end'}}>
  
                  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                  <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d', textAlign:'left'}}> {this.props.correspondenceDetailData.addedon && moment(this.props.correspondenceDetailData.addedon).format('MMM DD, YYYY')}</Text>
                 </View>
                 
                  <View style={{ flex:1,flexDirection:'row',justifyContent:'flex-end',alignSelf:'flex-end'}}>
                    
                   <View style={{marginLeft:10}}>
                     <View style={{flexDirection:'row'}}>
                     <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#4d4f5c'}}> {this.props.correspondenceDetailData.originatorFirstName && this.props.correspondenceDetailData.originatorFirstName} {this.props.correspondenceDetailData.originatorLastName && this.props.correspondenceDetailData.originatorLastName}</Text>
                     <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_BOLD,color:'#4d4f5c'}}>{t('InboxScreen:From')}:</Text>
                     </View>
                     <View style={{flexDirection:'row'}}>
                     <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginTop:8}}> {this.props.userProfile.firstname && this.props.userProfile.firstname} {this.props.userProfile.lastname && this.props.userProfile.lastname}</Text>
                     <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_BOLD,color:'#43425d',marginTop:8}}>{t('InboxScreen:To')}:</Text>
                     </View>
                     
                 </View>
                 <View style={{width: 40, height: 40, borderRadius: 60 / 2, backgroundColor: '#41499e', textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>
                 <Text style={{ fontSize:18,fontFamily:FONT_FAMILY_PT_REGULAR, color:'white' }}>{ this.props.correspondenceDetailData.originatorFirstName &&this.props.correspondenceDetailData.originatorFirstName.charAt(0)}</Text>
                    </View>
                 </View>
               </View>
               <View style={{margin:20,flexDirection:'row',marginLeft:45, alignSelf:'flex-end'}}>
               <Text style={{marginLeft:15,fontSize:14}}> {this.props.correspondenceDetailData.subject && this.props.correspondenceDetailData.subject}</Text>
                <Text style={{fontFamily:FONT_FAMILY_PT_BOLD,fontSize:FONT_SIZE_14,textAlign:'right'}}>{t('InboxScreen:SubjectDetails')}: </Text>
                 </View>
              </View>
          );
          }
        
       } else if (this.props.navigation.state.params.workflowName == 'MOM') {
         if (config.fallback == 'en'){
          return(
            <View style={{margin:10,marginTop:10,backgroundColor:'#ffffff',marginBottom:0,marginRight:10}}>
                <View>             
        <Text style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR,fontWeight:'700',color:'#373d38',margin:10,marginTop:15}}>{this.props.correspondenceDetailData.workflowName && this.props.correspondenceDetailData.workflowName}-{this.props.correspondenceDetailData.crn && this.props.correspondenceDetailData.crn}</Text>
                </View>
                <View style={{flexDirection:'row', margin:10}}>
                <View style={{ flex:1,flexDirection:'row'}}>
                   <View style={{width: 40, height: 40, borderRadius: 60 / 2, backgroundColor: '#41499e', textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>
                     <Text style={{ fontSize: 18, fontFamily:FONT_FAMILY_PT_REGULAR,color:'white' }}>{ this.props.correspondenceDetailData.senderFirstName &&this.props.correspondenceDetailData.senderFirstName.charAt(0)}</Text>
                     </View>
                 <View style={{marginLeft:10}}>
                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_BOLD,color:'#4d4f5c'}}>{t('InboxScreen:From')}:</Text>
                   <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#4d4f5c'}}> {this.props.correspondenceDetailData.senderFirstName && this.props.correspondenceDetailData.senderFirstName} {this.props.correspondenceDetailData.senderLastName && this.props.correspondenceDetailData.senderLastName}</Text>
                   </View>
                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_BOLD,color:'#43425d',marginTop:8}}>{t('InboxScreen:To')}:</Text>
                   <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginTop:8}}> {this.props.userProfile.firstname && this.props.userProfile.firstname} {this.props.userProfile.lastname && this.props.userProfile.lastname}</Text>
                   </View>
               </View>
               <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d'}}>{this.props.correspondenceDetailData.inboxlistDate && moment(this.props.correspondenceDetailData.inboxlistDate).format('MMM DD, YYYY  HH:mm')}</Text>
               </View>
               </View>
             </View>
             <View style={{margin:20,flexDirection:'row',marginRight:45}}>
              <Text style={{fontFamily:FONT_FAMILY_PT_BOLD,fontSize:FONT_SIZE_14}}>{t('InboxScreen:SubjectDetails')}: </Text><Text style={{marginRight:15,fontSize:14}}> {this.props.correspondenceDetailData.subject && this.props.correspondenceDetailData.subject}</Text>
               </View>
            </View>
        );
         } else {
          return(
            <View style={{margin:10,marginTop:10,backgroundColor:'#ffffff',marginBottom:0,marginRight:10}}>
                <View>             
                   <Text style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR,fontWeight:'700',color:'#373d38',margin:10,marginTop:15,textAlign:'right'}}>{this.props.correspondenceDetailData.workflowName && this.props.correspondenceDetailData.workflowName}-{this.props.correspondenceDetailData.crn && this.props.correspondenceDetailData.crn}</Text>
                </View>
                <View style={{flexDirection:'row', margin:10}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d'}}>{this.props.correspondenceDetailData.inboxlistDate && moment(this.props.correspondenceDetailData.inboxlistDate).format('MMM DD, YYYY  HH:mm')}</Text>
               </View>
               <View style={{ flex:1,flexDirection:'row',justifyContent:'flex-end',alignSelf:'flex-end'}}>
                  
                  <View style={{marginLeft:10,marginRight:10}}>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#4d4f5c'}}> {this.props.correspondenceDetailData.senderFirstName && this.props.correspondenceDetailData.senderFirstName} {this.props.correspondenceDetailData.senderLastName && this.props.correspondenceDetailData.senderLastName}</Text>
                    <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_BOLD,color:'#4d4f5c'}}>{t('InboxScreen:From')}:</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginTop:8}}> {this.props.userProfile.firstname && this.props.userProfile.firstname} {this.props.userProfile.lastname && this.props.userProfile.lastname}</Text>
                    <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_BOLD,color:'#43425d',marginTop:8}}>{t('InboxScreen:To')}:</Text>
                    </View>
                    
                </View>
                <View style={{width: 40, height: 40, borderRadius: 60 / 2, backgroundColor: '#41499e', textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>
                      <Text style={{ fontSize: 18, fontFamily:FONT_FAMILY_PT_REGULAR,color:'white' }}>{ this.props.correspondenceDetailData.senderFirstName &&this.props.correspondenceDetailData.senderFirstName.charAt(0)}</Text>
                   </View>
                </View>
              </View>
             <View style={{margin:20,flexDirection:'row',marginLeft:45, alignSelf:'flex-end'}}>
             <Text style={{marginRight:15,fontSize:14}}> {this.props.correspondenceDetailData.subject && this.props.correspondenceDetailData.subject}</Text>
              <Text style={{fontFamily:FONT_FAMILY_PT_BOLD,fontSize:FONT_SIZE_14}}>{t('InboxScreen:SubjectDetails')}: </Text>
               </View>
            </View>
        );
         }
        
       } else if (this.props.navigation.state.params.workflowName == 'Outgoing RFI' ||this.props.navigation.state.params.workflowName == 'Incoming RFI'){
         if (config.fallback == 'en'){
          return(
            <View style={{margin:10,marginTop:10,backgroundColor:'#ffffff', alignSelf: 'stretch',marginBottom:0}}>
                <View>             
        <Text style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR,fontWeight:'700',color:'#373d38',margin:10,marginTop:15}}>{this.props.correspondenceDetailData.workflowName && this.props.correspondenceDetailData.workflowName}-{this.props.correspondenceDetailData.crn && this.props.correspondenceDetailData.crn}</Text>
                </View>
                <View style={{flexDirection:'row', margin:10}}>
                <View style={{ flex:1,flexDirection:'row'}}>
                   <View style={{width: 40, height: 40, borderRadius: 60 / 2, backgroundColor: '#41499e', textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>
                     <Text style={{ fontSize: 18, fontFamily:FONT_FAMILY_PT_REGULAR,color:'white' }}>{ this.props.correspondenceDetailData.senderFirstName &&this.props.correspondenceDetailData.senderFirstName.charAt(0)}</Text>
                     </View>
                 <View style={{marginLeft:10}}>
                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_BOLD,color:'#4d4f5c'}}>{t('InboxScreen:From')}:</Text>
                   <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#4d4f5c'}}> {this.props.correspondenceDetailData.senderFirstName && this.props.correspondenceDetailData.senderFirstName} {this.props.correspondenceDetailData.senderLastName && this.props.correspondenceDetailData.senderLastName}</Text>
                   </View>
                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_BOLD,color:'#43425d',marginTop:8}}>{t('InboxScreen:To')}:</Text>
                   <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginTop:8}}> {this.props.userProfile.firstname && this.props.userProfile.firstname} {this.props.userProfile.lastname && this.props.userProfile.lastname}</Text>
                   </View>
               </View>
               <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d'}}>{this.props.correspondenceDetailData.inboxlistDate && moment(this.props.correspondenceDetailData.inboxlistDate).format('MMM DD, YYYY  HH:mm')}</Text>
               </View>
               </View>
             </View>
             <View style={{marginLeft:20, marginTop:20,marginBottom:0,marginRight:45,flexDirection:'row',alignSelf: 'stretch'}}>
              <Text style={{fontFamily:FONT_FAMILY_PT_BOLD,fontSize:FONT_SIZE_14}}>{t('InboxScreen:SubjectDetails')}: </Text><Text style={{marginRight:15,fontSize:14}}> {this.props.correspondenceDetailData.subject && this.props.correspondenceDetailData.subject}</Text>
                </View>
            </View>
        );
         } else {
          return(
            <View style={{margin:10,marginTop:10,backgroundColor:'#ffffff', alignSelf: 'stretch',marginBottom:0,justifyContent: 'flex-end', alignContent:'flex-end'}}>
                <View>             
                  <Text style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR,fontWeight:'700',color:'#373d38',margin:10,marginTop:15, textAlign:'right'}}>{this.props.correspondenceDetailData.workflowName && this.props.correspondenceDetailData.workflowName}-{this.props.correspondenceDetailData.crn && this.props.correspondenceDetailData.crn}</Text>
                </View>
                <View style={{flexDirection:'row', margin:10, justifyContent:'flex-end', alignSelf:'flex-end'}}>

                 <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                 <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d'}}>{this.props.correspondenceDetailData.inboxlistDate && moment(this.props.correspondenceDetailData.inboxlistDate).format('MMM DD, YYYY  HH:mm')}</Text>
                </View>

                <View style={{ flex:1,flexDirection:'row',justifyContent:'flex-end', alignSelf:'flex-end'}}>

                  

                  
                 <View style={{marginRight:10}}>
                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#4d4f5c', textAlign:'right'}}> {this.props.correspondenceDetailData.senderFirstName && this.props.correspondenceDetailData.senderFirstName} {this.props.correspondenceDetailData.senderLastName && this.props.correspondenceDetailData.senderLastName}</Text>
                   <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_BOLD,color:'#4d4f5c', textAlign:'right'}}>{t('InboxScreen:From')}:</Text>
                   </View>
                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginTop:8, textAlign:'right'}}> {this.props.userProfile.firstname && this.props.userProfile.firstname} {this.props.userProfile.lastname && this.props.userProfile.lastname}</Text>
                   <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_BOLD,color:'#43425d',marginTop:8,textAlign:'right'}}>{t('InboxScreen:To')}:</Text>
                   </View>
                   
               </View>
               <View style={{width: 40, height: 40, borderRadius: 60 / 2, backgroundColor: '#41499e', textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>
                     <Text style={{ fontSize: 18, fontFamily:FONT_FAMILY_PT_REGULAR,color:'white' }}>{ this.props.correspondenceDetailData.senderFirstName &&this.props.correspondenceDetailData.senderFirstName.charAt(0)}</Text>
                </View>
               
               
               </View>
             </View>
             <View style={{marginRight:20, marginTop:20,marginBottom:0,marginLeft:45,flexDirection:'row',alignSelf: 'stretch',justifyContent:'flex-end'}}>
             <Text style={{marginLeft:15,fontSize:14, textAlign:'right'}}> {this.props.correspondenceDetailData.subject && this.props.correspondenceDetailData.subject}</Text>
              <Text style={{fontFamily:FONT_FAMILY_PT_BOLD,fontSize:FONT_SIZE_14}}>{t('InboxScreen:SubjectDetails')}: </Text>
                </View>
            </View>
        );
         }
       } else {
        
        if (config.fallback == 'en'){
          return(
            <View style={{margin:10,marginTop:10,backgroundColor:'#ffffff',alignSelf: 'stretch',marginBottom:0}}>
                <View>             
        <Text style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR,fontWeight:'700',color:'#373d38',margin:10,marginTop:15}}>{this.props.correspondenceDetailData.workflowName && this.props.correspondenceDetailData.workflowName}-{this.props.correspondenceDetailData.crn && this.props.correspondenceDetailData.crn}</Text>
                </View>
                <View style={{flexDirection:'row', margin:10}}>
                <View style={{ flex:1,flexDirection:'row'}}>
                   <View style={{width: 40, height: 40, borderRadius: 60 / 2, backgroundColor: '#41499e', textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>
                     <Text style={{ fontSize: 18, fontFamily:FONT_FAMILY_PT_REGULAR,color:'white' }}>{ this.props.correspondenceDetailData.senderFirstName &&this.props.correspondenceDetailData.senderFirstName.charAt(0)}</Text>
                     </View>
                 <View style={{marginLeft:10}}>
                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_BOLD,color:'#4d4f5c'}}>{t('InboxScreen:From')}:</Text>
                   <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#4d4f5c'}}> {this.props.correspondenceDetailData.senderFirstName && this.props.correspondenceDetailData.senderFirstName} {this.props.correspondenceDetailData.senderLastName && this.props.correspondenceDetailData.senderLastName}</Text>
                   </View>
                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_BOLD,color:'#43425d',marginTop:8}}>{t('InboxScreen:To')}:</Text>
                   <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginTop:8}}> {this.props.userProfile.firstname && this.props.userProfile.firstname} {this.props.userProfile.lastname && this.props.userProfile.lastname}</Text>
                   </View>
               </View>
               <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d'}}>{this.props.correspondenceDetailData.inboxlistDate && moment(this.props.correspondenceDetailData.inboxlistDate).format('MMM DD, YYYY  HH:mm')}</Text>
               </View>
               </View>
             </View>
             <View style={{margin:20,flexDirection:'row',marginRight:45}}>
              <Text style={{fontFamily:FONT_FAMILY_PT_BOLD,fontSize:FONT_SIZE_14}}>{t('InboxScreen:SubjectDetails')}: </Text><Text style={{marginRight:15,fontSize:14}}> {this.props.correspondenceDetailData.subject && this.props.correspondenceDetailData.subject}</Text>
  
               </View>
            </View>
        );
        }else {
          return(
            <View style={{margin:10,marginTop:10,backgroundColor:'#ffffff',alignSelf: 'stretch',marginBottom:0, justifyContent:'flex-end',alignContent:'flex-end'}}>
                <View>             
                     <Text style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR,fontWeight:'700',color:'#373d38',margin:10,marginTop:15, textAlign:'right'}}>{this.props.correspondenceDetailData.workflowName && this.props.correspondenceDetailData.workflowName}-{this.props.correspondenceDetailData.crn && this.props.correspondenceDetailData.crn}</Text>
                </View>
                <View style={{flexDirection:'row', margin:10,justifyContent:'flex-end',alignContent:'flex-end'}}>

                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                <Text style={{fontSize:12,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d', textAlign:'left'}}>{this.props.correspondenceDetailData.inboxlistDate && moment(this.props.correspondenceDetailData.inboxlistDate).format('MMM DD, YYYY  HH:mm')}</Text>
               </View>
               
                <View style={{ flex:1,flexDirection:'row',justifyContent:'flex-end',alignSelf:'flex-end'}}>
                  
                 <View style={{marginLeft:10}}>
                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_REGULAR,color:'#4d4f5c'}}> {this.props.correspondenceDetailData.senderFirstName && this.props.correspondenceDetailData.senderFirstName} {this.props.correspondenceDetailData.senderLastName && this.props.correspondenceDetailData.senderLastName}</Text>
                   <Text style={{fontSize:13,fontFamily:FONT_FAMILY_PT_BOLD,color:'#4d4f5c'}}>{t('InboxScreen:From')}:</Text>
                   </View>
                   <View style={{flexDirection:'row'}}>
                   <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_REGULAR,color:'#43425d',marginTop:8}}> {this.props.userProfile.firstname && this.props.userProfile.firstname} {this.props.userProfile.lastname && this.props.userProfile.lastname}</Text>
                   <Text style={{fontSize:12, fontFamily:FONT_FAMILY_PT_BOLD,color:'#43425d',marginTop:8}}>{t('InboxScreen:To')}:</Text>
                   </View>
                   
               </View>
               <View style={{width: 40, height: 40, borderRadius: 60 / 2, backgroundColor: '#41499e', textAlign: 'center', justifyContent: 'center', alignItems: 'center',}}>
                     <Text style={{ fontSize: 18, fontFamily:FONT_FAMILY_PT_REGULAR,color:'white' }}>{ this.props.correspondenceDetailData.senderFirstName &&this.props.correspondenceDetailData.senderFirstName.charAt(0)}</Text>
                  </View>
               </View>
             </View>
             <View style={{margin:20,flexDirection:'row',marginLeft:45, alignSelf:'flex-end'}}>
             <Text style={{marginLeft:15,fontSize:14}}> {this.props.correspondenceDetailData.subject && this.props.correspondenceDetailData.subject}</Text>
              <Text style={{fontFamily:FONT_FAMILY_PT_BOLD,fontSize:FONT_SIZE_14,textAlign:'right'}}>{t('InboxScreen:SubjectDetails')}: </Text>
               </View>
            </View>
        );
        }
       }   
    }
    _renderAttachment =() => {
      if (config.fallback == 'en'){
        return (
          <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff',alignSelf: 'stretch',marginBottom:10}}>
              <Content>
              {

               this.props.correspondenceDetailAttachment && this.props.correspondenceDetailAttachment.length > 0 && this.props.correspondenceDetailAttachment.map((ele, index) => <CorrespondenceAttachmentCard key={index} correspondenceAttachment={ele} />)

             }
              </Content>
          </View>
      );
      }else {
        return (
          <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff',alignSelf: 'stretch',alignItems:'flex-end',justifyContent:'flex-end',marginBottom:10}}>
              <Content>
              {

               this.props.correspondenceDetailAttachment && this.props.correspondenceDetailAttachment.length > 0 && this.props.correspondenceDetailAttachment.map((ele, index) => <CorrespondenceAttachmentCard key={index} correspondenceAttachment={ele} />)

             }
              </Content>
          </View>
      );
      }     
    }
    _renderText = () => {
      if (this.props.navigation.state.params.workflowName == 'Task'){
        if (config.fallback == 'en'){
          return(
            <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff',paddingBottom:20, alignSelf: 'stretch'}}>
                 <ScrollView>
                    <Text style={{margin:10,marginTop:0,fontFamily:FONT_FAMILY_PT_REGULAR, fontSize:14}}>{this.props.correspondenceDetailData.taskdescription && this.props.correspondenceDetailData.taskdescription}</Text>
                 </ScrollView>
            </View>
        );
        }else {
          return(
            <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff',paddingBottom:20, alignSelf: 'stretch',justifyContent:'flex-end', alignContent:'flex-end'}}>
                 <ScrollView>
                    <Text style={{margin:10,marginTop:0,fontFamily:FONT_FAMILY_PT_REGULAR, fontSize:14, textAlign:'right'}}>{this.props.correspondenceDetailData.taskdescription && this.props.correspondenceDetailData.taskdescription}</Text>
                 </ScrollView>
            </View>
        );
        }  
       } else if (this.props.navigation.state.params.workflowName == 'MOM') {
         if (config.fallback == 'en'){
          return(
            <View style={{marginLeft:10,marginRight:10,marginTop:0,backgroundColor:'#ffffff',paddingBottom:10,alignSelf: 'stretch'}}>
                 <ScrollView>
                   <View style={{marginLeft:20,marginTop:10, flexDirection:'row',marginRight:10}}>
                    <Text style={{fontFamily:FONT_FAMILY_PT_BOLD, fontSize:14}}>Meeting Details: </Text><Text style={{marginRight:0,fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR,flexWrap: 'wrap', flexShrink:1}}> {this.props.correspondenceDetailData.bodyContent && this.props.correspondenceDetailData.bodyContent}</Text>
                   </View>  
                                    
               </ScrollView>
            </View>
            );
         } else {
          return(
            <View style={{marginLeft:10,marginRight:10,marginTop:0,backgroundColor:'#ffffff',paddingBottom:10,alignSelf: 'stretch',justifyContent:'flex-end'}}>
                 <ScrollView>
                   <View style={{marginLeft:10,marginTop:10, flexDirection:'row',marginRight:10,alignSelf:'flex-end'}}>
                   <Text style={{marginRight:0,fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR,flexWrap: 'wrap', flexShrink:1}}> {this.props.correspondenceDetailData.bodyContent && this.props.correspondenceDetailData.bodyContent}</Text>
                    <Text style={{fontFamily:FONT_FAMILY_PT_BOLD, fontSize:14}}>Meeting Details: </Text>
                   </View>  
                                    
               </ScrollView>
            </View>
            );
         }
       } else if (this.props.navigation.state.params.workflowName == 'Outgoing RFI' ||this.props.navigation.state.params.workflowName == 'Incoming RFI') {
        if (config.fallback == 'en'){
          return(
            <View style={{marginLeft:10,marginRight:10,marginTop:0,backgroundColor:'#ffffff',paddingBottom:10,alignSelf: 'stretch'}}>
                 <ScrollView>
                   <View style={{marginLeft:20,marginTop:10, flexDirection:'row',marginRight:20}}>
                    <Text style={{fontFamily:FONT_FAMILY_PT_BOLD, fontSize:14}}>{t('InboxScreen:Query')}: </Text><Text style={{marginRight:15,fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR,flexWrap: 'wrap', flexShrink:1}}> {this.props.correspondenceDetailData.transactionComments && this.props.correspondenceDetailData.transactionComments}</Text>
                   </View>  
                   <View style={{marginLeft:20, marginTop:10, flexDirection:'row',marginRight:60}}>
                     <Text style={{fontFamily:FONT_FAMILY_PT_BOLD, fontSize:14}}>{t('InboxScreen:Response')}: </Text> 
                     { this.props.correspondenceDetailData.bodyContent ?
                      <HTML  style={{fontSize:14,marginRight:45, fontFamily:FONT_FAMILY_PT_REGULAR}} html={this.props.correspondenceDetailData.bodyContent} imagesMaxWidth={Dimensions.get('window').width-110} /> : <Text style={{marginRight:15,fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR}}>N/A</Text>
                     }
                   </View>                   
               </ScrollView>
            </View>
            );
        } else {
          return(
            <View style={{marginLeft:10,marginRight:10,marginTop:0,backgroundColor:'#ffffff',paddingBottom:10,alignSelf: 'stretch',justifyContent:'flex-end'}}>
                 <ScrollView>
                   <View style={{marginRight:20,marginTop:10, flexDirection:'row',marginLeft:45,alignSelf:'flex-end'}}>
                    <Text style={{marginRight:15,fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR,flexWrap: 'wrap', flexShrink:1}}> {this.props.correspondenceDetailData.transactionComments && this.props.correspondenceDetailData.transactionComments}</Text>
                    <Text style={{fontFamily:FONT_FAMILY_PT_BOLD, fontSize:14}}>{t('InboxScreen:Query')}: </Text>
                   </View>  
                   <View style={{marginRight:20, marginTop:10, flexDirection:'row',marginLeft:45, alignSelf:'flex-end'}}>
                      <HTML  style={{fontSize:14,marginRight:15, fontFamily:FONT_FAMILY_PT_REGULAR}} html={this.props.correspondenceDetailData.bodyContent} imagesMaxWidth={Dimensions.get('window').width-100} />
                      <Text style={{fontFamily:FONT_FAMILY_PT_BOLD, fontSize:14}}>{t('InboxScreen:Response')}: </Text> 
                   </View>                   
               </ScrollView>
            </View>
            );
        } 
       } else {
         if (config.fallback == 'en'){
          return(
            <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff',paddingBottom:20, alignSelf: 'stretch'}}>
                 { this.props.correspondenceDetailData.transactionComments != null &&
                   <ScrollView>
                    <Text style={{margin:10,marginTop:0,fontSize:14, marginLeft: 20}}>{this.props.correspondenceDetailData.transactionComments && this.props.correspondenceDetailData.transactionComments}</Text>
                   </ScrollView>
                 }
                 
                 <ScrollView>
                    <View style={{margin:10,marginTop:0,marginLeft:20,marginRight:10}} >
                    <HTML html={this.props.correspondenceDetailData.bodyContent} ignoredStyles={['font-family', 'display','text-align',]}
  allowedStyles={["none","flex"]} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                 </ScrollView>
            </View>
        );
         }else {
          return(
            <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff',paddingBottom:20, alignSelf: 'stretch', justifyContent:'flex-end', alignContent:'flex-end'}}>
                 { this.props.correspondenceDetailData.transactionComments != null &&
                   <ScrollView>
                    <Text style={{margin:10,marginTop:0,fontSize:14,textAlign:'right'}}>{this.props.correspondenceDetailData.transactionComments && this.props.correspondenceDetailData.transactionComments}</Text>
                   </ScrollView>
                 }
                 
                 <ScrollView>
                    <View style={{margin:10,marginTop:0,marginLeft:10,marginRight:20, justifyContent:'flex-end', alignSelf:'flex-end'}} >
                    <HTML html={this.props.correspondenceDetailData.bodyContent} ignoredStyles={['font-family', 'display','text-align',]}
  allowedStyles={["none","flex"]} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                 </ScrollView>
            </View>
        );
         }
        

       }
        
    }
    _renderCreateTaskList = () => {

      if (this.props.navigation.state.params.workflowName == 'MOM'){

        if (config.fallback == 'en'){

          if (this.props.correspondenceDetailData.result_Status == 'DISTRIBUTED'){
            return (
              <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff', alignSelf:'stretch',marginTop:0}}>
                {  this.props.correspondenceDetailTasks.length > 0 &&
                <Card>
                    <CardItem>
                        <Body>
                         <View style={{marginLeft:5,height:30,backgroundColor:'#d0cfcf',width: screenWidth-50,alignContent:'center',justifyContent:'center'}}>
                           <Text style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginLeft:5}}>{t('InboxScreen:ActionItems')}</Text>   
                          </View>
                         <Content>
                        {
                          this.props.correspondenceDetailTasks && this.props.correspondenceDetailTasks.length > 0 && this.props.correspondenceDetailTasks.map((ele, index) => <MomTaskCard key={index} correspondenceTask ={ele} />)
                        }
                </Content>
              </Body>
            </CardItem>
          </Card>
          }
        </View>
          );
          } 
        }else {
          if (this.props.correspondenceDetailData.result_Status == 'DISTRIBUTED'){
            return (
              <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff', alignSelf:'stretch',marginTop:0,justifyContent:'flex-end',alignContent:'flex-end'}}>
                {  this.props.correspondenceDetailTasks.length > 0 &&
                <Card>
                    <CardItem style = {{alignSelf:'flex-end'}}>
                        <Body>
                         <View style={{marginLeft:5,height:30,backgroundColor:'#d0cfcf',width: screenWidth-50,alignContent:'center',justifyContent:'flex-end', alignSelf:'flex-end'}}>
                           <Text style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginRight:5, textAlign:'right'}}>{t('InboxScreen:ActionItems')}</Text>   
                          </View>
                         <Content>
                        {
                          this.props.correspondenceDetailTasks && this.props.correspondenceDetailTasks.length > 0 && this.props.correspondenceDetailTasks.map((ele, index) => <MomTaskCard key={index} correspondenceTask ={ele} />)
                        }
                </Content>
              </Body>
            </CardItem>
          </Card>
          }
        </View>
          );
          } 
        }
       
      }  else  if (this.props.navigation.state.params.workflowName != 'Outgoing RFI' && this.props.navigation.state.params.workflowName != 'Incoming RFI' ){
        if(config.fallback == 'en'){
          return (
            <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff', alignSelf:'stretch',marginTop:0}}>
             {  this.props.correspondenceDetailTasks.length > 0 &&
              <Card>
                  <CardItem>
                      <Body>
                       <View style={{marginLeft:5,height:30,backgroundColor:'#d0cfcf',width: screenWidth-50,alignContent:'center',justifyContent:'center'}}>
                         <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginLeft:5}}>{t('InboxScreen:TaskDetails')}</Text>   
                        </View>
                       <Content>
                      {
                        this.props.correspondenceDetailTasks && this.props.correspondenceDetailTasks.length > 0 && this.props.correspondenceDetailTasks.map((ele, index) => <CorrespondenceTaskCard isTask = {false} key={index} correspondenceTask ={ele} />)
                      }
              </Content>
            </Body>
          </CardItem>
        </Card>
        }
        </View>
        );
        }else {
          return (
            <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff', alignSelf:'stretch',marginTop:0,justifyContent:'flex-end'}}>
             {  this.props.correspondenceDetailTasks.length > 0 &&
              <Card>
                  <CardItem>
                      <Body>
                       <View style={{marginLeft:5,height:30,backgroundColor:'#d0cfcf',width: screenWidth-50,alignContent:'center',justifyContent:'flex-end', alignSelf:'flex-end'}}>
                         <Text style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginRight:5, textAlign:'right'}}>{t('InboxScreen:TaskDetails')}</Text>   
                        </View>
                       <Content>
                      {
                        this.props.correspondenceDetailTasks && this.props.correspondenceDetailTasks.length > 0 && this.props.correspondenceDetailTasks.map((ele, index) => <CorrespondenceTaskCard isTask = {false} key={index} correspondenceTask ={ele} />)
                      }
              </Content>
            </Body>
          </CardItem>
        </Card>
        }
            </View>
        );
        }
        
      }
    }
    _renderActionApprovalList = () => {
if (config.fallback == 'en'){
  if (this.props.navigation.state.params.workflowName == 'MOM') {
    if(this.props.userProfile.username == `${this.props.correspondenceDetailData.senderFirstName}.${this.props.correspondenceDetailData.senderLastName}`){
      return (
        <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff', alignSelf:'stretch',marginTop:0}}>
          { this.props.correspondenceDetailActionItem.length > 0 &&
          <Card>
              <CardItem>
                  <Body>
                   <View style={{marginLeft:5,height:30,backgroundColor:'#d0cfcf',width: screenWidth-50,alignContent:'center',justifyContent:'center'}}>
                     <Text style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD,alignItems:'center',marginLeft:5}}>{t('InboxScreen:Approvals')}</Text>   
                    </View>
                   <Content>
                  {
                    this.props.correspondenceDetailActionItem &&  this.props.correspondenceDetailActionItem.length > 0 && this.props.correspondenceDetailActionItem.map((ele, index) => <MOMActionItemsCard key={index} correspondenceActionItems ={ele}  userId = {this.props.userProfile.ridUsermaster} workFTID = {this.props.correspondenceDetailData.ridWorkflowTransaction} token= {this.props.loggedInUser.token} corrId = {this.props.navigation.state.params.ridInOutCorr} getApproveValuesrefersh={(isRefersh) => {
                      console.log('Go back approve popup')
                    
                     if (isRefersh == true) {
                      const corrId = this.props.navigation.state.params.ridInOutCorr;
                      const userId = this.props.userProfile.ridUsermaster;
                      const token = this.props.loggedInUser.token;
                      this.props.getMomDetails(userId, corrId, token);
                         }
                      }} />)
                  }
          </Content>
        </Body>
      </CardItem>
    </Card>
     }
  </View>
  );
    }
 }      
} else {
      if (this.props.navigation.state.params.workflowName == 'MOM') {
        if(this.props.userProfile.username == `${this.props.correspondenceDetailData.senderFirstName}.${this.props.correspondenceDetailData.senderLastName}`){
          return (
            <View style={{marginLeft:10,marginRight:10,backgroundColor:'#ffffff',justifyContent:'flex-end',alignItems:'flex-end',marginTop:0}}>
              { this.props.correspondenceDetailActionItem.length > 0 &&
              <Card>
                  <CardItem style={{alignSelf:'flex-end'}}>
                      <Body>
                       <View style={{marginRight:5,height:30,backgroundColor:'#d0cfcf',width: screenWidth-50,justifyContent:'flex-end',alignItems:'flex-end'}}>
                         <Text style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD,marginRight:5}}>{t('InboxScreen:Approvals')}</Text>   
                        </View>
                       <Content>
                      {
                        this.props.correspondenceDetailActionItem &&  this.props.correspondenceDetailActionItem.length > 0 && this.props.correspondenceDetailActionItem.map((ele, index) => <MOMActionItemsCard key={index} correspondenceActionItems ={ele}  userId = {this.props.userProfile.ridUsermaster} workFTID = {this.props.correspondenceDetailActionItem.ridWorkflowTransaction} token ={this.props.loggedInUser.token} corrId = {this.props.navigation.state.params.ridInOutCorr}/>)
                      }
              </Content>
            </Body>
          </CardItem>
        </Card>
         }
      </View>
      );
        }
     }      
  }
 }
    getFirstPartString(str) {
     
      return str.split(';')[0];
    }
     getSecondPartString(str) {
      
      return str.split(';')[1];
    }
    handleDelegateTap = () => {
        this.setState((state) => {
          return {
            isDelegateModalVisible: true,
          };
        });
      }
    handleRFIDelegateTap = () => {
        this.setState((state) => {
          return {
            isRFIDelegateModelVisible: true,
          };
        });
      }
      handleApproveTap = (buttonText) => {
        const userId = this.props.userProfile.ridUsermaster;
        const workFTID = this.props.correspondenceDetailData.ridWorkflowTransaction;
        const singingUrl = this.props.correspondenceDetailData.signingURL;
        const crn = this.props.correspondenceDetailData.crn
        if (buttonText == "Approve;Reject"){
            const approve = this.getFirstPartString(buttonText);
           if (this.props.navigation.state.params.workflowName == 'MOM'){
           

             if(this.props.userProfile.firstname  == this.props.correspondenceDetailData.senderFirstName && this.props.userProfile.lastname == this.props.correspondenceDetailData.senderLastName){
           
              if (approve == 'Approve') {
                this.setState((state) => {
                  return {
                    isMomApproveModelVisible: true,
                  };
                });
              }
             }else {
              console.log('mom normsl approve popp');
              if (approve == 'Approve') {
                this.setState((state) => {
                  return {
                    isApproveModalVisible: true,
                  };
                });
              }
             } 
           }else {
            if (approve == 'Approve') {
              if (singingUrl == '' || singingUrl == 'N'){
             this.setState((state) => {
               return {
                 isApproveModalVisible: true,
               };
             });
           } else {
            for(const attachement of this.props.correspondenceDetailAttachment){
              let attachementCrn = attachement.attachedfilename;
              let attachCrn = attachementCrn.replace('.pdf','');
              if (crn == attachCrn){
               this.setState((state) => {
               return {
                singingUrl: attachement.documentumid,
                isSignatureModelVisible: true,
                 };
               });
              }
             }
            }
           } else if (buttonText == 'Initiate') {
            this.setState((state) => {
              return {
                isInitiateModalVisible: true,
              };
           });
          }
      
       
        // if (buttonText == 'Approve') {
        //   this.setState((state) => {
        //     return {
        //       isApproveModalVisible: true,
        //     };
        //   });
        // } 
    }         
  } else if (buttonText == 'Complete') {
       const taskId = this.props.navigation.state.params.ridInOutCorr;
        const token = this.props.loggedInUser.token;
          this.submitMomTaskComplete(taskId, "Complete" ,'Complete', token);
        } else if (buttonText == 'Close') {
           const token = this.props.loggedInUser.token;
           this.submitCorrespondenceDetailApproveReject(workFTID, "N" ,'Close',token)
        }
      }
      handleRejectTap = () => {
        this.setState((state) => {
          return {
            isRejectModalVisible: true,
          };
        });
      }
      handleForwardTap = () => {
        this.setState((state) => {
          return {
            isForwardModelVisible: true,
          };
        });
      }
      handleRFIForwardTap = () => {
        this.setState((state) => {
          return {
            isRFIForwardModelVisible: true,
          };
        });
      }
      handleCorrespondencePropertiesTap = () => {
        this.setState((state) => {
          return {
            isCorrespondencePropertiesVisible: true,
          };
        });
      }

      handleCommentsTap = () => {
        this.setState((state) => {
          return {
            isCorrespondenceCommentsVisible: true,
          };
        });
      }

      handleRFICommentsTap = () => {
        this.setState((state) => {
          return {
            isRFICommentModelVisible: true,
          };
        });
      }

      handleRFIPropertiesTap = () => {
        this.setState((state) => {
          return {
            isRFIPropertiesModelVisible: true,
          };
        });
      }

      handleMomPropertiesTap = () => {
        this.setState((state) => {
          return {
            isMomPropertiesModelVisible: true,
          };
        });
      }

      handleMomCommentTap = () => {
        this.setState((state) => {
          return {
            isMomCommentModelVisible: true,
          };
        });
      }

      alertWithMessage = (message) =>
      Alert.alert(
          "ETIHADRAIL",
          message,
          [
              { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
      );

      submitCorrespondenceDetailApproveReject =  (wftId, approve, comment, token) => {
        console.log('Correspondence details Action method  Approve');
        // return async (dispatch) => {
          // useEffect(() => {
            try {
                const params = {
                    workFlowTransactionID:wftId,
                    approve:approve,
                    comments:comment
                }

                console.log('Parameter in Correspondence Details Approve');
                console.log(params);
                
                axios.post(`${constants.webService.baseURL}${constants.webService.methods.common.correspondenceApproveReject}`, params, axios.defaults.headers.Authorization = `Bearer ${token}`)
                .then(res => {
                  console.log('Correspondence Details Close and Complete response inside');
                    console.log(res);
                    console.log(res.data)
                    if (res.data.statusCode == "200") {
                      this.props.setDeleteCorrepondenceRecord(this.props.navigation.state.params.ridInOutCorr);
                      this.props.navigation.pop();
                    }  else {
                      setIsback(false);
                    }   
                })
                .catch(error => console.log(error));   
            } catch (error) {
                //dispatch(isAppLoading(false));
            }
          // });
      //  }
    }

    submitMomTaskComplete =  (taskId, actonType, comment,token) => {
          try {
              const params = {
                taskID: taskId,
                actionType: actonType,
                comment: comment
              }

              console.log('Parameter in mom tash complete');
              console.log(params);
              
              axios.post(`${constants.webService.baseURL}${constants.webService.methods.common.momTaskComplete}`, params, axios.defaults.headers.Authorization = `Bearer ${token}`)
              .then(res => {
                console.log('Correspondence Details  Complete response inside');
                  console.log(res);
                  console.log(res.data)
                  if (res.data.statusCode == "200") {
                    this.props.setDeleteCorrepondenceRecord(this.props.navigation.state.params.ridInOutCorr);
                    this.props.navigation.pop();
                  }  else {
                    setIsback(false);
                  }   
              })
              .catch(error => console.log(error));
              
              
          } catch (error) {
              //dispatch(isAppLoading(false));
          }
        // });
    //  }
  }


    render() {
        const { isDelegateModalVisible, isApproveModalVisible, isRejectModalVisible, isCorrespondencePropertiesVisible, isCorrespondenceCommentsVisible, isForwardModelVisible , isInitiateModalVisible, isRFICommentModelVisible, isRFIPropertiesModelVisible, isMomPropertiesModelVisible, isMomCommentModelVisible, isRFIDelegateModelVisible, isRFIForwardModelVisible, isSignatureModelVisible, isMomApproveModelVisible} = this.state;

        return (
              <Container style={{backgroundColor:'#f3f2f2'}}>

            {
            isApproveModalVisible && <ApproveModelPopup userId = {this.props.userProfile.ridUsermaster} workFTID = {this.props.correspondenceDetailData.ridWorkflowTransaction} token ={ this.props.loggedInUser.token} onModalClose={() => { this.setState({ isApproveModalVisible: false }) }} getApproveValues={(isBack) => {
              
              if (isBack == true) {
                setTimeout(() => { 
                  this.props.navigation.pop();
                  this.props.setDeleteCorrepondenceRecord(this.props.navigation.state.params.ridInOutCorr);

                    }, 100);
                  }
               }} />
            }
            {
            isMomApproveModelVisible && <MomApproveModelPopup userId = {this.props.userProfile.ridUsermaster} workFTID = {this.props.correspondenceDetailData.ridWorkflowTransaction} token ={ this.props.loggedInUser.token} onModalClose={() => { this.setState({ isMomApproveModelVisible: false }) }} getApproveValuesrefersh={(isRefersh) => {
              
              if (isRefersh == true) {
                  const corrId = this.props.navigation.state.params.ridInOutCorr;
                  const userId = this.props.userProfile.ridUsermaster;
                  this.props.getMomDetails(userId, corrId);
                  }
               }} />
            }
            {
            isSignatureModelVisible && <SignatureModelPopup signingURL = {this.state.singingUrl}  userId = {this.props.userProfile.ridUsermaster} corrId = {this.props.navigation.state.params.ridInOutCorr} ridCorrDetail = {this.props.correspondenceDetailData.ridCorrDetail} token ={ this.props.loggedInUser.token}  worlFlowName = {this.props.navigation.state.params.workflowName} onModalClose={() => { this.setState({ isSignatureModelVisible: false }) }} getApproveValues={(isSignature) => {
               console.log('Go Approve SignatureModelPopup popup')
               console.log(isSignature)
              if (isSignature == true) {
                this.setState((state) => {
                  return {
                    isApproveModalVisible: true,
                  };
                });
              }
               }} />
            }
                  {
                isRejectModalVisible && <RejectModelPopup  userId = {this.props.userProfile.ridUsermaster} workFTID = {this.props.correspondenceDetailData.ridWorkflowTransaction} token ={ this.props.loggedInUser.token} onModalClose={() => { this.setState({ isRejectModalVisible: false }) }} getApproveValues={(isBack) => {
                 
                  if (isBack == true) {
                    setTimeout(() => { 
                      this.props.navigation.pop();
                      this.props.setDeleteCorrepondenceRecord(this.props.navigation.state.params.ridInOutCorr);
                      }, 100);
                     }
                  }}  /> 
                  }
                 {/* {
                  isInitiateModalVisible && <InitiateModalPopup  userId = {this.props.userProfile.ridUsermaster} workFTID = {this.props.correspondenceDetailData.ridWorkflowTransaction} token ={ this.props.loggedInUser.token} onModalClose={() => { this.setState({ isInitiateModalVisible: false }) }} getApproveValues={(isBack) => {
                  
                   if (isBack == true) {
                    setTimeout(() => { 
                      this.props.navigation.pop();
                      this.props.setDeleteCorrepondenceRecord(this.props.navigation.state.params.ridInOutCorr);
                      }, 100);
                       }
                    }} /> 
                 } */}
                {
                isDelegateModalVisible && <DelegateModelPopup  userMasterData = {this.props.correspondenceDetailDelegateUserMater}  userId = {this.props.userProfile.ridUsermaster} workFTID = {this.props.correspondenceDetailData.ridWorkflowTransaction} token ={ this.props.loggedInUser.token} onModalClose={() => { this.setState({ isDelegateModalVisible: false }) }} getApproveValues={(isBack) => {
                
                 if (isBack == true) {
                  setTimeout(() => { 
                    this.props.navigation.pop();
                    this.props.setDeleteCorrepondenceRecord(this.props.navigation.state.params.ridInOutCorr);
                    }, 100);
                     }
                  }} /> 
                }
                { 
                 isCorrespondenceCommentsVisible && <CommentModelPopup  correspondenceComments = {this.props.correspondenceDetailComment} onModalClose={() => { this.setState({ isCorrespondenceCommentsVisible: false }) }} /> 
                }
                {
                 isCorrespondencePropertiesVisible && <PropertiesModelPopup  correspondenceProperties = {this.props.correspondenceDetailCorrespondenceProperties} distributeProperties={this.props.correspondenceDetailDistributeProperties} worlflowSteps = {this.props.correspondenceDetailWrokflowSteps} category = {this.props.categoryList} onModalClose={() => { this.setState({ isCorrespondencePropertiesVisible: false }) }} /> 
                }
                { this.props.correspondenceDetailForwardUserMater &&
                isForwardModelVisible && <ForwardModelPopup  userMasterData = {this.props.correspondenceDetailForwardUserMater}  userId = {this.props.userProfile.ridUsermaster} workFTID = {this.props.correspondenceDetailData.ridWorkflowTransaction} token ={ this.props.loggedInUser.token} onModalClose={() => { this.setState({ isForwardModelVisible: false }) }}  getForwardDetailsRefreshValues={(isRefresh) => {
                 if (isRefresh == true) {
                  const corrId = this.props.navigation.state.params.ridInOutCorr;
                  const entityId = this.props.userProfile.ridEntityList;
                  this.props.getCorrespondenceDetailsForwardUserMasters(entityId, corrId);
                     }
                  }} />   
                }
                
                {
                 isRFICommentModelVisible && <RfiCommentModelPopup  rfisComments = {this.props.correspondenceDetailComment}  ridRfiDetails={this.props.correspondenceDetailData.ridCorrDetail} token ={ this.props.loggedInUser.token} onModalClose={() => { this.setState({ isRFICommentModelVisible: false }) }} getRFIDetailsRefreshValues={(isRefresh) => {
                 if (isRefresh == true) {
                  const corrId = this.props.navigation.state.params.ridInOutCorr;
                  const userId = this.props.userProfile.ridUsermaster;
                  const entityId = this.props.userProfile.ridEntityList;
                  const workFlowTransactionId = this.props.navigation.state.params.ridWorkflowtransaction;
                  this.props.getRFIDetails(userId, corrId, entityId, workFlowTransactionId);
                     }
                  }}  /> 
                }
                 {
                 isRFIPropertiesModelVisible && <RfiPropertiesModelPopup  rfiProperties = {this.props.correspondenceDetailCorrespondenceProperties}  onModalClose={() => { this.setState({ isRFIPropertiesModelVisible: false }) }} /> 
                }
                 {
                isRFIDelegateModelVisible && <RFIDelegateModelPopup  userMasterData = {this.props.correspondenceDetailDelegateUserMater}  userId = {this.props.userProfile.ridUsermaster} workFTID = {this.props.correspondenceDetailData.ridWorkflowTransaction} token ={ this.props.loggedInUser.token} onModalClose={() => { this.setState({ isRFIDelegateModelVisible: false }) }} getApproveValues={(isBack) => {
                 if (isBack == true) {
                  setTimeout(() => { 
                    this.props.navigation.pop();
                    this.props.setDeleteCorrepondenceRecord(this.props.navigation.state.params.ridInOutCorr);
                    }, 100);
                     }
                  }} /> 
                }
               
                { this.props.rfiDetailForwardUserMater &&
                isRFIForwardModelVisible && <RFIForwardModelPopup  userMasterData = {this.props.rfiDetailForwardUserMater}  userId = {this.props.userProfile.ridUsermaster} workFTID = {this.props.correspondenceDetailData.ridWorkflowTransaction} token ={ this.props.loggedInUser.token} onModalClose={() => { this.setState({ isRFIForwardModelVisible: false }) }}  getForwardDetailsRefreshValues={(isRefresh) => {
                 
                 if (isRefresh == true) {
                  this.props.getRFIDetailsForwardUserMasters();
                     }
                  }} />   
                }
                {
                 isMomPropertiesModelVisible && <MomPropertiesModelPopup  momProperties = {this.props.correspondenceDetailCorrespondenceProperties} attendees={this.props.momDetailsPropertiesAttendees} taskComment = {this.props.momDetailsPropertiesTaskComment}  onModalClose={() => { this.setState({ isMomPropertiesModelVisible: false }) }} /> 
                }
                 {
                 isMomCommentModelVisible && <MomCommentModelPopup  momComment = {this.props.correspondenceDetailComment}  attendees={this.props.momDetailsPropertiesAttendees} token ={ this.props.loggedInUser.token} onModalClose={() => { this.setState({ isMomCommentModelVisible: false }) }} getMomDetailsRefreshValues={(isRefresh) => {
                 if (isRefresh == true) {
                  const corrId = this.props.navigation.state.params.ridInOutCorr;
                  const userId = this.props.userProfile.ridUsermaster;
                  this.props.getMomDetails(userId, corrId);
                     }
                  }}  /> 
                }
                 <Content>
                 {this._renderHeader()}
                 {this._renderToandSubject()}
                 {this._renderText()} 
                 {this._renderAttachment()}
                 {this._renderCreateTaskList()}
                 {this._renderActionApprovalList()}
                 </Content>
              </Container>
        );
    }
}

export default CoreespondenceDetails;
