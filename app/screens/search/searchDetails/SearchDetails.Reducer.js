import ActionTypes from '../../../redux/ActionTypes';

const initialState = {
    searchCorrespondenceProperties: [],
    searchCorrespondenceDistribute: [],
    searchCorrespondenceWrokFlowSteps: [],
    searchAttachment:[],
    searchMomProperties:[],
    searchMomAttendees:[],
    searchMomTaskComment:[],
    searchRFIProperties: [],
}

export const SearchDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.search.SET_CORRESPONDENCE_SEARCH_CORRESPONDENCE_PROPERTIES:
            return {
                ...state,
                searchCorrespondenceProperties: action.payload,
            };
        case ActionTypes.search.SET_CORRESPONDENCE_SEARCH_DISTRIBUTE_PROPERTIES:
            return {
                ...state,
                searchCorrespondenceDistribute: action.payload,
            };
         case ActionTypes.search.SET_CORRESPONDENCE_SEARCH_WORKFLOW_STEPS:
                return {
                    ...state,
                    searchCorrespondenceWrokFlowSteps: action.payload,
            };
        case ActionTypes.search.SET_CORRESPONDENCE_SEARCH_ATTACHMENT:
                return {
                    ...state,
                    searchAttachment: action.payload,
            };
        case ActionTypes.search.SET_CORRESPONDENCE_SEARCH_MOM_PROPERTIES:
                return {
                    ...state,
                    searchMomProperties: action.payload,
            };
        case ActionTypes.search.SET_CORRESPONDENCE_SEARCH_MOM_ATTENDEES:
                return {
                    ...state,
                    searchMomAttendees: action.payload,
            };
        case ActionTypes.search.SET_CORRESPONDENCE_SEARCH_MOM_TASKCOMMENT:
                return {
                    ...state,
                    searchMomTaskComment: action.payload,
            };
        case ActionTypes.search.SET_CORRESPONDENCE_SEARCH_RFI_PROPERTIES:
                return {
                    ...state,
                    searchRFIProperties: action.payload,
            };
        default:
            return state;

    }
}