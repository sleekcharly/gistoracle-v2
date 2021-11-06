import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../contexts/AuthContext";
import NextLink from "next/link";
import { ChatAlt2Icon, CubeIcon, TrashIcon } from "@heroicons/react/solid";
import numeral from "numeral";
import PostLikeButton from "./PostLikeButton";
import PostSaveButton from "./PostSaveButton";
import Report from "../user/Report";
import { Close, MoreHoriz } from "@material-ui/icons";
import axios from "axios";
import { analytics } from "../../firebase";
import { useSnackbar } from "notistack";
import { DELETE_POST } from "../../redux/types/dataTypes";

function Posts({ post }) {
  // get theme for mediaquery
  const theme = useTheme();

  // set dispatch object
  const dispatch = useDispatch();

  // setup snackbar from notistack
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  // set component state variables
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deletingPost, setDeletingPost] = React.useState(false);

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
  const { currentUser } = useAuth();

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

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // handle error from images
  const addDefaultSrc = (ev) => {
    ev.target.src = "/images/post-thumbnail-placeholder.png";
  };

  // handle deleting of post
  const handleDeletePost = async () => {
    // set deleting state
    setDeletingPost(true);

    await axios
      .delete(`/api/posts/delete/${postId}`)
      .then((res) => {
        // log analytics for post deletion
        analytics().logEvent("post_delete", { postId: postId });

        // run status snackbar
        enqueueSnackbar(res.data, {
          variant: "success",
          preventDuplicate: true,
        });
      })
      .then(() => {
        dispatch({ type: DELETE_POST, payload: postId });

        setDeletingPost(false);

        handleDialogClose();
      })
      .catch((err) => {
        console.error(err);
        setDeletingPost(false);
      });
  };

  return (
    <div className=" relative flex border-[1px] bg-white border-[#ded9d9] border-opacity-40 rounded-md p-3 lg:pr-4 lg:pl-4 hover:border-gray-800 hover:border-opacity-70 ">
      <NextLink href={`/post/${shrineName}/${postId}/${slug}`} passHref>
        <span className="w-[130px] md:w-[150px] lg:w-[200px]">
          <img
            onError={addDefaultSrc}
            src={postThumbnail && postThumbnail}
            alt={title ? title : "post image"}
            className="w-full h-[104px] md:h-[120px] lg:h-[140px] object-cover rounded-md cursor-pointer"
          />
        </span>
      </NextLink>

      <div className="ml-4 last:pb-0 w-full">
        <div className="flex items-center space-x-0 md:space-x-3 sm:mb-1">
          <div className="flex space-x-3 w-full md:w-auto">
            {/* post's username */}
            <NextLink href={`/user/${username}`} passHref>
              <p className="text-xs md:text-sm text-[#800000] mr-2 font-bold cursor-pointer">
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
              <button className="text-[#933a16] md:ml-5" onClick={handleDelete}>
                <TrashIcon className="h-5" />
              </button>
            </div>
          ) : null}

          {/* Detele post dialog */}
          <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="sm">
            <DialogTitle>
              <div className="flex items-center">
                <p className="flex-grow font-semibold text-black">
                  Delete post?
                </p>
                <IconButton onClick={handleDialogClose}>
                  <Close />
                </IconButton>
              </div>
            </DialogTitle>

            <DialogContent dividers>
              <p className="text-black">
                This action can't be undone. This post would be removed from
                your profile and any shrine associated with it. Are you sure you
                want to do this?
              </p>
            </DialogContent>

            <DialogActions>
              <div className="flex space-x-4">
                <button
                  className="border border-[#933a16] border-opacity-80 text-black px-4 py-2 w-auto rounded-md hover:bg-[#933a16] hover:text-white"
                  onClick={handleDialogClose}
                >
                  Cancel
                </button>

                <button
                  className="bg-[#933a16] text-white px-4 py-2 w-auto rounded-md hover:bg-[#800000]"
                  onClick={handleDeletePost}
                >
                  Delete
                </button>

                {deletingPost && (
                  <div className="text-[#933a16]">
                    <CircularProgress size={30} />
                  </div>
                )}
              </div>
            </DialogActions>
          </Dialog>
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
