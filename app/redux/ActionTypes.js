export default ActionTypes = {
    global: {
        IS_LOADING: 'IS_LOADING',
        APP_HAS_ERROR: 'APP_HAS_ERROR',
        IS_INTERNET_REACHABLE: 'IS_INTERNET_REACHABLE'
    },
    login: {
        SET_LOGGED_IN_USER: 'SET_LOGGED_IN_USER',
        SET_AUTH_TOKENS: 'SET_AUTH_TOKENS',
        USER_ID: 'USER_ID',
    },
    logout: {
        IS_MANUAL_LOGOUT: 'IS_MANUAL_LOGOUT'
    },
    profile: {
        SET_USER_TOKEN: 'SET_USER_TOKEN',
        SET_USER_PROFILE: 'SET_USER_PROFILE'
    },
    search: {
        
        SET_CORRESPONDENCE_SEARCH: 'SET_CORRESPONDENCE_SEARCH',
        SET_CORRESPONDENCE_SEARCH_ATTACHMENT: 'SET_CORRESPONDENCE_SEARCH_ATTACHMENT',
        SET_CORRESPONDENCE_SEARCH_CORRESPONDENCE_PROPERTIES: 'SET_CORRESPONDENCE_SEARCH_CORRESPONDENCE_PROPERTIES',
        SET_CORRESPONDENCE_SEARCH_DISTRIBUTE_PROPERTIES:'SET_CORRESPONDENCE_SEARCH_DISTRIBUTE_PROPERTIES',
        SET_CORRESPONDENCE_SEARCH_WORKFLOW_STEPS: 'SET_CORRESPONDENCE_SEARCH_WORKFLOW_STEPS',
        SET_CORRESPONDENCE_SEARCH_MOM_PROPERTIES: 'SET_CORRESPONDENCE_SEARCH_MOM_PROPERTIES',
        SET_CORRESPONDENCE_SEARCH_MOM_ATTENDEES: 'SET_CORRESPONDENCE_SEARCH_MOM_ATTENDEES',
        SET_CORRESPONDENCE_SEARCH_MOM_TASKCOMMENT: 'SET_CORRESPONDENCE_SEARCH_MOM_TASKCOMMENT',
        SET_CORRESPONDENCE_SEARCH_RFI_PROPERTIES: 'SET_CORRESPONDENCE_SEARCH_RFI_PROPERTIES',
        SET_SEARCH_PROJECTCONTRACT:'SET_SEARCH_PROJECTCONTRACT',
        SET_SEARCH_SENDERANDRECIPENT:'SET_SEARCH_SENDERANDRECIPENT',
        SET_SEARCH_REVIEWERANDAPPROVER: 'SET_SEARCH_REVIEWERANDAPPROVER',
        SET_SEARCH_LOCATION: 'SET_SEARCH_LOCATION',
        SET_SEARCH_DISCIPLINE: 'SET_SEARCH_DISCIPLINE'

    },
    dashboard: {
        SET_DASHBOARD_DOCUMENTTYPE: 'SET_DASHBOARD_DOCUMENTTYPE',
        SET_DASHBOARD_SENDERANDRECIPENT: 'SET_DASHBOARD_SENDERANDRECIPENT',
        SET_DASHBOARD_CONTRACT: 'SET_DASHBOARD_CONTRACT',
        SET_DASHBOARD_SUMMARYDATA: 'SET_DASHBOARD_SUMMARYDATA',
        SET_DASHBOARD_SUMMARY: 'SET_DASHBOARD_SUMMARY',
        SET_DASHBOARD_MONTHLYTREND:' SET_DASHBOARD_MONTHLYTREND',
        SET_DASHBOARD_MONTHLYOVERDUETREND:'SET_DASHBOARD_MONTHLYOVERDUETREND'
    },

    correspondence: {
        SET_CORRESPONDENCE_INBOX : 'SET_CORRESPONDENCE_INBOX',
        SET_CORRESPONDENCE_INBOX_COUNT :'SET_CORRESPONDENCE_INBOX_COUNT',
        SET_CORRESPONDENCE_INBOX_SENDERANDRECIPENT: 'SET_CORRESPONDENCE_INBOX_SENDERANDRECIPENT',
        SET_CORRESPONDENCE_DETAIL: 'SET_CORRESPONDENCE_DETAIL',
        SET_CORRESPONDENCE_DETAIL_ATTACHMENT: 'SET_CORRESPONDENCE_DETAIL_ATTACHMENT',
        SET_CORRESPONDENCE_DETAIL_TASKS: 'SET_CORRESPONDENCE_DETAIL_TASKS',
        SET_CORRESPONDENCE_DETAIL_ACTIONITEM: 'SET_CORRESPONDENCE_DETAIL_ACTIONITEM',
        SET_CORRESPONDENCE_DETAIL_USERMASTER: 'SET_CORRESPONDENCE_DETAIL_USERMASTER',
        SET_CORRESPONDENCE_DETAIL_COMMENTS: 'SET_CORRESPONDENCE_DETAIL_COMMENTS',
        SET_CORRESPONDENCE_DETAIL_CORRESPONDENCE_PROPERTIES: 'SET_CORRESPONDENCE_DETAIL_CORRESPONDENCE_PROPERTIES',
        SET_CORRESPONDENCE_DETAIL_DISTRIBUTE_PROPERTIES: 'SET_CORRESPONDENCE_DETAIL_DISTRIBUTE_PROPERTIES',
        SET_CORRESPONDENCE_DETAIL_APPROVEL_PROPERTIES: 'SET_CORRESPONDENCE_DETAIL_APPROVEL_PROPERTIES',
        SET_CORRESPONDENCE_DETAIL_WORKFLOW_STEPS: 'SET_CORRESPONDENCE_DETAIL_WORKFLOW_STEPS',
        SET_CORRESPONDENCE_DETAIL_APPROVE_REJECT_CLOSE: 'SET_CORRESPONDENCE_DETAIL_APPROVE_REJECT_CLOSE',
        SET_CORRESPONDENCE_CATEGORY: 'SET_CORRESPONDENCE_CATEGORY',
        SET_CORRESPONDENCE_DETAIL_MOM_PROPERTIES_ATTENDEES: 'SET_CORRESPONDENCE_DETAIL_MOM_PROPERTIES_ATTENDEES',
        SET_CORRESPONDENCE_INBOX_DELETERECORD: 'SET_CORRESPONDENCE_INBOX_DELETERECORD',
        SET_CORRESPONDENCE_INBOX_FORWARDDELEGATE: 'SET_CORRESPONDENCE_INBOX_FORWARDDELEGATE',
        SET_CORRESPONDENCE_INBOX_RFIFORWARDUSERMSTER: 'SET_CORRESPONDENCE_INBOX_RFIFORWARDUSERMSTER',
    }
};