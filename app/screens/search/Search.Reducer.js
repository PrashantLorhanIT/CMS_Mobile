import ActionTypes from '../../redux/ActionTypes';

const initialState = {
    searchDetails: [],
    searchProjectContract:[],
    searchSenderAndRecipent:[],
    searchReviewerandApprover:[],
    searchLocation: [],
    searchDiscipline: [],
}

export const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.search.SET_CORRESPONDENCE_SEARCH:
            return {
                ...state,
                searchDetails: action.payload,
            };
        case ActionTypes.search.SET_SEARCH_PROJECTCONTRACT:
            return {
                ...state,
                searchProjectContract: action.payload,
            };
        case ActionTypes.search.SET_SEARCH_SENDERANDRECIPENT:
            return {
                ...state,
                searchSenderAndRecipent: action.payload,
            };
        case ActionTypes.search.SET_SEARCH_REVIEWERANDAPPROVER:
            return {
                ...state,
                searchReviewerandApprover: action.payload,
            };
        case ActionTypes.search.SET_SEARCH_LOCATION:
            return {
                ...state,
                searchLocation: action.payload,
            };
        case ActionTypes.search.SET_SEARCH_DISCIPLINE:
            return {
                ...state,
                searchDiscipline: action.payload,
            };
        default:
            return state;

    }
}