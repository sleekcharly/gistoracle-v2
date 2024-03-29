import React from "react";
import Head from "next/head";
import Header from "./Header";
import { shallowEqual, useSelector } from "react-redux";
import PageMeta from "../../utils/pageMeta";

// get server-side rendered featured categories from redux state
const useNavCategories = () => {
  return useSelector(
    (state) => ({
      featuredNavCategories: state.UI.featuredNavCategories,
    }),
    shallowEqual
  );
};

function Layout({
  page,
  pageComponent,
  drawerPage,
  categoryId,
  username,
  children,
}) {
  // destructure featuredNavCategries from state
  const { featuredNavCategories } = useNavCategories();

  return (
    <div className={`${page !== "post" && "min-h-screen"}`}>
      {/* Header */}
      <Header
        featuredNavCategories={featuredNavCategories}
        pageComponent={pageComponent}
        drawerPage={drawerPage}
        categoryId={categoryId}
        username={username}
      />

      {/* content */}
      {children}
    </div>
  );
}

export default Layout;
