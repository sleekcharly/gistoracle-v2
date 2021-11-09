import { NextSeo } from "next-seo";
import InfoHeader from "../components/layout/InfoHeader";
import TermsComponent from "../components/TermsComponent";

function Terms({ urlPath }) {
  return (
    <div className="bg-[#f2f6f7]">
      <NextSeo
        title="Terms | Gistoracle"
        description="Gistoracle provides tecnologies and services that build communities and enable people to engage with each other. Our terms govern your use of Gistoracle and other products. Please ensure to read it, because, by using Gistoracle, you consent to these terms."
        canonical={`https://www.gistoracle.com${urlPath}`}
        openGraph={{
          url: `https://www.gistoracle.com${urlPath}`,
          title: "Terms | Gistoracle",
          description:
            "Gistoracle provides tecnologies and services that build communities and enable people to engage with each other. Our terms govern your use of Gistoracle and other products. Please ensure to read it, because, by using Gistoracle, you consent to these terms.",
          site_name: "Gistoracle",
          type: "article",
        }}
        twitter={{
          site: "@gistoracle",
          cardType: "summary",
        }}
      />
      <InfoHeader page="terms" />

      {/*  terms component */}
      <TermsComponent />
    </div>
  );
}

export default Terms;

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
