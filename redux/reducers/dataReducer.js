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
  SET_CATEGORY,
  SET_MORE_CATEGORY_POSTS,
  SET_SHRINE,
  FOLLOW_SHRINE,
  UNFOLLOW_SHRINE,
  SET_SAVED_POSTS,
  SET_MORE_SAVED_POSTS,
  SET_MORE_USER_POSTS,
  SAVE_POST,
  UNSAVE_POST,
} from "../types/dataTypes";

// initialize state for users
const initialState = {
  loadingPosts: false,
  fetchingPosts: false,
  posts: [],
  savedPosts: [],
  post: {},
  category: {},
  totalPosts: 0,
  postComments: {},
  commentReply: null,
  commentReply1: null,
  commentReply2: null,
  commentReply3: null,
  commentReply4: null,
  commentReply5: null,
  commentOnPost: null,
  shrine: {},
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_POSTS:
      return {
        ...state,
        loadingPosts: true,
      };
    case SET_CATEGORY:
      return { ...state, category: action.payload };
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
    case SET_MORE_CATEGORY_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        fetchingPosts: false,
      };
    case SET_SAVED_POSTS:
      return { ...state, savedPosts: action.payload };

    case SAVE_POST:
      return { ...state, savedPosts: [action.payload, ...state.savedPosts] };

    case UNSAVE_POST:
      return {
        ...state,
        savedPosts: state.savedPosts.filter(
          (post) => post.postId !== action.payload.postId
        ),
      };

    case SET_MORE_SAVED_POSTS:
      return {
        ...state,
        savedPosts: [...state.savedPosts, ...action.payload],
        fetchingPosts: false,
      };

    case SET_MORE_USER_POSTS:
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

    case SET_SHRINE:
      return { ...state, shrine: action.payload };

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

    case FOLLOW_SHRINE:
    case UNFOLLOW_SHRINE:
      return {
        ...state,
        shrine: action.payload,
      };
    default:
      return state;
  }
}
