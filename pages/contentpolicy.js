import ContentPolicyComponent from "../components/ContentPolicyComponent";
import InfoHeader from "../components/layout/InfoHeader";
import PageMeta from "../utils/pageMeta";

function ContentPolicy({ urlPath }) {
  return (
    <div className="bg-[#f2f6f7]">
      <PageMeta
        pageTitle="Content Policy | GistOracle"
        description="Gistoracle is home to a vast network of communities. It is our belief that if people don't feel safe they can't engage each other. View our content policies"
        urlPath={urlPath}
        contentType="article"
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
