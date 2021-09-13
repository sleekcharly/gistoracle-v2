// this component houses individual comment replies

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReplyContent from "./ReplyContent";

function Replies({ commentId }) {
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
  }, []);

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
            <div key={createdAt}>
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
