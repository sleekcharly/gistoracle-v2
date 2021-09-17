import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getCategoryPosts } from "../../redux/actions/dataActions";
import Posts from "../post/Posts";
import {
  FireIcon,
  NewspaperIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
import { hasMoreCategoryPostsSelector } from "../../utils/selector";
import Loader from "../../utils/loader";
import InfiniteScroll from "react-infinite-scroll-component";

function CategoryComponent({ category }) {
  // define componen't state
  const [buttonClicked, setButtonClicked] = useState("new");

  // define dispatch hook
  const dispatch = useDispatch();

  //   get component posts
  useEffect(() => {
    let mounted = true;

    if (mounted) dispatch(getCategoryPosts(category.name, "new"));

    return () => (mounted = false);
  }, []);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        posts: state.data.posts,
        loadingComponentPosts: state.UI.loadingComponentPosts,
        fetchingPosts: state.data.fetchingPosts,
        hasMoreCategoryPosts: hasMoreCategoryPostsSelector(state),
      }),
      shallowEqual
    );
  };

  // destructure darkMode
  const { posts, loadingComponentPosts, fetchingPosts, hasMoreCategoryPosts } =
    useStateParameters();

  // function for getting the latest category posts
  const newButtonClick = () => {
    // get category name form url parameters
    const categoryName = category.name;

    // get category posts based on latest posts
    dispatch(getCategoryPosts(categoryName, "new"));

    // set buttonClicked state
    setButtonClicked("new");
  };

  // function for getting most liked category posts
  const topButtonClick = () => {
    // get category name from url parameters
    const categoryName = category.name;

    // get category posts based on most liked osts
    dispatch(getCategoryPosts(categoryName, "top"));

    // set buttonClicked state
    setButtonClicked("top");
  };

  // function for getting most commented on category posts
  const spicyButtonClick = () => {
    // get category name from url parameters
    const categoryName = category.name;

    // get  category most commented on posts
    dispatch(getCategoryPosts(categoryName, "spicy"));

    // set buttonClicked state
    setButtonClicked("spicy");
  };

  //   load more category posts for infinitScroll
  const fetchPosts = () => {
    // define category name
    const categoryName = category.name;

    //  get the last item from posts
    let lastItem = posts[posts.length - 1];

    if (!fetchingPosts && buttonClicked === "new") {
      dispatch(getNextCategoryPosts("new", lastItem?.createdAt, categoryName));
    } else if (!fetchingPosts && buttonClicked === "top") {
      dispatch(getNextCategoryPosts("top", lastItem?.postId, categoryName));
    } else if (!fetchingPosts && buttonClicked === "spicy") {
      dispatch(getNextCategoryPosts("spicy", lastItem?.postId, categoryName));
    }
  };

  //    markup for posts
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7];
  let postMarkup = !loadingComponentPosts
    ? posts && posts.map((post) => <Posts key={post.postid} post={post} />)
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
      <div className="bg-white rounded-sm">
        <div className="pt-2 pb-2 pl-2 pr-2 relative flex justify-center">
          <h3
            component="h1"
            className="font-semibold uppercase bg-white z-50 py-[10px] px-[30px] text-xl text-gray-800"
          >
            {category.name}
          </h3>
          <div className="absolute top-[50%] h-[1px] w-[98%] bg-[#ddd] content-none"></div>
        </div>
        {/* filter navigation buttons */}
        <div className="flex p-[5px] bg-white dark:bg-gray-800 mb-[2px] items-center justify-center md:justify-start mt-0 lg:mt-1 border-t border-gray-400 dark:border dark:border-gray-400 dark:border-opacity-20 rounded-xl lg:mb-1">
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
            <p className="text-[#e60000] dark:text-white font-semibold">
              Spicy
            </p>
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
      </div>

      {/* content */}
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPosts}
        hasMore={hasMoreCategoryPosts}
        loader={<Loader />}
        style={{ height: "100%", overflow: "visible" }}
      >
        <div>{postMarkup}</div>
      </InfiniteScroll>
    </div>
  );
}

export default CategoryComponent;
