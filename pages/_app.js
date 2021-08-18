import "tailwindcss/tailwind.css";
import "../styles.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { analytics } from "../firebase";
import { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  //initiate google analytics
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      analytics();
    }
  }, []);

  const store = useStore(pageProps.initialReduxState);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Provider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
