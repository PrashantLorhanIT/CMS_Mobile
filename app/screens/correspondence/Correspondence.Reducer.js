import ActionTypes from '../../redux/ActionTypes';

const initialState = {
    correspondenceInbox: [],
    cooreSenderAndRecipent: [],
    correspondenceInboxCount: null
}
export const CorrespondenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX:
            return {
                ...state,
                correspondenceInbox: action.payload,
                //correspondenceInbox: state.correspondenceInbox.concat(action.payload)
            };
        case ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_NEXTPAGE:
                return {
                    ...state,
                    //correspondenceInbox: action.payload,
                    correspondenceInbox: state.correspondenceInbox.concat(action.payload)
                };
         case ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_COUNT:
            return {
                ...state,
                //correspondenceInbox: action.payload,
                correspondenceInboxCount: action.payload
            };
        case ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_SENDERANDRECIPENT:
                return {
                   ...state,
                cooreSenderAndRecipent: action.payload,
            };
        case ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_DELETERECORD:
                let arr = [...state.correspondenceInbox];
                let deletedEle;
                for(let i = 0; i < arr.length; i++) {
                    const id  = action.id;
                    if(arr[i].ridInOutCorr === id) {
                        deletedEle = i;
                    }
                }
                arr.splice(deletedEle, 1);
              //  console.log('Deleted correspondence element', arr);
                return {
                    ...state,
                    correspondenceInbox: [...arr],
                }
        default:
            return state;

    }
}