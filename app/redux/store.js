import { createStore } from 'redux';
import rootReducers from './RootReducers';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = () => {
    return createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));
}


export default configureStore;