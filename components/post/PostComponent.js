import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Close,
  Delete,
  EmojiObjects,
  Facebook,
  MessageOutlined,
  Share,
  Twitter,
  WhatsApp,
} from "@material-ui/icons";
import NextLink from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth } from "../../contexts/AuthContext";
import EditPost from "./EditPost";
import { Skeleton } from "@material-ui/lab";
import PostLikeButton from "./PostLikeButton";
// suneditor
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import MyButton from "../MyButton";
import numeral from "numeral";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import Report from "../user/Report";
import NewComment from "../comments/newComment";
import Comments from "../comments/Comments";
import axios from "axios";
import { analytics } from "../../firebase";
import { useSnackbar } from "notistack";
import { DELETE_POST } from "../../redux/types/dataTypes";
// get suneditor without server side rendering
const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

function PostComponent({ postId, currentUrl }) {
  // bring in mui theme
  const theme = useTheme();

  // setup snackbar from notistack
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  // set component state
  const [loadingPost, setLoadingPost] = useState(true);
  const [post, setPost] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  // set state for delete dialog component
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [deletingPost, setDeletingPost] = React.useState(false);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        credentials: state.user.credentials,
        postData: state.data.post,
      }),
      shallowEqual
    );
  };

  // destructure darkMode
  const { credentials, postData } = useStateParameters();

  //   get post from redux once page loads
  useEffect(() => {
    let mounted = true;

    if (mounted) setPost(postData);

    return () => (mounted = false);
  }, [postData]);

  // set loading state when post is present
  useEffect(() => {
    post ? setLoadingPost(false) : set;
  }, [post]);

  // set date in human readable format
  dayjs.extend(relativeTime);

  // define media query variables for tablets and desktops
  const proTablets = useMediaQuery(theme.breakpoints.up("md"));
  const miniTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  // get authentication functions
  const { currentUser } = useAuth();

  // define dispatch
  const dispatch = useDispatch();

  // destructure post data
  const {
    title,
    body,
    createdAt,
    likes,
    shrineName,
    username,
    commentCount,
    postThumbnail,
    userImage,
  } = post;

  // function for opening share button
  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // function for closing share button menu
  const handleShareClose = (event) => {
    setAnchorEl(null);
  };

  // open delete dialog
  const handleDelete = () => {
    setDialogOpen(true);
  };

  // close delete dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
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

        window.history.back();
      })
      .catch((err) => {
        console.error(err);
        setDeletingPost(false);
      });
  };

  return (
    <article className="bg-white mt-[-8px] lg:mt-0 px-2 md:px-[55px] py-10 rounded-t-md">
      {/* post info section */}
      <section className="mb-[20px]">
        <div className="flex items-center justify-between lg:justify-start lg:space-x-12">
          <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-x-4">
            {/* shrine name */}
            <div className="flex items-center">
              <EmojiObjects color="secondary" />

              <NextLink href={`/shrine/${shrineName}`} passHref>
                <p className="text-[#800000] font-normal underline cursor-pointer">
                  {shrineName}
                </p>
              </NextLink>
            </div>

            {/* post info details */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center ">
                <p className="text-black text-xs">Posted by @</p>

                <NextLink href={`/user/${username}`} passHref>
                  <p className="text-[#800000] font-bold cursor-pointer">
                    {username}
                  </p>
                </NextLink>
              </div>

              <p className="text-xs text-[#933a16]">
                {dayjs(createdAt).fromNow()}
              </p>
            </div>
          </div>

          {/* post info action buttons */}
          <div className="flex items-center space-x-2">
            {/* edit post button */}
            {currentUser && username === credentials.username ? (
              <div className="flex items-center">
                <EditPost post={post} />
              </div>
            ) : null}

            {/* post delete button */}
            {currentUser && username === credentials.username ? (
              <div className="flex items-center">
                <Tooltip
                  title="Delete post"
                  placement="top"
                  onClick={handleDelete}
                >
                  <IconButton size="small" color="secondary">
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Dialog
                  open={dialogOpen}
                  onClose={handleDialogClose}
                  maxWidth="sm"
                >
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
                      This action can't be undone. This post would be removed
                      from your profile and any shrine associated with it. Are
                      you sure you want to do this?
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
                        <div className="text-[#933a16] flex items-center">
                          <CircularProgress size={30} />
                        </div>
                      )}
                    </div>
                  </DialogActions>
                </Dialog>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* load this section if post exists */}
      <section className="mb-6">
        <header className="mb-[10px]">
          {!loadingPost ? (
            // post title
            <p
              component="h1"
              className="text-base md:text-lg font-bold text-black"
            >
              {title}
            </p>
          ) : (
            <Skeleton animation="wave" variant="rect" width="80%" height={20} />
          )}
        </header>

        {/* post body with suneditor */}
        <div>
          {!loadingPost ? (
            <div>
              <SunEditor
                setContents={body}
                disable={true}
                showToolbar={false}
                height="auto"
              />
            </div>
          ) : (
            <Skeleton
              animation="wave"
              variant="rect"
              width={miniTablet ? "100%" : "80%"}
              height={500}
            />
          )}
        </div>

        {/* posts reactions */}
        {!loadingPost ? (
          <div className="flex items-center space-x-5">
            {/* comments */}
            <div className="flex space-x-0 items-center">
              <MyButton tip="comments">
                <MessageOutlined color="secondary" />
              </MyButton>
              <p className="text-black text-sm">
                {numeral(commentCount).format("0a")}{" "}
                {!mobile ? (commentCount > 1 ? "comments" : "comment") : null}
              </p>
            </div>

            {/* likes */}
            <div className="flex space-x-0 items-center">
              <PostLikeButton postId={postId} />
              <p className="text-black text-sm">
                {numeral(likes).format("0.a")}{" "}
                {!mobile ? (likes === 1 ? "like" : "likes") : null}
              </p>
            </div>

            {/* share to social media */}
            <div className="flex space-x-0 items-center">
              <MyButton tip="share" onClick={handleShareClick}>
                <Share color="secondary" />
              </MyButton>
              <p className="text-black text-sm">Share</p>

              {/* social media share icons */}
              <Menu
                id="social-media-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleShareClose}
              >
                {/* facebook */}
                <MenuItem onClick={handleShareClose}>
                  <FacebookShareButton
                    url={`https://www.gistoracle.com${currentUrl}`}
                  >
                    <Facebook size={30} />
                  </FacebookShareButton>
                </MenuItem>

                {/* twitter */}
                <MenuItem onClick={handleShareClose}>
                  <TwitterShareButton
                    url={`https://www.gistoracle.com${currentUrl}`}
                  >
                    <Twitter size={30} />
                  </TwitterShareButton>
                </MenuItem>

                {/* whatsapp */}
                <MenuItem onClick={handleShareClose}>
                  <WhatsappShareButton
                    url={`https://www.gistoracle.com${currentUrl}`}
                    title={title}
                    seperator=":: "
                  >
                    <WhatsApp size={30} />
                  </WhatsappShareButton>
                </MenuItem>
              </Menu>
            </div>

            {/* report  */}
            <Report
              postId={postId}
              username={username}
              postTitle={title}
              userImage={userImage}
            />
          </div>
        ) : (
          <Skeleton animation="wave" variant="rect" width="50%" height={20} />
        )}
      </section>

      {/* comments section */}
      <section className="mb-8">
        {/* new comments form */}
        <NewComment postId={postId} />

        {/* comments list */}
        {commentCount > 0 ? (
          <div>
            <Comments />
          </div>
        ) : null}
      </section>
    </article>
  );
}

export default PostComponent;
