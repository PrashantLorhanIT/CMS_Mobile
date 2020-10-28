import React, { useState } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions, Alert,TouchableOpacity, ScrollView} from 'react-native';
import { Container, Content, Button, Text, Icon, Input, Label, Textarea,Picker, CardItem, Header, List, ListItem, Left, Right,Body, Separator, Title} from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD,FONT_FAMILY_PT_REGULAR } from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { BlurView } from "@react-native-community/blur";
import { Card } from 'react-native-elements';
import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../../redux/index';
import { constants } from '../../../utils/constants/constants';
import { Reachability } from '../../../services/netInfo/Rechability';
import axios from 'axios'
import Loader from '../../../componets/loder/Loader';
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import * as config from '../../../utils/localization/config/i18n';

const CorrespondenceForwordPopup = (props) => {

   console.log('Correspondence Details forword props');
   console.log(props.userMasterData);
   const [visible, setVisible] = useState(true);
   const [userMasterIds, setuserMasterIds] = useState([]);
   const [comment, setcomment] =  useState('');
   const [ isUserModalVisible, setisUserModalVisible] = useState(false);
  //  const masterIds = [],
   const onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
        props.getForwardDetailsRefreshValues(false);
    };

    const onButtonClick = () => {
      props.onModalClose(); 
      setVisible(false);
      props.getForwardDetailsRefreshValues(true);
    };
     const onButtonSubmitClick = () => {
      var length = userMasterIds.length;
      userMasterIds.map(id =>{
        const userId = props.userId;
        const toUserID = userMasterIds; 
        const workFlowTransactionId = props.workFTID;
        const comments = comment
        const token = props.token
        submitCorrespondenceDetailForward(userId, toUserID,workFlowTransactionId,comments, token);
        --length;
        if(length == 0){
          alertWithMessage("Forwarded sucessfully");
        }
         });
      };

    //   onUserMasterChange = (value) => {
    //         setuserMasterId(value);
    // }

   const onUserMasterChange =(user) => {
     
        if (userMasterIds.length != 0 && userMasterIds.find(id => id === user.ridUsermaster)) {
           let  updatedUserMasters = userMasterIds
         //  updatedUserMasters.pop(user.ridUsermaster)
           updatedUserMasters.splice(updatedUserMasters.indexOf(user.ridUsermaster), 1);
           setuserMasterIds([...updatedUserMasters])
        } else {
          if (userMasterIds.length == 0){
            setuserMasterIds([user.ridUsermaster])
           } else {   
            setuserMasterIds([...userMasterIds, user.ridUsermaster])
           }
        }
  };
   
   const submitCorrespondenceDetailForward =  (userid, toUserID, wftId, comment, token) => {
      console.log('Correspondence details Action method  Approve');
      // return async (dispatch) => {
          try {
            const params = {
              byUserId: userid,
              toUserId:toUserID,
              workflowtransactionID:wftId,
              comments :comment
          }

              console.log('Parameter in Correspondence Details forward');
              console.log(params);
              // <Loader isLoading = {true} />
              axios.post(`${constants.webService.baseURL}${constants.webService.methods.common.correspondenceForward}`, params, axios.defaults.headers.Authorization = `Bearer ${token}`)
              .then(res => {
                console.log('Correspondence Details Delegate response inside');
                  console.log(res);
                  console.log(res.data.statusCode)
                  if (res.data.statusCode == "200") {
                   
                   // alertWithMessage("Forwarded sucessfully");
                    
                  }   
                  
              })
              .catch(error => console.log(error));
              alertWithMessage(error);
              
          } catch (error) {
              //dispatch(isAppLoading(false));
          }
    //  }
  }
  
 const alertWithMessage = (message) =>
      Alert.alert(
          "",
          
          message,
          [
              { text: "OK", onPress: () => {onButtonClick()} }
          ],
          
          { cancelable: false }
      );
      console.log('Selected user finaly');
      console.log(userMasterIds);
  // }
  if (config.fallback == 'en'){
    return(
      <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
          {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
             <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
             <ScrollView>
                 <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                      <View style={{marginTop:200,width:screenWidth-40, height:360,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                      <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                              <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('InboxScreen:Forward')}</Text>
                              </ImageBackground>
                              </View>
                              <View style={{paddingTop:0,backgroundColor:'white',marginBottom:50}}>
                                 <Text style={{fontSize:14,margin:10,marginTop:0,marginBottom:0,marginLeft:25,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Pleaseselectforward')}</Text>
                                 <View style={{margin:5,height:65,marginTop:0}}>
                                 <Card>
                                   <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', paddingRight:5,height:60 }} onPress={() => { setisUserModalVisible(true) }}>
                                     <View style={{flex:1, flexDirection:'row',justifyContent: 'space-evenly',alignContent: 'flex-start', flexShrink:1, flexWrap: 'wrap',height:60}}>
                                     <Content>
                                       <List>
                                     {
                                     
                                     userMasterIds.length > 0 ? props.userMasterData.map((user, index) => {
                                   if (userMasterIds.find((id) => id === user.ridUsermaster)) {
                                     
                                     console.log(user);
                                    return (
                                    
                                      <Label style={{fontSize: 13,height:15,marginLeft:0,marginRight:15,fontFamily:FONT_FAMILY_PT_REGULAR,color:'black'}}>{`${user.firstname} ${user.lastname}`}</Label> 
                                     
                                      );
                                      }  else{
                                    return null
                                    }    
                                   }) :
                                   <Label style={{fontSize: 15, marginRight:15,fontFamily:FONT_FAMILY_PT_REGULAR,color:'black' }} >{t('InboxScreen:Selectusers')}</Label>
                                  }
                                  </List>
                                   </Content> 
                                  </View>
                                  <View >
                                  <Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:25}}/>

                                  </View>
                                   
                                 </TouchableOpacity>
                                 <CardItem style={{marginLeft:-10,marginBottom:0}}> 
                                 <Modal
                                    animationType={"slide"}
                                   visible={isUserModalVisible}
                                   onRequestClose={() => { setisUserModalVisible(false) }}
                                >
                          <Container>
                              <Header style={{backgroundColor:'#aa182c'}}>
                                  <Left>
                                      <Button transparent onPress={() => { setisUserModalVisible(false)}}>
                                        {/* // <Text style={{paddingLeft:20}}>Back</Text> */}
                                         <Icon name='arrow-back' type= 'MaterialIcons'/>
                                      </Button>
                                  </Left>
                                  <Body>
                                      <Title>{t('InboxScreen:Selectusers')}</Title>
                                  </Body>
                                  <Right>
                                      <Button transparent onPress={() => { setisUserModalVisible(false) }}>
                                          <Icon name='check' type= 'MaterialIcons'/>
                                      </Button>
                                  </Right>
                              </Header>
                              <Content>
                                  <List>
                                      {
                                          props.userMasterData && props.userMasterData.map((user, index) => {
                                            let selected =  userMasterIds.length > 0 && userMasterIds.find((id) => id === user.ridUsermaster) ? true : false;
                                              return (
                                                <ListItem selected={selected} key={index} onPress={() => onUserMasterChange(user)}>
                                                    
                                                      <Left>
                                                          <Text>{`${user.firstname} ${user.lastname}`}</Text>          
                                                      </Left>
                                                      <Right>
                                                          <Icon active={selected} name="checkmark" />
                                                      </Right>
                                                  </ListItem>
                                              )
                                              
                                          })
                                      }
                                  </List>
                              </Content>
                          </Container>
                       </Modal>
                       </CardItem>
                       </Card>
                               </View>
                                   <View style={{margin:5,marginLeft:20,marginRight:20,height:30,marginTop:65}}>
                                     {/* <Textarea style={{height:50}} rowSpan={4} bordered placeholder="Comments"  /> */}
                                     <Textarea style={{height:70,fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:14}} spellCheck="false" rowSpan={4} bordered placeholder={t('InboxScreen:Comments')} type="text" value={comment} onChangeText={(value) => { setcomment(value) }}  />
                                   </View>
                              </View>
                               <View style={{marginTop:10, flexDirection:'row',justifyContent:'space-between'}}>
                                  <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                   <Text uppercase={false} style={{fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
                                  </Button>
                                   <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonSubmitClick() }}>
                                  <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Submit')}</Text>
                                   </Button>
                              </View> 
                              </View>
           </Container>
           </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  }else {
    return(
      <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
          {/* <BlurView style={{position: 'absolute', top: 0,left: 0, height: '100%',width: '100%'}} blurType='light' blurRadius={1} /> */}
             <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
             <ScrollView>
                 <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.5)', paddingTop:0}} >
                      <View style={{marginTop:200,width:screenWidth-40, height:360,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                      <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                              <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                              <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('InboxScreen:Forward')}</Text>
                              </ImageBackground>
                              </View>
                              <View style={{paddingTop:0,backgroundColor:'white',marginBottom:50}}>
                                 <Text style={{fontSize:14,margin:10,marginTop:0,marginBottom:0,marginRight:25,fontFamily:FONT_FAMILY_PT_REGULAR,textAlign:'right'}}>{t('InboxScreen:Pleaseselectforward')}</Text>
                                 <View style={{margin:5,height:65,marginTop:0}}>
                                 <Card>
                                   <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'flex-start', paddingRight:5,height:60 }} onPress={() => { setisUserModalVisible(true) }}>
                                   <Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:25}}/>

                                     <View style={{flex:1, flexDirection:'row',justifyContent: 'space-evenly',alignContent: 'flex-start', flexShrink:1, flexWrap: 'wrap',height:60}}>
                                     <Content>
                                       <List>
                                     {
                                     
                                     userMasterIds.length > 0 ? props.userMasterData.map((user, index) => {
                                   if (userMasterIds.find((id) => id === user.ridUsermaster)) {
                                     
                                     console.log(user);
                                    return (
                                    
                                      <Label style={{fontSize: 13,height:15,marginRight:0,marginLeft:15,fontFamily:FONT_FAMILY_PT_REGULAR,color:'black',textAlign:'right'}}>{`${user.firstname} ${user.lastname}`}</Label> 
                                     
                                      );
                                      }  else{
                                    return null
                                    }    
                                   }) :
                                   <Label style={{fontSize: 15, marginRight:15,fontFamily:FONT_FAMILY_PT_REGULAR,color:'black',textAlign:'right' }} >{t('InboxScreen:Selectusers')}</Label>
                                  }
                                  </List>
                                   </Content> 
                                  </View>
                                  <View >

                                  </View>
                                   
                                 </TouchableOpacity>
                                 <CardItem style={{marginLeft:-10,marginBottom:0}}> 
                                 <Modal
                                    animationType={"slide"}
                                   visible={isUserModalVisible}
                                   onRequestClose={() => { setisUserModalVisible(false) }}
                                >
                          <Container>
                              <Header style={{backgroundColor:'#aa182c'}}>
                                  <Left>
                                      <Button transparent onPress={() => { setisUserModalVisible(false)}}>
                                         <Text>Back</Text>
                                      </Button>
                                  </Left>
                                  <Body>
                                      <Title>{t('InboxScreen:Selectusers')}</Title>
                                  </Body>
                                  <Right>
                                      <Button transparent onPress={() => { setisUserModalVisible(false) }}>
                                          <Icon name='check' type= 'MaterialIcons'/>
                                      </Button>
                                  </Right>
                              </Header>
                              <Content>
                                  <List>
                                      {
                                          props.userMasterData && props.userMasterData.map((user, index) => {
                                            console.log('USer Master drop dwon')

                                            let selected =  userMasterIds.length > 0 && userMasterIds.find((id) => id === user.ridUsermaster) ? true : false;
                                              
                                               
                                              
                                              return (
                                                <ListItem selected={selected} key={index} onPress={() => onUserMasterChange(user)}>
                                                    
                                                      <Left>
                                                          <Text>{`${user.firstname} ${user.lastname}`}</Text>          
                                                      </Left>
                                                      <Right>
                                                          <Icon active={selected} name="checkmark" />
                                                      </Right>
                                                  </ListItem>
                                              )
                                              
                                          })
                                      }
                                  </List>
                              </Content>
                          </Container>
                       </Modal>
                       </CardItem>
                       </Card>
                               </View>
                                   <View style={{margin:5,marginLeft:20,marginRight:20,height:30,marginTop:65}}>
                                     {/* <Textarea style={{height:50}} rowSpan={4} bordered placeholder="Comments"  /> */}
                                     <Textarea style={{height:70,fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:14,textAlign:'right'}} spellCheck="false" rowSpan={4} bordered placeholder={t('InboxScreen:Comments')} type="text" value={comment} onChangeText={(value) => { setcomment(value) }}  />
                                   </View>
                              </View>
                               <View style={{marginTop:10, flexDirection:'row',justifyContent:'space-between'}}>
                               <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonSubmitClick() }}>
                                  <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Submit')}</Text>
                                   </Button>

                                  <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                   <Text uppercase={false} style={{fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
                                  </Button>
                                   
                              </View> 
                              </View>
           </Container>
           </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  }
      
      
}

export default CorrespondenceForwordPopup;
