import AboutComponent from "../components/AboutComponent";
import InfoHeader from "../components/layout/InfoHeader";
import PageMeta from "../utils/pageMeta";

function About({ urlPath }) {
  return (
    <div className="bg-[#f2f6f7]">
      <PageMeta
        pageTitle="Welcome to Gistoracle - Africa's online community"
        description="Gistoracle serves you endless discussions, articles, news and many more from a wide variety of communities we call shrines."
        urlPath={urlPath}
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
