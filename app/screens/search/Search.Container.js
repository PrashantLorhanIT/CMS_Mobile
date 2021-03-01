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
        getSearchDropDwonValues: () => dispatch(getSearchDropDwonValues()),
            getQuickSearchCorrespondenceRecordList: (userEntityCode,referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, correspondenceFromDate, correspondenceToDate, superSearch, entityId, overDuedDelay) => dispatch(getQuickSearchCorrespondenceRecordList(userEntityCode,referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, correspondenceFromDate, correspondenceToDate, superSearch, entityId, overDuedDelay)),
            getQuickSearchMomRecordList: (referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, momFromDate, momToDate, superSearch, entityId) => dispatch(getQuickSearchMomRecordList(referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, momFromDate, momToDate, superSearch, entityId)),
            getQuickSearchRFIRecordList: (referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, rfiFromDate, rfiToDate, superSearch, entityId) => dispatch(getQuickSearchRFIRecordList(referencenumber, subject, status, senderRidEntityList, recipientRidEntityList, rfiFromDate, rfiToDate, superSearch, entityId)),
            getAdvanceSearchRFIRecordList: (referencenumber, subject, status, initiator, query, responses, superSearch) => dispatch(getAdvanceSearchRFIRecordList(referencenumber, subject, status, initiator, query, responses, superSearch)),
            getAdvanceSearchMomRecordList: (referencenumber, subject, status, initiator, superSearch) => dispatch(getAdvanceSearchMomRecordList(referencenumber, subject, status, initiator, superSearch)),
        getAdvanceSearchCorrespondenceRecordList: (referencenumber, subject, ridCorrCategory, ridContractlist, senderRidEntityList, recipientRidEntityList, 
            reviwer, approver, correspondenceFromDate, correspondenceToDate, replyrequiredbyFromdate, replyrequiredbyTodate, isreplyrequired, isconfidential, status, superSearch, entityId, userEntityCode, overDuedDelay, documentType) => dispatch(getAdvanceSearchCorrespondenceRecordList(referencenumber, subject, ridCorrCategory, ridContractlist, senderRidEntityList, recipientRidEntityList,
                reviwer, approver, correspondenceFromDate, correspondenceToDate, replyrequiredbyFromdate, replyrequiredbyTodate, isreplyrequired, isconfidential, status, superSearch, entityId, userEntityCode, overDuedDelay, documentType)),
        setSearchDetailEmpty:() => dispatch(setSearchDetailEmpty()),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(search);