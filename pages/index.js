import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import { initializeStore } from "../redux/store";
import { db } from "../firebase";
import {
  DARK_MODE_OFF,
  DARK_MODE_ON,
  SET_FEATURED_NAV_CATEGORIES,
} from "../redux/types/uiTypes";
import * as cookie from "cookie";

export default function Home() {
  return (
    <div className=" min-h-screen">
      <Head>
        <title>Gistoracle - Africa's online community</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
      <h1
        className="text-3xl text-black dark:text-pink-500"
        css={{ backgroundColor: "teal" }}
      >
        Welcome to Your App
      </h1>
    </div>
  );
}

// get server side props with SSR
export async function getServerSideProps(context) {
  // Get the authenticated user
  // const session = await getSession(context);

  // get cookies from browser
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookie.parse(cookies);

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
  await dispatch({
    type: parsedCookies.darkMode === "ON" ? DARK_MODE_ON : DARK_MODE_OFF,
  });

  return {
    props: {
      //session,
      initialReduxState: reduxStore.getState(),
    },
  };
}
