import React, { useEffect, useState } from "react";
import { Avatar, Box, Dialog, IconButton, Tab, Tabs } from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import SettingsHeader from "../layout/SettingsHeader";
import {
  EditOutlined,
  HighlightOff,
  HomeOutlined,
  LockOutlined,
  DeleteOutlined,
} from "@material-ui/icons";
import { shallowEqual, useSelector } from "react-redux";
import Loader from "../../utils/loader";
import dayjs from "dayjs";

function SettngsComponent() {
  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        credentials: state.user.credentials,
        loadingUser: state.UI.loadingUser,
      }),
      shallowEqual
    );
  };

  // destructure darkMode
  const { credentials, loadingUser } = useStateParameters();

  // define component state
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  // state for user image preview
  const [imageOpen, setImageOpen] = useState(false);

  // set effect
  useEffect(() => {
    let mounted = true;

    if (mounted) setLoading(loadingUser);

    return () => (mounted = false);
  }, [loadingUser]);

  // handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // for tabs and Desktops
  const allyProps = (index) => {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  };

  //   tab panel for tabs
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={4}>{children}</Box>}
      </div>
    );
  };

  // function for opening user image dialog
  const handleImagePreviewOpen = () => {
    setImageOpen(true);
  };

  // function for closing user image dialog
  const handleImagePreviewClose = () => {
    setImageOpen(false);
  };

  // handling editing button click
  const handleEditButtonClick = () => {
    setValue(1);
  };

  // handling deactivation dialog opening
  const handleDeactivateClose = () => {
    // setDeactivateOpen to false
    setDeactivateOpen(false);
  };
  const handleDeactivateOpen = () => {
    // set Deactivateopen to true
    setDeactivateOpen(true);
  };

  // bring in  user functions
  const { logout, currentUser } = useAuth();
  return (
    <div>
      {/* header */}
      <SettingsHeader
        logout={logout}
        currentUser={currentUser}
        credentials={credentials}
      />

      {/* main body */}
      <section className="bg-gradient-to-r from-[#212c39] via-[#121e3d] to-[#323552] bg-no-repeat">
        <div className="w-full min-h-[100vh] lg:w-[75%] flex lg:mr-auto lg:ml-auto bg-white">
          {/* tabs */}
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="settings tabs"
            indicatorColor="secondary"
            className="bg-[#800000] border-r-2 border-r-[#800000] w-[20%]"
          >
            <Tab
              label="Overview"
              {...allyProps(0)}
              icon={<HomeOutlined />}
              style={{ marginBottom: "50px", marginTop: "10px" }}
            />
            <Tab
              label="Edit profile"
              {...allyProps(1)}
              icon={<EditOutlined />}
              style={{ marginBottom: "50px" }}
            />
            <Tab
              label="Change password"
              {...allyProps(2)}
              icon={<LockOutlined />}
            />
          </Tabs>

          {/* panels */}
          <TabPanel
            value={value}
            index={0}
            style={{ width: "65%", marginRight: "auto", marginLeft: "auto" }}
          >
            {/* Account overview panel */}
            {/* title */}
            <p
              className="text-3xl font-semibold text-gray-700 mb-8"
              component="h1"
            >
              Profile
            </p>

            {/* overview */}
            {loading ? (
              <div className="h-[100vh]">
                <Loader />
              </div>
            ) : (
              <div>
                {/* image wrapper */}
                <div className="mb-[50px]">
                  <img
                    src={credentials.imageUrl}
                    alt={credentials.username}
                    className="w-[95px] h-[95px] md:w-[150px] md:h-[150px] mr-auto ml-auto cursor-pointer rounded-full object-cover"
                    onClick={
                      credentials.imageUrl ? handleImagePreviewOpen : null
                    }
                  />

                  {/* image preview */}
                  <Dialog
                    open={imageOpen}
                    onClose={handleImagePreviewClose}
                    maxWidth="md"
                  >
                    <div className="relative">
                      <div className="absolute right-0 top-0 hover:bg-[#fff]">
                        <IconButton
                          aria-label="close"
                          onClick={handleImagePreviewClose}
                        >
                          <HighlightOff fontSize="medium" color="primary" />
                        </IconButton>
                      </div>

                      <img
                        src={credentials.imageUrl}
                        alt={credentials.username}
                        className="w-[400px] h-auto object-cover"
                      />
                    </div>
                  </Dialog>
                </div>

                {/* profile items*/}
                {/* username */}
                <div className="flex flex-col space-y-4 md:flex-row items-center md:justify-between border-b border-b-[#ebf0f0] pb-1 md:pb-3 mb-5">
                  <p className="text-gray-400">Username</p>
                  <p className="text-gray-700">{credentials.username}</p>
                </div>
                {/* email */}
                <div className="flex flex-col space-y-4 md:flex-row items-center md:justify-between border-b border-b-[#ebf0f0] pb-1 md:pb-3 mb-5">
                  <p className="text-gray-400">Email</p>
                  <p className="text-gray-700">{credentials.email}</p>
                </div>
                {/* display name */}
                {credentials.displayName && (
                  <div className="flex flex-col space-y-4 md:flex-row items-center md:justify-between border-b border-b-[#ebf0f0] pb-1 md:pb-3 mb-6">
                    <p className="text-gray-400">Display Name</p>
                    <p className="text-gray-700">{credentials.displayName}</p>
                  </div>
                )}
                {/* about */}
                {credentials.about && (
                  <div className="mb-6">
                    <p className="text-gray-400">Bio</p>
                    <p className="border border-[#ebf0f0] rounded-md p-2  text-gray-700 min-h-[150px] h-auto">
                      {credentials.about}
                    </p>
                  </div>
                )}
                {/* initiation */}
                <div className="flex flex-col space-y-4 md:flex-row items-center md:justify-between border-b border-b-[#ebf0f0] pb-1 md:pb-3 mb-10">
                  <p className="text-gray-400">Initiation</p>
                  <p className="text-gray-700">
                    {dayjs(credentials.createdAt).format("MMMM D, YYYY")}
                  </p>
                </div>

                {/* edit button */}
                <button
                  className="text-lg border border-[#933a16] capitalize rounded-md text-[#933a16] p-2 hover:bg-[#fcf6f5] transition-all mb-10"
                  component="h5"
                  onClick={handleEditButtonClick}
                >
                  Edit Profile
                </button>

                {/* deactivation corner */}
                <div>
                  <p className="text-gray-500 text-sm font-semibold mb-3">
                    DEACTIVATE ACCOUNT
                  </p>
                  <hr />
                  <div
                    className="flex justify-end mt-2 mb-20 cursor-pointer"
                    component="button"
                    onClick={handleDeactivateOpen}
                  >
                    <div className="flex items-center space-x-2 text-[#933a16] ">
                      <DeleteOutlined fontSize="small" />
                      <p className="font-semibold text-xs">
                        DEACTIVATE ACCOUNT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            style={{ width: "65%", marginRight: "auto", marginLeft: "auto" }}
          >
            <p>tab 2</p>
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
            style={{ width: "65%", marginRight: "auto", marginLeft: "auto" }}
          >
            <p>tab 3</p>
          </TabPanel>
        </div>
      </section>
    </div>
  );
}

export default SettngsComponent;
