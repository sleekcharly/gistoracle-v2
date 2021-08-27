import React, { useEffect, useState } from "react";
import {
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
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Image from "next/image";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  CLEAR_RESET_PASSWORD_ERRORS,
  CLEAR_RESET_PASSWORD_STATUS,
} from "../../redux/types/uiTypes";
import { useAuth } from "../../contexts/AuthContext";
import ResetPassword from "./resetPassword";

function Login({ openLogin, handleLoginClose }) {
  // import media query and theme from material ui
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down("xs"));

  // define dispatch
  const dispatch = useDispatch();

  // define component state parameters
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);

  // get login function from auth context
  const { login } = useAuth();

  // toggle display of password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // handle mouse down password
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // get server-side rendered featured categories from redux state
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        UIErrors: state.UI.loginErrors,
        UIStatus: state.UI.resetPasswordStatus,
      }),
      shallowEqual
    );
  };

  // destructure errors from state
  const { UIErrors } = useStateParameters();

  // set errors if any exist once received from state
  useEffect(() => {
    setErrors(UIErrors);
    UIErrors && setloading(false);
  }, [UIErrors]);

  // function for opening reset dialog
  const handleResetOpen = () => {
    // handleLoginClose();
    dispatch({ type: CLEAR_RESET_PASSWORD_STATUS });
    dispatch({ type: CLEAR_RESET_PASSWORD_ERRORS });
    setResetOpen(true);
  };

  // function for closing reset dialog
  const handleResetClose = () => {
    setResetOpen(false);
  };

  // submit user data for login
  const handleSubmit = (event) => {
    event.preventDefault();
    setloading(true);

    const userData = {
      email: email,
      password: password,
    };

    // login user
    login(userData);
  };

  return (
    <div>
      <Dialog
        open={openLogin}
        onClose={handleLoginClose}
        fullScreen={fullscreen}
        maxWidth="sm"
        aria-labelledby="login-dialog-title"
        className="text-center m-auto"
      >
        <DialogTitle
          id="login-dialog-title"
          className="flex flex-col items-center"
        >
          <div className="relative w-[60px] h-[70px] lg:w-[70px] lg:h-[85px] mb-3 flex ">
            <Image
              src="/images/mobileLogo.png"
              alt="gistoracle logo"
              layout="fill"
              quality="100"
            />
          </div>
          <p className="font-bold text-2xl">Sign in</p>
        </DialogTitle>

        <DialogContent style={{ position: "relative" }}>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              name="email"
              error={errors && errors.email ? true : false}
              helperText={errors && errors.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <FormControl className="w-[100%]">
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
                <p className="text-sm text-[#800000]">
                  {errors && errors.password}
                </p>
              </FormHelperText>
            </FormControl>

            {errors && errors.general && (
              <p className="text-sm text-[#800000]">{errors.general}</p>
            )}

            <DialogActions>
              <button
                type="submit"
                disabled={loading}
                className={`relative text-[#fafafa] text-sm font-bold border rounded-md uppercase ${
                  loading ? "bg-gray-600" : "bg-[#933a16]"
                } h-10 w-[80px] px-4 py-0  mt-[20px]`}
              >
                Login
                {loading && (
                  <CircularProgress
                    size={30}
                    color="#933a16"
                    className="absolute top-1 right-5"
                  />
                )}
              </button>
            </DialogActions>
          </form>

          <button
            onClick={handleLoginClose}
            className="uppercase text-[#800000] text-sm mt-[20px] mr-2 absolute top-[130px] md:bottom-[85px] right-[120px]"
          >
            Cancel
          </button>

          <div className=" text-right">
            <button
              type="text"
              className="text-sm font-normal text-[#800000] mb-4"
              onClick={handleResetOpen}
            >
              Forgot password ?
            </button>
          </div>

          <div className="text-center text-sm font-normal">
            <em>New to Gist Oracle ?</em>
            <button
              type="text"
              className="font-bold uppercase text-[#800000]  px-4 py-0 "
            >
              Signup
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <ResetPassword
        resetOpen={resetOpen}
        handleResetClose={handleResetClose}
      />
    </div>
  );
}

export default Login;
