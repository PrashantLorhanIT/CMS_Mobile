import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../redux/index';
import networkManager from '../../services/network-manager/networkManager';
import { constants } from '../../utils/constants/constants';
import  SecurityManager  from '../../services/Keychain/SecurityManager';
import { Reachability } from '../../services/netInfo/Rechability';
import {
    AsyncStorage
} from 'react-native';
import {setDashboardInboxCount} from '../dashboard/Dashboard.Action';

export const getCorrespondeceList = (userId, category) => {
    console.log('Correspondence Action method')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                UserID: userId,
                PageSize: 100,
                PageNumber: 1,
                Category: category
            }
            console.log('Correspondence action parameter');
            console.log(params);
            dispatch(isAppLoading(true));
           // dispatch(setCorrespondenceInbox([]));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceList, params, token);
            const response = newLocal;
            console.log('Correspondence list response');
            console.log(response);
          
            const jsonArray = response['data'];
            //const jsonCount = response['totalCount'];
           // console.log(jsonCount);
            // if (jsonArray.length > 0) {   
            dispatch(setCorrespondenceInbox(jsonArray));
           // dispatch(setCorrepondenceInboxCount(jsonCount));
            // } else {
            dispatch(isAppLoading(false));
            // }
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getCorrespondeceLoadMoreList = (userId, PageNumber, category) => {
    console.log('Correspondence Action load more method')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                UserID: userId,
                PageSize: 100,
                PageNumber: PageNumber,
                Category: category
            }
            console.log('Correspondence action parameter');
            console.log(params);
            // dispatch(isAppLoading(true));
            dispatch(setCorrespondenceInbox([]));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceList, params, token);
            const response = newLocal;
            console.log('Correspondence list response');
            console.log(response);
            const jsonArray = response['data'];
            // if (jsonArray.length > 0) {   
            dispatch(setCorrespondenceInboxNextPage(jsonArray));
            // dispatch(isAppLoading(false));
            // } else {
            dispatch(isAppLoading(false));
            // }
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getSenderAndRecipentList = () => {
    console.log('Correspondence Action method')
   // dispatch(isAppLoading(true));

    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                
            }
            const newLocalSender = await networkManager.getRequestHandler(constants.webService.methods.search.getAllSenderAndRecipent, params, token);
            const responseSender = newLocalSender;
            // console.log('Search sender and recipent response');
            // console.log(responseSender);
            const jsonArraysenderandRecipent = responseSender['data'];
            // console.log('Search jsonArraysenderandRecipent Record Json');
            // console.log(jsonArraysenderandRecipent);
            dispatch(setDropDwonSenderAndRecioent(jsonArraysenderandRecipent));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getCorrespondeceUpdateList = (correspondece) => {
    // console.log('Correspondence Action method')
    // dispatch(isAppLoading(true));

    return async (dispatch) => {
        try {
            // const params = {
            //     UserID: userId
            // }
            // const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceList, params);
            // const response = newLocal;
            // console.log('Correspondence list response');
            // console.log(response);
            // const jsonArray = response['data'];
            dispatch(setCorrespondenceUpdateCorrespondence(correspondece));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getInboxCount = (userId) => {
    console.log('Inbox Action inbox count')
    return async (dispatch) => { 
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                UserID: userId,
            }
            console.log('Inbox Action inbox count');
            console.log(params);
            const inboxCount = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceListCount, params, token);
            const responseInboxCount = inboxCount;
            console.log('Inbox inboxTotalCount response');
            console.log(inboxCount);
            const jsonArrayInboxCount = responseInboxCount['data'];
            console.log('Inbox Internal jsonArrayInboxCount Record Json');
            console.log(jsonArrayInboxCount);
            dispatch(setDashboardInboxCount(jsonArrayInboxCount));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const setCorrespondenceInbox = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX,
        payload: payload,
    }
}

export const setCorrespondenceInboxNextPage = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_NEXTPAGE,
        payload: payload,
    }
}


export const setDropDwonSenderAndRecioent = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_SENDERANDRECIPENT,
        payload: payload,
    }
}
export const setDeleteCorrepondenceRecord = (id) => {
    return {
        type : ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_DELETERECORD,
        id: id,
    }
}
export const setUpdateCorrepondenceRecord = (id) => {
    console.log('Correspondence update Value', id);
    return {
        type : ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_UPDATERECORD,
        id: id,
    }
}

export const setUpdateInboxCount = (payload) => {
    console.log('Correspondence update Value inbox count', payload);
    return {
        type : ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_UPDATEINBOXCOUNT,
        id: payload,
    }
}

export const setCorrepondenceInboxCount = (payload) => {
    return {
        type : ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_COUNT,
        payload: payload,
    }
}