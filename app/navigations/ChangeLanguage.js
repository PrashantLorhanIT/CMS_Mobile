import React, {useState}from 'react';
import {
        Form,
        Card,
        Button,
        Item,
        Input,
        Text,
        Icon,
        Picker,
        CardItem,
        Container,
        Body
      } from 'native-base';
import { View, Image, TouchableOpacity,SafeAreaView ,Modal,StyleSheet,AsyncStorage, Alert} from 'react-native';
import { RadioButton } from 'react-native-paper';
import  CheckBox  from '../componets/checkbox/CheckBox';
import * as config from '../utils/localization/config/i18n';
import languageStore from '../utils/localization/languageStore';
import i18n from '../utils/localization/servicesi18n/index';
import RNRestart from 'react-native-restart'; 

const STORAGE_KEY = 'SelectedLanguage';

const ChangeLanguage = (props) => {
        const [visible, setVisible] = useState(true);
        const [language, setLanguage] = useState();
        const [checkedEnglish, setcheckedEnglish] = useState();
        const [checkedArabic, setcheckedArabic] = useState();
        const [isI18nInitialized, SetisI18nInitialized] = useState();

        // AsyncStorage.getItem('SelectedLanguage').then((value) => {
        //         if (value == 'en'){
        //                 setcheckedArabic(false);
        //                 setcheckedEnglish(true);
        //                 setLanguage('en');
                
        //         } else {
        //                 setcheckedArabic(true);
        //                 setcheckedEnglish(false);
        //                 setLanguage('ar');
                
        //         }
        // });
       

        const handleCheckBoxEnglish = () => {
        
               console.log('Selected language is English');
                     setcheckedArabic(false);
                     setcheckedEnglish(true);
                     setLanguage('en');
         }

         const handleCheckBoxArabic = () => {
        
                console.log('Selected language is Arabic');
                      setcheckedArabic(true);
                      setcheckedEnglish(false);
                      setLanguage('ar');
          }
        const onButtonCancelClick = () => {
                // getanguage();
            props.onModalClose(); 
            setVisible(false);
          };
    
         const onButtonContinueClick = () => {
                handleClick();
          };

          const handleClick = () => {
                Alert.alert(
                        '',
                        'Are you sure You want to Restart App change language?',
                        [
                          {
                            text: 'Cancel',
                            onPress: () => {
                              return null;
                            },
                          },
                          {
                            text: 'Confirm',
                            onPress: () => {
                                storelanguage(language);
                                props.onModalClose(); 
                                setVisible(false);
                                RNRestart.Restart();
                            },
                          },
                        ],
                        { cancelable: false }
                      );
          }
        const storelanguage = async (language) => {
               // config.fallback = language
               // ChangeLanguagemethod(language);
        //       console.log('Change language store method');
               await AsyncStorage.setItem(STORAGE_KEY, language);
              
        }

        const getanguage = async () => {
                console.log('Change language get method');
                const language = await AsyncStorage.getItem(STORAGE_KEY);
                console.log(language);
          }

          const ChangeLanguagemethod = (language) => {
                          getanguage();
                          config.fallback = language
                          i18n.init()
                                  .then(() => {
                                                  // const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';
                                                  // RN doesn't always correctly identify native
                                                  // locale direction, so we force it here.
                                                  // if (i18n.dir !== RNDir) {
                                                  if (config.fallback == 'ar') {
                                                          RNI18nManager.forceRTL(true);
                                                          //}
                                                          // const isLocaleRTL = i18n.dir === 'RTL';
        
                        // RNI18nManager.forceRTL(isLocaleRTL);
        
                        // RN won't set the layout direction if we
                        // don't restart the app's JavaScript.
                        Updates.reloadFromCache();
                        }
        
                    SetisI18nInitialized(true);
                    })
                    .catch((error) => console.warn(error));
                    }
     
        return (
                <Modal transparent animated visible={visible} animationType='slide' onRequestClose={() => { console.log('onRequestClose'); }}>

           <SafeAreaView style={{flex:1, backgroundColor:'white',backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
                   <Container style={{width:'100%',height:'100%', marginTop:50}}>
                   <View style={{ margin:5}}>
                           <View style={{marginTop:10, marginLeft: 10}}>
                                   <Text style={{fontSize:20}}> Choose your preferred language</Text>
                           </View>
                           <View style={{marginTop:10 , borderColor:'#f2f2f2'}}>
                                   <Card style={{marginTop:10, height:60}}>
                                           <CardItem style ={{flex:1,marginBottom:0,alignContent:'center'}}>
                                                   <Body>
                                                           <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',marginTop:5}}>
                                                                   <View style={{flex:1,justifyContent:'flex-start'}}>
                                                                   <Text style={{fontSize:18}}>English</Text>
                                                                   </View>
                                                                   <View style={{justifyContent:'flex-end'}}>
                                                                   <CheckBox selected={checkedEnglish}  onPress={() => handleCheckBoxEnglish()}/> 

                                                                   </View>
                                                           </View>
                
                                                   </Body>
                                           </CardItem>        
                                   </Card>
                                   <Card style={{marginTop:10, height:60}}>
                                           <CardItem style ={{flex:1,marginBottom:0,alignContent:'center'}}>
                                                   <Body>
                                                           <View style={{flexDirection:'row',justifyContent:'space-between',alignContent:'center',marginTop:5}}>
                                                                   <View style={{flex:1,justifyContent:'flex-start'}}>
                                                                   <Text style={{fontSize:18}}>Arabic</Text>
                                                                   </View>
                                                                   <View style={{justifyContent:'flex-end'}}>
                                                                   <CheckBox selected={checkedArabic}  onPress={() => handleCheckBoxArabic()}/> 

                                                                   </View>
                                                           </View>
                
                                                   </Body>
                                           </CardItem>        
                                   </Card>
                           </View>
                           <View style={{marginTop:30, flexDirection:'row',justifyContent:'space-between'}}>
                                    <Button style={{margin:5,marginLeft:20,backgroundColor:'#373d38',width:130,height:35,justifyContent:'center'}} onPress={() => { onButtonCancelClick() }}>
                                     <Text uppercase={false} style={{fontSize:14}}>Cancel</Text>
                                    </Button>
                                     <Button style={{margin:5,marginRight:20,backgroundColor:'#373d38',width:130,height:35, justifyContent:'center'}} onPress={() => { onButtonContinueClick() }}>
                                    <Text uppercase={false} style={{fontSize:14}}>Continue</Text>
                                     </Button>
                                </View>
                           <View style={{marginTop:5}}>
                                   <Text style={{margin:10,fontSize:15, color:'drakgray'}}>
                                           Language options can be changed anytime. we'll translate information to help you browse, shop, and communicate.
                                           we are continuosly improving the language experience on Etihad Rail if you have feedback on these translations, Please contact customer support. please note that transalations are provided for convenience only.
                                  </Text>
                           </View>  
                   </View>
                   </Container>
           </SafeAreaView>
           </Modal>
        );
   
};

export default ChangeLanguage;

 export const styles = StyleSheet.create({
});
