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
  SET_COMMENT_REPLY_2,
  SET_COMMENT_REPLY_3,
  SET_COMMENT_REPLY_4,
  SET_COMMENT_REPLY_5,
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
  commentReply2: {},
  commentReply3: {},
  commentReply4: {},
  commentReply5: {},
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
    case SET_COMMENT_REPLY_2:
      return { ...state, commentReply2: action.payload };
    case SET_COMMENT_REPLY_3:
      return { ...state, commentReply3: action.payload };
    case SET_COMMENT_REPLY_4:
      return { ...state, commentReply4: action.payload };
    case SET_COMMENT_REPLY_5:
      return { ...state, commentReply5: action.payload };
    default:
      return state;
  }
}
