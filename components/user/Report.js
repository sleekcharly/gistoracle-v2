import React, { useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { FlagIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import Login from "../auth/login";
import Signup from "../auth/signup";
import { CLEAR_ERRORS } from "../../redux/types/uiTypes";
import axios from "axios";
import { useSnackbar } from "notistack";

function Report({ postId, username, postTitle, userImage }) {
  // initialize component's state
  const [values, setValues] = useState({
    reason: "",
    explanation: "",
  });
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // define dispatch
  const dispatch = useDispatch();

  // setup snackbar from notistack
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        credentials: state.user.credentials,
      }),
      shallowEqual
    );
  };

  // destructure data
  const { credentials } = useStateParameters();

  // bring in auth context parameters
  const { login, signup, currentUser } = useAuth();

  // set theme
  const theme = useTheme();

  // set dialog to fullscreen on mobile devices
  const fullscreen = useMediaQuery(theme.breakpoints.down("xs"));

  // control data with state
  const handleChange = (event) => {
    event.persist();

    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  // handle report dialog open
  const handleReportOpen = () => {
    setOpen(true);
  };

  // handle report dialog close
  const handleReportClose = () => {
    setOpen(false);
    setValues((values) => ({
      ...values,
      reason: "",
      explanation: "",
    }));
  };

  // handle login button click
  const handleLoginClickOpen = () => {
    dispatch({ type: CLEAR_ERRORS });
    setSignupOpen(false);
    setLoginOpen(true);
  };

  // handle signup button click
  const handleSignupClickOpen = () => {
    dispatch({ type: CLEAR_ERRORS });
    setSignupOpen(true);
    setLoginOpen(false);
  };

  // handle login dialog close
  const handleLoginClose = () => {
    setLoginOpen(false);
    dispatch({ type: CLEAR_ERRORS });
  };

  // handle signup dialog close
  const handleSignupClose = () => {
    setSignupOpen(false);
    dispatch({ type: CLEAR_ERRORS });
  };

  // handle rporting user
  const handleSubmit = async (event) => {
    // prevent default action
    event.preventDefault();

    // set submitting state
    setSubmitting(true);

    // set up report object
    const report = {
      postId: postId,
      postCreator: username,
      postTitle: postTitle,
      postCreatorImage: userImage,
      reporter: credentials.username,
      reason: values.reason,
      explanation: values.explanation ? values.explanation : values.reason,
    };

    // perform submission
    await axios
      .post(`/api/user/submitReport`, report)
      .then((res) => {
        // run status snackbar
        enqueueSnackbar(res.data, {
          variant: "success",
          preventDuplicate: true,
        });

        setSubmitting(false);
      })
      .then(() => {
        handleReportClose();
      })
      .catch((err) => {
        // set loading state
        setSubmitting(false);

        console.error(err);
        console.log(err.message);
      });
  };

  return (
    <>
      <button
        className="flex text-[#933a16] items-center space-x-1 p-1 hover:bg-red-50 rounded-lg hover:text-[#800000] hover:font-semibold"
        onClick={currentUser ? handleReportOpen : handleSignupClickOpen}
      >
        <FlagIcon className="h-4 text-[#800000]" />
        <p className="text-xs ">Report</p>
      </button>

      {/* Report Dialog */}
      <Dialog
        open={open}
        onClose={handleReportClose}
        maxWidth="sm"
        fullScreen={fullscreen}
        aria-labelledby="report-dialog-title"
      >
        <DialogTitle id="report-dialog-title">
          <div className="flex items-center justify-between">
            <p>Report an issue</p>

            <button aria-label="close" onClick={handleReportClose}>
              <XIcon className="h-5 text-gray-600" />
            </button>
          </div>
          <Divider />
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            We appreciate you taking time to promote a better online
            environment. Tell us what is happening and we'll address it. cheers!
          </DialogContentText>

          <FormControl component="fieldset">
            <RadioGroup
              aria-label="reason"
              name="reason"
              value={values.reason}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Violence"
                control={<Radio />}
                label="Violence"
              />
              <FormControlLabel value="Spam" control={<Radio />} label="Spam" />

              <FormControlLabel
                value="Threatening state or public security"
                control={<Radio />}
                label="Threatening state or public security"
              />

              <FormControlLabel
                value="Harassment"
                control={<Radio />}
                label="Harassment"
              />
              <FormControlLabel value="Hate" control={<Radio />} label="Hate" />

              <FormControlLabel
                value="Misinformation"
                control={<Radio />}
                label="Misinformation"
              />

              <FormControlLabel
                value="Expresses intentions of self-harm or suicide"
                control={<Radio />}
                label="Expresses intentions of self-harm or suicide"
              />

              <FormControlLabel
                value="Copyright violation"
                control={<Radio />}
                label="Copyright violation"
              />
            </RadioGroup>
          </FormControl>

          {values.reason && (
            <div className="mt-3">
              <TextField
                id="filled-textarea"
                name="explanation"
                value={values.explanation}
                onChange={handleChange}
                label="Optional: Tell us more about this"
                placeholder="Give further explanation on this report"
                multiline
                fullWidth
                variant="filled"
              />
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <button
            className="mr-2 p-2 bg-gray-200 rounded-lg hover:bg-red-50  hover:text-[#800000] hover:font-semibold"
            disabled={!values.reason || submitting}
            onClick={handleSubmit}
          >
            Submit
          </button>
          {submitting && (
            <div className="text-[#933a16]">
              <CircularProgress size={30} />
            </div>
          )}
        </DialogActions>
      </Dialog>

      {/* Authentication area */}
      <Login
        openLogin={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClickOpen={handleSignupClickOpen}
        login={login}
      />

      <Signup
        openSignup={signupOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClickOpen={handleLoginClickOpen}
        signup={signup}
      />
    </>
  );
}

export default Report;
