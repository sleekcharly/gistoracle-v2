import { useState, useEffect } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;
    console.log(theme);

    if (currentTheme === "dark") {
      return <button onClick={() => setTheme("light")}>Dark</button>;
    } else {
      return <button onClick={() => setTheme("dark")}>Light</button>;
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-grey-100">
      <Head>
        <title>Gistoracle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
