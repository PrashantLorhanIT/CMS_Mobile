import { ActionTypes, appHasError, isAppLoading, isInternetReachable } from '../../redux/index';
import networkManager from '../../services/network-manager/networkManager';
import { constants } from '../../utils/constants/constants';
import  SecurityManager  from '../../services/Keychain/SecurityManager';
import { Reachability } from '../../services/netInfo/Rechability';
import {
    AsyncStorage
} from 'react-native';

export const getExternalSenderAndRecipent = () => {
    console.log('Dashboard Action External Sender and recipent method')
    return async (dispatch) => { 
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
               
            }
            const newLocalSender = await networkManager.getRequestHandler(constants.webService.methods.dashboard.getExternalEntities, params, token);
            const responseSender = newLocalSender;
            console.log('External recipent response');
            console.log(responseSender);
            const jsonArraysenderandRecipent = responseSender['data'];
            console.log('External jsonArraysenderandRecipent Record Json');
            console.log(jsonArraysenderandRecipent);
            dispatch(setDashboardSenderAndRecipent(jsonArraysenderandRecipent));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const getInternalSenderAndRecipent = () => {
    console.log('Dashboard Action Internal sender method')
    return async (dispatch) => { 
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
               
            }
            const newLocalSender = await networkManager.getRequestHandler(constants.webService.methods.dashboard.getInternalEntities, params, token);
            const responseSender = newLocalSender;
            console.log('Internal  sender  response');
            console.log(responseSender);
            const jsonArraysenderandRecipent = responseSender['data'];
            console.log('Internal jsonArraysenderandRecipent Record Json');
            console.log(jsonArraysenderandRecipent);
            dispatch(setDashboardSenderAndRecipent(jsonArraysenderandRecipent));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getDocumenttypes = (SenderEntityId, corrCategoryId) => {
    console.log('Dashboard DocmentTypes Action method')
    return async (dispatch) => { 
        const token = await AsyncStorage.getItem('token');
        try {
        
            const params = {
                senderEntityID: SenderEntityId,
                corrCategoryID: corrCategoryId
            }
            console.log('Dashboard DocmentTypes Action method Parameter');
            console.log(params);

            const newLocalDocument = await networkManager.getRequestHandler(constants.webService.methods.dashboard.getDocumenttypes, params, token);
            const responseDocument = newLocalDocument;
            console.log('Dashboaredocument type list response');
            const documentypes = responseDocument['data'];
            console.log(documentypes);  
            dispatch(setDashboardDocumentType(documentypes));
            //  dispatch(getContracts(SenderEntityId, RecipientEntityId));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getContracts = (SenderEntityListId, RecipientEntityListId) => {
    console.log('Dashboard getContracts Action method')
    return async (dispatch) => { 
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                SenderEntityListID: SenderEntityListId,
                RecipientEntityListID: RecipientEntityListId
            }
            console.log('Dashboard contract  list Paramter');
            console.log(params);
            const newLocalContract = await networkManager.getRequestHandler(constants.webService.methods.dashboard.getContract, params, token);
            const responseContract = newLocalContract;
            console.log('Dashboard contract  list response');
            const contract = responseContract['data'];
            console.log(contract);
            dispatch(setDashboardContract(contract));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getDashboardPieChartsGraphSummary = (forEntitiy, fromEntity, corrcategory, documentType, ridContract) => {
    console.log('Dashboard  inside SummaryData parameter');

    return async (dispatch) => {
        dispatch(isAppLoading(false));
        const token = await AsyncStorage.getItem('token');
        try {
            const params = {
                forEntity: forEntitiy,
                fromEntity: fromEntity,
                corrcategory: corrcategory,
                doctype: documentType,
                ridContract: ridContract,
                // type: 'total',
            }
            console.log('Dashboard  PieChartsGraphSummary parameter');
            console.log(params);
            const newLocalSummaryData = await networkManager.postRequestHandler(constants.webService.methods.dashboard.getDashboardSummaryData, params, token);
            const responseSummaryData = newLocalSummaryData;
            console.log('Dashboard  PieChartsGraphSummary  response');
            const summaryData = responseSummaryData['data'];
            console.log(summaryData);
            dispatch(setDashboardSummaryData(summaryData));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getDashboardSummaryDetailsData = (forEntitiy, fromEntity, corrcategory, doctype, ridcontract) => {
    console.log('Dashboard Action method')
    return async (dispatch) => {
       // dispatch(isAppLoading(true));
       const token = await AsyncStorage.getItem('token');
        try {
            const Sparams = {
                forEntity: forEntitiy,
                fromEntity: fromEntity,
                corrcategory: corrcategory,
                doctype: doctype,
                ridContract: ridcontract,
            }
            console.log('Dashboard  SummaryData parameter');
            console.log(Sparams);
            console.log(token);
            const newLocalSummary = await networkManager.postRequestHandler(constants.webService.methods.dashboard.getDashBoardSummary, Sparams, token);
            const responseSummary = newLocalSummary;
            console.log('Dashboard  summaryData  response');
            const summary = responseSummary['data'];
            console.log(summary);
            console.log('Dashboard set Summary response');
            dispatch(setDashboardSummaryPieCharts(summary));
            console.log('Dashboard call Summary Data');

            dispatch(getDashboardPieChartsGraphSummary(forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token));

            dispatch(getDashboardGrapahMonthlyTrend(forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token));
            console.log('Dashboard set Monthly Overdue Trend response');

            dispatch(getDashboardGrapahonthlyOverdueTrend(forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token));
            dispatch(isAppLoading(false));
        } catch (error) {
            console.log('dashboard action error');
            console.log(error);
            dispatch(isAppLoading(false));
            
        }
    }
}

export const getDashboardGrapahMonthlyTrend = (forEntity, fromEntity, corrcategory, doctype, ridcontract) => {
    console.log('Dashboard Action monthely trend method')

    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const Mparams = {
                forEntity: forEntity,
                fromEntity: fromEntity,
                corrcategory: corrcategory,
                doctype: doctype,
                ridContract: ridcontract,
            }
            console.log('Dashboard  Monthly Trend parameter');
            console.log(Mparams);
            console.log(token);
            const newLocalMonthlyTrend = await networkManager.postRequestHandler(constants.webService.methods.dashboard.getDashBoardMonthlyTrend, Mparams, token);
            const responseMonthlyTrend = newLocalMonthlyTrend;
            console.log('Dashboard  MonthlyTrend  response');
            const monthlyTrend = responseMonthlyTrend['data'];
            console.log(monthlyTrend);
            dispatch(setDashboardMonthlyTrend(monthlyTrend));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}

export const getDashboardGrapahonthlyOverdueTrend = (forEntitiy, fromEntity, corrcategory, doctype, ridcontract) => {
    console.log('Dashboard Action method')

    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
        try {
            const Oparams = {
                forEntity: forEntitiy,
                fromEntity: fromEntity,
                corrcategory: corrcategory,
                doctype: doctype,
                ridContract: ridcontract,
            }
            console.log('Dashboard  Monthly Overdue Trend parameter');
            console.log(Oparams);
            console.log(token);
            const newLocalMonthlyOverdueTrend = await networkManager.postRequestHandler(constants.webService.methods.dashboard.getDashBoardMonthlyOverdueTrend, Oparams, token);
            const responseMonthlyOverdueTrend = newLocalMonthlyOverdueTrend;
            console.log('Dashboard  Monthly Overdue Trend  response');
            const monthlyOverdueTrend = responseMonthlyOverdueTrend['data'];
            console.log(monthlyOverdueTrend);
            dispatch(setDashboardMonthlyOverdueTrend(monthlyOverdueTrend));
            dispatch(isAppLoading(false));
        } catch (error) {
            dispatch(isAppLoading(false));
        }
    }
}
export const setDashboardDocumentType = (payload) => {
    return {
        type: ActionTypes.dashboard.SET_DASHBOARD_DOCUMENTTYPE,
        payload: payload,
    }
}

export const setDashboardSenderAndRecipent = (payload) => {
    return {
        type: ActionTypes.dashboard.SET_DASHBOARD_SENDERANDRECIPENT,
        payload: payload,
    }
}

export const setDashboardContract = (payload) => {
    return {
        type: ActionTypes.dashboard.SET_DASHBOARD_CONTRACT,
        payload: payload,
    }
}

export const setDashboardSummaryData = (payload) => {
    return {
        type: ActionTypes.dashboard.SET_DASHBOARD_SUMMARYDATA,
        payload: payload,
    }
}

export const setDashboardSummaryPieCharts = (payload) => {
    return {
        type: ActionTypes.dashboard.SET_DASHBOARD_SUMMARY,
        payload: payload,
    }
}

export const setDashboardMonthlyTrend = (payload) => {
    return {
        type: ActionTypes.dashboard.SET_DASHBOARD_MONTHLYTREND,
        payload: payload,
    }
}

export const setDashboardMonthlyOverdueTrend = (payload) => {
    return {
        type: ActionTypes.dashboard.SET_DASHBOARD_MONTHLYOVERDUETREND,
        payload: payload,
    }
}