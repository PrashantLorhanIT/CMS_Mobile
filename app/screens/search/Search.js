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
    Input,
    Picker,
  } from 'native-base';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';
import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_FAMILY_PT_BOLD } from '../../utils/styles/typography';
import HeaderTilte from '../../assets/image/headerTitle/HeaderTilte.jpg';
import styles from './Search.style';
import { withNavigation } from 'react-navigation';
import SearchCard from '../../componets/searchCard/SearchCard';
import Calendar from '../../componets/calendar/Calendar';
import  CheckBox  from '../../componets/checkbox/CheckBox';
import moment from 'moment';
import i18n, { t } from '../../utils/localization/servicesi18n/index';
import * as config from '../../utils/localization/config/i18n';

const screenWidth = Dimensions.get("window").width;

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isQuickSearch:true,
            isAdvanceSearch:false,
            searchType: 'Correspondence',
            advancesearchType: 'Correspondence',
            referenceNumber: "",
            status:  "",
            subject:  "",
            superSearch: "",
            sender: 0,
            recipient: 0,
            fromDate:  "",
            fromDateFormat:  "",
            toDate:  "",
            toDateFormat: "",
            momRefernceNumber: "",
            momStatus: "",
            momSubject: "",
            momInitiator: "",
            momSuperSearch: "",
            momLocation:"",
            momDiscipline: "",
            momContract: "",
            rfiRefernceNumber: "",
            rfiStatus: "",
            rfiSubject: "",
            rfiInitiator: "",
            rfiQuery: "",
            rfiResponse: "",
            rfiSuperSearch: "",
            corrRefernceNumber: "",
            corrStatus: "",
            corrSource: 0,
            corrSubject: "",
            corrProjectContract: 0,
            corrSender: 0,
            corrRecipent: 0,
            corrReviewer: 0,
            corrApprover: 0,
            corrFromDate:  "",
            corrFromDateFormat:"",
            corrToDate : "",
            CorrToDateFormat: "",
            corrReplyFromDate: "",
            corrReplyFromDateFormat: "",
            corrReplyToDate: "",
            corrReplyToDateFormat: "",
            corrsuperSearch: "",
            corrisConfidential: false,
            corrisReplyRequired: false,
            isCalendarVisible: false,
            isAdvanceSearchFromToDateCalendaerVisible: false,
            isAdvanceSearchReplyFromToDateCalendaerVisible: false,
            reviewerData:[],
            approverData:[],
        };

        // this.goSearchListScreen = this.goSearchListScreen.bind(this);  
        // this.handleOnCorrespondenceReferenceNumberChange = this.handleOnCorrespondenceReferenceNumberChange.bind(this);  
        // this.handleOnSubjectChange = this.handleOnSubjectChange.bind(this);  
        // this.handleOnSuperSearchChange = this.handleOnSuperSearchChange.bind(this); 
        // this.handleOnMomRefernceNumberChange = this.handleOnMomRefernceNumberChange.bind(this);
        // this.handleOnMomSubjectChange = this.handleOnMomSubjectChange.bind(this);
        // this.handleOnMomInitiatorChange = this.handleOnMomInitiatorChange.bind(this);
        // this.handleOnMomSuperSeachChange = this.handleOnMomSuperSeachChange.bind(this);
        // this.handleOnRfiReferenceNumberChange = this.handleOnRfiReferenceNumberChange.bind(this);
        // this.handleOnRfiInitiatorChange = this.handleOnRfiInitiatorChange.bind(this);
        // this.handleOnRfiQueryChange = this.handleOnRfiQueryChange.bind(this);
        // this.handleOnRfiResponseChange = this.handleOnRfiResponseChange.bind(this);
        // this.handleOnRfiSubjectChange = this.handleOnRfiSubjectChange.bind(this);
        // this.handleOnRfiSuperSearchChange  = this.handleOnRfiSuperSearchChange.bind(this);
        // this.handleOnCorrRefernceNumberChange = this.handleOnCorrRefernceNumberChandlenge.bind(this);
        // this.handleOnCorrSubjectChange = this.handleOnCorrSubjectChange.bind(this);
        // this.handleOnCorrSuperSearchChange = this.handleOnCorrSuperSearchChange.bind(this);
    }

    componentDidMount = () => {
      console.log('Search componenet didmount ');
      const token =  this.props.loggedInUser.token
      this.props.getSearchDropDwonValues(token);
    }
    onSegmentQuickSearchClick = () => {
      console.log(`onSegmentCabClick - onSegmentCorrespondenceInboxClick`);
      this.onValueSearchTypeClear();
      this.onValueAdvanceSearchTypeClear();
      this.setState({
        isQuickSearch: true,
        isAdvanceSearch: false,  
      }) 
    }
    onSegmentAdvanceSearchClick = () => {
      console.log(`onSegmentCabClick - onSegmentCorrespondenceInboxClick`);
      this.onValueSearchTypeClear();
      this.onValueAdvanceSearchTypeClear();
      var reviewer = this.props.searchReviewerandApprover.filter(value => value.rolename === 'Reviewer');
      var appprover = this.props.searchReviewerandApprover.filter(value => value.rolename === 'Approver');

      this.setState({
        isQuickSearch: false,
        isAdvanceSearch: true, 
        reviewerData: reviewer,
        approverData: appprover,
      }) 
    }
    
    
    _renderSegment = () => {
      if (config.fallback == "en"){
      return (
          <Segment style={styles.segment}>
              <Button first active={this.state.isQuickSearch}
                  style={this.state.isQuickSearch ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                  onPress={() => this.onSegmentQuickSearchClick()}>
                  <Text uppercase={false} style={this.state.isQuickSearch ? styles.activeSegmentText : styles.inactiveSegmentText}>
                      {t('SearchScreen:QuickSearch')}
                  </Text>
              </Button>
              <Button last active={this.state.isAdvanceSearch}
                      style={this.state.isAdvanceSearch ? styles.activeSegmentButton : styles.inactiveSegmentTaskButton}
                      onPress={() => this.onSegmentAdvanceSearchClick()} >
                      <Text uppercase= {false} style={this.state.isAdvanceSearch ? styles.activeSegmentText : styles.inactiveSegmentText}>
                         {t('SearchScreen:AdvanceSearch')}
                      </Text>
                  </Button>
             
          </Segment>
      );
      } else {
        return (
          <Segment style={styles.segment}>
            <Button last active={this.state.isAdvanceSearch}
                      style={this.state.isAdvanceSearch ? styles.activeSegmentButton : styles.inactiveSegmentTaskButton}
                      onPress={() => this.onSegmentAdvanceSearchClick()} >
                      <Text uppercase= {false} style={this.state.isAdvanceSearch ? styles.activeSegmentText : styles.inactiveSegmentText}>
                         {t('SearchScreen:AdvanceSearch')}
                      </Text>
              </Button>
              <Button first active={this.state.isQuickSearch}
                  style={this.state.isQuickSearch ? styles.activeSegmentButton : styles.inactiveSegmentInboxButton}
                  onPress={() => this.onSegmentQuickSearchClick()}>
                  <Text uppercase={false} style={this.state.isQuickSearch ? styles.activeSegmentText : styles.inactiveSegmentText}>
                      {t('SearchScreen:QuickSearch')}
                  </Text>
              </Button>
          </Segment>
      );
      }
    }
    
      FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#DCDCDC",
              marginTop:15
            }}
          />
        );
      }

      onValueSearchTypeChange =(value) => {
        this.props.setSearchDetailEmpty();
        this.setState({
          searchType: value,
          rreferenceNumber:"",
          status: '',
          subject: "",
          superSearch:"",
          sender:"",
          recipient:"",
          fromDate:"",
          fromDateFormat: "",
          toDateFormat:"",
          toDate:"",
        });
      }
      onValueSearchTypeClear =() => {
        this.props.setSearchDetailEmpty();
        this.setState({
          referenceNumber:"",
          status: '',
          subject: "",
          superSearch:"",
          sender:"",
          recipient:"",
          fromDate:"",
          fromDateFormat: "",
          toDateFormat:"",
          toDate:"",
        });
      }
      onValueAdvanceSearchTypeChange =(value) => {
        this.props.setSearchDetailEmpty();
        this.setState({
          advancesearchType: value,
          momRefernceNumber: '',
          momStatus: '',
          momSubject: '',
          momInitiator: '',
          momSuperSearch: '',
          rfiRefernceNumber: '',
          rfiStatus: '',
          rfiSubject: '',
          rfiInitiator: '',
          rfiQuery: '',
          rfiResponse: '',
          rfiSuperSearch: '',
          corrRefernceNumber: '',
          corrStatus: '',
          corrSource: '',
          corrSubject: '',
          corrProjectContract: '',
          corrSender: '',
          corrRecipent: '',
          corrReviewer: '',
          corrApprover: '',
          corrFromDate:  '',
          corrFromDateFormat:'',
          corrToDate : '',
          corrToDateFormat:'',
          corrReplyFromDate: '',
          corrReplyFromDateFormat: '',
          corrReplyToDate: '',
          corrReplyToDateFormat: '',
          corrsuperSearch:'',
          corrisConfidential: false,
          corrisReplyRequired: false,
        });
      }
      onValueAdvanceSearchTypeClear =() => {
        this.props.setSearchDetailEmpty();
        this.setState({
          momRefernceNumber: '',
          momStatus: '',
          momSubject: '',
          momInitiator: '',
          momSuperSearch: '',
          rfiRefernceNumber: '',
          rfiStatus: '',
          rfiSubject: '',
          rfiInitiator: '',
          rfiQuery: '',
          rfiResponse: '',
          rfiSuperSearch: '',
          corrRefernceNumber: '',
          corrStatus: '',
          corrSource: '',
          corrSubject: '',
          corrProjectContract: '',
          corrSender: '',
          corrRecipent: '',
          corrReviewer: '',
          corrApprover: '',
          corrFromDate:  '',
          corrFromDateFormat:'',
          corrToDate : '',
          corrToDateFormat:'',
          corrReplyFromDate: '',
          corrReplyFromDateFormat: '',
          corrReplyToDate: '',
          corrReplyToDateFormat: '',
          corrsuperSearch:'',
          corrisConfidential: false,
          corrisReplyRequired: false,
        });
      }
      handleOnCorrespondenceReferenceNumberChange(e) { 
        e.persist();
       this.setState({
        referenceNumber: e.nativeEvent.text
       })   
      }   
      onValueCorrespondenceStatusChange =(value) => {
        if (value != -1) {
        this.setState({
          status: value
        });
       }
      }
      onValueCorrespondenceSenderChange =(value) => {
        if (value != -1) {
        this.setState({
          sender: value
        });
       }
      }
      onValueCorrespondenceRecipentChange =(value) => {
        if (value != -1) {
        this.setState({
          recipient: value
        });
       }
      }
      handleOnSubjectChange(e) {
        e.persist();
       this.setState({
        subject: e.nativeEvent.text
       })   
      }
      handleOnSuperSearchChange(e) {
          e.persist();
          this.setState({
          superSearch: e.nativeEvent.text
   })    
      }
      handleOnMomRefernceNumberChange(e) {
  e.persist();
 this.setState({
 momRefernceNumber: e.nativeEvent.text
 })    
}
handleOnMomSubjectChange(e) {
  e.persist();
 this.setState({
 momSubject: e.nativeEvent.text
 })    
}
handleOnMomInitiatorChange(e) {
  e.persist();
 this.setState({
  momInitiator: e.nativeEvent.text
 })    
}
handleOnMomSuperSeachChange(e) {
  e.persist();
 this.setState({
  momSuperSearch: e.nativeEvent.text
 })    
}
onValuemomStatusChange =(value) => {
  if (value != -1) {
  this.setState({
    momStatus: value
  });
}
}
onValueRFIStatusChange =(value) => {
  if (value != -1) {
  this.setState({
    rfiStatus: value
  });
}
}
handleOnRfiReferenceNumberChange(e) {
  e.persist();
 this.setState({
  rfiRefernceNumber: e.nativeEvent.text
 })    
}
handleOnRfiSubjectChange(e) {
  e.persist();
 this.setState({
  rfiSubject: e.nativeEvent.text
 })    
}
handleOnRfiInitiatorChange(e) {
  e.persist();
 this.setState({
  rfiInitiator: e.nativeEvent.text
 })    
}
handleOnRfiQueryChange(e) {
  e.persist();
 this.setState({
  rfiQuery: e.nativeEvent.text
 })    
}
handleOnRfiResponseChange(e) {
  e.persist();
 this.setState({
  rfiResponse: e.nativeEvent.text
 })    
}
handleOnRfiSuperSearchChange(e) {
  e.persist();
 this.setState({
  rfiSuperSearch: e.nativeEvent.text
 })    
}
handleOnCorrRefernceNumberChange(e) {
  e.persist();
 this.setState({
  corrRefernceNumber: e.nativeEvent.text
 })    
}
handleOnCorrSubjectChange(e) {
  e.persist();
 this.setState({
  corrSubject: e.nativeEvent.text
 })    
}
onValueCorrStatusChange =(value) => {
  if (value != -1) {
  this.setState({
    corrStatus: value
  });
}
}
onValueCorrSoureceChange =(value) => {
  if (value != -1) {
  this.setState({
    corrSource: value
  });
}
}
onValueCorrProjectContractChange =(value) => {
  if (value != -1) {
  this.setState({
    corrProjectContract: value
  });
}
}
onValueCorrSenderhange =(value) => {
  if (value != -1) {
  this.setState({
    corrSender: value
  });
}
}
onValueCorrRecipentChange =(value) => {
  if (value != -1) {
  this.setState({
    corrRecipent: value
  });
}
}
onValueCorrReviewerChange =(value) => {
  if (value != -1) {
  this.setState({
    corrReviewer: value
  });
}
}
onValueCorrApproverChange =(value) => {
  if (value != -1) {
  this.setState({
    corrApprover: value
  });
 }
}
handleOnCorrSuperSearchChange(e) {
  e.persist();
 this.setState({
  corrsuperSearch: e.nativeEvent.text
 })    
}
handleOnfromandToDateChange(e) { 
  console.log('Indise handle method');
 this.setState({
  isCalendarVisible: true 
})    
}
onValueMomLocationChange =(value) => {
  if (value != -1) {
  this.setState({
    momLocation: value
  });
}
}
onValueMomDisciplineChange =(value) => {
  if (value != -1) {
  this.setState({
    momDiscipline: value
  });
}
}
onValueMomContractChange =(value) => {
  if (value != -1) {
  this.setState({
    momContract: value
  });
}
}
handleOnfromandToDateChangeValue(fromDates, toDates) { 
  console.log('Indise Calendar before method');
   const selectedFromDate = moment(fromDates).format('ddd MMM DD, YYYY');
   const selectedToDate = moment(toDates).format('ddd MMM DD, YYYY');

 this.setState({
  fromDate: selectedFromDate,
  toDate: selectedToDate,
  fromDateFormat:  moment(fromDates).format('yyyy-MM-DD'),
  toDateFormat: moment(toDates).format('yyyy-MM-DD')
});    

}
handleOnAdvanceSearchfromandToDateChangeValue(fromDates, toDates) { 
  console.log('Indise Calendar before method');
   const selectedFromDate = moment(fromDates).format('ddd MMM DD, YYYY');
   const selectedToDate = moment(toDates).format('ddd MMM DD, YYYY');

 this.setState({
  corrFromDate: selectedFromDate,
  corrToDate: selectedToDate,
  corrFromDateFormat:  moment(fromDates).format('yyyy-MM-DD'),
  corrToDateFormat: moment(toDates).format('yyyy-MM-DD')
});    
}
handleOnAdvanceSearchReplyfromandToDateChangeValue(fromDates, toDates) { 
  console.log('Indise Calendar before method');
   const selectedFromDate = moment(fromDates).format('ddd MMM DD, YYYY');
   const selectedToDate = moment(toDates).format('ddd MMM DD, YYYY');

 this.setState({
  corrReplyFromDate: selectedFromDate,
  corrReplyToDate: selectedToDate,
  corrReplyFromDateFormat:  moment(fromDates).format('yyyy-MM-DD'),
  corrReplyToDateFormat: moment(toDates).format('yyyy-MM-DD')
});    

}
   _renderQuickSearchSelectValues = () => {
   if (config.fallback == 'en'){
    return(
      <View style = {{ backgroundColor:'#f2f2f2',justifyContent:'center',alignContent:'center'}}>
  
     <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
             <Picker style={{marginTop:-5}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons"  style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              selectedValue={this.state.searchType}
                                              onValueChange={this.onValueSearchTypeChange}
                                              underlineColorAndroid = 'transparent'
                                           >
                                          <Picker.Item label="Correspondence" value="Correspondence" />
                                          <Picker.Item label="MOM" value="MOM" />
                                          <Picker.Item label="RFI" value="RFI" />
                                          </Picker>
          
            </View>
          <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
             <Input
                                              type="text"
                                              name='referenceNumber'
                                              
                                              value={this.state.referenceNumber}
                                              onChange={(value) => this.handleOnCorrespondenceReferenceNumberChange(value)}
                                              underlineColorAndroid = "transparent"
                                              clearButtonMode='always'
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('SearchScreen:ReferenceNumber')}
                                              spellCheck={false}
                                              autoCorrect={false}
                                              style={{borderColor: 'gray',
                                              borderWidth: 1,
                                              borderRadius:5,
                                              marginTop:0,
                                              textAlign:'auto',
                                              paddingLeft:15,
                                              backgroundColor:'#f2f2f2',
                                              fontFamily:FONT_FAMILY_PT_REGULAR,width:screenWidth-35, height:37,fontSize:16}}
                                          />
            </View>
            <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
             <Picker style={{marginTop:-5}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('SearchScreen:SelectStatus')}
                                              selectedValue={this.state.status}
                                              onValueChange={this.onValueCorrespondenceStatusChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                          <Picker.Item color={'gray'} label={t('SearchScreen:SelectStatus')} value={-1} key={-1} />
                                          <Picker.Item label="INITIATED" value="INITIATED" />
                                          <Picker.Item label="REVIEWED" value="REVIEWED" />
                                          <Picker.Item label="APPROVED" value="APPROVED" />
                                          <Picker.Item label="IN DRAFT" value="Draft" />
  
                                          </Picker>
          
            </View>
            
            <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
             <Picker style={{marginTop:-5 }}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('SearchScreen:SelectSender')}
                                              selectedValue={this.state.sender}
                                              onValueChange={this.onValueCorrespondenceSenderChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                          {/* //<Picker.Item label='Select Document Type' value={-1} key={-1} /> */}
                                          <Picker.Item color={'gray'} label= {t('SearchScreen:SelectSender')} value={-1} key={-1} />
  
  
  {this.props.searchSenderAndRecipent && this.props.searchSenderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
                                          </Picker>
          
            </View>
            <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
             <Picker style={{marginTop:-5}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('SearchScreen:SelectRecipient')}
                                              selectedValue={this.state.recipient}
                                              onValueChange={this.onValueCorrespondenceRecipentChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                              <Picker.Item color={'gray'} label= {t('SearchScreen:SelectRecipient')} value={-1} key={-1} />
  
                                          {this.props.searchSenderAndRecipent && this.props.searchSenderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
  
                                          </Picker>
          
            </View>
            <TouchableOpacity  onPress={() => { this.setState({ isCalendarVisible: true }) }}>
  
            <View style={{flex:1, flexDirection:'row',width:screenWidth-35,justifyContent:'space-between',alignContent:'center'}}>
  
  <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row',justifyContent:'flex-start',margin:15,marginTop:0}}>
  
   <Input
                                    // type="text"
                                    value={this.state.fromDate}
                                    name='Date'
                                    //onValueChange={() => { this.handleOnfromandToDateChange() }}
                                    //onFocus 
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('SearchScreen:SelectFromDate')}
                                    ref={input => { this.textInput = input }}
  
                                    style={{borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius:5,
                                    marginTop:0,
                                    paddingLeft:15,
                                    backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                    
                                />
                                {/* <Text>{this.state.fromDate}</Text> */}
                                      <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginLeft:-30,alignContent:'center',alignSelf:'center'}} />        
  </View>
  
  <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row',justifyContent:'flex-end',margin:15,marginRight:-8,marginTop:0}}>
    
   <Input
                                    // type="text"
                                    value={this.state.toDate}
                                    name='Date'
                                    // onChange={(value) => this.handleOnSuperSearchChange(value)}
                                    onChangeText={() => this.setState({ fromDate })}
  
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('SearchScreen:SelectToDate')}
                                    style={{borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius:5,
                                    marginTop:0,
                                    paddingLeft:15,
                                    backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                    
                                />
                                      <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginLeft:-30,alignContent:'center',alignSelf:'center'}} />        
  
    </View>
  
  </View>
  </TouchableOpacity>
  
            <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
             <Input
                                              type="text"
                                              value={this.state.subject}
                                              name='subject'
                                              onChange={(value) => this.handleOnSubjectChange(value)}
                                              underlineColorAndroid = "transparent"
                                              clearButtonMode='always'
                                              placeholderTextColor='#afafaf'
                                              placeholder = {t('SearchScreen:Subject')}
                                              style={{borderColor: 'gray',
                                              borderWidth: 1,
                                              borderRadius:5,
                                              marginTop:0,
                                              paddingLeft:15,
                                              backgroundColor:'#f2f2f2',
                                              fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                          />
          
            </View>
            <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
              
             <Input
                                              type="text"
                                              value={this.state.superSearch}
                                              name='superSearch'
                                              onChange={(value) => this.handleOnSuperSearchChange(value)}
                                              underlineColorAndroid = "transparent"
                                              clearButtonMode='always'
                                              placeholderTextColor='#afafaf'
                                              placeholder = {t('SearchScreen:SuperSearch')}
                                              spellCheck={false}
                                              autoCorrect={false}
                                              style={{borderColor: 'gray',
                                              borderWidth: 1,
                                              borderRadius:5,
                                              marginTop:0,
                                              paddingLeft:15,
                                              backgroundColor:'#f2f2f2',
                                              fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                              
                                          /> 
                          
          
                  </View>
                  <View style={{justifyContent:'flex-start',marginTop:5,marginBottom:5}}>
                      <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',marginLeft:35,marginRight:35,height:40,borderRadius:20}} onPress={() => {this.goQuickSearchListScreen()}}>
                      <Text uppercase={false} style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD}}>{t('SearchScreen:Search')}</Text>
                     </Button> 
                  </View>
            </View>
      );
   } else {
    return(
      <View style = {{ backgroundColor:'#f2f2f2',justifyContent:'center',alignContent:'center'}}>
  
     <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0,  borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
             <Picker style={{marginTop:-5, textAlign: 'right', flexDirection:'row-reverse'}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons"  style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              selectedValue={this.state.searchType}
                                              onValueChange={this.onValueSearchTypeChange}
                                              underlineColorAndroid = 'transparent'
                                           >
                                          <Picker.Item label="Correspondence" value="Correspondence" />
                                          <Picker.Item label="MOM" value="MOM" />
                                          <Picker.Item label="RFI" value="RFI" />
                                          </Picker>
          
            </View>
          <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
             <Input
                                              type="text"
                                              name='referenceNumber'
                                              
                                              value={this.state.referenceNumber}
                                              onChange={(value) => this.handleOnCorrespondenceReferenceNumberChange(value)}
                                              underlineColorAndroid = "transparent"
                                              clearButtonMode='always'
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('SearchScreen:ReferenceNumber')}
                                              spellCheck={false}
                                              autoCorrect={false}
                                              style={{borderColor: 'gray',
                                              borderWidth: 1,
                                              borderRadius:5,
                                              marginTop:0,
                                              textAlign: 'right',
                                              paddingLeft:15,
                                              backgroundColor:'#f2f2f2',
                                              fontFamily:FONT_FAMILY_PT_REGULAR,width:screenWidth-35, height:37,fontSize:16}}
                                          />
            </View>
            <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
             <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('SearchScreen:SelectStatus')}
                                              selectedValue={this.state.status}
                                              onValueChange={this.onValueCorrespondenceStatusChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                          <Picker.Item color={'gray'} label={t('SearchScreen:SelectStatus')} value={-1} key={-1} />
                                          <Picker.Item label="INITIATED" value="INITIATED" />
                                          <Picker.Item label="REVIEWED" value="REVIEWED" />
                                          <Picker.Item label="APPROVED" value="APPROVED" />
                                          <Picker.Item label="IN DRAFT" value="Draft" />
  
                                          </Picker>
          
            </View>
            
            <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
             <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse' }}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('SearchScreen:SelectSender')}
                                              selectedValue={this.state.sender}
                                              onValueChange={this.onValueCorrespondenceSenderChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                          {/* //<Picker.Item label='Select Document Type' value={-1} key={-1} /> */}
                                          <Picker.Item color={'gray'} label= {t('SearchScreen:SelectSender')} value={-1} key={-1} />
  
  
  {this.props.searchSenderAndRecipent && this.props.searchSenderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
                                          </Picker>
          
            </View>
            <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
             <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('SearchScreen:SelectRecipient')}
                                              selectedValue={this.state.recipient}
                                              onValueChange={this.onValueCorrespondenceRecipentChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                              <Picker.Item color={'gray'} label= {t('SearchScreen:SelectRecipient')} value={-1} key={-1} />
  
                                          {this.props.searchSenderAndRecipent && this.props.searchSenderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
  
                                          </Picker>
          
            </View>
            <TouchableOpacity  onPress={() => { this.setState({ isCalendarVisible: true }) }}>
  
            <View style={{flex:1, flexDirection:'row',width:screenWidth-30,justifyContent:'space-between',alignContent:'center'}}>
  
  <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row-reverse',justifyContent:'flex-end',margin:21,marginTop:0}}>
  
   <Input
                                    // type="text"
                                    value={this.state.fromDate}
                                    name='Date'
                                    //onValueChange={() => { this.handleOnfromandToDateChange() }}
                                    //onFocus 
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('SearchScreen:SelectFromDate')}
                                    ref={input => { this.textInput = input }}
  
                                    style={{borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius:5,
                                    marginTop:0,
                                    textAlign:'right',
                                    paddingLeft:15,
                                    backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                    
                                />
                                {/* <Text>{this.state.fromDate}</Text> */}
                                      <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginRight:-30,alignContent:'center',alignSelf:'center'}} />        
  </View>
  
  <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection: 'row-reverse',justifyContent:'flex-end',margin:21,marginLeft:-8,marginTop:0}}>
    
   <Input
                                    // type="text"
                                    value={this.state.toDate}
                                    name='Date'
                                    // onChange={(value) => this.handleOnSuperSearchChange(value)}
                                    onChangeText={() => this.setState({ fromDate })}
  
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('SearchScreen:SelectToDate')}
                                    style={{borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius:5,
                                    marginTop:0,
                                    textAlign:'right',
                                    paddingLeft:15,
                                    backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                    
                                />
                                      <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginRight:-30,alignContent:'center',alignSelf:'center'}} />        
  
    </View>
  
  </View>
  </TouchableOpacity>
  
            <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
             <Input
                                              type="text"
                                              value={this.state.subject}
                                              name='subject'
                                              onChange={(value) => this.handleOnSubjectChange(value)}
                                              underlineColorAndroid = "transparent"
                                              clearButtonMode='always'
                                              placeholderTextColor='#afafaf'
                                              placeholder = {t('SearchScreen:Subject')}
                                              style={{borderColor: 'gray',
                                              borderWidth: 1,
                                              borderRadius:5,
                                              marginTop:0,
                                              textAlign:'right',
                                              paddingLeft:15,
                                              backgroundColor:'#f2f2f2',
                                              fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                          />
          
            </View>
            <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
              
             <Input
                                              type="text"
                                              value={this.state.superSearch}
                                              name='superSearch'
                                              onChange={(value) => this.handleOnSuperSearchChange(value)}
                                              underlineColorAndroid = "transparent"
                                              clearButtonMode='always'
                                              placeholderTextColor='#afafaf'
                                              placeholder = {t('SearchScreen:SuperSearch')}
                                              spellCheck={false}
                                              autoCorrect={false}
                                              style={{borderColor: 'gray',
                                              borderWidth: 1,
                                              borderRadius:5,
                                              marginTop:0,
                                              textAlign:'right',
                                              paddingLeft:15,
                                              backgroundColor:'#f2f2f2',
                                              fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                              
                                          /> 
                          
          
                  </View>
                  <View style={{justifyContent:'flex-start',marginTop:5,marginBottom:5}}>
                      <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',marginLeft:35,marginRight:35,height:40,borderRadius:20}} onPress={() => {this.goQuickSearchListScreen()}}>
                      <Text uppercase={false} style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD}}>{t('SearchScreen:Search')}</Text>
                     </Button> 
                  </View>
            </View>
      );
   }
    
}
_renderAdvanceSearchSelectValues = () => {
  
  if (this.state.advancesearchType == "Correspondence") {
    if (config.fallback == 'en'){
      return(
        <View style = {{ backgroundColor:'#f2f2f2',justifyContent:'center',alignContent:'center'}}>
  
            <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
               <Input
                                                type="text"
                                                name='corrRefernceNumber'
                                                
                                                value={this.state.corrRefernceNumber}
                                                onChange={(value) => this.handleOnCorrRefernceNumberChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:ReferenceNumber')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                textAlign:'auto',
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,width:screenWidth-35, height:37,fontSize:16}}
                                            />
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{ marginTop:-5 }}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectStatus')}
                                                selectedValue={this.state.corrStatus}
                                                onValueChange={this.onValueCorrStatusChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                               <Picker.Item color={'gray'} label= {t('SearchScreen:SelectStatus')} value={-1} key={-1} />
                                            <Picker.Item label="INITIATED" value="INITIATED" />
                                            <Picker.Item label="REVIEWED" value="REVIEWED" />
                                            <Picker.Item label="APPROVED" value="APPROVED" />
                                            <Picker.Item label="IN DRAFT" value="Draft" />
    
                                            </Picker>
            
              </View>
  
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{  marginTop:-5 }}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectCorrespondencesource')}
                                                selectedValue={this.state.corrSource}
                                                onValueChange={this.onValueCorrSoureceChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                             <Picker.Item color={'gray'} label= {t('SearchScreen:SelectCorrespondencesource')} value={-1} key={-1} />
  
                                            <Picker.Item label="INCOMING CORRESPONDENCE" value={2}/>
                                            <Picker.Item label="OUTGOING CORRESPONDENCE" value={1} />  
                                            </Picker>
            
              </View>
              
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectSender')}
                                                selectedValue={this.state.corrSender}
                                                onValueChange={this.onValueCorrSenderhange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                             <Picker.Item color={'gray'} label= {t('SearchScreen:SelectSender')} value={-1} key={-1} />
  
                                            {this.props.searchSenderAndRecipent && this.props.searchSenderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
    
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5 }}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectRecipient')}
                                                selectedValue={this.state.corrRecipent}
                                                onValueChange={this.onValueCorrRecipentChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                               <Picker.Item color={'gray'} label= {t('SearchScreen:SelectRecipient')} value={-1} key={-1} />
                                            {this.props.searchSenderAndRecipent && this.props.searchSenderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectProject/ContractIdentifier')}
                                                selectedValue={this.state.corrProjectContract}
                                                onValueChange={this.onValueCorrProjectContractChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                               <Picker.Item color={'gray'} label= {t('SearchScreen:SelectProject/ContractIdentifier')} value={-1} key={-1} />
                                           {this.props.searchProjectContract && this.props.searchProjectContract.map((projectcontract, index) => {
       return (
  <Picker.Item label= {`${projectcontract.contractcode} - ${projectcontract.entityName}`} value={projectcontract.ridContract} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectReviewer')}
                                                selectedValue={this.state.corrReviewer}
                                                onValueChange={this.onValueCorrReviewerChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                               <Picker.Item color={'gray'} label= {t('SearchScreen:SelectReviewer')} value={-1} key={-1} />
                                             {this.state.reviewerData && this.state.reviewerData.map((reviewApprover, index) => {
       return (
  <Picker.Item label= {`${reviewApprover.firstname} ${reviewApprover.lastname}`} value={reviewApprover.ridUsermaster} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectApprover')}
                                                selectedValue={this.state.corrApprover}
                                                onValueChange={this.onValueCorrApproverChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                                <Picker.Item color={'gray'} label= {t('SearchScreen:SelectApprover')} value={-1} key={-1} />
                                            {this.state.approverData && this.state.approverData.map((reviewApprover, index) => {
       return (
  <Picker.Item label= {`${reviewApprover.firstname} ${reviewApprover.lastname}`} value={reviewApprover.ridUsermaster} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <TouchableOpacity  onPress={() => { this.setState({ isAdvanceSearchFromToDateCalendaerVisible: true }) }}>
  
              <View style={{flex:1, flexDirection:'row',width:screenWidth-35,justifyContent:'space-between',alignContent:'center'}}>
  
              <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row',justifyContent:'flex-start',margin:15,marginTop:0}}>
                
               <Input
                                               // type="text"
                                                value={this.state.corrFromDate}
                                                name='Date'
                                               // onChange={(value) => this.handleOnSuperSearchChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:SelectFromDate')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                                
                                            />
                                                  <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginLeft:-30,alignContent:'center',alignSelf:'center'}} />        
  
              </View>
              <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row',justifyContent:'flex-end',margin:15,marginRight:-8,marginTop:0}}>
                
               <Input
                                               // type="text"
                                                value={this.state.corrToDate}
                                                name='Date'
                                               // onChange={(value) => this.handleOnSuperSearchChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:SelectToDate')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                                
                                            />
                                                  <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginLeft:-30,alignContent:'center',alignSelf:'center'}} />        
  
                </View>
              </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => { this.setState({ isAdvanceSearchReplyFromToDateCalendaerVisible: true }) }}>
  
              <View style={{flex:1, flexDirection:'row',width:screenWidth-35,justifyContent:'space-between',alignContent:'center'}}>
  
              <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row',justifyContent:'flex-start',margin:15,marginTop:0,width:screenWidth-45}}>
                
               <Input
                                               // type="text"
                                                value={this.state.corrReplyFromDate}
                                                name='Date'
                                                //onChange={(value) => this.handleOnSuperSearchChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:SelectReplyFromDate')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                                
                                            />
                                        <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginLeft:-30,alignContent:'center',alignSelf:'center'}} />        
  
              </View>
              <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row',justifyContent:'flex-end',margin:15,marginTop:0,marginRight:-8}}>
                
               <Input
                                               // type="text"
                                                value={this.state.corrReplyToDate}
                                                name='Date'
                                              //  onChange={(value) => this.handleOnSuperSearchChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:SelectReplyToDate')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                  
                                            />
                              <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginLeft:-30,alignContent:'center',alignSelf:'center'}} />        
            
              </View>
              </View>
              </TouchableOpacity>
              <View style={{flex:1, flexDirection:'row',width:screenWidth,justifyContent:'space-around',alignContent:'space-between',alignItems:'center',marginLeft:0}}>
                
                <CheckBox
                      selected={this.state.corrisConfidential} 
                      onPress={() => this.setState({ corrisConfidential: !this.state.corrisConfidential })}
                      text= {t('SearchScreen:Confidential')}
                  /> 
                  <CheckBox
                      selected={this.state.corrisReplyRequired} 
                      onPress={() => this.setState({ corrisReplyRequired: !this.state.corrisReplyRequired })}
                      text= {t('SearchScreen:ReplyRequired')}
                  /> 
                
            </View>
  
              <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:15}}>
               <Input
                                                type="text"
                                                value={this.state.corrSubject}
                                                name='subject'
                                                onChange={(value) => this.handleOnCorrSubjectChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:Subject')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                            />
            
              </View>
              <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                
               <Input
                                                type="text"
                                                value={this.state.corrsuperSearch}
                                                name='superSearch'
                                                onChange={(value) => this.handleOnCorrSuperSearchChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:SuperSearch')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                
                                            />
                                      
            
              </View>
              
                    <View style={{justifyContent:'flex-start',marginTop:5,marginBottom:5}}>
                        <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',marginLeft:35,marginRight:35,height:40,borderRadius:20}} onPress={() => {this.goCorrespondenceAdvaceSearchList()}}>
                        <Text uppercase={false} style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD}}>{t('SearchScreen:Search')}</Text>
                       </Button> 
                    </View>
              </View>
       );
    }else {
      return(
        <View style = {{ backgroundColor:'#f2f2f2',justifyContent:'center',alignContent:'center'}}>
  
            <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
               <Input
                                                type="text"
                                                name='corrRefernceNumber'
                                                
                                                value={this.state.corrRefernceNumber}
                                                onChange={(value) => this.handleOnCorrRefernceNumberChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:ReferenceNumber')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                textAlign: 'right',
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,width:screenWidth-35, height:37,fontSize:16}}
                                            />
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{ marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectStatus')}
                                                selectedValue={this.state.corrStatus}
                                                onValueChange={this.onValueCorrStatusChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                               <Picker.Item color={'gray'} label= {t('SearchScreen:SelectStatus')} value={-1} key={-1} />
                                            <Picker.Item label="INITIATED" value="INITIATED" />
                                            <Picker.Item label="REVIEWED" value="REVIEWED" />
                                            <Picker.Item label="APPROVED" value="APPROVED" />
                                            <Picker.Item label="IN DRAFT" value="Draft" />
    
                                            </Picker>
            
              </View>
  
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{  marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectCorrespondencesource')}
                                                selectedValue={this.state.corrSource}
                                                onValueChange={this.onValueCorrSoureceChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                             <Picker.Item color={'gray'} label= {t('SearchScreen:SelectCorrespondencesource')} value={-1} key={-1} />
  
                                            <Picker.Item label="INCOMING CORRESPONDENCE" value={2}/>
                                            <Picker.Item label="OUTGOING CORRESPONDENCE" value={1} />  
                                            </Picker>
            
              </View>
              
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectSender')}
                                                selectedValue={this.state.corrSender}
                                                onValueChange={this.onValueCorrSenderhange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                             <Picker.Item color={'gray'} label= {t('SearchScreen:SelectSender')} value={-1} key={-1} />
  
                                            {this.props.searchSenderAndRecipent && this.props.searchSenderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
    
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5,textAlign:'right', flexDirection:'row-reverse' }}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectRecipient')}
                                                selectedValue={this.state.corrRecipent}
                                                onValueChange={this.onValueCorrRecipentChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                               <Picker.Item color={'gray'} label= {t('SearchScreen:SelectRecipient')} value={-1} key={-1} />
                                            {this.props.searchSenderAndRecipent && this.props.searchSenderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectProject/ContractIdentifier')}
                                                selectedValue={this.state.corrProjectContract}
                                                onValueChange={this.onValueCorrProjectContractChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                               <Picker.Item color={'gray'} label= {t('SearchScreen:SelectProject/ContractIdentifier')} value={-1} key={-1} />
                                           {this.props.searchProjectContract && this.props.searchProjectContract.map((projectcontract, index) => {
       return (
  <Picker.Item label= {`${projectcontract.contractcode} - ${projectcontract.entityName}`} value={projectcontract.ridContract} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectReviewer')}
                                                selectedValue={this.state.corrReviewer}
                                                onValueChange={this.onValueCorrReviewerChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                               <Picker.Item color={'gray'} label= {t('SearchScreen:SelectReviewer')} value={-1} key={-1} />
                                             {this.state.reviewerData && this.state.reviewerData.map((reviewApprover, index) => {
       return (
  <Picker.Item label= {`${reviewApprover.firstname} ${reviewApprover.lastname}`} value={reviewApprover.ridUsermaster} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectApprover')}
                                                selectedValue={this.state.corrApprover}
                                                onValueChange={this.onValueCorrApproverChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                                <Picker.Item color={'gray'} label= {t('SearchScreen:SelectApprover')} value={-1} key={-1} />
                                            {this.state.approverData && this.state.approverData.map((reviewApprover, index) => {
       return (
  <Picker.Item label= {`${reviewApprover.firstname} ${reviewApprover.lastname}`} value={reviewApprover.ridUsermaster} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <TouchableOpacity  onPress={() => { this.setState({ isAdvanceSearchFromToDateCalendaerVisible: true }) }}>
  
              <View style={{flex:1, flexDirection:'row',width:screenWidth-35,justifyContent:'space-between',alignContent:'center'}}>
  
              <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row-reverse',justifyContent:'flex-start',margin:21,marginTop:0}}>
                
               <Input
                                               // type="text"
                                                value={this.state.corrFromDate}
                                                name='Date'
                                               // onChange={(value) => this.handleOnSuperSearchChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:SelectFromDate')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                textAlign:'right',
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                                
                                            />
                                                  <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginRight:-30,alignContent:'center',alignSelf:'center'}} />        
  
              </View>
              <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row-reverse',justifyContent:'flex-end',margin:15,marginLeft:-15,marginTop:0}}>
                
               <Input
                                               // type="text"
                                                value={this.state.corrToDate}
                                                name='Date'
                                               // onChange={(value) => this.handleOnSuperSearchChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:SelectToDate')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                textAlign:'right',
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                                
                                            />
                                                  <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginRight:-30,alignContent:'center',alignSelf:'center'}} />        
  
                </View>
              </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => { this.setState({ isAdvanceSearchReplyFromToDateCalendaerVisible: true }) }}>
  
              <View style={{flex:1, flexDirection:'row',width:screenWidth-35,justifyContent:'space-between',alignContent:'center'}}>
  
              <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection: 'row-reverse',justifyContent:'flex-start',margin:21,marginTop:0,width:screenWidth-45}}>
                
               <Input
                                               // type="text"
                                                value={this.state.corrReplyFromDate}
                                                name='Date'
                                                //onChange={(value) => this.handleOnSuperSearchChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:SelectReplyFromDate')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                textAlign:'right',
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                                
                                            />
                                        <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginRight:-30,alignContent:'center',alignSelf:'center'}} />        
  
              </View>
              <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row-reverse',justifyContent:'flex-end',margin:15,marginTop:0,marginLeft:-10}}>
                
               <Input
                                               // type="text"
                                                value={this.state.corrReplyToDate}
                                                name='Date'
                                              //  onChange={(value) => this.handleOnSuperSearchChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:SelectReplyToDate')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                textAlign:'right',
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                  
                                            />
                              <Image source={require('../../assets/image/calendar/calendar.png')} style={{marginRight:-30,alignContent:'center',alignSelf:'center'}} />        
            
              </View>
              </View>
              </TouchableOpacity>
              <View style={{flex:1, flexDirection:'row',width:screenWidth,justifyContent:'space-around',alignContent:'space-between',alignItems:'center',marginLeft:0}}>
                
                <CheckBox
                      selected={this.state.corrisConfidential} 
                      onPress={() => this.setState({ corrisConfidential: !this.state.corrisConfidential })}
                      text= {t('SearchScreen:Confidential')}
                  /> 
                  <CheckBox
                      selected={this.state.corrisReplyRequired} 
                      onPress={() => this.setState({ corrisReplyRequired: !this.state.corrisReplyRequired })}
                      text= {t('SearchScreen:ReplyRequired')}
                  /> 
                
            </View>
  
              <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:15}}>
               <Input
                                                type="text"
                                                value={this.state.corrSubject}
                                                name='subject'
                                                onChange={(value) => this.handleOnCorrSubjectChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:Subject')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                textAlign:'right',
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                            />
            
              </View>
              <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                
               <Input
                                                type="text"
                                                value={this.state.corrsuperSearch}
                                                name='superSearch'
                                                onChange={(value) => this.handleOnCorrSuperSearchChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                placeholder = {t('SearchScreen:SuperSearch')}
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={{borderColor: 'gray',
                                                borderWidth: 1,
                                                borderRadius:5,
                                                marginTop:0,
                                                textAlign:'right',
                                                paddingLeft:15,
                                                backgroundColor:'#f2f2f2',
                                                fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                
                                            />
                                      
            
              </View>
              
                    <View style={{justifyContent:'flex-start',marginTop:5,marginBottom:5}}>
                        <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',marginLeft:35,marginRight:35,height:40,borderRadius:20}} onPress={() => {this.goCorrespondenceAdvaceSearchList()}}>
                        <Text uppercase={false} style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD}}>{t('SearchScreen:Search')}</Text>
                       </Button> 
                    </View>
              </View>
       );
    }
    
    } else if (this.state.advancesearchType == 'MOM') {
      if (config.fallback == 'en'){
        return(
          <View style = {{ backgroundColor:'#f2f2f2',justifyContent:'center',alignContent:'center'}}>
      
         
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                 <Input
                                                  type="text"
                                                  name='momRefernceNumber'
                                                  
                                                  value={this.state.momRefernceNumber}
                                                  onChange={(value) => this.handleOnMomRefernceNumberChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder= {t('SearchScreen:ReferenceNumber')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'auto',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,width:screenWidth-35, height:37,fontSize:16}}
                                              />
                </View>
                <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
                 <Picker style={{ marginTop:-5}}
                                                  mode="dropdown"
                                                  iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                  placeholderStyle={{ color: '#afafaf' }}
                                                  placeholderTextColor='#afafaf'
                                                  placeholder= {t('SearchScreen:SelectStatus')}
                                                  selectedValue={this.state.momStatus}
                                                  onValueChange={this.onValuemomStatusChange}
                                                  underlineColorAndroid = 'transparent'
                                                
                                               >
                                                 <Picker.Item color={'gray'} label= {t('SearchScreen:SelectStatus')} value={-1} key={-1} />
                                              <Picker.Item label="INITIATED" value="INITIATED" />
                                              <Picker.Item label="REVIEWED" value="REVIEWED" />
                                              <Picker.Item label="APPROVED" value="APPROVED" />
                                              <Picker.Item label="IN DRAFT" value="Draft" />
      
                                              </Picker>
              
                </View>
                <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectLocation')}
                                                selectedValue={this.state.momLocation}
                                                onValueChange={this.onValueMomLocationChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                                <Picker.Item color={'gray'} label= {t('SearchScreen:SelectApprover')} value={-1} key={-1} />
                                            {this.props.searchLocation && this.props.searchLocation.map((location, index) => {
       return (
  <Picker.Item label= {`${location.locationCode}-${location.locationName}`} value={location.ridLocation} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectDiscipline')}
                                                selectedValue={this.state.momDiscipline}
                                                onValueChange={this.onValueMomDisciplineChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                                <Picker.Item color={'gray'} label= {t('SearchScreen:SelectApprover')} value={-1} key={-1} />
                                            {this.props.searchDiscipline && this.props.searchDiscipline.map((discipline, index) => {
       return (
  <Picker.Item label= {`${discipline.disciplineCode}-${discipline.disciplineName}`} value={discipline.ridDiscipline} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectContract')}
                                                selectedValue={this.state.momContract}
                                                onValueChange={this.onValueMomContractChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                                <Picker.Item color={'gray'} label= {t('SearchScreen:SelectApprover')} value={-1} key={-1} />
                                            {this.props.searchProjectContract && this.props.searchProjectContract.map((contract, index) => {
       return (
  <Picker.Item label= {`${contract.contractcode}-${contract.contractname}`} value={contract.ridContract} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                 <Input
                                                  type="text"
                                                  value={this.state.momInitiator}
                                                  name='Initiator'
                                                  onChange={(value) => this.handleOnMomInitiatorChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Initiator')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                              />
              
                </View>
                
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                 <Input
                                                  type="text"
                                                  value={this.state.momSubject}
                                                  name='subject'
                                                  onChange={(value) => this.handleOnMomSubjectChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Subject')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                              />
              
                </View>
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                  
                 <Input
                                                  type="text"
                                                  value={this.state.momSuperSearch}
                                                  name='superSearch'
                                                  onChange={(value) => this.handleOnMomSuperSeachChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:SuperSearch')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                  
                                              /> 
                </View>
                      <View style={{justifyContent:'flex-start',marginTop:5,marginBottom:5}}>
                          <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',marginLeft:35,marginRight:35,height:40,borderRadius:20}} onPress={() => {this.goMomAdvaceSearchList()}}>
                          <Text uppercase={false} style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD}}>{t('SearchScreen:Search')}</Text>
                         </Button> 
                      </View>
                </View>
          );
  
      }else{
        return(
          <View style = {{ backgroundColor:'#f2f2f2',justifyContent:'center',alignContent:'center'}}>
      
         
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                 <Input
                                                  type="text"
                                                  name='momRefernceNumber'
                                                  
                                                  value={this.state.momRefernceNumber}
                                                  onChange={(value) => this.handleOnMomRefernceNumberChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder= {t('SearchScreen:ReferenceNumber')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign: 'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,width:screenWidth-35, height:37,fontSize:16}}
                                              />
                </View>
                <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
                 <Picker style={{ marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                  mode="dropdown"
                                                  iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                  placeholderStyle={{ color: '#afafaf' }}
                                                  placeholderTextColor='#afafaf'
                                                  placeholder= {t('SearchScreen:SelectStatus')}
                                                  selectedValue={this.state.momStatus}
                                                  onValueChange={this.onValuemomStatusChange}
                                                  underlineColorAndroid = 'transparent'
                                                
                                               >
                                                 <Picker.Item color={'gray'} label= {t('SearchScreen:SelectStatus')} value={-1} key={-1} />
                                              <Picker.Item label="INITIATED" value="INITIATED" />
                                              <Picker.Item label="REVIEWED" value="REVIEWED" />
                                              <Picker.Item label="APPROVED" value="APPROVED" />
                                              <Picker.Item label="IN DRAFT" value="Draft" />
      
                                              </Picker>
              
                </View>
                <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectLocation')}
                                                selectedValue={this.state.momLocation}
                                                onValueChange={this.onValueMomLocationChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                                <Picker.Item color={'gray'} label= {t('SearchScreen:SelectApprover')} value={-1} key={-1} />
                                            {this.props.searchLocation && this.props.searchLocation.map((location, index) => {
       return (
  <Picker.Item label= {`${location.locationCode}-${location.locationName}`} value={location.ridLocation} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectDiscipline')}
                                                selectedValue={this.state.momDiscipline}
                                                onValueChange={this.onValueMomDisciplineChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                                <Picker.Item color={'gray'} label= {t('SearchScreen:SelectApprover')} value={-1} key={-1} />
                                            {this.props.searchDiscipline && this.props.searchDiscipline.map((discipline, index) => {
       return (
  <Picker.Item label= {`${discipline.disciplineCode}-${discipline.disciplineName}`} value={discipline.ridDiscipline} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
               <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                placeholder= {t('SearchScreen:SelectContract')}
                                                selectedValue={this.state.momContract}
                                                onValueChange={this.onValueMomContractChange}
                                                underlineColorAndroid = 'transparent'
                                              
                                             >
                                                <Picker.Item color={'gray'} label= {t('SearchScreen:SelectApprover')} value={-1} key={-1} />
                                            {this.props.searchProjectContract && this.props.searchProjectContract.map((contract, index) => {
       return (
  <Picker.Item label= {`${contract.contractcode}-${contract.contractname}`} value={contract.ridContract} key={index} />
  );
  })}
                                            </Picker>
            
              </View>
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                 <Input
                                                  type="text"
                                                  value={this.state.momInitiator}
                                                  name='Initiator'
                                                  onChange={(value) => this.handleOnMomInitiatorChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Initiator')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                              />
              
                </View>
                
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                 <Input
                                                  type="text"
                                                  value={this.state.momSubject}
                                                  name='subject'
                                                  onChange={(value) => this.handleOnMomSubjectChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Subject')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                              />
              
                </View>
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                  
                 <Input
                                                  type="text"
                                                  value={this.state.momSuperSearch}
                                                  name='superSearch'
                                                  onChange={(value) => this.handleOnMomSuperSeachChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:SuperSearch')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                  
                                              /> 
                </View>
                      <View style={{justifyContent:'flex-start',marginTop:5,marginBottom:5}}>
                          <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',marginLeft:35,marginRight:35,height:40,borderRadius:20}} onPress={() => {this.goMomAdvaceSearchList()}}>
                          <Text uppercase={false} style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD}}>{t('SearchScreen:Search')}</Text>
                         </Button> 
                      </View>
                </View>
          );
  
      }
     
    } else if (this.state.advancesearchType == "RFI"){
      if (config.fallback == 'en'){
        return(
          <View style = {{ backgroundColor:'#f2f2f2',justifyContent:'center',alignContent:'center'}}>
      
         
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                 <Input
                                                  type="text"
                                                  name='rfiRefernceNumber'
                                                  
                                                  value={this.state.rfiRefernceNumber}
                                                  onChange={(value) => this.handleOnRfiReferenceNumberChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder= {t('SearchScreen:ReferenceNumber')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'auto',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,width:screenWidth-35, height:37,fontSize:16}}
                                              />
                </View>
                <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0, borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
                 <Picker style={{marginTop:-5}}
                                                  mode="dropdown"
                                                  iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                  placeholderStyle={{ color: '#afafaf' }}
                                                  placeholderTextColor='#afafaf'
                                                  placeholder= {t('SearchScreen:SelectStatus')}
                                                  selectedValue={this.state.rfiStatus}
                                                  onValueChange={this.onValueRFIStatusChange}
                                                  underlineColorAndroid = 'transparent'
                                                
                                               >
                                                  <Picker.Item color={'gray'} label= {t('SearchScreen:SelectStatus')} value={-1} key={-1} />
                                              <Picker.Item label="INITIATED" value="INITIATED" />
                                              <Picker.Item label="REVIEWED" value="REVIEWED" />
                                              <Picker.Item label="APPROVED" value="APPROVED" />
                                              {/* <Picker.Item label="DISTRIBUTED" value="DISTRIBUTED" /> */}
                                              <Picker.Item label="IN DRAFT" value="Draft" />
      
                                              </Picker>
              
                </View>
                
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                  
                 <Input
                                                  type="text"
                                                  value={this.state.rfiInitiator}
                                                  name='rfiInitiator'
                                                  onChange={(value) => this.handleOnRfiInitiatorChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Initiator')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                  
                                              />
                                              
              
                </View>
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                  
                 <Input
                                                  type="text"
                                                  value={this.state.rfiQuery}
                                                  name='rfiQuery'
                                                  onChange={(value) => this.handleOnRfiQueryChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Query')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                  
                                              />
                                              
              
                </View>
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                  
                 <Input
                                                  type="text"
                                                  value={this.state.rfiResponse}
                                                  name='rfiResponse'
                                                  onChange={(value) => this.handleOnRfiResponseChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Response')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                  
                                              />
                                              
              
                </View>
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                 <Input
                                                  type="text"
                                                  value={this.state.rfiSubject}
                                                  name='rfiSubject'
                                                  onChange={(value) => this.handleOnRfiSubjectChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Subject')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                              />
              
                </View>
                <View style = {{ backgroundColor:'#f2f2f2',justifyContent:'flex-start',margin:15,marginTop:0}}>
                  
                 <Input
                                                  type="text"
                                                  value={this.state.rfiSuperSearch}
                                                  name='rfiSuperSearch'
                                                  onChange={(value) => this.handleOnRfiSuperSearchChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:SuperSearch')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                  
                                              /> 
                </View>
                      <View style={{justifyContent:'flex-start',marginTop:5,marginBottom:5}}>
                          <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',marginLeft:35,marginRight:35,height:40,borderRadius:20}} onPress={() => {this.goRfiAdvaceSearchList()}}>
                          <Text uppercase={false} style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD}}>{t('SearchScreen:Search')}</Text>
                         </Button> 
                      </View>
                </View>
          );
      }else{
        return(
          <View style = {{ backgroundColor:'#f2f2f2',justifyContent:'center',alignContent:'center'}}>
      
         
              <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                 <Input
                                                  type="text"
                                                  name='rfiRefernceNumber'
                                                  
                                                  value={this.state.rfiRefernceNumber}
                                                  onChange={(value) => this.handleOnRfiReferenceNumberChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder= {t('SearchScreen:ReferenceNumber')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign: 'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,width:screenWidth-35, height:37,fontSize:16}}
                                              />
                </View>
                <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15, marginTop:0, borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
                 <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                  mode="dropdown"
                                                  iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                                  placeholderStyle={{ color: '#afafaf' }}
                                                  placeholderTextColor='#afafaf'
                                                  placeholder= {t('SearchScreen:SelectStatus')}
                                                  selectedValue={this.state.rfiStatus}
                                                  onValueChange={this.onValueRFIStatusChange}
                                                  underlineColorAndroid = 'transparent'
                                                
                                               >
                                                  <Picker.Item color={'gray'} label= {t('SearchScreen:SelectStatus')} value={-1} key={-1} />
                                              <Picker.Item label="INITIATED" value="INITIATED" />
                                              <Picker.Item label="REVIEWED" value="REVIEWED" />
                                              <Picker.Item label="APPROVED" value="APPROVED" />
                                              {/* <Picker.Item label="DISTRIBUTED" value="DISTRIBUTED" /> */}
                                              <Picker.Item label="IN DRAFT" value="Draft" />
      
                                              </Picker>
              
                </View>
                
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                  
                 <Input
                                                  type="text"
                                                  value={this.state.rfiInitiator}
                                                  name='rfiInitiator'
                                                  onChange={(value) => this.handleOnRfiInitiatorChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Initiator')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                  
                                              />
                                              
              
                </View>
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                  
                 <Input
                                                  type="text"
                                                  value={this.state.rfiQuery}
                                                  name='rfiQuery'
                                                  onChange={(value) => this.handleOnRfiQueryChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Query')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                  
                                              />
                                              
              
                </View>
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                  
                 <Input
                                                  type="text"
                                                  value={this.state.rfiResponse}
                                                  name='rfiResponse'
                                                  onChange={(value) => this.handleOnRfiResponseChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Response')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                  
                                              />
                                              
              
                </View>
                <View style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0}}>
                 <Input
                                                  type="text"
                                                  value={this.state.rfiSubject}
                                                  name='rfiSubject'
                                                  onChange={(value) => this.handleOnRfiSubjectChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:Subject')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                              />
              
                </View>
                <View style = {{ backgroundColor:'#f2f2f2',justifyContent:'flex-start',margin:15,marginTop:0}}>
                  
                 <Input
                                                  type="text"
                                                  value={this.state.rfiSuperSearch}
                                                  name='rfiSuperSearch'
                                                  onChange={(value) => this.handleOnRfiSuperSearchChange(value)}
                                                  underlineColorAndroid = "transparent"
                                                  clearButtonMode='always'
                                                  placeholderTextColor='#afafaf'
                                                  placeholder = {t('SearchScreen:SuperSearch')}
                                                  spellCheck={false}
                                                  autoCorrect={false}
                                                  style={{borderColor: 'gray',
                                                  borderWidth: 1,
                                                  borderRadius:5,
                                                  marginTop:0,
                                                  textAlign:'right',
                                                  paddingLeft:15,
                                                  backgroundColor:'#f2f2f2',
                                                  fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,width:screenWidth-35,height:37}}
                                                  
                                              /> 
                </View>
                      <View style={{justifyContent:'flex-start',marginTop:5,marginBottom:5}}>
                          <Button style={{margin:5,backgroundColor:'#373d38',justifyContent:'center',marginLeft:35,marginRight:35,height:40,borderRadius:20}} onPress={() => {this.goRfiAdvaceSearchList()}}>
                          <Text uppercase={false} style={{fontSize:16,fontFamily:FONT_FAMILY_PT_BOLD}}>{t('SearchScreen:Search')}</Text>
                         </Button> 
                      </View>
                </View>
          );
      }
      
    } else {}
}
_renderSearchList =() => {
  if (this.props.searchDetails) {
    this.props.navigation.navigate({ 
      routeName: 'SearchLits' , 
      HeaderTilte: `${this.state.searchType} ${t('SearchScreen:SearchResults')}`,
      params: { 
        searchData: this.props.searchDetails,
        searchType: this.state.searchType
      }
    }); 
  }
}
  goQuickSearchListScreen() {
    const token = this.props.loggedInUser.token;
     if (this.state.searchType == "Correspondence") {
      this.props.setSearchDetailEmpty()
      const entityId = this.props.userProfile.ridEntityList;
       if (this.state.referenceNumber != '' && this.state.subject != '' || this.state.status != '' || this.state.sender != '' || this.state.recipient != '' || this.state.fromDateFormat != '' || this.state.toDateFormat != '' || this.state.superSearch != '') {
        this.props.getQuickSearchCorrespondenceRecordList(this.state.referenceNumber, this.state.subject, this.state.status, this.state.sender, this.state.recipient, this.state.fromDateFormat, this.state.toDateFormat, this.state.superSearch, entityId, token);
        } else {

          this.alertWithMessage('Please select at least one search parameter');
        }
     } else if (this.state.searchType == "MOM") {
      this.props.setSearchDetailEmpty()
      const entityId = this.props.userProfile.ridEntityList;
      if (this.state.referenceNumber != '' && this.state.subject != '' || this.state.status != '' || this.state.sender != '' || this.state.recipient != '' || this.state.fromDateFormat != '' || this.state.toDateFormat != '' || this.state.superSearch != '') {
        this.props.getQuickSearchMomRecordList(this.state.referenceNumber, this.state.subject, this.state.status, this.state.sender, this.state.recipient, this.state.fromDateFormat, this.state.toDateFormat, this.state.superSearch, entityId, token);
       } else {
         this.alertWithMessage('Please select at least one search parameter');

      }
     } else if (this.state.searchType == "RFI") {
      this.props.setSearchDetailEmpty()
      const entityId = this.props.userProfile.ridEntityList;
      if (this.state.referenceNumber != '' && this.state.subject != '' || this.state.status != '' || this.state.sender != '' || this.state.recipient != '' || this.state.fromDateFormat != '' || this.state.toDateFormat != '' || this.state.superSearch != '') {
        this.props.getQuickSearchRFIRecordList(this.state.referenceNumber, this.state.subject, this.state.status, this.state.sender, this.state.recipient, this.state.fromDateFormat, this.state.toDateFormat, this.state.superSearch, entityId, token);
       } else {
         this.alertWithMessage('Please select at least one search parameter');
       }
     } else {

     }  
  }
  goCorrespondenceAdvaceSearchList () {
    const token = this.props.loggedInUser.token;
    this.props.setSearchDetailEmpty()
    const entityId = this.props.userProfile.ridEntityList;
      if (this.state.corrRefernceNumber != '' || this.state.corrSubject != '' || this.state.corrSource != '' || this.state.corrProjectContract != '' || this.state.corrSender != '' || this.state.corrRecipent != '' ||
        this.state.corrReviewer != '' || this.state.corrApprover != '' || this.state.corrFromDateFormat != '' || this.state.corrToDateFormat != '' || this.state.corrReplyFromDateFormat != '' || this.state.corrReplyToDateFormat != '' || this.state.corrisReplyRequired != '' || this.state.corrisConfidential != '' || this.state.corrStatus != '' || this.state.corrsuperSearch != '') {
        this.props.getAdvanceSearchCorrespondenceRecordList(this.state.corrRefernceNumber, this.state.corrSubject, this.state.corrSource, this.state.corrProjectContract, this.state.corrSender, this.state.corrRecipent, 
          this.state.corrReviewer, this.state.corrApprover, this.state.corrFromDateFormat, this.state.corrToDateFormat, this.state.corrReplyFromDateFormat, this.state.corrReplyToDateFormat, this.state.corrisReplyRequired, this.state.corrisConfidential, this.state.corrStatus, this.state.corrsuperSearch, entityId, token);
       } else {
         this.alertWithMessage('Please select at least one search parameter');

       }
  }
  goMomAdvaceSearchList () {
    const token = this.props.loggedInUser.token;

    this.props.setSearchDetailEmpty()
    const entityId = this.props.userProfile.ridEntityList;
    if (this.state.momRefernceNumber != '' || this.state.momSubject != '' || this.state.momStatus != '' || this.state.momInitiator != '' || this.state.momSuperSearch != '') {
      this.props.getAdvanceSearchMomRecordList(this.state.momRefernceNumber, this.state.momSubject, this.state.momStatus, this.state.momInitiator, this.state.momSuperSearch, token);
    } else {
      console.log('Please select search value');

    }
  }
  goRfiAdvaceSearchList () {
    const token = this.props.loggedInUser.token;

    this.props.setSearchDetailEmpty()
    const entityId = this.props.userProfile.ridEntityList;
    if (this.state.rfiRefernceNumber != '' || this.state.rfiSubject != '' || this.state.rfiStatus != '' || this.state.rfiInitiator != '' || this.state.rfiQuery != '' || this.state.rfiResponse != '' || this.state.rfiSuperSearch != '') {
      this.props.getAdvanceSearchRFIRecordList(this.state.rfiRefernceNumber, this.state.rfiSubject, this.state.rfiStatus, this.state.rfiInitiator, this.state.rfiQuery, this.state.rfiResponse, this.state.rfiSuperSearch, token);
    } else {
      console.log('Please select search value');

    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    console.log('Search componet did update method');
    console.log('Search componet did update method',this.props.searchDetails);
   if (this.state.isQuickSearch == true ) {
    if (prevProps.searchDetails !== this.props.searchDetails && this.props.searchDetails != null && this.props.searchDetails.length > 0){
      this.props.navigation.navigate({ 
        routeName: 'SearchLits' , 
        HeaderTilte: `${this.state.searchType} ${t('SearchScreen:SearchResults')}`,

        params: { 
          searchData: this.props.searchDetails,
          searchType: this.state.searchType
        }
      }); 
    }
  } else {
    if (prevProps.searchDetails !== this.props.searchDetails && this.props.searchDetails != null && this.props.searchDetails.length > 0){
      this.props.navigation.navigate({ 
              routeName: 'SearchLits' , 
              HeaderTilte: `${this.state.advancesearchType} ${t('SearchScreen:SearchResults')}`,
      
              params: { 
                searchData: this.props.searchDetails,
                searchType: this.state.advancesearchType
              }
      }); 
    }
  }
  }
  alertWithMessage = (message) =>
    Alert.alert(
      "",
      message,
      [{
        text: "OK",
        onPress: () => {}
      }], {
        cancelable: false
      }
    );
    render() {
  //     if (this.state.isQuickSearch == true) {
  //      if (this.props.searchDetails && this.props.searchDetails.length > 0) {
  //     this.props.navigation.navigate({ 
  //       routeName: 'SearchLits' , 
  //       HeaderTilte: `${this.state.searchType} ${t('SearchScreen:SearchResults')}`,

  //       params: { 
  //         searchData: this.props.searchDetails,
  //         searchType: this.state.searchType
  //       }
  //     }); 
  //   }
  // } else {
  //   if (this.props.searchDetails && this.props.searchDetails.length > 0) {
  //     this.props.navigation.navigate({ 
  //       routeName: 'SearchLits' , 
  //       HeaderTilte: `${this.state.advancesearchType} ${t('SearchScreen:SearchResults')}`,

  //       params: { 
  //         searchData: this.props.searchDetails,
  //         searchType: this.state.advancesearchType
  //       }
  //     }); 
  //   }
  // }
    const { corrFromDate, corrToDate } = this.state;
      if (this.state.isQuickSearch == true) {
        if (config.fallback == 'en'){
          return (
            <Container style={{backgroundColor:'#f2f2f2'}}>
              <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
                  <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
                  <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('SearchScreen:title')}</Text>
                  </ImageBackground>
               </View>
               {
            this.state.isCalendarVisible && <Calendar onModalClose={() => { this.setState({ isCalendarVisible: false }) }} getDates={(startDate, endDate) => {
              // console.log(`Start Date: ${startDate} --- End Date: ${endDate}`);
              this.handleOnfromandToDateChangeValue(startDate, endDate);
            }} />
          }
               <Content>
                {this._renderSegment()}
                {this._renderQuickSearchSelectValues()}
                {/* {this._renderSearchList()} */}
               </Content>
               </Container>
      );
        }else {
          return (
            <Container style={{backgroundColor:'#f2f2f2'}}>
              <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
                  <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
                  <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff', textAlign:'right'}}>{t('SearchScreen:title')}</Text>
                  </ImageBackground>
               </View>
               {
            this.state.isCalendarVisible && <Calendar onModalClose={() => { this.setState({ isCalendarVisible: false }) }} getDates={(startDate, endDate) => {
              // console.log(`Start Date: ${startDate} --- End Date: ${endDate}`);
              this.handleOnfromandToDateChangeValue(startDate, endDate);
            }} />
          }
               <Content>
                {this._renderSegment()}
                {this._renderQuickSearchSelectValues()}
                {/* {this._renderSearchList()} */}
               </Content>
               </Container>
      );
        }
        
   } else {
     if (config.fallback == 'en'){
      return (
        <Container style={{backgroundColor:'#f2f2f2'}}>
          <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
              <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('SearchScreen:title')}</Text>
              </ImageBackground>
           </View>
           {
            this.state.isAdvanceSearchFromToDateCalendaerVisible && <Calendar onModalClose={() => { this.setState({ isAdvanceSearchFromToDateCalendaerVisible: false }) }} getDates={(startDate, endDate) => {
              // console.log(`Start Date: ${startDate} --- End Date: ${endDate}`);
              this.handleOnAdvanceSearchfromandToDateChangeValue(startDate, endDate);
             
            }} />
          }
           {
            this.state.isAdvanceSearchReplyFromToDateCalendaerVisible && <Calendar onModalClose={() => { this.setState({ isAdvanceSearchReplyFromToDateCalendaerVisible: false }) }} getDates={(startDate, endDate) => {
              // console.log(`Start Date: ${startDate} --- End Date: ${endDate}`);
              this.handleOnAdvanceSearchReplyfromandToDateChangeValue(startDate, endDate);
             
            }} />
          }
           <Content>
            {this._renderSegment()}
            <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0, margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
                 <Picker style={{ marginTop:-5}}
                                                  mode="dropdown"
                                                  iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons"/>}
                                                  placeholderStyle={{ color: '#afafaf' }}
                                                  placeholderTextColor='#afafaf'
                                                  selectedValue={this.state.advancesearchType}
                                                  onValueChange={this.onValueAdvanceSearchTypeChange}
                                                  underlineColorAndroid = 'transparent'
                                               >
                                              <Picker.Item label="Correspondence" value="Correspondence" />
                                              <Picker.Item label="MOM" value="MOM" />
                                              <Picker.Item label="RFI" value="RFI" />
                                              </Picker>
              
                </View>
            {this._renderAdvanceSearchSelectValues()}
            
           </Content>
           </Container>
        );
     }else {
      return (
        <Container style={{backgroundColor:'#f2f2f2'}}>
          <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
              <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff', textAlign:'right'}}>{t('SearchScreen:title')}</Text>
              </ImageBackground>
           </View>
           {
            this.state.isAdvanceSearchFromToDateCalendaerVisible && <Calendar onModalClose={() => { this.setState({ isAdvanceSearchFromToDateCalendaerVisible: false }) }} getDates={(startDate, endDate) => {
              // console.log(`Start Date: ${startDate} --- End Date: ${endDate}`);
              this.handleOnAdvanceSearchfromandToDateChangeValue(startDate, endDate);
             
            }} />
          }
           {
            this.state.isAdvanceSearchReplyFromToDateCalendaerVisible && <Calendar onModalClose={() => { this.setState({ isAdvanceSearchReplyFromToDateCalendaerVisible: false }) }} getDates={(startDate, endDate) => {
              // console.log(`Start Date: ${startDate} --- End Date: ${endDate}`);
              this.handleOnAdvanceSearchReplyfromandToDateChangeValue(startDate, endDate);
             
            }} />
          }
           <Content>
            {this._renderSegment()}
            <View  style = {{ backgroundColor:'#f2f2f2',flexDirection:'column',justifyContent:'flex-start',margin:15,marginTop:0, margin:15, marginTop:0,borderWidth: 1,
          borderRadius:5,borderColor: 'gray', width:screenWidth-35, height: 35}}>
                 <Picker style={{ marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                                  mode="dropdown"
                                                  iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons"/>}
                                                  placeholderStyle={{ color: '#afafaf' }}
                                                  placeholderTextColor='#afafaf'
                                                  selectedValue={this.state.advancesearchType}
                                                  onValueChange={this.onValueAdvanceSearchTypeChange}
                                                  underlineColorAndroid = 'transparent'
                                               >
                                              <Picker.Item label="Correspondence" value="Correspondence" />
                                              <Picker.Item label="MOM" value="MOM" />
                                              <Picker.Item label="RFI" value="RFI" />
                                              </Picker>
              
                </View>
            {this._renderAdvanceSearchSelectValues()}
            
           </Content>
           </Container>
        );
     }
    
   }
  }
}

export default withNavigation (Search);
