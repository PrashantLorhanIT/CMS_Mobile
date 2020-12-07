import ActionTypes from '../../redux/ActionTypes';
import { set } from 'lodash/fp'

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

        case ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_UPDATERECORD:
           
            let updateArr = [...state.correspondenceInbox];
            console.log('Inside the Reducer Update the value Find'); 
            
            for(let i = 0; i < updateArr.length; i++) {
                const id  = action.id;
                if(updateArr[i].ridInOutCorr === id) {
                    updateArr[i].isNew = false
                }
            }   
          return {
              ...state,
              correspondenceInbox: [...updateArr],
          }
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
                return {
                    ...state,
                    correspondenceInbox: [...arr],
                }
        default:
            return state;

    }
}