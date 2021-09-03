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

function Layout({ children }) {
  // destructure featuredNavCategries from state
  const { featuredNavCategories } = useNavCategories();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header featuredNavCategories={featuredNavCategories} />

      {/* content */}
      <div className="w-full mt-2 lg:w-[97%] mr-auto ml-auto flex space-x-8">
        <main className="w-full flex-grow-1">{children}</main>

        <footer className="w-[25%] hidden lg:block"></footer>
      </div>
    </div>
  );
}

export default Layout;
