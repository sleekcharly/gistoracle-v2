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
  }, [router]);

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
    // <ThemeProvider enableSystem={true} attribute="class"> for dark mode
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
                  twitter={{
                    site: "@gistoracle",
                    cardType: "summary",
                  }}
                />
                <Component {...pageProps} />
              </AuthProvider>
            )}
          </Provider>
        </SnackbarProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
