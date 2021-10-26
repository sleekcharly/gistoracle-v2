import {
  CircularProgress,
  Dialog,
  DialogActions,
  IconButton,
  TextField,
} from "@material-ui/core";
import { AddAPhotoOutlined, Close, Settings } from "@material-ui/icons";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { analytics } from "../../firebase";
import { getShrine } from "../../redux/actions/dataActions";

function EditShrine({ shrine }) {
  // state parameters for component
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [values, setValues] = useState({
    shrineName: "",
    description: "",
  });
  const [currentShrineName, setCurrentShrineName] = useState("");
  const [shrineId, setShrineId] = useState("");
  const [errors, setErrors] = useState({});
  const [updating, setUpdating] = useState(false);

  // map shrine to component this.state
  const mapShrineDetailsToState = (shrine) => {
    setValues((values) => ({
      ...values,
      shrineName: shrine.name,
      description: shrine.description,
    }));
    setImageUrl(shrine.avatar);
    setShrineId(shrine.shrineId);
  };

  // load shrine data into component state
  useEffect(() => {
    // set current shrine name
    setCurrentShrineName(shrine.name);

    // map to state
    mapShrineDetailsToState(shrine);
  }, [shrine]);

  // setup snackbar from notistack
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  //handle Image change
  const handleImageChange = (event) => {
    setImageUrl(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  // handle changing of picture
  const handleChangePicture = () => {
    const fileInput = document.getElementById("imgInput");
    fileInput.click();
  };

  // handle controlled input on form
  const handleChange = (event) => {
    event.persist();

    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  // handle opening of dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // hande closing of dialog
  const handleClose = () => {
    setOpen(false);
  };

  //   submit form data for editing
  const handleSubmit = async (event) => {
    // prevent submit button default behavior
    event.preventDefault();

    // set updating state
    setUpdating(true);

    // defne shrine details for submission
    const shrineDetails = {
      name: values.shrineName.trim(),
      description: values.description.trim(),
      shrineId: shrineId,
      currentShrineName: currentShrineName,
    };

    // perform shrine data update
    await axios
      .post("/api/shrine/editShrine", shrineDetails)
      .then(async (res) => {
        // set response
        const response = res.data;

        // perform shrine avatar upload if there is a different image url
        if (image !== null && imageUrl !== shrine.avatar) {
          // define formData
          const formData = new FormData();

          formData.append("image", image, image.name);

          await axios
            .post(`/api/shrine/uploadAvatar/${shrineId}`, formData)
            .then((res) => {
              analytics().logEvent("shrine_avatar_change");

              console.log(res.data.message);
              console.log(res.data);
            })
            .catch((err) => {
              console.log(err.response.data);

              setErrors(err.response.data);
            });
        }

        analytics().logEvent("shrine_edit_with_avatar_change");

        // set updating state
        setUpdating(false);

        // run status snackbar
        enqueueSnackbar(response, {
          variant: "success",
          preventDuplicate: true,
        });

        // close dialog
        handleClose();

        // reload page
        setTimeout(() => {
          window.location.href = `/shrine/${shrineDetails.name}`;
        }, 3000);
      })
      .catch((err) => {
        console.error(err.response);

        setUpdating(false);
        setErrors(err.response.data);
      });
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Settings
          fontSize="small"
          className="w-5 h-5 text-[#fff] rounded-full hover:bg-[#fff] hover:text-[#933a16]"
        />
      </IconButton>

      {/* edit shrine dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <div className="text-white">
          <div className="p-3 flex items-center justify-between bg-[#933a16]">
            <div className="flex space-x-2 items-center">
              <IconButton onClick={handleClose}>
                <Close fontSize="small" />
              </IconButton>

              <p className="text-white lg:text-lg">Edit shrine</p>
            </div>

            {/* save button */}
            <DialogActions>
              <button
                className="bg-[#800000] text-white hover:bg-red-100 hover:text-[#800000] py-1 px-2 text-sm lg:text-base uppercase rounded-md"
                onClick={handleSubmit}
                disabled={updating}
              >
                Save
              </button>
            </DialogActions>
          </div>

          {/* content */}
          <div className="p-3">
            {/* image wrapper */}
            <div className="relative p-2">
              <img
                src={imageUrl ? imageUrl : "/images/shrineAvatar.png"}
                alt={values.shrineName}
                className="w-[95px] h-[95px] lg:w-[105px] lg:h-[105px] xl:w-[140px] xl:h-[140px] rounded-full object-cover mr-auto ml-auto"
              />
              {errors && errors.image ? (
                <p className="text-[#800000] text-[9px] text-center mt-2">
                  {errors.image}
                </p>
              ) : null}

              <input
                type="file"
                id="imgInput"
                hidden="hidden"
                onChange={handleImageChange}
              />

              <div className="absolute top-[70%] left-[55%] xl:top-[70%] xl:left-[58%]">
                <IconButton>
                  <AddAPhotoOutlined
                    color="secondary"
                    onClick={handleChangePicture}
                    fontSize="small"
                  />
                </IconButton>
              </div>
            </div>

            {/* form */}
            <form>
              <TextField
                name="shrineName"
                type="text"
                label="Shrine name *"
                value={values.shrineName}
                onChange={handleChange}
                error={errors && errors.shrineName ? true : false}
                helperText={errors && errors.shrineName}
                variant="outlined"
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />

              <TextField
                name="description"
                type="text"
                label="Description*"
                multiline
                rows="5"
                value={values.description}
                error={errors && errors.description ? true : false}
                helperText={errors && errors.description}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </form>

            {/* loading component */}
            {updating && (
              <div className="flex items-center justify-end space-x-2">
                <CircularProgress size={20} />
                <p className="text-xs text-[#800000]">Updating shrine ...</p>
              </div>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default EditShrine;
