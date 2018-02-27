import {combineReducers} from 'redux';
// all reducers -------------------------
import reducerMessages from './reducerMessages';
import reducerUsers from './reducerUsers';

export default combineReducers({reducerMessages, reducerUsers});
