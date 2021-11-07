import React from "react";
import Layout from "../../components/layout/Layout";
import UserComponent from "../../components/user/UserComponent";
import AppSidebar from "../../components/layout/AppSidebar";
import { analytics, db } from "../../firebase";
import { initializeStore } from "../../redux/store";
import { SET_FEATURED_NAV_CATEGORIES } from "../../redux/types/uiTypes";
import { SET_USER_PROFILE } from "../../redux/types/userTypes";
import PageMeta from "../../utils/pageMeta";
import { userAuthRefresh } from "../../utils/userFunction";

function User({ urlPath, user, username }) {
  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  //   log analytics event
  analytics().logEvent(`${user.username}profile_page_view`);

  return (
    <Layout page="shrine" drawerPage="user">
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
        thumbnail={user.imageUrl}
      />

      <div className="w-full mt-2 lg:w-[97%] mr-auto ml-auto flex space-x-4">
        <main className="w-full flex-grow-1">
          {/* page component */}
          <UserComponent user={user} />
        </main>

        <aside
          id="sidebar"
          className="hidden h-screen sticky top-[-800px] xl:top-[-870px] lg:block w-[45%] xl:w-[30%]"
        >
          <AppSidebar page="user" username={username} />
        </aside>
      </div>
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

  // get user data
  let userData = {};

  // user shrines from firestore collection
  const userShrines = db.collection("shrines").where("creator", "==", username);

  await db
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get()
    .then((data) => {
      userData.credentials = data.docs[0].data();

      return userShrines.get();
    })
    .then((data) => {
      // define empty shrinIds list
      let shrineIds = [];

      // define consecrated shrines
      let consecratedShrines = [];

      //populate shrine ids with shrineIds from  data
      data.forEach((doc) => {
        shrineIds.push(doc.id);
        consecratedShrines.push({
          shrineId: doc.id,
          ...doc.data(),
        });
      });

      // update userData object
      userData.credentials.createdShrines = shrineIds;
      userData.credentials.consecratedShrines = consecratedShrines;
    })
    .then(async () => {
      // feed userdata to redux state user page profile
      await dispatch({ type: SET_USER_PROFILE, payload: userData });
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
      username: username,
    },
  };
}
