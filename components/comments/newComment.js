import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  CLEAR_LOGIN_ERRORS,
  CLEAR_SIGNUP_ERRORS,
} from "../../redux/types/uiTypes";
import { useAuth } from "../../contexts/AuthContext";
import { TextField, CircularProgress, Button } from "@material-ui/core";
import Login from "../auth/login";
import Signup from "../auth/signup";
import { commentOnPost } from "../../redux/actions/dataActions";

function NewComment({ postId }) {
  // initialize component's state
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // define dispatch
  const dispatch = useDispatch();

  // get currentUser
  const { currentUser, login, signup } = useAuth();

  // get redux state parameters
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        UIErrors: state.UI.createCommentErrors,
        postComment: state.data.commentOnPost,
      }),
      shallowEqual
    );
  };

  // destructure errors from state
  const { UIErrors, postComment } = useStateParameters();

  // set errors if any exist once received from state
  useEffect(() => {
    let mounted = true;

    if (mounted) setErrors(UIErrors);

    return () => (mounted = false);
  }, [UIErrors]);

  // change loading state if errors exist
  useEffect(() => {
    if (errors) setLoading(false);
  }, [errors, body]);

  //   clear form if comment posted is successful
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      postComment && setBody("");
      postComment && setLoading(false);
    }
  }, [postComment]);

  // handle form data change
  const handleChange = (event) => {
    setBody(event.target.value);
  };

  // handle opening of signup dialog
  const handleDialogOpen = () => {
    setOpen(true);
  };

  // handle opening of login dialod
  const handleLoginOpen = () => {
    dispatch({ type: CLEAR_LOGIN_ERRORS });
    setLoginOpen(true);
    setOpen(false);
  };

  // handle opening of sign up dialog
  const handleSignupOpen = () => {
    dispatch({ type: CLEAR_SIGNUP_ERRORS });
    setOpen(true);
    setLoginOpen(false);
  };

  // handle signup close
  const handleSignupClose = () => {
    setOpen(false);
  };

  // handle login close
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  // signup message
  const signupHighlight =
    "Signup to comment on your favourite post and engage with tonnes of posts by amazing oracles";

  // submit comment data
  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);
    dispatch(commentOnPost(postId, { body: body }));
  };

  // setup markup
  const commentFormMarkup = currentUser ? (
    <form onSubmit={handleSubmit} className="mb-[30px]">
      <TextField
        name="body"
        type="text"
        label="LEAVE A COMMENT"
        error={errors && errors.comment ? true : false}
        helperText={errors && errors.comment}
        value={body}
        onChange={handleChange}
        fullWidth
        multiline={true}
        variant="outlined"
        rows={6}
        placeholder="What are your thoughts?"
      />
      <div className="mt-[10px] text-right">
        <button
          type="submit"
          disabled={loading}
          className={`relative text-[#fafafa] text-sm font-bold border rounded-md uppercase ${
            loading ? "bg-gray-600" : "bg-[#933a16]"
          } h-10 w-auto px-4 py-0  mt-[20px]`}
        >
          POST COMMENT
          {loading && (
            <CircularProgress
              size={30}
              color="#933a16"
              className="absolute top-1 left-[55px]"
            />
          )}
        </button>
      </div>
    </form>
  ) : (
    <>
      <button
        onClick={handleDialogOpen}
        className="text-[0.9rem] text-white font-normal border rounded-md uppercase bg-[#933a16] h-10 w-auto px-4 py-0  mt-[20px] mb-[30px] hover:bg-[#800000]"
      >
        POST COMMENT
      </button>

      {/* suthentication dialogs */}
      <Login
        openLogin={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClickOpen={handleSignupOpen}
        login={login}
      />

      <Signup
        openSignup={open}
        handleSignupClose={handleSignupClose}
        handleLoginClickOpen={handleLoginOpen}
        signup={signup}
        highlight={signupHighlight}
      />
    </>
  );

  return commentFormMarkup;
}

export default NewComment;
