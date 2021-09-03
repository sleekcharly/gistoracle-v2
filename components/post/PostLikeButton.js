import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import {
  CLEAR_LOGIN_ERRORS,
  CLEAR_SIGNUP_ERRORS,
} from "../../redux/types/uiTypes";
import Login from "../auth/login";
import Signup from "../auth/signup";
import MyButton from "../MyButton";

function PostLikeButton(props) {
  // initialize button state
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // signup highlight
  const signupHighlight = "Sign up today and join the worldwide conversation";

  // define dispatch
  const dispatch = useDispatch();

  // bring in auth context parameters
  const { currentUser, login, signup } = useAuth();

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        likes: state.user.likes,
      }),
      shallowEqual
    );
  };

  // destructure data
  const { likes } = useStateParameters();

  // open authentication diaog
  const handleDialogOpen = () => {
    setOpen(true);
  };

  // open login dialog
  const handleLoginClickOpen = () => {
    dispatch({ type: CLEAR_LOGIN_ERRORS });
    setLoginOpen(true);
    setOpen(false);
  };

  // open signup dialog
  const handleSignupClickOpen = () => {
    dispatch({ type: CLEAR_SIGNUP_ERRORS });
    setOpen(true);
    setLoginOpen(false);
  };

  // close signup dialog
  const handleSignupClose = () => {
    setOpen(false);
  };

  // close login dialog
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  // check if a post is liked
  const likedPost = () => {
    if (likes && likes.find((like) => like.postId === props.postId)) {
      return true;
    } else {
      return false;
    }
  };

  // like post action
  //   const like = () => {
  //       dispatch(likePost(props.postId));
  //   }

  // unlike post action
  //   const unlike = () => {
  //       dispatch(unlikePost(props.postId));
  //   }

  // establish like and unlike button based on authenticated user
  const likeButton = !currentUser ? (
    <>
      <MyButton tip="Like post" onClick={handleDialogOpen}>
        <FavoriteBorder color="primary" fontSize="small" />
      </MyButton>

      <Login
        openLogin={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClickOpen={handleSignupClickOpen}
        login={login}
      />

      <Signup
        openSignup={open}
        handleSignupClose={handleSignupClose}
        handleLoginClickOpen={handleLoginClickOpen}
        signup={signup}
        highlight={signupHighlight}
      />
    </>
  ) : likedPost() ? (
    <MyButton tip="Unlike post">
      <FavoriteIcon color="primary" fontSize="small" />
    </MyButton>
  ) : (
    <MyButton tip="Like post">
      <FavoriteBorder color="primary" fontSize="small" />
    </MyButton>
  );

  return likeButton;
}

export default PostLikeButton;
