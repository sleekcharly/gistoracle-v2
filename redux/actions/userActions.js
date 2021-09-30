import axios from "axios";
import {
  CLEAR_ERRORS,
  LOADING_USER,
  SET_ERRORS,
  SET_RESET_PASSWORD_ERRORS,
  SET_RESET_PASSWORD_STATUS,
  SET_STATUS,
  STOP_LOADING_USER,
} from "../types/uiTypes";
import { SET_SUBSCRIBED_SHRINES, SET_USER } from "../types/userTypes";

// function for getting user's data
export const getUserData = () => (dispatch) => {
  //dispatch Loading user type
  dispatch({ type: LOADING_USER });

  // get user from database.
  axios
    .get("/api/user/data/getData")
    .then((res) => {
      // set user data in redux state
      dispatch({ type: SET_USER, payload: res.data });

      // stop loading state
      dispatch({ type: STOP_LOADING_USER });

      // get shrines user is subscribed to
      dispatch(getUserSubscribedShrines());
    })
    .catch((err) => console.log(err));
};

// function to get user subscribed shrines
export const getUserSubscribedShrines = () => (dispatch) => {
  axios
    .get("/api/user/data/getUserSubscribedShries")
    .then((res) => {
      dispatch({ type: SET_SUBSCRIBED_SHRINES, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SET_SUBSCRIBED_SHRINES, payload: [] });
      console.error(err);
    });
};

// reset password user action
export const sendResetEmail = (userData) => (dispatch) => {
  axios
    .post("/api/user/settings/sendPasswordResetEmail", userData)
    .then((res) => {
      dispatch({ type: SET_RESET_PASSWORD_STATUS, payload: res.data.message });
    })
    .catch((err) => {
      console.error(err);
      try {
        dispatch({
          type: SET_RESET_PASSWORD_ERRORS,
          payload: err.response.data,
        });
      } catch (error) {
        console.log(error);
      }
    });
};
