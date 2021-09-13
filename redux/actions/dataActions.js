// actions controls extraction and update of posts data from firestore
import axios from "axios";
import { analytics } from "../../firebase";
import {
  FETCHING_MORE_POSTS,
  LOADING_POSTS,
  REPLY_LEVEL_1,
  REPLY_LEVEL_2,
  REPLY_LEVEL_3,
  REPLY_LEVEL_4,
  REPLY_LEVEL_5,
  SET_MORE_POSTS,
  SET_POSTS,
  SET_TOTAL_POSTS_COUNT,
} from "../types/dataTypes";
import { SET_REPLY_FORM_ERRORS, SET_REPLY_STATUS } from "../types/uiTypes";
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

// reply to a comment
export const replyToComment =
  (commentId, content, commentData) => (dispatch) => {
    // set type to dispatch based on content
    const dispatchType =
      content === "reply1"
        ? REPLY_LEVEL_1
        : content === "reply2"
        ? REPLY_LEVEL_2
        : content === "reply3"
        ? REPLY_LEVEL_3
        : content === "reply4"
        ? REPLY_LEVEL_4
        : REPLY_LEVEL_5;

    // reply to a comment
    axios
      .post(`/api/comment/${commentId}/reply`, commentData)
      .then((res) => {
        // set reply state
        dispatch({ type: SET_REPLY_STATUS });

        // log analytics data on replied comment
        analytics().logEvent("reply_to_comment", { commentId: Id });

        // update comment1 reply state level
        dispatch({ type: dispatchType, payload: res.data });
      })
      .catch((err) => {
        const errorMessage = (() => {
          if (err.response) {
            //The request was made and the server responded with a status code
            // that falls out of the 2xx range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            return err.response.data;
          } else if (err.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request);
            return err.request;
          } else {
            //something happened in setting up the request that triggered the error
            console.log("Error", err.message);
            return err.message;
          }
        })();

        // clear errors
        dispatch({ type: SET_REPLY_FORM_ERRORS, payload: errorMessage });
      });
  };
