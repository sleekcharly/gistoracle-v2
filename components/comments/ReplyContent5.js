import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Avatar } from "@material-ui/core";

function ReplyContent5({ body, createdAt, username, userImage }) {
  // format date in human readable format
  dayjs.extend(relativeTime);

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
      </div>
    </div>
  );
}

export default ReplyContent5;
