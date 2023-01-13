// define userReducer function for processing Ui functionality data
// bring in reducer types
import {
  ADD_USER_LIKES,
  ADD_USER_SAVED_POST,
  REMOVE_USER_LIKE,
  REMOVE_USER_SAVED_POST,
  RESET_AUTH_SHRINES_FOR_INFINITE_SCROLL,
  SET_MORE_AUTH_SHRINES_FOR_INFINITE_SCROLL,
  SET_SUBSCRIBED_SHRINES,
  SET_USER,
  SET_USER_PROFILE,
} from '../types/userTypes';

// establish types for app initial state
type stateProps = {
  authenticated: boolean;
  loading: boolean;
  profileLoading: boolean;
  credentials: object;
  userPageProfile: object;
  loadingConsecratedShrines: boolean;
  likes: object[];
  savedPosts: any;
  subscribedShrines: object[];
  authShrinesForInfiniteScroll: object[];
};

// initialize state for users
const initialState: stateProps = {
  authenticated: false,
  loading: false,
  profileLoading: false,
  credentials: {},
  userPageProfile: {},
  loadingConsecratedShrines: false,
  likes: [],
  savedPosts: [],
  subscribedShrines: [],
  authShrinesForInfiniteScroll: [],
};

// define action props
type actionProps = {
  type: string;
  payload: any;
};

// define user reducer function
export default function userReducer(
  state: any = initialState,
  action: actionProps,
) {
  switch (action.type) {
    case SET_SUBSCRIBED_SHRINES:
      return {
        ...state,
        subscribedShrines: action.payload,
        authShrinesForInfiniteScroll: action.payload.slice(0, 10),
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };

    case SET_USER_PROFILE:
      return { ...state, userPageProfile: action.payload };

    case SET_MORE_AUTH_SHRINES_FOR_INFINITE_SCROLL:
      return {
        ...state,
        authShrinesForInfiniteScroll: [
          ...state.authShrinesForInfiniteScroll,
          ...state.subscribedShrines.slice(
            state.authShrinesForInfiniteScroll.length,
            state.authShrinesForInfiniteScroll.length + 10,
          ),
        ],
      };
    case RESET_AUTH_SHRINES_FOR_INFINITE_SCROLL:
      return {
        ...state,
        authShrinesForInfiniteScroll: [...state.subscribedShrines.slice(0, 10)],
      };
    case ADD_USER_LIKES:
      let likeData = {
        username: state.credentials.username,
        postId: action.payload,
      };

      return { ...state, likes: [likeData, ...state.likes] };

    case REMOVE_USER_LIKE:
      return {
        ...state,
        likes: state.likes.filter(
          (like: any) => like.postId !== action.payload,
        ),
      };

    case ADD_USER_SAVED_POST:
      return { ...state, savedPosts: [action.payload, ...state.savedPosts] };

    case REMOVE_USER_SAVED_POST:
      return {
        ...state,
        savedPosts: state.savedPosts.filter(
          (post: any) => post.postId !== action.payload.postId,
        ),
      };
    default:
      return state;
  }
}
