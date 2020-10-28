import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../redux/index';
import networkManager from '../../services/network-manager/networkManager';
import { constants } from '../../utils/constants/constants';
import  SecurityManager  from '../../services/Keychain/SecurityManager';
import { Reachability } from '../../services/netInfo/Rechability';

export const getProfileDetails = (userId) => {
    console.log('profile Action method')
    return async (dispatch) => {
        try {
            const params = {
                UserID: userId
            }
            dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.userProfile, params);
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

export const setProfile = (payload) => {
    return {
        type: ActionTypes.profile.SET_USER_PROFILE,
        payload: payload,
    }
}


