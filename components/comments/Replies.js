// this component houses individual comment replies

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReplyContent from "./ReplyContent";
import { shallowEqual, useSelector } from "react-redux";

function Replies({ commentId }) {
  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        commentReply: state.data.commentReply,
      }),
      shallowEqual
    );
  };

  // destructure errors from state
  const { commentReply } = useStateParameters();

  // define component's state
  const [comments, setComments] = useState([]);

  // retrieve comment replies and store in component's state
  useEffect(() => {
    // start subscription
    let mounted = true;

    axios
      .get(`/api/comment/getReplies/${commentId}`)
      .then((res) => {
        if (mounted) setComments(res.data);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.message);
      });

    // cleanup
    return () => (mounted = false);
  }, [commentReply]);

  return (
    <>
      {/* Map through the replies of a comment */}
      {comments &&
        comments.map((comment, index) => {
          const {
            body,
            createdAt,
            username,
            likes,
            replyId,
            commentId,
            commentPostId,
            comments,
            userImage,
          } = comment;

          //   return markup
          return (
            <div
              key={createdAt}
              className="px-1 py-1 sm:px-2 sm:py-2 border-l border-dotted border-l-[#cfcdca]"
            >
              <ReplyContent
                body={body}
                createdAt={createdAt}
                userImage={userImage}
                likes={likes}
                username={username}
                commentId={commentId}
                commentPostId={commentPostId}
                comments={comments}
                replyId={replyId}
              />
            </div>
          );
        })}
    </>
  );
}

export default Replies;
