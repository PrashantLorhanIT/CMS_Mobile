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
        
  import {TouchableOpacity,Dimensions,Image, ActivityIndicator} from 'react-native';
  import { withNavigation } from 'react-navigation';
  import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14,FONT_FAMILY_PT_REGULAR } from '../../utils/styles/typography';
  import attachment from '../../assets/image/attchment/attachment.png';
  import moment from 'moment';
  import DocumentViewerPopup from '../correspondencePopup/correspondenceDocmentViewerPopup/CorrespondenceDocumentViewer';
  const screenWidth = Dimensions.get("window").width;
  import * as config from '../../utils/localization/config/i18n';

  class CorrespondenceAttachmentCard extends Component {

    constructor(props) {
      super(props);
      console.log('CorrespondenceAttachmentCard card props');
      console.log(this.props);
      this.state ={
        isDocumentViewerModelVisible: false,
       
      }
    }
    hideSpinner() {
      this.setState({ visible: false });
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
  goToDocumentViererScreen = () => {
    this.setState((state) => {
      return {
        isDocumentViewerModelVisible: true,
      };
    });
  }

    render() {
      const {isDocumentViewerModelVisible } = this.state;
     // documentViewerUrl ={}
     if(config.fallback == 'en'){
      return (
        <TouchableOpacity onPress={() => this.goToDocumentViererScreen()} >
          {
          isDocumentViewerModelVisible && <DocumentViewerPopup  documentUrl={this.props.correspondenceAttachment.documentumid && this.props.correspondenceAttachment.documentumid} documentName={this.props.correspondenceAttachment.attachedfilename && this.props.correspondenceAttachment.attachedfilename} onModalClose={() => { this.setState({ isDocumentViewerModelVisible: false }) }} /> 
         } 
       <Card style={{width:screenWidth/2,margin:10}}>
          <CardItem >  
            <Body  >
              <View style={{flexDirection:'row',marginLeft:10, marginRight:10,backgroundColor:'white',justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                <Image source={attachment} style={{width:30,height:30,marginLeft:0, marginRight:10}}/>
               <Text style={{fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR,alignItems:'center'}}>{this.props.correspondenceAttachment.attachedfilename && this.props.correspondenceAttachment.attachedfilename}</Text>
              </View>   
            </Body>
          </CardItem>
        </Card>
        </TouchableOpacity>

      );
     } else {
        return (
          <TouchableOpacity onPress={() => this.goToDocumentViererScreen()} >
            {
            isDocumentViewerModelVisible && <DocumentViewerPopup  documentUrl={this.props.correspondenceAttachment.documentumid && this.props.correspondenceAttachment.documentumid} documentName={this.props.correspondenceAttachment.attachedfilename && this.props.correspondenceAttachment.attachedfilename} onModalClose={() => { this.setState({ isDocumentViewerModelVisible: false }) }} /> 
           } 
         <Card style={{width:screenWidth/2,margin:10}}>
            <CardItem >  
              <Body  >
                <View style={{flexDirection:'row',marginLeft:10, marginRight:0,backgroundColor:'white',justifyContent:'center',alignItems:'flex-end',alignContent:'flex-end'}}>
                 <Text style={{fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR,alignItems:'center',flexWrap: 'wrap', flexShrink:1}}>{this.props.correspondenceAttachment.attachedfilename && this.props.correspondenceAttachment.attachedfilename}</Text>
                 <Image source={attachment} style={{width:30,height:30,marginLeft:10, marginRight:0}}/>
                </View>   
              </Body>
            </CardItem>
          </Card>
          </TouchableOpacity>

        );
          }
    }
}

export default withNavigation (CorrespondenceAttachmentCard);
