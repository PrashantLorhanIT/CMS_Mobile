import { ActionTypes, appHasError } from '../../redux/index';
import { setLoggedInUser, setAuthTokens, setProfile } from '../../screens/login/Login.Action';
import { setUserToken } from '../../screens/splash/Splash.Action';
import { setCorrespondenceInbox } from '../../screens/correspondence/Correspondence.Action';
import  SecurityManager  from '../../services/Keychain/SecurityManager';
import {navigate}  from  '../../navigations/RootNavigation';
import { 
    setDashboardDocumentType,
    setDashboardSenderAndRecipent,
    setDashboardSummaryData,
    setDashboardSummaryPieCharts,
    setDashboardMonthlyTrend,
    setDashboardMonthlyOverdueTrend
} from '../../screens/dashboard/Dashboard.Action';
export const performLogout = (callback) => {
    return async (dispatch) => {
        try {
            const securityManager = new SecurityManager();
            const isDeleted = await securityManager.resetCredentialsFromKeychain();
            if (isDeleted) {
                dispatch(isManualLogout(true));
                dispatch(setAuthTokens(null))
                dispatch(setLoggedInUser(null));
                dispatch(setUserToken(null));
                dispatch(setCorrespondenceInbox([]));
                dispatch(setDashboardDocumentType([]));
                dispatch(setDashboardSenderAndRecipent([]));
                dispatch(setDashboardSummaryData([]));
                dispatch(setDashboardSummaryPieCharts([]));
                dispatch(setDashboardMonthlyTrend([]));
                dispatch(setDashboardMonthlyOverdueTrend([]));
                dispatch(setProfile(null));
                //props.navigation.navigate('Auth');
                callback();
            }
        } catch (error) {
            console.log('Error in SidebarMenu Actions performLogout');
            console.log(error);
            appHasError(error);
        }
    }
}

export const isManualLogout = (status) => {
    return {
        type: ActionTypes.logout.IS_MANUAL_LOGOUT,
        payload: status
    }
}