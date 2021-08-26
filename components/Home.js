import React, { useEffect, useState } from "react";
import {
  FireIcon,
  NewspaperIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
import { Card, CardHeader, useMediaQuery, useTheme } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useAuth } from "../contexts/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../utils/loader";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { analytics } from "../firebase";
import {
  getAllPosts,
  getNextAuthPosts,
  getNextPosts,
  getTailoredPosts,
  getTotalPostsCount,
} from "../redux/actions/dataActions";
import { RESET_AUTH_SHRINES_FOR_INFINITE_SCROLL } from "../redux/types/userTypes";
import {
  hasMoreAuthPostsSelector,
  hasMorePostsSelector,
} from "../utils/selector";
import Posts from "./post/Posts";

function HomeComponent() {
  // set material-ui theme
  const theme = useTheme();

  // define state parameters
  const [buttonClicked, setButtonClicked] = useState("new");
  const [shrineSlice, setShrineSlice] = useState(10);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        data: state.data,
        hasMorePosts: hasMorePostsSelector(state),
        hasMoreAuthPosts: hasMoreAuthPostsSelector(state),
      }),
      shallowEqual
    );
  };

  // destructure data
  const { data, hasMorePosts, hasMoreAuthPosts } = useStateParameters();

  // bring in authenticated user from auth context
  const { currentUser } = useAuth();

  // get dispatch hook
  const dispatch = useDispatch();

  // define media query variables for tablets and desktops
  // const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  // const miniTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const proTablets = useMediaQuery(theme.breakpoints.up("md"));
  // const dektops = useMediaQuery(theme.breakpoints.up("lg"));

  // return posts in component's state once mounted
  useEffect(() => {
    // log analytics event
    analytics().logEvent("home_page_view");

    // get posts
    if (!currentUser) {
      // if not authenticated
      dispatch(getAllPosts("new"));
      dispatch(getTotalPostsCount());
    } else {
      // if authenticated
      dispatch(getTailoredPosts("new"));
    }

    // scroll to top
    window.scrollTo(0, 0);
  }, []);

  // function for getting the latest user posts
  const newButtonClick = () => {
    // reset state shrineSlice parameter
    setShrineSlice(10);

    if (!currentUser) {
      // if not authenticated
      dispatch(getAllPosts("new"));
    } else {
      // if authenticated
      dispatch({ type: RESET_AUTH_SHRINES_FOR_INFINITE_SCROLL });
      dispatch(getTailoredPosts("new"));
    }

    // change state
    setButtonClicked("new");
  };

  // function for getting top user posts
  const topButtonClick = () => {
    // reset state shrineSlice parameter
    setShrineSlice(10);

    if (!currentUser) {
      // if not authenticated
      dispatch(getAllPosts("top"));
    } else {
      // if authenticated
      dispatch({ type: RESET_AUTH_SHRINES_FOR_INFINITE_SCROLL });
      dispatch(getTailoredPosts("top"));
    }

    // change state
    setButtonClicked("top");
  };

  // function for getting the most commented on posts
  const spicyButtonClick = () => {
    // reset state shrineSlice parameter
    setShrineSlice(10);

    if (!currentUser) {
      // if not authenticated
      dispatch(getAllPosts("spicy"));
    } else {
      // if authenticated
      dispatch({ type: RESET_AUTH_SHRINES_FOR_INFINITE_SCROLL });
      dispatch(getTailoredPosts("spicy"));
    }

    // change state
    setButtonClicked("spicy");
  };

  // go back to top function
  const handleBackToTopClick = () => {
    window.scrollTo(0, 0);
  };

  // load more data function for infinite scroll component
  const fetchPosts = () => {
    // extract post parameters from redux data
    const { fetchingPosts, posts } = data;

    // get the last item on the posts list
    let lastItem = posts[posts.length - 1];

    // define net fetching parameter
    const shrineFetchNo = 10 + shrineSlice;

    if (!currentUser) {
      if (!fetchingPosts && buttonClicked === "new") {
        dispatch(getNextPosts("new", lastItem?.createdAt));
      } else if (!fetchingPosts && bttonClicked === "top") {
        dispatch(getNextPosts("top", lastItem?.postId));
      } else if (!fetchingPosts && buttonClicked === "spicy") {
        dispatch(getNextPosts("spicy", lastItem?.postId));
      }
    } else {
      if (!fetchingPosts && buttonClicked === "new") {
        dispatch(getNextAuthPosts("new", shrineFetchNo));

        setShrineSlice(shrineFetchNo);
      } else if (!fetchingPosts && buttonClicked === "top") {
        dispatch(getNextAuthPosts("top", shrineFetchNo));
      } else if (!fetchingPosts && buttonClicked === "spicy") {
        dispatch(getNextAuthPosts("spicy", shrineFetchNo));
      }
    }
  };

  // define data parameters
  const { loadingPosts, posts } = data;

  // skeleton array
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7];

  // rendered posts
  let postRender = posts.map((post, index) => (
    <Posts key={index} post={post} />
  ));

  // set up for future implementation of inline ads
  let resultsRender = [];
  for (var i = 0; i < postRender.length; i++) {
    resultsRender.push(postRender[i]);
    // To be inplemented for sponsored posts
    // if (i % 5 === 4) {
    //   resultsRender.push(
    //     <div style={{ width: "100%", height: "150px" }}>
    //       <img
    //         src={adExample}
    //         style={{ objectFit: "cover", width: "100%", height: "auto" }}
    //       />
    //     </div>
    //   );
    // }
  }

  // markup for loading posts
  let postMarkup = !loadingPosts
    ? resultsRender
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
      {/* filter navigation buttons */}
      <div className="flex p-[5px] bg-white dark:bg-gray-800 mb-[2px] items-center justify-center md:justify-start mt-0 lg:mt-1 dark:border dark:border-gray-400 dark:border-opacity-20 rounded-xl lg:mb-1">
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

        <span
          className={`ml-2 mr-5 ${
            buttonClicked === "spicy" &&
            "bg-[#5c240e] dark:bg-gray-600 bg-opacity-40"
          } cursor-pointer flex border-1 hover:bg-[#5c240e] dark:hover:bg-gray-400 hover:bg-opacity-40 border-[#933a16] rounded-xl items-center w-[72px] justify-center space-x-1`}
          component="button"
          onClick={spicyButtonClick}
        >
          <FireIcon className="h-4 text-[#800000] dark:text-white" />
          <p className="text-[#e60000] dark:text-white font-semibold">Spicy</p>
        </span>

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
      </div>

      {!currentUser ? (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMorePosts}
          loader={<Loader />}
          style={{ height: "100%", overflow: "visible" }}
        >
          <div>{postMarkup}</div>
        </InfiniteScroll>
      ) : (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={hasMoreAuthPosts}
          loader={<Loader />}
          style={{ height: "100%", overflow: "visible" }}
        >
          <div>{postMarkup}</div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default HomeComponent;
