import { connect } from 'react-redux';
import { compose } from 'redux';
import Correspondence from './Correspondence';
import {
    getCorrespondeceList,
    getCorrespondeceUpdateList,
    getSenderAndRecipentList,
    getCorrespondeceLoadMoreList
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
        correspondenceInboxCount: state.CorrespondenceReducer.correspondenceInboxCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isAppLoading: (isLoading) => dispatch(isAppLoading(isLoading)),
        appHasError: (error) => dispatch(appHasError(error)),
        getCorrespondeceList: (userID) => dispatch(getCorrespondeceList(userID)),
        // getCorrespondeceTaskList: (userID) => dispatch(getCorrespondeceTaskList(userID)),
        getCorrespondeceUpdateList: (correspondece) => dispatch(getCorrespondeceUpdateList(correspondece)),
        getSenderAndRecipentList: () => dispatch(getSenderAndRecipentList()),
            getCorrespondeceLoadMoreList: (userId, PageNumber) => dispatch(getCorrespondeceLoadMoreList(userId, PageNumber)),
     }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(Correspondence);