import actionTypes from '../../actionTypes';
import formatter from './formatter';

export default function() {
  return store => next => async action => {
    if (action.error) {
      switch (action.error.name) {
        case 'ExpiredTokenError':
        case 'SimultaneousConnectionError':
          return next({
            type: actionTypes.RESET
          });
        default:
          action.error = formatter.format(action.error);
      }
    }
    return next(action);
  };
}
