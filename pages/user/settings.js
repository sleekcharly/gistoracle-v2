import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { userAuthRefresh } from "../../utils/userFunction";
import SettingsComponent from "../../components/user/SettingsComponent";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";

function Settings() {
  // set router
  const router = useRouter();

  // destructure user objects
  const { currentUser, loading } = useAuth();
  console.log(currentUser);
  console.log(loading);

  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  !loading && !currentUser && router.push("/");

  return (
    <>
      <NextSeo
        title="user settings | Gistoracle"
        description="Gistoracle user settings page"
        canonical="https://www.gistoracle.com/user/settings"
        openGraph={{
          url: "https://www.gistoracle.com/user/settings",
          title: "user settings | Gistoracle",
          description: "Gistoracle user settings page",
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
      />

      <SettingsComponent />
    </>
  );
}

export default Settings;
