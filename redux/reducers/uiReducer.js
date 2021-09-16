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
  SET_REPLY_FORM_ERRORS,
  CLEAR_REPLY_FORM_ERRORS,
  SET_REPLY_STATUS,
  SET_REPLY_STATUS_1,
  SET_REPLY_STATUS_2,
  SET_REPLY_STATUS_3,
  SET_REPLY_STATUS_4,
  SET_REPLY_STATUS_5,
  SET_CREATE_COMMENT_ERRORS,
  CLEAR_CREATE_COMMENT_ERRORS,
  SET_COMMENT_REPLY_FORM_ERRORS_1,
  CLEAR_COMMENT_REPLY_FORM_ERRORS_1,
  SET_COMMENT_REPLY_FORM_ERRORS_2,
  CLEAR_COMMENT_REPLY_FORM_ERRORS_2,
  SET_COMMENT_REPLY_FORM_ERRORS_3,
  CLEAR_COMMENT_REPLY_FORM_ERRORS_3,
  SET_COMMENT_REPLY_FORM_ERRORS_4,
  CLEAR_COMMENT_REPLY_FORM_ERRORS_4,
  SET_COMMENT_REPLY_FORM_ERRORS_5,
  CLEAR_COMMENT_REPLY_FORM_ERRORS_5,
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
  replyFormErrors: null,
  replySent: false,
  replySent1: false,
  replySent2: false,
  replySent3: false,
  replySent4: false,
  replySent5: false,
  createCommentErrors: null,
  commentReplyFormErrors1: null,
  commentReplyFormErrors2: null,
  commentReplyFormErrors3: null,
  commentReplyFormErrors4: null,
  commentReplyFormErrors5: null,
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
    case SET_REPLY_FORM_ERRORS:
      return { ...state, replyFormErrors: action.payload };
    case CLEAR_REPLY_FORM_ERRORS:
      return { ...state, replyFormErrors: null };
    case SET_COMMENT_REPLY_FORM_ERRORS_1:
      return { ...state, commentReplyFormErrors1: action.payload };
    case CLEAR_COMMENT_REPLY_FORM_ERRORS_1:
      return { ...state, commentReplyFormErrors1: null };
    case SET_COMMENT_REPLY_FORM_ERRORS_2:
      return { ...state, commentReplyFormErrors2: action.payload };
    case CLEAR_COMMENT_REPLY_FORM_ERRORS_2:
      return { ...state, commentReplyFormErrors2: null };
    case SET_COMMENT_REPLY_FORM_ERRORS_3:
      return { ...state, commentReplyFormErrors3: action.payload };
    case CLEAR_COMMENT_REPLY_FORM_ERRORS_3:
      return { ...state, commentReplyFormErrors3: null };
    case SET_COMMENT_REPLY_FORM_ERRORS_4:
      return { ...state, commentReplyFormErrors4: action.payload };
    case CLEAR_COMMENT_REPLY_FORM_ERRORS_4:
      return { ...state, commentReplyFormErrors4: null };
    case SET_COMMENT_REPLY_FORM_ERRORS_5:
      return { ...state, commentReplyFormErrors5: action.payload };
    case CLEAR_COMMENT_REPLY_FORM_ERRORS_5:
      return { ...state, commentReplyFormErrors5: null };
    case SET_CREATE_COMMENT_ERRORS:
      return { ...state, createCommentErrors: action.payload };
    case CLEAR_CREATE_COMMENT_ERRORS:
      return { ...state, createCommentErrors: null };

    // UI status message
    case SET_STATUS:
      return { ...state, status: action.payload };
    case CLEAR_STATUS:
      return { ...state, status: "" };
    case SET_RESET_PASSWORD_STATUS:
      return { ...state, resetPasswordStatus: action.payload };
    case CLEAR_RESET_PASSWORD_STATUS:
      return { ...state, resetPasswordStatus: null };

    // loading status
    case SET_REPLY_STATUS:
      return { ...state, replySent: true };
    case SET_REPLY_STATUS_1:
      return { ...state, replySent1: true };
    case SET_REPLY_STATUS_2:
      return { ...state, replySent2: true };
    case SET_REPLY_STATUS_3:
      return { ...state, replySent3: true };
    case SET_REPLY_STATUS_4:
      return { ...state, replySent4: true };
    case SET_REPLY_STATUS_5:
      return { ...state, replySent5: true };

    default:
      return state;
  }
}
