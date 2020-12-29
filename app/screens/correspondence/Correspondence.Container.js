import { connect } from 'react-redux';
import { compose } from 'redux';
import Correspondence from './Correspondence';
import {
    getCorrespondeceList,
    getCorrespondeceUpdateList,
    getSenderAndRecipentList,
    getCorrespondeceLoadMoreList,
    setUpdateCorrepondenceRecord,
    getInboxCount
} from './Correspondence.Action';
import withLoader from '../../componets/loder/withLoader';
import {isAppLoading} from '../../redux/index';

const mapStateToProps = state => {
    return {
        error: state.globalReducer.error,
        userProfile: state.SplashReducer.userProfile,
        loggedInUser: state.loginReducer.loggedInUser,
        correspondenceInbox: state.CorrespondenceReducer.correspondenceInbox,
        cooreSenderAndRecipent: state.CorrespondenceReducer.cooreSenderAndRecipent,
        correspondenceInboxCount: state.CorrespondenceReducer.correspondenceInboxCount,
        dashboardInboxCount: state.DashboardReducer.dashboardInboxCount

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isAppLoading: (isLoading) => dispatch(isAppLoading(isLoading)),
        appHasError: (error) => dispatch(appHasError(error)),
        getCorrespondeceList: (userID,category) => dispatch(getCorrespondeceList(userID, category)),
        // getCorrespondeceTaskList: (userID) => dispatch(getCorrespondeceTaskList(userID)),
        getCorrespondeceUpdateList: (correspondece) => dispatch(getCorrespondeceUpdateList(correspondece)),
        getSenderAndRecipentList: () => dispatch(getSenderAndRecipentList()),
        getCorrespondeceLoadMoreList: (userId, PageNumber, category) => dispatch(getCorrespondeceLoadMoreList(userId, PageNumber, category)),
        setUpdateCorrepondenceRecord: (id) => dispatch(setUpdateCorrepondenceRecord(id)),
        getInboxCount:(userId) => dispatch(getInboxCount(userId))
     }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(Correspondence);