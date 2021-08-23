import "tailwindcss/tailwind.css";
import "../styles.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { analytics } from "../firebase";
import { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";

function MyApp({ Component, pageProps }) {
  //initiate google analytics
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      analytics();
    }
  }, []);

  // define redux store
  const store = useStore(pageProps.initialReduxState);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Provider store={store}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
