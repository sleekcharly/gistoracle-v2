import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getNextShrinePosts,
  getShrinePosts,
} from "../../redux/actions/dataActions";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../utils/loader";
import { hasMoreShrinePostsSelector } from "../../utils/selector";
import {
  FireIcon,
  NewspaperIcon,
  TrendingUpIcon,
} from "@heroicons/react/outline";
import Posts from "../post/Posts";
import NextLink from "next/link";
import ShrineFollowButton from "./shrineFollowButton";
import CreateShrinePost from "../post/CreateShrinePost";

function ShrineComponent({ shrine }) {
  // define componen't state
  const [buttonClicked, setButtonClicked] = useState("new");

  // define shrine avatar
  const shrineAvatar = "/images/shrineAvatar.png";

  // define dispatch hook
  const dispatch = useDispatch();

  //   get component posts
  useEffect(() => {
    let mounted = true;

    if (mounted) dispatch(getShrinePosts(shrine.name, "new"));

    return () => (mounted = false);
  }, []);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        data: state.data,
        loadingComponentPosts: state.UI.loadingComponentPosts,
        hasMoreShrinePosts: hasMoreShrinePostsSelector(state),
      }),
      shallowEqual
    );
  };

  // destructure redux parameters
  const { data, loadingComponentPosts, hasMoreShrinePosts } =
    useStateParameters();

  // define data parameters
  const { fetchingPosts, posts } = data;

  // function for getting the latest shrine posts
  const newButtonClick = () => {
    // get shrine name form url parameters
    const shrineName = shrine.name;

    // get shrine posts based on latest posts
    dispatch(getShrinePosts(shrineName, "new"));

    // set buttonClicked state
    setButtonClicked("new");
  };

  // function for getting most liked shrine posts
  const topButtonClick = () => {
    // get shrine name from url parameters
    const shrineName = shrine.name;

    // get shrine posts based on most liked osts
    dispatch(getShrinePosts(shrineName, "top"));

    // set buttonClicked state
    setButtonClicked("top");
  };

  // function for getting most commented on shrine posts
  const spicyButtonClick = () => {
    // get shrine name from url parameters
    const shrineName = shrine.name;

    // get  shrine most commented on posts
    dispatch(getShrinePosts(shrineName, "spicy"));

    // set buttonClicked state
    setButtonClicked("spicy");
  };

  //   load more shrine posts for infinitScroll
  const fetchPosts = () => {
    // define shrine name
    const shrineName = shrine.name;

    //  get the last item from posts
    let lastItem = posts[posts.length - 1];

    if (!fetchingPosts && buttonClicked === "new") {
      dispatch(getNextShrinePosts("new", lastItem?.createdAt, shrineName));
    } else if (!fetchingPosts && buttonClicked === "top") {
      dispatch(getNextShrinePosts("top", lastItem?.postId, shrineName));
    } else if (!fetchingPosts && buttonClicked === "spicy") {
      dispatch(getNextShrinePosts("spicy", lastItem?.postId, shrineName));
    }
  };

  //    markup for posts
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  let postMarkup = !loadingComponentPosts
    ? posts && posts.map((post) => <Posts key={post.postId} post={post} />)
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
      {/* header */}

      <div className="p-2 md:p-5 relative flex items-center mb-1 md:mb-3 bg-white rounded-md">
        <div className="flex items-center flex-grow space-x-1 md:space-x-8">
          {!loadingComponentPosts ? (
            <img
              alt={shrine.name}
              src={shrine.avatar ? shrine.avatar : shrineAvatar}
              className="w-[64px] h-[64px] md:w-[80px] md:h-[80px] object-cover rounded-full"
            />
          ) : (
            <Skeleton
              variant="circle"
              animation="wave"
              width={90}
              height={90}
              style={{ marginRight: "10px" }}
            />
          )}

          <div>
            {!loadingComponentPosts ? (
              <p
                component="h1"
                className="text-lg md:text-2xl lg:text-3xl text-gray-800"
              >
                {shrine.name}
              </p>
            ) : (
              <Skeleton
                animation="wave"
                width={100}
                height={20}
                variant="rect"
              />
            )}

            {!loadingComponentPosts ? (
              <div className="flex items-center space-x-1 md:space-x-2">
                <p className="text-xs text-gray-700">Consecrated by: </p>
                <NextLink href={`/user/${shrine.creator}`} passHref>
                  <p className="text-sm font-semibold text-[#800000] cursor-pointer">
                    @{shrine.creator}
                  </p>
                </NextLink>
              </div>
            ) : (
              <Skeleton
                animation="wave"
                width={150}
                height={20}
                variant="rect"
              />
            )}
          </div>
        </div>

        {/* shrine follow button */}
        <div>
          {!loadingComponentPosts ? (
            <ShrineFollowButton shrineId={shrine.shrineId} />
          ) : (
            <Skeleton aimation="wave" width={75} height={25} />
          )}
        </div>
      </div>
      {/* filter navigation buttons */}
      <div className="flex p-[5px] bg-white dark:bg-gray-800 mb-[2px] items-center justify-center md:justify-start mt-0 lg:mt-1 border-t border-gray-400 dark:border dark:border-gray-400 dark:border-opacity-20 rounded-xl lg:mb-1">
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
            <p className="text-[#e60000] dark:text-white font-semibold">New</p>
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
            <p className="text-[#e60000] dark:text-white font-semibold">Top</p>
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

      {/* content */}
      {!loadingComponentPosts && posts && posts.length < 1 ? (
        <div className="w-full h-[90vh] bg-[#f7eceb]">
          <div className="text-center ml-auto mr-auto pt-32 mt-2">
            <p className="text-gray-800 text-lg md:text-xl lg:text-2xl">
              "😲OMG!!!! ..... Seems no posts live here yet"
            </p>
            <div className="cursor-pointer mt-3">
              <CreateShrinePost shrineName={shrine.name} />
            </div>
          </div>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMoreShrinePosts}
          loader={<Loader />}
          style={{ height: "100%", overflow: "visible" }}
        >
          <div>{postMarkup}</div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default ShrineComponent;
