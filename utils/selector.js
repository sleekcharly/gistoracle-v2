import { createSelector } from "reselect";

// selectors for posts
const totalPostsCount = (state) => state.data.totalPosts;
const postsSelector = (state) => state.data.posts;

// selectors for authenticated user home posts
const infiniteScrollShrines = (state) =>
  state.user.authShrinesForInfiniteScroll;
const userShrines = (state) => state.user.subscribedShrines;

// export function for home page infinite scroll funnctionality
export const hasMorePostsSelector = createSelector(
  totalPostsCount,
  postsSelector,
  (postsCount, posts) => postsCount > posts.length
);

// export function for authenticated user home page infinite scroll functionality
export const hasMoreAuthPostsSelector = createSelector(
  userShrines,
  infiniteScrollShrines,
  (subscribedShrines, infiniteScrollShrines) =>
    subscribedShrines.length > infiniteScrollShrines.length
);
