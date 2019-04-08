import { createAction, handleActions } from "redux-actions";
import { Map, List, Record, fromJS } from "immutable";
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';

// action types
const CHANGE_INPUT = "auth/CHANGE_INPUT";
const CHANGE_MODE = "auth/CHANGE_MODE";
const TOGGLE_LOGIN_MODAL = "auth/TOGGLE_LOGIN_MODAL";
const SET_ERROR = "auth/SET_ERROR";
const CHECK_EMAIL = "auth/CHECK_EMAIL";
const LOCAL_LOGIN  = 'auth/LOCAL_LOGIN';

// action creator
export const changeInput = createAction(CHANGE_INPUT);
export const changeMode = createAction(CHANGE_MODE);
export const toggleLoginModal = createAction(TOGGLE_LOGIN_MODAL);
export const setError = createAction(SET_ERROR); // ({ email, password }) [nullable]
export const checkEmail = createAction(CHECK_EMAIL, AuthAPI.checkEmail);
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // ({email, password})

// initial state
const initialState = Map({
  form: Map({
    email: "",
    password: ""
  }),
  visible: false,
  mode: "login"
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
    [CHANGE_MODE]: (state, action) => {
      // console.log(CHANGE_MODE+'a');
      return state.set("mode", state.get("mode") === "login" ? "register" : "login");
    },
    [SET_ERROR]: (state, action) => {
      return state.set("error", fromJS(action.payload));
    },
    ...pender({
      type: CHECK_EMAIL,
      onSuccess: (state, action) => {
        console.log(action.payload);
        const { exists } = action.payload.data;
            return exists
                    ? state.set('error', Map({email: '이미 존재하는 이메일입니다.'}))
                    : state;
      },
    })
  },
  initialState
);
