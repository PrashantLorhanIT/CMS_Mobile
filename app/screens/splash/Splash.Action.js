import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../redux/index';
import networkManager from '../../services/network-manager/networkManager';
import { constants } from '../../utils/constants/constants';
import { Reachability } from '../../services/netInfo/Rechability';
import  SecurityManager  from '../../services/Keychain/SecurityManager';
import axios from 'axios';
import { AsyncStorage } from 'react-native';


export const checkIfAlreadyAuthenticated = () => {
    return async (dispatch) => {
        try {
            console.log('Splash Actions: checkIfAlreadyAuthenticated');
           // dispatch(isAppLoading(true));
          //  const securityManager = new SecurityManager();
         //   const credentials = await securityManager.getCredentialsFromKeychain();
           
            const token = await AsyncStorage.getItem('token');
            const refreshtoken = await AsyncStorage.getItem('refershToken');
            const userId = await AsyncStorage.getItem('userId');
            console.log('fetched Credentials');
            console.log(token);
            console.log(refreshtoken);
            console.log(userId);
            // const userToken = token;
            // const userId = userId;
            // console.log('fetched Credentials for');
            // console.log(userToken);
            // console.log(userId);
            if (token && token != '') {
                dispatch(getRefershToken(token, refreshtoken));
              } 
            const newtoken = await AsyncStorage.getItem('token');
            console.log(newtoken);
            if (newtoken && newtoken != ''){
                dispatch(getProfileDetails(userId));
            }
            if (newtoken && newtoken != '') {
                dispatch(isAppLoading(false));
                dispatch(setUserToken(newtoken));
                dispatch(setLoggedInUser(userId, newtoken));
                dispatch(setUserId(userId));
                dispatch(appHasError(null));
                // isLoading = false

            } else {
                dispatch(isAppLoading(false));
                dispatch(appHasError(null));
                dispatch(setLoggedInUser(null));
                dispatch(setUserId(null));
                dispatch(setUserToken(null));
                // isLoading = false
            }
        } catch (error) {
            console.log('Error In Action getOfflineUser.');
            console.log(error);
            dispatch(isAppLoading(false));
            dispatch(appHasError(error));
            dispatch(setUserName(null));
            dispatch(setUserId(null));
            // isLoading = false

        }
    };
}


export const getProfileDetails = (userId) => {
    console.log('profile Action method')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                UserID: userId
            }
            console.log('profile Action method')
            console.log(params);
            console.log('user profile token', token);
          //  dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.userProfile, params, token);
            const response = newLocal;
            console.log('user Profile response');
            console.log(response);
            const jsonArray = response['data'];
            const userProfileJason = jsonArray[0];
            console.log('User Profile Json');
            console.log(userProfileJason);
            dispatch(setProfile(userProfileJason));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getRefershToken = (tokens, refreshTokens) => {
    console.log('getRefershToken Action method')
    return async (dispatch) => {
        //const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                token: tokens,
                    refreshToken: refreshTokens
            }
            console.log('Parameter in Network Details');
            console.log(params);
            
          //  dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.userProfile, params, token);
            const response = newLocal;
            console.log('user Profile response');
            console.log(response);
            const jsonResponse = response['data'];
            const {
                token,
                refreshToken
            } = jsonResponse;
            if (response.data.statusCode == "200" && response.data != null) {
                console.log('Get refersh token success');
                AsyncStorage.setItem('token', token);
                AsyncStorage.setItem('refershToken', refreshToken);
            }
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const setLoggedInUser = (ridUsermaster, token) => {
    return {
        type: ActionTypes.login.SET_LOGGED_IN_USER,
        payload: {
            ridUsermaster, 
            token
        },
    };
}
export const setUserToken = (payload) => {
    console.log('Set user token method', payload);
    return {
        type: ActionTypes.profile.SET_USER_TOKEN,
        payload: payload,
    }
}

export const setUserId = (payload) => {
    return {
        type: ActionTypes.login.USER_ID,
        payload: payload,
    }
}
export const setProfile = (payload) => {
    return {
        type: ActionTypes.profile.SET_USER_PROFILE,
        payload: payload,
    }
}