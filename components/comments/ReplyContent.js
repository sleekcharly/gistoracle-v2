import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { shallowEqual, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import { MessageOutlined, Reply } from "@material-ui/icons";
import MyButton from "../MyButton";
import numeral from "numeral";
import { useAuth } from "../../contexts/AuthContext";

function ReplyContent({ body, createdAt, username, comments, replyId }) {
  const [formBody, setFormBody] = useState("");
  const [errors, setErrors] = useState({});
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [replyFormOpen, setReplyFormOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(false);

  // format date in human readable format
  dayjs.extend(relativeTime);

  // get currentUser
  const { currentUser, login, signup } = useAuth();

  // get redux state parameters
  const useStateParameters = () => {
    //   get authenticated user
    return useSelector(
      (state) => ({
        UIErrors: state.UI.commentReplyFormErrors1,
      }),
      shallowEqual
    );
  };

  // destructure errors from state

  const { UIErrors } = useStateParameters();

  // set errors if any exist once received from state
  useEffect(() => {
    let mounted = true;

    if (mounted) setErrors(UIErrors);

    return () => (mounted = false);
  }, [UIErrors]);

  // handle opening of reply form
  const handleReplyFormOpen = () => {
    currentUser ? setReplyFormOpen(false) : setSignupOpen(true);
  };

  // handle form data change
  const handleChange = (event) => {
    setFormBody(event.target.value);
  };

  //   markup for reply form
  const replyForm = (
    <div className={`w-full ${replyFormOpen && "hidden"}`}>
      <form>
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
        <div className="text-right">
          <span className="flex space-x-2">
            <button className="border border-[#800000] border-opacity-40 text-[#800000] py-1 px-3 text-sm md:text-base">
              Cancel
            </button>

            <button className="bg-[#933a16] text-white py-1 px-3 text-sm md:text-base">
              Reply
            </button>
          </span>
        </div>
      </form>
    </div>
  );

  //   return content markup
  return (
    <div>
      {/* meta section */}
      <div className="flex items-center space-x-2">
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
            <p className="text-[#933a16] text-sm">Reply</p>
          </MyButton>

          {/* comments numbers */}
          <div className="flex items-center">
            {comments > 0 ? (
              <span>
                <MyButton tip="replies">
                  <MessageOutlined
                    color="secondary"
                    className="text-xs md:text-sm"
                  />
                </MyButton>
                <p>
                  {numeral(comments).format("0a")}{" "}
                  {comments > 1 ? " replies" : " reply"}
                </p>
              </span>
            ) : null}
          </div>
        </div>

        {/* reply form area */}
        {replyForm}
      </div>
    </div>
  );
}

export default ReplyContent;
