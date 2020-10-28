import { connect } from 'react-redux';
import SidebarMenu from './SidebarMenu';
import { compose } from 'redux';
import withLoader from '../../componets/loder/withLoader';
import { performLogout } from './SidebarMenu.Action';

const mapStateToProps = state => {

    return {
        isAppOnline: state.globalReducer.isInternetReachable,
        // isLoading: state.globalReducer.isLoading, 
        loggedInUser: state.loginReducer.loggedInUser,    
        userProfile: state.ProfileReducer.userProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        performLogout: (props) => dispatch(performLogout(props))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withLoader,
)(SidebarMenu);