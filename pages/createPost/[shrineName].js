import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import CreatePostComponent from "../../components/post/CreatePostComponent";
import { db } from "../../firebase";
import { initializeStore } from "../../redux/store";
import { SET_FEATURED_NAV_CATEGORIES } from "../../redux/types/uiTypes";
import { userAuthRefresh } from "../../utils/userFunction";
import PostRules from "../../components/post/PostRules";
import ShrineInfo from "../../components/shrine/ShrineInfo";
import { shallowEqual, useSelector } from "react-redux";

function CreatePost({ urlPath, shrineName }) {
  // set state boolean to track
  const [shrineSelected, setShrineSelected] = useState(false);

  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        shrineIsSelected: state.UI.shrineSelected,
      }),
      shallowEqual
    );
  };

  // destructure redux parameters
  const { shrineIsSelected } = useStateParameters();

  // watch for changes to selected shrine
  useEffect(() => {
    // start subscription
    let mounted = true;

    if (mounted) {
      shrineIsSelected ? setShrineSelected(true) : setShrineSelected(false);
    }

    return () => (mounted = false);
  }, [shrineIsSelected]);

  return (
    <Layout page="post" pageComponent="createPost">
      <NextSeo
        title="Gistoracle | New post"
        canonical={`https://www.gistoracle.com${urlPath}`}
        openGraph={{
          url: `https://www.gistoracle.com${urlPath}`,
          title: "Gistoracle | New post",
          site_name: "Gistoracle",
          type: "website",
        }}
        twitter={{
          site: "@gistoracle",
          cardType: "summary",
        }}
      />

      <div className="w-full mt-2 lg:w-[90%] 2xl:w-[80%] mr-auto ml-auto flex space-x-4 bg-white p-4">
        <main className="w-full flex-grow-1">
          {/* post page component */}
          <CreatePostComponent shrineName={shrineName} />
        </main>

        <aside id="sidebar" className="hidden lg:block w-[45%] xl:w-[30%]">
          {/* show shrine info if selected */}
          {shrineSelected && (
            <div className="mb-5">
              <ShrineInfo component="createPost" />
            </div>
          )}
          <PostRules />
        </aside>
      </div>
    </Layout>
  );
}

export default CreatePost;

// get server side props with SSR
export async function getServerSideProps(context) {
  // get page url
  const urlPath = context.resolvedUrl;

  // get shrine name
  const shrineName = context.params.shrineName;

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
      shrineName: shrineName,
    },
  };
}
