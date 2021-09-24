import React from "react";
import Layout from "../../components/layout/Layout";
import UserComponent from "../../components/user/UserComponent";
import { analytics, db } from "../../firebase";
import { initializeStore } from "../../redux/store";
import { SET_FEATURED_NAV_CATEGORIES } from "../../redux/types/uiTypes";
import PageMeta from "../../utils/pageMeta";
import { userAuthRefresh } from "../../utils/userFunction";

function User({ urlPath, user }) {
  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  //   log analytics event
  analytics().logEvent(`${user.username}profile_page_view`);

  return (
    <Layout page="shrine">
      <PageMeta
        pageTitle={`${
          user.displayName ? user.displayName : user.username
        } | Gistoracle`}
        urlPath={urlPath}
        description={`${
          user.displayName ? user.displayName : user.username
        } Gistoracle profile page. View posts and shrines created by ${
          user.displayName ? user.displayName : user.username
        }`}
      />

      {/* page component */}
      <UserComponent user={user} />
    </Layout>
  );
}

export default User;

// get server side props with SSR
export async function getServerSideProps(context) {
  // get page url
  const urlPath = context.resolvedUrl;

  const username = context.params.name;

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

  // get user
  let userData = {};
  await db
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get()
    .then((data) => {
      if (data) {
        userData.credentials = data.docs[0].data();
        return userData;
      }
    })

    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      //session,
      initialReduxState: reduxStore.getState(),
      urlPath: urlPath,
      user: userData.credentials,
    },
  };
}
