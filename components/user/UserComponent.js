import React, { useEffect, useState } from "react";
import {
  FireIcon,
  NewspaperIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";
import { Skeleton } from "@material-ui/lab";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import {
  getNextUserPosts,
  getSavedPosts,
  getUserPosts,
} from "../../redux/actions/dataActions";
import Posts from "../post/Posts";
import { Card, CardHeader } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  hasMoreSavedPostsSelector,
  hasMoreUserPostsSelector,
} from "../../utils/selector";
import Loader from "../../utils/loader";

function UserComponent({ user }) {
  // set up component states
  const [buttonClicked, setButtonClicked] = useState("new");
  const [navButtonClicked, setNavButtonClicked] = useState("post");
  const [savedPostsSection, setSavedPostsSection] = useState(false);
  const [userPostsSection, setUserPostsSection] = useState(true);
  const [postSlice, setPostSlice] = useState(10);

  // get currentUser object from auth context
  const { currentUser } = useAuth();

  // define dispatch
  const dispatch = useDispatch();

  // get user posts once component mounts
  useEffect(() => {
    // start subscription
    let mounted = true;

    if (mounted) {
      dispatch(getUserPosts(user.username, "new"));
    }

    return () => (mounted = false);
  }, []);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        credentials: state.user.credentials,
        loadingComponentPosts: state.UI.loadingComponentPosts,
        loadingSavedPosts: state.UI.loadingSavedPosts,
        posts: state.data.posts,
        savedPosts: state.data.savedPosts,
        fetchingPosts: state.data.fetchingPosts,
        hasMoreSavedPosts: hasMoreSavedPostsSelector(state),
        hasMoreUserPosts: hasMoreUserPostsSelector(state),
      }),
      shallowEqual
    );
  };

  // destructure redux parameters
  const {
    credentials,
    loadingComponentPosts,
    loadingSavedPosts,
    posts,
    savedPosts,
    fetchingPosts,
    hasMoreSavedPosts,
    hasMoreUserPosts,
  } = useStateParameters();

  // functions for handling clicked navigation buttons
  const postButtonClicked = () => {
    setNavButtonClicked("post");
    setButtonClicked("new");
    setUserPostsSection(true);
    setSavedPostsSection(false);

    //get user authored posts
    dispatch(getUserPosts(user.username, "new"));
  };

  const savedButtonClicked = () => {
    setNavButtonClicked("saved");
    setButtonClicked(null);
    setSavedPostsSection(true);
    setUserPostsSection(false);
    setPostSlice(10);

    //get user authored posts
    dispatch(getSavedPosts(user.username));
  };

  // function for getting the latest s posts
  const newButtonClick = () => {
    // get latest user posts
    dispatch(getUserPosts(user.username, "new"));

    // set buttonClicked state
    setButtonClicked("new");
  };

  // function for getting most liked shrine posts
  const topButtonClick = () => {
    // get latest user posts
    dispatch(getUserPosts(user.username, "top"));

    // set buttonClicked state
    setButtonClicked("top");
  };

  // function for getting most commented on shrine posts
  const spicyButtonClick = () => {
    // get latest user posts
    dispatch(getUserPosts(user.username, "spicy"));

    // set buttonClicked state
    setButtonClicked("spicy");
  };

  // load more user posts function for infinite scroll
  const fetchPosts = () => {
    // get the last item from posts
    let lastItem = posts[posts.length - 1];

    // get next posts
    if (!fetchingPosts && buttonClicked === "new") {
      dispatch(getNextUserPosts("new", lastItem?.createdAt, user.username));
    } else if (!fetchingPosts && buttonClicked === "top") {
      dispatch(getNextUserPosts("top", lastItem?.postId, user.username));
    } else if (!fetchingPosts && buttonClicked === "spicy") {
      dispatch(getNextUserPosts("spicy", lastItem?.postId, user.username));
    }
  };

  // load more saved user posts for infinite scroll
  const fetchSavedPosts = () => {
    // set fetch slice number
    const postsFetchNo = 10 + postSlice;

    // get next posts
    if (!fetchingPosts && navButtonClicked === "saved") {
      dispatch(getNextUserSavedPosts(postsFetchNo));
    }

    // set new post slice
    setPostSlice(postsFetchNo);
  };

  // set up mark up for posts
  // skeleton array
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  let postsMarkup = !loadingComponentPosts
    ? posts.map((post, index) => <Posts key={post.postId} post={post} />)
    : numbers.map((number, i) => (
        <Card key={i}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="rect"
                width={100}
                height={70}
              />
            }
            title={
              <Skeleton
                animation="wave"
                height={15}
                width="30%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={20} width="95%" />}
          />
        </Card>
      ));

  let savedPostsMarkup = !loadingSavedPosts
    ? savedPosts.map((post, index) => <Posts key={post.postId} post={post} />)
    : numbers.map((number, i) => (
        <Card key={i}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="rect"
                width={100}
                height={70}
              />
            }
            title={
              <Skeleton
                animation="wave"
                height={15}
                width="30%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={20} width="95%" />}
          />
        </Card>
      ));

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

      {/* render infinite scroll for posts */}
      {savedPostsSection ? (
        !loadingSavedPosts && savedPosts && savedPosts.length < 1 ? (
          <div className="w-full h-[90vh] bg-[#f7eceb]">
            <div className="text-center ml-auto mr-auto pt-11 mt-2">
              <p className="text-gray-800 text-xl md:text-2xl lg:text-3xl">
                😲You have no saved posts !
              </p>
            </div>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={savedPosts.length}
            next={fetchSavedPosts}
            hasMore={hasMoreSavedPosts}
            loader={<Loader />}
            style={{ height: "100%", overflow: "visible" }}
          >
            <div>{savedPostsMarkup}</div>
          </InfiniteScroll>
        )
      ) : !loadingComponentPosts && posts && posts.length < 1 ? (
        <div className="w-full h-[90vh] bg-[#f7eceb]">
          <div className="text-center ml-auto mr-auto pt-11 mt-2">
            <p className="text-gray-800 text-xl md:text-2xl lg:text-3xl">
              {credentials.username !== user.username
                ? `😲 No posts by @${user.username}`
                : "😲OMG!!!! ..... Seems no posts live here yet"}
            </p>
            <div className="cursor-pointer">
              <p className="text-gray-800">create post</p>
            </div>
          </div>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMoreUserPosts}
          loader={<Loader />}
          style={{ height: "100%", overflow: "visible" }}
        >
          <div>{postsMarkup}</div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default UserComponent;
