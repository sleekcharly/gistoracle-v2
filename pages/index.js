import React from "react";
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

export default function Home() {
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
    <Layout>
      <PageMeta />

      <div className="w-full mt-2 lg:w-[97%] mr-auto ml-auto flex space-x-4">
        <main className="w-full flex-grow-1">
          <HomeComponent />
        </main>

        <aside className="hidden w-[30%] min-w-max lg:block">
          <AppSidebar page="home" />
        </aside>
      </div>
    </Layout>
  );
}

// get server side props with SSR
export async function getServerSideProps(context) {
  // Get the authenticated user
  //   const session = await getSession(context);

  // get cookies from browser
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookies && cookie.parse(cookies);

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
    type: parsedCookies
      ? parsedCookies.darkMode === "ON"
        ? DARK_MODE_ON
        : DARK_MODE_OFF
      : DARK_MODE_OFF,
  });

  return {
    props: {
      //session,
      initialReduxState: reduxStore.getState(),
    },
  };
}
