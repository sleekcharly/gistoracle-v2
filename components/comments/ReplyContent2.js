import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Avatar, CircularProgress, TextField } from "@material-ui/core";
import { MessageOutlined, Reply } from "@material-ui/icons";
import MyButton from "../MyButton";
import numeral from "numeral";
import { useAuth } from "../../contexts/AuthContext";
import {
  CLEAR_COMMENT_REPLY_FORM_ERRORS_2,
  SET_COMMENT_REPLY_FORM_ERRORS_2,
  SET_REPLY_STATUS_2,
} from "../../redux/types/uiTypes";
import { SET_COMMENT_REPLY_2 } from "../../redux/types/dataTypes";
import Replies3 from "./Replies3";
import axios from "axios";
import { analytics } from "../../firebase";

function ReplyContent2({
  body,
  createdAt,
  username,
  comments,
  replyId,
  userImage,
  commentPostId,
}) {
  const [formBody, setFormBody] = useState("");
  const [errors, setErrors] = useState({});
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [replyFormOpen, setReplyFormOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(false);
  const [loading, setLoading] = useState(false);

  // format date in human readable format
  dayjs.extend(relativeTime);

  // get currentUser
  const { currentUser, login, signup } = useAuth();

  //   define dispatch
  const dispatch = useDispatch();

  // get redux state parameters
  const useStateParameters = () => {
    //   get authenticated user
    return useSelector(
      (state) => ({
        UIErrors: state.UI.commentReplyFormErrors2,
        commentReply: state.data.commentReply2,
      }),
      shallowEqual
    );
  };

  // destructure errors from state

  const { UIErrors, commentReply } = useStateParameters();

  // set errors if any exist once received from state
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setErrors(UIErrors);
      UIErrors && setLoading(false);
    }

    return () => (mounted = false);
  }, [UIErrors]);

  // reset body if comment is successfully posted and set loading to false
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      commentReply && setFormBody("");
      commentReply && setLoading(false);
      commentReply && handleReplyFormClose();
    }

    return () => (mounted = false);
  }, [commentReply]);

  // handle opening of reply form
  const handleReplyFormOpen = () => {
    currentUser ? setReplyFormOpen(false) : setSignupOpen(true);
  };

  //    handle closing of reply form
  const handleReplyFormClose = () => {
    setReplyFormOpen(true);
    setFormBody("");
    dispatch({ type: CLEAR_COMMENT_REPLY_FORM_ERRORS_2 });
  };

  // handle form data change
  const handleChange = (event) => {
    setFormBody(event.target.value);
  };

  //   handle submitting of form data
  const handleSubmit = (event) => {
    // prevent default form action
    event.preventDefault();

    // initiate loading state
    setLoading(true);

    // define replyData
    const replyData = { body: formBody, postId: commentPostId };

    // perform reply action
    axios
      .post(`/api/comment/replyToReply/${replyId}`, replyData)
      .then((res) => {
        dispatch({ type: SET_REPLY_STATUS_2 });
        dispatch({ type: SET_COMMENT_REPLY_2, payload: res.data });
        dispatch({ type: CLEAR_COMMENT_REPLY_FORM_ERRORS_2 });
        analytics().logEvent("comment_on_comment", { commentId: replyId });
        setFormBody("");
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

        // clear errors
        dispatch({
          type: SET_COMMENT_REPLY_FORM_ERRORS_2,
          payload: errorMessage,
        });
      });
  };

  //   markup for reply form
  const replyForm = (
    <div className={`w-full ${replyFormOpen && "hidden"}`}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="REPLY TO COMMENT"
          error={errors && errors.commentReply ? true : false}
          helperText={errors && errors.commentReply}
          value={formBody}
          onChange={handleChange}
          variant="outlined"
          multiline
          fullWidth
          placeholder="What are your thoughts?"
        />

        {/* buttons */}
        <div className="mt-3">
          <span className="flex justify-end space-x-2">
            <button
              type="reset"
              className="border border-[#800000] border-opacity-40 text-[#800000] hover:bg-[#933a16] hover:text-white py-1 px-3 text-sm md:text-base rounded-md"
              onClick={handleReplyFormClose}
            >
              CANCEL
            </button>

            <button
              type="submit"
              className={`bg-[#933a16] ${loading && "bg-opacity-40 "} hover:${
                !loading ? "bg-[#800000]" : "bg-opacity-40"
              }  text-white py-1 px-3 text-sm md:text-base rounded-md`}
              disabled={loading}
            >
              REPLY
            </button>

            {/* loading progress */}
            {loading && (
              <CircularProgress size={20} color="primary" className="ml-2" />
            )}
          </span>
        </div>
      </form>
    </div>
  );

  //   markup for display of replies under a reply
  const repliesToReply = comments > 0 ? <Replies3 commentId={replyId} /> : null;

  //   return content markup
  return (
    <div className="bg-[#edebe6] p-1 sm:p-3 rounded-md border border-[#a9c4c4]">
      {/* meta section */}
      <div className="flex items-center space-x-2">
        <Avatar
          alt={username}
          src={userImage}
          className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] "
        />

        <p className="text-[#933a16] text-[0.7em] md:text-sm">@{username}</p>

        <p className="text-xs text-black">{dayjs(createdAt).fromNow()}</p>
      </div>

      {/* reply content */}
      <div>
        <p className="w-full break-words text-sm md:text-base text-black">
          {body}
        </p>

        {/* reply content meta data and actions */}
        <div className="flex items-center">
          {/* reply button */}
          <MyButton tip="reply" onClick={handleReplyFormOpen}>
            <Reply
              color="secondary"
              fontSize="small"
              className="text-xs md:text-sm"
            />
            <p className="text-[#933a16] text-xs md:text-sm">Reply</p>
          </MyButton>

          {/* comments numbers */}
          <div className="flex items-center">
            {comments > 0 ? (
              <span className="flex items-center space-x-[-7px]">
                <MyButton tip="replies">
                  <MessageOutlined
                    color="secondary"
                    className="text-xs md:text-sm"
                  />
                </MyButton>
                <p className="text-black text-xs md:text-sm">
                  {numeral(comments).format("0a")}{" "}
                  {comments > 1 ? " replies" : " reply"}
                </p>
              </span>
            ) : null}
          </div>
        </div>

        {/* reply form area */}
        {replyForm}

        {/* display replies to reply */}
        {repliesToReply}
      </div>
    </div>
  );
}

export default ReplyContent2;
