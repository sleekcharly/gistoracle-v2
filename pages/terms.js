import InfoHeader from "../components/layout/InfoHeader";
import TermsComponent from "../components/TermsComponent";
import PageMeta from "../utils/pageMeta";

function Terms({ urlPath }) {
  return (
    <div className="bg-[#f2f6f7]">
      <PageMeta
        pageTitle="Terms | Gistoracle"
        description="Gistoracle provides tecnologies and services that build communities and enable people to engage with each other. Our terms govern your use of Gistoracle and other products. Please ensure to read it, because, by using Gistoracle, you consent to these terms."
        urlPath={urlPath}
        contentType="article"
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
