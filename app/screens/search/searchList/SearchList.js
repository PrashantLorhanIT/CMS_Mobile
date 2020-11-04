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
import SearchBar from 'react-native-search-bar';
import { SafeAreaView, Dimensions, ImageBackground, RefreshControl, FlatList } from 'react-native';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD, FONT_FAMILY_PT_REGULAR, FONT_SIZE_14} from '../../../utils/styles/typography';
import HeaderTilte from '../../../assets/image/headerTitle/HeaderTilte.jpg';
import { withNavigation } from 'react-navigation';
import SearchCard from '../../../componets/searchCard/SearchCard';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import moment from 'moment';

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
       correspondenceData: [],  
    };
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

componentDidMount = () => {
  console.log('Search List Hedertitle');
    this.props.navigation.setParams({
      title: `${this.props.navigation.state.params.searchType} ${t('SearchScreen:SearchResults')}` 
    });
    var navigationOptions = ({ navigation }) => ({
      title: navigation.state.params ==='undefined' || navigation.state.params.title === 'undefined' ? 'Home': navigation.state.params.title
   });
  // this.props.navigation.state.params.searchData.sort((a, b) =>{
  //   return  moment(b.rfidate).format('MMM DD, YYYY') <  moment(a.rfidate).format('MMM DD, YYYY');
   
  // })
    const soert =  this.props.navigation.state.params.searchData.sort((a,b) => moment(b.rfidate).format('MMM DD, YYYY') >  moment(a.rfidate).format('MMM DD, YYYY'));
    console.log('Sorting data for search', soert);
  // this.setState({ contacts: data })
     ///  .then(data => this.setState({ contacts: data }));
}
_renderCard =() => {
    return (
            <Content style={{marginTop:10, marginLeft:0, marginRight:5}} >
            {
              this.props.navigation.state.params.searchData && this.props.navigation.state.params.searchData.length > 0 ? this.props.navigation.state.params.searchData.map((ele, index) => <SearchCard searchType ={this.props.navigation.state.params.searchType} key={index} searchData={ele} />) : <Text style={styles.noRecordsText}>No Record Found</Text>
            }
          </Content>
    );
//     return (
//       < FlatList
//       data = {
//         this.state.correspondenceData
//       }
//       extraData = {
//         this.state
//       }
//       refreshControl = {
//         <
//         RefreshControl
//         refreshing = {
//           this.state.isRefreshing
//         }
//         onRefresh = {
//           this.onRefresh.bind(this)
//         }
//         />
//       }
//       renderItem = {
//         ({
//           item
//         }) => ( <
//           CorrespondenceCard isCorrespondenceInbox = {
//             true
//           }
//           correspondence = {
//             item
//           }
//           /> 
//         )
//       }
//       keyExtractor = {
//         (item, index) => index.toString()
//       }
//       // onEndReachedThreshold = {
//       //   0.4
//       // }
//       onEndReached = {
//           this.handleLoadMore.bind(this)
//       }
// / >
// );
}

  render() {
  // console.log('Search List searchType name');
  // console.log(this.props.navigation.state.params);
    return (
      // <SafeAreaView>
      <Container style={{backgroundColor:'#f3f2f2'}}>
        {this._renderCard()}
      </Container>
      // </SafeAreaView>
    );
  }
}

export default withNavigation(SearchList);
