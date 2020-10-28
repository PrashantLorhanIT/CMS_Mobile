import ActionTypes from '../../redux/ActionTypes';

const initialState = {
    usertoken:null,
    userId: null,
    userProfile: [],
    loggedInUser: null,
}

export const SplashReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.login.SET_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.payload
            };
        case ActionTypes.profile.SET_USER_TOKEN:
            return {
                ...state,
                usertoken: action.payload,
            };
        case ActionTypes.login.USER_ID:
            return {
                    ...state,
                    userId: action.payload,
                };
        case ActionTypes.profile.SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
            };     
        default:
            return state;

    }
}