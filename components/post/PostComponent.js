import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
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
// get suneditor without server side rendering
const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

function PostComponent({ post, postId, currentUrl }) {
  // bring in mui theme
  const theme = useTheme();

  // set component state
  const [loadingPost, setLoadingPost] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  // set loading state when post is present
  useEffect(() => {
    post ? setLoadingPost(false) : set;
  }, [post]);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        credentials: state.user.credentials,
      }),
      shallowEqual
    );
  };

  // destructure darkMode
  const { credentials } = useStateParameters();

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

  // load post comments
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // get post comments
      //   dispatch(getPostComments(postId));
    }

    return () => (mounted = false);
  }, []);

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

  // delete post handler
  const handleDelete = () => {};

  // function for opening share button
  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // function for closing share button menu
  const handleShareClose = (event) => {
    setAnchorEl(null);
  };

  return (
    <article className="bg-white p-5 rounded-t-md">
      {/* post info section */}
      <section className="relative mt-[20px] mb-[20px] md:flex md:items-center md:space-x-4">
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
        <div className="flex items-center">
          <p className="text-black text-xs">Posted by @</p>

          <NextLink href={`/user/${username}`} passHref>
            <p className="text-[#800000] font-bold cursor-pointer">
              {username}
            </p>
          </NextLink>

          <p className="text-xs text-[#933a16] ml-4">
            {dayjs(createdAt).fromNow()}
          </p>

          {/* edit post button */}
          {currentUser && username === credentials.username ? (
            <div>
              <EditPost post={post} />
            </div>
          ) : null}

          {/* post delete button */}
          {currentUser && username === credentials.username ? (
            <div className="ml-[30px]">
              <Tooltip
                title="Delete post"
                placement="top"
                onClick={handleDelete}
              >
                <IconButton size="small" color="secondary">
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          ) : null}
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
          <Skeleton animation="wave" variant="react" width="50%" height={20} />
        )}
      </section>

      {/* comments section */}
      <section>
        {/* new comments form */}
        <NewComment postId={postId} />

        {/* comments list */}
      </section>
    </article>
  );
}

export default PostComponent;
