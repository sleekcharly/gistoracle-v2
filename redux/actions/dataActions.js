// actions controls extraction and update of posts data from firestore
import axios from "axios";
import { analytics } from "../../firebase";
import {
  FETCHING_MORE_POSTS,
  LOADING_POSTS,
  SET_COMMENT_REPLY,
  SET_MORE_POSTS,
  SET_POSTS,
  SET_SAVED_POSTS,
  SET_TOTAL_POSTS_COUNT,
  SET_POST_COMMENT,
  LIKE_POST,
  UNLIKE_POST,
  SET_MORE_CATEGORY_POSTS,
  SET_MORE_SHRINE_POSTS,
  FOLLOW_SHRINE,
  UNFOLLOW_SHRINE,
  SET_MORE_SAVED_POSTS,
  SET_MORE_USER_POSTS,
  SAVE_POST,
  UNSAVE_POST,
  SET_SHRINE,
} from "../types/dataTypes";
import {
  CLEAR_CREATE_COMMENT_ERRORS,
  SET_CREATE_COMMENT_ERRORS,
  SET_LOADING_COMPONENT_POSTS,
  SET_LOADING_USER_SAVED_POSTS,
  SET_REPLY_FORM_ERRORS,
  SET_REPLY_STATUS,
  STOP_LOADING_COMPONENT_POSTS,
  STOP_LOADING_USER_SAVED_POSTS,
} from "../types/uiTypes";
import {
  ADD_USER_LIKES,
  ADD_USER_SAVED_POST,
  REMOVE_USER_LIKE,
  REMOVE_USER_SAVED_POST,
  SET_MORE_AUTH_SHRINES_FOR_INFINITE_SCROLL,
} from "../types/userTypes";

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

// get
export const getShrinePosts = (shrineName, parameter) => (dispatch) => {
  // set loading state
  dispatch({ type: SET_LOADING_COMPONENT_POSTS });

  // run action
  axios
    .get(`/api/posts/getShrinePosts/${shrineName}/${parameter}`)
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });

      // stop loading state
      dispatch({ type: STOP_LOADING_COMPONENT_POSTS });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

// get category page posts
export const getCategoryPosts = (categoryName, parameter) => (dispatch) => {
  //   set loading state
  dispatch({ type: SET_LOADING_COMPONENT_POSTS });

  // run action
  axios
    .get(`/api/posts/getCategoryPosts/${categoryName}/${parameter}`)
    .then((res) => {
      dispatch({ type: SET_POSTS, payload: res.data });

      // stop loading state
      dispatch({ type: STOP_LOADING_COMPONENT_POSTS });
    })
    .catch((err) => {
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

// get user posts for user profile page
export const getUserPosts = (username, parameter) => (dispatch) => {
  // set loading state
  dispatch({ type: SET_LOADING_COMPONENT_POSTS });

  axios
    .get(`/api/user/data/userposts/${username}/${parameter}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });

      // stop loading state
      dispatch({ type: STOP_LOADING_COMPONENT_POSTS });
    })
    .catch((err) => {
      console.error(err);
      dispatch({ type: SET_POSTS, payload: [] });
    });
};

// get user saved posts for user profile page
export const getSavedPosts = (username) => (dispatch) => {
  // set loading saved posts
  dispatch({ type: SET_LOADING_USER_SAVED_POSTS });

  // run action
  axios
    .get(`/api/user/data/savedposts/${username}`)
    .then((res) => {
      dispatch({ type: SET_SAVED_POSTS, payload: res.data });

      // stop loading state
      dispatch({ type: STOP_LOADING_USER_SAVED_POSTS });
    })
    .catch((err) => {
      console.error(err.response.data);
      dispatch({ type: SET_SAVED_POSTS, payload: [] });
    });
};

// get next user posts
export const getNextUserPosts =
  (clickedButton, parameter, username) => (dispatch) => {
    //  set loading state
    dispatch({ type: FETCHING_MORE_POSTS });

    // perform get more user posts action
    axios
      .get(
        `/api/user/data/nextUserPosts/${clickedButton}/${parameter}/${username}`
      )
      .then((res) => {
        // run dispatch action on user posts
        dispatch({ type: SET_MORE_USER_POSTS, payload: res.data });
      })
      .catch((err) => {
        console.error(err.response.data);
        dispatch({ type: SET_MORE_USER_POSTS, payload: [] });
      });
  };

// get next saved user posts for infiite scroll component
export const getNextUserSavedPosts = (postsFetchNo) => (dispatch) => {
  //  set loading state
  dispatch({ type: FETCHING_MORE_POSTS });

  // perform get more user saved posts action
  axios
    .get(`/api/user/data/nextSavedPosts/${postsFetchNo}`)
    .then((res) => {
      // run dispatch action on saved posts
      dispatch({ type: SET_MORE_SAVED_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({ type: SET_MORE_SAVED_POSTS, payload: [] });
    });
};

// get next shrine posts for infinite scroll component
export const getNextShrinePosts =
  (clickedButton, parameter, shrineName) => (dispatch) => {
    //  set loading state
    dispatch({ type: FETCHING_MORE_POSTS });

    //  perform get more posts action
    axios
      .get(
        `/api/posts/nextShrinePosts/${clickedButton}/${parameter}/${shrineName}`
      )
      .then((res) => {
        // dispatch to redux state
        dispatch({ type: SET_MORE_SHRINE_POSTS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: SET_MORE_SHRINE_POSTS, payload: [] });
      });
  };

//  get next category posts for infinite scroll component
export const getNextCategoryPosts =
  (clickedButton, parameter, categoryName) => (dispatch) => {
    //  set loading state
    dispatch({ type: FETCHING_MORE_POSTS });

    //  perfoem get more posts action
    axios
      .get(
        `/api/posts/nextCategoryPosts/${clickedButton}/${parameter}/${categoryName}`
      )
      .then((res) => {
        // dispatch to redux state
        dispatch({ type: SET_MORE_CATEGORY_POSTS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: SET_MORE_CATEGORY_POSTS, payload: [] });
      });
  };

//   comment on a post
export const commentOnPost = (postId, body) => (dispatch) => {
  console.log(body);
  axios
    .post(`/api/comment/commentOnPost/${postId}`, body)
    .then((res) => {
      // log analytics on commented post
      analytics().logEvent("comment_on_post", { postId: postId });

      //   clear errors
      dispatch({ type: CLEAR_CREATE_COMMENT_ERRORS });

      // set returned comment on post
      dispatch({ type: SET_POST_COMMENT, payload: res.data });
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

      dispatch({
        type: SET_CREATE_COMMENT_ERRORS,
        payload: errorMessage,
      });
    });
};

// reply to a comment
export const replyToComment = (commentId, commentData) => (dispatch) => {
  // reply to a comment
  axios
    .post(`/api/comment/reply/${commentId}`, commentData)
    .then((res) => {
      // set reply state
      dispatch({ type: SET_REPLY_STATUS });

      //   set comment reply
      dispatch({ type: SET_COMMENT_REPLY, payload: res.data });

      // log analytics data on replied comment
      analytics().logEvent("reply_to_comment", { commentId: commentId });
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

// like a post
export const likePost = (postId) => (dispatch) => {
  // run action through api
  axios
    .get(`/api/posts/likePost/${postId}`)
    .then((res) => {
      // log analytics for post like
      analytics().logEvent("post_liked", { postId: postId });

      dispatch({ type: LIKE_POST, payload: res.data });

      //   update user likes state
      dispatch({ type: ADD_USER_LIKES, payload: postId });
    })
    .catch((err) => console.log(err));
};

// unlike a post
export const unlikePost = (postId) => (dispatch) => {
  // run action through api
  axios
    .get(`/api/posts/unlikePost/${postId}`)
    .then((res) => {
      // log analytics on post disliked
      analytics().logEvent("post_unliked", { postId: postId });

      dispatch({ type: UNLIKE_POST, payload: res.data });

      //   update user likes state
      dispatch({ type: REMOVE_USER_LIKE, payload: postId });
    })
    .catch((err) => console.log(err));
};

// save a post to user page
export const savePost = (postId) => (dispatch) => {
  //run post save action
  axios
    .get(`/api/posts/savePost/${postId}`)
    .then((res) => {
      // log event on post saved
      analytics().logEvent("post_saved", { postId: postId });

      // run dispatch action
      dispatch({ type: SAVE_POST, payload: res.data });

      // run update of user saved posts register
      let username = res.data.username;
      let userSavedPost = { username: username, postId: postId };

      console.log(userSavedPost);
      // update user saved post
      dispatch({ type: ADD_USER_SAVED_POST, payload: userSavedPost });
    })
    .catch((err) => console.error(err.message));
};

// unsave a post on user profile page
export const unsavePost = (postId) => (dispatch) => {
  axios
    .get(`/api/posts/unsavePost/${postId}`)
    .then((res) => {
      // log analytics event on saved post
      analytics().logEvent("post_unsaved", { postId: postId });

      // run dispatch action
      dispatch({ type: UNSAVE_POST, payload: res.data });

      // run update of user saved posts register
      let username = res.data.username;
      let userSavedPost = { username: username, postId: postId };
      // update user saved post
      dispatch({ type: REMOVE_USER_SAVED_POST, payload: userSavedPost });
    })
    .catch((err) => console.error(err.response.data));
};

// unsave a post on user page

// follow a shrine
export const followShrine = (shrineId) => (dispatch) => {
  // run shrine follow action
  axios
    .get(`/api/shrine/follow/${shrineId}`)
    .then((res) => {
      // log analytics event
      analytics().logEvent("shrine_followed", { shrineId: shrineId });

      dispatch({
        type: FOLLOW_SHRINE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response.data));
};

// unfollow a shrine
export const unfollowShrine = (shrineId) => (dispatch) => {
  // run shrine unfollow action
  axios
    .get(`/api/shrine/unfollow/${shrineId}`)
    .then((res) => {
      // log analytics event for unfollowing a shrine
      analytics().logEvent("shrine_unfollowed", { shrineId: shrineId });

      dispatch({ type: UNFOLLOW_SHRINE, payload: res.data });
    })
    .catch((err) => console.log(err.response.data));
};

// get a single shrine
export const getShrine = (shrineName) => (dispatch) => {
  axios
    .get(`/api/shrine/getShrine/${shrineName}`)
    .then((res) => {
      dispatch({ type: SET_SHRINE, payload: res.data });
      // dispatch({ type: STOP_LOADING_SHRINE });
    })
    .catch((err) => {
      // dispatch({ type: STOP_LOADING_SHRINE });
      console.log(err);
    });
};
