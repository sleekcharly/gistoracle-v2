import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import AppSidebar from "../../components/layout/AppSidebar";
import Layout from "../../components/layout/Layout";
import ShrineComponent from "../../components/shrine/shrineComponent";
import { analytics, db } from "../../firebase";
import { initializeStore } from "../../redux/store";
import { SET_SHRINE } from "../../redux/types/dataTypes";
import { SET_FEATURED_NAV_CATEGORIES } from "../../redux/types/uiTypes";
import PageMeta from "../../utils/pageMeta";
import { userAuthRefresh } from "../../utils/userFunction";

function Shrine({ shrine, urlPath }) {
  //   log analytics event
  useEffect(() => {
    let mounted = true;

    if (mounted) analytics().logEvent(`${shrine.name}_page_view`);

    return () => (mounted = false);
  }, []);

  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  return (
    <Layout page="shrine" drawerPage="shrine">
      <NextSeo
        title={`${shrine.name.toUpperCase()} shrine | Gistoracle`}
        description={shrine.description}
        canonical={`https://www.gistoracle.com${urlPath}`}
        openGraph={{
          url: `https://www.gistoracle.com${urlPath}`,
          title: `${shrine.name.toUpperCase()} shrine | Gistoracle`,
          description: shrine.description,
          images: [
            {
              url: shrine.avatar ? shrine.avatar : "/images/shrineAvatar.png",
              width: 400,
              height: 400,
              alt: `${shrine.name} avatar`,
            },
          ],
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

      <div className="w-full mt-2 lg:w-[97%] mr-auto ml-auto flex space-x-4">
        <main className="w-full flex-grow-1">
          {/* page component */}
          <ShrineComponent shrine={shrine} />
        </main>

        <aside
          id="sidebar"
          className="hidden h-screen sticky top-[-1200px] xl:top-[-1500px] lg:block w-[45%] xl:w-[30%]"
        >
          <AppSidebar page="shrine" />
        </aside>
      </div>
    </Layout>
  );
}

export default Shrine;

// get server side props with SSR
export async function getServerSideProps(context) {
  // get page url
  const urlPath = context.resolvedUrl;

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

  //   get shrine
  let shrine = [];
  let shrineData = {};

  await db
    .collection("shrines")
    .where("name", "==", shrineName)
    .limit(1)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        shrine.push({ shrineId: doc.id, ...doc.data() });
      });

      shrineData = shrine[0];
    })
    .catch((err) => console.error(err));

  await db
    .doc(`/category/${shrineData.categoryId}`)
    .get()
    .then((doc) => {
      shrineData.categoryName = doc.data().name;
      return db
        .collection("shrineFollows")
        .where("shrineId", "==", shrineData.shrineId)
        .get();
    })
    .then((data) => {
      let followers = [];
      data.forEach((doc) => {
        followers.push({ ...doc.data() });
      });

      shrineData.followersData = followers;
    })
    .catch((err) => console.lerror(err));

  // feed shrine data to redux state
  await dispatch({ type: SET_SHRINE, payload: shrineData });

  return {
    props: {
      //session,
      initialReduxState: reduxStore.getState(),
      urlPath: urlPath,
      shrine: shrineData,
    },
  };
}
