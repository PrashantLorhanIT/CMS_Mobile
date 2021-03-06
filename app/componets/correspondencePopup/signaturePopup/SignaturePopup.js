import React, { useState, useEffect} from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Image,
    Modal,
    Linking,
    Platform,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    AsyncStorage
} from 'react-native';
import { Container, Button, Text, Content, Header, Left, Icon, Body, Title, Right} from 'native-base';
import { BlurView } from '@react-native-community/blur';
import { SCALE_8, SCALE_18 } from '../../../utils/styles/spacing';
import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';
import CustomStatusBar from '../../../utils/styles/CustomStatusBar';
import back from '../../../assets/image/backArrowLeft/back.png';
import { color } from 'react-native-reanimated';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD, FONT_FAMILY_PT_REGULAR } from '../../../utils/styles/typography';
import { constants } from '../../../utils/constants/constants';
import axios from 'axios'

const screenWidth = Dimensions.get("window").width;

const SignaturePopup = (props) => {
   
    StatusBar.setBarStyle('dark-content', true);
    const [visible, setVisible] = useState(true);
    const [isLoadingVisible, setisLoadingVisible] = useState(true);
    const [token, settoken] = useState();

    useEffect (() => {
        AsyncStorage.getItem('token').then((token) => {
            settoken(token);
        });
    },[settoken])

    const  onButtonOKClick = () => {
        if (props.worlFlowName == 'Outgoing RFI' || props.worlFlowName == 'Incoming RFI') {
            const userId = props.userId
            submitRFICheckSigned(userId, token);
         
        } else {
            const userId = props.userId
            submitCorrespondenceCheckSigned(userId, token); 
        }
    };
   
    const submitCorrespondenceCheckSigned =  (userId, token) => {
  
            try {
                const params = {
                    CorrID: userId
                }
                axios.get(`${constants.webService.baseURL}${constants.webService.methods.common.CorrespondenceSignature}`, {params}, axios.defaults.headers.Authorization = `Bearer ${token}`)
                .then(res => {
               
                    console.log(res.data)
                    if (res.data.statusCode == '200') {
                       props.getApproveValues(true)
                       props.onModalClose();
                       setVisible(false);
                    } else {
                        props.getApproveValues(false)
                        props.onModalClose();
                        setVisible(false);
                    }   
                })
                .catch(error => console.log(error))   
            } catch (error) {      
         }
    }
    const submitRFICheckSigned =  (ridCorDetails, token) => {
  
        try {
            const params = {
             RidCorrdetail: ridCorDetails
            }

            console.log('Parameter in RFI Details Signature');
            console.log(params);
            console.log(`${constants.webService.baseURL}${constants.webService.methods.common.riiSignature}`)
            axios.get(`${constants.webService.baseURL}${constants.webService.methods.common.riiSignature}`, {params}, axios.defaults.headers.Authorization = `Bearer ${token}`)
            .then(res => {
              console.log('RFI Details Signature response inside');
                console.log(res);
                console.log(res.data)
                if (res.data.data == true) {
                   props.getApproveValues(true)
                   props.onModalClose();
                   setVisible(false);
                } else {
                    props.getApproveValues(false)
                    props.onModalClose();
                    setVisible(false);
                }   
            })
            .catch(error => console.log(error));
            
        } catch (error) {
            
        }
}
    return (
        <Modal transparent animated visible={visible} animationType='slide' onRequestClose={() => { console.log('onRequestClose'); }}>
         <CustomStatusBar backgroundColor="#aa182c"
                  barStyle="light-content"/>
            <SafeAreaView style={styles.safeArea}>
           
            <Header style={{backgroundColor:'#aa182c',height:33}}>
                                    <Left style={{margin:0,marginTop:-20}}> 
                                    <Button transparent onPress={() => {
                            props.onModalClose();
                            setVisible(false);
                        }} >
                                            {/* <Icon name='arrow-back' /> */}
                                            <Image source={back} />
                                            <Text style={{color:'white', fontFamily:FONT_FAMILY_PT_REGULAR}}>Back</Text>
                                        </Button>
                                    </Left>
                                     <Title style={styles.title}>Signature</Title>
                                    <Right></Right>
                                </Header>
                <Container style={styles.container}>
                    
                    <View style={{width:screenWidth,alignContent:'center',height:'90%',justifyContent:'center',marginBottom:10}}>
                   <WebView                   
                      onLoadEnd={() => setisLoadingVisible(true)}
                      source={{ uri: `${constants.webService.documentBaseUrl}${props.signingURL} &approvalmode=true&ridType=${props.corrId}&Type=RIDMOM&rfiApproval=false&apiUrl=${constants.webService.SignbaseURL}&auth=Bearer${token}&ridUsermaster=${props.userId}`}}
                      style={{ marginLeft:6,marginTop:0,width:'124%',height:'100%' }}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                   />
                   </View>
                 <View style={{height:50,marginBottom:10,alignContent:'center',justifyContent:'center',alignSelf:'center'}}>
                 <Button style={{width:200,margin:15,backgroundColor:'#a62032',height:40, justifyContent:'center'}} onPress={() => { onButtonOKClick() }}>
                    <Text uppercase={false} style={{fontSize:16,fontFamily:FONT_FAMILY_PT_REGULAR}}>Submit</Text>
                    </Button>  
                </View>
                </Container>
            </SafeAreaView>
        </Modal>
    );
}

export default SignaturePopup;

const styles = StyleSheet.create({
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        //backgroundColor: 'transparent',
       // backgroundColor: 'rgba(128, 128, 128, 1.0)'
    },
    topTransparentView: {
        height: '0%',
        width: '100%',
        backgroundColor: 'transparent'
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        backgroundColor: 'transparent'
    },
    header: {
        width: '100%',
        height: 55,
        justifyContent:'flex-end',
        alignContent:'flex-end',
        alignItems:'flex-end',
        alignSelf:'flex-end'
    },
    cross: {
        height: 50,
        width: 50,
       // marginLeft: SCALE_8,
       // marginRight: 'auto',
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems:'flex-end',
        backgroundColor: 'transparent'
    },
    crossBtnTitle: {
        color: 'black',
        fontSize: 30,
        marginRight:30,
        justifyContent:'flex-end',
        alignContent:'flex-end',
        alignItems:'flex-end',
        alignSelf:'flex-end'
        
    },
    screenTitle: {
        color: 'white',
        fontSize: 30,
       // fontWeight: '',
        margin: SCALE_18,
    },
    title: {
        color:'white',
        height:45, 
        flexWrap: 'wrap',
        flexDirection:'row',
        fontFamily:FONT_FAMILY_PT_REGULAR,
        alignItems:'center',
        justifyContent:'center',
        ...Platform.select({
          ios: {
            marginTop:-15,
          },
          android: {
            marginTop:-10,
          }
        }),
      },
});

