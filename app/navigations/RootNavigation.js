import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { constants } from '../utils/constants/constants';

const { routeNames } = constants;

const navigationRef = React.createRef();

export default class RootNavigation extends Component {
    render() {
        return (
            <NavigationContainer ref={navigationRef} >
                {/* <Stack.Navigator headerMode="none" initialRouteName={routeNames.auth.rootName} >
                    {/* <Stack.Screen name={routeNames.auth.rootName} component={AuthNavigator} />
                    <Stack.Screen name={routeNames.root} component={RootContainer} options={{ gestureEnabled: false }} /> */}
                {/* </Stack.Navigator> */} 
            </NavigationContainer>
        );
    }
}

export const navigate = (routeName, params) => {
    navigationRef.current?.navigate(routeName, params);
}