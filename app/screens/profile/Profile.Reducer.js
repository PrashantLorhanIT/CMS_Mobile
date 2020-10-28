import ActionTypes from '../../redux/ActionTypes';

const initialState = {
    userProfile: null,
}

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.profile.SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
            };
        default:
            return state;

    }
}