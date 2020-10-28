import { ActivityIndicator, View, Modal } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { spacing } from '../../utils/styles/spacing';
import { colors } from '../../utils/styles/colors';
// import { BLUE } from '_app/styles/colors';

const Loader = (props) => {
    console.log('Loader');
    return (
        <Modal transparent visible={props.isLoading}>
            <View style={styles.container} >
                <View style={styles.background} />
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator style={styles.ActivityIndicator} size='large' color='#ffffff' />

                </View>
            </View>
        </Modal>
    );
}

export default Loader;

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'transparent',
    },
    container: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ActivityIndicator: {
        height: '100%',
        width: '100%',
    },
    activityIndicatorContainer: {
        height: 18 * 4,
        width:18 * 4,
        backgroundColor: '#6F3236',
        borderRadius: 8,
    },
    background: {
        height: '100%',
        width: '100%',
        backgroundColor: '#000000',
        opacity: 0.7,
        position: 'absolute',
    }
});