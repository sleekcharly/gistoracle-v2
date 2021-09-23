import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  CLEAR_LOGIN_ERRORS,
  CLEAR_SIGNUP_ERRORS,
} from "../../redux/types/uiTypes";
import { followShrine, unfollowShrine } from "../../redux/actions/dataActions";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../auth/login";
import Signup from "../auth/signup";

function ShrineFollowButton({ shrineId }) {
  // initialize butto states
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [followed, setFollowed] = useState(false);

  //   get current user
  const { currentUser, login, signup } = useAuth();

  // define dispatch
  const dispatch = useDispatch();

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        shrine: state.data.shrine,
        user: state.user,
      }),
      shallowEqual
    );
  };

  // destructure redux parameters
  const { shrine, user } = useStateParameters();

  // check if shrine isfollowed
  const shrineFollowed = () => {
    if (
      shrine &&
      shrine.followersData.find(
        (follow) => follow.userId === user.credentials.userId
      )
    ) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  };

  // check for followed status
  useEffect(() => {
    let mounted = true;

    if (mounted) shrineFollowed();

    return () => (mounted = false);
  }, [shrine.followersData, user.credentials.userId]);

  // signup message
  const signupHighlight =
    "Signup today to follow your favorite shrines and engage in worldwide conversation";

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

  // follow shrine function
  const follow = () => {
    dispatch(followShrine(shrineId));
    setFollowed(true);
  };

  // unfollow shrine function
  const unfollow = () => {
    dispatch(unfollowShrine(shrineId));
    setFollowed(false);
  };

  // markup for follow button
  const followButton = !currentUser ? (
    <>
      <button
        onClick={handleDialogOpen}
        className="bg-[#800000] text-white text-xs md:text-base py-1 px-3 rounded-md"
      >
        Follow
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
        highlight={signupHighlight}
      />
    </>
  ) : followed ? (
    <button
      onClick={unfollow}
      className="bg-[#800000] text-white text-xs md:text-base py-1 px-3 rounded-md"
    >
      Unfollow
    </button>
  ) : (
    <button
      onClick={follow}
      className="bg-[#800000] text-white text-xs md:text-base py-1 px-3 rounded-md"
    >
      Follow
    </button>
  );

  return followButton;
}

export default ShrineFollowButton;
