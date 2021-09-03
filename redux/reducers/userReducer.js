// bring in reducer types

import {
  RESET_AUTH_SHRINES_FOR_INFINITE_SCROLL,
  SET_MORE_AUTH_SHRINES_FOR_INFINITE_SCROLL,
  SET_SUBSCRIBED_SHRINES,
  SET_USER,
} from "../types/userTypes";

// initialize state for users
const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  loadingConsecratedShrined: false,
  consecratedShrines: {},
  profileCredentials: {},
  likes: [],
  savedPosts: [],
  subscribedShrines: [],
  authShrinesForInfiniteScroll: [],
};

export default function userReducer(state = initialState, action) {
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
    case SET_MORE_AUTH_SHRINES_FOR_INFINITE_SCROLL:
      return {
        ...state,
        authShrinesForInfiniteScroll: [
          ...state.authShrinesForInfiniteScroll,
          ...state.subscribedShrines.slice(
            state.authShrinesForInfiniteScroll.length,
            state.authShrinesForInfiniteScroll.length + 10
          ),
        ],
      };
    case RESET_AUTH_SHRINES_FOR_INFINITE_SCROLL:
      return {
        ...state,
        authShrinesForInfiniteScroll: [...state.subscribedShrines.slice(0, 10)],
      };
    default:
      return state;
  }
}
