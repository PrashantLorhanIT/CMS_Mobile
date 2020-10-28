import React, { Component } from 'react';
import { Container, Button, Text ,Header,Left,Title, Right} from 'native-base';
import { View, SafeAreaView, TouchableOpacity, StatusBar, Modal,Image, Alert } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { colors } from '../../utils/styles/colors';
import styles from './Calendar.Styles';
import { parseDate } from './CalendarDateUtils';
import CustomStatusBar from '../../utils/styles/CustomStatusBar';
import back from '../../assets/image/backArrowLeft/back.png';
import { FONT_SIZE_12, FONT_SIZE_16, FONT_WEIGHT_BOLD, FONT_FAMILY_PT_BOLD, FONT_FAMILY_PT_REGULAR } from '../../utils/styles/typography';

/*
How to use Calendar
isCalendarVisible && <Calendar onModalClose = { () => { this.setState({ isCalendarVisible: false }) } } getDates = { (startDate, endDate) => {
    console.log(`Start Date: ${startDate} --- End Date: ${endDate}`);
} }/>
*/
import i18n, { t } from '../../utils/localization/servicesi18n/index';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alreadySelectedStartingDay: false,
            startingDay: new Date(),
            endingDay: new Date(),
            isVisible: true,
        }
    }

    onDayPress = (day) => {
        let { startingDay, alreadySelectedStartingDay } = this.state;
        startingDay = parseDate(startingDay);
        const xday = parseDate(day);

        if (alreadySelectedStartingDay && (startingDay > xday)) {

            return this.setState({
                alreadySelectedStartingDay: false,
                startingDay: new Date(),
                endingDay: new Date(),
            });
        }
        this.setState((state) => {
            return {
                startingDay: state.alreadySelectedStartingDay ? state.startingDay : new Date(day.dateString),
                endingDay: state.alreadySelectedStartingDay ? new Date(day.dateString) : null,
                alreadySelectedStartingDay: !state.alreadySelectedStartingDay,
            };
        });
    }

    onStartDateViewTap = () => {
        this.setState({
            alreadySelectedStartingDay: false
        });
    }

    onEndDateViewTap = () => {
        this.setState({
            alreadySelectedStartingDay: true
        });
    }

    onDoneTap = () => {
        const { startingDay, endingDay } = this.state;
        console.log('Starting date', startingDay);
        console.log('EndingDay date', endingDay);
        if (startingDay != null && endingDay != null){
            this.props.getDates(startingDay, endingDay);
            this.props.onModalClose();
            this.setState({
                isVisible: false
            });
        } else {
            this.alertWithMessage('Please select from and to date');
        }   
    }
    alertWithMessage = (message) =>
    Alert.alert(
        "",
        
        message,
        [
            { text: "OK", onPress: () => {} }
        ],
        { cancelable: false }
    );
    getDatesArrayForPeriod = () => {
        let { startingDay, endingDay } = this.state;
        startingDay = parseDate(startingDay);
        endingDay = parseDate(endingDay);

        if (startingDay != null && endingDay != null) {
            const datesObject = {};
            let currentDate = parseDate(startingDay);
            while (currentDate.diffMilliseconds(endingDay) >= 0) {
                const year = currentDate.getFullYear();
                const month = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
                const date = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();
                const color = currentDate.diffMilliseconds(startingDay) === 0 || currentDate.diffMilliseconds(endingDay) === 0 ? '#aa182c' : '#aa182c';
                const textColor = currentDate.diffMilliseconds(startingDay) === 0 || currentDate.diffMilliseconds(endingDay) === 0 ? 'white' : 'black';
                datesObject[`${year}-${month}-${date}`] = {
                    color: color,
                    startingDay: currentDate.diffMilliseconds(startingDay) === 0,
                    endingDay: currentDate.diffMilliseconds(endingDay) === 0,
                    textColor: textColor
                };
                currentDate = currentDate.setDate(currentDate.getDate() + 1);
            }

            return datesObject;
        } else if (startingDay) {
            const datesObject = {};
            const year = startingDay.getFullYear();
            const month = (startingDay.getMonth() + 1) < 10 ? `0${startingDay.getMonth() + 1}` : startingDay.getMonth() + 1;
            const date = startingDay.getDate() < 10 ? `0${startingDay.getDate()}` : startingDay.getDate();
            const color = '#aa182c';
            const textColor = 'white';
            datesObject[`${year}-${month}-${date}`] = {
                color: color,
                startingDay: true,
                endingDay: false,
                textColor: textColor,
            };

            return datesObject;
        } else {
            return {};
        }
    }

    render = () => {
        const { startingDay, endingDay, alreadySelectedStartingDay } = this.state;
        const { isVisible } = this.state;
        return (
            <Modal animated isVisible={isVisible} animationType='slide' onRequestClose={() => { console.log('onRequestClose'); }} >
               <CustomStatusBar backgroundColor="#aa182c"
                  barStyle="light-content"/>
            <SafeAreaView style={styles.safeArea}>
           
            <Header style={{backgroundColor:'#aa182c',height:33}}>
                                    <Left style={{margin:5,marginTop:-20}}>
                                        <Button transparent onPress={() => {
                            this.props.onModalClose();
                            this.setState({
                                isVisible: false
                            });
                        }} >
                                            {/* <Icon name='arrow-back' /> */}
                                            <Image source={back} />
                                            <Text style={{color:'white', fontFamily:FONT_FAMILY_PT_REGULAR}}>Back</Text>
                                        </Button>
                                    </Left>
                                    {/* //<Body> */}
                                     <Title style={{color:'white',marginTop:-17,width:'70%',height:45, flexWrap: 'wrap',flexDirection:'column',fontFamily:FONT_FAMILY_PT_REGULAR}}>{t('InboxScreen:Calendar')}</Title>
                                    {/* </Body> */}
                                    <Right></Right>
                                </Header>
                    <Container style={styles.container}>
                        {/* <View style={styles.header}>
                            <Button style={styles.cross} onPress={() => {
                                this.props.onModalClose();
                                this.setState({
                                    isVisible: false
                                });
                            }}>
                                <Text style={styles.crossBtnTitle}>
                                    X
                                </Text>
                            </Button>
                        </View> */}
                        <Text style={styles.screenTitle} >{t('InboxScreen:SelectDate')}</Text>
                        <View style={styles.dateRangeView}>
                            <TouchableOpacity style={styles.startDayView} onPress={this.onStartDateViewTap}>
                                <View>
                                    <Text style={alreadySelectedStartingDay ? styles.dayText : styles.dayTextActive}>{t('InboxScreen:From')}</Text>
                                    <Text style={styles.date}>{startingDay.toDateString()}</Text>
                                    <View style={alreadySelectedStartingDay ? styles.selectedDateIndicatorInactive : styles.selectedDateIndicatorActive} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.endDayView} onPress={this.onEndDateViewTap}>
                                <View>
                                    <Text style={alreadySelectedStartingDay ? styles.dayTextActive : styles.dayText}>{t('InboxScreen:To')}</Text>
                                    <Text style={styles.date}>{endingDay ? endingDay.toDateString() : `--`}</Text>
                                    <View style={alreadySelectedStartingDay ? styles.selectedDateIndicatorActive : styles.selectedDateIndicatorInactive} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.calendarContainer}>
                            <CalendarList markedDates={this.getDatesArrayForPeriod()}
                                markingType='period'
                                onDayPress={this.onDayPress}
                            />
                        </View>
                        <View style={styles.doneButtonContainer}>
                            <Button style={styles.doneButton} onPress={this.onDoneTap}>
                                <Text>
                                {t('InboxScreen:Done')}
                                </Text>
                            </Button>
                        </View>
                    </Container>
                </SafeAreaView>
            </Modal>
        );

    }
}
export default Calendar;
