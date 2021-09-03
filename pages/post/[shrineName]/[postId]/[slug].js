import React from "react";
import Layout from "../../../../components/layout/Layout";
import PostComponent from "../../../../components/post/PostComponent";
import { db } from "../../../../firebase";
import { initializeStore } from "../../../../redux/store";
import { SET_FEATURED_NAV_CATEGORIES } from "../../../../redux/types/uiTypes";
import PageMeta from "../../../../utils/pageMeta";
import { userAuthRefresh } from "../../../../utils/userFunction";

function Post({ post, postId, urlPath }) {
  // destructure post items
  const { title, postThumbnail } = post;

  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  return (
    <Layout page="post">
      <PageMeta
        pageTitle={title}
        thumbnail={postThumbnail}
        urlPath={urlPath}
        contentType="article"
      />
      <PostComponent post={post} postId={postId} currentUrl={urlPath} />
    </Layout>
  );
}

export default Post;

// get server side props with SSR
export async function getServerSideProps(context) {
  // Get the authenticated user
  // get postId from context
  const postId = context.params.postId;

  // get page url
  const urlPath = context.resolvedUrl;

  // define postData object
  let postData = {};

  // preload the featured nav categories  from firestore and redux store
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  // get featured Nav Categories
  const categories = await db
    .collection("category")
    .limit(6)
    .orderBy("nav")
    .get()
    .then((data) => {
      let featuredNavCategories = [];
      data.forEach((doc) => {
        featuredNavCategories.push({
          featuredNavCategoryId: doc.id,
          ...doc.data(),
        });
      });

      return featuredNavCategories;
    })
    .catch((err) => console.error(err));

  //get post from firestore
  const post = await db
    .doc(`/posts/${postId}`)
    .get()
    .then((doc) => {
      // check if post exists
      if (!doc.exists) {
        return res.status(404).json({ error: "Post not found!" });
      }
      postData = doc.data();
      postData.postId = doc.id;

      return postData;
    })
    .catch((err) => {
      // log errors on console
      console.error("get post error: " + err);
      return;
    });

  // feed featured navigation categories to redux state
  await dispatch({
    type: SET_FEATURED_NAV_CATEGORIES,
    payload: categories,
  });

  return {
    props: {
      //session,
      initialReduxState: reduxStore.getState(),
      post: postData,
      postId: postId,
      urlPath: urlPath,
    },
  };
}
