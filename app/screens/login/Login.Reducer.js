import ActionTypes from '../../redux/ActionTypes';

const initialState = {
    loggedInUser: null,
    userName: null,
    email: null,
    userId: null,
    userProfile:null,
};
export let loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.login.SET_LOGGED_IN_USER:
            return {
                ...state,
                loggedInUser: action.payload
            };
        case ActionTypes.login.SET_AUTH_TOKENS:
            return {
                ...state,
                ...action.payload,
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