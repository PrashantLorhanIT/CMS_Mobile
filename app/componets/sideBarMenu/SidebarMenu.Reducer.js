import ActionTypes from '../../redux/ActionTypes';

const initialState = {
    isManualLogout: false
};

export const SidebarMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.logout.IS_MANUAL_LOGOUT:
            return {
                ...state,
                isManualLogout: action.payload,
            };
        default:
            return state;
    }
}