import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  useMediaQuery,
} from "@material-ui/core";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
// Import Sun Editor's CSS File
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";
import slugify from "slugify";
import axios from "axios";
import { analytics } from "../../firebase";

// dynamically import Suneditor
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

function EditPost() {
  // get Authorization token from browser local storage
  const token = window.localStorage.getItem("FBIdToken");

  // get decoded token
  let decodedToken = null;

  if (token) {
    decodedToken = jwtDecode(token);
  }

  // initialize state
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postId, setPostId] = useState("");
  const [shrineName, setShrineName] = useState("");
  const [postThumbnails, setPostThumbnails] = useState([]);
  const [postThumbnail, setPostThumbnail] = useState("");
  const [editingPost, setEditingPost] = useState(false);
  const [errors, setErrors] = useState({});

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        post: state.data.post,
      }),
      shallowEqual
    );
  };

  // destructure post from redux
  const { post } = useStateParameters();

  // map redux state to component state
  const mapPostDetailsToState = (post) => {
    setTitle(post.title);
    setBody(post.body);
    setPostThumbnail(post.postThumbnail);
    setPostId(post.postId);
    setShrineName(post.shrineName);
  };

  // set theme
  const theme = useTheme();

  // define media breakpoint
  const fullscreen = useMediaQuery(theme.breakpoints.down("md"));

  // function to open edit post dialog
  const handleOpen = (event) => {
    event.preventDefault();
    // set component state data from redux state
    mapPostDetailsToState(post);

    setOpen(true);
  };

  // function to close edit post
  const handleClose = (event) => {
    event.preventDefault();
    setEditingPost(false);
    setOpen(false);
    setErrors({});
  };

  // handling title change
  const handleChange = (event) => {
    event.persist();

    if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
      // reload page
      window.location.reload();
    }

    setTitle(event.target.value);
  };

  // handle editor data change
  const handleEditorChange = (content) => {
    if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
      // reload page
      window.location.reload();
    }

    const data = content;

    setBody(data);
  };

  // handle suneditor image upload
  const handleImageUpload = (imageInfo, targetImgElemet) => {
    imageInfo && imageInfo.src
      ? setPostThumbnails([...postThumbnails, imageInfo.src])
      : setPostThumbnails([]);
  };

  //   handle submit
  const handleSubmit = (event) => {
    // prevent form submit default functionality
    event.preventDefault();

    // set editing state
    setEditingPost(true);

    // create slugString
    const slugString = title.substr(0, 50);

    // set address slug wit post title
    const slug = slugify(slugString, "_");

    // cancel submit if there is no body for the post
    if (body === "") {
      setErrors((errors) => ({
        ...errors,
        body: "Please create content for your post !!",
      }));

      setEditingPost(false);

      return;
    }

    // define edited post details
    const editedPostDetails = {
      title: title,
      slug: slug,
      body: body,
      postThumbnail:
        postThumbnails.length > 0 ? postThumbnails[0] : postThumbnail,
      postId: postId,
    };

    // create post operation
    axios
      .post("/api/posts/edit", editedPostDetails)
      .then(() => {
        // log analytics on post creation
        analytics().logEvent("edit_post");

        // clear errors
        setErrors({});

        setEditingPost(false);

        // go to category page
        window.location.href = `/post/${shrineName}/${editedPostDetails.postId}/${editedPostDetails.slug}`;
      })
      .catch((err) => {
        console.error(err);
        setEditingPost(false);
      });
  };

  return (
    <div className="flex items-center">
      <button
        className="text-[#933a16] px-4 border border-[#933a16] rounded-md text-xs uppercase hover:bg-[#ffdedb]"
        onClick={handleOpen}
      >
        Edit
      </button>

      {/* Edit Form dialog component */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen={fullscreen}
        maxWidth="lg"
      >
        {/* post title */}
        <p
          className="text-[#933a16] text-lg xl:text-2xl font-semibold w-[96%] mr-auto ml-auto text-center border border-b-4 border-b-[#cc6c6c] rounded-md bg-[#ebebeb]"
          component="h5"
        >
          Edit Post
        </p>

        {/* main section */}
        <DialogContent>
          <form onSubmit={handleSubmit}>
            {/* title and title characters counter */}
            <TextField
              name="title"
              value={title.slice(0, 249)}
              label="Title"
              type="text"
              placeholder="Post Title"
              variant="outlined"
              style={{ marginTop: "25px" }}
              onChange={handleChange}
              fullWidth
              size="small"
              required
            />
            <p className="text-gray-700 font-semibold text-xs flex justify-end">
              {title.length} / {250 - title.length} {title.length >= 250 && "!"}
            </p>

            {/* suneditor as home of post body */}
            <div className="mt-10">
              <SunEditor
                setContents={body}
                height="auto"
                setOptions={{
                  buttonList: [
                    // Default

                    [
                      "font",
                      "fontSize",
                      "formatBlock",
                      "paragraphStyle",
                      "blockquote",
                      "bold",
                      "italic",
                      "strike",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                      "list",
                      "table",
                      "link",
                      "image",
                      "video",
                      "audio",
                      "codeView",
                    ],
                    // (min-width:992px)
                    [
                      "%992",
                      [
                        ["bold", "italic", "link", "strike", "superscript"],
                        [
                          ":p-More Paragraph-default.more_paragraph",
                          "font",
                          "fontSize",
                          "formatBlock",
                        ],
                        ["list", "blockquote", "align"],
                        ["table", "video", "image", "audio", "codeView"],
                      ],
                    ],
                    // (min-width:768px)
                    [
                      "%768",
                      [
                        ["bold", "italic", "link", "strike", "superscript"],
                        [
                          ":p-More Paragraph-default.more_paragraph",
                          "font",
                          "fontSize",
                          "formatBlock",
                        ],
                        ["list", "blockquote", "align"],
                        ["table", "video", "image", "audio", "codeView"],
                      ],
                    ],
                  ],
                  imageUploadHeader: { Authorization: token },
                  defaultStyle: "font-family: verdana; font-size: 16px",

                  imageUploadUrl: "/api/posts/upload/postThumbnail",
                  imageAccept: ".jpg, .jpeg, .webp, .png, .tiff",
                  showPathLabel: false,
                }}
                onChange={handleEditorChange}
                onImageUpload={handleImageUpload}
              />
            </div>

            {/* body error message */}
            {errors && errors.body && (
              <p className="text-sm text-[#933a16]">{errors.body}</p>
            )}

            <DialogActions>
              <div className="flex items-center space-x-2">
                <button
                  className="text-[#800000] py-1 px-3 border border-[#800000] rounded-md hover:bg-[#ffdedb] transition-all uppercase"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  className="text-white py-1 px-3 rounded-md bg-[#933a16] hover:bg-[#800000] transition-all uppercase"
                  type="submit"
                  disabled={editingPost}
                >
                  Edit post
                </button>

                {editingPost && (
                  <div className="flex items-center text-[#933a16]">
                    <CircularProgress size={30} />
                  </div>
                )}
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditPost;
