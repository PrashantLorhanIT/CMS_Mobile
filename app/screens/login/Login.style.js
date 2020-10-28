import { StyleSheet, Dimensions } from 'react-native';

import { WHITE, TEMP_THEME_PRIMARY, TEMP_THEME_SECONDARY } from '../../utils/styles/colors';
import { FONT_SIZE_12, FONT_SIZE_20,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_BOLD_PT } from '../../utils/styles/typography';

const { height } = Dimensions.get('window');
const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    image: {
        height:'100%',
        width:'100%',
        resizeMode: "cover",
        justifyContent: "center"
      },
    scrollView: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    scrollViewContentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    scrollViewContainer: {
        width: '100%',
        // flex: 1,
        justifyContent: 'center',
        marginTop: height * 0.01,
        backgroundColor: 'transparent'
    },
    card: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        margin:20,
        marginTop:25
    },
    form: {
        padding: '5%',
        backgroundColor: 'transparent',
        borderColor: 'transparent'
    },
    icons: {
        color: WHITE
    },
    input: {
        // color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius:5,
        marginTop:10,
        backgroundColor:'white',
        fontFamily:FONT_FAMILY_PT_REGULAR,
        paddingLeft:15,
        
    },
    inputArabic: {
        // color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius:5,
        marginTop:10,
        backgroundColor:'white',
        fontFamily:FONT_FAMILY_PT_REGULAR,
        paddingLeft:15,
        textAlign:'right'
        
    },
    inputPicker: {
        // color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius:5,
        marginTop:10,
        backgroundColor:'white',
        width:screenWidth-35, 
    },
    inputPickerArbic: {
        // color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius:5,
        marginTop:10,
        backgroundColor:'white',
        width:screenWidth-35,
        flexDirection:'row-reverse'     
    },
    loginButton: {
        backgroundColor: '#a62032',
        width: '90%',
        flex: 1,
        alignItems: 'center',
        height: 50,
        alignSelf:'center',
        justifyContent:'center'
    },
    loginButtonIcon: {
        color: TEMP_THEME_PRIMARY,
        margin: 0,
        padding: 0
    },
    loginButtonText: {
        fontSize:18,
        color: 'white',
        justifyContent: 'center',
        textAlign:'center',
        fontFamily:FONT_FAMILY_PT_REGULAR,

        //padding: 0
    },
    loginButtonContainer: {
        // padding: 5,
        flex: 1,
        alignItems: 'center'
    },
    loginMarginView: {
        height: '5%'
    },
    logo: {
        width: 280,
        height: 180,
        marginTop:40,
         marginLeft:-5
       
    },
    text: {
       fontSize:22,
       fontWeight:'700',
       marginTop:-20,
       color:'white',
    //    marginLeft:30,
       fontFamily:FONT_FAMILY_PT_REGULAR,
       justifyContent:'center'
    }
});


export default styles;