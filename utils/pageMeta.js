import React from "react";
import Head from "next/head";

// set logo
const logo = "/images/gistoracle_logo.png";

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
  let image = thumbnail ? thumbnail : { logo };

  // set description
  let info = description
    ? description
    : "Gistoracle is home to a wide range of communities offering juicy news, discussions, gossips, articles and many more.";

  // set hashtag
  let hashtag = pageHashtag ? pageHashtag : "#Gistoracle";

  // set content type
  let pageType = contentType ? contentType : "website";

  console.log(info);

  return (
    <Head>
      <title>{title}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta property="type" content="website" />

      <meta property="url" content={currentUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta name="description" content={info} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={pageType} />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:hashtag" content={hashtag} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Gistoracle" />
      <meta property="og:description" content={info} />

      {/*Twitter meta*/}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={info} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}

export default PageMeta;
