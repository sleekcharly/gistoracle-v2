import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { shallowEqual, useSelector } from "react-redux";
import InnerComments from "./InnerComments";

function Comments() {
  // set date format to human readable format
  dayjs.extend(relativeTime);

  // define component state
  const [comments, setComments] = useState([]);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        postComments: state.data.postComments,
      }),
      shallowEqual
    );
  };

  // destructure postComments
  const { postComments } = useStateParameters();

  // load comments into state
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setComments(postComments);
    }

    return () => (mounted = false);
  }, [postComments]);

  return (
    <div className="w-auto">
      <div className="flex items-center space-x-8 mb-[25px]">
        <p className="text-[#800000] text-lg" component="h6">
          Comments
        </p>

        <hr className="bg-[#933a16] h-[4px] w-[85%]" />
      </div>

      {/* display list of comments */}
      <div className="p-0">
        {comments.length > 0 &&
          comments.map((comment, index) => {
            const {
              body,
              createdAt,
              userImage,
              username,
              likes,
              postId,
              commentPostId,
              commentId,
              comments,
            } = comment;

            return (
              <InnerComments
                body={body}
                createdAt={createdAt}
                userImage={userImage}
                likes={likes}
                username={username}
                key={createdAt}
                commentId={commentId}
                postId={postId}
                commentPostId={commentPostId}
                comments={comments}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Comments;
