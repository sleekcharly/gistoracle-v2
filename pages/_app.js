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

  return (
    <ThemeProvider enableSystem={true} attribute="class">
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
