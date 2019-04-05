import { createAction, handleActions } from "redux-actions";

import { Map, List, Record } from "immutable";

// action types
const CHANGE_INPUT = "auth/CHANGE_INPUT";
const TOGGLE_LOGIN_MODAL = "auth/TOGGLE_LOGIN_MODAL";

// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const toggleLoginModal = createAction(TOGGLE_LOGIN_MODAL);

// initial state
const initialState = Map({
  auth: Map({
    visible: false,
    email: "",
    password: ""
  })
});

// reducer
export default handleActions(
  {
    [TOGGLE_LOGIN_MODAL]: (state, action) => {
      console.log(TOGGLE_LOGIN_MODAL);
      const visible = state.getIn(["auth", "visible"]);
      if (visible) {
        return state.setIn(["auth", "visible"], false);
      }
      return state.setIn(["auth", "visible"], true);
    },
    [CHANGE_INPUT]: (state, action) => {
      console.log(CHANGE_INPUT);
      const { name, value } = action.payload;
      return state.setIn(["auth", name], value);
    }
  },
  initialState
);
