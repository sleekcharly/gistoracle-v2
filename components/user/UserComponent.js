import React, { useEffect, useState } from "react";
import {
  FireIcon,
  NewspaperIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";
import { Skeleton } from "@material-ui/lab";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { getUserPosts } from "../../redux/actions/dataActions";

function UserComponent({ user }) {
  // set up component states
  const [buttonClicked, setButtonClicked] = useState("new");
  const [navButtonClicked, setNavButtonClicked] = useState("post");

  // get currentUser object from auth context
  const { currentUser } = useAuth();

  // define dispatch
  const dispatch = useDispatch();

  // get user posts once component mounts
  useEffect(() => {
    // start subscription
    let mounted = true;

    if (mounted) {
      dispatch(getUserPosts(user.username));
    }

    return () => (mounted = false);
  }, []);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        credentials: state.user.credentials,
        loadingComponentPosts: state.UI.loadingComponentPosts,
      }),
      shallowEqual
    );
  };

  // destructure redux parameters
  const { credentials, loadingComponentPosts } = useStateParameters();

  // functions for handling clicked navigation buttons
  const postButtonClicked = () => {
    setNavButtonClicked("post");
    setButtonClicked("new");

    //get user authored posts
    dispatch(getUserPosts(user.username));
  };

  const savedButtonClicked = () => {
    setNavButtonClicked("saved");
    setButtonClicked(null);
  };

  // function for getting the latest s posts
  const newButtonClick = () => {
    // set buttonClicked state
    setButtonClicked("new");
  };

  // function for getting most liked shrine posts
  const topButtonClick = () => {
    // set buttonClicked state
    setButtonClicked("top");
  };

  // function for getting most commented on shrine posts
  const spicyButtonClick = () => {
    // set buttonClicked state
    setButtonClicked("spicy");
  };

  return (
    <div>
      <div className="border-b-2 border-[#800000] border-opacity-80 p-2 bg-white rounded-sm flex space-x-6 h-[40px] items-center ">
        <p
          component="button"
          onClick={postButtonClicked}
          className={`cursor-pointer text-[#5c240e] rounded-lg hover:bg-[#a88e8d] hover:p-1 hover:text-white font-medium transition-all ${
            navButtonClicked === "post" &&
            "border-b-2 border-[#800000] border-opacity-60 p-[2px]"
          }`}
        >
          {credentials.username === user.username
            ? "CREATED POSTS"
            : `POSTS by @${user.username}`}
        </p>

        {currentUser && user.username === credentials.username ? (
          <p
            component="button"
            onClick={savedButtonClicked}
            className={`cursor-pointer text-[#5c240e] rounded-lg hover:bg-[#a88e8d] hover:p-1 hover:text-white font-medium transition-all ${
              navButtonClicked === "saved" &&
              "border-b-2 border-[#800000] border-opacity-60 p-[2px]"
            }`}
          >
            SAVED POSTS
          </p>
        ) : null}
      </div>

      {/* filter navigation buttons */}
      {navButtonClicked === "saved" ? null : (
        <div className="flex p-[5px] bg-white dark:bg-gray-800 mb-[2px] items-center justify-center md:justify-start mt-0 lg:mt-1 border-b-2 border-[#800000] border-opacity-80 drop-shadow-md dark:border dark:border-gray-400 dark:border-opacity-20 rounded-md lg:mb-1">
          {!loadingComponentPosts ? (
            <span
              className={`ml-2 mr-5 ${
                buttonClicked === "new" &&
                "bg-[#5c240e] dark:bg-gray-600 bg-opacity-40"
              } cursor-pointer flex border-1 hover:bg-[#5c240e] dark:hover:bg-gray-400 hover:bg-opacity-40 border-[#933a16] rounded-xl items-center w-[72px] justify-center space-x-1`}
              component="button"
              onClick={newButtonClick}
            >
              <NewspaperIcon className="h-4 text-[#800000] dark:text-white" />
              <p className="text-[#e60000] dark:text-white font-semibold">
                New
              </p>
            </span>
          ) : (
            <Skeleton
              variant="rect"
              animation="wave"
              width={90}
              height={20}
              className="ml-2"
            />
          )}

          {!loadingComponentPosts ? (
            <span
              className={`ml-2 mr-5 ${
                buttonClicked === "spicy" &&
                "bg-[#5c240e] dark:bg-gray-600 bg-opacity-40"
              } cursor-pointer flex border-1 hover:bg-[#5c240e] dark:hover:bg-gray-400 hover:bg-opacity-40 border-[#933a16] rounded-xl items-center w-[72px] justify-center space-x-1`}
              component="button"
              onClick={spicyButtonClick}
            >
              <FireIcon className="h-4 text-[#800000] dark:text-white" />
              <p className="text-[#e60000] dark:text-white font-semibold">
                Spicy
              </p>
            </span>
          ) : (
            <Skeleton
              variant="rect"
              animation="wave"
              width={90}
              height={20}
              className="ml-2"
            />
          )}

          {!loadingComponentPosts ? (
            <span
              className={`ml-2 mr-5 ${
                buttonClicked === "top" &&
                "bg-[#5c240e] dark:bg-gray-600 bg-opacity-40"
              } cursor-pointer flex border-1 hover:bg-[#5c240e] dark:hover:bg-gray-400 hover:bg-opacity-40 border-[#933a16] rounded-xl items-center w-[72px] justify-center space-x-1`}
              component="button"
              onClick={topButtonClick}
            >
              <TrendingUpIcon className="h-4 text-[#800000] dark:text-white" />
              <p className="text-[#e60000] dark:text-white font-semibold">
                Top
              </p>
            </span>
          ) : (
            <Skeleton
              variant="rect"
              animation="wave"
              width={90}
              height={20}
              className="ml-2"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default UserComponent;
