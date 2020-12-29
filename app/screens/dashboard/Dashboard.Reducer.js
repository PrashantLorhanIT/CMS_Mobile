import ActionTypes from '../../redux/ActionTypes';

const initialState = {
    dashboardDocumentType: [],
    dashboardSenderAndRecipent: [],
    dashboardContract:[],
    dashboardSummaryData:[],
    dashboardSummary:[],
    dashboardMonthlyTrend:[],
    dashboardMonthlyOverdueTrend:[],
    dashboardInboxCount:[],
}
export const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.dashboard.SET_DASHBOARD_DOCUMENTTYPE:
            return {
                ...state,
                dashboardDocumentType: action.payload,
            };
        case ActionTypes.dashboard.SET_DASHBOARD_SENDERANDRECIPENT:
            return {
                ...state,
                dashboardSenderAndRecipent: action.payload,
            };
        case ActionTypes.dashboard.SET_DASHBOARD_CONTRACT:
            return {
                ...state,
                dashboardContract: action.payload,
            };
        case ActionTypes.dashboard.SET_DASHBOARD_SUMMARYDATA:
            return {
                ...state,
                dashboardSummaryData: action.payload,
            };
        case ActionTypes.dashboard.SET_DASHBOARD_SUMMARY:
            return {
                ...state,
                dashboardSummary: action.payload,
            };
        case ActionTypes.dashboard.SET_DASHBOARD_MONTHLYTREND:
                return {
                    ...state,
                    dashboardMonthlyTrend: action.payload,
            };
        case ActionTypes.dashboard.SET_DASHBOARD_MONTHLYOVERDUETREND:
                return {
                    ...state,
                    dashboardMonthlyOverdueTrend: action.payload,
            };
        case ActionTypes.dashboard.SET_DASHBOARD_INBOXCOUNT:
                return {
                    ...state,
                    dashboardInboxCount: action.payload,
            };
    
        default:
            return state;

    }
}