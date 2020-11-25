import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../../redux/index';
import networkManager from '../../../services/network-manager/networkManager';
import { constants } from '../../../utils/constants/constants';
import  SecurityManager  from '../../../services/Keychain/SecurityManager';
import { Reachability } from '../../../services/netInfo/Rechability';
import {
    AsyncStorage
} from 'react-native';
export const getCorrespondenceDetails = (userId, corrId) => {
    console.log('Correspondence details Action method Get details')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                UserID: userId,
                CorrID:corrId
            }
            console.log('Parameter in Correspondence Details');
            console.log(params);
            dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceDetails, params, token);
            const response = newLocal;
            console.log('user Correspondence response Correspondence Details');
            console.log(response);
            const jsonArray = response['data'];
            dispatch(setCorrespondenceDetails(jsonArray));
            const Aaram = {
                CorrID:corrId
            }
            const responseAttachment = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceDetailsAttachment, Aaram, token);
            console.log('User response Correspondence attachement');
            console.log(responseAttachment);
            const jsonAttachment = responseAttachment['data'];
            dispatch(setCorrespondenceDetailsAttachment(jsonAttachment))
            const Tparam = {
                CorrID: corrId,
                UserID: userId,
            }
            const responseTask = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceTaskList, Tparam, token);
            console.log('User response Correspondence responseTask');
            console.log(responseTask);
            const jsonTask = responseTask['data'];
            dispatch(setCorrespondenceDetailTasks(jsonTask))
            dispatch(getCorrespondenceDetailCorrespondenceProperties(corrId,token));
            dispatch(getCorrespondenceDetailComments(corrId, token));
            dispatch(getCorrespondenceDetailDistributeProperties(corrId, token));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
            console.log( 'Get Correspondence details method',error);
        }
    }
}

export const getTaskDetails = (userId, taskId) => {
    console.log('Correspondence details Action method')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                UserID: userId,
                TaskID:taskId
            }
            // console.log('Parameter in Task Details');
            // console.log(params);
            dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.taskDetails, params, token);
            const response = newLocal;
            // console.log('user Task response Correspondence Details');
            // console.log(response);
            const jsonArray = response['data'];
            dispatch(setCorrespondenceDetails(jsonArray[0]));
            const Aaram = {
                TaskID:taskId
            }
            const responseAttachment = await networkManager.getRequestHandler(constants.webService.methods.common.taskDetailsAttachment, Aaram, token);
            // console.log('User response Correspondence attachement');
            // console.log(responseAttachment);
            const jsonAttachment = responseAttachment['data'];
            dispatch(setCorrespondenceDetailsAttachment(jsonAttachment))
            // console.log('Task jason array');
            // console.log(jsonArray);
            if (jsonArray[0].ridCorr != null) {
               //console.log('Task Correspondence');
               const corrId = jsonArray[0].ridCorr
               dispatch(getCorrespondenceDetailCorrespondenceProperties(corrId, token));
               dispatch(getCorrespondenceDetailDistributeProperties(corrId, token));

            } else if (jsonArray[0].ridMom != null) {
                const momId = jsonArray[0].ridMom
                const Tparam = {
                    MomID:momId,
                }
                const responseTask = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailTaskList, Tparam, token);
                // console.log('User response mom responseTask');
                // console.log(responseTask);
                const jsonTask = responseTask['data'];
                dispatch(setCorrespondenceDetailTasks(jsonTask))
                const Propertiesparam = {
                    MomID:momId,
                }
                const responseProperties = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailProperties, Propertiesparam, token);
                console.log('User response mom properties');
                console.log(responseProperties);
                const jsonProperties = responseProperties['data'];
                dispatch(setCorrespondenceDetailProperties(jsonProperties));
                
                const AttendesPropertiesparam = {
                    MomID:momId,
                }
                const responseAttendeesProperties = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailPropertiesAttendes, AttendesPropertiesparam, token);
                // console.log('User response mom properties');
                // console.log(responseAttendeesProperties);
                const jsonAttendessProperties = responseAttendeesProperties['data'];
                dispatch(setCorrespondenceMomDetailPropertiesAttendees(jsonAttendessProperties));
            }
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getMomDetails = (userId, momId) => {
    console.log('Correspondence details Action method')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                UserID: userId,
                MomID:momId
            }
            // console.log('Parameter in Mom Details');
            // console.log(params);
            dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.momDetails, params, token);
            const response = newLocal;
            // console.log('user Task response mom Details');
            // console.log(response);
            const jsonArray = response['data'];
            dispatch(setCorrespondenceDetails(jsonArray));
            const Aaram = {
                MomID:momId
            }
            const responseAttachment = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailsAttachment, Aaram,token);
            // console.log('User response mom attachement');
            // console.log(responseAttachment);
            const jsonAttachment = responseAttachment['data'];
            dispatch(setCorrespondenceDetailsAttachment(jsonAttachment))
            const Carams = {
                MomID:momId,
               
            }
            // console.log('Parameter in mom Details Comments');
            // console.log(Carams);
            const newLocalComment = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailComments, Carams, token);
            const responseComment = newLocalComment;
            console.log('mom Details Comments response');
            console.log(responseComment);
            const jsonArrayComment = responseComment['data'];
            dispatch(setCorrespondenceDetailComments(jsonArrayComment));
            
            const ATparam = {
                MomID:momId,
            }
            const responseActionItems = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailAprovals, ATparam, token);
            // console.log('User response mom Action items');
            // console.log(responseActionItems);
            const jsonActionItems = responseActionItems['data'];
            dispatch(setCorrespondenceDetailActionItems(jsonActionItems));
            const Propertiesparam = {
                MomID:momId,
            }
            const responseProperties = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailProperties, Propertiesparam, token);
            console.log('User response mom properties');
            console.log(responseProperties);
            const jsonProperties = responseProperties['data'];
            dispatch(setCorrespondenceDetailProperties(jsonProperties));
            const AttendesPropertiesparam = {
                MomID:momId,
            }
            const responseAttendeesProperties = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailPropertiesAttendes, AttendesPropertiesparam, token);
            // console.log('User response mom properties');
            // console.log(responseAttendeesProperties);
            const jsonAttendessProperties = responseAttendeesProperties['data'];
            dispatch(setCorrespondenceMomDetailPropertiesAttendees(jsonAttendessProperties));
            const Tparam = {
                MomID:momId,
               // UserID: userId
            }
            const responseTask = await networkManager.getRequestHandler(constants.webService.methods.common.momDetailTaskList, Tparam, token);
            console.log('User response mom responseTask');
            console.log(responseTask);
            const jsonTask = responseTask['data'];
            dispatch(setCorrespondenceDetailTasks(jsonTask))
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getRFIDetails = (userId, rfiId, entityListId, workFlowTransactionID) => {
    console.log('RFI details Action method')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                UserID: userId,
                RFIID:rfiId,
                RidWorkflowtransaction: workFlowTransactionID
            }
            console.log('Parameter in RFI Details');
            console.log(params);
            dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.rfiDetails, params, token);
            const response = newLocal;
            // console.log('user response RFI Details');
            // console.log(response);
            const jsonArray = response['data'];
            dispatch(setCorrespondenceDetails(jsonArray));
            const Aaram = {
                RfiID:rfiId
            }
            const responseAttachment = await networkManager.getRequestHandler(constants.webService.methods.common.rfiDetailAttachment, Aaram, token);
            console.log('User response RFI attachement');
            console.log(responseAttachment);
            const jsonAttachment = responseAttachment['data'];
            dispatch(setCorrespondenceDetailsAttachment(jsonAttachment))
            const Carams = {
                RfiID:rfiId,
                RidEntityList: entityListId
               
            }
            // console.log('Parameter in mom Details Comments');
            // console.log(Carams);
            const newLocalComment = await networkManager.getRequestHandler(constants.webService.methods.common.rfiDetailComment, Carams, token);
            const responseComment = newLocalComment;
            // console.log('mom Details Comments response');
            // console.log(responseComment);
            const jsonArrayComment = responseComment['data'];
            dispatch(setCorrespondenceDetailComments(jsonArrayComment));
            const Propertiesparam = {
                RfiID:rfiId,
            }
            const responseProperties = await networkManager.getRequestHandler(constants.webService.methods.common.rfiDetailProperties, Propertiesparam, token);
            // console.log('User response mom properties');
            // console.log(responseProperties);
            const jsonProperties = responseProperties['data'];
            dispatch(setCorrespondenceDetailProperties(jsonProperties));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getCorrespondenceCategory = () => {
    console.log('Correspondence details Action method  getCorrespondenceCategory')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                
            }
            // console.log('Parameter in Correspondence Details getCorrespondenceCategory');
            // console.log(token);
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.getCategoryList, params, token);
            const response = newLocal;
            // console.log('user Correspondence response Details User Master');
            // console.log(response);
            const jsonArray = response['data'];
            dispatch(setCorrespondenceDetailUserMaster(jsonArray));
            dispatch(isAppLoading(false));
          } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getCorrespondenceDetailsDelegateUserMasters = (entityID) => {
    console.log('Correspondence details Action method  User Master')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                EntityID: entityID,
            }
            // console.log('Parameter in Correspondence Details User Master');
            // console.log(params);
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.userMasters, params, token);
            const response = newLocal;
            // console.log('user Correspondence response Details User Master');
            // console.log(response);
            const jsonArray = response['data'];
            dispatch(setCorrespondenceDetailDelegateUserMaster(jsonArray));
            dispatch(isAppLoading(false));
          } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getCorrespondenceDetailsForwardUserMasters = (entityID, corrId) => {
    console.log('Correspondence details Action method Forward User Master')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                EntityID: entityID,
                RidCorr: corrId
            }
            console.log('Parameter in Correspondence Details Forward User Master');
            console.log(params);
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.forwardUserMasters, params, token);
            const response = newLocal;
            console.log('user Correspondence response Details  ForwardUser Master');
            console.log(response);
            const jsonArray = response['data'];
            dispatch(setCorrespondenceDetailForwardUserMaster(jsonArray));
            dispatch(isAppLoading(false));
          } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getRFIDetailsForwardUserMasters = () => {
    console.log('RFI details Action method Forward User Master')
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
               // EntityID: entityID,
                //RidCorr: corrId
            }
            console.log('Parameter in RFI Details Forward User Master');
            console.log(params);
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.rfiForwardUserMasters, params, token);
            const response = newLocal;
            console.log('user RFI response Details  ForwardUser Master');
            console.log(response);
            const jsonArray = response['data'];
            console.log('RFI UserMaster Array');
            console.log(jsonArray);
            dispatch(setRFIDetailForwardUserMaster(jsonArray));
            dispatch(isAppLoading(false));
          } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const submitCorrespondenceDetailApproveReject = (wftId, approve, comment) => {
    console.log('Correspondence details Action method  Approve');
    
    return async (dispatch) => {
        dispatch(isAppLoading(true));
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                workFlowTransactionID:wftId,
                approve:approve,
                comments:comment
            }
            // console.log('Parameter in Correspondence Details Approve');
            // console.log(params);
           
            const newLocal = await networkManager.postRequestHandler(constants.webService.methods.common.correspondenceApproveReject, params, token);
            const response = newLocal;
            // console.log('Correspondence Details Approve response');
            // console.log(response);
            const jsonArray = response['data'];
            if (response.message == "Success"){
                dispatch(setCorrespondenceApproveReject(true));
            }
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getCorrespondenceDetailComments = (corrId) => {
    console.log('Correspondence details Action method  Comments');
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                CorrID:corrId,
               
            }
            console.log('Parameter in Correspondence Details Comments');
            console.log(params);
            //dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceComments, params, token);
            const response = newLocal;
            console.log('Correspondence Details Comments response');
            console.log(response);
            const jsonArray = response['data'];
            dispatch(setCorrespondenceDetailComments(jsonArray));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getCorrespondenceDetailCorrespondenceProperties = (corrId) => {
    console.log('Correspondence details Action method  CorrespondenceProperties');
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                CorrID:corrId,   
            }
            // console.log('Parameter in Correspondence CorrespondenceProperties');
            // console.log(params);
            // console.log(token);
            //dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceProperties, params, token);
            const response = newLocal;
            // console.log('Correspondence Details CorrespondenceProperties');
            // console.log(response);
            const jsonArray = response['data'];
            //console.log('Get correspondence details properties by wrokflow steps');
            const workFlowID = jsonArray.ridWorkflow
            //console.log(workFlowID)
            dispatch(setCorrespondenceDetailProperties(jsonArray));
            dispatch(getCorrespondenceDetailcorrespondenceWorkFlow(workFlowID, token));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getCorrespondenceDetailDistributeProperties = (corrId) => {
    console.log('Correspondence details Action method  DistributeProperties');
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                CorrID:corrId,   
            }
            // console.log('Parameter in Correspondence CorrespondenceProperties');
            // console.log(params);
            //dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceDistribute, params, token);
            const response = newLocal;
            // console.log('Correspondence Details DistributeProperties');
            // console.log(response);
            const jsonArray = response['data'];
            dispatch(setCorrespondenceDetailDistributeProperties(jsonArray));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getCorrespondenceDetailcorrespondenceWorkFlow = (workFlowId) => {
    console.log('Correspondence details Action method  correspondenceWorkFlow');
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                WorkflowID: workFlowId,   
            }
            // console.log('Parameter in Correspondence correspondenceWorkFlow');
            // console.log(params);
            // console.log(token);
            //dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.common.correspondenceWorkFlow, params, token);
            const response = newLocal;
            // console.log('Correspondence Details correspondenceWorkFlow');
            // console.log(response);
            const jsonArray = response['data'];
            dispatch(setCorrespondenceDetailWrokFlowSteps(jsonArray));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const setCorrespondenceDetailEmpty = () => {
    console.log('Correspondence details Action method  setCorrespondenceDetailEmpty');
    return async (dispatch) => {
        try {
            dispatch(setCorrespondenceDetails(null));
            dispatch(setCorrespondenceDetailsAttachment(null));
            dispatch(setCorrespondenceDetailComments(null));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const setCorrespondenceDetails = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL,
        payload: payload,
    }
}
export const setCorrespondenceDetailsAttachment = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_ATTACHMENT,
        payload: payload,
    }
}

export const setCorrespondenceDetailDelegateUserMaster = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_USERMASTER,
        payload: payload,
    }
}
export const setCorrespondenceDetailForwardUserMaster = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_FORWARDDELEGATE,
        payload: payload,
    }
}

export const setRFIDetailForwardUserMaster = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_INBOX_RFIFORWARDUSERMSTER,
        payload: payload,
    }
}

export const setCorrespondenceDetailComments = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_COMMENTS,
        payload: payload,
    }
}

export const setCorrespondenceDetailProperties = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_CORRESPONDENCE_PROPERTIES,
        payload: payload,
    }
}
export const setCorrespondenceDetailDistributeProperties = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_DISTRIBUTE_PROPERTIES,
        payload: payload,
    }
}
export const setCorrespondenceDetailWrokFlowSteps = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_WORKFLOW_STEPS,
        payload: payload,
    }
}

export const setCorrespondenceDetailTasks = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_TASKS,
        payload: payload,
    }
}
export const setCorrespondenceDetailActionItems = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_ACTIONITEM,
        payload: payload,
    }
}
export const setCorrespondenceApproveReject = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_APPROVE_REJECT_CLOSE,
        payload: payload,
    }
}

export const setCorrespondenceMomDetailPropertiesAttendees = (payload) => {
    return {
        type: ActionTypes.correspondence.SET_CORRESPONDENCE_DETAIL_MOM_PROPERTIES_ATTENDEES,
        payload: payload,
    }
}


