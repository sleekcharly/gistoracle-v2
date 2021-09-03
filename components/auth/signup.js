import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useAuth } from "../../contexts/AuthContext";
import { shallowEqual, useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

function Signup({
  openSignup,
  handleSignupClose,
  handleLoginClickOpen,
  highlight,
}) {
  // set theme
  const theme = useTheme();

  // set full screen on mobile media query
  const fullscreen = useMediaQuery(theme.breakpoints.down("xs"));

  // bring in auth parameters
  const { login, signup } = useAuth();

  // set component state parameters
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // get redux state parameters
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        UIErrors: state.UI.signupErrors,
      }),
      shallowEqual
    );
  };

  // destructure errors from state
  const { UIErrors } = useStateParameters();

  //set errors if any exist
  useEffect(() => {
    let mounted = true;

    if (mounted) setErrors(UIErrors);

    return () => (mounted = false);
  }, [UIErrors]);

  // change loading state if errors exist
  useEffect(() => {
    if (errors) setLoading(false);
  }, [errors]);

  // handle closig of dialog
  const handleClose = () => {
    handleSignupClose();
  };

  // toggle display of password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // handle mouse down password
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // function to get user's location for fututr implementation
  const getLocation = async () => {
    // set location variable
    let location;

    // get user' location
    await axios
      .get(
        `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IPINFO_TOKEN}`
      )
      .then((response) => {
        location = response.data;
      })
      .catch((err) => {
        const errorMessage = (() => {
          if (err.response) {
            //The request was made and the server responded with a status code
            // that falls out of the 2xx range
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            return err.response.data;
          } else if (err.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request);
            return err.request;
          } else {
            //something happened in setting up the request that triggered the error
            console.log("Error", err.message);
            return err.message;
          }
        })();
      });

    return location;
  };

  // handle signup of users
  const handleSubmit = async (event) => {
    event.preventDefault();

    //set loading state
    setLoading(true);

    // extract new user location
    let userLocation = await getLocation();

    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      username: username,
      location: userLocation,
    };

    // signup user
    signup(newUserData);
  };

  return (
    <div>
      {/* signup dialog */}
      <Dialog
        open={openSignup}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullScreen={fullscreen}
      >
        <div className="flex flex-col md:flex-row space-x-2 w-[95%] ml-auto mr-auto ">
          <div className="m-auto w-[300px] sm:w-full">
            <DialogTitle id="form-dialog-title">
              <div className="relative mt-10 md:mt-0 flex w-[120px] h-[70px] md:w-[150px] md:h-[85px] items-center mr-auto ml-auto md:m-0 md:items-start">
                <Image
                  src="/images/gistoracle_logo.png"
                  alt="gistoracle logo"
                  layout="fill"
                  quality="100"
                />
              </div>
            </DialogTitle>

            <p className="font-semibold hidden sm:block mb-20">
              {highlight
                ? highlight
                : "Owning a Gist Oracle account gives you the opportunity to be heard and equipped with power to shake up your favourite shrines. "}
            </p>

            {/* tees and cees */}
            <p className="hidden sm:block text-xs sm:text-sm">
              By Signing up you agree to our{" "}
              <span className="text-blue-800">
                <a href="/terms" target="_blank">
                  Terms and conditions
                </a>
              </span>
              , and{" "}
              <span className="text-blue-800">
                <a href="/privacy" target="_blank">
                  Privacy policy
                </a>
              </span>
            </p>
          </div>

          {/* form section */}
          <div>
            <DialogContent>
              <p className="hidden md:block text-right mb-20">
                <em className="text-sm">ALready have an account?</em>
                <span>
                  <button
                    type="text"
                    className="text-[#800000] font-bold ml-5"
                    onClick={handleLoginClickOpen}
                  >
                    <em className="text-md">Login</em>
                  </button>
                </span>
              </p>

              {/* signup form  */}
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label="Email"
                  type="email"
                  name="email"
                  style={{ margin: "10px auto 10px auto" }}
                  error={errors && errors.email ? true : false}
                  helperText={errors && errors.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />

                <TextField
                  margin="dense"
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  style={{ margin: "10px auto 10px auto" }}
                  helperText={errors && errors.username}
                  error={errors && errors.username ? true : false}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  fullWidth
                />

                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
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
                    <Typography variant="caption" color="primary">
                      {errors && errors.password}
                    </Typography>
                  </FormHelperText>
                </FormControl>

                <FormControl style={{ width: "100%" }}>
                  <InputLabel htmlFor="confirmPassword">
                    Confirm Password
                  </InputLabel>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmPassword"
                    error={errors && errors.confirmPassword ? true : false}
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
                    <Typography variant="caption" color="primary">
                      {errors && errors.confirmPassword}
                    </Typography>
                  </FormHelperText>
                </FormControl>

                {errors && errors.general && (
                  <p className="mt-[10px] text-sm text-[#800000]">
                    {errors.general}
                  </p>
                )}

                {/* tees and cees */}
                <p className="md:hidden text-xs sm:text-sm">
                  By Signing up you agree to our{" "}
                  <span className="text-blue-800">
                    <a href="/terms" target="_blank">
                      Terms and conditions
                    </a>
                  </span>
                  , and{" "}
                  <span className="text-blue-800">
                    <a href="/privacy" target="_blank">
                      Privacy policy
                    </a>
                  </span>
                </p>

                {/* action buttons */}
                <div className="mt-8 md:mt-3 mb-3">
                  <DialogActions>
                    {/* close signup dialog */}
                    <Button
                      color="primary"
                      variant="text"
                      style={{ position: "relative", marginTop: 20 }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>

                    {/* signup button */}
                    <Button
                      type="submit"
                      color="primary"
                      disabled={loading}
                      variant="contained"
                      style={{ position: "relative", marginTop: 20 }}
                    >
                      Signup
                      {loading && (
                        <CircularProgress
                          style={{ position: "absolute" }}
                          size={30}
                        />
                      )}
                    </Button>
                  </DialogActions>
                </div>

                <p className="md:hidden text-right text-sm">
                  <em>Already have an account?</em>
                  <span>
                    <button
                      type="text"
                      className="text-[#800000] font-bold ml-5"
                      onClick={handleLoginClickOpen}
                    >
                      <em className="text-md">Login</em>
                    </button>
                  </span>
                </p>
              </form>
            </DialogContent>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Signup;
