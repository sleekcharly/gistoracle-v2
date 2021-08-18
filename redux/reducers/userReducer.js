// bring in reducer types

import { SET_SUBSCRIBED_SHRINES } from "../types/userTypes";

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
    default:
      return state;
  }
}
