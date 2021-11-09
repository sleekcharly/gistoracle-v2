import { NextSeo } from "next-seo";
import AboutComponent from "../components/AboutComponent";
import InfoHeader from "../components/layout/InfoHeader";
import PageMeta from "../utils/pageMeta";

function About({ urlPath }) {
  return (
    <div className="bg-[#f2f6f7]">
      <NextSeo
        title="Welcome to Gistoracle - Africa's online community"
        description="Gistoracle serves you endless discussions, articles, news and many more from a wide variety of communities we call shrines."
        canonical={`https://www.gistoracle.com${urlPath}`}
        openGraph={{
          url: `https://www.gistoracle.com${urlPath}`,
          title: "Welcome to Gistoracle - Africa's online community",
          description:
            "Gistoracle serves you endless discussions, articles, news and many more from a wide variety of communities we call shrines.",
          site_name: "Gistoracle",
          type: "website",
        }}
        twitter={{
          site: "@gistoracle",
          cardType: "summary",
        }}
      />

      <InfoHeader page="about" />
      <AboutComponent />
    </div>
  );
}

export default About;

// get server side props with SSR
export async function getServerSideProps(context) {
  // get page url
  const urlPath = context.resolvedUrl;
  return {
    props: {
      urlPath: urlPath,
    },
  };
}
