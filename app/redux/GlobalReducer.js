import ActionTypes from './ActionTypes';

const initialState = {
    isLoading: false,
    error: null,
    isInternetReachable: false
}
export function globalReducer(state = initialState, action) {

    switch (action.type) {
        case ActionTypes.global.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case ActionTypes.global.APP_HAS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case ActionTypes.global.IS_INTERNET_REACHABLE:
            return {
                ...state,
                isInternetReachable: action.payload
            }
        default:
            return state;
    }
}