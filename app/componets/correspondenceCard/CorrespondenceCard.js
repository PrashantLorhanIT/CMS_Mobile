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
  import {TouchableOpacity,Image} from 'react-native';
  import styles from './CorrespondenceCard.style';
  import { withNavigation } from 'react-navigation';
  import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14,FONT_FAMILY_PT_REGULAR } from '../../utils/styles/typography';
  import moment from 'moment';
  import * as config from '../../utils/localization/config/i18n';
  import attachment from '../../assets/image/attchment/attachment.png';


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
    if (this.props.correspondence.isNew == true){
      this.props.setUpdateCorrepondenceRecord(this.props.correspondence.ridInOutCorr);
      this.props.navigation.navigate('second',this.props.correspondence);
    } else {
      this.props.navigation.navigate('second',this.props.correspondence);
    }
  }

    render() {

        if (config.fallback == 'en') {
          if (this.props.correspondence.isNew == true) {
            return (
              <TouchableOpacity onPress={() => this.goToDetailScreen()} >
            
                    <View style={{flexDirection:'row',marginLeft:10, marginRight:10,marginTop:2,backgroundColor:'white'}}>
                      <View style={styles.mainContainerNew}> 
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
                           { this.props.correspondence.isDocumentUploaded == "Y" && 
                          <Image source={attachment} style={{width:25,height:25,marginLeft:0, marginRight:10}}/>
                           }
                          </View>
                       </View> 
                           <View style={{flexDirection:'row',marginLeft:5, marginRight:10,marginTop:2}}>
                          <Text style={styles.dateText}>{this.props.correspondence.senderFirstName ? this.props.correspondence.senderFirstName : ''} {this.props.correspondence.senderLastName ? this.props.correspondence.senderLastName : ''} </Text>
                          </View>
                          
                    {this.FlatListItemSeparator()}
                    </View>
                    </View>     
              </TouchableOpacity>
            );
          } else {
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
                         { this.props.correspondence.isDocumentUploaded == "Y" && 
                          <Image source={attachment} style={{width:25,height:25,marginLeft:0, marginRight:10}}/>
                         }
                          </View>
                       </View> 
                           <View style={{flexDirection:'row',marginLeft:5, marginRight:10,marginTop:2}}>
                          <Text style={styles.dateText}>{this.props.correspondence.senderFirstName ? this.props.correspondence.senderFirstName : ''} {this.props.correspondence.senderLastName ? this.props.correspondence.senderLastName : ''} </Text>
                          </View>
                    {this.FlatListItemSeparator()}
                    </View>
                    </View>     
              </TouchableOpacity>
            );
          }  
        }else{
          if (this.props.correspondence.isNew == true){
            return (
              <TouchableOpacity onPress={() => this.goToDetailScreen()} >
            
                    <View style={{flexDirection:'row',marginLeft:10, marginRight:10,marginTop:3,backgroundColor:'white'}}>
                      <View style={styles.mainContainerNew}> 
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
          } else {
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
}

export default withNavigation (CorrespondenceCard);
