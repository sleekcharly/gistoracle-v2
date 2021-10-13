import InfoHeader from "../components/layout/InfoHeader";
import PageMeta from "../utils/pageMeta";

function Privacy({ urlPath }) {
  return (
    <div>
      {/* <PageMeta
        pageTitle="Welcome to Gistoracle - Africa's online community"
        description="Gistoracle serves you endless discussions, articles, news and many more from a wide variety of communities we call shrines."
        urlPath={urlPath}
      /> */}
      <InfoHeader page="privacy" />
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
