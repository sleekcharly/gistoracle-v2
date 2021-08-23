// bring in reducer types

import { SET_SUBSCRIBED_SHRINES, SET_USER } from "../types/userTypes";

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
      };
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
