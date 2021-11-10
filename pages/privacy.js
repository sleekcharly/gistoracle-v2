import { NextSeo } from "next-seo";
import InfoHeader from "../components/layout/InfoHeader";
import PrivacyComponent from "../components/PrivacyComponent";
import PageMeta from "../utils/pageMeta";

function Privacy({ urlPath }) {
  return (
    <div className="bg-[#f2f6f7]">
      <NextSeo
        title="Privacy policy | Gistoracle"
        description='Gistoracle recognizes that your privacy is very important, and this we take this seriously. Our privacy policy ("Privacy Policy")      describes our policies and procedures about, extraction, use, disclosure and sharing of your personal data when you use Gistoracle'
        canonical={`https://www.gistoracle.com${urlPath}`}
        openGraph={{
          url: `https://www.gistoracle.com${urlPath}`,
          title: "Privacy policy | Gistoracle",
          description:
            'Gistoracle recognizes that your privacy is very important, and this we take this seriously. Our privacy policy ("Privacy Policy")      describes our policies and procedures about, extraction, use, disclosure and sharing of your personal data when you use Gistoracle',
          site_name: "Gistoracle",
          type: "article",
        }}
        facebook={{
          appId: "648521896142401",
        }}
        twitter={{
          site: "@gistoracle",
          cardType: "summary",
        }}
      />
      <InfoHeader page="privacy" />

      {/* privacy component */}
      <PrivacyComponent />
    </div>
  );
}

export default Privacy;

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
