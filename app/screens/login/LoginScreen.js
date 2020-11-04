import React, { Component } from 'react';
import { View,  SafeAreaView, StatusBar, ScrollView, KeyboardAvoidingView,ImageBackground, Image, Alert, TouchableOpacity} from 'react-native';
import styles from './Login.style';
import {
  Card,
  Button,
  Input,
  Text,
  Icon,
  Picker,
  CardItem,
  Body
} from 'native-base';
import background from '../../assets/image/background/background.jpg';
import logo from '../../assets/image/logo/Logo.png';
import { CheckBox } from 'react-native-elements';
import { FONT_SIZE_12, FONT_SIZE_20,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_BOLD_PT } from '../../utils/styles/typography';
import RadioButton from '../../assets/image/radioButton/RedioButton.png';
import RadioBButton from '../../assets/image/radioButton/RadioBButton.png';
import ForgotPassword from './forgotPassword/ForgotPassword';
import * as config from '../../utils/localization/config/i18n';
import i18n, { t } from '../../utils/localization/servicesi18n/index';

const STORAGE_KEY = 'SelectedLanguage';

class LoginScreen extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
        name: 'Correspondence Management System',
        checked: false,
        userName:'',
        password:'',
        selectedLanguage: 'English',
        temp: '',
        isForgotPasswordVisible: false,
    };
    this.handleLoginBtnClick = this.handleLoginBtnClick.bind(this);
    this.handleOnUserNameChange = this.handleOnUserNameChange.bind(this);
    this.handleOnPasswordChange = this.handleOnPasswordChange.bind(this);
}

componentDidMount() {
   
}

onValueChange =(value) => {
    this.setState({
        selectedLanguage: value
    });
    console.log('Selected Lanhuage');
    console.log(value);
    if (value == 'English' ){
        console.log('Selected Lanhuage English');
       //this.onChangeLang('en');
       this.ChangeLanguagemethod('en');
       this.getanguage('en');
    } else {
        console.log('Selected Lanhuage Arabic');
        this.ChangeLanguagemethod('ar');
        this.getanguage('ar');
    }
  }

   getanguage = async () => {
    console.log('Change language get method');
    const language = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(language);
}
//   async onChangeLang(lang) {
//     console.log('Selected language on change');
//     console.log(lang);

//     i18n.changeLanguage(selectedLanguage);
//     try {
//         await AsyncStorage.setItem('@APP:languageCode',lang);
//     } catch (error) {
//         console.log(` Hi Errorrrr : ${error}`);
//     }
//     console.log(i18n.dir());
//}
handleOnUserNameChange(e) {
     e.persist();
    this.setState({
        userName: e.nativeEvent.text
    })   
}

handleOnPasswordChange = (e) => {
    e.persist();
    this.setState({
        password: e.nativeEvent.text
    })
}

 handleLoginBtnClick = ()  => {

    // if(this.state.userName != '') {

    // }
     if (this.state.userName != '' || this.state.password != '') {

        if (this.state.userName == '') {
            this.alertWithMessage("Please enter User Name");
        } else if (this.state.password  == '') {
            this.alertWithMessage("Please enter Password");
        } else if (this.state.userName != '' && this.state.password != '') {
            if (this.state.password.length >= 6) {
                this.props.performLogin(this.state.userName, this.state.password, this.state.checked); 
             } else{
                this.alertWithMessage("Please enter correct password");
    
             }
        }
        
     } else {
        this.alertWithMessage("Please enter User Name and Password");
     }
}

 ChangeLanguagemethod = (language) => {
    config.fallback = language
    i18n.init()
    .then(() => {
       // const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';
        // RN doesn't always correctly identify native
        // locale direction, so we force it here.
       // if (i18n.dir !== RNDir) {
            if(config.fallback == 'ar') {
              RNI18nManager.forceRTL(true);
            //}
            // const isLocaleRTL = i18n.dir === 'RTL';

             RNI18nManager.forceRTL(isLocaleRTL);

            // RN won't set the layout direction if we
            // don't restart the app's JavaScript.
            Updates.reloadFromCache();
        }

       // SetisI18nInitialized(true);
    })
    .catch((error) => console.warn(error));
} 
handleChangePasswordTap = () => {
    this.setState((state) => {
      return {
        isForgotPasswordVisible: true,
      };
    });
  };

 alertWithMessage = (message) =>
Alert.alert(
    "",
    message,
    [
        { text: "OK", onPress: () => {} }
    ],
    { cancelable: false }
);
    render() {

        if (this.props.loggedInUser  && this.props.userId) {

            this.props.navigation.navigate('DrawerNavigationRoutes');
        }
       
        
       const { isForgotPasswordVisible }  = this.state;
       if (config.fallback == 'en'){
        return (
            <>
            { 
                     isForgotPasswordVisible && <ForgotPassword  onModalClose={() => { this.setState({ isForgotPasswordVisible: false }) }} /> 
                  }
                    <StatusBar barStyle="light-content" />
                    <ImageBackground source={background} style={styles.image}>
                    <SafeAreaView  >
                        <ScrollView contentContainerStyle={styles.scrollViewContentContainerStyle}
                            style={styles.scrollView}
                            
                              contentInsetAdjustmentBehavior="automatic"> 
                            {/* //<ScrollView> */}
                            <KeyboardAvoidingView behavior='position' style={styles.scrollViewContainer}>
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center',marginTop:40, alignContent:'center',alignSelf:'center'}}>
                            <Image style={styles.logo} resizeMode='contain' source={logo} />
                             <Text style={styles.text}>{t('LoginScreen:welcome')}</Text>
                               {/* <Text style={styles.text}>{i18n.t('login.welcome')}</Text> */}
                              </View>
                                <Card style={styles.card}>
                                    <CardItem style={styles.form}>
                                            <Input
                                                placeholder={t('LoginScreen:username')}
                                                type="text"
                                                value={this.state.userName}
                                                name='userName'
                                                onChange={(value) => this.handleOnUserNameChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={styles.input}
                                            />
                                        </CardItem>
                                        <CardItem style={styles.form}>
                                            <Input
                                                placeholder={t('LoginScreen:password')}
                                                secureTextEntry={true}
                                                type="text"
                                                name='password'
                                                value={this.state.password}
                                                onChange={(value) => this.handleOnPasswordChange(value)}
                                                underlineColorAndroid = 'transparent'
                                                placeholderTextColor='#afafaf'
                                                clearButtonMode='always'
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={styles.input}
                                            />
                                        </CardItem>
                                        <CardItem style={styles.form}>     
                                          <Body>
                                            <Picker style={styles.inputPicker}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons"/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                 placeholder={t('LoginScreen:language')}
                                                selectedValue={this.state.selectedLanguage}
                                                onValueChange={this.onValueChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                            <Picker.Item label="English" value="English" />
                                            <Picker.Item label="Arabic" value="Arabic" />
                                            </Picker>
                                        </Body>
                                    </CardItem>
                                </Card>
                                        <View style={{marginTop:10,marginLeft:0, flexDirection:'row', justifyContent:'flex-start'}} >
                                          <CheckBox style={{ marginLeft:0, height:20,width:20}}
                                             checked={this.state.checked}
                                             checkedIcon={<Image source={RadioBButton} />}
                                             uncheckedIcon={<Image source={RadioButton} />}
                                             onPress={() => this.setState({ checked: !this.state.checked}) } />
                                          <Text style={{fontSize:FONT_SIZE_14,color:'white',marginTop:12, marginLeft:-10,fontFamily:FONT_FAMILY_PT_REGULAR }}>{t('LoginScreen:device_Msg')}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.handleChangePasswordTap()} >
                                        {/* <View > */}
                                          <Text style={{marginLeft:20,fontSize:18,color:'white',marginTop:5,fontFamily:FONT_FAMILY_PT_REGULAR ,textDecorationLine: 'underline',}}>{t('LoginScreen:forgotPassword')}</Text>
                                        {/* </View> */}
                                        </TouchableOpacity>
                                        <View style={styles.loginMarginView} />
                                        <View style={styles.loginButtonContainer}>
                                            <Button style={styles.loginButton} onPress={this.handleLoginBtnClick}>
                                                <Text uppercase={false} style={styles.loginButtonText}>{t('LoginScreen:login_button')}</Text>
                                            </Button>
                                        </View>
                                   
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </SafeAreaView>
                    </ImageBackground>
                </ >
            );
       }else {
        return (
            <>
            { 
                     isForgotPasswordVisible && <ForgotPassword  onModalClose={() => { this.setState({ isForgotPasswordVisible: false }) }} /> 
                  }
                    <StatusBar barStyle="light-content" />
                    <ImageBackground source={background} style={styles.image}>
                    <SafeAreaView  >
                        <ScrollView contentContainerStyle={styles.scrollViewContentContainerStyle}
                            style={styles.scrollView}
                            
                              contentInsetAdjustmentBehavior="automatic"> 
                            {/* //<ScrollView> */}
                            <KeyboardAvoidingView behavior='position' style={styles.scrollViewContainer}>
                            <View style={{flex:1, flexDirection:'column', justifyContent:'center',marginTop:40, alignContent:'center',alignSelf:'center'}}>
                            <Image style={styles.logo} resizeMode='contain' source={logo} />
                             <Text style={styles.text}>{t('LoginScreen:welcome')}</Text>
                               {/* <Text style={styles.text}>{i18n.t('login.welcome')}</Text> */}
                              </View>
                                <Card style={styles.card}>
                                    <CardItem style={styles.form}>
                                            <Input
                                                placeholder={t('LoginScreen:username')}
                                                type="text"
                                                value={this.state.userName}
                                                name='userName'
                                                onChange={(value) => this.handleOnUserNameChange(value)}
                                                underlineColorAndroid = "transparent"
                                                clearButtonMode='always'
                                                placeholderTextColor='#afafaf'
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={styles.inputArabic}
                                            />
                                        </CardItem>
                                        <CardItem style={styles.form}>
                                            <Input
                                                placeholder={t('LoginScreen:password')}
                                                secureTextEntry={true}
                                                type="text"
                                                name='password'
                                                value={this.state.password}
                                                onChange={(value) => this.handleOnPasswordChange(value)}
                                                underlineColorAndroid = 'transparent'
                                                placeholderTextColor='#afafaf'
                                                clearButtonMode='always'
                                                spellCheck={false}
                                                autoCorrect={false}
                                                style={styles.inputArabic}
                                            />
                                        </CardItem>
                                        <CardItem style={styles.form}>     
                                          <Body>
                                            <Picker style={styles.inputPickerArbic}
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-drop-down" type="MaterialIcons"/>}
                                                placeholderStyle={{ color: '#afafaf' }}
                                                placeholderTextColor='#afafaf'
                                                 placeholder={t('LoginScreen:language')}
                                                selectedValue={this.state.selectedLanguage}
                                                onValueChange={this.onValueChange}
                                                underlineColorAndroid = 'transparent'
                                             >
                                            <Picker.Item label="English" value="English" />
                                            <Picker.Item label="Arabic" value="Arabic" />
                                            </Picker>
                                        </Body>
                                    </CardItem>
                                </Card>
                                        <View style={{marginTop:10,marginLeft:0, flexDirection:'row-reverse', justifyContent:'flex-start'}} >
                                          <CheckBox style={{ marginLeft:0, height:20,width:20}}
                                             checked={this.state.checked}
                                             checkedIcon={<Image source={RadioBButton} />}
                                             uncheckedIcon={<Image source={RadioButton} />}
                                             onPress={() => this.setState({ checked: !this.state.checked}) } />
                                          <Text style={{fontSize:FONT_SIZE_14,color:'white',marginTop:12, marginLeft:-10,fontFamily:FONT_FAMILY_PT_REGULAR }}>{t('LoginScreen:device_Msg')}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => this.handleChangePasswordTap()} >
                                        {/* <View > */}
                                          <Text style={{marginRight:20,fontSize:18,color:'white',marginTop:5,fontFamily:FONT_FAMILY_PT_REGULAR ,textDecorationLine: 'underline',alignSelf:'flex-end'}}>{t('LoginScreen:forgotPassword')}</Text>
                                        {/* </View> */}
                                        </TouchableOpacity>
                                        <View style={styles.loginMarginView} />
                                        <View style={styles.loginButtonContainer}>
                                            <Button style={styles.loginButton} onPress={this.handleLoginBtnClick}>
                                                <Text uppercase={false} style={styles.loginButtonText}>{t('LoginScreen:login_button')}</Text>
                                            </Button>
                                        </View>
                                   
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </SafeAreaView>
                    </ImageBackground>
                </ >
            );
       }
      
    }
} 

export default LoginScreen ;