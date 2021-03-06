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
  Picker,
  Input,
  Right
} from 'native-base';
import SearchBar from 'react-native-search-bar';
import { SafeAreaView, Dimensions,ImageBackground, RefreshControl, FlatList, TouchableOpacity,Image,AsyncStorage} from 'react-native';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD, FONT_FAMILY_PT_REGULAR, FONT_SIZE_14} from '../../utils/styles/typography';

import styles from './Correspondence.style';
import CorrespondenceCard from '../../componets/correspondenceCard/CorrespondenceCard'
import HeaderTilte from '../../assets/image/headerTitle/HeaderTilte.jpg';
import { withNavigation } from 'react-navigation';
import { useDispatch } from 'react-redux';
import { setCorrespondenceInbox } from './Correspondence.Action';
//const dispatch = useDispatch();
import i18n, { t } from '../../utils/localization/servicesi18n/index';
import FilterModelPopup from './correspondenceFilter/CorrespondenceFilter';
const screenWidth = Dimensions.get("window").width;
import Calendar from '../../componets/calendar/Calendar';
import moment from 'moment';
import * as config from '../../utils/localization/config/i18n';

class Correspondence extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
       isRefreshing: false,
       search: '',
       correspondenceData: [],
       isFiltermodelVisible: false,
       fromDate:  new Date(),
       toDate:  new Date(),
       corrSender: '',
       corrRecipent: '',
       corrType: '',
       Overdue: '',
       isLoadingDisable: false,
       categoryType: 'Corr',
       categoryTypeName: 'Correspondence',
    };
}

componentDidMount = () => {
  
  const userId = this.props.userProfile.ridUsermaster;
  this.props.getSenderAndRecipentList();
 
  if (this.props.correspondenceInbox.length == 0) {
   
    this.props.getCorrespondeceList(userId, 'Corr');
    this.props.getInboxCount(userId);
      this.setState({
          isRefreshing: true,
          correspondenceData: this.props.correspondenceInbox,
          inMemorycorrespondenceData: this.props.correspondenceInbox
        });

    } else {
      this.setState({
          isRefreshing: false,
          correspondenceData: this.props.correspondenceInbox,
          inMemorycorrespondenceData: this.props.correspondenceInbox
      });
    }
}

static getDerivedStateFromProps = (nextProps, prevState) => {
  //console.log('getDerivedStateFromProps(nextProps, prevState)');
  //console.log(nextProps);
  if (nextProps.correspondenceInbox != 0 && prevState.isRefreshing) {
      return {
          isRefreshing: false,
          correspondenceData: nextProps.correspondenceInbox,
          inMemorycorrespondenceData: nextProps.correspondenceInbox
      }
  }
  if (nextProps.error) {
      return {
          error: nextProps.error
      }
  }
  return null;
}
onValueCorrSenderhange =(value) => {
  
  this.setState({
    corrSender: value
  }, () => this.searchFilterCorrSenderFunction(this.state.corrSender));
}
onValueCorrRecipentChange =(value) => {
  
  this.setState({
    corrRecipent: value
  }, () => this.searchFilterCorrRecipentFunction(this.state.corrRecipent));
}
onValueCorrTypeChange =(value) => {
  
  this.setState({
    corrType: value
  }, () => this.searchFilterCorrTypeFunction(this.state.corrType));
}
onValueOverdueChange =(value) => {
  
  this.setState({
    Overdue: value
  });
}

onRefresh = () => {
  console.log('onRefresh');
  const userId = this.props.userProfile.ridUsermaster;
  this.props.getCorrespondeceList(userId);
    this.setState({
      isRefreshing: true,
    });
}
storeCount = async (count) => {
  await AsyncStorage.setItem('InboxCount', count.toString());
 
 }
 removeCount = async (count) => {
  await AsyncStorage.removeItem('InboxCount');
 
 }
_renderCategoryCount =() => {
  console.log('Inbox total count', this.props.dashboardInboxCount);
  var arr = [{category:'Correspondence', value: this.props.dashboardInboxCount.correspondenceCount}];

 //var arr = [{category:'Correspondence', value: this.props.dashboardInboxCount.correspondenceCount},{category:'Task', value: this.props.dashboardInboxCount.taskCount},{category:'MOM', value: this.props.dashboardInboxCount.momCount},{category:'RFI', value: this.props.dashboardInboxCount.rfiCount}];
  if (this.state.categoryTypeName == 'Correspondence'){
    let counter = 0;
    for (const obj of this.props.correspondenceInbox) {
      if (obj.isNew === true) counter++;
    }    
   // var arr = [{category:'Correspondence', value: counter},{category:'Task', value: this.props.dashboardInboxCount.taskCount},{category:'MOM', value: this.props.dashboardInboxCount.momCount},{category:'RFI', value: this.props.dashboardInboxCount.rfiCount}];
    var arr = [{category:'Correspondence', value: counter}];

    const totalCount = counter + this.props.dashboardInboxCount.taskCount + this.props.dashboardInboxCount.momCount + this.props.dashboardInboxCount.rfiCount;
    this.removeCount();
    this.storeCount(totalCount);
   }
  //else if (this.state.categoryTypeName == 'Task') {
  //   let counter = 0;
  //   for (const obj of this.props.correspondenceInbox) {
  //     if (obj.isNew === true) counter++;
  //   }    
  //   var arr = [{category:'Correspondence', value: this.props.dashboardInboxCount.correspondenceCount},{category:'Task', value: counter},{category:'MOM', value: this.props.dashboardInboxCount.momCount},{category:'RFI', value: this.props.dashboardInboxCount.rfiCount}];
  //   const totalCount = this.props.dashboardInboxCount.correspondenceCount + counter + this.props.dashboardInboxCount.momCount + this.props.dashboardInboxCount.rfiCount;
  //   this.removeCount();
  //   this.storeCount(totalCount);
  // } else if  (this.state.categoryTypeName == 'MOM'){
  //   let counter = 0;
  //   for (const obj of this.props.correspondenceInbox) {
  //     if (obj.isNew === true) counter++;
  //   }    
  //   var arr = [{category:'Correspondence', value: this.props.dashboardInboxCount.correspondenceCount},{category:'Task', value: this.props.dashboardInboxCount.taskCount},{category:'MOM', value: counter},{category:'RFI', value: this.props.dashboardInboxCount.rfiCount}];
  //   const totalCount = this.props.dashboardInboxCount.correspondenceCount + this.props.dashboardInboxCount.taskCount + counter + this.props.dashboardInboxCount.rfiCount;
  //   this.removeCount();
  //   this.storeCount(totalCount);
  // } else if (this.state.categoryTypeName == 'RFI') {
    // let counter = 0;
    // for (const obj of this.props.correspondenceInbox) {
    //   if (obj.isNew === true) counter++;
    // }    
    // var arr = [{category:'Correspondence', value: this.props.dashboardInboxCount.correspondenceCount},{category:'Task', value: this.props.dashboardInboxCount.taskCount},{category:'MOM', value: this.props.dashboardInboxCount.momCount},{category:'RFI', value: counter}];
    // const totalCount = this.props.dashboardInboxCount.correspondenceCount + this.props.dashboardInboxCount.taskCount + this.props.dashboardInboxCount.momCount + counter;
    // this.removeCount();
    // this.storeCount(totalCount);
  // }
  if (config.fallback == 'en') {
    return(
      <View style={{margin:5, backgroundColor:'white',flexDirection:'row',height:35}}>
        <Text style={{fontSize:18, fontFamily:FONT_FAMILY_PT_BOLD, marginLeft:10,textAlign:'center', alignSelf:'center'}}>Category</Text>
     <View  style = {{ backgroundColor:'white',flexDirection:'column',justifyContent:'flex-start',marginTop:0,borderWidth: 1,
            borderRadius:5,borderColor: 'gray',marginLeft:10, marginRight:10, height: 35, width: '70%'}}>
              
              <Picker style={{marginTop:-5, width: screenWidth -140}}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                                placeholderStyle={{ color: '#afafaf',fontFamily:FONT_FAMILY_PT_REGULAR, fontSize: FONT_SIZE_14 }}
                                                placeholderTextColor='#afafaf'
                                                //placeholder= {t('DashboardScreeen:Recipient')}
                                                note={false}
                                                selectedValue={this.state.categoryTypeName}
                                                onValueChange={this.onIncategoryTypeChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                               {/* <Picker.Item color={'gray'} label= {t('DashboardScreeen:Recipient')} value={-1} key={-1} /> */}
                                               
                                           { arr && arr.map((car, index) => {
         return (
    <Picker.Item label= {`${car.category} (${car.value})`} value={car.category} key={index} />
    );
    })}
                                            </Picker>
                                            </View>
  </View>
    );
  } else {
    return(
      <View style={{margin:5, backgroundColor:'#f2f2f2',flexDirection:'row',height:50}}>
    <SearchBar  style={{flex:1,textAlign:'right', flexDirection:'row-reverse'}}
    ref="SearchBar"
    placeholder= {t('InboxScreen:SearchReferenceNumber')}
    autoCorrect={false}             
    onChangeText={text => this.searchFilterRefernceNumberFunction(text)}
    value={this.state.search}
   // textAlign= 'right'
    />
  </View>
    );
  }
}

_renderSearch =() => {
  if (config.fallback == 'en'){
    return(
      <View style={{margin:5, backgroundColor:'#f2f2f2',flexDirection:'row',height:50}}>
    <SearchBar  style={{flex:1, justifyContent:'flex-start'}}
    ref="SearchBar"
    placeholder= {t('InboxScreen:SearchReferenceNumber')}
    autoCorrect={false}             
    onChangeText={text => this.searchFilterRefernceNumberFunction(text)}
    value={this.state.search}
    />
    <Button style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD, width:70,height:30,justifyContent:'flex-end',alignContent:'center',alignSelf:'center',margin:5,backgroundColor:'#a62032'}} onPress={() => { this.handleFilterTap()}}><Text uppercase={false} >{t('InboxScreen:Filter')}</Text></Button>
  </View>
    );
  } else {
    return(
      <View style={{margin:5, backgroundColor:'#f2f2f2',flexDirection:'row',height:50}}>
       <Button style={{fontSize:15,fontFamily:FONT_FAMILY_PT_BOLD, width:70,height:30,justifyContent:'flex-end',alignContent:'center',alignSelf:'center',margin:5,backgroundColor:'#a62032'}} onPress={() => { this.handleFilterTap()}}><Text uppercase={false} >{t('InboxScreen:Filter')}</Text></Button>

    <SearchBar  style={{flex:1,textAlign:'right', flexDirection:'row-reverse'}}
    ref="SearchBar"
    placeholder= {t('InboxScreen:SearchReferenceNumber')}
    autoCorrect={false}             
    onChangeText={text => this.searchFilterRefernceNumberFunction(text)}
    value={this.state.search}
   // textAlign= 'right'
    />
  </View>
    );
  }
}
search = text => {
  console.log(text);
};
clear = () => {
  this.search.clear();
};

onIncategoryTypeChange = (value) => {
  // if (value != -1) {
    console.log(value);
    const userId = this.props.userProfile.ridUsermaster;
       if (value == 'Correspondence'){
        this.setState({  
          categoryType: 'Corr',
          categoryTypeName: 'Correspondence'
        },() => this.props.getCorrespondeceList(userId, 'Corr'));
       } else if (value == 'Task'){
        this.setState({  
          categoryType: 'Task',
          categoryTypeName: 'Task'
        }, () => this.props.getCorrespondeceList(userId, 'Task'));
       } else if (value == 'MOM'){
        this.setState({  
          categoryType: 'Mom',
          categoryTypeName: 'MOM'
        }, () => this.props.getCorrespondeceList(userId, 'Mom'));
       } else if(value == 'RFI') {
        this.setState({  
          categoryType: 'Rfi',
          categoryTypeName: 'RFI'
        }, () => this.props.getCorrespondeceList(userId, 'Rfi'));
       }
        
  //}
}
searchFilterRefernceNumberFunction = text => {    
 let flag =  false;
   if (text){
     flag = true
   }
  const newData = this.state.inMemorycorrespondenceData.filter(item => {   
    
    const itemData = `${item.correspondenceReferenceNumber.toUpperCase()} || ${item.subject.toUpperCase()} || ${item.workflowName.toUpperCase()}`
     const textData = text.toUpperCase();      
     return itemData.indexOf(textData) > -1;    
  });
  this.setState({
    correspondenceData: newData,
    search: text,
    isLoadingDisable: flag,
  });
}

filterFunction = (refernceNumber,subject, corrType, sender, recipent, overdue, fromdate, todate) => {    
  let flag =  false;
  if (refernceNumber || subject  || sender || recipent || fromdate || todate){
    flag = true
  }
  
    const selectedFromDate = moment(fromdate).format('yyyy-MM-DD');
    const selectedToDate = moment(todate).format('yyyy-MM-DD');

    const newData = this.state.inMemorycorrespondenceData.filter(item => {

    const itemDataCorrType = `${item.workflowName}`
    const itemDataSender = `${item.senderEntityID}`;
    const itemDataRecipent = `${item.recipientEntityID}`;
    const itemDataReferenceNumber = `${item.correspondenceReferenceNumber}`
    const itemDataSubject = `${item.subject}`
    const date = moment(item.inboxlistDate).format('yyyy-MM-DD');
      if (refernceNumber && itemDataReferenceNumber.includes(refernceNumber)){
            return true
      } else if (subject && itemDataSubject.includes(subject)){
            return true
      } else if (corrType != '' && itemDataCorrType.includes(corrType)){
            return true
      } else if  ( sender && itemDataSender.includes(`${sender}`)) {
          return true
      } else if (recipent && itemDataRecipent.includes(`${recipent}`)) {
        return true
      } else if ( selectedFromDate && date >= selectedFromDate && date <= selectedToDate){
        return true
      } else {
        return false
      }
  });
  this.setState({
    correspondenceData: newData,
    //isLoadingDisable: flag,
  });
}


FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#DCDCDC",
        marginTop:10
      }}
    />
  );
}

handleFilterTap = () => {
  this.setState((state) => {
    return {
      isFiltermodelVisible: true,
    };
  });
}

_renderCard =() => {
//   return (
//     <Content
//         refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} title='Loading...' />}>
//         {
//           this.state.correspondenceData && this.state.correspondenceData.length > 0 ? this.state.correspondenceData.map((ele, index) => < CorrespondenceCard isCorrespondenceInbox = {true} key = {index} correspondence = {ele} setUpdateCorrepondenceRecord = {this.props.setUpdateCorrepondenceRecord} />): < Text style = {styles.noRecordsText} > No Record Found </Text >
//         }
//     </Content>
// );
    return (
      this.state.correspondenceData &&   this.state.correspondenceData ?< FlatList data = { this.state.correspondenceData} extraData = {this.state} refreshControl = { <RefreshControl refreshing = { this.state.isRefreshing } onRefresh = { this.onRefresh.bind(this) } />} renderItem = { ({ item }) => ( < CorrespondenceCard isCorrespondenceInbox = { true } correspondence = {  item }  setUpdateCorrepondenceRecord = {this.props.setUpdateCorrepondenceRecord} />) } keyExtractor = { (item, index) => index.toString() } onEndReached = { this.handleLoadMore.bind(this)} /> :  < Text style = {styles.noRecordsText} > No Record Found </Text >
    );
}

handleLoadMore = () => {

  if (this.state.isLoadingDisable == false){
    const userId = this.props.userProfile.ridUsermaster;
    this.page = this.page + 1; // increase page by 1
    let pageSize = this.calculatePageSize();
    console.log('Total Page Size', pageSize);
    if (pageSize > this.page){
     this.props.getCorrespondeceLoadMoreList(userId, this.page, this.state.categoryType);
    }
  }
  // method for API call
};
calculatePageSize = () => {
  return this.props.correspondenceInboxCount / 100;
}; 
handleOnSearchfromandToDateChangeValue(fromDates, toDates) { 
  console.log('Indise Calendar before method');
   const selectedFromDate = moment(fromDates).format('MMM DD, YYYY');
   const selectedToDate = moment(toDates).format('MMM DD, YYYY');

   this.setState({
    fromDate: selectedFromDate,
    toDate: selectedToDate,
  });    
}
 
componentDidUpdate(prevProps, prevState) {
  // only update chart if the data has changed
  if (prevProps.correspondenceInbox !== this.props.correspondenceInbox) {
    this.setState({
      correspondenceData: this.props.correspondenceInbox
    })
  }
}
// componentWillReceiveProps () {
//   this.setState({
//     }, () => console.log('correspondence render method count',this.props.correspondenceInbox.length));

// }
  render() {
    const { isFiltermodelVisible } = this.state;
    if(config.fallback == 'en'){
      return (
        <Container>
          {
            isFiltermodelVisible && <FilterModelPopup senderAndRecipent = {this.props.cooreSenderAndRecipent} onModalClose={() => { this.setState({ isFiltermodelVisible: false }) }} getFilterValues={(refernceNumber, subject, corrType, sender, recipent, overdue, fromdate, todate) => {
              console.log('filter vaues',refernceNumber,subject, corrType, sender, recipent, overdue, fromdate, todate);
              this.filterFunction(refernceNumber,subject, corrType, sender, recipent, overdue, fromdate, todate);               
            }} /> 
          }
          <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
           <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
        <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('InboxScreen:title')}</Text>
            </ImageBackground>
           </View>
           {this._renderCategoryCount()}
          {this._renderSearch()}
          {this._renderCard()}
        </Container>
      );
    }else {
      return (
        <Container>
          {
            isFiltermodelVisible && <FilterModelPopup senderAndRecipent = {this.props.cooreSenderAndRecipent} onModalClose={() => { this.setState({ isFiltermodelVisible: false }) }} getFilterValues={(refernceNumber, subject, corrType, sender, recipent, overdue, fromdate, todate) => {
              console.log('filter vaues',refernceNumber,subject, corrType, sender, recipent, overdue, fromdate, todate);
              this.filterFunction(refernceNumber,subject, corrType, sender, recipent, overdue, fromdate, todate);               
            }} /> 
          }
          <View style={{marginTop:-1, marginLeft:0, marginRight:0, width:'100%', height:50, flexDirection:'column'}}>
           <ImageBackground source={HeaderTilte} style={{width:'100%', height:50}} >
        <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:14, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('InboxScreen:title')}</Text>
            </ImageBackground>
           </View>
          {this._renderCategoryCount()}
          {this._renderSearch()}
          {this._renderCard()}
        </Container>
      );
    }
    
  }
}

export default withNavigation(Correspondence);
