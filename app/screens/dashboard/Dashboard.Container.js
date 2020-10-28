import { connect } from 'react-redux';
import { compose } from 'redux';
import Dashboard from './Dashboard';
import { 
    getExternalSenderAndRecipent, 
    getInternalSenderAndRecipent,
    getDocumenttypes,
    getContracts,
    getDashboardSummaryDetailsData,
    getDashboardPieChartsGraphSummary,
    getDashboardGrapahMonthlyTrend,
    getDashboardGrapahonthlyOverdueTrend,
} from './Dashboard.Action';
import withLoader from '../../componets/loder/withLoader';

const mapStateToProps = state => {
    return {
        error: state.globalReducer.error,
        userProfile: state.SplashReducer.userProfile,
        loggedInUser: state.loginReducer.loggedInUser,
        dashboardDocumentType: state.DashboardReducer.dashboardDocumentType,
        dashboardSenderAndRecipent: state.DashboardReducer.dashboardSenderAndRecipent,
        dashboardContract: state.DashboardReducer.dashboardContract,
        dashboardSummaryData: state.DashboardReducer.dashboardSummaryData,
        dashboardSummary: state.DashboardReducer.dashboardSummary,
        dashboardMonthlyTrend: state.DashboardReducer.dashboardMonthlyTrend,
        dashboardMonthlyOverdueTrend: state.DashboardReducer.dashboardMonthlyOverdueTrend,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isAppLoading: (isLoading) => dispatch(isAppLoading(isLoading)),
        appHasError: (error) => dispatch(appHasError(error)),
        getExternalSenderAndRecipent: (token) => dispatch(getExternalSenderAndRecipent(token)),
        getInternalSenderAndRecipent: (token) => dispatch(getInternalSenderAndRecipent(token)),
        getContracts : (SenderEntityListId, RecipientEntityListId, token) => dispatch(getContracts(SenderEntityListId, RecipientEntityListId, token)),
        getDocumenttypes: (SenderEntityId, corrCategoryId, token) => dispatch(getDocumenttypes(SenderEntityId, corrCategoryId, token)),
        getDashboardSummaryDetailsData : (forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token) => dispatch(getDashboardSummaryDetailsData(forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token)),
        getDashboardPieChartsGraphSummary : (forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token) => dispatch(getDashboardPieChartsGraphSummary(forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token)),
        getDashboardGrapahMonthlyTrend : (forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token) => dispatch(getDashboardGrapahMonthlyTrend(forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token)),
        getDashboardGrapahonthlyOverdueTrend : (forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token) => dispatch(getDashboardGrapahonthlyOverdueTrend(forEntitiy, fromEntity, corrcategory, doctype, ridcontract, token)),
     }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(Dashboard);