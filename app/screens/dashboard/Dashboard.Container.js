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
        getExternalSenderAndRecipent: () => dispatch(getExternalSenderAndRecipent()),
            getInternalSenderAndRecipent: () => dispatch(getInternalSenderAndRecipent()),
            getContracts: (SenderEntityListId, RecipientEntityListId) => dispatch(getContracts(SenderEntityListId, RecipientEntityListId)),
            getDocumenttypes: (SenderEntityId, corrCategoryId) => dispatch(getDocumenttypes(SenderEntityId, corrCategoryId)),
            getDashboardSummaryDetailsData: (forEntitiy, fromEntity, corrcategory, doctype, ridcontract) => dispatch(getDashboardSummaryDetailsData(forEntitiy, fromEntity, corrcategory, doctype, ridcontract)),
            getDashboardPieChartsGraphSummary: (forEntitiy, fromEntity, corrcategory, doctype, ridcontract) => dispatch(getDashboardPieChartsGraphSummary(forEntitiy, fromEntity, corrcategory, doctype, ridcontract)),
            getDashboardGrapahMonthlyTrend: (forEntitiy, fromEntity, corrcategory, doctype, ridcontract) => dispatch(getDashboardGrapahMonthlyTrend(forEntitiy, fromEntity, corrcategory, doctype, ridcontract)),
            getDashboardGrapahonthlyOverdueTrend: (forEntitiy, fromEntity, corrcategory, doctype, ridcontract) => dispatch(getDashboardGrapahonthlyOverdueTrend(forEntitiy, fromEntity, corrcategory, doctype, ridcontract)),
     }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(Dashboard);