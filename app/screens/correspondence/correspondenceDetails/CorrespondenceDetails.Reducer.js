import ActionTypes from '../../../redux/ActionTypes';

const initialState = {
    correspondenceDetailData: [],
    correspondenceDetailAttachment: [],
    correspondenceDetailDelegateUserMater:[],
    correspondenceDetailForwardUserMater:[],
    rfiDetailForwardUserMater:[],
    correspondenceDetailComment:[],
    correspondenceDetailCorrespondenceProperties:[],
    correspondenceDetailDistributeProperties:[],
    correspondenceDetailApprovelProperties:[],
    correspondenceDetailWrokflowSteps:[],
    correspondenceDetailTasks:[],
    correspondenceDetailActionItem: [],
    momDetailsPropertiesAttendees:[],
    momDetailsPropertiesTaskComment: [],
    corresponseApproveReject: false,
    categoryList:[],
    
}

export const CorrespondenceDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL:
            return {
                ...state,
                correspondenceDetailData: action.payload,
            };
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_ATTACHMENT:
            return {
                ...state,
                correspondenceDetailAttachment: action.payload,
            };   
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_USERMASTER:
            return {
                ...state,
                correspondenceDetailDelegateUserMater: action.payload,
            }; 
        case ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_FORWARDDELEGATE:
            return {
                ...state,
                correspondenceDetailForwardUserMater: action.payload,
            };  
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_COMMENTS:
            return {
                ...state,
                correspondenceDetailComment: action.payload,
            }; 
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_CORRESPONDENCE_PROPERTIES:
            return {
                ...state,
                correspondenceDetailCorrespondenceProperties: action.payload,
            }; 
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_DISTRIBUTE_PROPERTIES:
                return {
                    ...state,
                    correspondenceDetailDistributeProperties: action.payload,
            };  
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_APPROVEL_PROPERTIES:
                return {
                    ...state,
                    correspondenceDetailApprovelProperties: action.payload,
            };  
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_WORKFLOW_STEPS:
                return {
                    ...state,
                    correspondenceDetailWrokflowSteps: action.payload,
            }; 
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_TASKS:
                return {
                    ...state,
                    correspondenceDetailTasks: action.payload,
            };  
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_APPROVE_REJECT_CLOSE:
                return {
                    ...state,
                    corresponseApproveReject: action.payload,
            };  
        case ActionTypes.correspondence.SET_CORRESPONDENCE_CATEGORY:
                return {
                    ...state,
                    categoryList: action.payload,
            }; 
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_ACTIONITEM:
                return {
                    ...state,
                    correspondenceDetailActionItem: action.payload,
            }; 
        case ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_MOM_PROPERTIES_ATTENDEES:
                return {
                    ...state,
                    momDetailsPropertiesAttendees: action.payload,
            }; 
         case ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_MOMTASKCOMMENT:
                return {
                    ...state,
                    momDetailsPropertiesTaskComment: action.payload,
            }; 

     case ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_RFIFORWARDUSERMSTER:
            return {
                ...state,
                rfiDetailForwardUserMater: action.payload,
            };  

        default:
            return state;
    }
}