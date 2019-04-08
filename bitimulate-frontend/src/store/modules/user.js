import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';

import { pender } from 'redux-pender';

// action types
const SET_USER = 'user/SET_USER';

// action creator
export const setUser = createAction(SET_USER);

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
      return state.set('user', Map(user))
                  .set('logged', true);
    },
}, initialState);