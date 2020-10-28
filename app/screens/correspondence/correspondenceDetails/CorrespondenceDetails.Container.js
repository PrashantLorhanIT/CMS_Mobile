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
        getCorrespondenceDetails: (userId, corrId, token) => dispatch(getCorrespondenceDetails(userId, corrId, token)),
        getCorrespondenceDetailsDelegateUserMasters: (entityID, token) => dispatch(getCorrespondenceDetailsDelegateUserMasters(entityID, token)),
        getCorrespondenceDetailsForwardUserMasters: (entityID, corrId, token) => dispatch(getCorrespondenceDetailsForwardUserMasters(entityID, corrId, token)),
        getRFIDetailsForwardUserMasters: (token) => dispatch(getRFIDetailsForwardUserMasters(token)),
        // submitCorrespondenceDetailDelegate: (userid, delegateUserId, wftId, comment) => dispatch(submitCorrespondenceDetailDelegate(userid, delegateUserId, wftId, comment)),
        // submitCorrespondenceDetailApproveReject: (wftId, approve, comment) => dispatch(submitCorrespondenceDetailApproveReject(wftId, approve, comment)),
        // getCorrespondenceDetailComments: (corrId) => dispatch(getCorrespondenceDetailComments(corrId)),
        // getCorrespondenceDetailCorrespondenceProperties: (corrId) => dispatch(getCorrespondenceDetailCorrespondenceProperties(corrId)),
        // getCorrespondenceDetailDistributeProperties: (corrId) => dispatch(getCorrespondenceDetailDistributeProperties(corrId)),
        getCorrespondenceDetailcorrespondenceWorkFlow: (workFlowId, token) => dispatch(getCorrespondenceDetailcorrespondenceWorkFlow(workFlowId, token)),
        // setCorrespondenceDetailEmpty:() => dispatch(setCorrespondenceDetailEmpty()),
        getTaskDetails:(userId, taskId, token) => dispatch(getTaskDetails(userId, taskId, token)),
        getMomDetails: (userId, momId, token) => dispatch(getMomDetails(userId, momId, token)),
        getCorrespondenceCategory:(token) => dispatch(getCorrespondenceCategory(token)),
        getRFIDetails: (userId, rfiId, entityId, workFlowTransactionID, token) => dispatch(getRFIDetails(userId, rfiId, entityId, workFlowTransactionID, token)),
        setDeleteCorrepondenceRecord: (id) => dispatch(setDeleteCorrepondenceRecord(id)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(CorrespondenceDetail);