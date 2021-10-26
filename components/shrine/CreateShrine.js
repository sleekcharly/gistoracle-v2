import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { CloseOutlined } from "@material-ui/icons";
// MUI icons
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import {
  FormControl,
  useMediaQuery,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  NativeSelect,
  FormHelperText,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { analytics } from "../../firebase";

function CreateShrine() {
  // set component states
  const [values, setValues] = useState({
    shrineName: "",
    categoryName: "",
    description: "",
  });
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [invalidImage, setInvalidImage] = useState(null);
  const [updatingShrine, setUpdateingShrine] = useState(false);

  // set theme
  const theme = useTheme();

  // set fullscreen for mobile devices
  const fullscreen = useMediaQuery(theme.breakpoints.down("sm"));

  // handle opening of dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // handle closing of dialog
  const handleClose = () => {
    setOpen(false);
  };

  //handle form data change
  const handleChange = (event) => {
    event.persist();

    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  // handle changing of picture
  const handlePhotoChange = () => {
    const fileInput = document.getElementById("imgInput");
    fileInput.click();
  };

  // remove shrine avatar
  const removeImage = () => {
    setImageUrl(null);
  };

  // handle image hchange function
  const handleImageChange = (event) => {
    // validate image file before setting to state
    const imageFile = event.target.files[0];

    if (!imageFile.name.match(/\.(jpg|jpeg|png|webp|tiff)$/)) {
      setInvalidImage(
        "**Please select valid image. Must be in formats (jpg, jpeg, png, tiff or webp)"
      );

      return false;
    } else {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
      setInvalidImage(null);
    }
  };

  // hande submission of new shrine info
  const handleSubmit = async (event) => {
    // prevent submit button default behavior
    event.preventDefault();

    // clear any errors
    setErrors({});

    // set updating state
    setUpdateingShrine(true);

    // define new shrine object
    const newShrineData = {
      categoryName: values.categoryName,
      shrineName: values.shrineName,
      description: values.description,
    };

    // perform action

    await axios
      .post("/api/shrine/createShrine", newShrineData)
      .then(async (res) => {
        // log analytics on shrine creation
        analytics().logEvent("shrine_create", {
          name: newShrineData.shrineName,
        });

        // set shrine id from response
        const shrineId = res.data;

        //   upload image if image exists
        if (image !== null) {
          const formData = new FormData();
          formData.append("image", image, image.name);

          //   upload shrineAvatar
          await axios
            .post(`/api/shrine/uploadAvatar/${shrineId}`, formData)
            .then(() => {
              analytics().logEvent("new_shrine_avatar_upload");

              // open new shrine page
              window.location.href = `/shrine/${newShrineData.shrineName}`;
            })
            .catch((err) => {
              console.error(err);
              console.log("could not upload shrine avatar");
            });
        }
      })
      .catch((err) => {
        console.error(err);
        setErrors(err.response.data);
        setUpdateingShrine(false);
      });
  };

  return (
    <div>
      <button
        className="capitalize w-[70%] h-auto rounded-[15px] font-semibold text-[#933a16] border border-[#933a16] py-1 px-2 hover:bg-red-100 transition-all"
        onClick={handleOpen}
      >
        Create Shrine
      </button>

      {/* create shrine dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen={fullscreen}
        maxWidth="md"
      >
        {/* container */}
        <div>
          {/* title tab */}
          <div className="bg-[#933a16] relative">
            <DialogTitle>
              <p className="text-white font-semibold text-sm xl:text-lg text-center">
                Create your own shrine
              </p>
            </DialogTitle>

            {/* close button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-black hover:text-white hover:bg-[#800000] p-2 rounded-full"
            >
              <CloseOutlined />
            </button>
          </div>

          <DialogContent>
            <div>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="shrine Avatar"
                  className="object-cover w-[100px] h-[100px] xl:w-[140px] xl:h-[140px] rounded-full mb-4 mr-auto ml-auto"
                />
              ) : null}

              {/* hidden input tag to take image */}
              <input
                accept="image/*"
                type="file"
                id="imgInput"
                hidden="hidden"
                onChange={handleImageChange}
              />

              {/* image actions buttons */}
              <div className="flex items-center space-x-2  mb-2 justify-center">
                {/* upload button */}
                <button
                  className="bg-[#933a16] hover:bg-[#800000] text-white py-1 px-2 flex items-center space-x-1 rounded-md"
                  onClick={handlePhotoChange}
                >
                  <span>
                    <PhotoCamera />
                  </span>
                  <span>Upload Shrine Avatar</span>
                </button>

                {/* remove image button */}
                {imageUrl ? (
                  <button
                    className="bg-[#933a16] hover:bg-[#800000] text-white py-1 px-2 rounded-md"
                    onClick={removeImage}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            </div>
            {invalidImage !== null && (
              <p className="text-[#800000] text-center text-xs xl:text-sm">
                {invalidImage}
              </p>
            )}

            {/* form */}
            <form>
              <FormControl
                required
                error={errors && errors.categoryname ? true : false}
                style={{ display: "block", marginBottom: "20px" }}
              >
                <div>
                  <InputLabel
                    htmlFor="select-category"
                    style={{ color: "black" }}
                  >
                    Pick a category
                  </InputLabel>
                  <NativeSelect
                    value={values.categoryName}
                    onChange={handleChange}
                    inputProps={{
                      name: "categoryName",
                      id: "shrine-native-helper",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option aria-label="news" value="news">
                      NEWS
                    </option>
                    <option aria-label="sports" value="sports">
                      SPORTS
                    </option>
                    <option aria-label="politics" value="politics">
                      POLITICS
                    </option>
                    <option aria-label="technology" value="technology">
                      TECHNOLOGY
                    </option>
                    <option aria-label="style" value="style">
                      STYLE
                    </option>
                    <option aria-label="health" value="health">
                      HEALTH
                    </option>
                    <option aria-label="movies" value="movies">
                      MOVIES
                    </option>
                    <option aria-label="music" value="music">
                      MUSIC
                    </option>
                    <option aria-label="religion" value="religion">
                      RELIGION
                    </option>
                    <option aria-label="celebrities" value="celebrities">
                      CELEBRITIES
                    </option>
                    <option aria-label="investment" value="investment">
                      INVESTMENT
                    </option>
                    <option aria-label="romance" value="romance">
                      ROMANCE
                    </option>
                    <option aria-label="jobs" value="jobs">
                      JOBS
                    </option>
                    <option aria-label="finance" value="finance">
                      FINANCE
                    </option>
                    <option aria-label="nature" value="nature">
                      NATURE
                    </option>
                    <option aria-label="travel" value="travel">
                      TRAVEL
                    </option>
                    <option aria-label="autos" value="autos">
                      AUTOS
                    </option>
                    <option aria-label="opinion" value="opinion">
                      OPINION
                    </option>
                    <option aria-label="art" value="art">
                      ART
                    </option>
                    <option aria-label="photography" value="photography">
                      PHOTOGRAPHY
                    </option>
                    <option aria-label="pets" value="pets">
                      PETS
                    </option>
                    <option aria-label="career" value="career">
                      CAREER
                    </option>
                    <option aria-label="education" value="education">
                      EDUCATION
                    </option>
                    <option aria-label="food" value="food">
                      FOOD
                    </option>
                    <option aria-label="events" value="events">
                      EVENTS
                    </option>
                    <option aria-label="humour" value="humour">
                      HUMOUR
                    </option>
                    <option aria-label="parenting" value="parenting">
                      PARENTING
                    </option>
                    <option aria-label="real estate" value="real-estate">
                      REAL ESTATE
                    </option>
                    <option aria-label="culture" value="culture">
                      CULTURE
                    </option>
                    <option aria-label="agriculture" value="agriculture">
                      AGRICULTURE
                    </option>
                    <option aria-label="inspiration" value="inspiration">
                      INSPIRATION
                    </option>
                    <option aria-label="history" value="history">
                      HISTORY
                    </option>
                  </NativeSelect>
                  <FormHelperText style={{ color: "maroon" }}>
                    {errors && errors.categoryName}
                  </FormHelperText>
                </div>
              </FormControl>

              <TextField
                name="shrineName"
                type="text"
                label="Shrine name*"
                error={errors && errors.shrineName ? true : false}
                helperText={errors && errors.shrineName}
                value={values.shrineName}
                style={{ marginTop: "20px", marginBottom: "15px" }}
                onChange={handleChange}
                variant="outlined"
              />

              <TextField
                name="description"
                type="text"
                label="Shrine description*"
                error={errors && errors.description ? true : false}
                helperText={errors && errors.description}
                multiline
                rows="3"
                placeholder="A catchy description of your great shrine"
                style={{ marginTop: "20px", marginBottom: "15px" }}
                value={values.description}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </form>
          </DialogContent>

          <DialogActions>
            <div className="flex items-center space-x-3 mr-6">
              <button
                className="py-1 px-2 rounded-md bg-[#933a16] text-white hover:bg-[#800000] text-sm"
                disabled={updatingShrine}
                onClick={handleSubmit}
              >
                Create
              </button>
              {updatingShrine && (
                <span className="text-[#933a16]">
                  <CircularProgress size={20} />
                </span>
              )}
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateShrine;
