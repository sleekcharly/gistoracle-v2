// define uiReducer function for processing Ui functionality data
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
  SET_LOADING_COMPONENT_POSTS,
  SET_LOADING_USER_SAVED_POSTS,
  STOP_LOADING_USER_SAVED_POSTS,
  STOP_LOADING_COMPONENT_POSTS,
  LOADING_USER,
  STOP_LOADING_USER,
  SELECT_SHRINE,
} from '../types/uiTypes';

// establish types for redux state
type stateProps = {
  featuredNavCategories: object[];
  darkMode: boolean;
  errors: object | null;
  loginErrors: object | null;
  signupErrors: object | null;
  resetPasswordErrors: object | null;
  status: string;
  resetPasswordStatus: object | null;
  replyFormErrors: object | null;
  replySent: boolean;
  replySent1: boolean;
  replySent2: boolean;
  replySent3: boolean;
  replySent4: boolean;
  replySent5: boolean;
  createCommentErrors: object | null;
  commentReplyFormErrors1: object | null;
  commentReplyFormErrors2: object | null;
  commentReplyFormErrors3: object | null;
  commentReplyFormErrors4: object | null;
  commentReplyFormErrors5: object | null;
  loadingComponentPosts: boolean;
  loadingSavedPosts: boolean;
  loadingUser: boolean;
  shrineSelected: boolean;
};

// initialize state for ui elements
const initialState: stateProps = {
  featuredNavCategories: [],
  darkMode: false,
  errors: null,
  loginErrors: null,
  signupErrors: null,
  resetPasswordErrors: null,
  status: '',
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
  loadingComponentPosts: false,
  loadingSavedPosts: false,
  loadingUser: false,
  shrineSelected: false,
};

// define action props
type actionProps = {
  type: string;
  payload: any;
};

// define uireducer fiunction
export default function uiReducer(
  state: any = initialState,
  action: actionProps,
) {
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
      return { ...state, status: '' };
    case SET_RESET_PASSWORD_STATUS:
      return { ...state, resetPasswordStatus: action.payload };
    case CLEAR_RESET_PASSWORD_STATUS:
      return { ...state, resetPasswordStatus: null };
    case SELECT_SHRINE:
      return { ...state, shrineSelected: true };

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
    case SET_LOADING_COMPONENT_POSTS:
      return { ...state, loadingComponentPosts: true };
    case SET_LOADING_USER_SAVED_POSTS:
      return { ...state, loadingSavedPosts: true };
    case STOP_LOADING_USER_SAVED_POSTS:
      return { ...state, loadingSavedPosts: false };
    case STOP_LOADING_COMPONENT_POSTS:
      return { ...state, loadingComponentPosts: false };
    case LOADING_USER:
      return { ...state, loadingUser: true };
    case STOP_LOADING_USER:
      return { ...state, loadingUser: false };

    default:
      return state;
  }
}
