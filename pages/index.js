import { useState, useEffect } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import Layout from "../components/layout/Layout";
import { initializeStore } from "../redux/store";
import { db } from "../firebase";
import { SET_FEATURED_NAV_CATEGORIES } from "../redux/types/uiTypes";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return <button onClick={() => setTheme("light")}>Dark</button>;
    } else {
      return <button onClick={() => setTheme("dark")}>Light</button>;
    }
  };
  return (
    <div className=" min-h-screen">
      <Head>
        <title>Gistoracle - Africa's online community</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout />
      <h1
        className="text-3xl text-black dark:text-pink-500"
        css={{ backgroundColor: "teal" }}
      >
        Welcome to Your App
      </h1>
      {renderThemeChanger()}
    </div>
  );
}

// get server side props with SSR
export async function getServerSideProps(context) {
  // Get the authenticated user
  // const session = await getSession(context);

  // preload the featured nav categories  from firestore and redux store
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  // get featured Nav Categories
  const categories = await db
    .collection("category")
    .limit(6)
    .orderBy("nav")
    .get()
    .then(data => {
      let featuredNavCategories = [];
      data.forEach(doc => {
        featuredNavCategories.push({
          featuredNavCategoryId: doc.id,
          ...doc.data()
        });
      });

      return featuredNavCategories;
    })
    .catch(err => console.error(err));

  await dispatch({
    type: SET_FEATURED_NAV_CATEGORIES,
    payload: categories
  });

  return {
    props: {
      //session,
      initialReduxState: reduxStore.getState()
    }
  };
}
