import { connect } from 'react-redux';
import { compose } from 'redux';
import CorrespondenceDetail from './CoreespondenceDetails';
import { 
    getCorrespondenceDetails,
    getCorrespondenceDetailsDelegateUserMasters, 
    getCorrespondenceDetailsForwardUserMasters,
    getRFIDetailsForwardUserMasters,
    submitCorrespondenceDetailDelegate, 
    submitCorrespondenceDetailApproveReject, 
    getCorrespondenceDetailComments, 
    setCorrespondenceDetailEmpty,
    getCorrespondenceDetailCorrespondenceProperties,
    getCorrespondenceDetailDistributeProperties,
    getCorrespondenceDetailcorrespondenceWorkFlow,
    getTaskDetails,
    getMomDetails,
    getCorrespondenceCategory,
    getRFIDetails,
    
} from './CorrespondenceDetails.Action';
import { setDeleteCorrepondenceRecord } from '../Correspondence.Action';
import withLoader from '../../../componets/loder/withLoader';

const mapStateToProps = state => {
    return {
        // authToken: state.loginReducer.authToken,
        // refreshToken: state.loginReducer.refreshToken,
        error: state.globalReducer.error,
        userProfile: state.SplashReducer.userProfile,
        loggedInUser: state.loginReducer.loggedInUser,
        correspondenceDetailData: state.CorrespondenceDetailsReducer.correspondenceDetailData,
        correspondenceDetailAttachment: state.CorrespondenceDetailsReducer.correspondenceDetailAttachment,
        correspondenceDetailDelegateUserMater: state.CorrespondenceDetailsReducer.correspondenceDetailDelegateUserMater,
        correspondenceDetailForwardUserMater: state.CorrespondenceDetailsReducer.correspondenceDetailForwardUserMater,
        rfiDetailForwardUserMater: state.CorrespondenceDetailsReducer.rfiDetailForwardUserMater,
        correspondenceDetailComment: state.CorrespondenceDetailsReducer.correspondenceDetailComment,
        correspondenceDetailCorrespondenceProperties: state.CorrespondenceDetailsReducer.correspondenceDetailCorrespondenceProperties,
        correspondenceDetailDistributeProperties: state.CorrespondenceDetailsReducer.correspondenceDetailDistributeProperties,
        correspondenceDetailWrokflowSteps: state.CorrespondenceDetailsReducer.correspondenceDetailWrokflowSteps,
        correspondenceDetailTasks: state.CorrespondenceDetailsReducer.correspondenceDetailTasks,
        corresponseApproveReject: state.CorrespondenceDetailsReducer.corresponseApproveReject,
        categoryList : state.CorrespondenceDetailsReducer.categoryList,
        correspondenceDetailActionItem: state.CorrespondenceDetailsReducer.correspondenceDetailActionItem,
        momDetailsPropertiesAttendees: state.CorrespondenceDetailsReducer.momDetailsPropertiesAttendees,
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        isAppLoading: (isLoading) => dispatch(isAppLoading(isLoading)),
        appHasError: (error) => dispatch(appHasError(error)),
        getCorrespondenceDetails: (userId, corrId) => dispatch(getCorrespondenceDetails(userId, corrId)),
            getCorrespondenceDetailsDelegateUserMasters: (entityID) => dispatch(getCorrespondenceDetailsDelegateUserMasters(entityID)),
            getCorrespondenceDetailsForwardUserMasters: (entityID, corrId) => dispatch(getCorrespondenceDetailsForwardUserMasters(entityID, corrId)),
            getRFIDetailsForwardUserMasters: () => dispatch(getRFIDetailsForwardUserMasters()),
        // submitCorrespondenceDetailDelegate: (userid, delegateUserId, wftId, comment) => dispatch(submitCorrespondenceDetailDelegate(userid, delegateUserId, wftId, comment)),
        // submitCorrespondenceDetailApproveReject: (wftId, approve, comment) => dispatch(submitCorrespondenceDetailApproveReject(wftId, approve, comment)),
        // getCorrespondenceDetailComments: (corrId) => dispatch(getCorrespondenceDetailComments(corrId)),
        // getCorrespondenceDetailCorrespondenceProperties: (corrId) => dispatch(getCorrespondenceDetailCorrespondenceProperties(corrId)),
        // getCorrespondenceDetailDistributeProperties: (corrId) => dispatch(getCorrespondenceDetailDistributeProperties(corrId)),
        getCorrespondenceDetailcorrespondenceWorkFlow: (workFlowId) => dispatch(getCorrespondenceDetailcorrespondenceWorkFlow(workFlowId)),
        // setCorrespondenceDetailEmpty:() => dispatch(setCorrespondenceDetailEmpty()),
        getTaskDetails: (userId, taskId) => dispatch(getTaskDetails(userId, taskId)),
            getMomDetails: (userId, momId) => dispatch(getMomDetails(userId, momId)),
            getCorrespondenceCategory: () => dispatch(getCorrespondenceCategory()),
            getRFIDetails: (userId, rfiId, entityId, workFlowTransactionID) => dispatch(getRFIDetails(userId, rfiId, entityId, workFlowTransactionID)),
        setDeleteCorrepondenceRecord: (id) => dispatch(setDeleteCorrepondenceRecord(id)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(CorrespondenceDetail);