import React from "react";
import Head from "next/head";

function PageMeta({
  urlPath,
  pageTitle,
  thumbnail,
  description,
  pageHashtag,
  contentType,
}) {
  // set currentUrl
  let currentUrl = `https://www.gistoracle.com${urlPath}`;

  // set title
  let title = pageTitle ? pageTitle : "Gistoracle - Africa's online community";

  // set image
  let image = thumbnail
    ? thumbnail
    : "https://firebasestorage.googleapis.com/v0/b/gistoracle-28360.appspot.com/o/Gist%20oracle%20tranparent%20background.png?alt=media";

  // set description
  let info = description
    ? description
    : "Gistoracle is home to a wide range of communities offering juicy news, discussions, gossips, articles and many more.";

  // set hashtag
  let hashtag = pageHashtag ? pageHashtag : "#Gistoracle";

  // set content type
  let pageType = contentType ? contentType : "website";

  return (
    <Head>
      {/* facebook meta */}
      <meta property="og:locale" content="en_US" key="ogLoacale" />
      <meta property="og:type" content={pageType} key="ogType" />
      <meta property="og:title" content={title} key="ogTitle" />
      <meta property="og:image" content={image} key="ogImage" />
      <meta property="og:hashtag" content={hashtag} key="ogHashtag" />
      <meta property="og:url" content={currentUrl} key="ogUrl" />
      <meta property="og:site_name" content="Gistoracle" key="ogSitename" />
      <meta property="og:description" content={info} key="ogDescription" />
      {/*Twitter meta*/}
      <meta name="twitter:card" content="summary" key="twcard" />
      <meta name="twitter:title" content={title} key="twTitle" />
      <meta name="twitter:description" content={info} key="twDescription" />
      <meta name="twitter:url" content={currentUrl} key="twUrl" />
      <meta name="twitter:image" content={image} key="twImage" />

      <title>{title}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta name="description" content={info} />
      <meta property="image" content={image} />
    </Head>
  );
}

export default PageMeta;
