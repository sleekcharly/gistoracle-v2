import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import Image from "next/image";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { sendResetEmail } from "../../redux/actions/userActions";
import { CLEAR_RESET_PASSWORD_ERRORS } from "../../redux/types/uiTypes";

function ResetPassword({ resetOpen, handleResetClose }) {
  //   console.log("reset password dialog");
  // define component state
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // dispatch action
  const dispatch = useDispatch();

  // get server-side rendered featured categories from redux state
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        UIErrors: state.UI.resetPasswordErrors,
        UIStatus: state.UI.resetPasswordStatus,
      }),
      shallowEqual
    );
  };

  // destructure errors from state
  const { UIErrors, UIStatus } = useStateParameters();

  // set errors if any exist
  useEffect(() => {
    setErrors(UIErrors);
    setLoading(false);
  }, [UIErrors]);

  // close resetpassword dialog
  if (UIStatus) {
    handleResetClose();
  }

  // submit email for password reset
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: CLEAR_RESET_PASSWORD_ERRORS });

    setLoading(true);

    const userData = {
      email: email,
    };

    dispatch(sendResetEmail(userData));
  };

  return (
    <div>
      <Dialog
        open={resetOpen}
        onClose={handleResetClose}
        aria-labelledby="reset-dialog-title"
        maxWidth="xs"
        className="m-auto text-center"
      >
        <div className="relative w-[60px] h-[70px] lg:w-[70px] lg:h-[85px] mb-3 mt-3 flex mr-auto ml-auto">
          <Image
            src="/images/mobileLogo.png"
            alt="gistoracle logo"
            layout="fill"
            quality="100"
          />
        </div>
        <DialogTitle id="reset-dialog-title">
          <p className="font-bold text-2xl">Reset Password</p>
        </DialogTitle>

        <DialogContent style={{ position: "relative" }}>
          <DialogContentText>
            Have you forgotten your password? No worries, we are here to help.
            Fill in your email and you will receive a link to reset your
            password. Cheers!
          </DialogContentText>
          <br />
          <br />

          <form noValidate onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              name="email"
              fullWidth
              error={errors && errors.email ? true : false}
              helperText={errors && errors.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

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
                Reset
                {loading && (
                  <CircularProgress
                    size={30}
                    color="secondary"
                    className="absolute top-1 right-5"
                  />
                )}
              </button>
            </DialogActions>
          </form>
          <button
            onClick={handleResetClose}
            className="uppercase text-[#800000] text-sm mt-[20px] mr-2 absolute bottom-7 right-[120px]"
          >
            Cancel
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ResetPassword;
