import { DefaultSeo, NextSeo } from "next-seo";
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
      <NextSeo
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
