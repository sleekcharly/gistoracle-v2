// actions controls extraction and update of posts data from firestore

import axios from "axios";
import {
  FETCHING_MORE_POSTS,
  LOADING_POSTS,
  SET_MORE_POSTS,
  SET_POSTS,
  SET_TOTAL_POSTS_COUNT,
} from "../types/dataTypes";
import { SET_MORE_AUTH_SHRINES_FOR_INFINITE_SCROLL } from "../types/userTypes";

// get all posts
export const getAllPosts = (clickedButton) => (dispatch) => {
  // set loading posts state
  dispatch({ type: LOADING_POSTS });

  // extract data using api
  axios
    .get(`/api/posts/getPosts/${clickedButton}`)
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
      console.error(err.response.data);
    });
};

// get total number of posts from database
export const getTotalPostsCount = () => (dispatch) => {
  axios
    .get("/api/posts/totalPostsCount")
    .then((res) => {
      dispatch({ type: SET_TOTAL_POSTS_COUNT, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_TOTAL_POSTS_COUNT, payload: 0 });
    });
};

// get authenticated user's tailored post based on followed shrines
export const getTailoredPosts = (clickedButton) => (dispatch) => {
  // set loading posts state
  dispatch({ type: LOADING_POSTS });

  // extract user tailored posts from api
  axios
    .get(`/api/posts/getAuthUserPosts/${clickedButton}`)
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
      console.error(err.response.data);
    });
};

// get next posts for infinite scroll component
export const getNextPosts = (clickedButton, parameter) => (dispatch) => {
  dispatch({ type: FETCHING_MORE_POSTS });
  axios
    .get(`/api/posts/nextPosts/${clickedButton}/${parameter}`)
    .then((res) => {
      dispatch({
        type: SET_MORE_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_MORE_POSTS,
        payload: [],
      });
    });
};

// get next authenticated user posts for infinte scroll
export const getNextAuthPosts =
  (clickedButton, shrineFetchNo) => (dispatch) => {
    dispatch({ type: FETCHING_MORE_POSTS });

    // get more user tailored posts
    axios
      .get(`/api/posts/nextAuthUserPosts/${clickedButton}/${shrineFetchNo}`)
      .then((res) => {
        dispatch({ type: SET_MORE_POSTS, payload: res.data });
        dispatch({ type: SET_MORE_AUTH_SHRINES_FOR_INFINITE_SCROLL });
      })
      .catch((err) => {
        dispatch({ type: SET_MORE_POSTS, payload: [] });
      });
  };
