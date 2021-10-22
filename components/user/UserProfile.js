import { Dialog, Divider } from "@material-ui/core";
import {
  CakeOutlined,
  Edit,
  ExpandLess,
  FlareOutlined,
  HighlightOff,
} from "@material-ui/icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import MyButton from "../MyButton";

function UserProfile({ username }) {
  // set up dispatch
  const dispatch = useDispatch();

  // set component state parameters
  const [consecratedDisplay, setConsecratedDisplay] = useState("flex");
  const [consecratedContainerDisplay, setConsecreatedContainerDisplay] =
    useState("hidden");
  const [openImage, setOpenImage] = useState(false);

  // *** get redux state parameters ***//
  const useStateParameters = () => {
    return useSelector(
      (state) => ({
        credentials: state.user.userPageProfile.credentials,
        userCredentials: state.user.credentials,
      }),
      shallowEqual
    );
  };

  // destructure redux parameters
  const { credentials, userCredentials } = useStateParameters();

  //destructure credentials parameters
  const {
    createdAt,
    imageUrl,
    about,
    vibrations,
    displayName,
    createdShrines,
    consecratedShrines,
  } = credentials;

  // handle image preview open
  const handleImageOpen = () => {
    setOpenImage(true);
  };

  // handle image preview close
  const handleImageClose = () => {
    setOpenImage(false);
  };

  // handle editing of profile picture
  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  // handle Image Change
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    // this.props.uploadImage(formData, this.props.username);
  };

  // handle display of consecrated button
  const handleConsecratedClick = () => {
    setConsecratedDisplay("hidden");
    setConsecreatedContainerDisplay("block");
  };

  // handle closing of consecrated shrines list
  const handleConsecratedClose = () => {
    setConsecreatedContainerDisplay("hidden");
    setConsecratedDisplay("flex");
  };

  // define profile markup
  let profileMarkup = (
    <div className="bg-white rounded-sm p-5">
      <div className="relative">
        <div className="text-center relative">
          <img
            src={imageUrl}
            alt={username}
            onClick={handleImageOpen}
            className="cursor-pointer object-cover w-[75px] h-[75px] xl:w-[85px] xl:h-[85px] rounded-full mr-auto ml-auto"
          />

          {/* image input */}
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={handleImageChange}
          />

          {/* edit button */}
          {username === userCredentials.username ? (
            <div className="absolute top-[45px] right-[65px] 2xl:right-[34%]">
              <MyButton
                tip="Change profile picture"
                onClick={handleEditPicture}
              >
                <Edit color="secondary" />
              </MyButton>
            </div>
          ) : null}

          {/* display name */}
          {displayName && <p className="text-[#933a16] mt-1">{displayName}</p>}

          {/* username */}
          <p className="text-[#933a16] text-xs font-semibold">@{username}</p>

          {/* user bio */}
          {about && <p className="text-gray-700 text-sm mt-5">{about}</p>}

          {/* metrics */}
          <div className="flex items-center justify-between mt-3 mb-5">
            <div>
              <div className="flex flex-col space-y-1 text-left">
                <p className="text-xs text-gray-700 font-semibold">
                  Vibrations
                </p>
                <div className="flex items-center space-x-1">
                  <FlareOutlined fontSize="small" color="secondary" />
                  <p className="text-gray-700 text-xs">{`${Math.round(
                    vibrations
                  )}`}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-1 text-left">
                <p className="text-xs text-gray-700 font-semibold">
                  Initiation
                </p>
                <div className="flex items-center space-x-1">
                  <CakeOutlined fontSize="small" color="secondary" />
                  <p className="text-gray-700 text-xs">
                    {dayjs(createdAt).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* consecrated button */}
          {createdShrines && createdShrines.length > 0 ? (
            <button
              className={`text-xs 2xl:text-base cursor-pointer text-[#933a16] ${consecratedDisplay} mr-auto ml-auto mt-2 hover:bg-red-100 py-1 px-2 rounded-md`}
              onClick={handleConsecratedClick}
            >
              Consecrated shrines ({createdShrines.length})
            </button>
          ) : null}

          {/* consecrated shrines component */}
          {createdShrines && createdShrines.length > 0 ? (
            <div
              className={`${consecratedContainerDisplay} relative text-center mt-4`}
            >
              <div className="flex flex-wrap justify-center">
                {consecratedShrines.map((shrine, i) => (
                  <a
                    key={shrine.shrineId}
                    href={`/shrine/${shrine.name}`}
                    className="py-1 px-2 border border-gray-700 rounded-md text-xs 2xl:text-base text-gray-700 mr-[5px] mb-[7px] hover:bg-gray-200 hover:font-semibold transition-all"
                  >
                    {shrine.name}
                  </a>
                ))}
              </div>

              {/* close button */}
              <button
                className="py-1 px-4 text-[#933a16] text-sm border border-[#933a16] rounded-md mt-4 hover:bg-[#933a16] hover:text-white transition-all"
                onClick={handleConsecratedClose}
              >
                <ExpandLess />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Image preview */}
      <Dialog open={openImage} onClose={handleImageClose} maxWidth="md">
        <div className="relative">
          <button
            aria-label="close"
            onClick={handleImageClose}
            className="p-2 rounded-full hover:bg-gray-100 text-[#800000] absolute right-1 top-1"
          >
            <HighlightOff fontSize="large" />
          </button>

          <img
            src={imageUrl}
            alt={username}
            className="w-[400px] h-auto object-cover"
          />
        </div>
      </Dialog>

      {/* edit profile button */}
    </div>
  );

  return profileMarkup;
}

export default UserProfile;
