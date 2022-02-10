import { combineReducers } from 'redux';
import dashboardReducer from './reducers/dashboardReducer';
import callReducer from './reducers/callReducer';
import userReducer from './reducers/userReducer';
export default combineReducers({
  dashboard: dashboardReducer,
  call: callReducer,
  user: userReducer,
});
