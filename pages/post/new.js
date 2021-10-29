import React from "react";
import Layout from "../../components/layout/Layout";
import PageMeta from "../../utils/pageMeta";
import CreatePostComponent from "../../components/post/CreatePostComponent";
import { db } from "../../firebase";
import { initializeStore } from "../../redux/store";
import { SET_FEATURED_NAV_CATEGORIES } from "../../redux/types/uiTypes";
import { userAuthRefresh } from "../../utils/userFunction";
import PostRules from "../../components/post/PostRules";

function NewPost({ urlPath }) {
  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  return (
    <Layout page="post">
      <PageMeta pageTitle="Gistoracle | New post" urlPath={urlPath} />

      <div className="w-full mt-2 lg:w-[90%] 2xl:w-[80%] mr-auto ml-auto flex space-x-4 bg-white p-4">
        <main className="w-full flex-grow-1">
          {/* post page component */}
          <CreatePostComponent />
        </main>

        <aside id="sidebar" className="hidden lg:block w-[45%] xl:w-[30%]">
          <PostRules />
        </aside>
      </div>
    </Layout>
  );
}

export default NewPost;

// get server side props with SSR
export async function getServerSideProps(context) {
  // get page url
  const urlPath = context.resolvedUrl;

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

  return {
    props: {
      //session,
      initialReduxState: reduxStore.getState(),
      urlPath: urlPath,
    },
  };
}
