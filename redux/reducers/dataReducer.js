// bring in reducer types

import {
  FETCHING_MORE_POSTS,
  SET_POSTS,
  SET_POST,
  LOADING_POSTS,
  SET_TOTAL_POSTS_COUNT,
  SET_MORE_POSTS,
  SET_POST_COMMENTS,
  SET_POST_COMMENT,
  SET_COMMENT_REPLY,
  SET_COMMENT_REPLY_1,
  SET_COMMENT_REPLY_2,
  SET_COMMENT_REPLY_3,
  SET_COMMENT_REPLY_4,
  SET_COMMENT_REPLY_5,
  LIKE_POST,
  UNLIKE_POST,
} from "../types/dataTypes";

// initialize state for users
const initialState = {
  loadingPosts: false,
  fetchinPosts: false,
  posts: [],
  post: {},
  totalPosts: 0,
  postComments: {},
  commentReply: null,
  commentReply1: null,
  commentReply2: null,
  commentReply3: null,
  commentReply4: null,
  commentReply5: null,
  commentOnPost: null,
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

    case SET_POST:
      return { ...state, post: action.payload };

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
    case SET_POST_COMMENT:
      return {
        ...state,
        commentOnPost: action.payload,
        postComments: [action.payload, ...state.postComments],
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

    //   like and unlike post case
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === action.payload.postId
      );

      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }

      return { ...state };
    default:
      return state;
  }
}
