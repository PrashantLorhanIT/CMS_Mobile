import ActionTypes from './ActionTypes';

export const isAppLoading = (isLoading) => {
    return {
        type: ActionTypes.global.IS_LOADING,
        payload: isLoading
    };
}

export const appHasError = (error) => {
    return {
        type: ActionTypes.global.APP_HAS_ERROR,
        payload: error
    };
}


export const isInternetReachable = (isInternetReachable) => {
    return {
        type: ActionTypes.global.IS_INTERNET_REACHABLE,
        payload: isInternetReachable
    };
}