import React, { Component } from 'react';
import {
  Icon,
  Text,
  View,
  Segment,
  Container,
  Button,
  Content,
  Picker,
} from 'native-base';
import { ScrollView, Dimensions, ImageBackground, Animated, AsyncStorage } from 'react-native';
import { WHITE, TEMP_THEME_PRIMARY, TEMP_THEME_SECONDARY } from '../../utils/styles/colors';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD, FONT_FAMILY_PT_REGULAR, FONT_SIZE_14} from '../../utils/styles/typography';
import DashboardCard from '../../componets/dashboardCard/DashboardCard';
import BarCharts from '../../componets/graphs/barCharts/BarCharts';
import StackBarCharts from '../../componets/graphs/stackBarCharts/StackBarCharts';
import PieCharts from '../../componets/graphs/pieCharts/PieCharts';

import totalRecived from '../../assets/image/totalRecived/totalrecived.png';
import totalOpen from '../../assets/image/totalOpen/totalopen.png';
import incoming from '../../assets/image/incoming/incoming.png';
import outgoing from '../../assets/image/outgoing/outgoning.png';
import calculator from '../../assets/image/calculator/calculator.png';
import HeaderTilte from '../../assets/image/headerTitle/HeaderTilte.jpg';
import styles from './Dashboard.style';
import i18n, { t } from '../../utils/localization/servicesi18n/index';
import * as config from '../../utils/localization/config/i18n';

const screenWidth = Dimensions.get("window").width;

class Dashboard extends Component {

  scrollX = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
         isCorrespondenceInbox: true,
         isCorrespondenceOutBox: false,
         isRefreshing: false,
         type:'',
         forEntity:'',
         fromEntity:'',
         dashboardDocumentType: 1,
         //dashboardDocumentTypeid: 1,
         dashboardEntitiesInboxSender: 0,
         dashboardEntitiesInBoxSenderName: '',
         dashboardEntitiesOutBoxSender: 0,
         dashboardEntitiesOutBoxSenderName: '',
         dashboardEntitiesInBoxRecipent: this.props.loggedInUser.ridEntityList,
         dashboardEntitiesInBoxRecipentName: '',
         dashboardEntitiesOutBoxRecipent: 0,
         dashboardEntitiesOutRecipentName:'',
         dashboardContract:1,
         corrcategory: 2, 
         onSelectSenderRecipientModel:'', 
         token: '',
         userid: ''
         
    };
  }

 componentDidMount = () => {

  this.onSegmentCorrespondenceInboxClick();
   if (this.state.isCorrespondenceInbox == true) {
      AsyncStorage.getItem('userId').then((value1) => {
            console.log('Dashboard get userId ',value1);
              this.setState({
                userid: value1,
                dashboardEntitiesInBoxRecipent: value1,
      });
    });
      console.log('Dashboard get userId ',this.state.userid);
      this.props.getDocumenttypes(this.state.userId, this.state.corrcategory);
      this.props.getExternalSenderAndRecipent();
    //   this.setState({
    //     dashboardEntitiesInBoxRecipent: this.state.userid,
    // });
   }
}

 getUserId = async () => {
  let userId = '';
  try {
    userId = await AsyncStorage.getItem('userId') || 'none';
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return userId;
}

  onSegmentCorrespondenceInboxClick = () => {
  console.log(`onSegmentCabClick - onSegmentCorrespondenceInboxClick`);
  const ridEntityList = this.props.userProfile.ridEntityList;

  this.setState({
    isCorrespondenceInbox: true,
    isCorrespondenceOutBox: false,
    corrcategory:2,
    dashboardDocumentType: this.state.dashboardDocumentType,
    dashboardContract: '',
    dashboardEntitiesInBoxRecipent: ridEntityList,
    dashboardEntitiesOutBoxSender: '',
  }, () => this.props.getDocumenttypes(ridEntityList, 2), this.props.getDashboardSummaryDetailsData(this.props.userProfile.ridEntityList, 0, 2, this.state.dashboardDocumentType, 0));
  
}

onSegmentCorrespondenceOutboxClick = (isActive) => {
  console.log(`onSegmentCabClick - onSegmentCorrespondenceOutboxClick`);
  const ridEntityList = this.props.userProfile.ridEntityList;
  this.setState({
    isCorrespondenceInbox: false,
    isCorrespondenceOutBox: true,
    category:1,
    dashboardContract: '',
    dashboardDocumentType: this.state.dashboardDocumentType,
    dashboardEntitiesOutBoxSender: ridEntityList,
    dashboardEntitiesInBoxRecipent: ''
  }, () => this.props.getDocumenttypes(ridEntityList, 1), this.props.getDashboardSummaryDetailsData(0, this.props.userProfile.ridEntityList, 1, this.state.dashboardDocumentType, 0));
  
}

onInCommingDocumentTypeChange = (value) => {
  // if (value != -1) {
        this.setState({  
          dashboardDocumentType: value,

        }, () => this.state.dashboardDocumentType == 1 ? this.props.getExternalSenderAndRecipent() : this.props.getInternalSenderAndRecipent());
  //}
}

onOutgoingDocumentTypeChange = (value) => {

  console.log('Outgoing document type', value);
  // if (value != -1) {
        this.setState({  
          dashboardDocumentType: value,

        }, () => this.state.dashboardDocumentType == 1 ? this.props.getExternalSenderAndRecipent() : this.props.getInternalSenderAndRecipent());
  //}
}

onEntitiesInboxSenderChange = (value) => {
  console.log('Entities value', value);
      this.setState({
          dashboardEntitiesInboxSender: value,
          dashboardContract:''
      }, () => this.props.getContracts(this.state.dashboardEntitiesInboxSender, this.props.userProfile.ridEntityList));
}
onEntitiesOutboxRecipentChange = (value) => {
      this.setState({
            dashboardEntitiesRecipent: value,
            dashboardContract:''
      }, () => this.props.getContracts(this.props.userProfile.ridEntityList, this.state.dashboardEntitiesRecipent));
}
  onContractInboxChange = (value) => {
    if (value != -1) {
        this.setState({
          dashboardContract: value,
        }, () => this.props.getDashboardSummaryDetailsData(this.props.userProfile.ridEntityList, this.state.dashboardEntitiesInboxSender, 2, this.state.dashboardDocumentType, this.state.dashboardContract));
    }
}
onContractOutBoxChange = (value) => {
  if (value != -1) {
    this.setState({
      dashboardContract: value,
    }, () => this.props.getDashboardSummaryDetailsData(this.state.dashboardEntitiesRecipent, this.props.userProfile.ridEntityList, 1, this.state.dashboardDocumentType, this.state.dashboardContract));
  }
}

_renderSegment = () => {
  if(config.fallback == 'en'){
    return (
      <Segment style={styles.segment}>
          <Button first active={this.state.isCorrespondenceInbox}
              style={this.state.isCorrespondenceInbox ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
              onPress={() => this.onSegmentCorrespondenceInboxClick()}>
              <Text uppercase={false} style={this.state.isCorrespondenceInbox ? styles.activeSegmentText : styles.inactiveSegmentText}>
                  {t('DashboardScreeen:Incoming')}
              </Text>
          </Button>
          <Button last active={this.state.isCorrespondenceOutBox}
                  style={this.state.isCorrespondenceOutBox ? styles.activeSegmentButton : styles.inactiveSegmentTaskButton}
                  onPress={() => this.onSegmentCorrespondenceOutboxClick()} >
                  <Text uppercase={false} style={this.state.isCorrespondenceOutBox ? styles.activeSegmentText : styles.inactiveSegmentText}>
                      {t('DashboardScreeen:Outgoing')}
                  </Text>
              </Button>
         
      </Segment>
  );
  }else {
    return (
      <Segment style={styles.segment}>

           <Button last active={this.state.isCorrespondenceOutBox}
                  style={this.state.isCorrespondenceOutBox ? styles.activeSegmentButton : styles.inactiveSegmentTaskButton}
                  onPress={() => this.onSegmentCorrespondenceOutboxClick()} >
                  <Text uppercase={false} style={this.state.isCorrespondenceOutBox ? styles.activeSegmentText : styles.inactiveSegmentText}>
                      {t('DashboardScreeen:Outgoing')}
                  </Text>
              </Button>
          <Button first active={this.state.isCorrespondenceInbox}
              style={this.state.isCorrespondenceInbox ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
              onPress={() => this.onSegmentCorrespondenceInboxClick()}>
              <Text uppercase={false} style={this.state.isCorrespondenceInbox ? styles.activeSegmentText : styles.inactiveSegmentText}>
                  {t('DashboardScreeen:Incoming')}
              </Text>
          </Button>  
      </Segment>
  );
  }
  
}


_renderInboxSelectValuesDropDwon = () => {

  if (config.fallback == 'en'){
    return (
      <View style = {{ marginLeft:0,backgroundColor:'#f2f2f2', paddingTop: 0 }}>
    
         <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{ marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR ,fontSize:FONT_SIZE_14}}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:DocumentType')}
                                                note={false}
                                                selectedValue={this.state.dashboardDocumentType}
                                                onValueChange={this.onInCommingDocumentTypeChange}
                                                underlineColorAndroid = 'transparent'
                                                // style={{fontFamily:FONT_FAMILY_PT_REGULAR}}
                                             >
                                            {/* <Picker.Item color={'gray'} label={t('DashboardScreeen:DocumentType')} value={-1} key={-1} /> */}
                                            {this.props.dashboardDocumentType && this.props.dashboardDocumentType.map((documentType, index) => {
                                                 return (
                                            <Picker.Item label= {`${documentType.documenttypename}`} value={documentType.ridDocumenttype} key={index} />
                                            );
                                         })}
                                            </Picker>
                                            </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              
              <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR, fontSize: FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:Recipient')}
                                                note={false}
                                                enabled ={false}
                                                selectedValue={this.state.dashboardEntitiesInBoxRecipent}
                                                onValueChange={this.onEntitiesRecipentChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                         
                                          <Picker.Item color={'gray'} label= {t('DashboardScreeen:Recipient')} value={-1} key={-1} />
                                          {this.props.dashboardSenderAndRecipent && this.props.dashboardSenderAndRecipent.map((value, index) => {
                                             if (this.props.userProfile){
                                             if(value.ridEntityList === this.props.userProfile.ridEntityList ? value.ridEntityList === this.props.userProfile.ridEntityList : value.ridEntityList === this.props.userProfile.rootEntityId ) {
                                              
                                            return (
                                           <Picker.label label={`${value.entityCode} - ${value.entityName}`} value ={this.state.dashboardEntitiesInBoxRecipent}/> 
                                            );
                                          } else {
                                            
                                            // return (
                                            //   <Picker.label  />
                                            // )
                                          }
                                        }
         return (
    <Picker.Item label= {`${value.entityCode} - ${value.entityName}`} value={value.ridEntityList} key={index} />
    );
     })}
                                            </Picker>
                                            </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:Sender')}
                                                note={false}
                                                selectedValue={this.state.dashboardEntitiesInboxSender}
                                                onValueChange={this.onEntitiesInboxSenderChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                               <Picker.Item color={'gray'} label= {t('DashboardScreeen:Sender')} value={-1} key={-1} />
                                           {this.props.dashboardSenderAndRecipent && this.props.dashboardSenderAndRecipent.map((senderRecipent, index) => {
         return (
    <Picker.Item label= {`${senderRecipent.entityCode} - ${senderRecipent.entityName}`} value={senderRecipent.ridEntityList} key={index} />
    );
    })}
                                            </Picker>
                                            </View>
             
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{ marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf', fontFamily:FONT_FAMILY_PT_REGULAR, fontSize: FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:Contract')}
                                                note={false}
                                                selectedValue={this.state.dashboardContract}
                                                onValueChange={this.onContractInboxChange}
                                                underlineColorAndroid = 'transparent'
                                                numberOfLines ={1}
                                             >
                                   <Picker.Item color={'gray'} label= {t('DashboardScreeen:Contract')} value={-1} key={-1} />
    {this.props.dashboardContract && this.props.dashboardContract.map((contract, index) => {
         return (
    <Picker.Item label= {`${contract.contractcode}-${contract.contractname}`} value={contract.ridContract} key={index} />
    );
    })}
                </Picker>
          </View>
      </View>
      );
  } else {
    return (
      <View style = {{ marginLeft:0,backgroundColor:'#f2f2f2', paddingTop: 0 }}>
    
         <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{ marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR ,fontSize:FONT_SIZE_14}}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:DocumentType')}
                                                note={false}
                                                selectedValue={this.state.dashboardDocumentType}
                                                onValueChange={this.onInCommingDocumentTypeChange}
                                                underlineColorAndroid = 'transparent'
                                                // style={{fontFamily:FONT_FAMILY_PT_REGULAR}}
                                             >
                                            {/* <Picker.Item color={'gray'} label={t('DashboardScreeen:DocumentType')} value={-1} key={-1} /> */}
                                            {this.props.dashboardDocumentType && this.props.dashboardDocumentType.map((documentType, index) => {
                                                 return (
                                            <Picker.Item label= {`${documentType.documenttypename}`} value={documentType.ridDocumenttype} key={index} />
                                            );
                                         })}
                                            </Picker>
                                            </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              
              <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR, fontSize: FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:Recipient')}
                                                note={false}
                                                enabled ={false}
                                                selectedValue={this.state.dashboardEntitiesInBoxRecipent}
                                                onValueChange={this.onEntitiesRecipentChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                         
                                          <Picker.Item color={'gray'} label= {t('DashboardScreeen:Recipient')} value={-1} key={-1} />
                                          {this.props.dashboardSenderAndRecipent && this.props.dashboardSenderAndRecipent.map((value, index) => {
                                             if (this.props.userProfile){
                                             if(value.ridEntityList === this.props.userProfile.ridEntityList ? value.ridEntityList === this.props.userProfile.ridEntityList : value.ridEntityList === this.props.userProfile.rootEntityId ) {
                                              
                                            return (
                                           <Picker.label label={`${value.entityCode} - ${value.entityName}`} value ={this.state.dashboardEntitiesInBoxRecipent}/> 
                                            );
                                          } else {
                                            
                                            return (
                                              <Picker.label  />
                                            )
                                          }
                                        }
         return (
    <Picker.Item label= {`${value.entityCode} - ${value.entityName}`} value={value.ridEntityList} key={index} />
    );
     })}
                                            </Picker>
                                            </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:Sender')}
                                                note={false}
                                                selectedValue={this.state.dashboardEntitiesInboxSender}
                                                onValueChange={this.onEntitiesInboxSenderChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                               <Picker.Item color={'gray'} label= {t('DashboardScreeen:Sender')} value={-1} key={-1} />
                                           {this.props.dashboardSenderAndRecipent && this.props.dashboardSenderAndRecipent.map((senderRecipent, index) => {
         return (
    <Picker.Item label= {`${senderRecipent.entityCode} - ${senderRecipent.entityName}`} value={senderRecipent.ridEntityList} key={index} />
    );
    })}
                                            </Picker>
                                            </View>
             
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{ marginTop:-5,textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf', fontFamily:FONT_FAMILY_PT_REGULAR, fontSize: FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:Contract')}
                                                note={false}
                                                selectedValue={this.state.dashboardContract}
                                                onValueChange={this.onContractInboxChange}
                                                underlineColorAndroid = 'transparent'
                                                numberOfLines ={1}
                                             >
                                   <Picker.Item color={'gray'} label= {t('DashboardScreeen:Contract')} value={-1} key={-1} />
    {this.props.dashboardContract && this.props.dashboardContract.map((contract, index) => {
         return (
    <Picker.Item label= {`${contract.contractcode}-${contract.contractname}`} value={contract.ridContract} key={index} />
    );
    })}
                </Picker>
          </View>
      </View>
      );
  }
  
}

_renderOutboxSelectValuesDropDwon = () => {
  if (config.fallback == 'en'){
    return(
      <View style = {{ backgroundColor:'#f2f2f2', paddingTop: 0 }}>
       
               <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{ marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR ,fontSize:FONT_SIZE_14}}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:DocumentType')}
                                                note={false}
                                                selectedValue={this.state.dashboardDocumentType}
                                                onValueChange={this.onOutgoingDocumentTypeChange}
                                                underlineColorAndroid = 'transparent'
                                                // style={{fontFamily:FONT_FAMILY_PT_REGULAR}}
                                             >
                                         <Picker.Item color={'gray'} label= {t('DashboardScreeen:DocumentType')} value={-1} key={-1} />
                                            {this.props.dashboardDocumentType && this.props.dashboardDocumentType.map((documentType, index) => {
                                                 return (
                                            <Picker.Item label= {`${documentType.documenttypename}`} value={documentType.ridDocumenttype} key={index} />
                                            );
                                         })}
                                            </Picker>
                                            </View>
    
               <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:Sender')}
                                                note={false}
                                                enabled= {false}
                                                selectedValue={this.state.dashboardEntitiesOutBoxSender}
                                               // onValueChange={this.onEntitiesSenderChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                          <Picker.Item color={'gray'} label= {t('DashboardScreeen:Sender')} value={-1} key={-1} />
    
                                          {this.props.dashboardSenderAndRecipent && this.props.dashboardSenderAndRecipent.map((value, index) => {
                                           
                                           if (this.props.userProfile) {
                                           if(value.ridEntityList === this.props.userProfile.ridEntityList ? value.ridEntityList === this.props.userProfile.ridEntityList : value.ridEntityList === this.props.userProfile.rootEntityId ) {
                                            //  this.onEntitiesInBoxRecipentChange(value.ridEntityList);
                                            console.log('Sender value selected', value);
                                             return (
                                            <Picker.label label={`${value.entityCode} - ${value.entityName}`} value ={this.state.dashboardEntitiesOutBoxSender}/> 
                                             );
                                            } else {
                                              // return (
                                              //   <Picker.label  />
                                              // )
                                           }
                                          }
          return (
     <Picker.Item label= {`${value.entityCode} - ${value.entityName}`} value={value.ridEntityList} key={index} />
     );
      })}
                                            </Picker>
                                            </View>
             
               <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR, fontSize: FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:Recipient')}
                                                note={false}
                                                selectedValue={this.state.dashboardEntitiesRecipent}
                                                onValueChange={this.onEntitiesOutboxRecipentChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                               <Picker.Item color={'gray'} label= {t('DashboardScreeen:Recipient')} value={-1} key={-1} />
                                           {this.props.dashboardSenderAndRecipent && this.props.dashboardSenderAndRecipent.map((senderRecipent, index) => {
         return (
    <Picker.Item label= {`${senderRecipent.entityCode} - ${senderRecipent.entityName}`} value={senderRecipent.ridEntityList} key={index} />
    );
    })}
                                            </Picker>
                                            </View>
               <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf', fontFamily:FONT_FAMILY_PT_REGULAR, fontSize: FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                 placeholder= {t('DashboardScreeen:Contract')}
                                                 note={false}
                                                selectedValue={this.state.dashboardContract}
                                                onValueChange={this.onContractOutBoxChange}
                                                underlineColorAndroid = 'transparent'
                                                numberOfLines ={1}
                                             >
                                         <Picker.Item color={'gray'} label= {t('DashboardScreeen:Contract')} value={-1} key={-1} />
    
    {this.props.dashboardContract && this.props.dashboardContract.map((contract, index) => {
         return (
    <Picker.Item label= {`${contract.contractcode}-${contract.contractname}`} value={contract.ridContract} key={index} />
    );
    })}
                </Picker>
                </View>
      </View>
      );
  } else {
    return(
      <View style = {{ backgroundColor:'#f2f2f2', paddingTop: 0 }}>
       
               <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{ marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR ,fontSize:FONT_SIZE_14}}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:DocumentType')}
                                                note={false}
                                                selectedValue={this.state.dashboardDocumentType}
                                                onValueChange={this.onOutgoingDocumentTypeChange}
                                                underlineColorAndroid = 'transparent'
                                                // style={{fontFamily:FONT_FAMILY_PT_REGULAR}}
                                             >
                                         <Picker.Item color={'gray'} label= {t('DashboardScreeen:DocumentType')} value={-1} key={-1} />
                                            {this.props.dashboardDocumentType && this.props.dashboardDocumentType.map((documentType, index) => {
                                                 return (
                                            <Picker.Item label= {`${documentType.documenttypename}`} value={documentType.ridDocumenttype} key={index} />
                                            );
                                         })}
                                            </Picker>
                                            </View>
    
               <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:Sender')}
                                                note={false}
                                                enabled= {false}
                                                selectedValue={this.state.dashboardEntitiesOutBoxSender}
                                               // onValueChange={this.onEntitiesSenderChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                          <Picker.Item color={'gray'} label= {t('DashboardScreeen:Sender')} value={-1} key={-1} />
    
                                          {this.props.dashboardSenderAndRecipent && this.props.dashboardSenderAndRecipent.map((value, index) => {
                                           
                                           if (this.props.userProfile) {
                                           if(value.ridEntityList === this.props.userProfile.ridEntityList ? value.ridEntityList === this.props.userProfile.ridEntityList : value.ridEntityList === this.props.userProfile.rootEntityId ) {
                                            //  this.onEntitiesInBoxRecipentChange(value.ridEntityList);
                                            console.log('Sender value selected', value);
                                             return (
                                            <Picker.label label={`${value.entityCode} - ${value.entityName}`} value ={this.state.dashboardEntitiesOutBoxSender}/> 
                                             );
                                            } else {
                                              // return (
                                              //   <Picker.label  />
                                              // )
                                           }
                                          }
          return (
     <Picker.Item label= {`${value.entityCode} - ${value.entityName}`} value={value.ridEntityList} key={index} />
     );
      })}
                                            </Picker>
                                            </View>
             
               <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR, fontSize: FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('DashboardScreeen:Recipient')}
                                                note={false}
                                                selectedValue={this.state.dashboardEntitiesRecipent}
                                                onValueChange={this.onEntitiesOutboxRecipentChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                               <Picker.Item color={'gray'} label= {t('DashboardScreeen:Recipient')} value={-1} key={-1} />
                                           {this.props.dashboardSenderAndRecipent && this.props.dashboardSenderAndRecipent.map((senderRecipent, index) => {
         return (
    <Picker.Item label= {`${senderRecipent.entityCode} - ${senderRecipent.entityName}`} value={senderRecipent.ridEntityList} key={index} />
    );
    })}
                                            </Picker>
                                            </View>
               <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
            borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
              <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf', fontFamily:FONT_FAMILY_PT_REGULAR, fontSize: FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                 placeholder= {t('DashboardScreeen:Contract')}
                                                 note={false}
                                                selectedValue={this.state.dashboardContract}
                                                onValueChange={this.onContractOutBoxChange}
                                                underlineColorAndroid = 'transparent'
                                                numberOfLines ={1}
                                             >
                                         <Picker.Item color={'gray'} label= {t('DashboardScreeen:Contract')} value={-1} key={-1} />
    
    {this.props.dashboardContract && this.props.dashboardContract.map((contract, index) => {
         return (
    <Picker.Item label= {`${contract.contractcode}-${contract.contractname}`} value={contract.ridContract} key={index} />
    );
    })}
                </Picker>
                </View>
      </View>
      );
  }
  
}
  _renderCard =()=> {

    if (this.state.isCorrespondenceInbox == true){
      return(
        <View style = {{ backgroundColor:'#f2f2f2', paddingTop: 0 }}>
           <View style={{height:125,marginTop:10}}>
             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                
                <DashboardCard  name= {t('DashboardScreeen:TotalReceived')}  count={this.props.dashboardSummary.total && this.props.dashboardSummary.total} image={totalRecived} red = {false}/>
                <DashboardCard  name= {t('DashboardScreeen:TotalOpen')} count= {this.props.dashboardSummary.open && this.props.dashboardSummary.open} image={totalOpen} red = {false}/>
                <DashboardCard  name= {t('DashboardScreeen:ResponseOverdue')} count= {this.props.dashboardSummary.overDue && this.props.dashboardSummary.overDue} image={incoming} red = {true}/>
                <DashboardCard  name= {t('DashboardScreeen:TotalClosed')} count= {this.props.dashboardSummary.closed && this.props.dashboardSummary.closed} image={outgoing} red = {false} /> 
                <DashboardCard  name= {t('DashboardScreeen:TotalInfo')} count= {this.props.dashboardSummary.infoOnly && this.props.dashboardSummary.infoOnly} image={calculator} red = {false} />   
             </ScrollView>
           </View>
         </View>
      );
    } else {
      return(
        <View style = {{ backgroundColor:'#f2f2f2', paddingTop: 0 }}>
           <View style={{height:125,marginTop:10}}>
             <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                
                <DashboardCard  name= {t('DashboardScreeen:TotalSent')} count= {this.props.dashboardSummary.total && this.props.dashboardSummary.total} image={totalRecived} red = {false}/>
                <DashboardCard  name= {t('DashboardScreeen:TotalOpen')} count= {this.props.dashboardSummary.open && this.props.dashboardSummary.open} image={totalOpen} red = {false}/>
                <DashboardCard  name= {t('DashboardScreeen:ResponseOverdue')} count= {this.props.dashboardSummary.overDue && this.props.dashboardSummary.overDue} image={incoming} red = {true}/>
                <DashboardCard  name= {t('DashboardScreeen:TotalClosed')} count= {this.props.dashboardSummary.closed && this.props.dashboardSummary.closed} image={outgoing} red = {false} /> 
                <DashboardCard  name= {t('DashboardScreeen:TotalInfo')} count= {this.props.dashboardSummary.infoOnly && this.props.dashboardSummary.infoOnly} image={calculator}  red = {false}/>   
  
             </ScrollView>
           </View>
         </View>
      );
    }
    
  }
  
  _renderGraph =() => {

   //console.log('Render Graph under graph');
    if (this.state.isCorrespondenceInbox == true){
      // console.log('Incoming under graph');
      // console.log(this.props.dashboardMonthlyOverdueTrend);
      return (
        <View style={{backgroundColor:'#f2f2f2', paddingTop: 20}}>
          <View style={{marginTop:0}}>
            {/* <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} >  */}
                 <PieCharts name={t('DashboardScreeen:Summary')} pieChartData ={this.props.dashboardSummaryData} overdueCount = {this.props.dashboardSummary.overDue}/> 
                 <StackBarCharts name={t('DashboardScreeen:MonthlyTrend')} barchartsData = {this.props.dashboardMonthlyTrend}/> 
                 <BarCharts name={t('DashboardScreeen:OverdueMonthlyTrend')} barchartsData = {this.props.dashboardMonthlyOverdueTrend} docId = {this.props.dashboardDocumentType}/> 
            {/* </ScrollView> */}
          </View>
        </View>
      );
    } else {
      // console.log('outgoing under graph');
      // console.log(this.props.dashboardMonthlyOverdueTrend);
      return (
        <View style={{backgroundColor:'#f2f2f2', paddingTop: 20}}>
          <View style={{marginTop:0}}>
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >  */}
               <PieCharts name={t('DashboardScreeen:Summary')} pieChartData ={this.props.dashboardSummaryData} overdueCount = {this.props.dashboardSummary.overDue}/>
                <StackBarCharts name={t('DashboardScreeen:MonthlyTrend')} barchartsData = {this.props.dashboardMonthlyTrend}/> 
                <BarCharts name={t('DashboardScreeen:OverdueMonthlyTrend')} barchartsData = {this.props.dashboardMonthlyOverdueTrend} docId = {this.state.dashboardDocumentType}/> 
            {/* </ScrollView> */}
          </View>
  
        </View>
      );
    }
  }
  
  render() {

    if (this.state.isCorrespondenceInbox == true) {
      if (config.fallback == 'en'){
        return (
          <Container style={{backgroundColor:'#f2f2f2'}} >
            <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
            <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
             <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('DashboardScreeen:title')}</Text>
             </ImageBackground>
            </View>
            <Content showsVerticalScrollIndicator ={false}>
             {this._renderSegment()}
             {this._renderInboxSelectValuesDropDwon()}
             {this._renderCard()}
             {/* {this._renderCardIWithIndicator()} */}
             {this._renderGraph()}
            </Content>
            </Container>
       );
      }else{
      return (
        <Container style={{backgroundColor:'#f2f2f2'}} >
          <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
          <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
           <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('DashboardScreeen:title')}</Text>
           </ImageBackground>
          </View>
          <Content showsVerticalScrollIndicator ={false}>
           {this._renderSegment()}
           {this._renderInboxSelectValuesDropDwon()}
           {this._renderCard()}
           {/* {this._renderCardIWithIndicator()} */}
           {this._renderGraph()}
          </Content>
          </Container>
     );
      }
    } else {
      if (config.fallback == 'en'){
        return (
          <Container style={{backgroundColor:'#f2f2f2'}} >
            <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
            <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
             <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('DashboardScreeen:title')}</Text>
             </ImageBackground>
            </View>
            <Content showsVerticalScrollIndicator ={false}>
             {this._renderSegment()}
             {this._renderOutboxSelectValuesDropDwon()}
             {this._renderCard()}
             {/* {this._renderCardIWithIndicator()} */}
             {this._renderGraph()}
            </Content>
            </Container>
       );
      }else {
        return (
          <Container style={{backgroundColor:'#f2f2f2'}} >
            <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
            <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
             <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('DashboardScreeen:title')}</Text>
             </ImageBackground>
            </View>
            <Content showsVerticalScrollIndicator ={false}>
             {this._renderSegment()}
             {this._renderOutboxSelectValuesDropDwon()}
             {this._renderCard()}
             {/* {this._renderCardIWithIndicator()} */}
             {this._renderGraph()}
            </Content>
            </Container>
       );
      }  
    }  
  }
}

export default Dashboard;
