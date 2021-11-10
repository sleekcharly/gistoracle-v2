import { useEffect, useState } from "react";
import {
  IconButton,
  MenuItem,
  TextField,
  CircularProgress,
  Dialog,
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";

import { Menu } from "@material-ui/core";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import dynamic from "next/dynamic";

// Import Sun Editor's CSS File
import "suneditor/dist/css/suneditor.min.css";
import PostRules from "./PostRules";
import slugify from "slugify";
import axios from "axios";
import { SET_SHRINE } from "../../redux/types/dataTypes";
import { SELECT_SHRINE } from "../../redux/types/uiTypes";
import { analytics } from "../../firebase";

// dynamically import Suneditor
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

function CreatePostComponent({ shrineName }) {
  // initialize form state
  const [openRules, setOpenRules] = useState(false);
  const [values, setValues] = useState({
    title: "",
    shrineName: "",
  });
  const [postThumbnails, setPostThumbnails] = useState([]);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [creatingPost, setCreatingPost] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [componentShrine, setComponentShrine] = useState(null);

  // get Authorization token from browser local storage
  const token =
    typeof window !== "undefined" && window.localStorage.getItem("FBIdToken");

  // set dispatch
  const dispatch = useDispatch();

  // get decoded token
  let decodedToken = null;

  if (token) {
    decodedToken = jwtDecode(token);
  }

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        subscribedShrines: state.user.subscribedShrines,
      }),
      shallowEqual
    );
  };

  // destructure darkMode
  const { subscribedShrines } = useStateParameters();

  // sort usersubscribed shrine by name alphabetically
  const sortedShrines =
    subscribedShrines &&
    subscribedShrines.sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

  // set shrine name to components state if context contains shrine name
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      shrineName &&
        setValues((values) => ({
          ...values,
          shrineName: shrineName,
        }));
    }
  }, []);

  //get shrine once shrine name is set
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      values.shrineName &&
        axios
          .get(`/api/shrine/getShrine/${values.shrineName}`)
          .then((res) => {
            setComponentShrine(res.data);

            // update redux state
            dispatch({ type: SET_SHRINE, payload: res.data });

            // set shrine selected status
            dispatch({ type: SELECT_SHRINE });
          })
          .catch((err) => {
            console.log(err.message);
          });
    }
  }, [values.shrineName]);

  // handle closing of shrine name menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // handle open shrine name menu icon click
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // handle shrine name selection
  const handleMenuItemClick = (event, name) => {
    setValues((values) => ({
      ...values,
      shrineName: name,
    }));

    setAnchorEl(null);
    setErrors({});
  };

  const handleChange = (event) => {
    event.persist();

    if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
      // reload page
      window.location.href("/");
    }

    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditorChange = (content) => {
    const data = content;
    setBody(data);
  };

  const handleImageUpload = (imageInfo, targetImgElement, state) => {
    setPostThumbnails((arr) => [...arr, imageInfo ? imageInfo.src : ""]);
  };

  // function to open rules dialog
  const handleRulesOpen = () => {
    setOpenRules(true);
  };

  // function for closing rules dialog
  const handleRulesClose = () => {
    setOpenRules(false);
  };

  // submit post function
  const handleSubmit = (event) => {
    event.preventDefault();

    // clear form errors
    setErrors({});

    // set slug for post
    const slugString = values.title.substr(0, 50);
    const slug = slugify(slugString, "_");

    // set creatingPost
    setCreatingPost(true);

    // cancel submit if no shrineName is selected
    if (values.shrineName === "") {
      setErrors((errors) => ({
        ...errors,
        shrineName: "Please select a shrine for your post !!",
      }));

      setCreatingPost(false);

      return;
    }

    // cancel submit if there is no body for the post
    if (body === "") {
      setErrors((errors) => ({
        ...errors,
        body: "Please create content for your post !!",
      }));

      setCreatingPost(false);

      return;
    }

    // set post Details
    const postDetails = {
      title: values.title,
      slug: slug,
      body: body,
      shrineId: componentShrine.shrineId,
      postThumbnail: postThumbnails[0],
      shrineName: componentShrine.name,
      categoryName: componentShrine.categoryName,
      categoryId: componentShrine.categoryId,
    };

    console.log(postDetails);

    // create post operation
    axios
      .post("/api/posts/create", postDetails)
      .then(() => {
        // log analytics on post creation
        analytics().logEvent("create_post", { title: postDetails.title });

        // clear errors
        setErrors({});

        setCreatingPost(false);

        // go to category page
        window.location.href = `/category/${postDetails.categoryName}`;
      })
      .catch((err) => {
        setErrors(err.response.data);
        setCreatingPost(false);
      });
  };

  return (
    <div>
      {/* header */}
      <p
        className="text-center xl:text-lg 2xl:text-2xl font-semibold text-[#933a16] bg-[#ebebeb] border border-b-4 border-b-[#cc6c6c] rounded-md w-full mr-auto ml-auto"
        component="h1"
      >
        Create a Post
      </p>

      {/* form content */}
      <div className="w-full mt-5 ml-auto mr-auto">
        <form onSubmit={handleSubmit}>
          {/* shrine name section */}
          <div className="flex items-center justify-between w-44  border-b-[#ddd] border-b-2 pb-2">
            {values.shrineName ? (
              <p className="text-gray-700 text-sm">{values.shrineName}</p>
            ) : (
              <p className="text-[#858585] text-sm">Choose your shrine *</p>
            )}

            {/* menu click icon */}
            <IconButton
              aria-label="open followed shrines"
              aria-controls="followed shrine menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              size="small"
            >
              <KeyboardArrowDown fontSize="small" />
            </IconButton>
          </div>

          {/* errors display if any */}
          {errors && errors.shrineName ? (
            <p className="text-[#800000] text-xs 2xl:text-sm mt-1">
              {errors.shrineName}
            </p>
          ) : null}

          {/* drop doen menu with followed shrines detail */}
          <Menu
            id="followed-shrine-menu"
            anchorEl={anchorEl}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {sortedShrines.map((shrine) => (
              <MenuItem
                key={shrine.shrineId}
                onClick={(event) => handleMenuItemClick(event, shrine.name)}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={
                      shrine.avatar ? shrine.avatar : "/images/shrineAvatar.png"
                    }
                    alt={`${shrine.name} shrine avatar`}
                    className="w-8 h-8 xl:w-10 xl:h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-xs">{shrine.name}</p>
                    <p className="text-xs">
                      {shrine.followers}{" "}
                      {shrine.followers > 1 ? "followers" : "follower"}
                    </p>
                  </div>
                </div>
              </MenuItem>
            ))}
          </Menu>

          {/* title and title characters counter */}
          <TextField
            name="title"
            value={values.title.slice(0, 249)}
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
            {values.title.length} / {250 - values.title.length}{" "}
            {values.title.length >= 250 && "!"}
          </p>

          {/* editor */}
          <div className="mt-10">
            <SunEditor
              height="auto"
              width="auto"
              setContents={body}
              onChange={handleEditorChange}
              onImageUpload={handleImageUpload}
              onImageUploadError={(errorMessage, result, core) => {
                console.log(errorMessage, result);

                if (result.code === "auth/id-token-expired") {
                  alert("session expired, please roload page to continue");
                } else if (result.error === "wrong format") {
                  alert(result.errorMessage);
                } else {
                  alert("Image failed to upload !");
                }
              }}
              setOptions={{
                minHeight: "300",
                // Arrangement of buttons according to the screen size
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
                placeholder: "Please type here...",
                stickyToolbar: 60,
                imageUploadHeader: { Authorization: token },
                defaultStyle: "font-family: verdana; font-size: 14px",

                imageUploadUrl: "/api/posts/upload/postThumbnail",
                imageAccept: ".jpg, .jpeg, .webp, .png, .tiff",
                showPathLabel: false,
              }}
            />

            {/* body error message */}
            {errors && errors.body && (
              <p className="text-sm text-[#933a16]">{errors.body}</p>
            )}

            {/* post rules dialog for mobile devices */}
            <div className="lg:hidden flex items-center space-x-1 justify-end mt-2">
              <p className="text-gray-700 text-xs">
                By creating posts you agree to our
              </p>
              <p
                className="text-[#933a16] text-xs cursor-pointer font-semibold"
                onClick={handleRulesOpen}
              >
                Post rules
              </p>
            </div>

            {/* action post */}
            <div className="mt-3">
              {errors && errors.shrineName ? (
                <p className="text-xs text-red-700 text-right">
                  Please pick a shrine for your post !
                </p>
              ) : null}

              <div className="flex items-center space-x-2 justify-end">
                <button
                  className="text-sm bg-[#933a16] text-white font-semibold rounded-md px-6 py-2 hover:bg-[#800000] transition-all"
                  type="submit"
                  disabled={creatingPost}
                >
                  POST
                </button>
                {creatingPost && <CircularProgress size={30} />}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* rules dialog */}
      <Dialog open={openRules} onClose={handleRulesClose}>
        <PostRules />
      </Dialog>
    </div>
  );
}

export default CreatePostComponent;
