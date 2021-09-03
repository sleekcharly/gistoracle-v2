// bring in reducer types
import {
  SET_FEATURED_NAV_CATEGORIES,
  DARK_MODE_ON,
  DARK_MODE_OFF,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_LOGIN_ERRORS,
  SET_SIGNUP_ERRORS,
  SET_RESET_PASSWORD_ERRORS,
  SET_STATUS,
  CLEAR_STATUS,
  CLEAR_LOGIN_ERRORS,
  CLEAR_SIGNUP_ERRORS,
  CLEAR_RESET_PASSWORD_ERRORS,
  SET_RESET_PASSWORD_STATUS,
  CLEAR_RESET_PASSWORD_STATUS,
} from "../types/uiTypes";

const initialState = {
  featuredNavCategories: [],
  darkMode: false,
  errors: null,
  loginErrors: null,
  signupErrors: null,
  resetPasswordErrors: null,
  status: "",
  resetPasswordStatus: null,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEATURED_NAV_CATEGORIES:
      return {
        ...state,
        featuredNavCategories: action.payload,
      };
    //   Dark mode
    case DARK_MODE_ON:
      return { ...state, darkMode: true };
    case DARK_MODE_OFF:
      return { ...state, darkMode: false };

    //   errors
    case CLEAR_ERRORS:
      return { ...state, errors: null };
    case SET_ERRORS:
      return { ...state, errors: action.payload };
    case SET_LOGIN_ERRORS:
      return { ...state, loginErrors: action.payload };
    case CLEAR_LOGIN_ERRORS:
      return { ...state, loginErrors: null };
    case SET_SIGNUP_ERRORS:
      return { ...state, signupErrors: action.payload };
    case CLEAR_SIGNUP_ERRORS:
      return { ...state, signupErrors: null };
    case SET_RESET_PASSWORD_ERRORS:
      return { ...state, resetPasswordErrors: action.payload };
    case CLEAR_RESET_PASSWORD_ERRORS:
      return { ...state, resetPasswordErrors: null };

    // UI status message
    case SET_STATUS:
      return { ...state, status: action.payload };
    case CLEAR_STATUS:
      return { ...state, status: "" };
    case SET_RESET_PASSWORD_STATUS:
      return { ...state, resetPasswordStatus: action.payload };
    case CLEAR_RESET_PASSWORD_STATUS:
      return { ...state, resetPasswordStatus: null };

    default:
      return state;
  }
}
