import { DefaultSeo } from "next-seo";
import "tailwindcss/tailwind.css";
import "../styles.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { analytics } from "../firebase";
import { useEffect, useState } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
// Material-ui custom theme
import themeFile from "../utils/theme";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import Loader from "../utils/loader";
import { useRouter } from "next/router";
import Script from "next/script";
import * as gtag from "../utils/gtag";

function MyApp({ Component, pageProps }) {
  // set router
  const router = useRouter();

  // set state for page loading
  const [pageLoading, setPageLoading] = useState(false);

  //initiate google analytics
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      analytics();
    }
  }, []);

  // take action on route change
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router.events]);

  // define redux store
  const store = useStore(pageProps.initialReduxState);

  // create Application theme
  const theme = createTheme(themeFile);

  // define meta infomation
  const metaImage =
    "https://firebasestorage.googleapis.com/v0/b/gistoracle-28360.appspot.com/o/Gist%20oracle%20tranparent%20background.png?alt=media";
  const metaTitle = "Gistoracle - Africa's online community";
  const metaUrl = "https://www.gistoracle.com";
  const metaDescription =
    "Gistoracle is home to a wide range of communities offering juicy news, discussions, gossips, articles and many more.";

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=UA-196549940-1`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
                });
            `,
        }}
      />
      {/* <ThemeProvider enableSystem={true} attribute="class"> for dark mode */}
      <ThemeProvider>
        <MuiThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Provider store={store}>
              {pageLoading ? (
                <Loader />
              ) : (
                <AuthProvider>
                  <DefaultSeo
                    title={metaTitle}
                    description={metaDescription}
                    canonical={metaUrl}
                    openGraph={{
                      url: metaUrl,
                      title: metaTitle,
                      description: metaDescription,
                      images: [{ url: metaImage }],
                      site_name: "Gistoracle",
                      type: "website",
                    }}
                    facebook={{
                      appId: "648521896142401",
                    }}
                    twitter={{
                      site: "@gistoracle",
                      cardType: "summary",
                    }}
                    additionalMetaTags={[
                      {
                        property: "facebook-domain-verification",
                        content: "z42jagycnlqtpdw8qpzsl5990n4wrq",
                      },
                    ]}
                  />
                  <Component {...pageProps} />
                </AuthProvider>
              )}
            </Provider>
          </SnackbarProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
