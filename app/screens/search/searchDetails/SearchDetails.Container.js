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
        getQuickSearchRecordDetailsProperties: (corrId) => dispatch(getQuickSearchRecordDetailsProperties(corrId)),
            getQuickSearchRecordsMomDetailsProperties: (momId) => dispatch(getQuickSearchRecordsMomDetailsProperties(momId)),
            getQuickSearchRecordRFIDetailsProperties: (rfiId) => dispatch(getQuickSearchRecordRFIDetailsProperties(rfiId)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(SearchDetails);