import { StyleSheet, Dimensions } from 'react-native';
import { margin } from '../../utils/styles/mixins';
import { FONT_SIZE_12,FONT_SIZE_14,FONT_WEIGHT_BOLD,FONT_FAMILY_PT_REGULAR,FONT_FAMILY_PT_BOLD,FONT_WEIGHT_REGULAR } from '../../utils/styles/typography';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollView: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    seprator: {
        width: 4,
        backgroundColor: "#4bbc00",
        marginRight:-5,
        marginRight:7,
        marginStart:-5
    },
    sepratorLine:{
        height:3,
        width:3,
        backgroundColor: '#4bbc00',
        marginLeft:0,
        marginRight:0,
        marginTop:5,
        
    },
    mainContainer: {
        flex:1,
        marginRight:5,
        margin:5,
        marginBottom:-5,
        padding:0,
        backgroundColor:'white'
    },
    mainContainerNew: {
        flex:1,
        marginRight:5,
        margin:5,
        marginBottom:-5,
        padding:0,
        backgroundColor:'#d3d3d6'
    },
    container: {
        flex:1, 
        flexDirection:'row',
        justifyContent:'center',  
        margin:5,
        marginTop:0,
        marginBottom:0
    },
    containerArabic: {
        flex:1, 
        flexDirection:'row',
        justifyContent:'center',  
        margin:5,
        marginTop:0,
        marginBottom:0,
        alignSelf:'flex-end'
    },
    userContainer: {
       flex:1,
          flexDirection:'row',
         justifyContent:'space-between',
          
        },
     userContainerArabic: {
            flex:1,
               flexDirection:'row',
              justifyContent:'flex-end',
              alignSelf:'flex-end'
               
             },
    dateContainer: { 
            flex:1,
            flexDirection:'row',
             justifyContent:'flex-end',
            // alignContent:'flex-end',
            
        },
        dateContainerArabic: { 
            flex:1,
            flexDirection:'row',
             justifyContent:'flex-start',
            // alignContent:'flex-end',
            
        },
   nameText: {
    fontSize:13,
    fontWeight: FONT_WEIGHT_BOLD,
    fontFamily:FONT_FAMILY_PT_BOLD,
    color:'#4d4f5c',
    marginTop:3
   },
   dateText: {
    fontSize:12,
    fontWeight: FONT_WEIGHT_REGULAR,
    fontFamily:FONT_FAMILY_PT_REGULAR,
    color:'#43425d',
    marginTop:3
   },
//    contentText: {
//     fontSize:FONT_SIZE_12,
//     fontWeight: FONT_WEIGHT_REGULAR,
//    }
})
export default styles;