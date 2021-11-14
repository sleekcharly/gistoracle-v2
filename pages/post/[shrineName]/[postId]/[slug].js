import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
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
import { userAuthRefresh } from "../../../../utils/userFunction";
import { useRouter } from "next/router";

function Post({ postData, postId, urlPath }) {
  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  return (
    <>
      <NextSeo
        title={postData.title}
        description={`Created by ${postData.username}`}
        canonical={`https://www.gistoracle.com${urlPath}`}
        openGraph={{
          url: `https://www.gistoracle.com${urlPath}`,
          title: postData.title,
          description: `Created by ${postData.username}`,
          images: [{ url: postData.postThumbnail }],
          site_name: "Gistoracle",
          type: "website",
        }}
        facebook={{
          appId: "648521896142401",
        }}
        twitter={{
          site: "@gistoracle",
          cardType: "summary",
        }}
      />

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

  // perform sitemap operation
  await db
    .collection("postSiteData")
    .where("postId", "==", postData.postId)
    .limit(1)
    .get()
    .then(async (data) => {
      if (data.docs[0]) {
        console.log("site data exists");
      } else {
        await db
          .collection("postSiteData")
          .add({
            postId: postData.postId,
            shrineName: postData.shrineName,
            slug: postData.slug,
            updatedAt: new Date().toISOString(),
            userId: postData.userId,
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    })
    .catch((err) => console.error(err));

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
