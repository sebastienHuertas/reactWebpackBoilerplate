import _ from 'lodash';
import actionTypes from './actionTypes';

const INITIAL_STATE = {
  errors: {},
  loading: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /*
    |--------------------------------------------------------------------------
    | DEFAULT
    |--------------------------------------------------------------------------
    */
    default:
      return state;
  }
};
