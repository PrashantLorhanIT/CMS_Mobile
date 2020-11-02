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
    };
}

componentDidMount = () => {
  
  const userId = this.props.userProfile.ridUsermaster;
  this.props.getSenderAndRecipentList();
 
  if (this.props.correspondenceInbox.length == 0) {
   
    this.props.getCorrespondeceList(userId);
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

searchFilterRefernceNumberFunction = text => {    

  const newData = this.state.inMemorycorrespondenceData.filter(item => {   
    
    const itemData = `${item.correspondenceReferenceNumber.toUpperCase()} || ${item.subject.toUpperCase()} || ${item.workflowName.toUpperCase()}`
     const textData = text.toUpperCase();      
     return itemData.indexOf(textData) > -1;    
  });
  this.setState({
    correspondenceData: newData,
    search: text,
  });
}

filterFunction = (refernceNumber,subject, corrType, sender, recipent, overdue, fromdate, todate) => {    

  console.log('.................................................');
  console.log('Filter function array values', this.state.inMemorycorrespondenceData);
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
    return (
        <Content
            refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} title='Loading...' />}>
            {
              this.state.correspondenceData && this.state.correspondenceData.length > 0 ? this.state.correspondenceData.map((ele, index) => < CorrespondenceCard isCorrespondenceInbox = {
                 true
                }
                key = {
                 index
                }
                correspondence = {
                 ele
                }
                />): < Text style = {styles.noRecordsText} > No Record Found </Text >
            }
        </Content>
    );
//     return (
//             < FlatList
//             data = {
//               this.state.correspondenceData
//             }
//             extraData = {
//               this.state
//             }
//             refreshControl = {
//               <
//               RefreshControl
//               refreshing = {
//                 this.state.isRefreshing
//               }
//               onRefresh = {
//                 this.onRefresh.bind(this)
//               }
//               />
//             }
//             renderItem = {
//               ({
//                 item
//               }) => ( <
//                 CorrespondenceCard isCorrespondenceInbox = {
//                   true
//                 }
//                 correspondence = {
//                   item
//                 }
//                 /> 
//               )
//             }
//             keyExtractor = {
//               (item, index) => index.toString()
//             }
//             onEndReachedThreshold = {
//               0.4
//             }
//             onEndReached = {
//                 this.handleLoadMore.bind(this)
//             }
// / >
//     );
}

handleLoadMore = () => {
 const userId = this.props.userProfile.ridUsermaster;
 this.page = this.page + 1; // increase page by 1
 this.props.getCorrespondeceLoadMoreList(userId, this.page); // method for API call 

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
          {this._renderSearch()}
          {this._renderCard()}
        </Container>
      );
    }
    
  }
}

export default withNavigation(Correspondence);
