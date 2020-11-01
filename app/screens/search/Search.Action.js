import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../redux/index';
import networkManager from '../../services/network-manager/networkManager';
import { constants } from '../../utils/constants/constants';
import  SecurityManager  from '../../services/Keychain/SecurityManager';
import { Reachability } from '../../services/netInfo/Rechability';

export const setSearchDetailEmpty = () => {
    return async (dispatch) => {
        dispatch(setSearchDetails(null));
    }
}
export const getSearchDropDwonValues = (token) => {
    console.log('Search drop dwon Action method')
    return async (dispatch) => {
        try { 
            const params = {
            } 
            // dispatch(isAppLoading(true));
            const newLocal = await networkManager.getRequestHandler(constants.webService.methods.search.getProjectContract, params, token);
            const response = newLocal;
            console.log('Search project contract response');
            console.log(response);
            const jsonArray = response['data'];
            console.log('Search Project contract Record Json');
            console.log(jsonArray);
            dispatch(setSearchDropDwonProjectContract(jsonArray));
           
            const newLocalSender = await networkManager.getRequestHandler(constants.webService.methods.search.getAllSenderAndRecipent, params, token);
            const responseSender = newLocalSender;
            console.log('Search sender and recipent response');
            console.log(responseSender);
            const jsonArraysenderandRecipent = responseSender['data'];
            console.log('Search jsonArraysenderandRecipent Record Json');
            console.log(jsonArraysenderandRecipent);
            dispatch(setSearchDropDwonSenderAndRecioent(jsonArraysenderandRecipent));

            const newLocalApprover = await networkManager.getRequestHandler(constants.webService.methods.search.getAllReviewerandApprover, params, token);
            const responseApprover = newLocalApprover;
            console.log('Search sender and recipent response');
            console.log(responseApprover);
            const jsonArrayRA = responseApprover['data'];
            console.log('Search Approver and rewiewer Record Json');
            console.log(jsonArrayRA);
            dispatch(setSearchDropDwonReviewerAndApprover(jsonArrayRA));

            const newLocalation = await networkManager.getRequestHandler(constants.webService.methods.search.getLocation, params, token);
            const newLocalations = newLocalation;
            console.log('Search newLocalations response');
            console.log(newLocalations);
            const jsonArrayLocation = newLocalations['data'];
            console.log('Search Locations Record Json');
            console.log(jsonArrayLocation);
            dispatch(setSearchDropDwonLocation(jsonArrayLocation))

            const newDiscipline = await networkManager.getRequestHandler(constants.webService.methods.search.getDisciplines, params, token);
            const newDisciplines = newDiscipline;
            console.log('Search getDisciplines response');
            console.log(newDisciplines);
            const jsonArrayDiscipline = newDisciplines['data'];
            console.log('Search getDisciplines Record Json');
            console.log(jsonArrayDiscipline);
            dispatch(setSearchDropDwonDiscipline(jsonArrayDiscipline))
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getQuickSearchCorrespondenceRecordList = (referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, correspondenceFromDate, correspondenceToDate,superSearch, entityId, token) => {
    console.log('getQuickSearchCorrespondenceRecordList Action method')
    return async (dispatch) => {
        try { 
            if (superSearch != '') {
                const params = {
                        userEntityID: entityId,
                        superSearch: superSearch,
                    } 
                    console.log('getQuickSearchCorrespondenceRecordList Action Parameters');
            console.log(params);
            // dispatch(setSearchDetails(null));
            dispatch(isAppLoading(true));
            const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.correspondenceSearch, params, token);
            const response = newLocal;
            console.log('getQuickSearchCorrespondenceRecordList Record response');
            console.log(response);
            const jsonArray = response['data'];
            dispatch(setSearchDetails(jsonArray));
            dispatch(isAppLoading(false));
            } else {
                const params = {
                        referencenumber: referencenumber ? referencenumber : null,   
                        subject: subject ? subject : null,   
                       // ridCorrCategory: 2,
                        status: status ? status : null,
                        userEntityID: entityId,
                        senderRidEntityList: senderRidEntityList ? senderRidEntityList : null,
                        recipientRidEntityList: recipientRidEntityList ? recipientRidEntityList : null,
                        correspondenceFromDate: correspondenceFromDate ? correspondenceFromDate : null,
                        correspondenceToDate: correspondenceToDate ? correspondenceToDate :null,
                    } 
                    console.log('getQuickSearchCorrespondenceRecordList Action Parameters');
            console.log(params);
            // dispatch(setSearchDetails(null));
            dispatch(isAppLoading(true));
            const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.correspondenceSearch, params, token);
            const response = newLocal;
            console.log('getQuickSearchCorrespondenceRecordList Record response');
            console.log(response);
            const jsonArray = response['data'];
            dispatch(setSearchDetails(jsonArray));
            dispatch(isAppLoading(false));
             }  
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getQuickSearchMomRecordList = (referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, momFromDate, momToDate, superSearch, entityId, token) => {
    console.log('Search Mom Action method')
    return async (dispatch) => {
        try { 
            if (superSearch != '') {
                const params = {
                    
                    superSearch: superSearch,
     
                } 
                console.log('Search Action Parameters');
                console.log(params);
                dispatch(isAppLoading(true));
                const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.momSearch, params, token);
                const response = newLocal;
                console.log('Search Record response');
                console.log(response);
                const jsonArray = response['data'];
                const searchJason = jsonArray;
                console.log('Search Record Json');
                console.log(searchJason);
                dispatch(setSearchDetails(searchJason));
                dispatch(isAppLoading(false));
            } else {
                const params = {
                    referencenumber: referencenumber ? referencenumber : null,     
                    subject: subject ? subject : null,   
                   // ridCorrCategory: 2,
                    status: status ? status : null,
                   // userEntityID: entityId,
                    momFromDate: momFromDate ? momFromDate : null,
                    momToDate: momToDate ? momToDate : null,     
                } 
                console.log('Search Action Parameters');
                console.log(params);
                dispatch(isAppLoading(true));
                const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.momSearch, params, token);
                const response = newLocal;
                console.log('Search Record response');
                console.log(response);
                const jsonArray = response['data'];
                const searchJason = jsonArray;
                console.log('Search Record Json');
                console.log(searchJason);
                dispatch(setSearchDetails(searchJason));
                dispatch(isAppLoading(false));
            }
            
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getQuickSearchRFIRecordList = (referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, rfiFromDate, rfiToDate, superSearch, entityId, token) => {
    console.log('Search getQuickSearchRFIRecordList Action method')
    return async (dispatch) => {
        try { 
            if (superSearch != '') {
                const params = {
                  
                    superSearch: superSearch,
                    
                } 
                console.log('getQuickSearchRFIRecordList Action Parameters');
                console.log(params);
                // dispatch(setSearchDetails(null));
                dispatch(isAppLoading(true));
                const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.rfiSearch, params, token);
                const response = newLocal;
                console.log('getQuickSearchRFIRecordList Record response');
                console.log(response);
                const jsonArray = response['data'];
                dispatch(setSearchDetails(jsonArray));
                dispatch(isAppLoading(false));

            } else {
                const params = {
                    referencenumber: referencenumber ? referencenumber : null,     
                    subject: subject ? subject : null,   
                   // ridCorrCategory: 2,
                    status: status ? status : null,
                   // userEntityID: entityId,
                    rfiFromDate: rfiFromDate ? rfiFromDate : null,
                    rfiToDate: rfiToDate ? rfiToDate : null,   
                } 
                console.log('getQuickSearchRFIRecordList Action Parameters');
                console.log(params);
                // dispatch(setSearchDetails(null));
                dispatch(isAppLoading(true));
                const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.rfiSearch, params, token);
                const response = newLocal;
                console.log('getQuickSearchRFIRecordList Record response');
                console.log(response);
                const jsonArray = response['data'];
                dispatch(setSearchDetails(jsonArray));
                dispatch(isAppLoading(false));
            }
            
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getAdvanceSearchCorrespondenceRecordList = (referencenumber, subject, ridCorrCategory, ridContractlist, senderRidEntityList, recipientRidEntityList, 
    reviwer, approver, correspondenceFromDate, correspondenceToDate, replyrequiredbyFromdate, replyrequiredbyTodate, isreplyrequired, isconfidential, status, superSearch, entityId, token) => {
    console.log('Advance Search Action Correspondence method')
    return async (dispatch) => {
        try { 
            if (superSearch != '') {
                const params = {
                    userEntityID: entityId,
                    superSearch: superSearch,
                } 
                console.log('Advance Search Action Correspondence Parameters');
                console.log(params);
                // dispatch(setSearchDetails(null));
                dispatch(isAppLoading(true));
                const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.correspondenceSearch, params, token);
                const response = newLocal;
                console.log('Search Record response');
                console.log(response);
                const jsonArray = response['data'];
                dispatch(setSearchDetails(jsonArray));
                dispatch(isAppLoading(false));
            } else {
                const params = {
                    referencenumber: referencenumber ? referencenumber : null,     
                    subject: subject ? subject : null,   
                    ridCorrCategory: ridCorrCategory ? ridCorrCategory : null,
                    ridContractlist: ridContractlist ? ridContractlist : null,
                    senderRidEntityList: senderRidEntityList ? senderRidEntityList : null,
                    recipientRidEntityList: recipientRidEntityList ? recipientRidEntityList : null,
                    reviwer: reviwer ? reviwer : null,
                    approver: approver ? approver : null,
                    correspondenceFromDate: correspondenceFromDate ? correspondenceFromDate : null,
                    correspondenceToDate: correspondenceToDate ? correspondenceToDate : null,
                    replyrequiredbyFromdate: replyrequiredbyFromdate ? replyrequiredbyFromdate : null,
                    replyrequiredbyTodate: replyrequiredbyTodate ? replyrequiredbyTodate : null,
                    isreplyrequired: isreplyrequired == true ? "Y" : null,
                    isconfidential: isconfidential == true ? "Y" : null,
                    status: status ? status : null,
                    userEntityID: entityId,
                    
                } 
                console.log('Advance Search Action Correspondence Parameters');
                console.log(params);
                // dispatch(setSearchDetails(null));
                dispatch(isAppLoading(true));
                const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.correspondenceSearch, params, token);
                const response = newLocal;
                console.log('Search Record response');
                console.log(response);
                const jsonArray = response['data'];
                dispatch(setSearchDetails(jsonArray));
                dispatch(isAppLoading(false));
            }
    
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getAdvanceSearchMomRecordList = (referencenumber, subject, status, initiator, superSearch, token) => {
    console.log(' Advance Search Mom Action method')
    return async (dispatch) => {
        try { 
            if (superSearch != '') {
                const params = {
                    
                   superSearch: superSearch,
     
                }  
                console.log(token);
                console.log('Advance Search Action Mom Parameters');
                console.log(params);
                dispatch(isAppLoading(true));
                const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.momSearch, params, token);
                const response = newLocal;
                console.log(' Advance Search Record MOM response');
                console.log(response);
                const jsonArray = response['data'];
                dispatch(setSearchDetails(jsonArray));
                dispatch(isAppLoading(false));
            } else {
                const params = {
                    referencenumber: referencenumber ? referencenumber : null,     
                    subject: subject ? subject : null,   
                   // ridCorrCategory: 2,
                    status: status ? status : null,
                   // userEntityID: entityId,
                   initiator: initiator ? initiator : null,
                //    momFromDate:'',
                //    momToDate:'',
     
                }  
                console.log('Advance Search Action Mom Parameters');
                console.log(params);
                console.log(token);
                dispatch(isAppLoading(true));
                const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.momSearch, params, token);
                const response = newLocal;
                console.log(' Advance Search Record MOM response');
                console.log(response);
                const jsonArray = response['data'];
                dispatch(setSearchDetails(jsonArray));
                dispatch(isAppLoading(false));
            }
            
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getAdvanceSearchRFIRecordList = (referencenumber, subject, status, initiator, query, responses, superSearch, token) => {
    console.log('Search Action method')
    return async (dispatch) => {
        try { 
            if (superSearch != '') {
                const params = { 
                  superSearch: superSearch,    
                } 
                console.log('Advance Search Action RFI  Parameters');
                console.log(params);
               // dispatch(setSearchDetails(null));
                dispatch(isAppLoading(true));
                const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.rfiSearch, params, token);
                const response = newLocal;
                console.log('Advance Search Record RFI response');
                console.log(response);
                const jsonArray = response['data'];
                dispatch(setSearchDetails(jsonArray));
                dispatch(isAppLoading(false));
            } else {
                const params = {
                    referencenumber: referencenumber ? referencenumber : null,     
                    subject: subject ? subject : null,   
                    status: status ? status : null,
                    initiator: initiator ? initiator : null,
                    query:query ? query : null,
                    response:responses ? responses : null,
                } 
                console.log('Advance Search Action RFI  Parameters');
                console.log(params);
               // dispatch(setSearchDetails(null));
                dispatch(isAppLoading(true));
                const newLocal = await networkManager.postRequestHandler(constants.webService.methods.search.rfiSearch, params, token);
                const response = newLocal;
                console.log('Advance Search Record RFI response');
                console.log(response);
                const jsonArray = response['data'];
                dispatch(setSearchDetails(jsonArray));
                dispatch(isAppLoading(false));
            }
            
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const setSearchDropDwonProjectContract = (payload) => {
    return {
        type: ActionTypes.search.SET_SEARCH_PROJECTCONTRACT,
        payload: payload,
    }
}
export const setSearchDropDwonLocation = (payload) => {
    return {
        type: ActionTypes.search.SET_SEARCH_LOCATION,
        payload: payload,
    }
}
export const setSearchDropDwonDiscipline = (payload) => {
    return {
        type: ActionTypes.search.SET_SEARCH_DISCIPLINE,
        payload: payload,
    }
}
export const setSearchDropDwonSenderAndRecioent = (payload) => {
    return {
        type: ActionTypes.search.SET_SEARCH_SENDERANDRECIPENT,
        payload: payload,
    }
}
export const setSearchDropDwonReviewerAndApprover = (payload) => {
    return {
        type: ActionTypes.search.SET_SEARCH_REVIEWERANDAPPROVER,
        payload: payload,
    }
}
export const setSearchDetails = (payload) => {
    return {
        type: ActionTypes.search.SET_CORRESPONDENCE_SEARCH,
        payload: payload,
    }
}


