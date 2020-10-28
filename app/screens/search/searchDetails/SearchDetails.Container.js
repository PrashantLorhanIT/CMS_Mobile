import { connect } from 'react-redux';
import { compose } from 'redux';
import SearchDetails from './SearchDetails';
import { getQuickSearchRecordDetailsProperties, getQuickSearchRecordsMomDetailsProperties, getQuickSearchRecordRFIDetailsProperties } from './SearchDetails.Action';
import withLoader from '../../../componets/loder/withLoader';

const mapStateToProps = state => {
    return {
        loggedInUser: state.loginReducer.loggedInUser,
        userProfile: state.ProfileReducer.userProfile,
        searchCorrespondenceProperties: state.SearchDetailsReducer.searchCorrespondenceProperties,
        searchAttachment: state.SearchDetailsReducer.searchAttachment,
        searchCorrespondenceDistribute: state.SearchDetailsReducer.searchCorrespondenceDistribute,
        searchCorrespondenceWrokFlowSteps: state.SearchDetailsReducer.searchCorrespondenceWrokFlowSteps,
        searchMomProperties: state.SearchDetailsReducer.searchMomProperties,
        searchMomAttendees: state.SearchDetailsReducer.searchMomAttendees,
        searchMomTaskComment: state.SearchDetailsReducer.searchMomTaskComment,
        searchRFIProperties: state.SearchDetailsReducer.searchRFIProperties,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isAppLoading: (isLoading) => dispatch(isAppLoading(isLoading)),
        getQuickSearchRecordDetailsProperties: (corrId, token) => dispatch(getQuickSearchRecordDetailsProperties(corrId, token)),
        getQuickSearchRecordsMomDetailsProperties: (momId, token) => dispatch(getQuickSearchRecordsMomDetailsProperties(momId, token)),
        getQuickSearchRecordRFIDetailsProperties: (rfiId, token) => dispatch(getQuickSearchRecordRFIDetailsProperties(rfiId, token)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(SearchDetails);