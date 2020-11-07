import { StyleSheet, Dimensions } from 'react-native';

import { WHITE, TEMP_THEME_PRIMARY, TEMP_THEME_SECONDARY } from '../../utils/styles/colors';
import { FONT_SIZE_12, FONT_SIZE_16,FONT_WEIGHT_BOLD, FONT_SIZE_14, FONT_FAMILY_PT_REGULAR, FONT_BOLD_PT } from '../../utils/styles/typography';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    scrollView: {
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
    },
    segment: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 15,
        paddingTop: 10,
        color:'#f2f2f2'
        //paddingBottom: SCALE_8,
    },
    activeSegmentButton: {
        flex: 1,
        backgroundColor: '#373d38',
        borderWidth: 1,
       // borderRadius: 13,
        borderColor: '#373d38',
        borderBottomEndRadius: 13,
        borderTopEndRadius: 13,
        borderBottomStartRadius: 13,
         borderTopStartRadius: 13
    },
    activeSegmentText: {
        flex: 1,
        color: 'white',
        fontSize: FONT_SIZE_14,
        fontWeight: FONT_WEIGHT_BOLD,
        fontFamily:FONT_FAMILY_PT_REGULAR,
        textAlign: 'center'
    },
    inactiveSegmentInboxButton: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        // borderRadius: 12,
        borderColor: '#f2f2f2',
        borderBottomStartRadius: 13,
        borderTopStartRadius: 13
    },
    inactiveSegmentTaskButton: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        // borderRadius: 12,
        borderColor: '#f2f2f2',
        borderBottomEndRadius: 13,
        borderTopEndRadius: 13,
    },
    inactiveSegmentText: {
        flex: 1,
        color: '#373d38',
        fontSize: FONT_SIZE_14,
        fontWeight: FONT_WEIGHT_BOLD,
        fontFamily:FONT_FAMILY_PT_REGULAR,
        textAlign: 'center'
    },
    seachBar: {
      flex:1,    
     marginLeft:10, 
    marginRight:10,
    marginTop:15,
    backgroundColor:'#f2f2f2'
    },
    sperator: {
        flex: 0,
        borderColor: TEMP_THEME_PRIMARY,
        borderWidth: 0.5
    },
    noRecordsText: {
        color: TEMP_THEME_PRIMARY,
        fontSize: FONT_SIZE_16,
        fontWeight: FONT_WEIGHT_BOLD,
        fontFamily:FONT_FAMILY_PT_REGULAR,
        textAlign: 'center',
        marginTop:60
   }
})
export default styles;