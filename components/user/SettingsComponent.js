import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import SettingsHeader from "../layout/SettingsHeader";
import {
  EditOutlined,
  HighlightOff,
  HomeOutlined,
  LockOutlined,
  DeleteOutlined,
  AddAPhotoOutlined,
  Warning,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { shallowEqual, useSelector } from "react-redux";
import Loader from "../../utils/loader";
import dayjs from "dayjs";

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
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  // state for user image preview
  const [imageOpen, setImageOpen] = useState(false);
  // form state values
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    currentPassword: "",
    password1: "",
    password2: "",
    bio: "",
    displayName: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState();
  const [formErrors, setFormErrors] = useState();
  const [verifyPasswordOpen, setVerifyPasswordOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // function for maping credentials to form state
  const mapUserDetailsToState = (credentials) => {
    // set component state once loaded.
    setValues((values) => ({
      ...values,
      username: credentials.username ? credentials.username : "",
      email: credentials.email ? credentials.email : "",
      displayName: credentials.displayName ? credentials.displayName : "",
      bio: credentials.about ? credentials.about : "",
      imageUrl: credentials.imageUrl ? credentials.imageUrl : null,
    }));
  };

  // set effect
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setLoading(loadingUser);
      mapUserDetailsToState(credentials);
    }

    return () => (mounted = false);
  }, [loadingUser]);

  // handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  // handling image change
  const handleImageChange = (event) => {
    setValues((values) => ({
      ...values,
      imageUrl: URL.createObjectURL(event.target.files[0]),
    }));
    setImage(event.target.files[0]);
  };

  // handling editing of profile picture
  const handleChangePicture = () => {
    const fileInput = document.getElementById("imgInput");
    fileInput.click();
  };

  // handle data change from edit form
  const handleFormDataChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  // handling cancel button click
  const handleCancelButtonClick = () => {
    setValue(0);
  };

  // handle opening of verification dialog
  const handleVerifyDialogOpen = (event) => {
    event.preventDefault();
    // clear errors before opening dialog
    setErrors({});
    setFormErrors({});

    //open dialog
    setVerifyPasswordOpen(true);
  };

  // handle closing of verification dialog
  const handleVerifyDialogClose = () => {
    setVerifyPasswordOpen(false);
    setValues((values) => ({
      ...values,
      currentPassword: "",
    }));
  };

  // toggle display of password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // handle mouse down password
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          {/* overview panel */}
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

          {/* editing panel */}
          <TabPanel
            value={value}
            index={1}
            style={{ width: "65%", marginRight: "auto", marginLeft: "auto" }}
          >
            {/* title */}
            <p
              className="text-3xl font-semibold text-gray-700 mb-8"
              component="h1"
            >
              Edit Profile
            </p>

            {/* image section for editing */}
            <div className="relative mb-10">
              <img
                src={values.imageUrl}
                alt={values.username}
                className="w-[140px] h-[140px] rounded-full opacity-50 cursor-pointer"
                onClick={handleChangePicture}
              />

              {/* hidden input element for image upload */}
              <input
                type="file"
                id="imgInput"
                hidden="hidden"
                onChange={handleImageChange}
              />

              {/* button to change immage */}
              <button
                className="text-[#933a16] absolute bottom-0 left-28"
                onClick={handleChangePicture}
              >
                <AddAPhotoOutlined fontSize="medium" />
              </button>
            </div>

            {/* edit form section */}
            <form>
              {/* email */}
              <div className="mb-8">
                <p className="text-gray-400">Email *</p>
                <TextField
                  name="email"
                  type="text"
                  value={values.email}
                  error={formErrors && formErrors.email ? true : false}
                  helperText={formErrors && formErrors.email}
                  onChange={handleFormDataChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </div>

              {/* username */}
              <div className="mb-8">
                <p className="text-gray-400">Username *</p>
                <TextField
                  name="username"
                  type="text"
                  value={values.username}
                  error={formErrors && formErrors.username ? true : false}
                  helperText={formErrors && formErrors.username}
                  onChange={handleFormDataChange}
                  variant="outlined"
                  fullWidth
                />
              </div>

              {/* display name */}
              <div className="mb-8">
                <p className="text-gray-400">Display name (Optional)</p>
                <TextField
                  name="displayName"
                  type="text"
                  value={values.displayName}
                  error={formErrors && formErrors.displayName ? true : false}
                  helperText={formErrors && formErrors.displayName}
                  onChange={handleFormDataChange}
                  variant="outlined"
                  fullWidth
                />
              </div>

              {/* Bio */}
              <div className="mb-11">
                <p className="text-gray-400">Bio (Optional)</p>
                <TextField
                  name="bio"
                  type="text"
                  multiline
                  rows="5"
                  placeholder="A short bio about yourself"
                  value={values.bio}
                  onChange={handleFormDataChange}
                  variant="outlined"
                  fullWidth
                />
              </div>

              {/* buttons */}
              <div className="flex space-x-3 items-center justify-end text-[#933a16]">
                <button
                  className="hover:bg-[#fcf6f5] rounded-md font-semibold"
                  onClick={handleCancelButtonClick}
                >
                  Cancel
                </button>

                <button
                  className="bg-[#933a16] text-white hover:bg-[#800000] rounded-md p-2 font-semibold"
                  onClick={handleVerifyDialogOpen}
                >
                  Save profile
                </button>
              </div>
            </form>

            {/* password verification dialog before profile update */}
            <Dialog
              open={verifyPasswordOpen}
              onClose={handleVerifyDialogClose}
              aria-labelledby="verify-dialog-title"
            >
              <DialogTitle id="verify-dialog-title">
                <div className="flex items-center space-x-3">
                  <Warning color="primary" fonsSize="small" />
                  <p className="text-gray-700 text-base font-semibold">
                    Update Profile
                  </p>
                </div>
              </DialogTitle>

              <DialogContent>
                <p className="text-gray-600 mb-10">
                  To update your profile, please enter your password.
                </p>

                <FormControl className="w-full">
                  <InputLabel htmlFor="adornment-password">
                    Current password
                  </InputLabel>

                  <Input
                    id="adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={values.currentPassword}
                    onChange={handleFormDataChange}
                    name="currentPassword"
                    autoFocus
                    error={errors && errors.password ? true : false}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />

                  <FormHelperText>
                    <p className="text-xs text-[#933a16]">
                      {" "}
                      {errors && errors.password}
                    </p>
                  </FormHelperText>
                </FormControl>
              </DialogContent>

              <DialogActions>
                {updating ? (
                  <div className="flex items-center justify-center space-x-2">
                    <CircularProgress size={20} />
                    <p className="text-xs text-[#933a16]">Updating Profile</p>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-[#800000]"
                      onClick={handleVerifyDialogClose}
                    >
                      Cancel
                    </button>

                    <button
                      disabled={
                        loading || !values.currentPassword === "" ? true : false
                      }
                      className="text-white bg-[#933a16] hover:bg-[#800000] p-2 rounded-md"
                    >
                      Update Profile
                    </button>
                  </div>
                )}
              </DialogActions>
            </Dialog>
          </TabPanel>

          {/* change password panel */}
          <TabPanel
            value={value}
            index={2}
            style={{ width: "65%", marginRight: "auto", marginLeft: "auto" }}
          >
            {/* title */}
            <p
              className="text-3xl font-semibold text-gray-700 mb-8"
              component="h1"
            >
              Change password
            </p>

            <form>
              <div className="mt-[40px] mb-8">
                <p className="text-gray-400">Current password</p>
                <TextField
                  name="password"
                  type="password"
                  error={errors && errors.currentPassword ? true : false}
                  helperText={errors && errors.currentPassword}
                  value={values.password}
                  onChange={handleFormDataChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </div>

              <div className=" mb-8">
                <p className="text-gray-400">New password</p>
                <TextField
                  name="password1"
                  type="password"
                  error={errors && errors.newPassword ? true : false}
                  helperText={errors && errors.newPassword}
                  value={values.password1}
                  onChange={handleFormDataChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </div>

              <div className=" mb-8">
                <p className="text-gray-400">Confirm new password</p>
                <TextField
                  name="password2"
                  type="password"
                  error={errors && errors.newPassword2 ? true : false}
                  helperText={errors && errors.newPassword2}
                  value={values.password2}
                  onChange={handleFormDataChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </div>

              {updatingPassword ? (
                <div className="flex items-center justify-end space-x-2">
                  <CircularProgress size={20} />
                  <p className="text-xs text-[#933a16]">
                    Updating your password...
                  </p>
                </div>
              ) : (
                <div className="flex justify-end items-center space-x-2">
                  <button
                    className="text-[#800000]"
                    onClick={handleCancelButtonClick}
                  >
                    Cancel
                  </button>

                  <button className="text-white bg-[#933a16] hover:bg-[#800000] p-2 rounded-md">
                    Update Profile
                  </button>
                </div>
              )}
            </form>
          </TabPanel>
        </div>
      </section>
    </div>
  );
}

export default SettngsComponent;
