// comments container
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import { replyToComment } from "../../redux/actions/dataActions";
import {
  CLEAR_LOGIN_ERRORS,
  CLEAR_REPLY_FORM_ERRORS,
  CLEAR_SIGNUP_ERRORS,
} from "../../redux/types/uiTypes";
import { Avatar, TextField } from "@material-ui/core";
import { MessageOutlined, Reply } from "@material-ui/icons";
import MyButton from "../MyButton";
import numeral from "numeral";
import Replies from "./Replies";

function InnerComments({
  commentId,
  commentPostId,
  createdAt,
  userImage,
  username,
  body,
  comments,
}) {
  // define components state
  //   const [comments, setComments] = useState([]);
  const [comment, setComment] = useState(null);
  const [formBody, setFormBody] = useState("");
  const [errors, setErrors] = useState({});
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [replyFormOpen, setReplyFormOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(false);
  const [loading, setLoading] = useState(false);

  // establish authentication
  const { currentUser } = useAuth();

  // define dispatch
  const dispatch = useDispatch();

  // format date in user readable format
  dayjs.extend(relativeTime);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        UIErrors: state.UI.replyFormErrors,
        replySent: state.UI.replySent,
      }),
      shallowEqual
    );
  };

  // destructure errors from state
  const { UIErrors, replySent } = useStateParameters();

  // Set errors if errors exist
  useEffect(() => {
    let mounted = true;

    if (mounted) setErrors(UIErrors);

    return () => (mounted = false);
  }, [UIErrors]);

  // reset body if comment is successfully posted and set loading to false
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      replySent && setBody("");
      replySent && setLoading(false);
      replySent && handleReplyFormClose();
    }

    return () => (mounted = false);
  }, [replySent]);

  // control comment form value with state
  const handleChange = (event) => {
    setFormBody(event.target.value);
  };

  // handle opening of comment form
  const handleReplyFormOpen = () => {
    // conditional on current user
    currentUser ? setReplyFormOpen(false) : setSignupOpen(true);
  };

  // handle closing of comment form
  const handleReplyFormClose = () => {
    setReplyFormOpen(true);
    dispatch({ type: CLEAR_REPLY_FORM_ERRORS });
  };

  // handle opening of signup dialog
  const handleSignupOpen = () => {
    setSignupOpen(true);
    setLoginOpen(false);
    dispatch({ type: CLEAR_SIGNUP_ERRORS });
  };

  // handleclosing of signup dialog
  const handleSignupClose = () => {
    setSignupOpen(false);
  };

  // handle opening of login dialog from button click
  const handleLoginOpen = () => {
    dispatch({ type: CLEAR_LOGIN_ERRORS });
    setLoginOpen(true);
    setSignupOpen(false);
  };

  // handle closing of login dialog
  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  // handle submitting of reply
  const handleSubmit = async (event) => {
    // prevent default submit behavior
    event.preventDefault();

    //set loading state
    setLoading(true);

    // set content type for layering
    const content = "reply1";

    // reply to comment action
    await dispatch(
      replyToComment(commentId, content, {
        body: formBody,
        commentPostId: commentPostId,
      })
    );
  };

  // markup for reply form
  const replyForm = (
    <div className={`w-auto ${replyFormOpen && "hidden"}`}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="formBody"
          type="text"
          label="Reply to comment"
          error={errors && errors.commentReply ? true : false}
          helperText={errors && errors.commentReply}
          value={formBody}
          onChange={handleChange}
          variant="outlined"
          multiline
          fullWidth
          placeholder="What are your thoughts?"
        />

        {/* form actions */}

        <div className=" text-right mt-[20px]">
          <button
            className="uppercase text-[#800000] text-sm  mr-2 px-4 py-0 h-10 rounded-md w-auto border border-[#933a16] border-opacity-80 hover:bg-[#933a16] hover:text-white"
            onClick={handleReplyFormClose}
          >
            Cancel
          </button>

          <button className="relative text-[#fafafa] text-sm font-bold border rounded-md uppercase bg-[#933a16] h-10 w-[80px] px-4 py-0 hover:bg-[#800000]">
            Reply
          </button>
        </div>
      </form>
    </div>
  );

  console.log(comments);

  // markup for display of comments under a comment
  const commentReplies =
    comments > 0 ? <Replies commentId={commentId} /> : null;

  return (
    <div className="mb-7 bg-[#faefed] p-1 sm:p-3 sm:mb-8 rounded-[7px]">
      {/* userInfo */}
      <div className="flex items-center space-x-4 w-auto break-words">
        <Avatar
          alt={username}
          src={userImage}
          className="mr-2 w-[40px] h-[40px] "
        />

        {/* username */}
        <p className="text-xs sm:text-sm text-[#933a16]">@{username}</p>

        {/* date created */}
        <p className="text-black text-xs sm:text-sm">
          {dayjs(createdAt).fromNow()}
        </p>
      </div>

      {/* comment content */}
      <div>
        <p className="text-sm sm:text-base w-auto break-words text-gray-800">
          {body}
        </p>

        <div className="flex items-center">
          <MyButton tip="reply" onClick={handleReplyFormOpen}>
            <Reply
              color="secondary"
              fontSize="small"
              className="text-xs sm:text-sm"
            />
            <p className="text-sm text-[#933a16]">Reply</p>
          </MyButton>

          {comments > 0 ? (
            <div className="flex items-center ml-1">
              <MyButton tip="replies">
                <MessageOutlined
                  color="secondary"
                  fontSize="small"
                  className="text-xs sm:text-sm"
                />
              </MyButton>

              <p className="text-gray-800 ml-[-5px]">
                {numeral(comments).format("0a")}{" "}
                {comments > 1 ? "replies" : "reply"}
              </p>
            </div>
          ) : null}
        </div>

        {/* replyform */}
        <div className="ml-[10px]">{replyForm}</div>

        {commentReplies}
      </div>
    </div>
  );
}

export default InnerComments;
