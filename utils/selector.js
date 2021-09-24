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

// selectors for shrine posts
const shrinePostsCount = (state) => state.data.shrine.posts;
const shrinePostsSelector = (state) => state.data.posts;

// selectors for user posts
const userPostsCount = (state) =>
  state.user.userPageProfile.credentials.postCount;
const userPostsSelector = (state) => state.data.posts;

// selectors for saved user posts
const savedPostsCount = (state) => state.user.savedPosts;
const savedPostsSelector = (state) => state.data.savedPosts;

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

// export function for shrine page infinite scroll functionality
export const hasMoreShrinePostsSelector = createSelector(
  shrinePostsCount,
  shrinePostsSelector,
  (postsCounter, posts) => postsCounter > posts.length
);

// export function for authenticated user home page infinite scroll functionality
export const hasMoreAuthPostsSelector = createSelector(
  userShrines,
  infiniteScrollShrines,
  (subscribedShrines, infiniteScrollShrines) =>
    subscribedShrines.length > infiniteScrollShrines.length
);

// export function for saved posts infinite scroll functionality
export const hasMoreSavedPostsSelector = createSelector(
  savedPostsCount,
  savedPostsSelector,
  (postCounts, posts) => postCounts.length > posts.length
);

// export function for user page infinite scroll functionality
export const hasMoreUserPostsSelector = createSelector(
  userPostsCount,
  userPostsSelector,
  (postCounts, posts) => postCounts > posts.length
);
