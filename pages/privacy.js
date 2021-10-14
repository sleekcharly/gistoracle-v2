import InfoHeader from "../components/layout/InfoHeader";
import PrivacyComponent from "../components/PrivacyComponent";
import PageMeta from "../utils/pageMeta";

function Privacy({ urlPath }) {
  return (
    <div className="bg-[#f2f6f7]">
      <PageMeta
        pageTitle="Privacy policy | Gistoracle"
        description='Gistoracle recognizes that your privacy is very important, and this we take this seriously. Our privacy policy ("Privacy Policy")      describes our policies and procedures about, extraction, use, disclosure and sharing of your personal data when you use Gistoracle'
        urlPath={urlPath}
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
