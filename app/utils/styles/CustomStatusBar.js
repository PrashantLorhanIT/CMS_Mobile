import React from 'react';
import { View, StatusBar} from 'react-native';
import { StyleSheet, Platform } from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 45 : StatusBar.currentHeight;

const CustomStatusBar = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
    );
   
 export default CustomStatusBar;
const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT
        }
})