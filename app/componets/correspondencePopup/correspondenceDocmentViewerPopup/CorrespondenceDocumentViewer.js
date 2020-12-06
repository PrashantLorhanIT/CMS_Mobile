import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, StatusBar, Image, Modal, Linking, Platform,TouchableOpacity, StyleSheet, ActivityIndicator,Dimensions} from 'react-native';
import { Container, Button, Text, Content, Header, Left, Icon, Body, Title, Right} from 'native-base';
import { BlurView } from '@react-native-community/blur';
import { SCALE_8, SCALE_18 } from '../../../utils/styles/spacing';
import { typography } from '../../../utils/styles/typography';
import {colors} from '../../../utils/styles/colors';
import { WebView } from 'react-native-webview';
import HTML from 'react-native-render-html';
import CustomStatusBar from '../../../utils/styles/CustomStatusBar';
import back from '../../../assets/image/backArrowLeft/back.png';
import { color } from 'react-native-reanimated';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD, FONT_FAMILY_PT_REGULAR } from '../../../utils/styles/typography';
import { constants } from '../../../utils/constants/constants';

const screenWidth = Dimensions.get("window").width;
let finalurl = "";
const CorrespondenceDocumentViewer = (props) => {
   
    StatusBar.setBarStyle('dark-content', true);
    const [visible, setVisible] = useState(true);
    const [isLoadingVisible, setisLoadingVisible] = useState(true);

    useEffect(() => {
        // console.log('Back word url string');
        // console.log(props.documentUrl);
         finalurl = props.documentUrl.replace(/(\\|\/)/g,'/');
         console.log(`${constants.webService.baseURL}${finalurl}`);
        // console.log('Forword slash url string');
         console.log(finalurl);
        
    });

    // const  onButtonCancelClick = () => {
    //     props.onModalClose();
    //     setVisible(false);
    // };
    // hideSpinner=()=> {
    //     setisLoadingVisible(false) 
    //   }
    return (
        <Modal transparent animated visible={visible} animationType='slide' onRequestClose={() => { console.log('onRequestClose'); }}>
            {/* <BlurView viewRef={1} style={styles.blurView} blurType='light' blurRadius={5} blurAmount={10} /> */}
         {/* //   <View style={styles.topTransparentView} /> */}
         <CustomStatusBar backgroundColor="#aa182c"
                  barStyle="light-content"/>
            <SafeAreaView style={styles.safeArea}>
           
            <Header style={{backgroundColor:'#aa182c',height:33}}>
                                    <Left style={{margin:5,marginTop:-20}}>
                                        <Button transparent onPress={() => {
                            props.onModalClose();
                            setVisible(false);
                        }} >
                                            {/* <Icon name='arrow-back' /> */}
                                            <Image source={back} />
                                            <Text style={{color:'white', fontFamily:FONT_FAMILY_PT_REGULAR}}>Back</Text>
                                        </Button>
                                    </Left>
                                    {/* //<Body> */}
                                     <Title style={styles.title}>{props.documentName}</Title>
                                    {/* </Body> */}
                                    <Right></Right>
                                </Header>
                              <Container style={styles.container}>   
                    <View style={{width:screenWidth,height:'100%',alignContent:'center',justifyContent:'center'}}>
                   <WebView 
                      onLoadEnd={() => setisLoadingVisible(false)}
                      source={{ uri: `${constants.webService.documentBaseUrl}${finalurl}`}}
                      style={{ marginLeft:6,marginTop:0,width:'124%',height:'100%' }}
                      javaScriptEnabled={true}
                      domStorageEnabled={true}
                   />
                </View>
                </Container>
            </SafeAreaView>
        </Modal>
    );
}

export default CorrespondenceDocumentViewer;

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
        
        width:'70%',
        height:45, 
        flexWrap: 'wrap',
        flexDirection:'row',
        fontFamily:FONT_FAMILY_PT_REGULAR,
        alignItems:'center',
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

