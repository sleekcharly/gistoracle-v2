import React from "react";
import CategoryComponent from "../../components/category/CategoryComponent";
import Layout from "../../components/layout/Layout";
import { analytics, db } from "../../firebase";
import { initializeStore } from "../../redux/store";
import { SET_CATEGORY } from "../../redux/types/dataTypes";
import { SET_FEATURED_NAV_CATEGORIES } from "../../redux/types/uiTypes";
import PageMeta from "../../utils/pageMeta";
import { userAuthRefresh } from "../../utils/userFunction";

function Category({ category, urlPath }) {
  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  //   log analytics event
  analytics().logEvent(`${category.name}_page_view`);

  return (
    <Layout page="category">
      <PageMeta
        pageTitle={`${category.name.toUpperCase()} | Gistoracle`}
        urlPath={urlPath}
        description={category.description}
      />

      {/* page component */}
      <CategoryComponent category={category} />
    </Layout>
  );
}

export default Category;

// get server side props with SSR
export async function getServerSideProps(context) {
  // get page url
  const urlPath = context.resolvedUrl;

  const categoryName = context.params.name;

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

  //   get category
  let category = [];
  await db
    .collection("category")
    .where("name", "==", categoryName)
    .limit(1)
    .get()
    .then((data) => {
      data.forEach((doc) => {
        category.push({ categoryId: doc.id });
      });
    })
    .catch((err) => console.error(err));

  const categoryData = await db
    .doc(`/category/${category[0].categoryId}`)
    .get()
    .then((doc) => {
      let catData = {};
      if (doc.exists) {
        catData = doc.data();
        catData.categoryId = category[0].categoryId;
        return catData;
      } else {
        console.log("Category does not exist");
      }
    })
    .catch((err) => {
      console.error(err);
    });

  await dispatch({
    type: SET_CATEGORY,
    payload: categoryData,
  });

  return {
    props: {
      //session,
      initialReduxState: reduxStore.getState(),
      urlPath: urlPath,
      category: categoryData,
    },
  };
}
