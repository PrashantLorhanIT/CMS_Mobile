import { combineReducers } from 'redux';
import { globalReducer } from './GlobalReducer';
import { SplashReducer } from '../screens/splash/Splash.Reducer';
import { loginReducer } from '../screens/login/Login.Reducer';
import { SidebarMenuReducer } from '../componets/sideBarMenu/SidebarMenu.Reducer';
import { CorrespondenceReducer } from '../screens/correspondence/Correspondence.Reducer';
import { CorrespondenceDetailsReducer } from '../screens/correspondence/correspondenceDetails/CorrespondenceDetails.Reducer';
import { ProfileReducer } from '../screens/profile/Profile.Reducer';
import { DashboardReducer} from '../screens/dashboard/Dashboard.Reducer';
import { SearchReducer } from '../screens/search/Search.Reducer';
import { SearchDetailsReducer } from '../screens/search/searchDetails/SearchDetails.Reducer';
export default combineReducers({
    globalReducer,
    SplashReducer,
    loginReducer,
    SidebarMenuReducer,
    CorrespondenceReducer,
    CorrespondenceDetailsReducer,
    ProfileReducer,
    DashboardReducer,
    SearchReducer,
    SearchDetailsReducer
});