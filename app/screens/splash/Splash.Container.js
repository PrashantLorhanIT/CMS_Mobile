import { connect } from 'react-redux';
import { compose } from 'redux';
import SplashScreen from './Splash';
import { getProfileDetails, checkIfAlreadyAuthenticated } from './Splash.Action';
import withLoader from '../../componets/loder/withLoader';

const mapStateToProps = state => {
    return {
        usertoken: state.SplashReducer.usertoken,
        userId: state.SplashReducer.userId,
        userProfile: state.SplashReducer.userProfile,
        loggedInUser: state.loginReducer.loggedInUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        isAppLoading: (isLoading) => dispatch(isAppLoading(isLoading)),
        appHasError: (error) => dispatch(appHasError(error)),
        checkIfAlreadyAuthenticated: (isLoading) => dispatch(checkIfAlreadyAuthenticated(isLoading)),
        getProfileDetails: (userID, token) => dispatch(getProfileDetails(userID, token)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader)
(SplashScreen);