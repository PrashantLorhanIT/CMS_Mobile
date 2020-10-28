import { SCALE_8, SCALE_18, SCALE_16 } from '../../utils/styles/spacing';
import { typography} from '../../utils/styles/typography';
import {colors} from '../../utils/styles/colors';
import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    header: {
        width: '100%',
        height: 50,
    },
    cross: {
        height: 50,
        width: 50,
        marginLeft: 'auto',
        marginRight: 10,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'transparent'
    },
    crossBtnTitle: {
        color: 'black',
        fontSize: 20,
    },
    screenTitle: {
        color: 'black',
        fontSize: 35,
        //fontWeight: typography.FONT_WEIGHT_BOLD,
        margin: 18,
    },
    dateRangeView: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 16,
        paddingRight: 16,
        marginBottom: 16
    },
    startDayView: {
        flex: 1,
        flexDirection: 'column',
    },
    endDayView: {
        flex: 1,
        flexDirection: 'column',
    },
    dayText: {
        color: 'gray',
        fontSize: 14
    },
    dayTextActive: {
        color: '#aa182c',
        fontSize: 14
    },
    date: {
        fontSize: 20,
        margin:5
    },
    selectedDateIndicatorActive: {
        backgroundColor: '#aa182c',
        height: 2,
        width: '100%'
    },
    selectedDateIndicatorInactive: {
        backgroundColor: 'transparent',
        height: 2,
        width: '100%'
    },
    calendarContainer: {
        flex: 7
    },
    doneButton: {
        marginLeft: 18,
        marginRight: 18,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aa182c'
    },
    doneButtonContainer: {
        height: 160,
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',

    }
});