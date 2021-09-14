// bring in reducer types

import {
  FETCHING_MORE_POSTS,
  SET_POSTS,
  LOADING_POSTS,
  SET_TOTAL_POSTS_COUNT,
  SET_MORE_POSTS,
  SET_POST_COMMENTS,
  SET_COMMENT_REPLY,
  SET_COMMENT_REPLY_1,
} from "../types/dataTypes";

// initialize state for users
const initialState = {
  loadingPosts: false,
  fetchinPosts: false,
  posts: [],
  totalPosts: 0,
  postComments: {},
  commentReply: {},
  commentReply1: {},
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        loadingPosts: true,
      };
    case FETCHING_MORE_POSTS:
      return {
        ...state,
        fetchingPosts: true,
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loadingPosts: false,
      };
    case SET_TOTAL_POSTS_COUNT:
      return {
        ...state,
        totalPosts: action.payload,
      };
    case SET_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        fetchingPosts: false,
      };
    case SET_POST_COMMENTS:
      return {
        ...state,
        postComments: action.payload,
      };
    case SET_COMMENT_REPLY:
      return {
        ...state,
        commentReply: action.payload,
      };
    case SET_COMMENT_REPLY_1:
      return { ...state, commentReply1: action.payload };
    default:
      return state;
  }
}
