import { createSelector } from "reselect";

// selectors for posts
const totalPostsCount = (state) => state.data.totalPosts;
const postsSelector = (state) => state.data.posts;

// selectors for authenticated user home posts
const infiniteScrollShrines = (state) =>
  state.user.authShrinesForInfiniteScroll;
const userShrines = (state) => state.user.subscribedShrines;

//  selectors for category posts
const categoryPostsCount = (state) => state.data.category.posts;
const categoryPostsSelector = (state) => state.data.posts;

// export function for home page infinite scroll funnctionality
export const hasMorePostsSelector = createSelector(
  totalPostsCount,
  postsSelector,
  (postsCount, posts) => postsCount > posts.length
);

// export function for category page infinite scroll functionality
export const hasMoreCategoryPostsSelector = createSelector(
  categoryPostsCount,
  categoryPostsSelector,
  (postCounts, posts) => postCounts > posts.length
);

// export function for authenticated user home page infinite scroll functionality
export const hasMoreAuthPostsSelector = createSelector(
  userShrines,
  infiniteScrollShrines,
  (subscribedShrines, infiniteScrollShrines) =>
    subscribedShrines.length > infiniteScrollShrines.length
);
