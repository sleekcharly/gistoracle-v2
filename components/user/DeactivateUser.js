import React, { useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { BubbleChart, Close } from "@material-ui/icons";
import jwtDecode from "jwt-decode";
import { dataStore } from "../../firebase";
import axios from "axios";
import { useSnackbar } from "notistack";

function DeactivateUser({
  credentials,
  handleDeactivateClose,
  deactivateOpen,
  deleteUserCollection,
  checkPassword,
  logout,
  currentUser,
}) {
  // define component status
  const [deactivating, setDeactivating] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState(null);

  // set full width variable to set dialog to fullscreen on mobile devices
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  // setup snackbar from notistack
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  // handle closing the deactivate dialog
  const handleClose = () => {
    handleDeactivateClose();
    setCurrentPassword("");
    setError(null);
  };

  // handle form data change
  const handleChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  // handle account deactivation
  const handleSubmit = async (event) => {
    // prevent default submit action
    event.preventDefault();

    // get authentication token from local storage
    const token = localStorage.FBIdToken;

    // decode the token
    const decodedToken = jwtDecode(token);

    // if token is expired logout user and return to homepage
    if (decodedToken.exp * 1000 < Date.now()) {
      logout();

      // go to home page
      window.location.href = "/";
    } else {
      // proceed with account deactivation

      //set deactivating status
      setDeactivating(true);

      // check to see if password exists
      if (!currentPassword) {
        setError("Password is missing !");

        setDeactivating(false);

        return;
      }

      // get email and username from credentials
      const { email, username } = credentials;

      // set user credentials for reauthentication and deactivation of account
      let user = currentUser;
      let userCredentials = dataStore.auth.EmailAuthProvider.credential(
        email,
        currentPassword
      );

      //reauthenticate user before performing user deactivation
      await user
        .reauthenticateWithCredential(userCredentials)
        .then(async () => {
          console.log("password is authentic");

          // delete user collection if firestore
          // proceed with deleting user document in firebase
          await axios
            .post("/api/user/settings/delete")
            .then((res) => {
              console.log(res);
            })
            .then(async () => {
              await user
                .delete()
                .then(() => {
                  console.log("user deleted");
                  setDeactivating(false);

                  // run status snackbar
                  enqueueSnackbar(`${username} account deactivated`, {
                    variant: "success",
                    preventDuplicate: true,
                  });
                })
                .then(() => {
                  setTimeout(() => {
                    // delete authorization headers
                    localStorage.removeItem("FBIdToken");
                    delete axios.defaults.headers.common["Authorization"];

                    // navigate to home page
                    window.location.href = "/";
                  }, 3000);
                })
                .catch((err) => {
                  console.error(err);
                  return;
                });
            })
            .catch((err) => {
              console.error(err);
              console.log("failure to delete user collection");
              return;
            });
        })
        .catch((err) => {
          console.error(err);

          setError("Wrong password! please try again");
          setDeactivating(false);

          return;
        });
    }
  };

  return (
    <div>
      <Dialog
        open={deactivateOpen}
        onClose={handleDeactivateClose}
        aria-labelledby="deactivate-title"
        maxWidth="sm"
        fullWidth={mobile}
      >
        <DialogTitle
          disableTypography
          id="deactivate-title"
          className="flex items-center justify-between"
        >
          <p className={`text-gray-800 ${mobile ? "text-lg" : "text-xl"}`}>
            Deactivate Account
          </p>

          <IconButton aria-label="Cancel" onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />

        {/* content */}
        <DialogContent>
          <div className="mb-3 text-center md:flex md:items-center md:mb-6 md:space-x-2">
            {/*  user avatar */}
            <img
              alt={
                credentials.displayName
                  ? credentials.displayName
                  : credentials.username
              }
              src={credentials.imageUrl}
              className="w-[90px] h-[90px] mr-auto ml-auto md:mr-0 md:ml-0 mb-1 md:w-[110px] md:h-[110px] rounded-full object-cover"
            />

            {/* user details */}
            <div>
              {credentials.displayName ? (
                <p className="text-sm md:text-base text-[#933a16]">
                  {credentials.displayName}
                </p>
              ) : null}
              <p className="text-sm md:text-base text-[#933a16] font-semibold">
                @{credentials.username}
              </p>
            </div>
          </div>

          {/* account deactivation message */}
          <DialogContentText>
            <span className="flex items-center space-x-1 md:space-x-2">
              <BubbleChart />
              <span className="text-sm md:text-base">
                You are about to deactivate your account. If you are
                experiencing any issues, please contact us before deactivation.
              </span>
            </span>
          </DialogContentText>

          <DialogContentText>
            <span className="flex items-center space-x-1 md:space-x-2">
              <BubbleChart />
              <span className="text-sm md:text-base">
                Your account details may be still be available to popular search
                engines such as google.
              </span>
            </span>
          </DialogContentText>

          <DialogContentText>
            <span className="flex items-center space-x-1 md:space-x-2">
              <BubbleChart />
              <span className="text-sm md:text-base">
                Your posts and comments would still be available on Gist Oracle.
                You would have to delete them before account deactivation.
              </span>
            </span>
          </DialogContentText>

          <DialogContentText>
            <span className="text-sm md:text-base">😞 Sorry to see you go</span>
          </DialogContentText>

          <DialogContentText>
            <span className="text-xs md:text-base text-[#800000]">
              *Note: Deactivated accounts are not receoverable!
            </span>
          </DialogContentText>

          {/* password field section */}
          <form>
            <p className="text-xs md:text-base text-[#800000]">
              * Please enter your password {!mobile && "for security purposes"}{" "}
              !
            </p>

            <TextField
              fullWidth
              value={currentPassword}
              label="Password"
              onChange={handleChange}
              error={error ? true : false}
              helperText={error && error}
              variant="filled"
              type="password"
              style={{ fontSize: mobile && "0.7em" }}
            />
          </form>
        </DialogContent>

        {/* buttons */}
        {deactivating ? (
          <div className="flex items-center justify-end mt-5 mb-5 space-x-2 mr-5">
            <CircularProgress size={20} />
            <p className="text-xs font-semibold text-[#800000]">
              Deactivating account
            </p>
          </div>
        ) : (
          <DialogActions>
            <div className="flex items-center space-x-4 mr-5 text-sm md:text-base">
              <button
                type="text"
                className="text-[#800000] border border-[#800000] rounded-md py-1 px-2 hover:bg-[#933a16] hover:text-white transition-all"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={deactivating}
                className="text-white rounded-md bg-[#800000] hover:bg-opacity-40 font-semibold py-1 px-2 transition-all"
                onClick={handleSubmit}
              >
                Deactivate
              </button>
            </div>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}

export default DeactivateUser;
