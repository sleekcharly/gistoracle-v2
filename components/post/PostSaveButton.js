import React, { useState } from "react";
import { SaveIcon } from "@heroicons/react/outline";
import { SaveIcon as SaveIconSolid } from "@heroicons/react/solid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import {
  CLEAR_LOGIN_ERRORS,
  CLEAR_SIGNUP_ERRORS,
} from "../../redux/types/uiTypes";
import Login from "../auth/login";
import Signup from "../auth/signup";

function PostSaveButton({ postId }) {
  // initialize state
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  // set dispatch
  const dispatch = useDispatch();

  // bring in auth context parameters
  const { currentUser, login, signup } = useAuth();

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        savedPosts: state.user.savedPosts,
      }),
      shallowEqual
    );
  };

  // destructure data
  const { savedPosts } = useStateParameters();

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

  // check to see if a post is saved
  const savedPost = () => {
    if (savedPosts && savedPosts.find((post) => post.postId === postId)) {
      return true;
    } else {
      return false;
    }
  };

  // function for saving post
  // const save = () => {
  //     dispatch(savePost(postId))
  // };

  // function for unsaving post
  // const unsave = () => {
  //     dispatch(unsavePost(postId))
  // }

  // establish save button
  const saveButton = !currentUser ? (
    <>
      <button
        className="flex text-[#933a16] items-center space-x-1 p-1 hover:bg-red-50 rounded-lg hover:text-[#800000] hover:font-semibold"
        onClick={handleDialogOpen}
      >
        <SaveIcon className="h-4 text-[#800000]" />
        <p className="uppercase text-xs ">save</p>
      </button>

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
      />
    </>
  ) : savedPost() ? (
    <button className="flex text-[#933a16] items-center space-x-1 p-1 hover:bg-red-50 rounded-lg hover:text-[#800000] hover:font-semibold">
      <SaveIconSolid className="h-4 text-[#800000]" />
      <p className="uppercase text-xs ">save</p>
    </button>
  ) : (
    <button className="flex text-[#933a16] items-center space-x-1 p-1 hover:bg-red-50 rounded-lg hover:text-[#800000] hover:font-semibold">
      <SaveIcon className="h-4 text-[#800000]" />
      <p className="uppercase text-xs ">save</p>
    </button>
  );

  return saveButton;
}

export default PostSaveButton;
