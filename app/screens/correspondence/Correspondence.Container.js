import { connect } from 'react-redux';
import { compose } from 'redux';
import Correspondence from './Correspondence';
import { getCorrespondeceList, getCorrespondeceUpdateList, getSenderAndRecipentList} from './Correspondence.Action';
import withLoader from '../../componets/loder/withLoader';
import {isAppLoading} from '../../redux/index';

const mapStateToProps = state => {
    return {
        error: state.globalReducer.error,
        userProfile: state.SplashReducer.userProfile,
        loggedInUser: state.loginReducer.loggedInUser,
        correspondenceInbox: state.CorrespondenceReducer.correspondenceInbox,
        cooreSenderAndRecipent: state.CorrespondenceReducer.cooreSenderAndRecipent,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isAppLoading: (isLoading) => dispatch(isAppLoading(isLoading)),
        appHasError: (error) => dispatch(appHasError(error)),
        getCorrespondeceList: (userID,token) => dispatch(getCorrespondeceList(userID,token)),
        // getCorrespondeceTaskList: (userID) => dispatch(getCorrespondeceTaskList(userID)),
        getCorrespondeceUpdateList: (correspondece) => dispatch(getCorrespondeceUpdateList(correspondece)),
        getSenderAndRecipentList: (token) => dispatch(getSenderAndRecipentList(token)),
     }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(Correspondence);