import { connect } from 'react-redux';
import { compose } from 'redux';
import LoginScreen from './LoginScreen';
import { performLogin, reachabilityUpdater} from './Login.Action';
import withLoader from '../../componets/loder/withLoader';

const mapStateToProps = state => {

    return {
        loggedInUser: state.loginReducer.loggedInUser,
        userName: state.loginReducer.userName,
        email: state.loginReducer.emqil,
        userId: state.loginReducer.userId,
        isLoading: state.globalReducer.isLoading,
        error: state.globalReducer.error,
        userProfile: state.SplashReducer.userProfile,
    }
}

const mapDispatchToProps = (dispatch) => {
    console.log('Login action method mapDispatchprops ')

    return {
        performLogin: (userName, password, checked) => dispatch(performLogin(userName, password, checked)),
       // subscribeToReachibilityUpdates: () => dispatch(reachabilityUpdater()),
        //checkIfAlreadyAuthenticated: () => dispatch(checkIfAlreadyAuthenticated()),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader
)(LoginScreen);