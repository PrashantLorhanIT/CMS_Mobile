import { connect } from 'react-redux';
import { compose } from 'redux';
import profile from './Profile';
import { getProfileDetails } from './Profile.Action';
import withLoader from '../../componets/loder/withLoader';
import {performLogout} from '../../componets/sideBarMenu/SidebarMenu.Action';
const mapStateToProps = state => {
    return {
        // authToken: state.loginReducer.authToken,
        // refreshToken: state.loginReducer.refreshToken,
        // error: state.globalReducer.error,
        loggedInUser: state.loginReducer.loggedInUser,
        userProfile: state.ProfileReducer.userProfile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isAppLoading: (isLoading) => dispatch(isAppLoading(isLoading)),
        appHasError: (error) => dispatch(appHasError(error)),
        getProfileDetails: (userID) => dispatch(getProfileDetails(userID)),
        performLogout: (props) => dispatch(performLogout(props))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(profile);