import React, { useReducer, useState } from 'react';
import { View, SafeAreaView, Image, Modal, ImageBackground, Dimensions,Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Text, Icon, Label, Textarea , Picker, Input} from 'native-base';
import HeaderTilte from '../../../assets/image/popup/popup.jpg';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD,FONT_FAMILY_PT_REGULAR } from '../../../utils/styles/typography';
const screenWidth = Dimensions.get("window").width;
import { BlurView } from "@react-native-community/blur";
import Loader from '../../../componets/loder/Loader';
import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../../redux/index';
import { constants } from '../../../utils/constants/constants';
import { Reachability } from '../../../services/netInfo/Rechability';
import axios from 'axios'
import i18n, { t } from '../../../utils/localization/servicesi18n/index';
import Calendar from '../../../componets/calendar/Calendar';
import moment from 'moment';
import * as config from '../../../utils/localization/config/i18n';

const CorrespondenceFilter = (props) => {

    const [visible, setVisible] = useState(true);
    const [referencerNumber, setReferenceNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [corrType, setCorrType] = useState('');
    const [sender, setSender] = useState('');
    const [recipent, setRecipent] = useState('');
    const [overdue, setOverdue] = useState('');
    const [isCalendaerVisible, setCalendaerVisible] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const onButtonCancelClick = () => {
        props.onModalClose(); 
        setVisible(false);
      };

    const onButtonOKClick = () => {
        props.getFilterValues(referencerNumber, subject, corrType, sender, recipent, overdue, fromDate, toDate);
        props.onModalClose(); 
        setVisible(false);
      };
      
    const  handleOnReferenceNumberChange =(e) => {
      
        setReferenceNumber(e)  
      }
    const  handleOnSubjectChange =(e) => {
        // e.persist();
        setSubject(e)  
     }
    const onValueCorrTypeChange =(value) => {
      if (value != -1) {
           setCorrType(value);
      }
      }
    const onValueCorrSenderhange =(value) => {
      if (value != -1) {
            setSender(value);
      }
      }
    const onValueCorrRecipentChange =(value) => {
      if (value != -1) {
        setRecipent(value);
       }
      }
    const onValueOverdueChange =(value) => {
         if (value != -1) {
          setOverdue(value);
         }
      }
    const handleOnSearchfromandToDateChangeValue = (fromDates, toDates) =>{ 
         const selectedFromDate = moment(fromDates).format('MMM DD, YYYY');
         const selectedToDate = moment(toDates).format('MMM DD, YYYY');  
         setFromDate(selectedFromDate);
         setToDate(selectedToDate);  
      }

      if(config.fallback == 'en'){
        return(

          <Modal transparent animated visible={visible} animationType='fade' onRequestClose={() => { console.log('onRequestClose'); }}>
                 <SafeAreaView style={{flex:1, width:'100%',height:'100%',backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                 <ScrollView style={{width:'100%',height:'100%'}}>
                     <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.0)', paddingTop:0}} >
                     {
                         isCalendaerVisible && <Calendar onModalClose={() => { setCalendaerVisible(false) }} getDates={(startDate, endDate) => {
                          handleOnSearchfromandToDateChangeValue(startDate, endDate);
                      }} />
                      }
                          <View style={{marginTop:150,width:screenWidth-40, height:530,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                          <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                  <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                  <Text style={{marginLeft:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff'}}>{t('InboxScreen:Filter')}</Text>
                                  </ImageBackground>
                                  </View>
                                  <View style={{margin:5, marginBottom:0, width:screenWidth,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{ backgroundColor:'#ffffff',flexDirection:'column',justifyContent:'flex-start', marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 40}}>
             <Input
                                    type="text"
                                    value={referencerNumber}
                                    name='refernce number'
                                    onChangeText={(value) => handleOnReferenceNumberChange(value)}
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('InboxScreen:ReferenceNumber')}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    style={{  
                                    marginTop:0,
                                    paddingLeft:15,
                                   // backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}   
                                />
                                      </View>
                                  </View>
                                  <View style={{margin:5, marginBottom:0, width:screenWidth,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{ backgroundColor:'#ffffff',flexDirection:'column',justifyContent:'flex-start', marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 40}}>
             <Input
                                    type="text"
                                    value={subject}
                                    name='refernce number'
                                    onChangeText={(value) => handleOnSubjectChange(value)}
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('InboxScreen:Subject')}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    style={{
                                    
                                    marginTop:0,
                                    paddingLeft:15,
                                   // backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                    
                                />
                                      </View>
                                  </View>
                                  <View style={{margin:5, marginBottom:0, width:screenWidth,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{ backgroundColor:'#ffffff',flexDirection:'column',justifyContent:'flex-start', marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 35}}>
             <Picker style={{marginTop:-5}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('InboxScreen:SelectCorrespondenceType')}
                                              selectedValue={corrType}
                                              onValueChange={onValueCorrTypeChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                          <Picker.Item color={'gray'} label={t('InboxScreen:SelectCorrespondenceType')} value={-1} key={-1} />
  
                                          <Picker.Item label="Outgoing-Letter" value="Outgoing-Letter" />
                                          <Picker.Item label="Incoming-Letter" value="Incoming-Letter" />
                                          <Picker.Item label="Outgoing-Circular" value="Outgoing-Circular" />
                                          <Picker.Item label="Incoming-Circular" value="Incoming-Circular" />
                                          <Picker.Item label="Outgoing-Memo" value="Outgoing-Memo" />
                                          <Picker.Item label="Incoming-Memo" value="Incoming-Memo" />
                                          <Picker.Item label="MOM" value="MOM" />
                                          <Picker.Item label="Outgoing RFI" value="Outgoing RFI" />
                                          <Picker.Item label="Incoming RFI" value="Incoming RFI" />
                                          <Picker.Item label="Task" value="Task" />
                                          </Picker>
                                      </View>
                                  </View>
                                  <View style={{margin:5, marginBottom:0 ,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{flexDirection:'column',justifyContent:'flex-start',marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 35}}>
             <Picker style={{ marginTop:-5}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('InboxScreen:SelectSender')}
                                              selectedValue={sender}
                                              onValueChange={onValueCorrSenderhange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                           <Picker.Item color={'gray'} label={t('InboxScreen:SelectSender')} value={-1} key={-1} />
  
                                         {props.senderAndRecipent && props.senderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
  
                                          </Picker>
          
            </View>
            </View>
  
            <View style={{margin:5, marginBottom:0,width:screenWidth ,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{ backgroundColor:'#ffffff',flexDirection:'column',justifyContent:'flex-start', marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 35}}>
             <Picker style={{marginTop:-5}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('InboxScreen:SelectRecipient')}
                                              selectedValue={recipent}
                                              onValueChange={onValueCorrRecipentChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                            <Picker.Item color={'gray'} label={t('InboxScreen:SelectRecipient')} value={-1} key={-1} />
                                         {props.senderAndRecipent && props.senderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
  
                                          </Picker>
            </View>
            </View>
            
        <View style={{margin:5, marginBottom:0, width:screenWidth ,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{ backgroundColor:'#ffffff',flexDirection:'column',justifyContent:'flex-start', marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 35}}>
             <Picker style={{marginTop:-5}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginRight:5,marginLeft:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('InboxScreen:OverDue')}
                                              selectedValue={overdue}
                                              onValueChange={onValueOverdueChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                         <Picker.Item color={'gray'} label={t('InboxScreen:OverDue')} value={-1} key={-1} />
  
                                          <Picker.Item label="7 Days" value="7 Days" />
                                          <Picker.Item label="15 Days" value="15 Days" />
                                          <Picker.Item label="1 Month" value="1 Month" />
                                          <Picker.Item label=">1 Month" value=">1 Month" />
                                          </Picker>
          
            </View>
            </View>
            <View style={{marginTop:10, marginBottom:0,marginLeft:-15,marginRight:5,width:screenWidth,flexDirection:'row',height:40,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
                  <TouchableOpacity  onPress={() => { setCalendaerVisible(true) }}>
  
        <View style={{flex:1, flexDirection:'row',width:screenWidth-95,justifyContent:'space-between',alignContent:'center',marginLeft:10, marginRight:10}}>
  
        <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row',justifyContent:'flex-start',margin:10,marginTop:0}}>
    
   <Input
                                   // type="text"
                                    value={fromDate}
                                    name='Date'
                                   // onChange={(value) => this.handleOnSuperSearchChange(value)}
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('InboxScreen:SelectFromDate')}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    style={{borderColor: 'lightgray',
                                    borderWidth: 1,
                                    borderRadius:5,
                                    marginTop:0,
                                    paddingLeft:15,
                                    backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                    
                                />
                                      <Image source={require('../../../assets/image/calendar/calendar.png')} style={{marginLeft:-30,marginTop:10,alignContent:'center',alignSelf:'center'}} />        
  
  </View>
  <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row',justifyContent:'flex-end',margin:10,marginRight:-8,marginTop:0}}>
    
   <Input
                                   // type="text"
                                    value={toDate}
                                    name='Date'
                                   // onChange={(value) => this.handleOnSuperSearchChange(value)}
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('InboxScreen:SelectToDate')}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    style={{borderColor: 'lightgray',
                                    borderWidth: 1,
                                    borderRadius:5,
                                    marginTop:0,
                                    paddingLeft:15,
                                    backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                    
                                />
                                      <Image source={require('../../../assets/image/calendar/calendar.png')} style={{marginLeft:-30,marginTop:10,alignContent:'center',alignSelf:'center'}} />        
  
    </View>
  </View>
  </TouchableOpacity>
  </View>
                                   <View style={{marginTop:30, flexDirection:'row',justifyContent:'space-between'}}>
                                      <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                       <Text uppercase={false} style={{fontSize:14, fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Cancel')}</Text>
                                      </Button>
                                       <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonOKClick() }}>
                                      <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Ok')}</Text>
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
                 <SafeAreaView style={{flex:1, width:'100%',height:'100%',backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                 <ScrollView style={{width:'100%',height:'100%'}}>
                     <Container style={{width:'100%',height:'100%',backgroundColor: 'rgba(128,128, 128, 0.0)', paddingTop:0}} >
                     {
                         isCalendaerVisible && <Calendar onModalClose={() => { setCalendaerVisible(false) }} getDates={(startDate, endDate) => {
                          handleOnSearchfromandToDateChangeValue(startDate, endDate);
                      }} />
                      }
                          <View style={{marginTop:150,width:screenWidth-40, height:530,marginLeft:20, marginRight:20, borderRadius:10,backgroundColor:'white'}}>
                          <View style={{marginTop:0, marginLeft:0, marginRight:0, width:'100%', height:70, flexDirection:'column',marginBottom:-10}}>
                                  <ImageBackground source={HeaderTilte} style={{width:'100%', height:50, borderTopRightRadius:10,borderTopLeftRadius:10, overflow: 'hidden'}} >
                                  <Text style={{marginRight:25,justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:15, fontSize:17,fontFamily:FONT_FAMILY_PT_BOLD,color:'#ffffff',textAlign:'right'}}>{t('InboxScreen:Filter')}</Text>
                                  </ImageBackground>
                                  </View>
                                  <View style={{margin:5, marginBottom:0, width:screenWidth,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{ backgroundColor:'#ffffff',flexDirection:'column',justifyContent:'flex-start', marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 40}}>
             <Input
                                    type="text"
                                    value={referencerNumber}
                                    name='refernce number'
                                    onChangeText={(value) => handleOnReferenceNumberChange(value)}
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('InboxScreen:ReferenceNumber')}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    style={{  
                                    marginTop:0,
                                    paddingLeft:15,
                                    textAlign:'right',
                                   // backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}   
                                />
                                      </View>
                                  </View>
                                  <View style={{margin:5, marginBottom:0, width:screenWidth,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{ backgroundColor:'#ffffff',flexDirection:'column',justifyContent:'flex-start', marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 40}}>
             <Input
                                    type="text"
                                    value={subject}
                                    name='refernce number'
                                    onChangeText={(value) => handleOnSubjectChange(value)}
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('InboxScreen:Subject')}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    style={{
                                    textAlign:'right',
                                    marginTop:0,
                                    paddingLeft:15,
                                   // backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                    
                                />
                                      </View>
                                  </View>
                                  <View style={{margin:5, marginBottom:0, width:screenWidth,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{ backgroundColor:'#ffffff',flexDirection:'column',justifyContent:'flex-start', marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 35}}>
             <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('InboxScreen:SelectCorrespondenceType')}
                                              selectedValue={corrType}
                                              onValueChange={onValueCorrTypeChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                          <Picker.Item color={'gray'} label={t('InboxScreen:SelectCorrespondenceType')} value={-1} key={-1} />
  
                                          <Picker.Item label="Outgoing-Letter" value="Outgoing-Letter" />
                                          <Picker.Item label="Incoming-Letter" value="Incoming-Letter" />
                                          <Picker.Item label="Outgoing-Circular" value="Outgoing-Circular" />
                                          <Picker.Item label="Incoming-Circular" value="Incoming-Circular" />
                                          <Picker.Item label="Outgoing-Memo" value="Outgoing-Memo" />
                                          <Picker.Item label="Incoming-Memo" value="Incoming-Memo" />
                                          <Picker.Item label="MOM" value="MOM" />
                                          <Picker.Item label="Outgoing RFI" value="Outgoing RFI" />
                                          <Picker.Item label="Incoming RFI" value="Incoming RFI" />
                                          <Picker.Item label="Task" value="Task" />
                                          </Picker>
                                      </View>
                                  </View>
                                  <View style={{margin:5, marginBottom:0 ,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{flexDirection:'column',justifyContent:'flex-start',marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 35}}>
             <Picker style={{ marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('InboxScreen:SelectSender')}
                                              selectedValue={sender}
                                              onValueChange={onValueCorrSenderhange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                           <Picker.Item color={'gray'} label={t('InboxScreen:SelectSender')} value={-1} key={-1} />
  
                                         {props.senderAndRecipent && props.senderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
  
                                          </Picker>
          
            </View>
            </View>
  
            <View style={{margin:5, marginBottom:0,width:screenWidth ,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{ backgroundColor:'#ffffff',flexDirection:'column',justifyContent:'flex-start', marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 35}}>
             <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('InboxScreen:SelectRecipient')}
                                              selectedValue={recipent}
                                              onValueChange={onValueCorrRecipentChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                            <Picker.Item color={'gray'} label={t('InboxScreen:SelectRecipient')} value={-1} key={-1} />
                                         {props.senderAndRecipent && props.senderAndRecipent.map((sender, index) => {
       return (
  <Picker.Item label= {`${sender.entityCode} - ${sender.entityName}`} value={sender.ridEntityList} key={index} />
  );
  })}
  
                                          </Picker>
            </View>
            </View>
            
        <View style={{margin:5, marginBottom:0, width:screenWidth ,flexDirection:'row',height:50,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
        <View  style = {{ backgroundColor:'#ffffff',flexDirection:'column',justifyContent:'flex-start', marginTop:7, borderWidth: 1,
          borderRadius:5,borderColor: 'lightgray', width:screenWidth-90, height: 35}}>
             <Picker style={{marginTop:-5, textAlign:'right', flexDirection:'row-reverse'}}
                                              mode="dropdown"
                                              iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons" style={{width:25,marginLeft:5,marginRight:-30}}/>}
                                              placeholderStyle={{ color: '#afafaf' }}
                                              placeholderTextColor='#afafaf'
                                              placeholder= {t('InboxScreen:OverDue')}
                                              selectedValue={overdue}
                                              onValueChange={onValueOverdueChange}
                                              underlineColorAndroid = 'transparent'
                                            
                                           >
                                         <Picker.Item color={'gray'} label={t('InboxScreen:OverDue')} value={-1} key={-1} />
  
                                          <Picker.Item label="7 Days" value="7 Days" />
                                          <Picker.Item label="15 Days" value="15 Days" />
                                          <Picker.Item label="1 Month" value="1 Month" />
                                          <Picker.Item label=">1 Month" value=">1 Month" />
                                          </Picker>
          
            </View>
            </View>
            <View style={{marginTop:10, marginBottom:0,marginLeft:-15,marginRight:5,width:screenWidth,flexDirection:'row',height:40,alignContent:'center',alignSelf:'center',justifyContent:'center'}}>
                  <TouchableOpacity  onPress={() => { setCalendaerVisible(true) }}>
  
        <View style={{flex:1, flexDirection:'row',width:screenWidth-95,justifyContent:'space-between',alignContent:'center',marginLeft:10, marginRight:10}}>
  
        <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection:'row-reverse',justifyContent:'flex-start',margin:10,marginTop:0}}>
    
   <Input
                                   // type="text"
                                    value={fromDate}
                                    name='Date'
                                   // onChange={(value) => this.handleOnSuperSearchChange(value)}
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('InboxScreen:SelectFromDate')}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    style={{borderColor: 'lightgray',
                                    borderWidth: 1,
                                    borderRadius:5,
                                    marginTop:0,
                                    textAlign:'right',
                                    paddingLeft:15,
                                    backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                    
                                />
                                      <Image source={require('../../../assets/image/calendar/calendar.png')} style={{marginRight:-30,marginTop:10,alignContent:'center',alignSelf:'center'}} />        
  
  </View>
  <View style = {{ flex:1,backgroundColor:'#f2f2f2',flexDirection: 'row-reverse',justifyContent:'flex-end',margin:10,marginLeft:-10,marginTop:0}}>
    
   <Input
                                   // type="text"
                                    value={toDate}
                                    name='Date'
                                   // onChange={(value) => this.handleOnSuperSearchChange(value)}
                                    underlineColorAndroid = "transparent"
                                    clearButtonMode='always'
                                    placeholderTextColor='#afafaf'
                                    placeholder = {t('InboxScreen:SelectToDate')}
                                    spellCheck={false}
                                    autoCorrect={false}
                                    style={{borderColor: 'lightgray',
                                    borderWidth: 1,
                                    borderRadius:5,
                                    marginTop:0,
                                    textAlign:'right',
                                    paddingLeft:15,
                                    backgroundColor:'#f2f2f2',
                                    fontFamily:FONT_FAMILY_PT_REGULAR,fontSize:16,height:37}}
                                    
                                />
                                      <Image source={require('../../../assets/image/calendar/calendar.png')} style={{marginRight:-30,marginTop:10,alignContent:'center',alignSelf:'center'}} />        
  
    </View>
  </View>
  </TouchableOpacity>
  </View>
                                   <View style={{marginTop:30, flexDirection:'row',justifyContent:'space-between'}}>
                                   <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:100,height:35, justifyContent:'center'}} onPress={() => { onButtonOKClick() }}>
                                      <Text uppercase={false} style={{fontSize:14,fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Ok')}</Text>
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

export default CorrespondenceFilter;
