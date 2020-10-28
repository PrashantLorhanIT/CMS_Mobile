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
  import {TouchableOpacity} from 'react-native';
  import styles from './CorrespondenceCard.style';
  import { withNavigation } from 'react-navigation';
  import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14,FONT_FAMILY_PT_REGULAR } from '../../utils/styles/typography';
  import moment from 'moment';
  import * as config from '../../utils/localization/config/i18n';

  class CorrespondenceCard extends Component {

    constructor(props) {
      super(props);
      this.goToDetailScreen = this.goToDetailScreen.bind(this);  
    }
    _renderSeparator = () => {
      
        return (
            <View style={styles.seprator} />
        );
    }
    _renderSeparatorLine = () => {
      return (
          <View style={styles.sepratorLine} />
      );
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
  goToDetailScreen() {
       console.log('Correspondece details push method')
       console.log(this.props.correspondence);
       this.props.navigation.navigate('second',this.props.correspondence);
  }

    render() {

        if (config.fallback == 'en'){
          return (
            <TouchableOpacity onPress={() => this.goToDetailScreen()} >
          
                  <View style={{flexDirection:'row',marginLeft:10, marginRight:10,marginTop:10,backgroundColor:'white'}}>
                    <View style={styles.mainContainer}> 
                      <View style={styles.container}>
                       <View style={styles.userContainer}>
                         <Text style={styles.nameText}>{this.props.correspondence.correspondenceReferenceNumber}</Text>
                       </View>
                       <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{moment(this.props.correspondence.inboxlistDate).format('MMM DD, YYYY  HH:mm')}</Text>
                        </View>
                     </View>
                     <View style={{marginBottom:0,flexDirection:'column', marginTop:0}}>
                       <Text style={{fontSize:13, color: '#43425d',fontFamily:FONT_FAMILY_PT_REGULAR, marginTop:5,marginBottom:5,marginLeft:5}}>{this.props.correspondence.subject} </Text>
                       </View> 
                     <View style={styles.container}>
                       <View style={styles.userContainer}>
                         <Text style={styles.dateText}>{this.props.correspondence.workflowName ? this.props.correspondence.workflowName : ''}</Text>
                       </View>
                       <View style={styles.dateContainer}>
                        <Text style={styles.dateText}>{this.props.correspondence.senderFirstName ? this.props.correspondence.senderFirstName : ''} {this.props.correspondence.senderLastName ? this.props.correspondence.senderLastName : ''} </Text>
                        </View>
                     </View> 
                  {this.FlatListItemSeparator()}
                  </View>
                  </View>     
            </TouchableOpacity>
          );
        }else{
          return (
            <TouchableOpacity onPress={() => this.goToDetailScreen()} >
          
                  <View style={{flexDirection:'row',marginLeft:10, marginRight:10,marginTop:10,backgroundColor:'white'}}>
                    <View style={styles.mainContainer}> 
                      <View style={styles.containerArabic}>
                      <View style={styles.dateContainerArabic}>
                        <Text style={styles.dateText}>{moment(this.props.correspondence.inboxlistDate).format('MMM DD, YYYY  HH:mm')}</Text>
                        </View>
                       <View style={styles.userContainerArabic}>
                         <Text style={styles.nameText}>{this.props.correspondence.correspondenceReferenceNumber}</Text>
                       </View>
                      
                     </View>
                     <View style={{marginBottom:0,flexDirection:'column', marginTop:0}}>
                       <Text style={{fontSize:13, color: '#43425d',fontFamily:FONT_FAMILY_PT_REGULAR, marginTop:5,marginBottom:5,marginRight:5,textAlign:'right'}}>{this.props.correspondence.subject} </Text>
                       </View> 
                     <View style={styles.containerArabic}>
                        <View style={styles.dateContainerArabic}>
                        <Text style={styles.dateText}>{this.props.correspondence.senderFirstName ? this.props.correspondence.senderFirstName : ''} {this.props.correspondence.senderLastName ? this.props.correspondence.senderLastName : ''} </Text>
                        </View>
                       <View style={styles.userContainerArabic}>
                         <Text style={styles.dateText}>{this.props.correspondence.workflowName ? this.props.correspondence.workflowName : ''}</Text>
                       </View>
                       
                     </View> 
                  {this.FlatListItemSeparator()}
                  </View>
                  </View>     
            </TouchableOpacity>
          );
        }
        
       }
}

export default withNavigation (CorrespondenceCard);
