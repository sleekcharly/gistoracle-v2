import "tailwindcss/tailwind.css";
import "../styles.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { analytics } from "../firebase";
import { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
// Material-ui custom theme
import themeFile from "../utils/theme";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  //initiate google analytics
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      analytics();
    }
  }, []);

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
      <Head>
        {/* facebook meta */}
        <meta property="og:type" content="website" key="homeType" />
        <meta property="og:title" content={metaTitle} key="homeTitle" />
        <meta property="og:image" content={metaImage} key="homeImage" />
        <meta property="og:hashtag" content="#Gistoracle" key="homeHashtag" />
        <meta property="og:url" content={metaUrl} key="homeogUrl" />
        <meta property="og:site_name" content="Gistoracle" key="ogSitename" />
        <meta
          property="og:description"
          content={metaDescription}
          key="homeOgDescription"
        />
        {/*Twitter meta*/}
        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:title" content={metaTitle} key="homeTwTitle" />
        <meta
          name="twitter:description"
          content={metaDescription}
          key="homeTwDescription"
        />
        <meta name="twitter:url" content={metaUrl} key="homeTwUrl" />
        <meta name="twitter:image" content={metaImage} key="homeTwImage" />

        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="type" content="website" />
        <meta property="url" content={metaUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noodp" />
        <meta property="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta property="image" content={metaImage} />

        <title>Gistoracle - Africa's online community</title>
      </Head>

      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Provider store={store}>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </Provider>
        </SnackbarProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
