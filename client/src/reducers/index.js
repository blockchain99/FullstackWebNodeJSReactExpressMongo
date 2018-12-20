//wire reduxForm to application.
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
//key(auth)that authReducer's output is stored on &
//state object is maintained by redux like state.auth.xxx
  auth: authReducer,
  form: reduxForm,
  surveys: surveysReducer
});
