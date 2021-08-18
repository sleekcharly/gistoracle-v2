import axios from "axios";
import { SET_SUBSCRIBED_SHRINES } from "../types/userTypes";

// function for getting user's data
export const getUserData = () => (dispatch) => {
  //dispatch Loading user type
  // dispatch({type: LOADING_USER});

  // get user from database.
  axios
    .get("/api/user/data/getData")
    .then((res) => {
      // set user data in redux state
      dispatch({ type: SET_USER, paylaod: res.data });

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
