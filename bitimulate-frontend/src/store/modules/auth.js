import { createAction, handleActions } from "redux-actions";

import { Map, List, Record, fromJS } from "immutable";

// action types
const CHANGE_INPUT = "auth/CHANGE_INPUT";
const TOGGLE_LOGIN_MODAL = "auth/TOGGLE_LOGIN_MODAL";
const SET_ERROR = "auth/SET_ERROR";

// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const toggleLoginModal = createAction(TOGGLE_LOGIN_MODAL);
export const setError = createAction(SET_ERROR); // ({ email, password }) [nullable]

// initial state
const initialState = Map({
  form: Map({
    email: "",
    password: ""
  }),
  visible: false
});

// reducer
export default handleActions(
  {
    [TOGGLE_LOGIN_MODAL]: (state, action) => {
      console.log(TOGGLE_LOGIN_MODAL);
      const visible = state.get("visible");
      if (visible) {
        return state.set("visible", false);
      }
      return state.set("visible", true);
    },
    [CHANGE_INPUT]: (state, action) => {
      console.log(CHANGE_INPUT);
      const { name, value } = action.payload;
      return state.setIn(["form", name], value);
    },
    [SET_ERROR]: (state, action) => {
      return state.set("error", fromJS(action.payload));
    }
  },
  initialState
);
