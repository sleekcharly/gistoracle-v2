import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { initializeStore } from "../redux/store";
import { db } from "../firebase";
import {
  DARK_MODE_OFF,
  DARK_MODE_ON,
  SET_FEATURED_NAV_CATEGORIES,
} from "../redux/types/uiTypes";
import * as cookie from "cookie";
import { userAuthRefresh } from "../utils/userFunction";
import HomeComponent from "../components/Home";
import { useSnackbar } from "notistack";
import { shallowEqual, useSelector } from "react-redux";
import PageMeta from "../utils/pageMeta";
import AppSidebar from "../components/layout/AppSidebar";
import Head from "next/head";

export default function Home({
  metaImage,
  metaTitle,
  metaDescription,
  metaUrl,
}) {
  const page = "home";
  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh(page);

  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  // get server-side rendered featured categories from redux state
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        UIStatus: state.UI.resetPasswordStatus,
      }),
      shallowEqual
    );
  };

  // destructure errors from state
  const { UIStatus } = useStateParameters();

  // run status
  if (UIStatus) {
    enqueueSnackbar(UIStatus, {
      variant: "success",
      preventDuplicate: true,
    });
  }

  return (
    <>
      <Head>
        {/* facebook meta */}
        <meta property="og:type" content="website" key="homeType" />
        <meta property="og:title" content={metaTitle} key="homeTitle" />
        <meta property="og:image" content={metaImage} key="homeImage" />
        <meta property="og:hashtag" content="#Gistoracle" key="homeHashtag" />
        <meta property="og:url" content={metaUrl} key="homeogUrl" />
        <meta property="og:site_name" content="Gistoracle" key="ogSitename" />
        <meta
          property="og:description"
          content={metaDescription}
          key="homeOgDescription"
        />
        {/*Twitter meta*/}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:title" content={metaTitle} key="homeTwTitle" />
        <meta
          name="twitter:description"
          content={metaDescription}
          key="homeTwDescription"
        />
        <meta name="twitter:url" content={metaUrl} key="homeTwUrl" />
        <meta name="twitter:image" content={metaImage} key="homeTwImage" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="type" content="website" />
        <meta property="url" content={metaUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noodp" />
        <meta property="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta property="image" content={metaImage} />

        <title>Gistoracle - Africa's online community</title>
      </Head>

      <Layout drawerPage="home">
        <div className="w-full mt-2 lg:w-[97%] mr-auto ml-auto flex space-x-4">
          <main className="w-full flex-grow-1">
            <HomeComponent />
          </main>

          <aside
            id="sidebar"
            className={`hidden h-screen sticky top-[-1200px] xl:top-[-1500px] lg:block w-[45%] xl:w-[30%] `}
          >
            <AppSidebar page={page} />
          </aside>
        </div>
      </Layout>
    </>
  );
}

// get server side props with SSR
export async function getServerSideProps(context) {
  // Get the authenticated user
  //   const session = await getSession(context);

  // get cookies from browser
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookies && cookie.parse(cookies);

  // define meta infomation
  const metaImage =
    "https://firebasestorage.googleapis.com/v0/b/gistoracle-28360.appspot.com/o/Gist%20oracle%20tranparent%20background.png?alt=media";
  const metaTitle = "Gistoracle - Africa's online community";
  const metaUrl = "https://www.gistoracle.com";
  const metaDescription =
    "Gistoracle is home to a wide range of communities offering juicy news, discussions, gossips, articles and many more.";

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

  // feed featured navigation categories to redux state
  await dispatch({
    type: SET_FEATURED_NAV_CATEGORIES,
    payload: categories,
  });

  // feed cookies to redux initial redux state
  //   await dispatch({
  //     type: parsedCookies
  //       ? parsedCookies.darkMode === "ON"
  //         ? DARK_MODE_ON
  //         : DARK_MODE_OFF
  //       : DARK_MODE_OFF,
  //   });

  return {
    props: {
      //session,
      initialReduxState: reduxStore.getState(),
      metaTitle: metaTitle,
      metaUrl: metaUrl,
      metaDescription: metaDescription,
      metaImage: metaImage,
    },
  };
}
