export const constants = {
    webService: {
        // baseURL: 'http://cms.lorhanit.com/ERCMS/api/',
         baseURL: 'https://cmstest.etihadrail.ae/ERCMSAPI_QA/api/',
         documentBaseUrl: 'https://cmstest.etihadrail.ae/ERCMSAPI_QA/',
       // documentBaseUrl: 'http://cms.lorhanit.com/ERCMS/',

        methods: {
            auth: {
                login: 'Usermaster/AuthenticateUser',
                forgotPassword: 'Usermaster/ForgotPassword',
                changePassword: 'Usermaster/ChangePassword',
                getRefershToken: 'Usermaster/RefreshToken'
            },
            common: {

                userProfile:'Usermaster',
                correspondenceList: 'Inbox',
                getCategoryList: 'Corrcategory/GetCorrcategories',
                // Correspondence 
                correspondenceDetails: 'Workflowtransaction/GetCorrTransactionStatusByUserId',
                correspondenceDetailsAttachment: 'Attachment/GetAttachmentsByCorrID',
                userMasters: 'Usermaster/GetUsermastersByEntityID',
                forwardUserMasters: 'Usermaster/GetForwardUsermasterList',
                correspondenceDelegate: 'Inbox/DelegateCorrespondendce',
                correspondenceApproveReject:'Workflowtransaction/ApproveRejectWorkflowtransaction',
                correspondenceComments: 'Corr/GetCommentsByCorrID',
                correspondenceProperties: 'Corr/GetCorr',
                correspondenceDistribute: 'Corr/GetCorrdetailByCorrID',
                correspondenceWorkFlow: 'Workflowstep/GetWorkflowstepsByWorkflowID',
                correspondenceTaskList: 'UserTask/GetUserTasksByCorrID',
                correspondenceForward: 'Inbox/ForwardCorrespondendce',
                CorrespondenceSignature: 'Signature/GetCorrSignatureStatus',
                
                //Task 
                taskDetails: 'UserTask/GetUserTaskDetailByTaskID',
                taskDetailsAttachment: 'Attachment/GetAttachmentsByTaskID',
                taskDetailComments:'',
                taskDetailTaskList:'',
                //Mom
                momDetails:'Workflowtransaction/GetMomTransactionStatusByUserId',
                momDetailsAttachment:'Attachment/GetAttachmentsByMomID',
                momDetailComments: 'Mom/GetCommentsByMomID',
                momDetailTaskList: 'UserTask/GetUserTasksByMomID',
                momDetailTaskCommet: 'Mom/GetMinutesTasksByMomID',
                momDetailAprovals: 'Mom/GetReviewDetails',
                momDetailProperties: 'Mom',
                momDetailPropertiesAttendes: 'Mom/GetAttendeesByMomID',
                momAddComment: 'Mom/AddComment',
                momTaskComplete: 'UserTask/CompleteCloseTask',

                //FRI
                rfiDetails: 'Workflowtransaction/GetRFITransactionStatusByUserId',
                rfiDetailAttachment: 'Attachment/GetAttachmentsByRfiID',
                rfiDetailComment: 'Rfi/GetCommentsByRfiID',
                rfiDetailProperties:'Rfi',
                rfiDelegate: 'Inbox/DelegateRFI',
                rfiForward: 'Inbox/ForwardRFI',
                rfiAddComment: 'Rfi/AddComment',
                rfiForwardUserMasters: 'Usermaster/GetUsermasters',
                riiSignature: 'Signature/GetRFISignatureStatus'
            },
            dashboard: {
                getDocumenttypes:'Documenttype/GetDocumenttypesByEntityId',
                getExternalEntities: 'Entity/GetExternalEntities',
                getInternalEntities: 'Entity/GetInternalEntities',
                getContract: 'Contract/GetContractsByEntityListID',
                getDashboardSummaryData:'Dashboard/TotalReceived',
                getDashBoardSummary:'Dashboard/Summary',
                getDashBoardMonthlyTrend:'Dashboard/ReceivedMonthlyTrend',
                getDashBoardMonthlyOverdueTrend:'Dashboard/OverdueMonthlyTrend'
                
            },
           search: {
                getProjectContract: 'Contract/GetContracts',
                getAllSenderAndRecipent: 'Entity/GetExternalEntities',
                getAllReviewerandApprover: 'Usermaster/GetUsermasters',
                correspondenceSearch: 'Search/Correspondence',
                momSearch: 'Mom/SearchMoms',
                rfiSearch: 'Rfi/SearchRfis',
                getLocation: 'Location/GetLocations',
                getDisciplines: 'Discipline/GetDisciplines'
           },
        }
    },
    
}