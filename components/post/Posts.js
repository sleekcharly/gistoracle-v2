import {
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import NextLink from "next/link";
import { ChatAlt2Icon, CubeIcon, TrashIcon } from "@heroicons/react/solid";
import numeral from "numeral";
import PostLikeButton from "./PostLikeButton";
import PostSaveButton from "./PostSaveButton";
import Report from "../user/Report";
import { MoreHoriz } from "@material-ui/icons";

function Posts({ post }) {
  // get theme for mediaquery
  const theme = useTheme();

  // set component state variables
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const handleEngagementClose = () => {
    setAnchorEl(null);
  };

  // destructure post paramters from redux state
  const {
    createdAt,
    userImage,
    username,
    postId,
    likes,
    commentCount,
    postThumbnail,
    title,
    slug,
    shrineName,
  } = post;

  // get auth context parameters
  const { login, signup, currentUser } = useAuth();

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        credentials: state.user.credentials,
      }),
      shallowEqual
    );
  };

  // destructure data
  const { credentials } = useStateParameters();

  // extend dayjs to human friendly format
  dayjs.extend(relativeTime);

  // set media query variables
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const miniTablet = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  // handle error from images
  const addDefaultSrc = (ev) => {
    ev.target.src = "/images/post-thumbnail-placeholder.png";
  };

  return (
    <div className=" relative flex border-[1px] bg-white border-[#ded9d9] border-opacity-40 rounded-md p-3 lg:pr-4 lg:pl-4 hover:border-gray-800 hover:border-opacity-70 ">
      <NextLink href={`/post/${shrineName}/${postId}/${slug}`} passHref>
        <span className="w-[90px] h-[70px] md:w-[105px] md:h-[90px] lg:w-[115px] lg:h-[104px] cursor-pointer">
          <img
            onError={addDefaultSrc}
            src={postThumbnail && postThumbnail}
            alt={title ? title : "post image"}
            className="w-full h-full object-cover rounded-md "
          />
        </span>
      </NextLink>

      <div className="ml-4 last:pb-0 w-full">
        <div className="flex items-center space-x-0 md:space-x-3 sm:mb-1">
          <div className="flex space-x-3 w-full md:w-auto">
            {/* post's username */}
            <NextLink href={`/user/${username}`} passHref>
              <p className="text-xs md:text-sm text-[#800000] mr-2 font-bold ">
                @{username}
              </p>
            </NextLink>

            {/* post's date */}
            <p className="text-xs md:text-sm text-black font-normal">
              {dayjs(createdAt).fromNow()}
            </p>
          </div>

          {/* post delete button */}
          {currentUser && username === credentials.username ? (
            <div className="flex items-center">
              <button className="text-[#933a16] md:ml-5">
                <TrashIcon className="h-5" />
              </button>
            </div>
          ) : null}
        </div>

        {/* post title */}
        <NextLink href={`/post/${shrineName}/${postId}/${slug}`} passHref>
          <p
            component="h1"
            className="text-sm md:text-base text-black font-semibold cursor-pointer"
          >
            {mobile
              ? title.length >= 178
                ? title.slice(0, 178) + "...."
                : title
              : title}
          </p>
        </NextLink>

        {/* post meta data */}
        <div className=" flex flex-col lg:flex-row lg:items-center lg:space-x-4 mt-2 lg:mt-4">
          <div className="flex items-center mb-2 lg:mb-0 p-1 hover:bg-red-50 rounded-lg hover:text-[#800000] hover:font-semibold">
            <CubeIcon className="h-4 text-[#800000]" />
            <NextLink href={`/shrine/${shrineName}`} passHref>
              <p className="text-xs text-[#933a16] cursor-pointer">
                {shrineName}
              </p>
            </NextLink>
          </div>

          {/* posts meta data engagement */}
          <div className="ml-[-12px] mt-[-15px] lg:mt-0 lg:ml-0 flex items-center justify-between md:justify-none md:space-x-6">
            <div className="flex items-center">
              <PostLikeButton postId={postId} />
              <p className="text-xs text-[#933a16]">
                {numeral(likes).format("0a")}
              </p>
            </div>

            <div className="flex items-center p-1 hover:bg-red-50 rounded-lg hover:text-[#800000] hover:font-semibold">
              <ChatAlt2Icon className="h-4 text-[#800000]" />
              <NextLink href={`/post/${shrineName}/${postId}/${slug}`} passHref>
                <p className="text-xs text-[#933a16] cursor-pointer ">
                  {numeral(commentCount).format("0a")}{" "}
                  {commentCount > 1 ? " comments" : " comment"}
                </p>
              </NextLink>
            </div>

            {/* save post */}
            {!mobile && (
              <div>
                <PostSaveButton postId={postId} />
              </div>
            )}

            {/* reporting */}
            {!mobile && (
              <Report
                postId={postId}
                username={username}
                postTitle={title}
                userImage={userImage}
              />
            )}

            {/* display if on mobile environment */}
            {mobile && (
              <div>
                <IconButton
                  aria-label="more engagement"
                  aria-controls="engagement-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreHoriz color="secondary" />
                </IconButton>

                <Menu
                  id="engagement-menu"
                  anchorEl={anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  keepMounted
                  open={open}
                  onClose={handleEngagementClose}
                >
                  <MenuItem>
                    <PostSaveButton postId={postId} />
                  </MenuItem>

                  <MenuItem>
                    <Report
                      postId={postId}
                      username={username}
                      postTitle={title}
                      userImage={userImage}
                    />
                  </MenuItem>
                </Menu>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
