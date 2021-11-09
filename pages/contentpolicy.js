import { NextSeo } from "next-seo";
import ContentPolicyComponent from "../components/ContentPolicyComponent";
import InfoHeader from "../components/layout/InfoHeader";
import PageMeta from "../utils/pageMeta";

function ContentPolicy({ urlPath }) {
  return (
    <div className="bg-[#f2f6f7]">
      <NextSeo
        title="Content Policy | GistOracle"
        description="Gistoracle is home to a vast network of communities. It is our belief that if people don't feel safe they can't engage each other. View our content policies"
        canonical={`https://www.gistoracle.com${urlPath}`}
        openGraph={{
          url: `https://www.gistoracle.com${urlPath}`,
          title: "Content Policy | GistOracle",
          description:
            'Gistoracle recognizes that your privacy is very important, and this we take this seriously. Our privacy policy ("Privacy Policy")      describes our policies and procedures about, extraction, use, disclosure and sharing of your personal data when you use Gistoracle',
          site_name: "Gistoracle",
          type: "article",
        }}
        twitter={{
          site: "@gistoracle",
          cardType: "summary",
        }}
      />
      <InfoHeader page="contentpolicy" />

      {/* content policy component */}
      <ContentPolicyComponent />
    </div>
  );
}

export default ContentPolicy;

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
