import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as appReducer, actionTypes as appActionTypes } from './app';

const reducers = combineReducers({
  app: appReducer,
  form: formReducer
});

export default (state, action) => {
  if (action.type === appActionTypes.RESET) {
    state = undefined;
  }
  return reducers(state, action);
};
