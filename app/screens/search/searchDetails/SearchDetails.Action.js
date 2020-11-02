import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../../redux/index';
import networkManager from '../../../services/network-manager/networkManager';
import { constants } from '../../../utils/constants/constants';
import { Reachability } from '../../../services/netInfo/Rechability';
import {
    AsyncStorage
} from 'react-native';
export const getQuickSearchRecordDetailsProperties = (corrId) => {
    console.log('Search Action method')
    return async (dispatch) => {
        dispatch(isAppLoading(true));
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                CorrID:corrId,   
            }
            console.log('Search in Correspondence CorrespondenceProperties');
            console.log(params);
           // dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceProperties, params, token);
            const response = newLocal;
            console.log('Correspondence Details CorrespondenceProperties');
            console.log(response);
            const jsonArray = response['data'];
            console.log('Get correspondence details properties by wrokflow steps');
            const workFlowID = jsonArray.ridWorkflow
            console.log(workFlowID)
            dispatch(setSearchDetailsCorrespondenceProperties(jsonArray));
            const Aaram = {
                CorrID:corrId
            }
            const responseAttachment = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceDetailsAttachment, Aaram, token);
            console.log('Search Correspondence attachement');
            console.log(responseAttachment);
            const jsonAttachment = responseAttachment['data'];
            dispatch(setSearchDetailsCorrespondenceAttachment(jsonAttachment));
            dispatch(getQuickSearchCorrespondenceDetailDistribute(corrId,token));
            dispatch(getQuickSearchCorrespondenceDetailWorkFlow(workFlowID,token));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getQuickSearchCorrespondenceDetailDistribute = (corrId) => {
    console.log(' search Correspondence details Action method  DistributeProperties');
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                CorrID:corrId,   
            }
            console.log('search in Correspondence CorrespondenceProperties');
            console.log(params);
            //dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceDistribute, params, token);
            const response = newLocal;
            console.log('Search Details DistributeProperties');
            console.log(response);
            const jsonArray = response['data'];
            dispatch(setSearchDetailsCorrespondenceDistribute(jsonArray));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getQuickSearchCorrespondenceDetailWorkFlow = (workFlowId) => {
    console.log(' search Correspondence details Action method  correspondenceWorkFlow');
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                WorkflowID:workFlowId,   
            }
            console.log(' search Parameter in Correspondence correspondenceWorkFlow');
            console.log(params);
            console.log(token);
            //dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceWorkFlow, params, token);
            const response = newLocal;
            console.log('search Correspondence Details correspondenceWorkFlow');
            console.log(response);
            const jsonArray = response['data'];
            dispatch(setSearchDetailsCoreespondenceWorkFlowSteps(jsonArray));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getQuickSearchRecordsMomDetailsProperties = (momId) => {
    console.log('Search Mom details Action method')
    return async (dispatch) => {
        dispatch(isAppLoading(true));
        const token = await AsyncStorage.getItem('token');
        try {
            const Aaram = {
                MomID:momId
            }
           // dispatch(isAppLoading(true));
            const responseAttachment = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailsAttachment, Aaram, token);
            console.log('search response mom attachement');
            console.log(responseAttachment);
            const jsonAttachment = responseAttachment['data'];
            dispatch(setSearchDetailsCorrespondenceAttachment(jsonAttachment))

            const Tparam = {
                MomID:momId,
            }
            const responseTask = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailTaskList, Tparam, token);
            console.log('search response mom responseTask');
            console.log(responseTask);
            const jsonTask = responseTask['data'];
            dispatch(setSearchDetailsMomTaskComment(jsonTask))
            
            const Propertiesparam = {
                MomID:momId,
            }
            const responseProperties = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailProperties, Propertiesparam, token);
            console.log('search response mom properties');
            console.log(responseProperties);
            const jsonProperties = responseProperties['data'];
            dispatch(setSearchDetailsMomProperties(jsonProperties));

            const AttendesPropertiesparam = {
                MomID:momId,
            }
            const responseAttendeesProperties = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailPropertiesAttendes, AttendesPropertiesparam, token);
            console.log('search response mom Attendees');
            console.log(responseAttendeesProperties);
            const jsonAttendessProperties = responseAttendeesProperties['data'];
            dispatch(setSearchDetailsMomAtteendess(jsonAttendessProperties));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getQuickSearchRecordRFIDetailsProperties = (rfiId) => {
    console.log(' Search RFI details Action method')
    return async (dispatch) => {
        dispatch(isAppLoading(true));
        const token = await AsyncStorage.getItem('token');
        try {
            
            const Aaram = {
                RfiID:rfiId
            }
            const responseAttachment = await networkManager.getRequestHandler(constants.webService.methods.common.rfiDetailAttachment, Aaram, token);
            console.log('Search RFI details RFI attachement');
            console.log(responseAttachment);
            const jsonAttachment = responseAttachment['data'];
            dispatch(setSearchDetailsCorrespondenceAttachment(jsonAttachment))
            
            const Propertiesparam = {
                RfiID:rfiId,
            }
            const responseProperties = await networkManager.getRequestHandler(constants.webService.methods.common.rfiDetailProperties, Propertiesparam, token);
            console.log('Search RFI details  properties');
            console.log(responseProperties);
            const jsonProperties = responseProperties['data'];
            dispatch(setSearchDetailsRFIProperties(jsonProperties));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const setSearchDetailsCorrespondenceProperties = (payload) => {
    return {
        type: ActionTypes.search.SET_CORRESPONDENCE_SEARCH_CORRESPONDENCE_PROPERTIES,
        payload: payload,
    }
}

export const setSearchDetailsCorrespondenceAttachment = (payload) => {
    return {
        type: ActionTypes.search.SET_CORRESPONDENCE_SEARCH_ATTACHMENT,
        payload: payload,
    }
}

export const setSearchDetailsCorrespondenceDistribute = (payload) => {
    return {
        type: ActionTypes.search.SET_CORRESPONDENCE_SEARCH_DISTRIBUTE_PROPERTIES,
        payload: payload,
    }
}

export const setSearchDetailsCoreespondenceWorkFlowSteps = (payload) => {
    return {
        type: ActionTypes.search.SET_CORRESPONDENCE_SEARCH_WORKFLOW_STEPS,
        payload: payload,
    }
}

export const setSearchDetailsMomProperties = (payload) => {
    return {
        type: ActionTypes.search.SET_CORRESPONDENCE_SEARCH_MOM_PROPERTIES,
        payload: payload,
    }
}

export const setSearchDetailsMomAtteendess = (payload) => {
    return {
        type: ActionTypes.search.SET_CORRESPONDENCE_SEARCH_MOM_ATTENDEES,
        payload: payload,
    }
}

export const setSearchDetailsMomTaskComment = (payload) => {
    return {
        type: ActionTypes.search.SET_CORRESPONDENCE_SEARCH_MOM_TASKCOMMENT,
        payload: payload,
    }
}

export const setSearchDetailsRFIProperties = (payload) => {
    return {
        type: ActionTypes.search.SET_CORRESPONDENCE_SEARCH_RFI_PROPERTIES,
        payload: payload,
    }
}