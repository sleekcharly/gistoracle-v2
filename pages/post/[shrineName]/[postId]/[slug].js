import React from "react";
import AppSidebar from "../../../../components/layout/AppSidebar";
import Layout from "../../../../components/layout/Layout";
import PostComponent from "../../../../components/post/PostComponent";
import { db } from "../../../../firebase";
import { initializeStore } from "../../../../redux/store";
import {
  SET_POST,
  SET_POST_COMMENTS,
  SET_SHRINE,
} from "../../../../redux/types/dataTypes";
import { SET_FEATURED_NAV_CATEGORIES } from "../../../../redux/types/uiTypes";
import PageMeta from "../../../../utils/pageMeta";
import { userAuthRefresh } from "../../../../utils/userFunction";
import Head from "next/head";

function Post({ postData, postId, urlPath }) {
  // destructure post items
  const { title, postThumbnail, username } = postData;

  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  return (
    <>
      <Head>
        <title>{title}</title>

        {/* facebook meta */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={postThumbnail} />
        <meta
          property="og:url"
          content={`https://www.gistoracle.com${urlPath}`}
        />
        <meta property="og:description" content={`Created by ${username}`} />
        {/*Twitter meta*/}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={`Created by ${username}`} />
        <meta
          name="twitter:url"
          content={`https://www.gistoracle.com${urlPath}`}
        />
        <meta name="twitter:image" content={postThumbnail} />

        <meta property="url" content={`https://www.gistoracle.com${urlPath}`} />
        <meta property="title" content={title} />
        <meta name="description" content={`Created by ${username}`} />
        <meta property="image" content={postThumbnail} />
      </Head>

      <Layout page="post" drawerPage="post">
        <div className="w-full mt-2 lg:w-[97%] mr-auto ml-auto flex space-x-4">
          <main className="w-full flex-grow-1">
            {/* post page component */}
            <PostComponent postId={postId} currentUrl={urlPath} />
          </main>

          <aside
            id="sidebar"
            className="hidden h-screen sticky top-[-800px] xl:top-[-870px] lg:block w-[45%] xl:w-[30%]"
          >
            <AppSidebar page="post" />
          </aside>
        </div>
      </Layout>
    </>
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

  //   get shrine
  let shrine = [];
  let shrineData = {};

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
  await db
    .doc(`/posts/${postId}`)
    .get()
    .then((doc) => {
      // check if post exists
      if (!doc.exists) {
        return { error: "Post not found!" };
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

  await db
    .collection("shrines")
    .where("name", "==", postData.shrineName)
    .limit(1)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        shrine.push({ shrineId: doc.id, ...doc.data() });
      });

      shrineData = shrine[0];
    })
    .catch((err) => console.error(err));

  // get post comments from firestore
  const comments = await db
    .collection("comments")
    .orderBy("createdAt", "desc")
    .where("postId", "==", postId)
    .get()
    .then((data) => {
      let comments = [];

      data.forEach((doc) => {
        comments.push({ commentId: doc.id, ...doc.data() });
      });

      return comments;
    })
    .catch((err) => {
      console.error(err);
      console.log(err.message);
    });

  // feed postdata to redux
  await dispatch({ type: SET_POST, payload: postData });

  // feed shrine data to redux state
  await dispatch({ type: SET_SHRINE, payload: shrineData });

  // feed featured navigation categories to redux state
  await dispatch({
    type: SET_FEATURED_NAV_CATEGORIES,
    payload: categories,
  });

  // feed post comments to redux state
  await dispatch({
    type: SET_POST_COMMENTS,
    payload: comments,
  });

  return {
    props: {
      //session,
      initialReduxState: reduxStore.getState(),
      postData: postData,
      postId: postId,
      shrine: shrineData,
      urlPath: urlPath,
    },
  };
}
