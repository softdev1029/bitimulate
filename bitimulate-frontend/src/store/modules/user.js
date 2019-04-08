import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { pender } from 'redux-pender';

import * as AuthAPI from 'lib/api/auth';

// action types
const SET_USER = 'user/SET_USER';
const CHECK_LOGIN_STATUS = 'user/CHECK_LOGIN_STATUS';

// action creator
export const setUser = createAction(SET_USER);
export const checkLoginStatus = createAction(CHECK_LOGIN_STATUS, AuthAPI.checkLoginStatus);

// initial state
const initialState = Map({
  processed: false,
  user: null, // Map({ _id, displayName })
  metaInfo: Map({
    pinned: List([])
  }),
  wallet: Map({

  }),
  walletOnOrder: Map({

  }),
  orders: Map({
    processed: List(),
    waiting: List(),
    next: Map({
      processed: null,
      waiting: null
    })
  }),
  earningsHistory: List()
});

// reducer
export default handleActions({
    [SET_USER]: (state, action) => {
      const { payload: user } = action;
      console.log('user:SET_USER:');
      console.log(user);
      return state.set('user', Map(user))
                  .set('logged', true);
    },
    ...pender({
        type: CHECK_LOGIN_STATUS,
        onSuccess: (state, action) => {
          const { user } = action.payload.data;
          return state.set('user', Map(user))
                      .set('processed', true);
        },
        onFailure: (state, action) => {
          return state.set('user', null)
                      .set('processed', true);
        }
    }),
}, initialState);