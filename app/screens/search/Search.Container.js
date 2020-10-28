import { connect } from 'react-redux';
import { compose } from 'redux';
import search from './Search';
import { getQuickSearchCorrespondenceRecordList, 
    getQuickSearchMomRecordList, 
    getQuickSearchRFIRecordList, 
    getSearchDropDwonValues,
    getAdvanceSearchRFIRecordList,
    getAdvanceSearchMomRecordList,
    getAdvanceSearchCorrespondenceRecordList,
    setSearchDetailEmpty
 } from './Search.Action';
import withLoader from '../../componets/loder/withLoader';

const mapStateToProps = state => {
    return {
        // authToken: state.loginReducer.authToken,
        // refreshToken: state.loginReducer.refreshToken,
        // error: state.globalReducer.error,
        loggedInUser: state.loginReducer.loggedInUser,
        userProfile: state.ProfileReducer.userProfile,
        searchDetails: state.SearchReducer.searchDetails,
        searchProjectContract: state.SearchReducer.searchProjectContract,
        searchSenderAndRecipent: state.SearchReducer.searchSenderAndRecipent,
        searchReviewerandApprover: state.SearchReducer.searchReviewerandApprover,
        searchLocation: state.SearchReducer.searchLocation,
        searchDiscipline: state.SearchReducer.searchDiscipline
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isAppLoading: (isLoading) => dispatch(isAppLoading(isLoading)),
        appHasError: (error) => dispatch(appHasError(error)),
        getSearchDropDwonValues: (token) => dispatch(getSearchDropDwonValues(token)),
        getQuickSearchCorrespondenceRecordList: (referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, correspondenceFromDate, correspondenceToDate,superSearch, entityId, token) => dispatch(getQuickSearchCorrespondenceRecordList(referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, correspondenceFromDate, correspondenceToDate,superSearch, entityId, token)),
        getQuickSearchMomRecordList: (referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, momFromDate, momToDate, superSearch, entityId, token) => dispatch(getQuickSearchMomRecordList(referencenumber, subject, status,senderRidEntityList, recipientRidEntityList,  momFromDate, momToDate, superSearch, entityId, token)),
        getQuickSearchRFIRecordList: (referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, rfiFromDate, rfiToDate, superSearch, entityId, token) => dispatch(getQuickSearchRFIRecordList(referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, rfiFromDate, rfiToDate, superSearch, entityId, token)),
        getAdvanceSearchRFIRecordList: (referencenumber, subject, status, initiator, query, responses, superSearch, token) => dispatch(getAdvanceSearchRFIRecordList(referencenumber, subject, status, initiator, query, responses, superSearch, token)),
        getAdvanceSearchMomRecordList: (referencenumber, subject, status, initiator, superSearch, token) => dispatch(getAdvanceSearchMomRecordList(referencenumber, subject, status, initiator, superSearch, token)),
        getAdvanceSearchCorrespondenceRecordList: (referencenumber, subject, ridCorrCategory, ridContractlist, senderRidEntityList, recipientRidEntityList, 
            reviwer, approver, correspondenceFromDate, correspondenceToDate, replyrequiredbyFromdate, replyrequiredbyTodate, isreplyrequired, isconfidential, status, superSearch, entityId, token) => dispatch(getAdvanceSearchCorrespondenceRecordList(referencenumber, subject, ridCorrCategory, ridContractlist, senderRidEntityList, recipientRidEntityList, 
                reviwer, approver, correspondenceFromDate, correspondenceToDate, replyrequiredbyFromdate, replyrequiredbyTodate, isreplyrequired, isconfidential, status, superSearch, entityId, token)),
        setSearchDetailEmpty:() => dispatch(setSearchDetailEmpty()),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(search);