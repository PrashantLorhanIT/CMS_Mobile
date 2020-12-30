import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../redux/index';
import networkManager from '../../services/network-manager/networkManager';
import { constants } from '../../utils/constants/constants';
import  SecurityManager  from '../../services/Keychain/SecurityManager';
import { Reachability } from '../../services/netInfo/Rechability';
import { AsyncStorage } from 'react-native';
import { setUserId } from '../splash/Splash.Action';
import {  Alert} from 'react-native';

export const performLogin = (username, password, checked, callback) => {
    console.log('Login action method ')
    return async (dispatch) => {
        dispatch(isAppLoading(true));
        try {
            const params = {
                userName: username,
                password: password,    
            }
            console.log(`Username: ${username}, password: ${password}`);
            const response = await networkManager.postRequestWithOutHeaderHandler(constants.webService.methods.auth.login, params);
            console.log('Login Responce');
            console.log(response);
            const jsonResponce = response['data'];
            const json = jsonResponce[0];
            const { email, userNames, rolename, firstname, lastname, companyname, companycode, consultantname, consultantcode, refreshToken ,ridUsermaster, token} = json;
            const param = {
                UserID: ridUsermaster
            }
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.userProfile, param, token);
            const profileresponse = newLocal;
            const jsonArray = profileresponse['data'];
            
            const userProfileJason = jsonArray[0];
            console.log('User Profile Json');
            console.log(userProfileJason);
        
            if (checked === false) {
                console.log('User Profile Json is rember device ');
                const securityManager = new SecurityManager();
                const success = await securityManager.setCredentialsInKeychain(json.token.toString(), json.ridUsermaster.toString());
                console.log(`Success: ${success}`);
            }
            
            dispatch(isAppLoading(false));
            dispatch(setProfile(userProfileJason));
            dispatch(setAuthTokens(userNames,token,ridUsermaster));
            dispatch(setLoggedInUser(ridUsermaster, token, refreshToken));
            AsyncStorage.setItem('userId', ridUsermaster.toString());
            AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('refershToken', refreshToken);
             //dispatch(saveUserIds(ridUsermaster.toString()));
            dispatch(saveUserRefershToken(refreshToken));
            dispatch(appHasError(null));
           
        } catch (error) {
            console.log('Error In Action performLogin.');
            console.log(error);
            dispatch(isAppLoading(false));
            dispatch(appHasError(error));
           // callback(error); 
           alertWithMessage('Please check username password');
            
        }
    };
}

export const alertWithMessage = (message) =>
Alert.alert(
    "",
    message,
    [
        { text: "OK", onPress: () => {} }
    ],
    { cancelable: false }
);

export const checkIfAlreadyAuthenticated = () => {
    return async (dispatch) => {
        try {
            console.log('Login Actions: checkIfAlreadyAuthenticated');
            dispatch(isAppLoading(true));
            const securityManager = new SecurityManager();
            const credentials = await securityManager.getCredentialsFromKeychain();
            console.log('fetched Credentials');
            console.log(credentials);
            const token = credentials.username;
            const refreshToken = credentials.password;
            if (token && token != '' && user) {
                dispatch(isAppLoading(false));
                dispatch(setAuthTokens(token, refreshToken));
                dispatch(setLoggedInUser(user));
                dispatch(appHasError(null));
                dispatch(setAuthTokens(token, refreshToken));
            } else {
                dispatch(isAppLoading(false));
                dispatch(appHasError(null));
                dispatch(setAuthTokens(null, null));
                dispatch(setLoggedInUser(null));
            }
        } catch (error) {
            console.log('Error In Action getOfflineUser.');
            console.log(error);
            dispatch(isAppLoading(false));
            dispatch(appHasError(error));
            dispatch(setAuthTokens(null, null));
            dispatch(setLoggedInUser(null));

        }
    };   
}

export const setLoggedInUser = (userId, token, refreshToken) => {
    return {
        type: ActionTypes.login.SET_LOGGED_IN_USER,
        payload: {
            userId, 
            token,
            refreshToken
        },
    };
}

export const setAuthTokens = (userName, token, userId) => {
    return {
        type: ActionTypes.login.SET_AUTH_TOKENS,
        payload: {
            userName,
            token,
            userId
        }
    };
}

export const setProfile = (payload) => {
    console.log('Set profile ');
    return {
        type: ActionTypes.profile.SET_USER_PROFILE,
        payload: payload,
    }
}

export const reachabilityUpdater = () => {
    return (dispatch) => {
        Reachability.checkReachability((isInternetAvailable) => {
            dispatch(isInternetReachable(isInternetAvailable));
        });
    };
}

export const saveUserIdStorage = async userId => {
    try {
      await AsyncStorage.setItem('userId', userId);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
      }
    
  };

  export const saveUse = async token => {
      
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  export const saveUserRefershToken = async refershToken => {
    try {
      await AsyncStorage.setItem('refershToken', refershToken);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };