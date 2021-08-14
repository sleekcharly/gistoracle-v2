import React from "react";
import Head from "next/head";
import Header from "./Header";
import logo from "../../public/images/gistoracle_logo.png";
import { shallowEqual, useSelector } from "react-redux";

// get server-side rendered featured categories from redux state
const useNavCategories = () => {
  return useSelector(
    state => ({
      featuredNavCategories: state.UI.featuredNavCategories
    }),
    shallowEqual
  );
};

function Layout() {
  // define head parameters
  const headTitle = "Gistoracle - Africa's online community";
  const headQuote =
    "Gistoracle serves you endless discussions, articles, news and many more from a wide variety of communities we call shrines";
  const headDescription =
    "Gistoracle is home to a wide range of communities offering juicy news, discussions, gossips, articles and many more.";
  const headImage = logo;
  let currentUrl = "http://www.gistoracle.com";

  // destructure featuredNavCategries from state
  const { featuredNavCategories } = useNavCategories();

  return (
    <div>
      <Head>
        <title>{headTitle}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="type" content="website" />

        <meta property="url" content={currentUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noodp" />
        <meta property="title" content={headTitle} />
        <meta name="description" content={headDescription} />
        <meta property="quote" content={headQuote} />
        <meta property="image" content={headImage} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={headTitle} />
        <meta property="og:quote" content={headQuote} />
        <meta property="og:image" content={headImage} />
        <meta property="og:image:secure_url" content={headImage} />
        <meta content="image/*" property="og:image:type" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Gistoracle" />
        <meta property="og:description" content={headDescription} />

        {/*Twitter meta*/}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={headTitle} />
        <meta name="twitter:description" content={headDescription} />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:image" content={headImage} />
      </Head>

      {/* Header */}
      <Header />
    </div>
  );
}

export default Layout;
