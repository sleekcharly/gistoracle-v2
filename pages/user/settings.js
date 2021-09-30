import React from "react";
import { db } from "../../firebase";
import { initializeStore } from "../../redux/store";
import { SET_USER_PROFILE } from "../../redux/types/userTypes";
import PageMeta from "../../utils/pageMeta";
import { userAuthRefresh } from "../../utils/userFunction";
import SettingsComponent from "../../components/user/SettingsComponent";

function Settings() {
  // check for existing token and token expiration to maintain user authentication
  userAuthRefresh();

  return (
    <>
      <PageMeta
        pageTitle={`user settings | Gistoracle`}
        description="Gistoracle user settings page"
      />

      <SettingsComponent />
    </>
  );
}

export default Settings;
