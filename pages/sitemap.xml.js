// generatine a sitemap page for crawlers
import React from "react";
import fs from "fs";
import { db } from "../firebase";

const Sitemap = () => {};

export default Sitemap;

export const getServerSideProps = async ({ res }) => {
  // set base url
  const baseUrl = {
    development: "http://localhost:5000",
    production: "https://www.gistoracle.com",
  }[process.env.NODE_ENV];

  // set static pges
  const staticPages = fs
    .readdirSync(
      { development: "pages", production: "./" }[process.env.NODE_ENV]
    )
    .filter((staticPage) => {
      return ![
        "_app.js",
        "_document.js",
        "sitemap.xml.js",
        ".env.development",
        ".next",
        "___next_launcher.js",
        "___vc_bridge.js",
        "node_modules",
        "package.json",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });

  // set dynamic shrine pages
  const shrinePageData = await db
    .collection("shrineSiteData")
    .get()
    .then((data) => {
      let pageData = [];
      data.forEach((doc) => {
        pageData.push({ ...doc.data() });
      });

      return pageData;
    })
    .catch((err) => console.error(err));

  // set dynamic user pages
  const userPageData = await db
    .collection("userSiteData")
    .get()
    .then((data) => {
      let pageData = [];
      data.forEach((doc) => {
        pageData.push({ ...doc.data() });
      });

      return pageData;
    })
    .catch((err) => console.error(err));

  // set dynamic post pages
  const postPageData = await db
    .collection("postSiteData")
    .get()
    .then((data) => {
      let pageData = [];
      data.forEach((doc) => {
        pageData.push({ ...doc.data() });
      });

      return pageData;
    })
    .catch((err) => console.error(err));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    ${staticPages
      .map((url) => {
        return `
        <url> 
            <loc>${url}</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>`;
      })
      .join("")}
        <url>
            <loc>https://www.gistoracle.com/</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>always</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/news</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/sports</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/politics</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/technology</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/style</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/health</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/movies</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/music</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/religion</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/celebrities</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/investment</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/romance</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/jobs</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/finance</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/nature</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/travel</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/autos</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/opinion</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/art</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/photography</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/pets</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/career</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/education</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/food</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/events</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/humour</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/parenting</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/real-estate</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/culture</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/agriculture</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/inspiration</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>
        <url> 
            <loc>https://gistoracle.com/category/history</loc> 
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
        </url>

        ${shrinePageData
          .map(({ name, updatedAt }) => {
            return `
            <url> 
                <loc>${baseUrl}/shrine/${name}</loc> 
                <lastmod>${updatedAt}</lastmod>
                <changefreq>hourly</changefreq>
                <priority>1.0</priority>
            </url>`;
          })
          .join("")}

          ${userPageData
            .map(({ userName, updatedAt }) => {
              return `
                <url> 
                    <loc>${baseUrl}/user/${userName}</loc> 
                    <lastmod>${updatedAt}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url>`;
            })
            .join("")}

            ${postPageData
              .map(({ shrineName, postId, slug, updatedAt }) => {
                return `
                <url> 
                    <loc>${baseUrl}/post/${shrineName}/${postId}/${slug}</loc> 
                    <lastmod>${updatedAt}</lastmod>
                    <changefreq>monthly</changefreq>
                    <priority>1.0</priority>
                </url>`;
              })
              .join("")}
    
    </urlset>`;

  //set page header
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};
